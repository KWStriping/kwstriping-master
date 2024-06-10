import { useTranslation } from '@core/i18n';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import type { MetadataFormData } from '@dashboard/components/core/Metadata';
import { useExitFormDialog } from '@dashboard/components/forms/Form/useExitFormDialog';
import type {
  ProductErrorWithAttributesFragment,
  ProductFragment,
  SearchPagesQuery,
  SearchProductsQuery,
  SearchWarehousesQuery,
} from '@core/api/graphql';
import type {
  CommonUseFormResultWithHandlers,
  FormChange,
  FormErrors,
  SubmitPromise,
} from '@dashboard/hooks/useForm';
import useForm from '@dashboard/hooks/useForm';
import type { FormsetChange, FormsetData } from '@dashboard/hooks/useFormset';
import useFormset from '@dashboard/hooks/useFormset';
import useHandleFormSubmit from '@dashboard/hooks/useHandleFormSubmit';
import {
  getAttributesDisplayData,
  getRichTextAttributesFromMap,
  getRichTextDataFromAttributes,
  mergeAttributes,
} from '@dashboard/oldSrc/attributes/utils/data';
import type { RichTextProps } from '@dashboard/oldSrc/attributes/utils/data';
import {
  createAttributeFileChangeHandler,
  createAttributeMultiChangeHandler,
  createAttributeReferenceChangeHandler,
  createValueReorderHandler,
  createFetchMoreReferencesHandler,
  createFetchReferencesHandler,
} from '@dashboard/oldSrc/attributes/utils/handlers';
import type {
  ChannelPriceAndPreorderData,
  IChannelPriceAndPreorderArgs,
} from '@dashboard/oldSrc/channels/utils';
import {
  getAttributeInputFromVariant,
  getStockInputFromVariant,
} from '@dashboard/oldSrc/products/utils/data';
import {
  createMediaChangeHandler,
  createPreorderEndDateChangeHandler,
  getChannelsInput,
} from '@dashboard/oldSrc/products/utils/handlers';
import {
  validateCostPrice,
  validatePrice,
  validateVariantData,
} from '@dashboard/oldSrc/products/utils/validation';
import type { FetchMoreProps, RelayToFlat, ReorderEvent } from '@dashboard/oldSrc/types';
import { arrayDiff } from '@dashboard/oldSrc/utils/arrays';
import { mapMetadataItemToInput } from '@dashboard/oldSrc/utils/maps';
import getMetadata from '@dashboard/oldSrc/utils/metadata/getMetadata';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import { useMultipleRichText } from '@dashboard/oldSrc/utils/richText/useMultipleRichText';

import type { ProductStockInput } from '../ProductStocks';
import {
  concatChannelsBySelection,
  extractChannelPricesFromVariantChannel,
} from '../ProductChannels/formOperations';

export interface ProductUpdateFormData extends MetadataFormData {
  sku: string;
  trackInventory: boolean;
  weight: string;
  isPreorder: boolean;
  globalThreshold: string;
  globalSoldUnits: number;
  quantityLimitPerCustomer: number | null;
  hasPreorderEndDate: boolean;
  preorderEndDateTime?: string;
  name: string;
  media: string[];
}
export interface ProductUpdateData extends ProductUpdateFormData {
  channelListings: FormsetData<ChannelPriceAndPreorderData, IChannelPriceAndPreorderArgs>;
  attributes: AttributeInput[];
  stocks: ProductStockInput[];
}
export interface ProductUpdateSubmitData extends ProductUpdateFormData {
  attributes: AttributeInput[];
  attributesWithNewFileValue: FormsetData<null, File>;
  addStocks: ProductStockInput[];
  channelListings: FormsetData<ChannelPriceAndPreorderData, IChannelPriceAndPreorderArgs>;
  updateStocks: ProductStockInput[];
  removeStocks: string[];
}

export interface UseProductUpdateFormOpts {
  warehouses: RelayToFlat<NonNullable<SearchWarehousesQuery['search']>>;
  currentChannels: ChannelPriceAndPreorderData[];
  referencePages: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  referenceProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  fetchReferencePages?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchReferenceProducts?: (data: string) => void;
  fetchMoreReferenceProducts?: FetchMoreProps;
  assignReferencesAttributeId?: string;
}

