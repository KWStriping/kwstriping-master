import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { Autocomplete } from '@tempo/ui/components/inputs/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import type { Choice } from '@tempo/dashboard/components/fields/SingleSelectField';
import useChoiceSearch from '@tempo/dashboard/hooks/useChoiceSearch';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';

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
      title={m.dashboard_selectChannel() ?? 'Select a channel'}
    >
      <Autocomplete
        choices={result}
        fullWidth
        label={m.dashboard_channelName() ?? 'Channel name'}
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
