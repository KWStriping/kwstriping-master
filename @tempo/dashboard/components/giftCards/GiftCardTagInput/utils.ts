import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';

export const getMultiChoices = (values: string[]): MultiAutocompleteChoiceType[] =>
  values.map((tag) => ({
    label: tag,
    value: tag,
  }));
