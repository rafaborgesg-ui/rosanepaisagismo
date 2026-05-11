import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PremiumGate({ children, requiredPlan = 'premium', isPremium, onUpgrade }) {
  if (isPremium) {
    return children;
  }

  return (
    <div className="relative">
      <div className="opacity-40 pointer-events-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-background/80 rounded-lg backdrop-blur-sm">
        <div className="text-center space-y-3">
          <Lock className="w-8 h-8 text-muted-foreground mx-auto" />
          <div>
            <p className="font-semibold text-foreground text-sm">Recurso Premium</p>
            <p className="text-xs text-muted-foreground mt-1">Faça upgrade para acessar</p>
          </div>
          <Button
            size="sm"
            onClick={onUpgrade}
            className="bg-primary text-primary-foreground mt-2"
          >
            Fazer Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
}