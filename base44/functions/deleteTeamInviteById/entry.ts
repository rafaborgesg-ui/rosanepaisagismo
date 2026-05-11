import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    // Only admin can delete invites
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { inviteId } = await req.json();

    if (!inviteId) {
      return Response.json({ error: 'inviteId is required' }, { status: 400 });
    }

    // Delete the invite
    await base44.asServiceRole.entities.TeamInvite.delete(inviteId);

    return Response.json({ 
      success: true,
      message: `Invite ${inviteId} deleted`,
      deleted: true
    });
  } catch (error) {
    console.error('Delete error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});