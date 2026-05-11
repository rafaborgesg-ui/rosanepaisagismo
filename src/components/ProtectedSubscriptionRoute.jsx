import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';

export default function ProtectedSubscriptionRoute({ children }) {
  const navigate = useNavigate();
  const { plan, loading } = useSubscription();

  useEffect(() => {
    if (loading) return;

    // Se for plano free (sem pagamento), redireciona para sistem
    if (plan === 'free') {
      navigate('/sistema', { replace: true });
    }
  }, [plan, loading, navigate]);

  // Enquanto carrega, mostra loader
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Se tiver plano premium, renderiza o componente
  if (plan === 'premium') {
    return children;
  }

  return null;
}