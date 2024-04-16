import type { WithFormId } from '@dashboard/components/forms/Form/ExitFormDialogProvider';
import { useExitFormDialog } from '@dashboard/components/forms/Form/useExitFormDialog';
import useListActions from '@dashboard/hooks/useListActions';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { ChannelsAction } from '@dashboard/oldSrc/channels/urls';
import type { Dispatch, SetStateAction } from 'react';

interface Modal {
  openModal: (action: ChannelsAction) => void;
  closeModal: () => void;
}

interface UseChannelsReturnType<T extends { id: string; name: string }, A> {
  channelListElements: T[];
  channelsToggle: (data: T) => void;
  currentChannels: T[];
  handleChannelsConfirm: () => void;
  handleChannelsModalClose: () => void;
  handleChannelsModalOpen: () => void;
  isChannelSelected: (data: T) => boolean;
  isChannelsModalOpen: boolean;
  setCurrentChannels: Dispatch<SetStateAction<T[]>>;
  toggleAllChannels: (items: T[], selected: number) => void;
}

function useChannels<T extends { id: string; name: string }, A>(
  channels: T[],
  action: A | ChannelsAction,
  { closeModal, openModal }: Modal,
  opts: WithFormId
): UseChannelsReturnType<T, A> {
  const { formId } = opts;
  const { setIsDirty } = useExitFormDialog({ formId });
  const [currentChannels, setCurrentChannels] = useStateFromProps(channels);

  const {
    isSelected: isChannelSelected,
    listElements: channelListElements,
    set: setChannels,
    toggle: channelsToggle,
  } = useListActions<T>(currentChannels, (a, b) => a.id === b.id);

  const handleChannelsModalClose = () => {
    closeModal();
    setChannels(currentChannels);
  };

  const handleChannelsModalOpen = () => openModal('open-channels-picker');

  const handleChannelsConfirm = () => {
    const sortedChannelListElements = channelListElements.sort((channel, nextChannel) =>
      channel.name.localeCompare(nextChannel.name)
    );
    setCurrentChannels(sortedChannelListElements);

    // hack so channels also update exit form dialog provider
    // despite not setting page's form data "changed" prop
    setIsDirty(true);

    closeModal();
  };

  const toggleAllChannels = (items: T[], selected: number) => {
    if (selected !== items.length) {
      setChannels(items);
    } else {
      setChannels([]);
    }
  };

  return {
    channelListElements,
    channelsToggle,
    currentChannels,
    handleChannelsConfirm,
    handleChannelsModalClose,
    handleChannelsModalOpen,
    isChannelSelected,
    isChannelsModalOpen: action === 'open-channels-picker',
    setCurrentChannels,
    toggleAllChannels,
  };
}

export default useChannels;
