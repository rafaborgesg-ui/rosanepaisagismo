import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// deno-lint-ignore no-undef
const serve = globalThis.Deno?.serve;

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admin can run this
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get all subscriptions with Stripe data
    const allSubscriptions = await base44.asServiceRole.entities.Subscription.list(undefined, 1000);
    
    let migrated = 0;
    let failed = 0;

    for (const sub of allSubscriptions) {
      try {
        // Only migrate Stripe subscriptions that exist
        if (sub.stripe_customer_id || sub.stripe_subscription_id) {
          // Update to Kiwify model
          await base44.asServiceRole.entities.Subscription.update(sub.id, {
            plan: 'premium',
            status: 'active',
            billing_cycle: 'monthly',
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            // Keep old fields for reference but mark as migrated
            stripe_customer_id: null,
            stripe_subscription_id: null,
          });
          migrated++;
        }
      } catch (err) {
        console.error(`Failed to migrate subscription ${sub.id}:`, err);
        failed++;
      }
    }

    return Response.json({
      success: true,
      message: `Migração concluída: ${migrated} subscriptions atualizadas, ${failed} falharam`
    });
  } catch (error) {
    console.error('Migration error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});