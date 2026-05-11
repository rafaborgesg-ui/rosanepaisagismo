import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const userEmail = body.userEmail || user.email;

    const subscriptions = await base44.asServiceRole.entities.Subscription.filter({
      user_email: userEmail,
    });

    const subscription = subscriptions.length > 0 ? subscriptions[0] : null;

    // Only return premium if both plan and status match
    const isPremium = subscription?.plan === 'premium' && (subscription?.status === 'active' || !subscription?.status);

    return Response.json({
      plan: subscription?.plan || 'free',
      status: subscription?.status || 'active',
      isPremium,
      subscription,
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});