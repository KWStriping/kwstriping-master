import { useLocale } from '@tempo/ui/hooks/useLocale';
import { Temporal, Intl } from '@js-temporal/polyfill';

export type LocalizeDate = (date: string, format?: string) => string;

function useDateLocalize(): LocalizeDate {
  const { locale } = useLocale();

  return (date: string, format?: string) =>
    date ? Intl.DateTimeFormat(locale).format(Temporal.PlainDateTime.from(date)) : '';
}

export default useDateLocalize;
