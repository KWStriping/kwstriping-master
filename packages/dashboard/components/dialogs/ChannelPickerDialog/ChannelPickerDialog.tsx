import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { Autocomplete } from '@core/ui/components/inputs/Autocomplete';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import type { Choice } from '@dashboard/components/fields/SingleSelectField';
import useChoiceSearch from '@dashboard/hooks/useChoiceSearch';
import useModalDialogOpen from '@dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import MenuItem from '@mui/material/MenuItem';
import type { FC } from 'react';

export interface ChannelPickerDialogProps {
  channelsChoices: Array<Choice<string, string>>;
  confirmButtonState: ConfirmButtonTransitionState;
  defaultChoice: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (choice: string) => void;
}

const ChannelPickerDialog: FC<ChannelPickerDialogProps> = ({
  channelsChoices = [],
  confirmButtonState,
  defaultChoice,
  open,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const [choice, setChoice] = useStateFromProps(
    defaultChoice || (channelsChoices[0] ? channelsChoices[0].value : '')
  );
  const { result, search } = useChoiceSearch(channelsChoices);

  useModalDialogOpen(open, {
    onClose: () => {
      search('');
      setChoice(defaultChoice);
    },
  });

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={() => onConfirm(choice)}
      title={t('dashboard.selectChannel', 'Select a channel')}
    >
      <Autocomplete
        choices={result}
        fullWidth
        label={t('dashboard.channelName', 'Channel name')}
        data-test-id="channel-autocomplete"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        onInputChange={search}
      >
        {({ getItemProps, highlightedIndex }) =>
          result.map((choice, choiceIndex) => (
            <MenuItem
              data-test-id="select-field-option"
              selected={highlightedIndex === choiceIndex}
              key={choice.value}
              {...getItemProps({ item: choice, index: choiceIndex })}
            >
              {choice.label}
            </MenuItem>
          ))
        }
      </Autocomplete>
    </ActionDialog>
  );
};
ChannelPickerDialog.displayName = 'ChannelPickerDialog';
export default ChannelPickerDialog;
