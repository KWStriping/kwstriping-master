import type {
  ValueFragment,
  PageErrorWithAttributesFragment,
  ProductErrorWithAttributesFragment,
} from '@core/api/graphql';
import type { FormsetChange } from '@dashboard/hooks/useFormset';
import type { FetchMoreProps, ReorderEvent } from '@dashboard/oldSrc/types';
import type { RichTextGetters } from '@dashboard/oldSrc/utils/richText/useMultipleRichText';

import type { AttributeInput } from './Attributes';

export enum ProductAttributeScope {
  All = 'ALL',
  VariantSelection = 'VARIANT_SELECTION',
  NotVariantSelection = 'NOT_VARIANT_SELECTION',
}

export interface AttributeRowHandlers {
  onChange: FormsetChange<string>;
  onFileChange: FormsetChange<File>;
  onMultiChange: FormsetChange<string>;
  onReferencesAddClick: (attribute: AttributeInput) => void;
  onReferencesRemove: FormsetChange<string[]>;
  onReferencesReorder: FormsetChange<ReorderEvent>;
  fetchValues: (query: string, attributeId: string) => void;
  fetchMoreValues: FetchMoreProps;
}

export interface AttributeRowProps extends AttributeRowHandlers {
  attribute: AttributeInput;
  values: ValueFragment[];
  disabled: boolean;
  error: ProductErrorWithAttributesFragment | PageErrorWithAttributesFragment;
  loading: boolean;
  onAttributeSelectBlur?: () => void;
  richTextGetters: RichTextGetters<string>;
}
