import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiService";
import { useAuth } from "@/lib/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useOfficeOwner } from "@/hooks/useOfficeOwner";
import { UserPlus, History, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import TeamStats from "@/components/equipe/TeamStats";
import InviteForm from "@/components/equipe/InviteForm";
import TeamMemberCard from "@/components/equipe/TeamMemberCard";
import AccessLevels from "@/components/equipe/AccessLevels";

// Plano free = 1 membro, premium = ilimitado (ajuste conforme necessário)
const PLAN_LIMITS = { free: 1, premium: 999 };

export default function Equipe() {
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const { officeOwner, isLoading: ownerLoading } = useOfficeOwner();
  const [showInvite, setShowInvite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const qc = useQueryClient();

  // Busca apenas os convites feitos pelo proprietário do escritório
  const { data: invites = [] } = useQuery({
    queryKey: ["team-invites", officeOwner],
    queryFn: () => api.entities.TeamInvite.filter({ owner_email: officeOwner }),
    enabled: !!officeOwner,
  });

  const removeInvite = useMutation({
    mutationFn: async (memberEmail) => {
      // Use the backend function for better control
      const res = await api.functions.invoke('removeTeamMember', { memberEmail });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["team-invites"] }),
  });

  // Only the office owner can access this page (wait for owner to load before blocking)
  if (!ownerLoading && officeOwner && user?.email !== officeOwner) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="bg-card border border-red-200 rounded-xl p-8 text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Acesso Restrito</h1>
          <p className="text-muted-foreground">Você não tem permissão para acessar o gerenciamento de equipe.</p>
        </div>
      </div>
    );
  }

  // Limite baseado no plano do usuário
  const planLimit = isPremium ? PLAN_LIMITS.premium : PLAN_LIMITS.free;
  const activeMembersCount = invites.filter(i => i.status === "Aceito").length;
  const membersCount = activeMembersCount + 1; // +1 pelo próprio dono
  const atLimit = membersCount >= planLimit;

  const handleInvite = async (data) => {
    if (!data.email) return;
    if (atLimit) {
      setMessage({ type: "error", text: `Seu plano permite até ${planLimit} membro(s). Faça upgrade para convidar mais.` });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      // Criar o convite
      const invite = await api.entities.TeamInvite.create({
        owner_email: officeOwner,
        invited_email: data.email,
        invited_name: data.name,
        role: data.role,
        status: "Enviado",
      });
      
      // Tentar enviar email - se falhar, gerar link para compartilhar
      try {
        await api.functions.invoke('sendTeamInviteEmail', {
          invitedEmail: data.email,
          invitedName: data.name || data.email,
          ownerName: user.full_name || "FinanceVerde",
          inviteId: invite.id
        });
        setMessage({ type: "success", text: "Convite enviado por email!" });
        qc.invalidateQueries({ queryKey: ["team-invites"] });
        setShowInvite(false);
      } catch (emailErr) {
        // Se o email falhar, gerar link para copiar
        const appUrl = (import.meta.env.VITE_APP_URL || window.location.origin).replace(/\/$/, '');
        const shareLink = `${appUrl}/accept-invite?id=${invite.id}`;
        navigator.clipboard.writeText(shareLink).then(() => {
          setMessage({ 
            type: "success", 
            text: `Link copiado! Compartilhe com o usuário para ele se cadastrar.` 
          });
          qc.invalidateQueries({ queryKey: ["team-invites"] });
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erro ao criar convite. Tente novamente." });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const initials = (nameOrEmail) => (nameOrEmail || "?")[0].toUpperCase();

  const activeMembers = invites.filter(i => i.status !== "Cancelado");
  const history = invites;

  const pendingCount = invites.filter(i => i.status === "Enviado").length;

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header Section */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Minha Equipe</h1>
            <p className="text-sm text-muted-foreground mt-1">Gerencie os membros e acessos do seu escritório</p>
          </div>
          <Button 
            onClick={() => { setShowInvite(true); setMessage(null); }} 
            size="sm" 
            className="gap-1.5 text-xs shrink-0"
            disabled={atLimit}
          >
            <UserPlus className="w-3.5 h-3.5" /> Convidar Membro
          </Button>
        </div>

        <TeamStats 
          activeCount={activeMembers.length}
          invitedCount={pendingCount}
          planLimit={planLimit}
          isPremium={isPremium}
          atLimit={atLimit}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Team Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Owner Card */}
          {officeOwner && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">Proprietário</h2>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{officeOwner[0].toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{user?.full_name || officeOwner}</p>
                    <p className="text-xs text-muted-foreground truncate">{officeOwner}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                    <span className="text-xs font-semibold text-primary">Proprietário</span>
                  </div>
                </div>
                {isPremium && (
                  <div className="flex items-center gap-1.5 text-xs bg-primary/5 border border-primary/20 rounded-lg px-2.5 py-1.5 text-primary font-medium">
                    <span>✨ Premium</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Members Section */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">Membros Ativos ({activeMembers.length})</h2>
            {activeMembers.length === 0 ? (
              <div className="text-center py-10 bg-card border border-border rounded-xl">
                <Mail className="w-10 h-10 mx-auto mb-2 opacity-20" />
                <p className="text-sm text-muted-foreground">Nenhum membro convidado ainda</p>
              </div>
            ) : (
              <div className="space-y-2">
                {activeMembers.map(member => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    isOwner={false}
                    onRemove={() => removeInvite.mutate(member.invited_email)}
                    loading={removeInvite.isPending}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pending Invites */}
          {pendingCount > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">Convites Pendentes ({pendingCount})</h2>
              <div className="space-y-2">
                {invites.filter(i => i.status === "Enviado").map(member => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    isOwner={false}
                    onRemove={() => removeInvite.mutate(member.invited_email)}
                    loading={removeInvite.isPending}
                  />
                ))}
              </div>
            </div>
          )}

          {/* History */}
          {invites.filter(i => i.status === "Cancelado").length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                <History className="w-3.5 h-3.5" />
                Removidos
              </h2>
              <div className="space-y-2">
                {invites.filter(i => i.status === "Cancelado").map(member => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    isOwner={false}
                    onRemove={() => removeInvite.mutate(member.invited_email)}
                    loading={removeInvite.isPending}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Reference */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">Guia de Permissões</h2>
          <AccessLevels />
        </div>
      </div>

      {/* Invite Form Dialog */}
      <InviteForm 
        open={showInvite} 
        onOpenChange={setShowInvite}
        onSubmit={handleInvite}
        loading={loading}
        atLimit={atLimit}
        message={message}
      />
    </div>
  );
}
