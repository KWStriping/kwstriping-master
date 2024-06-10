import * as m from '@paraglide/messages';
import type { FC } from 'react';
import type { Weight } from '../Weight';

export interface WeightRangeProps {
  from?: Weight;
  to?: Weight;
}

const WeightRange: FC<WeightRangeProps> = ({ from, to }) => {
  return (
    <>
      <span>
        {from && to
          ? t(
              'dashboard_fromWeightToWeight',
              '{{fromValue}} {{fromUnit}} - {{toValue}} {{toUnit}}',
              {
                fromUnit: from.unit,
                fromValue: from.value,
                toUnit: to.unit,
                toValue: to.value,
              }
            )
          : from && !to
            ? m.dashboard_fromWeight({
                unit: from.unit,
                value: from.value,
              }) ?? 'from {{value}} {{unit}}'
            : !from && to
              ? m.dashboard_oWeight({
                  unit: to.unit,
                  value: to.value,
                }) ?? 'to {{value}} {{unit}}'
              : '-'}
      </span>
    </>
  );
};
WeightRange.displayName = 'WeightRange';
export default WeightRange;
