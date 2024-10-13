import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { SubscriptionStatus } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(request: Request) {
  console.log('POST request received in /api/stripe');
  try {
    const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();
    console.log('Session user:', sessionUser);

    if (!sessionUser || !sessionUser.email) {
      console.log('User not authenticated');
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: sessionUser.email,
      },
    });
    console.log('Found user:', user);

    if (!user) {
      console.log('User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create or retrieve Stripe customer
    let stripeCustomer;
    try {
      if (user.stripeCustomerId) {
        console.log('Retrieving existing Stripe customer');
        stripeCustomer = await stripe.customers.retrieve(user.stripeCustomerId);
      } else {
        console.log('Creating new Stripe customer');
        stripeCustomer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        });
        console.log('New Stripe customer created:', stripeCustomer.id);
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: stripeCustomer.id },
        });
        console.log('User updated with Stripe customer ID');
      }
    } catch (error) {
      console.error('Error handling Stripe customer:', error);
      return NextResponse.json({ error: 'Failed to handle Stripe customer', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }

    // Use the existing price ID for the full subscription
    const fullSubscriptionPriceId = process.env.STRIPE_PRICE_ID!;
    console.log('Full subscription price ID:', fullSubscriptionPriceId);

    console.log('Creating checkout session');
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        customer: stripeCustomer.id,
        payment_method_types: ['card', 'ideal'],
        line_items: [
          {
            price: fullSubscriptionPriceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?paid=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        subscription_data: {
          trial_period_days: 7,
        },
      });
      console.log('Checkout session created:', session.id);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      if (error instanceof Stripe.errors.StripeError) {
        console.error('Stripe error type:', error.type);
        console.error('Stripe error message:', error.message);
      }
      return NextResponse.json({ error: 'Failed to create checkout session', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }

    // Update user with session information
    console.log('Updating user with session information');
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripeSessionId: session.id,
          subscriptionStatus: SubscriptionStatus.TRIAL,
          trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
      });
      console.log('User updated with session information');
    } catch (error) {
      console.error('Error updating user with session information:', error);
      return NextResponse.json({ error: 'Failed to update user with session information', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }

    console.log('Returning checkout URL');
    return NextResponse.json({ checkoutUrl: session.url });

  } catch (error) {
    console.error('Unexpected error in /api/stripe:', error);
    return NextResponse.json(
      { 
        error: 'Unexpected error occurred', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}