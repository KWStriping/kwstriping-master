import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import type { OperationResult } from '@urql/core';
import { AttributeEntityType, AttributeInputType } from '@tempo/api/generated/constants';
import type {
  AttributeErrorFragment,
  AttributeFragment,
  ValueDeleteMutation,
  ValueFragment,
  ValueInput,
  FileUploadMutation,
  Node,
  PageSelectedAttributeFragment,
  ProductFragment,
  SearchPagesQuery,
  SearchProductsQuery,
  SelectedVariantAttributeFragment,
  UploadErrorFragment,
  ProductAttributeFragment,
} from '@tempo/api/generated/graphql';
import type { AttributePageFormData } from '@tempo/dashboard/components/attributes/AttributePage';
import type {
  AttributeInput,
  AttributeInputData,
} from '@tempo/dashboard/components/attributes/AttributesCard';
import type { FormsetData } from '@tempo/dashboard/hooks/useFormset';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import { mapNodeToChoice, mapPagesToChoices } from '@tempo/dashboard/oldSrc/utils/maps';

import type { RichTextContextValues } from '@tempo/dashboard/oldSrc/utils/richText/context';
import type {
  GetRichTextValues,
  RichTextGetters,
} from '@tempo/dashboard/oldSrc/utils/richText/useMultipleRichText';

type AtributesOfFiles = Pick<ValueInput, 'file' | 'id' | 'values' | 'contentType'>;

export interface RichTextProps {
  richText: RichTextContextValues;
  attributeRichTextGetters?: RichTextGetters<string>;
}

export const ATTRIBUTE_TYPES_WITH_DEDICATED_VALUES = [
  AttributeInputType.Dropdown,
  AttributeInputType.Multiselect,
  AttributeInputType.Swatch,
];

export const ATTRIBUTE_TYPES_WITH_CONFIGURABLE_FACED_NAVIGATION = [
  AttributeInputType.Dropdown,
  AttributeInputType.Multiselect,
  AttributeInputType.Boolean,
  AttributeInputType.Date,
  AttributeInputType.DateTime,
  AttributeInputType.Numeric,
  AttributeInputType.Swatch,
];

export function filterable(attribute: Pick<AttributeFragment, 'inputType'>): boolean {
  return ATTRIBUTE_TYPES_WITH_CONFIGURABLE_FACED_NAVIGATION.includes(attribute.inputType);
}

export interface AttributeReference {
  label: string;
  value: string;
}

export interface ValueEditDialogFormData {
  name: string;
  value?: string;
  fileUrl?: string;
  contentType?: string;
}

export function valueFragmentToFormData(data: ValueFragment | null): ValueEditDialogFormData {
  return {
    name: data?.name,
    value: data?.value,
    contentType: data?.file?.contentType,
    fileUrl: data?.file?.url,
  };
}

function getSimpleAttributeData(data: AttributePageFormData, values: ValueEditDialogFormData[]) {
  return {
    ...data,
    metadata: undefined,
    privateMetadata: undefined,
    storefrontSearchPosition: parseInt(data?.storefrontSearchPosition, 10),
    values: values.map((value) => ({
      name: value.name,
    })),
  };
}

function getValueTypeFields({ fileUrl, value, name, contentType }: ValueEditDialogFormData) {
  return {
    name,
    ...(fileUrl ? { fileUrl, contentType } : { value }),
  };
}

function getSwatchAttributeData(data: AttributePageFormData, values: ValueEditDialogFormData[]) {
  return {
    ...data,
    metadata: undefined,
    privateMetadata: undefined,
    storefrontSearchPosition: parseInt(data?.storefrontSearchPosition, 10),
    values: values.map(getValueTypeFields),
  };
}

function getFileOrReferenceAttributeData(
  data: AttributePageFormData,
  values: ValueEditDialogFormData[]
) {
  return {
    ...getSimpleAttributeData(data, values),
    availableInGrid: undefined,
    filterableInDashboard: undefined,
    filterableInStorefront: undefined,
  };
}

export function getAttributeData(data: AttributePageFormData, values: ValueEditDialogFormData[]) {
  if (data?.inputType === AttributeInputType.Swatch) {
    return getSwatchAttributeData(data, values);
  } else if (ATTRIBUTE_TYPES_WITH_DEDICATED_VALUES.includes(data?.inputType)) {
    return getSimpleAttributeData(data, values);
  } else {
    return getFileOrReferenceAttributeData(data, values);
  }
}

export function getDefaultValues(attribute: ProductAttributeFragment) {
  switch (attribute.inputType) {
    case AttributeInputType.Boolean:
      return ['false'];

    default:
      return [];
  }
}

