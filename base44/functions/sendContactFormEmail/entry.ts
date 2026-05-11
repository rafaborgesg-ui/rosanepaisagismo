import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { nome, email, whatsapp, interesse, mensagem, arquivo_url, arquivo_nome } = await req.json();

    // Get the landing content to get the email address
    const landingContent = await base44.asServiceRole.entities.LandingContent.list();
    if (!landingContent || landingContent.length === 0) {
      return Response.json(
        { error: 'Email de contato não configurado' },
        { status: 400 }
      );
    }

    const emailDestino = landingContent[0].email_contato;
    if (!emailDestino) {
      return Response.json(
        { error: 'Email de contato não configurado no painel admin' },
        { status: 400 }
      );
    }

    // Build email body
    let emailBody = `
<h2>Nova Mensagem de Contato</h2>
<p><strong>Nome:</strong> ${nome || 'Não informado'}</p>
<p><strong>E-mail:</strong> ${email || 'Não informado'}</p>
<p><strong>WhatsApp:</strong> ${whatsapp || 'Não informado'}</p>
<p><strong>Interesse:</strong> ${interesse || 'Não informado'}</p>
<p><strong>Mensagem:</strong></p>
<p>${mensagem ? mensagem.replace(/\n/g, '<br>') : 'Sem mensagem'}</p>
${arquivo_nome ? `<p><strong>Arquivo anexado:</strong> ${arquivo_nome}</p>` : ''}
${arquivo_url ? `<p><strong>Link do arquivo:</strong> <a href="${arquivo_url}">${arquivo_url}</a></p>` : ''}
<hr>
<p><small>Mensagem enviada via formulário de contato do site</small></p>
    `;

    // Send email
    const result = await base44.asServiceRole.integrations.Core.SendEmail({
      to: emailDestino,
      subject: `Novo contato: ${interesse || 'Sem assunto'} - ${nome || 'Visitante'}`,
      body: emailBody,
    });

    return Response.json({
      success: true,
      message: 'Email enviado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return Response.json(
      { error: error.message || 'Erro ao enviar email' },
      { status: 500 }
    );
  }
});