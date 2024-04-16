import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';

export const getMultiChoices = (values: string[]): MultiAutocompleteChoiceType[] =>
  values.map((tag) => ({
    label: tag,
    value: tag,
  }));
