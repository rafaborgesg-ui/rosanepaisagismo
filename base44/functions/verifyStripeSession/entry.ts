import Stripe from 'npm:stripe@16.0.0';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const body = await req.json();
    const { sessionId, userEmail } = body;

    if (!sessionId || !userEmail) {
      return Response.json({ error: 'Session ID and user email required', success: false }, { status: 400 });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return Response.json({ error: 'Session not found', success: false }, { status: 404 });
    }

    // Verify session belongs to the user
    if (session.customer_email !== userEmail) {
      return Response.json({ error: 'Session does not belong to this user', success: false }, { status: 403 });
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return Response.json({ 
        error: 'Payment not completed', 
        success: false,
        status: session.payment_status 
      }, { status: 400 });
    }

    // Get subscription if exists
    let subscription = null;
    if (session.subscription) {
      subscription = await stripe.subscriptions.retrieve(session.subscription);
    }

    // Create or update subscription record
    const existingSubs = await base44.asServiceRole.entities.Subscription.filter({
      user_email: userEmail
    });

    const subscriptionData = {
      user_email: userEmail,
      plan: 'premium',
      stripe_customer_id: session.customer,
      stripe_subscription_id: subscription?.id || session.subscription,
      status: subscription?.status || 'active',
      current_period_end: subscription ? new Date(subscription.current_period_end * 1000).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    if (existingSubs.length > 0) {
      await base44.asServiceRole.entities.Subscription.update(existingSubs[0].id, subscriptionData);
    } else {
      await base44.asServiceRole.entities.Subscription.create(subscriptionData);
    }

    return Response.json({ 
      success: true, 
      message: 'Payment verified and subscription activated',
      plan: 'premium'
    });
  } catch (error) {
    console.error('Verification error:', error);
    return Response.json({ error: error.message, success: false }, { status: 500 });
  }
});