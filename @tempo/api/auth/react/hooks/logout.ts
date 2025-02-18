'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import { signOut } from '@tempo/api/auth/react';
import type { LogoutMutation } from '@tempo/api/generated/graphql';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { LogoutDocument } from '@tempo/api/generated/graphql';
import type { MutationState } from '@tempo/api/types';

interface UseLogoutResult {
  logout: () => Promise<void>;
  backendState: MutationState<LogoutMutation, any>;
}

export const useLogout = (): UseLogoutResult => {
  // console.log('>>> useLogout');
  const { resetCheckoutId } = useCheckout();
  const router = useRouter();
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
    await router.push('/');
  }, [resetCheckoutId, router]);
  return { logout, backendState: logoutBackendResult };
};

export default useLogout;
