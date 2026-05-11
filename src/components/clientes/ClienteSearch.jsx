import { useState, useRef, useEffect, useCallback } from "react";
import { Search, UserRound, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ClienteSearch({ clientes = [], onSelect, selectedNome, onClear, autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [autoFocus]);

  const filtered = query.length >= 1
    ? clientes.filter(c => c.nome?.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (cliente) => {
    onSelect(cliente);
    setQuery("");
    setOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  if (selectedNome) {
    return (
      <div className="flex items-center gap-2 h-9 w-full rounded-md border border-input bg-primary/5 px-3 text-sm">
        <UserRound className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <span className="font-medium text-foreground flex-1 truncate">{selectedNome}</span>
        <button type="button" onClick={handleClear} className="text-muted-foreground hover:text-foreground">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
        <Input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar cliente cadastrado..."
          className="pl-8 text-sm"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-md shadow-lg overflow-hidden">
          {filtered.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelect(c)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted/60 transition-colors text-left"
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UserRound className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{c.nome}</p>
                {c.cidade && <p className="text-xs text-muted-foreground">{c.cidade}</p>}
              </div>
            </button>
          ))}
        </div>
      )}
      {open && query.length >= 1 && filtered.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-md shadow-sm px-3 py-2 text-xs text-muted-foreground">
          Nenhum cliente encontrado
        </div>
      )}
    </div>
  );
}