export interface ProductUpdateHandlers
  extends Record<
      'changeStock' | 'selectAttribute' | 'selectAttributeMultiple' | 'changeChannels',
      FormsetChange
    >,
    Record<'selectAttributeReference', FormsetChange<string[]>>,
    Record<'selectAttributeFile', FormsetChange<File>>,
    Record<'reorderValue', FormsetChange<ReorderEvent>>,
    Record<'addStock' | 'deleteStock', (id: string) => void> {
  changePreorderEndDate: FormChange;
  changeMetadata: FormChange;
  changeMedia: (ids: string[]) => void;
  updateChannels: (selectedChannelsIds: string[]) => void;
  fetchReferences: (value: string) => void;
  fetchMoreReferences: FetchMoreProps;
}

export interface UseProductUpdateFormResult
  extends CommonUseFormResultWithHandlers<ProductUpdateData, ProductUpdateHandlers>,
    Omit<RichTextProps, 'richText'> {
  formErrors: FormErrors<ProductUpdateData>;
  validationErrors: ProductErrorWithAttributesFragment[];
  disabled: boolean;
}

export interface ProductUpdateFormProps extends UseProductUpdateFormOpts {
  children: (props: UseProductUpdateFormResult) => ReactNode;
  variant: Maybe<ProductFragment>;
  loading: boolean;
  onSubmit: (data: ProductUpdateSubmitData) => SubmitPromise;
}