export function getSelectedValues(
  attribute:
    | PageSelectedAttributeFragment
    | ProductFragment['attributes'][0]
    | SelectedVariantAttributeFragment
) {
  switch (attribute.inputType) {
    case AttributeInputType.Reference:
      return attribute.values.map((value) => value.reference);

    case AttributeInputType.PlainText:
      return [attribute.values[0]?.plainText];

    case AttributeInputType.RichText:
      return [attribute.values[0]?.richText];

    case AttributeInputType.Numeric:
      return [attribute.values[0]?.name];

    case AttributeInputType.Boolean:
      return [attribute.values[0]?.boolean ?? 'false'];

    case AttributeInputType.Date:
      return [attribute.values[0]?.date];

    case AttributeInputType.DateTime:
      return [attribute.values[0]?.dateTime];

    default:
      return attribute.values.map((value) => value.slug);
  }
}

export const isFileValueUnused = (
  attributesWithNewFileValue: FormsetData<null, File>,
  existingAttribute:
    | PageSelectedAttributeFragment
    | ProductFragment['attributes'][0]
    | SelectedVariantAttributeFragment
) => {
  if (existingAttribute.attribute.inputType !== AttributeInputType.File) {
    return false;
  }
  if (existingAttribute.values.length === 0) {
    return false;
  }

  const modifiedAttribute = attributesWithNewFileValue.find(
    (dataAttribute) => dataAttribute.id === existingAttribute.attribute.id
  );

  return !!modifiedAttribute;
};

export const mergeFileUploadErrors = (
  uploadFilesResult: Array<OperationResult<FileUploadMutation>>
): UploadErrorFragment[] =>
  uploadFilesResult.reduce((errors, uploadFileResult) => {
    const uploadErrors = uploadFileResult?.data?.fileUpload?.errors;
    if (uploadErrors) {
      return [...errors, ...uploadErrors];
    }
    return errors;
  }, []);

export const mergeValueDeleteErrors = (
  deleteValuesResult: Array<OperationResult<ValueDeleteMutation>>
): AttributeErrorFragment[] =>
  deleteValuesResult.reduce((errors, deleteValueResult) => {
    const deleteErrors = deleteValueResult?.data?.deleteValue?.errors;
    if (deleteErrors) {
      return [...errors, ...deleteErrors];
    }
    return errors;
  }, []);

export const mergeChoicesWithValues = (
  attribute:
    | ProductFragment['attributes'][0]
    | PageSelectedAttributeFragment
    | SelectedVariantAttributeFragment
) => {
  const choices = mapEdgesToItems(attribute.values) || [];
  const valuesToConcat = attribute.values.filter(
    (value) => !choices.some((choice) => choice.id === value.id)
  );

  return choices.concat(valuesToConcat);
};

export const mergeValues = (
  attributeId: string,
  values: string[],
  attributes: FormsetData<AttributeInputData, string[]>
) => {
  const attribute = attributes.find((attribute) => attribute.id === attributeId);

  return attribute.value ? [...attribute.value, ...values] : values;
};

export const mergeAttributes = (...attributeLists: AttributeInput[][]): AttributeInput[] =>
  attributeLists.reduce((prev, attributes) => {
    const newAttributeIds = new Set(attributes.map((attr) => attr.id));
    return [...prev.filter((attr) => !newAttributeIds.has(attr.id)), ...attributes];
  }, []);

export function getRichTextAttributesFromMap(
  attributes: AttributeInput[],
  values: GetRichTextValues
): AttributeInput[] {
  return attributes
    .filter(({ data }) => data?.inputType === AttributeInputType.RichText)
    .map((attribute) => ({
      ...attribute,
      value: [JSON.stringify(values[attribute.id])],
    }));
}

export function getRichTextDataFromAttributes(
  attributes: AttributeInput[] = []
): Record<string, string> {
  const keyValuePairs = attributes
    .filter((attribute) => attribute.data?.inputType === AttributeInputType.RichText)
    .map((attribute) => [attribute.id, attribute.value[0]]);

  return Object.fromEntries(keyValuePairs);
}

export const getFileValuesToUploadFromAttributes = (
  attributesWithNewFileValue: FormsetData<null, File>
) => attributesWithNewFileValue.filter((fileAttribute) => !!fileAttribute.value);

export const getFileValuesRemovedFromAttributes = (
  attributesWithNewFileValue: FormsetData<null, File>
) => attributesWithNewFileValue.filter((attribute) => !attribute.value);

export const getAttributesOfRemovedFiles = (
  fileAttributesRemoved: FormsetData<null, File>
): AtributesOfFiles[] =>
  fileAttributesRemoved.map((attribute) => ({
    file: undefined,
    id: attribute.id,
    contentType: attribute.value?.type,
    values: [],
  }));

export const getAttributesOfUploadedFiles = (
  fileValuesToUpload: FormsetData<null, File>,
  uploadFilesResult: Array<OperationResult<FileUploadMutation>>
): AtributesOfFiles[] =>
  uploadFilesResult.map((uploadFileResult, index) => {
    const attribute = fileValuesToUpload[index];

    return {
      file: uploadFileResult.data?.fileUpload?.uploadedFile?.url,
      contentType: uploadFileResult.data?.fileUpload?.uploadedFile?.contentType,
      id: attribute.id,
      values: [],
    };
  });

