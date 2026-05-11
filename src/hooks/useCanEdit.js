import { useSubscription } from './useSubscription';
import { useOfficeOwner } from './useOfficeOwner';

/**
 * Returns { canEdit, loading }
 * canEdit = true  → user has premium access (own or via office owner)
 * loading = true  → still resolving office owner or subscription
 * While loading or on error, canEdit defaults to true to avoid false-disable.
 */
export function useCanEdit() {
  const { officeOwner, isLoading: ownerLoading } = useOfficeOwner();
  const { isPremium, loading: subLoading, error: subError } = useSubscription();

  const loading = ownerLoading || !officeOwner || subLoading;

  // While loading OR if subscription check fails, do NOT block editing
  return {
    canEdit: loading || !!subError ? true : isPremium,
    loading,
  };
}