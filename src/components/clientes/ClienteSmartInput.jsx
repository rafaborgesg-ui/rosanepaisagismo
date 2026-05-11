import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { base44 } from "@/api/base44Client";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClienteSmartInput({
  value,
  onChange,
  clientes = [],
  officeOwner,
  autoFocus = false
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(value || "");
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setSearch(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = clientes.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );

  const clienteExists = clientes.some(c => c.nome.toLowerCase() === search.toLowerCase());

  const handleSelect = (nome) => {
    onChange(nome);
    setSearch(nome);
    setOpen(false);
  };

  const handleCreateAndSelect = async () => {
    if (!search.trim()) return;
    setIsCreating(true);
    try {
      await base44.entities.Cliente.create({
        office_owner: officeOwner,
        nome: search.trim(),
      });
      onChange(search.trim());
      setSearch("");
      setOpen(false);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Selecione ou digite o cliente"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          autoFocus={autoFocus}
          className="pr-9"
        />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-md z-50 max-h-48 overflow-y-auto">
          {filtered.length > 0 ? (
            <div className="p-1">
              {filtered.map((cliente) => (
                <button
                  key={cliente.id}
                  type="button"
                  onClick={() => handleSelect(cliente.nome)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                >
                  {cliente.nome}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-2 text-center text-muted-foreground text-sm">
              {search.trim() ? (
                <div className="space-y-2">
                  <p>Nenhum cliente encontrado</p>
                </div>
              ) : (
                <p>Digite para buscar clientes</p>
              )}
            </div>
          )}

          {search.trim() && !clienteExists && (
            <div className="border-t border-border p-2">
              <button
                type="button"
                onClick={handleCreateAndSelect}
                disabled={isCreating}
                className={cn(
                  "w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isCreating
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                {isCreating ? "Criando..." : `Criar cliente "${search.trim()}"`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}