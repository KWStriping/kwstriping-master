import * as m from '@paraglide/messages';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import compact from 'lodash-es/compact';
import uniq from 'lodash-es/uniq';
import type { FC } from 'react';
import MultiAutocompleteSelectField from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import type { SingleAutocompleteSelectFieldProps } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@tempo/dashboard/oldSrc/config';
import type { GiftCardBulkCreateFormError } from '@tempo/dashboard/oldSrc/giftCards/GiftCardBulkCreateDialog/types';
import { getGiftCardErrorMessage } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/messages';
import useGiftCardTagsSearch from '@tempo/dashboard/oldSrc/searches/useGiftCardTagsSearch';
import { mapMultiValueNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';

import { getMultiChoices } from './utils';

interface GiftCardTagInputProps extends Pick<SingleAutocompleteSelectFieldProps, 'name'> {
  toggleChange: FormChange;
  values: string[];
  error: GiftCardBulkCreateFormError;
  optional?: boolean;
  loading?: boolean;
}

const GiftCardTagInput: FC<GiftCardTagInputProps> = ({
  toggleChange,
  name,
  values,
  error,
  optional = true,
  loading,
}) => {
  const { loadMore, search, result } = useGiftCardTagsSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const choices = mapMultiValueNodeToChoice(
    uniq(compact(mapEdgesToItems(result?.data?.search)?.map(({ name }) => name))),
    'tags'
  );

  const label = optional
    ? `${m.dashboard_placeholder() ?? 'Tag'} *${m.optionalField() ?? 'Optional'}`
    : m.dashboard_placeholder() ?? 'Tag';

  return (
    <MultiAutocompleteSelectField
      error={!!error}
      helperText={getGiftCardErrorMessage(error, t)}
      name={name || 'giftCardTag'}
      label={label}
      data-test-id="gift-card-tag-select-field"
      value={values}
      displayValues={getMultiChoices(values)}
      choices={choices}
      fetchChoices={search}
      onChange={toggleChange}
      onFetchMore={loadMore}
      loading={result?.fetching || loading}
      allowCustomValues
    />
  );
};

export default GiftCardTagInput;
