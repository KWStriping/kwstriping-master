import { Tooltip } from '@tempo/ui/components/Tooltip';
import { useLocale } from '@tempo/ui/hooks/useLocale';
import { Temporal, Intl } from '@js-temporal/polyfill';
import type { FC } from 'react';

import { useDate } from './DateContext';
import useDateLocalize from '@tempo/dashboard/hooks/useDateLocalize';

interface DateProps {
  date: Maybe<string>;
  plain?: boolean;
}

export const Date: FC<DateProps> = ({ date, plain }) => {
  const localizeDate = useDateLocalize();
  const { locale } = useLocale();
  const currentDate = useDate();
  const getHumanized = (value: string, locale: string, _currentDate: number) => {
    const dt = Temporal.PlainDate.from(value);
    return Intl.DateTimeFormat(locale).format(dt);
  };
  if (!date) return null;
  return (
    <>
      {plain ? (
        localizeDate(date)
      ) : (
        <Tooltip title={localizeDate(date)}>
          <time dateTime={date ?? undefined} data-test-id="dateTime">
            {getHumanized(date, locale, currentDate)}
          </time>
        </Tooltip>
      )}
    </>
  );
};
Date.displayName = 'Date';
export default Date;
