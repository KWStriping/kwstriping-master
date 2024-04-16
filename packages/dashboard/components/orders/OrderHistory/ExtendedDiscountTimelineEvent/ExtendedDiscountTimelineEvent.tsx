import { OrderEventType } from '@core/api/constants';
import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import { TimelineEvent } from '@dashboard/components/core/Timeline';
import type { TitleElement } from '@dashboard/components/core/Timeline/TimelineEventHeader';
import type { OrderEventFragment } from '@core/api/graphql';

import Label from '../Label';
import MoneySection, { MoneySectionType } from './MoneySection';

const useStyles = makeStyles(
  () => ({
    horizontalContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      width: '100%',
    },
  }),
  { name: 'ExtendedDiscountTimelineEvent' }
);

export const messages = {
  reasonLabel: {
    id: 'kVOslW',
    defaultMessage: 'Reason for discount',
    description: 'reason for discount label',
  },
};

interface ExtendedTimelineEventProps {
  event: Maybe<OrderEventFragment>;
  titleElements: TitleElement[];
}

const ExtendedDiscountTimelineEvent: FC<ExtendedTimelineEventProps> = ({
  event,
  titleElements,
}) => {
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};

  const { lines, date, type } = event;

  const parsedDiscount =
    type === OrderEventType.OrderLineDiscountUpdated ? lines[0].discount : event.discount;

  const {
    valueType: calculationMode,
    value,
    reason,
    amount: moneyData,
    oldValueType: oldCalculationMode,
    oldValue,
    oldAmount: oldMoneyData,
  } = parsedDiscount;

  const shouldDisplayOldNewSections = !!oldValue;

  return (
    <TimelineEvent date={date} titleElements={titleElements}>
      {shouldDisplayOldNewSections && (
        <div className={styles.horizontalContainer ?? ''}>
          <MoneySection
            sectionType={MoneySectionType.New}
            value={value}
            moneyData={moneyData}
            calculationMode={calculationMode}
          />
          <MoneySection
            sectionType={MoneySectionType.Old}
            value={oldValue}
            moneyData={oldMoneyData}
            calculationMode={oldCalculationMode}
          />
        </div>
      )}

      {!shouldDisplayOldNewSections && (
        <MoneySection
          sectionType={MoneySectionType.Only}
          value={value}
          moneyData={moneyData}
          calculationMode={calculationMode}
        />
      )}

      <CardSpacer />
      {!!reason && (
        <>
          <Label text={t('dashboard.easonLabel', 'Reason for discount')} />
          <Typography>{reason}</Typography>
        </>
      )}
    </TimelineEvent>
  );
};

export default ExtendedDiscountTimelineEvent;
