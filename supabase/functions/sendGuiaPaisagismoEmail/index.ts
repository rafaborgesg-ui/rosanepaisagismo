import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const KIWIFY_API_KEY = Deno.env.get("KIWIFY_API_KEY") || "";
const KIWIFY_EMAIL_ENDPOINT = Deno.env.get("KIWIFY_EMAIL_ENDPOINT") || "";
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || "";
const GUIDE_DOWNLOAD_URL = Deno.env.get("GUIDE_DOWNLOAD_URL") || "https://seu-dominio.com/guia-paisagismo.pdf";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const createMessageHtml = (name) => `
  <h1>Olá ${name || "amigo(a)"},</h1>
  <p>O seu guia "Como Valorizar Seu Imóvel com Paisagismo" foi solicitado com sucesso.</p>
  <p>Clique no link abaixo para acessar o PDF agora:</p>
  <p><a href="${GUIDE_DOWNLOAD_URL}" target="_blank">Baixar Guia de Paisagismo</a></p>
  <p>Se preferir, aguarde o email com o anexo e as próximas dicas exclusivas.</p>
  <p>Abraços,<br/>Rosane Paisagismo</p>
`;

const createMessageText = (name) => `Olá ${name || "amigo(a)"},\n\nO seu guia "Como Valorizar Seu Imóvel com Paisagismo" foi solicitado com sucesso.\n\nAcesse o guia aqui: ${GUIDE_DOWNLOAD_URL}\n\nAbraços,\nRosane Paisagismo`;

const sendWithKiwify = async ({ email, nome, whatsapp }) => {
  if (!KIWIFY_EMAIL_ENDPOINT || !KIWIFY_API_KEY) {
    throw new Error("Kiwify não está configurado. Verifique KIWIFY_EMAIL_ENDPOINT e KIWIFY_API_KEY.");
  }

  const payload = {
    email,
    name: nome || "Cliente",
    whatsapp,
    subject: "Seu Guia de Paisagismo Premium está a caminho",
    html: createMessageHtml(nome),
    text: createMessageText(nome),
    guide_url: GUIDE_DOWNLOAD_URL,
    source: "guia_paisagismo",
  };

  const response = await fetch(KIWIFY_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${KIWIFY_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Kiwify API error: ${response.status} ${text}`);
  }

  return response.json();
};

const sendWithBrevo = async ({ email, nome }) => {
  if (!BREVO_API_KEY) {
    throw new Error("Brevo não está configurado. Verifique BREVO_API_KEY.");
  }

  const emailPayload = {
    sender: {
      name: "Rosane Paisagismo",
      email: "noreply@rosanepaisagismo.com",
    },
    to: [{ email, name: nome || "Cliente" }],
    subject: "Seu Guia de Paisagismo Premium está a caminho",
    htmlContent: createMessageHtml(nome),
    textContent: createMessageText(nome),
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Brevo API error: ${response.status} ${text}`);
  }

  return response.json();
};

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { nome, email, whatsapp } = body;

    if (!email) {
      return new Response(JSON.stringify({ success: false, error: "Email é obrigatório." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const timestamp = new Date().toISOString();

    const { error: upsertError } = await supabase.from("leads").upsert(
      {
        nome,
        email,
        whatsapp,
        fonte: "guia_paisagismo",
        status: "novo",
        data_captura: timestamp,
        created_at: timestamp,
      },
      { onConflict: ["email"] }
    );

    if (upsertError) {
      throw upsertError;
    }

    if (KIWIFY_EMAIL_ENDPOINT && KIWIFY_API_KEY) {
      await sendWithKiwify({ email, nome, whatsapp });
    } else {
      await sendWithBrevo({ email, nome });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
