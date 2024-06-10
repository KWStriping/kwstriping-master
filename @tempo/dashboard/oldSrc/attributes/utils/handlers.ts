import type {
  AttributeInput,
  AttributeInputData,
} from '@tempo/dashboard/components/attributes/AttributesCard';
import { AttributeEntityType, AttributeInputType } from '@tempo/api/generated/constants';
import type {
  ValueDeleteMutation,
  ValueDeleteMutationVariables,
  ValueInput,
  FileUploadMutation,
  FileUploadMutationVariables,
  PageSelectedAttributeFragment,
  ProductFragment,
  ProductDetailsQuery,
} from '@tempo/api/generated/graphql';
import type { FormsetAtomicData, FormsetChange, FormsetData } from '@tempo/dashboard/hooks/useFormset';
import type { FetchMoreProps, ReorderEvent } from '@tempo/dashboard/oldSrc/types';
import { move, toggle } from '@tempo/dashboard/oldSrc/utils/lists';
import type { OperationResult } from '@urql/core';
import isEqual from 'lodash-es/isEqual';

import { getFileValuesToUploadFromAttributes, isFileValueUnused } from './data';

export function createAttributeChangeHandler(
  changeAttributeData: FormsetChange<string[]>,
  triggerChange: () => void
): FormsetChange<string> {
  return (attributeId: string, value: string) => {
    triggerChange();
    changeAttributeData(attributeId, value === '' ? [] : [value]);
  };
}

export function createAttributeMultiChangeHandler(
  changeAttributeData: FormsetChange<string[]>,
  attributes: FormsetData<AttributeInputData, string[]>,
  triggerChange: () => void
): FormsetChange<string> {
  return (attributeId: string, value: string) => {
    const attribute = attributes.find((attribute) => attribute.id === attributeId);

    const newValues = toggle(value, attribute.value, (a, b) => a === b);

    triggerChange();
    changeAttributeData(attributeId, newValues);
  };
}

export function createAttributeReferenceChangeHandler(
  changeAttributeData: FormsetChange<string[]>,
  triggerChange: () => void
): FormsetChange<string[]> {
  return (attributeId: string, values: string[]) => {
    changeAttributeData(attributeId, values);
    triggerChange();
  };
}

export function createFetchReferencesHandler(
  attributes: FormsetData<AttributeInputData, string[]>,
  assignReferencesAttributeId: string,
  fetchReferencePages?: (data: string) => void,
  fetchReferenceProducts?: (data: string) => void
) {
  return (value: string) => {
    const attribute = attributes?.find(
      (attribute) => attribute.id === assignReferencesAttributeId
    );

    if (!attribute) return;

    if (attribute.data?.entityType === AttributeEntityType.Page && fetchReferencePages) {
      fetchReferencePages(value);
    } else if (
      [AttributeEntityType.Product, AttributeEntityType.Product].includes(
        attribute.data?.entityType
      ) &&
      fetchReferenceProducts
    ) {
      fetchReferenceProducts(value);
    }
  };
}

export function createFetchMoreReferencesHandler(
  attributes: FormsetData<AttributeInputData, string[]>,
  assignReferencesAttributeId: string,
  fetchMoreReferencePages?: FetchMoreProps,
  fetchMoreReferenceProducts?: FetchMoreProps
) {
  const attribute = attributes?.find((attribute) => attribute.id === assignReferencesAttributeId);

  if (!attribute) return;

  if (attribute.data?.entityType === AttributeEntityType.Page) {
    return fetchMoreReferencePages;
  } else if (
    [AttributeEntityType.Product, AttributeEntityType.Product].includes(
      attribute.data?.entityType
    )
  ) {
    return fetchMoreReferenceProducts;
  }
}

export function createAttributeFileChangeHandler(
  changeAttributeData: FormsetChange<string[]>,
  attributesWithNewFileValue: FormsetData<FormsetData<null, File>>,
  addAttributeNewFileValue: (data: FormsetAtomicData<null, File>) => void,
  changeAttributeNewFileValue: FormsetChange<File>,
  triggerChange: () => void
): FormsetChange<File> {
  return (attributeId: string, value: File) => {
    triggerChange();

    const newFileValueAssigned = attributesWithNewFileValue.find(
      (attribute) => attribute.id === attributeId
    );

    if (newFileValueAssigned) {
      changeAttributeNewFileValue(attributeId, value);
    } else {
      addAttributeNewFileValue({
        data: null,
        id: attributeId,
        label: null,
        value,
      });
    }

    changeAttributeData(attributeId, value ? [value.name] : []);
  };
}

