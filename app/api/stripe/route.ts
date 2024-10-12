import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(request: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();

    if (!sessionUser) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: sessionUser.email || undefined,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create or retrieve Stripe customer
    let stripeCustomer;
    if (user.stripeCustomerId) {
      stripeCustomer = await stripe.customers.retrieve(user.stripeCustomerId);
    } else {
      stripeCustomer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: stripeCustomer.id },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card', 'ideal'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?paid=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    // Update user with session information
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeSessionId: session.id,
        subscriptionStatus: 'PENDING',
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });

  } catch (error) {
    console.error('Error in /api/stripe:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}