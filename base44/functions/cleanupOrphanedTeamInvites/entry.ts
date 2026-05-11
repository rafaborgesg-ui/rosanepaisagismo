import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    // Only admin can run this cleanup
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get all team invites
    const allInvites = await base44.asServiceRole.entities.TeamInvite.list();
    
    // Get all users
    const allUsers = await base44.asServiceRole.entities.User.list();
    const userEmails = new Set(allUsers.map(u => u.email));

    let cleaned = 0;
    
    // Check each invite
    for (const invite of allInvites) {
      // If the invited user doesn't exist or the owner email doesn't exist, mark as removed
      if (!userEmails.has(invite.invited_email) || !userEmails.has(invite.owner_email)) {
        if (invite.status !== 'Cancelado') {
          await base44.asServiceRole.entities.TeamInvite.update(invite.id, { status: 'Cancelado' });
          cleaned++;
        }
      }
    }

    return Response.json({ 
      success: true, 
      message: `Cleanup complete. Removed ${cleaned} orphaned invites.`,
      cleaned
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});