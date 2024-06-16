import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import { DiscountValueType } from '@tempo/api/generated/constants';
import type { MoneyFragment } from '@tempo/api/generated/graphql';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import Label from '../Label';

const useStyles = makeStyles(
  () => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    horizontalContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
    },
  }),
  { name: 'MoneySection' }
);

export const messages = {
  discount: {
    id: 'yJynYK',
    defaultMessage: 'discount',
    description: 'discount value',
  },
  fixedAmount: {
    id: 'Zhxu58',
    defaultMessage: 'Fixed amount',
    description: 'Fixed amount subtitle',
  },

  newDiscountSectionTitle: {
    id: 'MTl5o6',
    defaultMessage: 'New discount value',
    description: 'new discount label',
  },
  oldDiscountSectionTitle: {
    id: '2Sx05f',
    defaultMessage: 'Previous discount value',
    description: 'Previous discount label',
  },
  onlyDiscountSectionTitle: {
    id: 'ojHyj3',
    defaultMessage: 'discount value',
    description: 'discount value label',
  },
};

export enum MoneySectionType {
  Old = 'old',
  New = 'new',
  Only = 'only',
}

interface MoneySectionProps {
  value?: number;
  calculationMode?: DiscountValueType;
  moneyData?: Maybe<MoneyFragment>;
  sectionType?: MoneySectionType;
}

const MoneySection: FC<MoneySectionProps> = ({
  value,
  calculationMode,
  moneyData,
  sectionType = MoneySectionType.Only,
}) => {
  const styles = {};

  if (!value) return null;

  const getDiscountSubitle = () => {
    const isDiscountedByPercent = calculationMode === DiscountValueType.Percentage;

    if (isDiscountedByPercent) {
      return `${value}% ${m.dashboard_discount() ?? 'discount'}`;
    }

    return m.dashboard_ixedAmount() ?? 'Fixed amount';
  };

  const sectionTitleMessageKey = `${sectionType}DiscountSectionTitle`;

  return (
    <div className={styles.container ?? ''}>
      <Label text={m[messages[sectionTitleMessageKey]]} />
      <div className={styles.horizontalContainer ?? ''}>
        <Typography>{`${moneyData.amount} ${moneyData.currency}`}</Typography>

        <Label text={getDiscountSubitle()} />
      </div>
    </div>
  );
};

export default MoneySection;
