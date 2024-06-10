import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import { useExitFormDialog } from '@tempo/dashboard/components/forms/Form/useExitFormDialog';
import type { CollectionDetailsFragment } from '@tempo/api/generated/graphql';
import type { CommonUseFormResultWithHandlers, FormChange } from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';
import useHandleFormSubmit from '@tempo/dashboard/hooks/useHandleFormSubmit';
import type { ChannelCollectionData } from '@tempo/dashboard/oldSrc/channels/utils';
import { COLLECTION_DETAILS_FORM_ID } from '@tempo/dashboard/oldSrc/collections/consts';
import { createChannelsChangeHandler } from '@tempo/dashboard/oldSrc/collections/utils';
import { mapMetadataItemToInput } from '@tempo/dashboard/oldSrc/utils/maps';
import getMetadata from '@tempo/dashboard/oldSrc/utils/metadata/getMetadata';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import type { RichTextContextValues } from '@tempo/dashboard/oldSrc/utils/richText/context';
import { RichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import useRichText from '@tempo/dashboard/oldSrc/utils/richText/useRichText';
import type { OutputData } from '@editorjs/editorjs';
import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';

export interface CollectionUpdateFormData extends MetadataFormData {
  backgroundImageAlt: string;
  channelListings: ChannelCollectionData[];
  name: string;
  slug: string;
  seoDescription: string;
  seoTitle: string;
}
export interface CollectionUpdateData extends CollectionUpdateFormData {
  description: OutputData;
}

interface CollectionUpdateHandlers {
  changeMetadata: FormChange;
  changeChannels: (id: string, data: Omit<ChannelCollectionData, 'name' | 'id'>) => void;
}
export type UseCollectionUpdateFormResult = CommonUseFormResultWithHandlers<
  CollectionUpdateData,
  CollectionUpdateHandlers
>;

export interface CollectionUpdateFormProps {
  children: (props: UseCollectionUpdateFormResult) => ReactNode;
  collection: Maybe<CollectionDetailsFragment>;
  currentChannels: ChannelCollectionData[];
  setChannels: (data: ChannelCollectionData[]) => void;
  onSubmit: (data: CollectionUpdateData) => Promise<any[]>;
  disabled: boolean;
}

const getInitialData = (
  collection: CollectionDetailsFragment,
  currentChannels: ChannelCollectionData[]
): CollectionUpdateFormData => ({
  backgroundImageAlt: collection?.backgroundImage?.alt || '',
  channelListings: currentChannels,
  metadata: collection?.metadata?.map(mapMetadataItemToInput),
  name: collection?.name || '',
  privateMetadata: collection?.privateMetadata?.map(mapMetadataItemToInput),
  seoDescription: collection?.seoDescription || '',
  seoTitle: collection?.seoTitle || '',
  slug: collection?.slug || '',
});

function useCollectionUpdateForm(
  collection: CollectionDetailsFragment,
  currentChannels: ChannelCollectionData[],
  setChannels: (data: ChannelCollectionData[]) => void,
  onSubmit: (data: CollectionUpdateData) => Promise<any[]>,
  disabled: boolean
): UseCollectionUpdateFormResult & { richText: RichTextContextValues } {
  const {
    handleChange,
    data: formData,
    triggerChange,
    formId,
    setIsSubmitDisabled,
  } = useForm(getInitialData(collection, currentChannels), undefined, {
    confirmLeave: true,
    formId: COLLECTION_DETAILS_FORM_ID,
  });

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit,
  });

  const { setExitDialogSubmitRef } = useExitFormDialog({
    formId: COLLECTION_DETAILS_FORM_ID,
  });

  const richText = useRichText({
    initial: collection?.description,
    loading: !collection,
    triggerChange,
  });

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  const changeMetadata = makeMetadataChangeHandler(handleChange);

  const data: CollectionUpdateData = {
    ...formData,
    description: null,
  };

  // Need to make it function to always have description.current up to date
  const getData = async (): Promise<CollectionUpdateData> => ({
    ...formData,
    description: await richText.getValue(),
  });

  const getSubmitData = async (): Promise<CollectionUpdateData> => ({
    ...(await getData()),
    ...getMetadata(formData, isMetadataModified, isPrivateMetadataModified),
  });

  const handleChannelChange = createChannelsChangeHandler(
    currentChannels,
    setChannels,
    triggerChange
  );

  const submit = async () => handleFormSubmit(await getSubmitData());

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  setIsSubmitDisabled(disabled);

  return {
    change: handleChange,
    data,
    handlers: {
      changeChannels: handleChannelChange,
      changeMetadata,
    },
    submit,
    richText,
  };
}

const CollectionUpdateForm: FC<CollectionUpdateFormProps> = ({
  collection,
  currentChannels,
  setChannels,
  children,
  onSubmit,
  disabled,
}) => {
  const { richText, ...props } = useCollectionUpdateForm(
    collection,
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

CollectionUpdateForm.displayName = 'CollectionUpdateForm';
export default CollectionUpdateForm;
