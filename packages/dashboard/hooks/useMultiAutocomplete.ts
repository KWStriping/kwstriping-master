import type { ChangeEvent } from 'react';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import useListActions from '@dashboard/hooks/useListActions';
import { maybe } from '@dashboard/oldSrc/misc';

function useMultiAutocomplete(initial: MultiAutocompleteChoiceType[] = []) {
  const { listElements, toggle } = useListActions<MultiAutocompleteChoiceType>(
    initial,
    (a, b) => a.value === b.value
  );
  const handleSelect = (
    event: ChangeEvent<unknown>,
    choices: MultiAutocompleteChoiceType[]
  ) => {
    const value: string = event.target.value;
    const match = choices.find((choice) => choice.value === value);
    toggle({
      label: maybe(() => match.label, value),
      value,
    });
  };

  return {
    change: handleSelect,
    data: listElements,
  };
}

export default useMultiAutocomplete;
