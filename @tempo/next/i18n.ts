import { Navigation, Middleware, PrefixStrategy } from '@inlang/paraglide-next';
import type { AvailableLanguageTag } from '@paraglide/runtime';

export { LanguageProvider } from '@inlang/paraglide-next';

export const strategy = PrefixStrategy<AvailableLanguageTag>();

export const middleware = Middleware({ strategy });

export const { Link, useRouter, usePathname, redirect, permanentRedirect } = Navigation({
  strategy,
});
