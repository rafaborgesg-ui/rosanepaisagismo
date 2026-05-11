import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [inviteData, setInviteData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inviteId = searchParams.get("id");

  useEffect(() => {
    const loadInvite = async () => {
      if (isLoadingAuth) return;

      if (!inviteId) {
        setStatus("error");
        setMessage("Link de convite inválido.");
        return;
      }

      try {
        const invites = await base44.entities.TeamInvite.filter({ id: inviteId });
        
        if (!invites || invites.length === 0) {
          setStatus("error");
          setMessage("Convite não encontrado.");
          return;
        }

        const invite = invites[0];

        if (invite.status === "Cancelado") {
          setStatus("error");
          setMessage("Este convite foi cancelado.");
          return;
        }

        if (invite.status === "Aceito") {
          setStatus("success");
          setMessage("Este convite já foi aceito. Você já é membro da equipe!");
          return;
        }

        setInviteData(invite);
        
        // Se autenticado, mostra página de aceitar
        if (isAuthenticated) {
          setStatus("processing");
        } else {
          // Redireciona para login do Base44
          await base44.auth.redirectToLogin(`/accept-invite?id=${inviteId}`);
        }
      } catch (err) {
        setStatus("error");
        setMessage("Erro ao carregar convite.");
      }
    };

    loadInvite();
  }, [isLoadingAuth, inviteId, isAuthenticated]);

  const handleAcceptLogged = async () => {
    if (user.email !== inviteData.invited_email) {
      setStatus("error");
      setMessage("Este convite é para outro email. Você está logado com " + user.email);
      return;
    }

    setIsSubmitting(true);
    try {
      await base44.entities.TeamInvite.update(inviteId, { status: "Aceito" });
      setStatus("success");
      setMessage("Bem-vindo! Você faz parte da equipe.");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setStatus("error");
      setMessage("Erro ao aceitar convite. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full">
        {status === "loading" && (
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto text-primary mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Processando seu convite...</h1>
            <p className="text-muted-foreground">Por favor, aguarde.</p>
          </div>
        )}

        {status === "processing" && inviteData && (
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Aceitar Convite</h1>
            <p className="text-muted-foreground mb-2">Você foi convidado para</p>
            <p className="text-lg font-semibold text-primary mb-6">{inviteData.owner_email}</p>
            <Button 
              onClick={handleAcceptLogged}
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground"
            >
              {isSubmitting ? "Processando..." : "Aceitar e Continuar"}
            </Button>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Sucesso!</h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <p className="text-xs text-muted-foreground">Redirecionando para o dashboard...</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-red-600 mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Erro</h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <div className="space-y-2">
              <Button onClick={() => navigate("/dashboard")} className="w-full">
                Ir para Dashboard
              </Button>
              <Button variant="outline" onClick={() => navigate("/")} className="w-full">
                Voltar para Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}