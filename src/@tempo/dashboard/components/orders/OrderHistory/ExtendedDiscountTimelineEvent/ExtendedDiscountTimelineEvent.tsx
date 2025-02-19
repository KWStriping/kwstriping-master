import * as m from '@paraglide/messages';
import { OrderEventType } from '@tempo/api/generated/constants';
// import { useTranslation } from '@tempo/next/i18n';
import { makeStyles } from '@tempo/ui/theme/styles';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import type { OrderEventFragment } from '@tempo/api/generated/graphql';
import Label from '../Label';
import MoneySection, { MoneySectionType } from './MoneySection';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import { TimelineEvent } from '@tempo/dashboard/components/core/Timeline';
import type { TitleElement } from '@tempo/dashboard/components/core/Timeline/TimelineEventHeader';

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
          <Label text={m.dashboard_easonLabel() ?? 'Reason for discount'} />
          <Typography>{reason}</Typography>
        </>
      )}
    </TimelineEvent>
  );
};

export default ExtendedDiscountTimelineEvent;
