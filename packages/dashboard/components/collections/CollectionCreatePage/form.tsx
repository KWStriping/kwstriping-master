import type { OutputData } from '@editorjs/editorjs';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import type { MetadataFormData } from '@dashboard/components/core/Metadata';
import { useExitFormDialog } from '@dashboard/components/forms/Form/useExitFormDialog';
import type {
  CommonUseFormResultWithHandlers,
  FormChange,
  SubmitPromise,
} from '@dashboard/hooks/useForm';
import useForm from '@dashboard/hooks/useForm';
import useHandleFormSubmit from '@dashboard/hooks/useHandleFormSubmit';
import type { ChannelCollectionData } from '@dashboard/oldSrc/channels/utils';
import { COLLECTION_CREATE_FORM_ID } from '@dashboard/oldSrc/collections/consts';
import { createChannelsChangeHandler } from '@dashboard/oldSrc/collections/utils';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import type { RichTextContextValues } from '@dashboard/oldSrc/utils/richText/context';
import { RichTextContext } from '@dashboard/oldSrc/utils/richText/context';
import useRichText from '@dashboard/oldSrc/utils/richText/useRichText';

export interface CollectionCreateFormData extends MetadataFormData {
  backgroundImage: {
    url: string;
    value: string;
  };
  backgroundImageAlt: string;
  channelListings: ChannelCollectionData[];
  name: string;
  slug: string;
  seoDescription: string;
  seoTitle: string;
}
export interface CollectionCreateData extends CollectionCreateFormData {
  description: OutputData;
}

interface CollectionCreateHandlers {
  changeMetadata: FormChange;
  changeChannels: (id: string, data: Omit<ChannelCollectionData, 'name' | 'id'>) => void;
}
export type UseCollectionCreateFormResult = CommonUseFormResultWithHandlers<
  CollectionCreateData,
  CollectionCreateHandlers
>;

export interface CollectionCreateFormProps {
  currentChannels: ChannelCollectionData[];
  setChannels: (data: ChannelCollectionData[]) => void;
  children: (props: UseCollectionCreateFormResult) => ReactNode;
  onSubmit: (data: CollectionCreateData) => SubmitPromise;
  disabled: boolean;
}

const getInitialData = (currentChannels: ChannelCollectionData[]): CollectionCreateFormData => ({
  backgroundImage: {
    url: null,
    value: null,
  },
  backgroundImageAlt: '',
  channelListings: currentChannels,
  metadata: [],
  name: '',
  privateMetadata: [],
  seoDescription: '',
  seoTitle: '',
  slug: '',
});

function useCollectionCreateForm(
  currentChannels: ChannelCollectionData[],
  setChannels: (data: ChannelCollectionData[]) => void,
  onSubmit: (data: CollectionCreateData) => SubmitPromise,
  disabled: boolean
): UseCollectionCreateFormResult & { richText: RichTextContextValues } {
  const {
    handleChange,
    data: formData,
    triggerChange,
    formId,
    setIsSubmitDisabled,
  } = useForm(getInitialData(currentChannels), undefined, {
    confirmLeave: true,
    formId: COLLECTION_CREATE_FORM_ID,
  });

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit,
  });

  const { setExitDialogSubmitRef } = useExitFormDialog({
    formId,
  });

  const richText = useRichText({
    initial: null,
    triggerChange,
  });

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  const changeMetadata = makeMetadataChangeHandler(handleChange);

  const data: CollectionCreateData = {
    ...formData,
    description: null,
  };

  // Need to make it function to always have description.current up to date
  const getData = async (): Promise<CollectionCreateData> => ({
    ...formData,
    description: await richText.getValue(),
  });

  const handleChannelChange = createChannelsChangeHandler(
    currentChannels,
    setChannels,
    triggerChange
  );

  const submit = async () => handleFormSubmit(await getData());

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  const isSaveDisabled = disabled;
  setIsSubmitDisabled(isSaveDisabled);

  return {
    change: handleChange,
    data,
    handlers: {
      changeChannels: handleChannelChange,
      changeMetadata,
    },
    submit,
    isSaveDisabled,
    richText,
  };
}

const CollectionCreateForm: FC<CollectionCreateFormProps> = ({
  currentChannels,
  setChannels,
  children,
  onSubmit,
  disabled,
}) => {
  const { richText, ...props } = useCollectionCreateForm(
    currentChannels,
    setChannels,
    onSubmit,
    disabled
  );

  return (
    <form onSubmit={props.submit}>
      <RichTextContext.Provider value={richText}>{children(props)}</RichTextContext.Provider>
    </form>
  );
};

CollectionCreateForm.displayName = 'CollectionCreateForm';
export default CollectionCreateForm;
