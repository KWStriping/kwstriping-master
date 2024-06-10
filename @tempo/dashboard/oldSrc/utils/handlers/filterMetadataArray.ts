import type { MetadataInput } from '@tempo/api/generated/graphql';

export const filterMetadataArray = (metadataInputs: MetadataInput[]) =>
  metadataInputs.filter((input) => !!input.key);
