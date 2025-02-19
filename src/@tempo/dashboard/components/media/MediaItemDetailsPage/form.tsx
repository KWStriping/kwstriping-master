import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import type {
  FileFragment,
  MediaItemDetailsFragment,
  MediaErrorFragment,
} from '@tempo/api/generated/graphql';
import type { OutputData } from '@editorjs/editorjs';
import type { ChangeEvent, ReactNode, FC } from 'react';
import { useEffect, useState } from 'react';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import { useExitFormDialog } from '@tempo/dashboard/components/forms/Form/useExitFormDialog';
import type {
  CommonUseFormResultWithHandlers,
  FormChange,
  SubmitPromise,
} from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';
import useHandleFormSubmit from '@tempo/dashboard/hooks/useHandleFormSubmit';
import type { RichTextProps } from '@tempo/dashboard/oldSrc/attributes/utils/data';
import { createMediaTypeSelectHandler } from '@tempo/dashboard/oldSrc/media/utils/handlers';
import { validateMediaCreateData } from '@tempo/dashboard/oldSrc/media/utils/validation';
import getPublicationData from '@tempo/dashboard/oldSrc/utils/data/getPublicationData';
import { mapMetadataItemToInput } from '@tempo/dashboard/oldSrc/utils/maps';
import getMetadata from '@tempo/dashboard/oldSrc/utils/metadata/getMetadata';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import { RichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import useRichText from '@tempo/dashboard/oldSrc/utils/richText/useRichText';

const UPLOAD_PREEMPTIVELY = false;

export interface MediaFormData extends MetadataFormData {
  isPublished: boolean;
  publishedAt: string;
  alt: string;
  title: string;
  type: MediaItemDetailsFragment['type'];
  file: Maybe<FileFragment>;
  externalUrl: string;
}

export interface MediaData extends MediaFormData {
  description: OutputData;
}

export interface MediaSubmitData extends MediaFormData {
  description: OutputData;
}

export interface MediaUpdateHandlers {
  changeMetadata: FormChange;
  selectMediaType: FormChange;
  selectFile: FormChange;
}

export interface UseMediaUpdateFormOutput
  extends CommonUseFormResultWithHandlers<MediaData, MediaUpdateHandlers>,
    RichTextProps {
  valid: boolean;
  validationErrors: MediaErrorFragment[];
  processing: boolean;
}

export type UseMediaUpdateFormRenderProps = Omit<UseMediaUpdateFormOutput, 'richText'>;

export interface UseMediaFormOpts {
  mediaTypes?: Array<MediaItemDetailsFragment['type']>;
  selectedMediaType?: MediaItemDetailsFragment['type'];
  onSelectMediaType: (mediaTypeId: string) => void;
}

export interface MediaFormProps extends UseMediaFormOpts {
  children: (props: UseMediaUpdateFormRenderProps) => ReactNode;
  item: Maybe<MediaItemDetailsFragment>;
  uploadFile: any; // TODO
  onSubmit: (data: MediaData) => SubmitPromise;
  disabled: boolean;
}

const getInitialFormData = (
  itemExists: boolean,
  item?: MediaItemDetailsFragment
): MediaFormData => ({
  type: null,
  isPublished: itemExists ? item?.isPublished : true,
  publishedAt: itemExists ? item?.publishedAt : '',
  metadata: item?.metadata?.map(mapMetadataItemToInput) || [],
  privateMetadata: item?.privateMetadata?.map(mapMetadataItemToInput) || [],
  alt: item?.alt || '',
  title: item?.title || '',
  externalUrl: item?.externalUrl || '',
  file: item?.file || null,
});

function useMediaForm(
  item: MediaItemDetailsFragment,
  uploadFile: any, // TODO
  onSubmit: (data: MediaData) => SubmitPromise,
  disabled: boolean,
  opts: UseMediaFormOpts
): UseMediaUpdateFormOutput {
  const itemExists = item !== null;
  const notify = useNotifier();

  const {
    handleChange,
    triggerChange,
    data: formData,
    formId,
  } = useForm(getInitialFormData(itemExists, item), undefined, {
    confirmLeave: true,
  });
  const [validationErrors, setValidationErrors] = useState<MediaErrorFragment[]>([]);

  const { setExitDialogSubmitRef, setIsSubmitDisabled, setIsDirty } = useExitFormDialog({
    formId,
  });

  const richText = useRichText({
    initial: itemExists ? item?.description : null,
    loading: itemExists ? !item : false,
    triggerChange,
  });

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  const [processing, setProcessing] = useState(false);

  const changeMetadata = makeMetadataChangeHandler(handleChange);
  const handleMediaTypeSelect = createMediaTypeSelectHandler(
    opts.onSelectMediaType,
    triggerChange
  );
  const handleFileChange = async (event: ChangeEvent<unknown>) => {
    const file: File = event.target.value;
    const tmpTitle = fileNameToTitle(file.name);
    if (file) {
      if (UPLOAD_PREEMPTIVELY) {
        setProcessing(true);
        const {
          data: { fileUpload },
        } = await uploadFile({ file });
        if (fileUpload.errors?.length) {
          notify(
            t(
              'dashboard_imageUploadErrorText',
              "There was a problem with the file you uploaded as an image and it couldn't be used. Please try a different file."
            ),
            {
              type: 'error',
              title: m.dashboard_imageUploadErrorTitle() ?? "Couldn't process image",
            }
          );
        } else {
          const uploadedFile = fileUpload.uploadedFile;
          handleChange({
            target: {
              name: 'file',
              value: uploadedFile,
            },
          });
        }
        setProcessing(false);
      } else {
        handleChange({
          target: {
            name: 'file',
            value: file,
          },
        });
      }
      if (!formData.title) {
        handleChange({ target: { name: 'title', value: tmpTitle } });
      }
      if (!formData.alt) {
        handleChange({ target: { name: 'alt', value: tmpTitle } });
      }
    }
  };

  const data: MediaData = {
    ...formData,
    type: itemExists ? item?.type : opts.selectedMediaType,
    description: null,
  };

  const getSubmitData = async (): Promise<MediaSubmitData> => ({
    ...data,
    ...getMetadata(formData, isMetadataModified, isPrivateMetadataModified),
    ...getPublicationData(formData),
    description: await richText.getValue(),
  });

  const handleSubmit = async (data: MediaData) => {
    let errors = validateMediaCreateData(data);
    setValidationErrors(errors);
    if (errors?.length) {
      return errors;
    }
    errors = await onSubmit(data);
    return errors;
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit: handleSubmit,
  });

  const submit = async () => {
    const submissionData = await getSubmitData();
    const errors = await handleFormSubmit(submissionData);
    if (errors?.length) {
      setIsSubmitDisabled(isSaveDisabled);
      setIsDirty(true);
    }
    return errors;
  };

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  const valid = itemExists || !!opts.selectedMediaType;

  const isSaveDisabled = disabled || !valid;

  useEffect(() => {
    setIsSubmitDisabled(isSaveDisabled);
    if (!itemExists) {
      setIsDirty(true);
    }
  }, [isSaveDisabled]);

  return {
    change: handleChange,
    data,
    validationErrors,
    valid,
    handlers: {
      changeMetadata,
      selectMediaType: handleMediaTypeSelect,
      selectFile: handleFileChange,
    },
    submit,
    isSaveDisabled,
    richText,
    processing,
  };
}

const MediaForm: FC<MediaFormProps> = ({
  children,
  item,
  uploadFile,
  onSubmit,
  disabled,
  ...rest
}) => {
  const { richText, ...props } = useMediaForm(item, uploadFile, onSubmit, disabled, rest);
  return (
    <form onSubmit={props.submit}>
      <RichTextContext.Provider value={richText}>{children(props)}</RichTextContext.Provider>
    </form>
  );
};

MediaForm.displayName = 'MediaForm';
export default MediaForm;

function fileNameToTitle(filename: string): string {
  return filename.split('.')[0].replace(/_/g, ' ');
}
