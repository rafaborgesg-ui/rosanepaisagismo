import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const ENTITIES = [
  'Commercial',
  'CaixaEntrada',
  'CaixaSaida',
  'Cliente',
  'Fornecedor',
  'Projeto',
  'MetaAnual',
  'ProjetoExecucao',
];

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();

  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const results = {};

  for (const entityName of ENTITIES) {
    const records = await base44.asServiceRole.entities[entityName].list();
    const toFix = records.filter(r => {
      const owner = r.office_owner ?? r.data?.office_owner;
      return r.created_by && (!owner || owner === '');
    });
    let updated = 0;

    for (const r of toFix) {
      await base44.asServiceRole.entities[entityName].update(r.id, {
        office_owner: r.created_by,
      });
      updated++;
    }
    
    // Log first record structure for debugging
    if (records.length > 0 && updated === 0) {
      console.log(`[${entityName}] Sample record keys:`, JSON.stringify(Object.keys(records[0])));
      console.log(`[${entityName}] Sample office_owner:`, records[0].office_owner, '| data.office_owner:', records[0].data?.office_owner);
    }

    results[entityName] = { total: records.length, fixed: updated };
  }

  return Response.json({ success: true, results });
});