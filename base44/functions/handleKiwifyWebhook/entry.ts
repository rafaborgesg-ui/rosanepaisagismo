import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// IDs de produto Kiwify mapeados para planos
// O product_id real é o UUID do produto
const KIWIFY_PRODUCT_IDS = [
  "73096500-4838-11f1-9d9f-a553e5bd6882", // basico anual só um usuario
];

// Calcular data de expiração baseado no nome do produto
function getExpirationDate(productName) {
  const now = new Date();
  const name = (productName || "").toLowerCase();
  if (name.includes("semestral")) {
    now.setMonth(now.getMonth() + 6);
  } else if (name.includes("mensal")) {
    now.setMonth(now.getMonth() + 1);
  } else {
    // anual ou qualquer outro
    now.setFullYear(now.getFullYear() + 1);
  }
  return now.toISOString();
}

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Método não permitido" }, { status: 405 });
    }

    const body = await req.json();
    console.log("Kiwify webhook received:", JSON.stringify(body));

    // O formato real da Kiwify: webhook_event_type na raiz
    const eventType = body.webhook_event_type || body.event;
    if (!eventType) {
      return Response.json({ error: "Payload inválido: sem event type" }, { status: 400 });
    }

    // Processar apenas pagamentos aprovados
    const validEvents = ["order_approved", "purchase.completed", "order.completed", "sale.approved"];
    if (!validEvents.includes(eventType)) {
      console.log(`Evento ignorado: ${eventType}`);
      return Response.json({ success: true, message: `Evento ignorado: ${eventType}` });
    }

    // Verificar status do pedido
    const orderStatus = body.order_status;
    if (orderStatus && orderStatus !== "paid") {
      console.log(`Status do pedido não é paid: ${orderStatus}`);
      return Response.json({ success: true, message: `Status ignorado: ${orderStatus}` });
    }

    // Extrair email do cliente — Kiwify usa body.Customer.email
    const customerEmail = (
      body.Customer?.email ||
      body.customer?.email ||
      body.data?.Customer?.email ||
      body.data?.customer?.email ||
      ""
    ).toLowerCase().trim();

    if (!customerEmail) {
      console.error("Email do cliente não encontrado no payload");
      return Response.json({ error: "Email do cliente não encontrado" }, { status: 400 });
    }

    // Extrair info do produto
    const productName = body.Product?.product_name || body.product?.name || "";
    const transactionId = body.order_id || body.id || body.transaction_id || "unknown";

    console.log(`Ativando: email=${customerEmail}, produto=${productName}, transação=${transactionId}`);

    const expirationDate = getExpirationDate(productName);

    const base44 = createClientFromRequest(req);

    // Buscar subscription existente pelo email do cliente
    const subscriptions = await base44.asServiceRole.entities.Subscription.filter({
      user_email: customerEmail,
    });

    if (subscriptions.length > 0) {
      await base44.asServiceRole.entities.Subscription.update(subscriptions[0].id, {
        plan: "premium",
        status: "active",
        current_period_end: expirationDate,
        stripe_customer_id: `kiwify_${transactionId}`,
        stripe_subscription_id: `kiwify_sub_${transactionId}`,
      });
      console.log(`✓ Subscription atualizada: ${customerEmail}`);
    } else {
      await base44.asServiceRole.entities.Subscription.create({
        user_email: customerEmail,
        plan: "premium",
        status: "active",
        current_period_end: expirationDate,
        stripe_customer_id: `kiwify_${transactionId}`,
        stripe_subscription_id: `kiwify_sub_${transactionId}`,
      });
      console.log(`✓ Subscription criada: ${customerEmail}`);
    }

    return Response.json({
      success: true,
      message: "Licença ativada com sucesso",
      email: customerEmail,
      plan: "premium",
      expires: expirationDate,
    });

  } catch (error) {
    console.error("Erro ao processar webhook Kiwify:", error);
    return Response.json(
      { error: error.message || "Erro ao processar webhook" },
      { status: 500 }
    );
  }
});