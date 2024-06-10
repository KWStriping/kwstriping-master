import { useColorScheme } from '@core/ui/theme/styles';
import type { TurnstileProps as ReactTurnstileProps } from '@marsidev/react-turnstile';
import { Turnstile as ReactTurnstile } from '@marsidev/react-turnstile';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileProps = Omit<ReactTurnstileProps, 'siteKey'>;

export function Turnstile(props: TurnstileProps) {
  const { colorScheme } = useColorScheme();
  if (!TURNSTILE_SITE_KEY) throw new Error('Turnstile site key is not defined');

  return (
    <ReactTurnstile
      siteKey={TURNSTILE_SITE_KEY}
      scriptOptions={{
        async: true,
        defer: true,
      }}
      options={{
        theme: colorScheme === 'dark' ? 'dark' : 'auto',
        size: 'invisible',
      }}
      {...props}
    />
  );
}
