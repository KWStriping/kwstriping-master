import type { TFunction } from '@tempo/next/i18n';
import { makeStyles } from '@tempo/ui/theme/styles';
import { joinDateTime, splitDateTime } from '@tempo/utils/datetime';
import { FilterType } from '../types';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';

export const filterTestingContext = 'filter-field-';

export const useCommonStyles = makeStyles(
  (theme) => ({
    andLabel: {
      margin: theme.spacing(1, 2, 1, 0),
    },
    arrow: {
      marginRight: theme.spacing(2),
    },
    input: {
      padding: '12px 0 9px 12px',
    },
    inputRange: {
      alignItems: 'center',
      display: 'flex',
    },
    inputTime: {
      marginLeft: theme.spacing(1),
      width: '150px',
    },
    spacer: {
      paddingRight: theme.spacing(4),
    },
  }),
  { name: 'FilterContentBodyCommon' }
);

export function getIsFilterMultipleChoices(t: TFunction): SingleAutocompleteChoiceType[] {
  return [
    {
      label: t(
        'dashboard_+UwqI',
        'equal to'
        // is filter range or value
      ),
      value: FilterType.Singular,
    },
    {
      label: t(
        'dashboard_BxN6z',
        'between'
        // is filter range or value
      ),
      value: FilterType.Multiple,
    },
  ];
}

export const getDateFilterValue = (
  dateTime: string,
  dateTimeString: string | null,
  dateTimeFormat: boolean
) => {
  const { date } = splitDateTime(dateTime);
  if (!dateTimeFormat) {
    return date;
  }
  const { time } = splitDateTime(dateTimeString);
  return joinDateTime(date, time);
};

export const getDateTimeFilterValue = (dateTimeString: string | null, timeString: string) => {
  const { date } = splitDateTime(dateTimeString || new Date().toISOString());
  return joinDateTime(date, timeString);
};
