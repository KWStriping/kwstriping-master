import { Trans } from '@core/i18n';
import type { FC } from 'react';

export interface Weight {
  unit: string;
  value: number;
}
export interface WeightProps {
  weight: Weight;
}

const Weight: FC<WeightProps> = ({ weight }) => (
  <Trans id="NtFVFS" defaultMessage="{value} {unit}" description="weight" values={weight} />
);

Weight.displayName = 'Weight';
export default Weight;