export function createValueReorderHandler(
  changeAttributeData: FormsetChange<string[]>,
  attributes: FormsetData<AttributeInputData, string[]>,
  triggerChange: () => void
): FormsetChange<ReorderEvent> {
  return (attributeId: string, reorder: ReorderEvent) => {
    triggerChange();

    const attribute = attributes.find((attribute) => attribute.id === attributeId);

    const reorderedValues = move(
      attribute.value[reorder.oldIndex],
      attribute.value,
      (a, b) => a === b,
      reorder.newIndex
    );

    changeAttributeData(attributeId, reorderedValues);
  };
}

function getFileInput(attribute: AttributeInput, updatedFileAttributes: ValueInput[]) {
  const updatedFileAttribute = updatedFileAttributes.find(
    (attributeWithNewFile) => attribute.id === attributeWithNewFile.id
  );

  if (updatedFileAttribute) {
    return {
      file: updatedFileAttribute.file,
      id: updatedFileAttribute.id,
      contentType: updatedFileAttribute.contentType,
    };
  }
  return {
    file: attribute.data?.selectedValues?.[0]?.file?.url,
    contentType: attribute.data?.selectedValues?.[0]?.file.contentType,
    id: attribute.id,
  };
}

function getBooleanInput(attribute: AttributeInput) {
  return {
    id: attribute.id,
    boolean: JSON.parse(attribute.value[0] ?? 'false'),
  };
}

function getAttributesMap(attributes: AttributeInput[] | null) {
  if (attributes && attributes?.length !== 0) {
    return new Map(attributes.map((attribute) => [attribute.id, attribute.value]));
  }
  return new Map();
}

interface AttributesArgs {
  attributes: AttributeInput[];
  prevAttributes: AttributeInput[] | null;
  updatedFileAttributes: ValueInput[];
}

export const prepareAttributesInput = ({
  attributes,
  prevAttributes,
  updatedFileAttributes,
}: AttributesArgs): ValueInput[] => {
  const prevAttributesMap = getAttributesMap(prevAttributes);

  return attributes.reduce((attrInput: ValueInput[], attr) => {
    const prevAttrValue = prevAttributesMap.get(attr.id);
    if (isEqual(attr.value, prevAttrValue)) {
      return attrInput;
    }

    const inputType = attr.data?.inputType;
    if (inputType === AttributeInputType.File) {
      const fileInput = getFileInput(attr, updatedFileAttributes);
      if (fileInput.file) {
        attrInput.push(fileInput);
      }
      return attrInput;
    }
    if (inputType === AttributeInputType.Boolean) {
      const booleanInput = getBooleanInput(attr);
      // previous comparison doesn't work because value was string
      if (isEqual([booleanInput.boolean], prevAttrValue)) {
        return attrInput;
      }

      attrInput.push(booleanInput);
      return attrInput;
    }
    if (inputType === AttributeInputType.PlainText) {
      attrInput.push({
        id: attr.id,
        plainText: attr.value[0],
      });
      return attrInput;
    }
    if (inputType === AttributeInputType.RichText) {
      attrInput.push({
        id: attr.id,
        richText: attr.value[0],
      });
      return attrInput;
    }

    if (inputType === AttributeInputType.Reference) {
      attrInput.push({
        id: attr.id,
        references: attr.value,
      });
      return attrInput;
    }
    if (inputType === AttributeInputType.Date) {
      attrInput.push({
        id: attr.id,
        date: attr.value[0],
      });
      return attrInput;
    }
    if (inputType === AttributeInputType.DateTime) {
      attrInput.push({
        id: attr.id,
        dateTime: attr.value[0],
      });
      return attrInput;
    }

    attrInput.push({
      id: attr.id,
      values: attr.value,
    });

    return attrInput;
  }, []);
};

export const handleUploadMultipleFiles = async (
  attributesWithNewFileValue: FormsetData<null, File>,
  uploadFile: (
    variables: FileUploadMutationVariables
  ) => Promise<OperationResult<FileUploadMutation>>
) =>
  gather(
    getFileValuesToUploadFromAttributes(attributesWithNewFileValue).map((fileAttribute) =>
      uploadFile({
        file: fileAttribute.value,
      })
    )
  );

export const handleDeleteMultipleValues = async (
  attributesWithNewFileValue: FormsetData<null, File>,
  attributes: Array<
    | PageSelectedAttributeFragment
    | ProductFragment['attributes'][0]
    | ProductDetailsQuery['productVariant']['nonSelectionAttributes'][0]
  >,
  deleteValue: (
    variables: ValueDeleteMutationVariables
  ) => Promise<OperationResult<ValueDeleteMutation>>
) =>
  gather(
    attributes.map((existingAttribute) => {
      const fileValueUnused = isFileValueUnused(attributesWithNewFileValue, existingAttribute);

      if (fileValueUnused) {
        return deleteValue({
          id: existingAttribute.values[0].id,
          firstValues: 20,
        });
      }
    })
  );
