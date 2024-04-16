import type { OutputData } from '@editorjs/editorjs';
import type { ReactNode, FC } from 'react';
import { useEffect } from 'react';
import type { MetadataFormData } from '@dashboard/components/core/Metadata';
import { useExitFormDialog } from '@dashboard/components/forms/Form/useExitFormDialog';
import type { CommonUseFormResult, FormChange } from '@dashboard/hooks/useForm';
import useForm from '@dashboard/hooks/useForm';
import useHandleFormSubmit from '@dashboard/hooks/useHandleFormSubmit';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import type { RichTextContextValues } from '@dashboard/oldSrc/utils/richText/context';
import { RichTextContext } from '@dashboard/oldSrc/utils/richText/context';
import useRichText from '@dashboard/oldSrc/utils/richText/useRichText';

export interface CategoryCreateFormData extends MetadataFormData {
  name: string;
  seoDescription: string;
  seoTitle: string;
  slug: string;
}
export interface CategoryCreateData extends CategoryCreateFormData {
  description: OutputData;
}

interface CategoryCreateHandlers {
  changeMetadata: FormChange;
}

export interface UseCategoryCreateFormResult extends CommonUseFormResult<CategoryCreateData> {
  handlers: CategoryCreateHandlers;
}

export interface CategoryCreateFormProps {
  children: (props: UseCategoryCreateFormResult) => ReactNode;
  onSubmit: (data: CategoryCreateData) => Promise<any[]>;
  disabled: boolean;
}

const initialData: CategoryCreateFormData = {
  metadata: [],
  name: '',
  privateMetadata: [],
  seoDescription: '',
  seoTitle: '',
  slug: '',
};

function useCategoryCreateForm(
  onSubmit: (data: CategoryCreateData) => Promise<any[]>,
  disabled: boolean
): UseCategoryCreateFormResult & { richText: RichTextContextValues } {
  const {
    handleChange,
    data: formData,
    triggerChange,
    formId,
    setIsSubmitDisabled,
  } = useForm(initialData, undefined, { confirmLeave: true });

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

  const data: CategoryCreateData = {
    ...formData,
    description: null,
  };

  // Need to make it function to always have description.current up to date
  const getData = async (): Promise<CategoryCreateData> => ({
    ...formData,
    description: await richText.getValue(),
  });

  const submit = async () => handleFormSubmit(await getData());

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  setIsSubmitDisabled(disabled);

  return {
    change: handleChange,
    data,
    handlers: {
      changeMetadata,
    },
    submit,
    isSaveDisabled: disabled,
    richText,
  };
}

const CategoryCreateForm: FC<CategoryCreateFormProps> = ({ children, onSubmit, disabled }) => {
  const { richText, ...props } = useCategoryCreateForm(onSubmit, disabled);

  return (
    <form onSubmit={props.submit}>
      <RichTextContext.Provider value={richText}>{children(props)}</RichTextContext.Provider>
    </form>
  );
};

CategoryCreateForm.displayName = 'CategoryCreateForm';
export default CategoryCreateForm;
