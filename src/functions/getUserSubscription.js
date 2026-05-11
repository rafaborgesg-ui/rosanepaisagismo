import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// deno-lint-ignore no-undef
const serve = globalThis.Deno?.serve;

serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = user.email;

    // Get subscription for the current user
    const subscriptions = await base44.entities.Subscription.filter({
      user_email: userEmail
    });

    if (subscriptions.length === 0) {
      // No subscription found, return free plan
      return Response.json({
        plan: 'free',
        status: 'active',
        user_email: userEmail
      });
    }

    const subscription = subscriptions[0];

    return Response.json({
      plan: subscription.plan || 'free',
      status: subscription.status || 'active',
      user_email: userEmail,
      current_period_end: subscription.current_period_end
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});