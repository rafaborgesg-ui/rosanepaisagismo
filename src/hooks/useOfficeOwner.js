import { useQuery } from '@tanstack/react-query';
import { api } from "@/api/apiService"; import { auth } from "@/api/authService";
import { useAuth } from '@/lib/AuthContext';

/**
 * Returns { officeOwner, isLoading }
 *
 * officeOwner is NEVER null when the user is logged in:
 *   - During loading: returns user.email as optimistic fallback
 *   - After loading: returns owner_email if user is an invited member, or user.email if owner
 *
 * This prevents silent save failures when officeOwner is null during the async resolve.
 */
export function useOfficeOwner() {
  const { user } = useAuth();

  const { data: resolvedOwner, isLoading } = useQuery({
    queryKey: ['office-owner', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;

      const invites = await api.entities.TeamInvite.filter({
        invited_email: user.email,
        status: 'Aceito'
      });

      const validInvites = invites.filter(
        i => i.owner_email && i.owner_email !== user.email
      );

      if (validInvites.length > 0) {
        const sorted = validInvites.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        );
        return sorted[0].owner_email;
      }

      return user.email;
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5,
  });

  // Always provide a non-null value when user is available.
  // During loading, fall back to user.email (optimistic: assume they are an owner).
  // After loading, use the resolved value.
  const officeOwner = resolvedOwner ?? user?.email ?? null;

  return {
    officeOwner,
    isLoading,
  };
}
