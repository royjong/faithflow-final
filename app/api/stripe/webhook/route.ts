import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/db';
import { SubscriptionStatus } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!sig) throw new Error('No signature provided');
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    console.log('Received event type:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  console.log('Processing successful payment:', session.id);

  if (!session.customer) {
    console.error('No customer found in session');
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: session.customer as string },
    });

    if (!user) {
      console.error('User not found for customer:', session.customer);
      return;
    }

    console.log('Updating user:', user.id);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isPremium: true,
        subscriptionStatus: SubscriptionStatus.ACTIVE,
      },
    });

    console.log('Updated user to premium status:', updatedUser.id, updatedUser.isPremium);
  } catch (error) {
    console.error('Error updating user:', error);
  }
}