import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertCircle, Mail } from "lucide-react";

export default function InviteForm({ open, onOpenChange, onSubmit, loading, atLimit, message }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ email, name, role });
    setEmail("");
    setName("");
    setRole("user");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Convidar Membro para Equipe</DialogTitle>
          <DialogDescription>Adicione um novo membro ao seu escritório definindo seu perfil de acesso.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide">Nome (Opcional)</Label>
            <Input
              id="name"
              placeholder="João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1.5 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wide">Nível de Acesso</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">
                  <div>
                    <p className="font-medium">Usuário</p>
                    <p className="text-xs text-muted-foreground">Acesso total aos dados</p>
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div>
                    <p className="font-medium">Admin</p>
                    <p className="text-xs text-muted-foreground">Gerencia equipe e acessos</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {message && (
            <div className={`flex items-start gap-2.5 p-3 rounded-lg ${
              message.type === "error" 
                ? "bg-red-50 border border-red-200" 
                : "bg-emerald-50 border border-emerald-200"
            }`}>
              <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                message.type === "error" ? "text-red-600" : "text-emerald-600"
              }`} />
              <p className={`text-xs ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}>
                {message.text}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-xs"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || atLimit}
              className="text-xs gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              {loading ? "Enviando..." : "Enviar Convite"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}