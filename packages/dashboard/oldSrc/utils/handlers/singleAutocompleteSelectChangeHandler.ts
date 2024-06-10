import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import type { FormChange } from '@dashboard/hooks/useForm';
import type { ChangeEvent } from 'react';

export interface SingleAutocompleteSelectedChangeHandlerProps {
  change: FormChange;
  setSelected: (value: string) => void;
  choices: SingleAutocompleteChoiceType[];
}

function createSingleAutocompleteSelectHandler(
  change: FormChange,
  setSelected: (value: string) => void,
  choices: SingleAutocompleteChoiceType[]
): FormChange {
  return (event: ChangeEvent<unknown>) => {
    change(event);

    const value = event.target.value;
    const choice = choices.find((category) => category.value === value);
    setSelected(choice ? choice.label : value);
  };
}

export default createSingleAutocompleteSelectHandler;
