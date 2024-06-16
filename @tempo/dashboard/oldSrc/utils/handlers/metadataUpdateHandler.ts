import * as m from '@paraglide/messages';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata/types';
import type {
  MetadataErrorFragment,
  MetadataInput,
  UpdateMetadataMutation,
  UpdateMetadataMutationVariables,
  UpdatePrivateMetadataMutation,
  UpdatePrivateMetadataMutationVariables,
} from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import { arrayDiff } from '@tempo/dashboard/oldSrc/utils/arrays';
import type { OperationResult } from '@apollo/client';
import { assert } from 'tsafe';

import { filterMetadataArray } from './filterMetadataArray';
import { areMetadataArraysEqual } from './metadataUpdateHelpers';

interface ObjectWithMetadata {
  id: string;
  metadata: MetadataInput[];
  privateMetadata: MetadataInput[];
}

function createMetadataUpdateHandler<TData extends MetadataFormData, TError>(
  initial: Maybe<ObjectWithMetadata>,
  update: (data: TData) => SubmitPromise<TError[]>,
  updateMetadata: (
    variables: UpdateMetadataMutationVariables
  ) => Promise<OperationResult<UpdateMetadataMutation>>,
  updatePrivateMetadata: (
    variables: UpdatePrivateMetadataMutationVariables
  ) => Promise<OperationResult<UpdatePrivateMetadataMutation>>
) {
  return async (data: TData): Promise<Array<MetadataErrorFragment | TError>> => {
    assert(!!initial);
    const errors = await update(data);

    const hasMetadataChanged = !areMetadataArraysEqual(initial.metadata, data?.metadata);
    const hasPrivateMetadataChanged = !areMetadataArraysEqual(
      initial.privateMetadata,
      data?.privateMetadata
    );

    if (errors?.length) {
      return errors;
    }

    if (errors?.length === 0) {
      if (data?.metadata && hasMetadataChanged) {
        const initialKeys = initial.metadata?.map((m) => m.key);
        const modifiedKeys = data?.metadata?.map((m) => m.key);

        const keyDiff = arrayDiff(initialKeys, modifiedKeys);

        const updateMetaResult = await updateMetadata({
          id: initial.id,
          input: filterMetadataArray(data?.metadata),
          keysToDelete: keyDiff.removed,
        });

        const updateMetaErrors = [
          ...(updateMetaResult.data?.deleteMetadata?.errors || []),
          ...(updateMetaResult.data?.updateMetadata?.errors || []),
        ];

        if (updateMetaErrors?.length) {
          return updateMetaErrors;
        }
      }

      if (data?.privateMetadata && hasPrivateMetadataChanged) {
        const initialKeys = initial.privateMetadata?.map((m) => m.key);
        const modifiedKeys = data?.privateMetadata?.map((m) => m.key);

        const keyDiff = arrayDiff(initialKeys, modifiedKeys);

        const updatePrivateMetaResult = await updatePrivateMetadata({
          id: initial.id,
          input: filterMetadataArray(data?.privateMetadata),
          keysToDelete: keyDiff.removed,
        });

        const updatePrivateMetaErrors = [
          ...(updatePrivateMetaResult.data?.deletePrivateMetadata?.errors || []),
          ...(updatePrivateMetaResult.data?.updatePrivateMetadata?.errors || []),
        ];

        if (updatePrivateMetaErrors?.length) {
          return updatePrivateMetaErrors;
        }
      }
    }

    return [];
  };
}

export default createMetadataUpdateHandler;
