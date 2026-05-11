import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    // Only admin can list all invites
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const allInvites = await base44.asServiceRole.entities.TeamInvite.list();

    return Response.json({ 
      total: allInvites.length,
      invites: allInvites.map(inv => ({
        id: inv.id,
        owner_email: inv.owner_email,
        invited_email: inv.invited_email,
        invited_name: inv.invited_name,
        status: inv.status,
        role: inv.role,
        created_date: inv.created_date
      }))
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});