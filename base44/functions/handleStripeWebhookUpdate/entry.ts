import Stripe from 'npm:stripe@16.0.0';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

Deno.serve(async (req) => {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const base44 = createClientFromRequest(req);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const subscription = await stripe.subscriptions.retrieve(session.subscription);

        await base44.asServiceRole.entities.Subscription.filter({
          stripe_customer_id: session.customer
        }).then(async (subs) => {
          if (subs.length > 0) {
            await base44.asServiceRole.entities.Subscription.update(subs[0].id, {
              stripe_subscription_id: subscription.id,
              plan: 'premium',
              status: 'active',
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
            });
          }
        });
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        await base44.asServiceRole.entities.Subscription.filter({
          stripe_customer_id: invoice.customer
        }).then(async (subs) => {
          if (subs.length > 0) {
            await base44.asServiceRole.entities.Subscription.update(subs[0].id, {
              status: 'active'
            });
          }
        });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await base44.asServiceRole.entities.Subscription.filter({
          stripe_subscription_id: subscription.id
        }).then(async (subs) => {
          if (subs.length > 0) {
            await base44.asServiceRole.entities.Subscription.update(subs[0].id, {
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
            });
          }
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await base44.asServiceRole.entities.Subscription.filter({
          stripe_subscription_id: subscription.id
        }).then(async (subs) => {
          if (subs.length > 0) {
            await base44.asServiceRole.entities.Subscription.update(subs[0].id, {
              status: 'cancelled',
              plan: 'free'
            });
          }
        });
        break;
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});