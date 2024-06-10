import { useTranslation } from '@core/i18n';
import type { FC } from 'react';
import type { Weight } from '../Weight';

export interface WeightRangeProps {
  from?: Weight;
  to?: Weight;
}

const WeightRange: FC<WeightRangeProps> = ({ from, to }) => {
  const { t } = useTranslation();
  return (
    <>
      <span>
        {from && to
          ? t(
              'dashboard.fromWeightToWeight',
              '{{fromValue}} {{fromUnit}} - {{toValue}} {{toUnit}}',
              {
                fromUnit: from.unit,
                fromValue: from.value,
                toUnit: to.unit,
                toValue: to.value,
              }
            )
          : from && !to
          ? t('dashboard.fromWeight', 'from {{value}} {{unit}}', {
              unit: from.unit,
              value: from.value,
            })
          : !from && to
          ? t('dashboard.oWeight', 'to {{value}} {{unit}}', {
              unit: to.unit,
              value: to.value,
            })
          : '-'}
      </span>
    </>
  );
};
WeightRange.displayName = 'WeightRange';
export default WeightRange;
