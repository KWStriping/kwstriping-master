import type { MetadataInput } from '@core/api/graphql';

export const filterMetadataArray = (metadataInputs: MetadataInput[]) =>
  metadataInputs.filter((input) => !!input.key);
