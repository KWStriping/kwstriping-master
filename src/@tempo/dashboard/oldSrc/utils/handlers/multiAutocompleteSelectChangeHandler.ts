import uniqBy from 'lodash-es/uniqBy';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import type { ChangeEvent, FormChange } from '@tempo/dashboard/hooks/useForm';
import { toggle } from '@tempo/dashboard/oldSrc/utils/lists';

const combinedMultiAutocompleteChoices = (
  selected: MultiAutocompleteChoiceType[],
  choices: MultiAutocompleteChoiceType[]
) => uniqBy([...selected, ...choices], 'value');

/**
 * @param change Use toggleValue callback delivered by form
 */
function createMultiAutocompleteSelectHandler(
  change: FormChange,
  setSelected: (choices: MultiAutocompleteChoiceType[]) => void,
  selected: MultiAutocompleteChoiceType[],
  choices: MultiAutocompleteChoiceType[]
): FormChange {
  return (event: ChangeEvent) => {
    change(event);

    const combinedChoices = combinedMultiAutocompleteChoices(selected, choices);

    const id = event.target.value;
    const choice = combinedChoices.find((choice) => choice.value === id);

    setSelected(toggle(choice, selected, (a, b) => a.value === b.value));
  };
}

export default createMultiAutocompleteSelectHandler;