function useProductUpdateForm(
  variant: ProductFragment,
  onSubmit: (data: ProductUpdateSubmitData) => SubmitPromise,
  loading: boolean,
  opts: UseProductUpdateFormOpts
): UseProductUpdateFormResult {
  const { t } = useTranslation();
  const attributeInput = getAttributeInputFromVariant(variant);
  const stockInput = getStockInputFromVariant(variant);

  const [validationErrors, setValidationErrors] = useState<ProductErrorWithAttributesFragment[]>(
    []
  );

  const currentChannelsWithPreorderInfo = opts.currentChannels?.map((channel) => {
    const variantChannel = variant?.channelListings?.find(
      (channelListing) => channelListing.channel.id === channel.id
    );

    return {
      ...channel,
      preorderThreshold: variantChannel?.preorderThreshold?.quantity,
      soldUnits: variantChannel?.preorderThreshold?.soldUnits,
    };
  });

  const channelsInput = getChannelsInput(currentChannelsWithPreorderInfo);

  const initial: ProductUpdateFormData = {
    metadata: variant?.metadata?.map(mapMetadataItemToInput),
    privateMetadata: variant?.privateMetadata?.map(mapMetadataItemToInput),
    sku: variant?.sku || '',
    trackInventory: variant?.trackInventory,
    isPreorder: !!variant?.preorder || false,
    globalThreshold: variant?.preorder?.globalThreshold?.toString() || null,
    globalSoldUnits: variant?.preorder?.globalSoldUnits || 0,
    hasPreorderEndDate: !!variant?.preorder?.endDate,
    preorderEndDateTime: variant?.preorder?.endDate,
    weight: variant?.weight?.value.toString() || '',
    quantityLimitPerCustomer: variant?.quantityLimitPerCustomer || null,
    name: variant?.name ?? '',
    media: variant?.media?.map(({ id }) => id) || [],
  };

  const form = useForm(initial, undefined, {
    confirmLeave: true,
  });

  const { handleChange, triggerChange, data: formData, formId, setIsSubmitDisabled } = form;

  const { setExitDialogSubmitRef } = useExitFormDialog({
    formId,
  });

  const attributes = useFormset(attributeInput);
  const { getters: attributeRichTextGetters, getValues: getAttributeRichTextValues } =
    useMultipleRichText({
      initial: getRichTextDataFromAttributes(attributes.data),
      triggerChange,
    });
  const attributesWithNewFileValue = useFormset<null, File>([]);
  const stocks = useFormset(stockInput);
  const channels = useFormset(channelsInput);
  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

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
        quantityAllocated:
          variant?.stocks?.find((stock) => stock.warehouse.id === id)?.quantityAllocated || 0,
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
  const handleChannelChange: FormsetChange = (id, value) => {
    channels.change(id, value);
    triggerChange();
  };

  const handlePreorderEndDateChange = createPreorderEndDateChangeHandler(
    form,
    triggerChange,
    t(
      'dashboard.reorderEndDateInFutureErrorText',
      'Preorder end time needs to be set in the future'
    )
  );

  const handleMediaChange = createMediaChangeHandler(form, triggerChange);

  const handleUpdateChannels = (selectedIds: string[]) => {
    const allChannels = variant.product.channelListings.map((listing) => {
      const variantChannel = variant?.channelListings?.find(
        (channelListing) => channelListing.channel.id === listing.channel.id
      );

      if (variantChannel) {
        const { costPrice, price } = extractChannelPricesFromVariantChannel(variantChannel);

        return {
          ...variantChannel.channel,
          currency: variantChannel.channel.currencyCode,
          preorderThreshold: variantChannel?.preorderThreshold.quantity,
          soldUnits: variantChannel?.preorderThreshold?.soldUnits,
          price,
          costPrice,
        };
      }

      return {
        ...listing.channel,
        currency: listing.channel.currencyCode,
        price: '',
        preorderThreshold: null,
        soldUnits: null,
      };
    });

    channels.set(concatChannelsBySelection(selectedIds, channels, allChannels));

    triggerChange();
  };

  const dataStocks = stocks.data?.map((stock) => stock.id);
  const variantStocks = variant?.stocks.map((stock) => stock.warehouse.id) || [];
  const stockDiff = arrayDiff(variantStocks, dataStocks);

  const addStocks = stocks.data?.filter((stock) =>
    stockDiff.added.some((addedStock) => addedStock === stock.id)
  );
  const updateStocks = stocks.data?.filter(
    (stock) => !stockDiff.added.some((addedStock) => addedStock === stock.id)
  );

  const data: ProductUpdateData = {
    ...formData,
    attributes: getAttributesDisplayData(
      attributes.data,
      attributesWithNewFileValue.data,
      opts.referencePages,
      opts.referenceProducts
    ),
    channelListings: channels.data,
    stocks: stocks.data,
  };

  const disabled =
    channels?.data?.some(
      (channelData) =>
        validatePrice(channelData.value.price) || validateCostPrice(channelData.value.costPrice)
    ) ||
    (data?.isPreorder && data?.hasPreorderEndDate && !!form.errors.preorderEndDateTime);

  const getSubmitData = async (): Promise<ProductUpdateSubmitData> => ({
    ...formData,
    ...getMetadata(formData, isMetadataModified, isPrivateMetadataModified),
    addStocks,
    attributes: mergeAttributes(
      attributes.data,
      getRichTextAttributesFromMap(attributes.data, await getAttributeRichTextValues())
    ),
    attributesWithNewFileValue: attributesWithNewFileValue.data,
    channelListings: channels.data,
    removeStocks: stockDiff.removed,
    updateStocks,
  });

  const handleSubmit = async (data: ProductUpdateSubmitData) => {
    const validationErrors = validateVariantData(data);

    setValidationErrors(validationErrors);

    if (validationErrors.length) {
      return validationErrors;
    }

    const apiErrors = await onSubmit(data);

    if (!apiErrors?.length) {
      attributesWithNewFileValue.set([]);
    }

    return apiErrors;
  };

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit: handleSubmit,
  });

  const submit = async () => handleFormSubmit(await getSubmitData());

  useEffect(() => setExitDialogSubmitRef(submit), [submit]);

  const isSaveDisabled = loading || disabled;
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
      changeMedia: handleMediaChange,
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

const ProductUpdateForm: FC<ProductUpdateFormProps> = ({
  children,
  variant,
  onSubmit,
  loading,
  ...rest
}) => {
  const props = useProductUpdateForm(variant, onSubmit, loading, rest);

  return <form onSubmit={props.submit}>{children(props)}</form>;
};

ProductUpdateForm.displayName = 'ProductUpdateForm';
export default ProductUpdateForm;
