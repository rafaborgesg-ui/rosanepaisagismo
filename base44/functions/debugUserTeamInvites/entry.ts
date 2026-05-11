import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get invites where this user is invited
    const invitesAsInvited = await base44.asServiceRole.entities.TeamInvite.filter({
      invited_email: user.email
    });

    // Get invites where this user is the owner
    const invitesAsOwner = await base44.asServiceRole.entities.TeamInvite.filter({
      owner_email: user.email
    });

    return Response.json({ 
      user_email: user.email,
      invites_as_invited: invitesAsInvited,
      invites_as_owner: invitesAsOwner,
      message: 'Debug info for current user'
    });
  } catch (error) {
    console.error('Debug error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});