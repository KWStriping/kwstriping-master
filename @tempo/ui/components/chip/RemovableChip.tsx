import type { FC } from 'react';
import type { ChipProps } from './Chip';
import Chip from './Chip';

export const RemovableChip: FC<ChipProps> = (props: ChipProps) => {
  return <Chip {...props} />;
};
