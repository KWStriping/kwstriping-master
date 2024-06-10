import { ExitFormDialogContext } from '@tempo/dashboard/components/forms/Form/ExitFormDialogProvider';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export type UseNavigatorResult = (
  url: string,
  opts?: {
    replace?: boolean;
    preserveQs?: boolean;
    resetScroll?: boolean;
  }
) => void;
function useNavigator(): UseNavigatorResult {
  const router = useRouter();
  const { shouldBlockNavigation } = useContext(ExitFormDialogContext);

  return (url: string, { replace = false, preserveQs = false, resetScroll = false } = {}) => {
    if (shouldBlockNavigation()) return;

    const targetUrl = preserveQs ? url + router.query : url;

    if (replace) {
      router.replace(targetUrl);
    } else {
      void router.push(targetUrl);
    }

    if (resetScroll) {
      window.scrollTo({ behavior: 'smooth', top: 0 });
    }
  };
}

export default useNavigator;
