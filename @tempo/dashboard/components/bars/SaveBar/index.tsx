import { Button } from '@tempo/ui/components/buttons/Button';
import { ConfirmButton } from '@tempo/ui/components/buttons/ConfirmButton';
import type {
  ConfirmButtonLabels,
  ConfirmButtonTransitionState,
} from '@tempo/ui/components/buttons/ConfirmButton';
import { ActionBar } from '@tempo/dashboard/components/bars/ActionBar';
import clsx from 'clsx';
import type { FC } from 'react';
import { ButtonTooltipDecorator } from './ButtonTooltipDecorator';

export type SaveBarLabels = ConfirmButtonLabels & Record<'delete' | 'cancel', string>;
export type SaveBarTooltips = Partial<Record<'confirm' | 'delete' | 'cancel', string>>;
export interface SaveBarProps {
  disabled: boolean;
  state: ConfirmButtonTransitionState;
  labels: SaveBarLabels;
  tooltips?: SaveBarTooltips;
  className?: string;
  onCancel: () => void;
  onDelete?: () => void;
  onSubmit: () => void;
}

export const SaveBar: FC<SaveBarProps> = ({
  disabled,
  labels,
  tooltips,
  state,
  className,
  onCancel,
  onDelete,
  onSubmit,
}) => {
  return (
    <ActionBar state={state} disabled={disabled} className={clsx(className)}>
      {!!onDelete && (
        <ButtonTooltipDecorator tooltip={tooltips?.delete}>
          <Button color="error" onClick={onDelete} data-test-id="button-bar-delete">
            {labels.delete}
          </Button>
        </ButtonTooltipDecorator>
      )}
      <div className={'grow shrink'} />
      <ButtonTooltipDecorator tooltip={tooltips?.cancel}>
        <Button color="secondary" onClick={onCancel} data-test-id="button-bar-cancel">
          {labels.cancel}
        </Button>
      </ButtonTooltipDecorator>
      <ButtonTooltipDecorator tooltip={tooltips?.confirm}>
        <ConfirmButton
          disabled={disabled}
          labels={labels}
          onClick={onSubmit}
          transitionState={state}
          data-test-id="button-bar-confirm"
        />
      </ButtonTooltipDecorator>
    </ActionBar>
  );
};
SaveBar.displayName = 'SaveBar';
