import { signOut } from '@core/auth/react';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';
import { usePaths } from '@core/ui/providers/PathsProvider';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useMutation } from '@core/urql/hooks/useMutation';
import { LogoutDocument } from '@core/api';
import type { LogoutMutation } from '@core/api';
import type { MutationState } from '@core/urql/types';

interface UseLogoutResult {
  logout: () => Promise<void>;
  backendState: MutationState<LogoutMutation>;
}

export const useLogout = (): UseLogoutResult => {
  // console.log('>>> useLogout');
  const { resetCheckoutId } = useCheckout();
  const router = useRouter();
  const paths = usePaths();
  const [logoutBackend, logoutBackendResult] = useMutation(LogoutDocument);
  const logout = useCallback(async () => {
    console.log('Signing out...');
    await logoutBackend({});
    await signOut({ redirect: false });
    // For some reason, signOut does not reliably clear the cookies.
    // Object.keys(getCookies()).forEach((name) => {
    //   console.log('>>>>', name);
    //   if (name.includes('next-auth')) deleteCookie(name);
    // });
    await router.push(paths.home());
  }, [paths, resetCheckoutId, router]);
  return { logout, backendState: logoutBackendResult };
};

export default useLogout;
