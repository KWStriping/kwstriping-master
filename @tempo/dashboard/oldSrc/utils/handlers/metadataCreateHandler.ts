import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata/types';
import type {
  UpdateMetadataMutationFn,
  UpdatePrivateMetadataMutationFn,
} from '@tempo/api/generated/graphql';

import { filterMetadataArray } from './filterMetadataArray';

export interface CreateMetadataHandlerFunctionResult<TError> {
  id?: string;
  errors?: TError[];
}

function createMetadataCreateHandler<T extends MetadataFormData, TError>(
  create: (data: T) => Promise<CreateMetadataHandlerFunctionResult<TError>>,
  setMetadata: UpdateMetadataMutationFn,
  setPrivateMetadata: UpdatePrivateMetadataMutationFn,
  onComplete?: (id: string) => void
) {
  return async (data: T) => {
    const { id, errors } = await create(data);

    if (id === null || !!errors?.length) {
      return errors;
    }

    if (data?.metadata?.length) {
      const updateMetaResult = await setMetadata({
        variables: {
          id,
          input: filterMetadataArray(data?.metadata),
          keysToDelete: [],
        },
      });
      const updateMetaErrors = [
        ...(updateMetaResult.data?.deleteMetadata?.errors || []),
        ...(updateMetaResult.data?.updateMetadata?.errors || []),
      ];

      if (updateMetaErrors?.length) {
        return updateMetaErrors;
      }
    }

    if (data?.privateMetadata?.length) {
      const updatePrivateMetaResult = await setPrivateMetadata({
        variables: {
          id,
          input: filterMetadataArray(data?.privateMetadata),
          keysToDelete: [],
        },
      });

      const updatePrivateMetaErrors = [
        ...(updatePrivateMetaResult.data?.deletePrivateMetadata?.errors || []),
        ...(updatePrivateMetaResult.data?.updatePrivateMetadata?.errors || []),
      ];

      if (updatePrivateMetaErrors?.length) {
        return updatePrivateMetaErrors;
      }
    }

    if (onComplete) {
      onComplete(id);
    }

    return [];
  };
}

export default createMetadataCreateHandler;
