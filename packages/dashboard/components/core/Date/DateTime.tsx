import { Tooltip } from '@core/ui/components/Tooltip';
import { useTimezone } from '@dashboard/components/core/Timezone';
import { Temporal, Intl } from '@js-temporal/polyfill';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import { useDate } from './DateContext';

interface FormattedDateTimeProps {
  date: string;
  plain?: boolean;
}

export const FormattedDateTime: FC<FormattedDateTimeProps> = ({ date, plain }) => {
  const getTitle = (value: string, locale?: string, tz?: string) => {
    // console.log("value", value);
    const date = Temporal.ZonedDateTime.from(value); // , { timeZone: tz, locale });
    return Intl.DateTimeFormat(locale).format(date);
  };
  const getFormattedDiff = (
    currentDate: number,
    futureDate: string,
    locale: string,
    tz: string
  ) => {
    const date = Temporal.Instant.fromEpochSeconds(currentDate); // , { timeZone: tz, locale });
    const future = Temporal.Instant.from(futureDate); // , { timeZone: tz, locale }
    const diff = future.since(date);
    return diff.toString();
  };
  const { locale = 'en-US' } = useRouter(); // TODO: use default locale
  const currentDate = useDate();
  const tz = useTimezone();
  return (
    <>
      {plain ? (
        getTitle(date, locale, tz)
      ) : (
        <Tooltip title={getTitle(date, locale, tz)}>
          <span>{getFormattedDiff(currentDate, date, locale, tz)}</span>
        </Tooltip>
      )}
    </>
  );
};
FormattedDateTime.displayName = 'DateTime';
export default FormattedDateTime;
