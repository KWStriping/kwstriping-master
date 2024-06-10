import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import type { ChannelOpts } from '@dashboard/components/cards/ChannelsAvailabilityCard/types';
import type {
  DatagridChangeOpts,
  UseDatagridChangeState,
} from '@dashboard/components/core/Datagrid/useDatagridChange';
import type { MetadataFormData } from '@dashboard/components/core/Metadata';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import type {
  MetadataErrorFragment,
  ProductChannelListingUpdateInput,
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
import type { FormsetAtomicData, FormsetChange, FormsetData } from '@dashboard/hooks/useFormset';
import type { RichTextProps } from '@dashboard/oldSrc/attributes/utils/data';
import type { UseProductUpdateHandlerError } from '@dashboard/oldSrc/products/ProductUpdate/handlers/useProductUpdateHandler';
import type { FetchMoreProps, RelayToFlat, ReorderEvent } from '@dashboard/oldSrc/types';
import type { OutputData } from '@editorjs/editorjs';
import type { SetStateAction, Dispatch, ReactNode } from 'react';

import type { ProductChannelsListingDialogSubmit } from './ProductChannelsListingsDialog';

export interface ProductUpdateFormData extends MetadataFormData {
  category: string | null;
  taxClassId: string;
  collections: string[];
  isAvailable: boolean;
  name: string;
  rating: number;
  slug: string;
  seoDescription: string;
  seoTitle: string;
  sku: string;
  trackInventory: boolean;
  isPreorder: boolean;
  globalThreshold: string;
  globalSoldUnits: number;
  hasPreorderEndDate: boolean;
  preorderEndDateTime?: string;
  weight: string;
}
export interface FileAttributeInputData {
  attributeId: string;
  file: File;
}
export type FileAttributeInput = FormsetAtomicData<FileAttributeInputData, string[]>;

export interface FileAttributesSubmitData {
  fileAttributes: FileAttributeInput[];
}
export interface ProductUpdateData extends ProductUpdateFormData {
  attributes: AttributeInput[];
  channels: ProductChannelListingUpdateInput;
  description: OutputData;
}
export interface ProductUpdateSubmitData extends ProductUpdateFormData {
  attributes: AttributeInput[];
  attributesWithNewFileValue: FormsetData<null, File>;
  channels: ProductChannelListingUpdateInput;
  collections: string[];
  description: OutputData;
  variants: DatagridChangeOpts;
}

export interface ProductUpdateHandlers
  extends Record<
      'changeMetadata' | 'selectCategory' | 'selectCollection' | 'selectTaxClass',
      FormChange
    >,
    Record<'selectAttribute' | 'selectAttributeMultiple', FormsetChange<string>> {
  changeChannels: (id: string, data: ChannelOpts) => void;
  selectAttributeReference: FormsetChange<string[]>;
  selectAttributeFile: FormsetChange<File>;
  reorderValue: FormsetChange<ReorderEvent>;
  changeVariants: (data: DatagridChangeOpts) => void;
  fetchReferences: (value: string) => void;
  fetchMoreReferences: FetchMoreProps;
  updateChannelList: ProductChannelsListingDialogSubmit;
}

export interface UseProductUpdateFormOutput
  extends CommonUseFormResultWithHandlers<ProductUpdateData, ProductUpdateHandlers>,
    RichTextProps {
  datagrid: UseDatagridChangeState;
  formErrors: FormErrors<ProductUpdateSubmitData>;
}

export type UseProductUpdateFormRenderProps = Omit<
  UseProductUpdateFormOutput,
  'datagrid' | 'richText'
>;

export interface UseProductUpdateFormOpts
  extends Record<'categories' | 'collections' | 'taxClasses', SingleAutocompleteChoiceType[]> {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  setSelectedCollections: Dispatch<SetStateAction<MultiAutocompleteChoiceType[]>>;
  setSelectedTaxClass: Dispatch<SetStateAction<string>>;
  selectedCollections: MultiAutocompleteChoiceType[];
  warehouses: RelayToFlat<NonNullable<SearchWarehousesQuery['search']>>;
  hasVariants: boolean;
  referencePages: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  referenceProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  fetchReferencePages?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchReferenceProducts?: (data: string) => void;
  fetchMoreReferenceProducts?: FetchMoreProps;
  assignReferencesAttributeId?: string;
  isSimpleProduct: boolean;
}

export type SubmitResult = SubmitPromise<
  Array<UseProductUpdateHandlerError | MetadataErrorFragment>
>;

export interface ProductUpdateFormProps extends UseProductUpdateFormOpts {
  children: (props: UseProductUpdateFormRenderProps) => ReactNode;
  product: Maybe<ProductFragment>;
  onSubmit: (data: ProductUpdateSubmitData) => SubmitResult;
  refetch: () => void;
  disabled: boolean;
}
