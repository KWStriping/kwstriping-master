import { useUser } from '@core/auth/react/hooks';
import { Layout } from '@core/ui/components/Layout';
import { NavigationPanel } from '@core/ui/components/Layout/NavigationPanel';
import { Spinner } from '@core/ui/components/Spinner';
import { usePaths } from '@core/ui/providers/PathsProvider';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

export interface AccountLayoutProps {
  children: ReactNode;
}

export function AccountLayout({ children }: AccountLayoutProps) {
  const router = useRouter();
  const paths = usePaths();
  const { authenticated, authenticating } = useUser();
  if (authenticating) {
    return (
      <Layout logo={null} navbarItems={[]}>
        <Spinner />
      </Layout>
    );
  }

  if (!authenticated && typeof window !== 'undefined') {
    void router.push(paths.login({ next: router.asPath }));
    return null;
  }

  return (
    <Layout logo={null} navbarItems={[]}>
      <div className="py-10">
        <main className="flex flex-col sm:flex-row container p-4 bg-paper">
          <div className="mb-2">
            <NavigationPanel />
          </div>
          <div className="flex w-full flex-col overflow-y-auto md:px-4 space-y-4">{children}</div>
        </main>
      </div>
    </Layout>
  );
}
