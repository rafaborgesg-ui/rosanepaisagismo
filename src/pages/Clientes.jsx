import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { Plus, Pencil, Trash2, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import ClienteForm from "@/components/clientes/ClienteForm";

export default function Clientes() {
  const { officeOwner } = useOfficeOwner();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data: clientes = [] } = useQuery({
    queryKey: ["clientes", officeOwner],
    queryFn: () => base44.entities.Cliente.filter({ office_owner: officeOwner }),
    enabled: !!officeOwner,
  });

  const closeForm = () => { setShowForm(false); setEditing(null); };
  const createM = useMutation({ mutationFn: d => base44.entities.Cliente.create(d), onSuccess: () => { qc.invalidateQueries({ queryKey: ["clientes"] }); closeForm(); } });
  const updateM = useMutation({ mutationFn: ({ id, data }) => base44.entities.Cliente.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ["clientes"] }); closeForm(); } });
  const deleteM = useMutation({ mutationFn: id => base44.entities.Cliente.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ["clientes"] }) });

  const handleSave = (data) => {
    editing ? updateM.mutate({ id: editing.id, data }) : createM.mutate({ ...data, office_owner: officeOwner });
  };

  const filtered = clientes.filter(c =>
    c.nome?.toLowerCase().includes(search.toLowerCase()) ||
    c.cidade?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-4">
      <PageHeader
        title="Clientes"
        subtitle={`${clientes.length} cliente(s) cadastrado(s)`}
        actions={
          <Button onClick={() => { setEditing(null); setShowForm(true); }} size="sm" className="h-8 text-xs gap-1.5 px-3">
            <Plus className="w-3.5 h-3.5" /> Novo Cliente
          </Button>
        }
      />

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/20">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <Input
              placeholder="Buscar por nome ou cidade..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 h-7 text-xs bg-background"
            />
          </div>
          <span className="text-[11px] text-muted-foreground ml-auto">{filtered.length} resultado(s)</span>
        </div>

        {filtered.length === 0
          ? <EmptyState title="Nenhum cliente cadastrado" description="Adicione clientes para agilizar o preenchimento de propostas." />
          : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
                    {["Nome", "Telefone", "E-mail", "Endereço", "Cidade", ""].map(h => (
                      <TableHead key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 py-2.5">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(c => (
                    <TableRow key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors group">
                      <TableCell className="text-[12px] font-semibold text-foreground py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserRound className="w-3.5 h-3.5 text-primary" />
                          </div>
                          {c.nome}
                        </div>
                      </TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5">{c.telefone || "—"}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5">{c.email || "—"}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5 max-w-[200px] truncate">{c.endereco || "—"}</TableCell>
                      <TableCell className="text-[11px] text-muted-foreground py-2.5">{c.cidade || "—"}</TableCell>
                      <TableCell className="py-2.5 w-14">
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditing(c); setShowForm(true); }} className="p-1 hover:bg-muted rounded-md transition-colors">
                            <Pencil className="w-3 h-3 text-muted-foreground" />
                          </button>
                          <button onClick={() => { if (confirm("Excluir este cliente?")) deleteM.mutate(c.id); }} className="p-1 hover:bg-red-50 rounded-md transition-colors">
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )
        }
      </div>

      <ClienteForm open={showForm} onClose={closeForm} onSave={handleSave} initialData={editing} />
    </div>
  );
}