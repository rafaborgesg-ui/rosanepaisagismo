import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { memberEmail } = await req.json();

    if (!memberEmail) {
      return Response.json({ error: 'memberEmail is required' }, { status: 400 });
    }

    // Find the invite for this member in the current user's team
    const invites = await base44.entities.TeamInvite.filter({
      owner_email: user.email,
      invited_email: memberEmail
    });

    if (invites.length === 0) {
      return Response.json({ error: 'Member not found in your team' }, { status: 404 });
    }

    // Cancel the invite
    const invite = invites[0];
    await base44.entities.TeamInvite.update(invite.id, { status: 'Cancelado' });

    return Response.json({ 
      success: true,
      message: `Member ${memberEmail} removed from team`,
      removed: true
    });
  } catch (error) {
    console.error('Remove member error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});