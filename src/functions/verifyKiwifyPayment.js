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

    let payload;
    try {
      payload = await req.json();
    } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { saleId } = payload;

    if (!saleId || typeof saleId !== 'string') {
      return Response.json({ error: 'Invalid Sale ID' }, { status: 400 });
    }

    // Verificar se a subscription já foi criada com este saleId
    const subscriptions = await base44.asServiceRole.entities.Subscription.filter({
      user_email: user.email
    });

    const existing = subscriptions.find(s => String(s.kiwify_sale_id) === String(saleId));

    if (existing) {
      if (existing.status === 'active') {
        return Response.json({ 
          success: true, 
          message: 'Pagamento confirmado',
          plan: existing.plan || 'premium',
          status: 'active' 
        });
      }
      if (existing.status === 'cancelled') {
        return Response.json({ 
          success: false,
          error: 'Subscription foi cancelada' 
        }, { status: 400 });
      }
    }

    if (subscriptions.length > 0) {
      const sub = subscriptions[0];
      if (sub.status === 'active' && sub.plan === 'premium') {
        return Response.json({ 
          success: true, 
          message: 'Subscription ativa',
          plan: 'premium',
          status: 'active'
        });
      }
    }

    return Response.json({ 
      success: false,
      error: 'Pagamento ainda não processado. Tente novamente em alguns segundos.' 
    }, { status: 202 });
  } catch (error) {
    console.error('Kiwify verification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});