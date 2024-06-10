import { filter } from 'fuzzaldrin';
import { useMemo, useState } from 'react';
import type { Choice } from '@dashboard/components/fields/SingleSelectField';

function useChoiceSearch(choices: Array<Choice<string, string>>) {
  const [query, setQuery] = useState('');

  const sortedChoices = useMemo(
    () => filter(choices, query, { key: 'label' }) || [],
    [choices, query]
  );

  return { search: setQuery, result: sortedChoices };
}

export default useChoiceSearch;
