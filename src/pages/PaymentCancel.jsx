import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pagamento Cancelado</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Você cancelou o processo de assinatura. Nenhuma cobrança foi realizada.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => navigate('/pricing')}
            className="w-full bg-primary text-primary-foreground"
          >
            Tentar Novamente
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="w-full"
          >
            Continuar no Plano Grátis
          </Button>
        </div>
      </div>
    </div>
  );
}