import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from "@/api/apiService"; import { auth } from "@/api/authService";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingAuth, user } = useAuth();
  const { setSubscriptionImmediate, refetch } = useSubscription();
  const [searchParams] = useSearchParams();
  const saleId = searchParams.get('sale_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seconds, setSeconds] = useState(2);

  useEffect(() => {
    // Wait for auth to load
    if (isLoadingAuth) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const verifyPayment = async () => {
      if (!saleId) {
        setError('ID da venda inválido');
        setLoading(false);
        return;
      }

      try {
        const response = await api.functions.invoke('verifyKiwifyPayment', {
          saleId
        });

        if (response.data?.success) {
          // Update subscription cache immediately (síncrono)
          setSubscriptionImmediate('premium', 'active');
          
          // Refetch in background to ensure accuracy
          refetch();

          // Start countdown to dashboard
          const interval = setInterval(() => {
            setSeconds(s => {
              if (s <= 1) {
                clearInterval(interval);
                navigate('/dashboard', { replace: true });
                return 0;
              }
              return s - 1;
            });
          }, 1000);

          setLoading(false);
        } else {
          setError(response.data?.error || 'Não foi possível confirmar o pagamento');
          setLoading(false);
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('Erro ao validar pagamento. Tente novamente em alguns instantes.');
        setLoading(false);
      }
    };

    verifyPayment();
  }, [saleId, navigate, isAuthenticated, isLoadingAuth]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {loading ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Processando pagamento...</h1>
            <p className="text-muted-foreground">Um momento enquanto validamos sua transação.</p>
          </>
        ) : error ? (
          <>
            <div className="flex justify-center mb-6">
              <AlertCircle className="w-20 h-20 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Erro ao processar</h1>
            <p className="text-muted-foreground mb-8">{error}</p>
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/sistema')}
                className="w-full bg-primary text-primary-foreground"
              >
                Tentar Novamente
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="w-full"
              >
                Ir para Dashboard
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6 animate-scale-in">
              <CheckCircle2 className="w-20 h-20 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Sucesso! 🎉</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Sua assinatura Premium foi ativada com sucesso.
            </p>
            {seconds > 0 && (
              <p className="text-sm text-muted-foreground mb-8">
                Redirecionando em {seconds}s...
              </p>
            )}
            <Button
              onClick={() => navigate('/dashboard', { replace: true })}
              className="w-full bg-primary text-primary-foreground"
            >
              Ir para Dashboard Agora
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
