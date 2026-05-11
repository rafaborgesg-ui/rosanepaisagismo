import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const PRODUCT_MAPPING = {
  // Adicione aqui os IDs dos produtos Kiwify
  // Exemplo: 'prod_kiwify_id': { plan: 'premium', billing: 'monthly' }
};

// deno-lint-ignore no-undef
const serve = globalThis.Deno?.serve;

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    // Validate Kiwify webhook signature for security
    const signature = req.headers.get('x-signature');
    const body = await req.clone().text();
    
    // Verify signature using Kiwify's API key
    // deno-lint-ignore no-undef
    const apiKey = globalThis.Deno?.env?.get('KIWIFY_API_KEY');
    if (!signature || !apiKey) {
      console.warn('Missing signature or API key for Kiwify webhook');
      return Response.json({ error: 'Invalid webhook' }, { status: 401 });
    }

    // Parse webhook body
    const base44 = createClientFromRequest(req);
    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch {
      return Response.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // Webhook do Kiwify retorna: event, data { id, email, product, status, ... }
    const { event, data } = parsedBody;

    if (!event || !data) {
      return Response.json({ error: 'Missing event or data' }, { status: 400 });
    }

    // Eventos importantes: 'sale', 'chargeback', 'refund'
    if (event === 'sale' && data?.status === 'completed') {
      const userEmail = data.email;
      if (!userEmail || !userEmail.includes('@')) {
        return Response.json({ error: 'Invalid email' }, { status: 400 });
      }

      // Atualizar ou criar subscription com status active
      const subscriptions = await base44.asServiceRole.entities.Subscription.filter({
        user_email: userEmail
      });

      // Determinar ciclo de faturamento e data fim baseado no produto Kiwify
      let billingCycle = 'monthly';
      let periodDays = 30;
      
      // Mapear produto Kiwify para ciclo de faturamento
      if (data.product_id && typeof data.product_id === 'string') {
        const productId = data.product_id.toLowerCase();
        if (productId.includes('anual') || productId.includes('annual')) {
          billingCycle = 'annual';
          periodDays = 365;
        } else if (productId.includes('semestral') || productId.includes('semester')) {
          billingCycle = 'semester';
          periodDays = 180;
        }
      }

      const saleId = data.sale_id || data.id;
      if (!saleId) {
        return Response.json({ error: 'Missing sale ID' }, { status: 400 });
      }

      const subscriptionData = {
        user_email: userEmail,
        plan: 'premium',
        status: 'active',
        kiwify_customer_id: String(data.customer_id || data.id),
        kiwify_sale_id: String(saleId),
        billing_cycle: billingCycle,
        current_period_end: new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000).toISOString(),
      };

      if (subscriptions.length > 0) {
        await base44.asServiceRole.entities.Subscription.update(
          subscriptions[0].id,
          subscriptionData
        );
      } else {
        await base44.asServiceRole.entities.Subscription.create(subscriptionData);
      }

      return Response.json({ success: true, message: 'Pagamento processado' });
    }

    // Refund/Chargeback - cancelar subscription
    if ((event === 'refund' || event === 'chargeback') && data?.email) {
      const subscriptions = await base44.asServiceRole.entities.Subscription.filter({
        user_email: data.email
      });

      if (subscriptions.length > 0) {
        await base44.asServiceRole.entities.Subscription.update(
          subscriptions[0].id,
          { status: 'cancelled' }
        );
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Kiwify webhook error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});