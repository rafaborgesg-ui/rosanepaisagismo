import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get any invites for this user with "Enviado" status (not yet accepted)
    const pendingInvites = await base44.asServiceRole.entities.TeamInvite.filter({
      invited_email: user.email,
      status: 'Enviado'
    });

    // If there are pending invites from before registration, auto-accept them
    if (pendingInvites.length > 0) {
      const invite = pendingInvites[0];
      await base44.asServiceRole.entities.TeamInvite.update(invite.id, { status: 'Aceito' });
      return Response.json({ 
        success: true,
        message: 'Pending invite accepted',
        inviteAccepted: true
      });
    }

    // If no pending invites, user is starting their own office
    // Create a self-ownership record (optional, for tracking)
    return Response.json({ 
      success: true,
      message: 'New user registered successfully',
      inviteAccepted: false,
      newOfficeOwner: user.email
    });
  } catch (error) {
    console.error('Error on user registration:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});