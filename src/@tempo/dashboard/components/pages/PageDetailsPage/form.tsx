import type {
  PageDetailsFragment,
  PageErrorWithAttributesFragment,
  SearchPagesQuery,
  SearchPageKlassesQuery,
  SearchProductsQuery,
} from '@tempo/api/generated/graphql';
import type { OutputData } from '@editorjs/editorjs';
import { useEffect, useState } from 'react';
import type { ReactNode, FC } from 'react';
import type { AttributeInput } from '@tempo/dashboard/components/attributes/AttributesCard';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import { useExitFormDialog } from '@tempo/dashboard/components/forms/Form/useExitFormDialog';
import type {
  CommonUseFormResultWithHandlers,
  FormChange,
  SubmitPromise,
} from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';
import type { FormsetChange, FormsetData } from '@tempo/dashboard/hooks/useFormset';
import useFormset from '@tempo/dashboard/hooks/useFormset';
import useHandleFormSubmit from '@tempo/dashboard/hooks/useHandleFormSubmit';
import {
  getAttributesDisplayData,
  getRichTextAttributesFromMap,
  getRichTextDataFromAttributes,
  mergeAttributes,
} from '@tempo/dashboard/oldSrc/attributes/utils/data';
import type { RichTextProps } from '@tempo/dashboard/oldSrc/attributes/utils/data';
import {
  createAttributeChangeHandler,
  createAttributeFileChangeHandler,
  createAttributeMultiChangeHandler,
  createAttributeReferenceChangeHandler,
  createValueReorderHandler,
  createFetchMoreReferencesHandler,
  createFetchReferencesHandler,
} from '@tempo/dashboard/oldSrc/attributes/utils/handlers';
import {
  getAttributeInputFromPage,
  getAttributeInputFromPageKlass,
} from '@tempo/dashboard/oldSrc/pages/utils/data';
import { createPageKlassSelectHandler } from '@tempo/dashboard/oldSrc/pages/utils/handlers';
import { validatePageCreateData } from '@tempo/dashboard/oldSrc/pages/utils/validation';
import type { FetchMoreProps, RelayToFlat, ReorderEvent } from '@tempo/dashboard/oldSrc/types';
import getPublicationData from '@tempo/dashboard/oldSrc/utils/data/getPublicationData';
import { mapMetadataItemToInput } from '@tempo/dashboard/oldSrc/utils/maps';
import getMetadata from '@tempo/dashboard/oldSrc/utils/metadata/getMetadata';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import { RichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import { useMultipleRichText } from '@tempo/dashboard/oldSrc/utils/richText/useMultipleRichText';
import useRichText from '@tempo/dashboard/oldSrc/utils/richText/useRichText';

export interface PageFormData extends MetadataFormData {
  isPublished: boolean;
  publishedAt: string;
  seoDescription: string;
  seoTitle: string;
  slug: string;
  title: string;
  pageKlass: PageDetailsFragment['pageKlass'];
}
export interface PageData extends PageFormData {
  attributes: AttributeInput[];
  content: OutputData;
}

export interface PageSubmitData extends PageFormData {
  attributes: AttributeInput[];
  attributesWithNewFileValue: FormsetData<null, File>;
  content: OutputData;
}

export interface PageUpdateHandlers {
  changeMetadata: FormChange;
  selectPageKlass: FormChange;
  selectAttribute: FormsetChange<string>;
  selectAttributeMulti: FormsetChange<string>;
  selectAttributeReference: FormsetChange<string[]>;
  selectAttributeFile: FormsetChange<File>;
  reorderValue: FormsetChange<ReorderEvent>;
  fetchReferences: (value: string) => void;
  fetchMoreReferences: FetchMoreProps;
}

export interface UsePageUpdateFormOutput
  extends CommonUseFormResultWithHandlers<PageData, PageUpdateHandlers>,
    RichTextProps {
  valid: boolean;
  validationErrors: PageErrorWithAttributesFragment[];
}

export type UsePageUpdateFormRenderProps = Omit<UsePageUpdateFormOutput, 'richText'>;

export interface UsePageFormOpts {
  pageKlasses?: RelayToFlat<NonNullable<SearchPageKlassesQuery['search']>>;
  referencePages: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  referenceProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  fetchReferencePages?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchReferenceProducts?: (data: string) => void;
  fetchMoreReferenceProducts?: FetchMoreProps;
  assignReferencesAttributeId?: string;
  selectedPageKlass?: PageDetailsFragment['pageKlasses'];
  onSelectPageKlass: (pageKlassId: string) => void;
}

export interface PageFormProps extends UsePageFormOpts {
  children: (props: UsePageUpdateFormRenderProps) => ReactNode;
  page: Maybe<PageDetailsFragment>;
  onSubmit: (data: PageData) => SubmitPromise;
  disabled: boolean;
}

const getInitialFormData = (pageExists: boolean, page?: PageDetailsFragment): PageFormData => ({
  isPublished: pageExists ? page?.isPublished : true,
  metadata: page?.metadata?.map(mapMetadataItemToInput) || [],
  pageKlasses: null,
  privateMetadata: page?.privateMetadata?.map(mapMetadataItemToInput) || [],
  publishedAt: pageExists ? page?.publishedAt : '',
  seoDescription: page?.seoDescription || '',
  seoTitle: page?.seoTitle || '',
  slug: page?.slug || '',
  title: page?.title || '',
});

function usePageForm(
  page: PageDetailsFragment,
  onSubmit: (data: PageData) => SubmitPromise,
  disabled: boolean,
  opts: UsePageFormOpts
): UsePageUpdateFormOutput {
  const pageExists = page !== null;

  const {
    handleChange,
    triggerChange,
    data: formData,
    formId,
  } = useForm(getInitialFormData(pageExists, page), undefined, {
    confirmLeave: true,
  });
  const [validationErrors, setValidationErrors] = useState<PageErrorWithAttributesFragment[]>([]);

  const attributes = useFormset(
    pageExists
      ? getAttributeInputFromPage(page)
      : opts.selectedPageKlass
        ? getAttributeInputFromPageKlass(opts.selectedPageKlass)
        : []
  );

  const { getters: attributeRichTextGetters, getValues: getAttributeRichTextValues } =
    useMultipleRichText({
      initial: getRichTextDataFromAttributes(attributes.data),
      triggerChange,
    });
  const attributesWithNewFileValue = useFormset<null, File>([]);

  const { setExitDialogSubmitRef, setIsSubmitDisabled, setIsDirty } = useExitFormDialog({
    formId,
  });

  const richText = useRichText({
    initial: pageExists ? page?.content : null,
    loading: pageExists ? !page : false,
    triggerChange,
  });

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  const changeMetadata = makeMetadataChangeHandler(handleChange);
  const handlePageKlassSelect = createPageKlassSelectHandler(
    opts.onSelectPageKlass,
    triggerChange
  );
  const handleAttributeChange = createAttributeChangeHandler(attributes.change, triggerChange);
  const handleAttributeMultiChange = createAttributeMultiChangeHandler(
    attributes.change,
    attributes.data,
    triggerChange
  );
  const handleAttributeReferenceChange = createAttributeReferenceChangeHandler(
    attributes.change,
    triggerChange
  );
  const handleFetchReferences = createFetchReferencesHandler(
    attributes.data,
    opts.assignReferencesAttributeId,
    opts.fetchReferencePages,
    opts.fetchReferenceProducts
  );
  const handleFetchMoreReferences = createFetchMoreReferencesHandler(
    attributes.data,
    opts.assignReferencesAttributeId,
    opts.fetchMoreReferencePages,
    opts.fetchMoreReferenceProducts
  );
  const handleAttributeFileChange = createAttributeFileChangeHandler(
    attributes.change,
    attributesWithNewFileValue.data,
    attributesWithNewFileValue.add,
    attributesWithNewFileValue.change,
    triggerChange
  );
  const handleValueReorder = createValueReorderHandler(
    attributes.change,
    attributes.data,
    triggerChange
  );

  const data: PageData = {
    ...formData,
    attributes: getAttributesDisplayData(
      attributes.data,
      attributesWithNewFileValue.data,
      opts.referencePages,
      opts.referenceProducts
    ),
    content: null,
    pageKlasses: pageExists ? page?.pageKlass : opts.selectedPageKlass,
  };

  const getSubmitData = async (): Promise<PageSubmitData> => ({
    ...data,
    ...getMetadata(formData, isMetadataModified, isPrivateMetadataModified),
    ...getPublicationData(formData),
    content: await richText.getValue(),
    attributes: mergeAttributes(
      attributes.data,
      getRichTextAttributesFromMap(attributes.data, await getAttributeRichTextValues())
    ),
    attributesWithNewFileValue: attributesWithNewFileValue.data,
  });

  const handleSubmit = async (data: PageData) => {
    let errors = validatePageCreateData(data);

    setValidationErrors(errors);

    if (errors?.length) {
      return errors;
    }

    errors = await onSubmit(data);

    if (!errors?.length && pageExists) {
      attributesWithNewFileValue.set([]);
    }

    return errors;
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit: handleSubmit,
  });

  const submit = async () => {
    const errors = await handleFormSubmit(await getSubmitData());

    if (errors?.length) {
      setIsSubmitDisabled(isSaveDisabled);
      setIsDirty(true);
    }

    return errors;
  };

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  const valid = pageExists || !!opts.selectedPageKlass;

  const isSaveDisabled = disabled || !valid;

  useEffect(() => {
    setIsSubmitDisabled(isSaveDisabled);
    if (!pageExists) {
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
      fetchMoreReferences: handleFetchMoreReferences,
      fetchReferences: handleFetchReferences,
      reorderValue: handleValueReorder,
      selectAttribute: handleAttributeChange,
      selectAttributeFile: handleAttributeFileChange,
      selectAttributeMulti: handleAttributeMultiChange,
      selectAttributeReference: handleAttributeReferenceChange,
      selectPageKlass: handlePageKlassSelect,
    },
    submit,
    isSaveDisabled,
    richText,
    attributeRichTextGetters,
  };
}

const PageForm: FC<PageFormProps> = ({ children, page, onSubmit, disabled, ...rest }) => {
  const { richText, ...props } = usePageForm(page, onSubmit, disabled, rest);

  return (
    <form onSubmit={props.submit}>
      <RichTextContext.Provider value={richText}>{children(props)}</RichTextContext.Provider>
    </form>
  );
};

PageForm.displayName = 'PageForm';
export default PageForm;
