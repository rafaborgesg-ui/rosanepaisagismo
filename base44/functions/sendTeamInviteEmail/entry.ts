import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { invitedEmail, invitedName, ownerName, inviteId } = await req.json();

    if (!invitedEmail || !inviteId) {
      return Response.json({ error: 'Email e inviteId são obrigatórios' }, { status: 400 });
    }

    if (!ownerName) {
      return Response.json({ error: 'Nome do proprietário é obrigatório' }, { status: 400 });
    }

    const appUrl = (Deno.env.get('BASE44_APP_URL') || 'https://rosaneborges.base44.app').replace(/\/$/, '');
    const acceptLink = `${appUrl}/accept-invite?id=${inviteId}`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2d5016; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { font-size: 28px; margin: 0; color: #fff; font-weight: 600; }
    .content { background: #fff; border: 1px solid #e0e0e0; padding: 40px; border-radius: 0 0 8px 8px; }
    .greeting { font-size: 16px; margin-bottom: 20px; }
    .message { font-size: 15px; line-height: 1.8; margin: 20px 0; }
    .cta-section { text-align: center; margin: 30px 0; }
    .cta-button { display: inline-block; background: #2d5016; color: #fff; padding: 14px 32px; border-radius: 24px; text-decoration: none; font-weight: 600; font-size: 15px; }
    .footer { color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Você foi convidado para FinanceVerde</h1>
    </div>
    <div class="content">
      <div class="greeting">Olá ${invitedName || 'Colaborador'},</div>
      
      <div class="message">
        Você foi convidado para participar da equipe de <strong>${ownerName}</strong> na FinanceVerde!
      </div>

      <div class="cta-section">
        <p style="margin: 15px 0; font-size: 15px;">Clique no botão abaixo para aceitar o convite:</p>
        <a href="${acceptLink}" class="cta-button">Aceitar Convite</a>
      </div>

      <div style="background: #f0f4f8; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 12px; color: #666;">
        <p style="margin: 0;"><strong>Ou copie e cole este link no seu navegador:</strong></p>
        <p style="margin: 5px 0 0 0; word-break: break-all;">${acceptLink}</p>
      </div>

      <div class="footer">
        <p style="margin: 0 0 8px 0;">Atenciosamente,</p>
        <p style="margin: 0;">Equipe FinanceVerde</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: invitedEmail,
      subject: 'Você foi convidado para participar da FinanceVerde',
      body: htmlBody,
      from_name: ownerName || 'FinanceVerde'
    });

    console.log('Email de convite enviado para:', invitedEmail);

    return Response.json({ 
      success: true,
      message: 'Convite enviado por email',
      acceptLink: acceptLink
    });
  } catch (error) {
    console.error('Error sending invite email:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});