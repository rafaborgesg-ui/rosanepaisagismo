import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from "@/api/apiService"; import { auth } from "@/api/authService";
import { useOfficeOwner } from './useOfficeOwner';

export function useSubscription() {
  const qc = useQueryClient();
  const { officeOwner } = useOfficeOwner();

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['subscription', officeOwner],
    queryFn: async () => {
      try {
        const response = await api.functions.invoke('getUserSubscription', {
          userEmail: officeOwner,
        });
        // Garantir que retornamos um objeto válido
        if (response?.data && typeof response.data === 'object') {
          return { plan: response.data.plan || 'premium', status: response.data.status || 'active' };
        }
        return { plan: 'premium', status: 'active' };
      } catch (err) {
        // Se a função não existe ou falha, assume premium para permitir acesso
        console.warn('getUserSubscription não disponível, usando plano padrão:', err?.message || err);
        return { plan: 'premium', status: 'active' };
      }
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
    gcTime: 1000 * 60 * 10,   // 10 min garbage collect
    retry: 1,
    enabled: !!officeOwner,
  });

  const startCheckout = async (priceId) => {
    try {
      const response = await api.functions.invoke('createCheckoutSession', {
        priceId,
      });
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('URL de checkout não retornada');
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  const setSubscriptionImmediate = (plan, status) => {
    qc.setQueryData(['subscription'], { plan, status });
  };

  return {
    plan: data?.plan || 'premium',
    status: data?.status || 'active',
    loading: isLoading || isFetching,
    error: error?.message || null,
    isPremium: data?.plan === 'premium',
    startCheckout,
    refetch,
    setSubscriptionImmediate,
  };
}
