import type { AttributeInput } from '@tempo/dashboard/components/attributes/AttributesCard';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import { useExitFormDialog } from '@tempo/dashboard/components/forms/Form/useExitFormDialog';
import type {
  ProductErrorWithAttributesFragment,
  ProductCreateDataQuery,
  SearchPagesQuery,
  SearchProductsQuery,
  SearchWarehousesQuery,
} from '@tempo/api/generated/graphql';
import type {
  CommonUseFormResultWithHandlers,
  FormChange,
  FormErrors,
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
  createAttributeFileChangeHandler,
  createAttributeMultiChangeHandler,
  createAttributeReferenceChangeHandler,
  createValueReorderHandler,
  createFetchMoreReferencesHandler,
  createFetchReferencesHandler,
} from '@tempo/dashboard/oldSrc/attributes/utils/handlers';
import type {
  ChannelPriceAndPreorderData,
  IChannelPriceAndPreorderArgs,
} from '@tempo/dashboard/oldSrc/channels/utils';
import { getVariantAttributeInputFromProduct } from '@tempo/dashboard/oldSrc/products/utils/data';
import {
  createPreorderEndDateChangeHandler,
  getChannelsInput,
} from '@tempo/dashboard/oldSrc/products/utils/handlers';
import { validateVariantData } from '@tempo/dashboard/oldSrc/products/utils/validation';
import type { FetchMoreProps, RelayToFlat, ReorderEvent } from '@tempo/dashboard/oldSrc/types';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import { useMultipleRichText } from '@tempo/dashboard/oldSrc/utils/richText/useMultipleRichText';
import { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

import type { ProductStockFormsetData, ProductStockInput } from '../ProductStocks';
import {
  concatChannelsBySelection,
  createChannelsWithPreorderInfo,
  validateChannels,
} from '../ProductChannels/formOperations';

export interface ProductCreateFormData extends MetadataFormData {
  sku: string;
  trackInventory: boolean;
  weight: string;
  isPreorder: boolean;
  globalThreshold: string;
  globalSoldUnits: number;
  hasPreorderEndDate: boolean;
  quantityLimitPerCustomer: number | null;
  preorderEndDateTime?: string;
  name: string;
}
export interface ProductCreateData extends ProductCreateFormData {
  attributes: AttributeInput[];
  attributesWithNewFileValue: FormsetData<null, File>;
  stocks: ProductStockInput[];
  channelListings: FormsetData<ChannelPriceAndPreorderData, IChannelPriceAndPreorderArgs>;
}

export interface UseProductCreateFormOpts {
  warehouses: RelayToFlat<NonNullable<SearchWarehousesQuery['search']>>;
  referencePages: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  referenceProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  fetchReferencePages?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchReferenceProducts?: (data: string) => void;
  fetchMoreReferenceProducts?: FetchMoreProps;
  assignReferencesAttributeId?: string;
}

export interface ProductCreateHandlers
  extends Record<
      'changeStock' | 'selectAttribute' | 'selectAttributeMultiple' | 'changeChannels',
      FormsetChange
    >,
    Record<'selectAttributeReference', FormsetChange<string[]>>,
    Record<'selectAttributeFile', FormsetChange<File>>,
    Record<'reorderValue', FormsetChange<ReorderEvent>>,
    Record<'addStock' | 'deleteStock', (id: string) => void> {
  changeMetadata: FormChange;
  updateChannels: (selectedChannelsIds: string[]) => void;
  changePreorderEndDate: FormChange;
  fetchReferences: (value: string) => void;
  fetchMoreReferences: FetchMoreProps;
}

export interface UseProductCreateFormOutput
  extends CommonUseFormResultWithHandlers<ProductCreateData, ProductCreateHandlers>,
    Omit<RichTextProps, 'richText'> {
  formErrors: FormErrors<ProductCreateData>;
  validationErrors: ProductErrorWithAttributesFragment[];
  disabled: boolean;
}

export interface ProductCreateFormProps extends UseProductCreateFormOpts {
  children: (props: UseProductCreateFormOutput) => ReactNode;
  product: ProductCreateDataQuery['product'];
  onSubmit: (data: ProductCreateData) => SubmitPromise;
  disabled: boolean;
}

const initial: ProductCreateFormData = {
  metadata: [],
  privateMetadata: [],
  sku: '',
  trackInventory: true,
  weight: '',
  isPreorder: false,
  globalThreshold: null,
  globalSoldUnits: 0,
  hasPreorderEndDate: false,
  preorderEndDateTime: '',
  quantityLimitPerCustomer: null,
  name: '',
};

function useProductCreateForm(
  product: ProductCreateDataQuery['product'],
  onSubmit: (data: ProductCreateData) => SubmitPromise,
  disabled: boolean,
  opts: UseProductCreateFormOpts
): UseProductCreateFormOutput {
  const attributeInput = getVariantAttributeInputFromProduct(product);
  const [validationErrors, setValidationErrors] = useState<ProductErrorWithAttributesFragment[]>(
    []
  );

  const form = useForm(initial, undefined, { confirmLeave: true });

  const { triggerChange, handleChange, data: formData, formId, setIsSubmitDisabled } = form;

  const currentChannelsWithPreorderInfo = createChannelsWithPreorderInfo(product);
  const channelsInput = getChannelsInput(currentChannelsWithPreorderInfo);

  const attributes = useFormset(attributeInput);
  const channels = useFormset(channelsInput);

  const { getters: attributeRichTextGetters, getValues: getAttributeRichTextValues } =
    useMultipleRichText({
      initial: getRichTextDataFromAttributes(attributes.data),
      triggerChange,
    });
  const attributesWithNewFileValue = useFormset<null, File>([]);
  const stocks = useFormset<ProductStockFormsetData, string>([]);

  const { setExitDialogSubmitRef } = useExitFormDialog({
    formId,
  });

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  const changeMetadata = makeMetadataChangeHandler(handleChange);

  const handleAttributeChangeWithName = (id: string, value: string) => {
    triggerChange();
    attributes.change(id, value === '' ? [] : [value]);
    handleChange({ target: { value, name: 'name' } });
  };

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
  const handleStockAdd = (id: string) => {
    triggerChange();
    stocks.add({
      data: {
        quantityAllocated: 0,
      },
      id,
      label: opts.warehouses.find((warehouse) => warehouse.id === id).name,
      value: '0',
    });
  };
  const handleStockChange = (id: string, value: string) => {
    triggerChange();
    stocks.change(id, value);
  };
  const handleStockDelete = (id: string) => {
    triggerChange();
    stocks.remove(id);
  };

  const handlePreorderEndDateChange = createPreorderEndDateChangeHandler(
    form,
    triggerChange,
    t(
      'dashboard_reorderEndDateInFutureErrorText',
      'Preorder end time needs to be set in the future'
    )
  );

  const handleChannelChange: FormsetChange = (id, value) => {
    channels.change(id, value);
    triggerChange();
  };

  const handleUpdateChannels = (selectedIds: string[]) => {
    channels.set(
      concatChannelsBySelection(selectedIds, channels, currentChannelsWithPreorderInfo)
    );

    triggerChange();
  };

  const data: ProductCreateData = {
    ...formData,
    attributes: getAttributesDisplayData(
      attributes.data,
      attributesWithNewFileValue.data,
      opts.referencePages,
      opts.referenceProducts
    ),
    attributesWithNewFileValue: attributesWithNewFileValue.data,
    stocks: stocks.data,
    channelListings: channels.data,
  };

  const getSubmitData = async (): Promise<ProductCreateData> => ({
    ...data,
    attributes: mergeAttributes(
      attributes.data,
      getRichTextAttributesFromMap(attributes.data, await getAttributeRichTextValues())
    ),
  });

  const handleSubmit = async (data: ProductCreateData) => {
    const errors = validateVariantData(data);

    setValidationErrors(errors);

    if (errors?.length) {
      return errors;
    }

    return onSubmit(data);
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit: handleSubmit,
  });

  const submit = async () => handleFormSubmit(await getSubmitData());

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  const invalidChannels = validateChannels(channels?.data);
  const invalidPreorder =
    data?.isPreorder && data?.hasPreorderEndDate && !!form.errors.preorderEndDateTime;

  const formDisabled = invalidPreorder || invalidChannels;
  const isSaveDisabled = disabled || formDisabled || !onSubmit;

  setIsSubmitDisabled(isSaveDisabled);

  return {
    change: handleChange,
    data,
    disabled,
    formErrors: form.errors,
    validationErrors,
    handlers: {
      addStock: handleStockAdd,
      changeChannels: handleChannelChange,
      updateChannels: handleUpdateChannels,
      changeMetadata,
      changeStock: handleStockChange,
      changePreorderEndDate: handlePreorderEndDateChange,
      deleteStock: handleStockDelete,
      fetchMoreReferences: handleFetchMoreReferences,
      fetchReferences: handleFetchReferences,
      reorderValue: handleValueReorder,
      selectAttribute: handleAttributeChangeWithName,
      selectAttributeFile: handleAttributeFileChange,
      selectAttributeMultiple: handleAttributeMultiChange,
      selectAttributeReference: handleAttributeReferenceChange,
    },
    submit,
    isSaveDisabled,
    attributeRichTextGetters,
  };
}

const ProductCreateForm: FC<ProductCreateFormProps> = ({
  children,
  product,
  onSubmit,
  disabled,
  ...rest
}) => {
  const props = useProductCreateForm(product, onSubmit, disabled, rest);

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

ProductCreateForm.displayName = 'ProductCreateForm';
export default ProductCreateForm;