export const getAttributesAfterFileAttributesUpdate = (
  attributesWithNewFileValue: FormsetData<null, File>,
  uploadFilesResult: Array<OperationResult<FileUploadMutation>>
): ValueInput[] => {
  const removedFileValues = getFileValuesRemovedFromAttributes(attributesWithNewFileValue);
  const fileValuesToUpload = getFileValuesToUploadFromAttributes(attributesWithNewFileValue);

  const removedFileAttributes = getAttributesOfRemovedFiles(removedFileValues);
  const uploadedFileAttributes = getAttributesOfUploadedFiles(
    fileValuesToUpload,
    uploadFilesResult
  );

  return uploadedFileAttributes.concat(removedFileAttributes);
};

export const getFileAttributeDisplayData = (
  attribute: AttributeInput,
  attributesWithNewFileValue: FormsetData<null, File>
) => {
  const attributeWithNewFileValue = attributesWithNewFileValue.find(
    (attributeWithNewFile) => attribute.id === attributeWithNewFile.id
  );

  if (attributeWithNewFileValue) {
    return {
      ...attribute,
      value: attributeWithNewFileValue?.value?.name ? [attributeWithNewFileValue.value.name] : [],
    };
  }
  return attribute;
};

export const getPageReferenceAttributeDisplayData = (
  attribute: AttributeInput,
  referencePages: RelayToFlat<NonNullable<SearchPagesQuery['search']>>
) => ({
  ...attribute,
  data: {
    ...attribute.data,
    references:
      !!referencePages?.length && attribute.value?.length
        ? mapPagesToChoices(
            attribute.value.map((value) => {
              const reference = referencePages.find((reference) => reference.id === value);
              return { ...reference };
            })
          )
        : [],
  },
});

export const getProductReferenceAttributeDisplayData = (
  attribute: AttributeInput,
  referenceProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>
) => ({
  ...attribute,
  data: {
    ...attribute.data,
    references:
      !!referenceProducts?.length && attribute.value?.length
        ? mapNodeToChoice(
            attribute.value.map((value) => {
              const reference = referenceProducts.find((reference) => reference.id === value);
              return { ...reference };
            })
          )
        : [],
  },
});

// export const getProductReferenceAttributeDisplayData = (
//   attribute: AttributeInput,
//   referenceProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>
// ) => ({
//   ...attribute,
//   data: {
//     ...attribute.data,
//     references:
//       !!referenceProducts?.length && attribute.value?.length
//         ? mapNodeToChoice(
//           attribute.value.map((value) => {
//             const reference = mapReferenceProductsToVariants(referenceProducts).find(
//               (reference) => reference.id === value
//             );
//             return { ...reference };
//           })
//         )
//         : [],
//   },
// });

export const getReferenceAttributeDisplayData = (
  attribute: AttributeInput,
  referencePages: RelayToFlat<NonNullable<SearchPagesQuery['search']>>,
  referenceProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>
) => {
  if (attribute.data?.entityType === AttributeEntityType.Page) {
    return getPageReferenceAttributeDisplayData(attribute, referencePages);
  } else if (attribute.data?.entityType === AttributeEntityType.Product) {
    return getProductReferenceAttributeDisplayData(attribute, referenceProducts);
  } else if (attribute.data?.entityType === AttributeEntityType.Product) {
    return getProductReferenceAttributeDisplayData(attribute, referenceProducts);
  }
};

export const getAttributesDisplayData = (
  attributes: AttributeInput[],
  attributesWithNewFileValue: FormsetData<null, File>,
  referencePages: RelayToFlat<NonNullable<SearchPagesQuery['search']>>,
  referenceProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>
) =>
  attributes.map((attribute) => {
    if (attribute.data?.inputType === AttributeInputType.Reference) {
      return getReferenceAttributeDisplayData(attribute, referencePages, referenceProducts);
    }
    if (attribute.data?.inputType === AttributeInputType.File) {
      return getFileAttributeDisplayData(attribute, attributesWithNewFileValue);
    }
    return attribute;
  });

export const getSelectedReferencesFromAttribute = <T extends Node>(
  attribute?: AttributeInput,
  references?: T[]
) =>
  references?.filter(
    (value) => !attribute?.value?.some((selectedValue) => selectedValue === value.id)
  ) || [];

export const getReferenceAttributeEntityTypeFromAttribute = (
  attributeId: string,
  attributes?: AttributeInput[]
): AttributeEntityType | undefined =>
  attributes?.find((attribute) => attribute.id === attributeId)?.data?.entityType;

export const mapReferenceProductsToVariants = (
  referenceProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>
) =>
  referenceProducts.flatMap((product) =>
    product.variants.map((variant) => ({
      ...variant,
      name: product.name + ' ' + variant.name,
    }))
  );
