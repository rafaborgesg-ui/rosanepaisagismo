import Stripe from 'npm:stripe@16.0.0';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret
      );
    } catch (error) {
      return Response.json({ error: `Webhook signature verification failed: ${error.message}` }, { status: 400 });
    }

    const { type, data } = event;

    if (type === 'customer.subscription.created' || type === 'customer.subscription.updated') {
      const subscription = data.object;
      const customerEmail = subscription.metadata?.user_email || (await stripe.customers.retrieve(subscription.customer)).email;

      const existingSub = await base44.asServiceRole.entities.Subscription.filter({
        user_email: customerEmail,
      });

      const subData = {
        user_email: customerEmail,
        plan: 'premium',
        stripe_customer_id: subscription.customer,
        stripe_subscription_id: subscription.id,
        status: subscription.status === 'active' ? 'active' : 'cancelled',
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      };

      if (existingSub.length > 0) {
        await base44.asServiceRole.entities.Subscription.update(existingSub[0].id, subData);
      } else {
        await base44.asServiceRole.entities.Subscription.create(subData);
      }
    }

    if (type === 'customer.subscription.deleted') {
      const subscription = data.object;
      const subs = await base44.asServiceRole.entities.Subscription.filter({
        stripe_subscription_id: subscription.id,
      });

      if (subs.length > 0) {
        await base44.asServiceRole.entities.Subscription.update(subs[0].id, { status: 'cancelled' });
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});