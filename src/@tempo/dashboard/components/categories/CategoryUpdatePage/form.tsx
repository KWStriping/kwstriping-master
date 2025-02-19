import type { CategoryDetailsFragment } from '@tempo/api/generated/graphql';
import type { OutputData } from '@editorjs/editorjs';
import { useEffect } from 'react';
import type { ReactNode, FC } from 'react';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import { useExitFormDialog } from '@tempo/dashboard/components/forms/Form/useExitFormDialog';
import type { CommonUseFormResult, FormChange } from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';
import useHandleFormSubmit from '@tempo/dashboard/hooks/useHandleFormSubmit';
import { mapMetadataItemToInput } from '@tempo/dashboard/oldSrc/utils/maps';
import getMetadata from '@tempo/dashboard/oldSrc/utils/metadata/getMetadata';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import type { RichTextContextValues } from '@tempo/dashboard/oldSrc/utils/richText/context';
import { RichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import useRichText from '@tempo/dashboard/oldSrc/utils/richText/useRichText';

export interface CategoryUpdateFormData extends MetadataFormData {
  backgroundImageAlt: string;
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
}
export interface CategoryUpdateData extends CategoryUpdateFormData {
  description: OutputData;
}

interface CategoryUpdateHandlers {
  changeMetadata: FormChange;
}

export interface UseCategoryUpdateFormResult extends CommonUseFormResult<CategoryUpdateData> {
  handlers: CategoryUpdateHandlers;
}

export interface CategoryUpdateFormProps {
  children: (props: UseCategoryUpdateFormResult) => ReactNode;
  category: Maybe<CategoryDetailsFragment>;
  onSubmit: (data: CategoryUpdateData) => Promise<any[]>;
  disabled: boolean;
}

const getInitialData = (category?: CategoryDetailsFragment) => ({
  backgroundImageAlt: category?.backgroundImage?.alt || '',
  metadata: category?.metadata?.map(mapMetadataItemToInput),
  name: category?.name || '',
  privateMetadata: category?.privateMetadata?.map(mapMetadataItemToInput),
  seoDescription: category?.seoDescription || '',
  seoTitle: category?.seoTitle || '',
  slug: category?.slug || '',
});

function useCategoryUpdateForm(
  category: CategoryDetailsFragment,
  onSubmit: (data: CategoryUpdateData) => Promise<any[]>,
  disabled: boolean
): UseCategoryUpdateFormResult & { richText: RichTextContextValues } {
  const {
    handleChange,
    data: formData,
    triggerChange,
    formId,
    setIsSubmitDisabled,
  } = useForm(getInitialData(category), undefined, { confirmLeave: true });

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit,
  });

  const { setExitDialogSubmitRef } = useExitFormDialog({
    formId,
  });

  const richText = useRichText({
    initial: category?.description,
    loading: !category,
    triggerChange,
  });

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  const changeMetadata = makeMetadataChangeHandler(handleChange);

  const data: CategoryUpdateData = {
    ...formData,
    description: null,
  };

  // Need to make it function to always have description.current up to date
  const getData = async (): Promise<CategoryUpdateData> => ({
    ...formData,
    description: await richText.getValue(),
  });

  const getSubmitData = async (): Promise<CategoryUpdateData> => ({
    ...(await getData()),
    ...getMetadata(data, isMetadataModified, isPrivateMetadataModified),
  });

  const submit = async () => handleFormSubmit(await getSubmitData());

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

const CategoryUpdateForm: FC<CategoryUpdateFormProps> = ({
  children,
  category,
  onSubmit,
  disabled,
}) => {
  const { richText, ...props } = useCategoryUpdateForm(category, onSubmit, disabled);

  return (
    <form onSubmit={props.submit}>
      <RichTextContext.Provider value={richText}>{children(props)}</RichTextContext.Provider>
    </form>
  );
};

CategoryUpdateForm.displayName = 'CategoryUpdateForm';
export default CategoryUpdateForm;
