import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/app/lib/db';
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

    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(checkoutSession);
        break;
      case 'invoice.paid':
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;
      case 'customer.subscription.trial_will_end':
        const trialEndingSubscription = event.data.object as Stripe.Subscription;
        await handleTrialWillEnd(trialEndingSubscription);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Processing successful checkout:', session.id);

  if (!session.customer || !session.subscription) {
    console.error('No customer or subscription found in session');
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

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isPremium: true,
        subscriptionStatus: SubscriptionStatus.TRIAL,
        stripeSubscriptionId: subscription.id,
        trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      },
    });

    console.log('Updated user to trial status:', user.id);
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
    await updateUserSubscriptionStatus(subscription);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  await updateUserSubscriptionStatus(subscription);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: subscription.customer as string },
  });

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isPremium: false,
        subscriptionStatus: SubscriptionStatus.CANCELED,
        stripeSubscriptionId: null,
        trialEndsAt: null,
      },
    });
  }
}

async function updateUserSubscriptionStatus(subscription: Stripe.Subscription) {
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: subscription.customer as string },
  });

  if (user) {
    let status: SubscriptionStatus;
    switch (subscription.status) {
      case 'trialing':
        status = SubscriptionStatus.TRIAL;
        break;
      case 'active':
        status = SubscriptionStatus.ACTIVE;
        break;
      case 'past_due':
        status = SubscriptionStatus.PAST_DUE;
        break;
      case 'canceled':
        status = SubscriptionStatus.CANCELED;
        break;
      default:
        status = SubscriptionStatus.INACTIVE;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isPremium: status === SubscriptionStatus.ACTIVE || status === SubscriptionStatus.TRIAL,
        subscriptionStatus: status,
        stripeSubscriptionId: subscription.id,
        trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      },
    });
  }
}

async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  const fullPriceId = subscription.metadata.full_price_id;
  if (fullPriceId) {
    await stripe.subscriptions.update(subscription.id, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: fullPriceId,
        },
      ],
      proration_behavior: 'create_prorations',
    });
  }
}