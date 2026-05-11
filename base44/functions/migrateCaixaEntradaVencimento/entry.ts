import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const MESES_ORDER = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();

  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
  }

  const items = await base44.asServiceRole.entities.CaixaEntrada.list();

  const toUpdate = items.filter(i => !i.vencimento && i.competencia);

  const anoAtual = new Date().getFullYear();

  let updated = 0;
  for (const item of toUpdate) {
    const idx = MESES_ORDER.indexOf(item.competencia);
    if (idx === -1) continue;
    // Usa o ano do created_date se disponível, senão usa o ano atual
    const ano = item.created_date ? new Date(item.created_date).getFullYear() : anoAtual;
    const mm = String(idx + 1).padStart(2, "0");
    const vencimento = `${ano}-${mm}-01`;
    await base44.asServiceRole.entities.CaixaEntrada.update(item.id, { vencimento });
    updated++;
  }

  return Response.json({ total: items.length, sem_vencimento: toUpdate.length, atualizados: updated });
});