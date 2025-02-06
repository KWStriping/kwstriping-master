import type { FC } from 'react';
import type { ChipProps } from './Chip';
import Chip from './Chip';

type RemovableChipProps = ChipProps & {
  onRemove: () => void;
};

export const RemovableChip: FC<RemovableChipProps> = (props: RemovableChipProps) => {
  return <Chip {...props} />;
};
