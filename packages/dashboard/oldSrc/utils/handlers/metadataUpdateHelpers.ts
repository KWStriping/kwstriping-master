import type { MetadataInput } from '@core/auth/dist/apollo/types';
import isEqual from 'lodash-es/isEqual';
import sortBy from 'lodash-es/sortBy';

export interface GenericMetadataInput extends MetadataInput {
  __typename?: string;
}

const removeTypename = ({ __typename, ...input }: GenericMetadataInput) => ({
  ...input,
});

export const areMetadataArraysEqual = (before: GenericMetadataInput[], after: MetadataInput[]) =>
  isEqual(sortBy(before.map(removeTypename)), sortBy(after));
