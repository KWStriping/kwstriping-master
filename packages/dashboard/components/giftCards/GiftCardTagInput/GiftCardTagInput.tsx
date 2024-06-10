import { useTranslation } from '@core/i18n';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import compact from 'lodash-es/compact';
import uniq from 'lodash-es/uniq';
import type { FC } from 'react';
import MultiAutocompleteSelectField from '@dashboard/components/fields/MultiAutocompleteSelectField';
import type { SingleAutocompleteSelectFieldProps } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import type { FormChange } from '@dashboard/hooks/useForm';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import type { GiftCardBulkCreateFormError } from '@dashboard/oldSrc/giftCards/GiftCardBulkCreateDialog/types';
import { getGiftCardErrorMessage } from '@dashboard/oldSrc/giftCards/GiftCardUpdate/messages';
import useGiftCardTagsSearch from '@dashboard/oldSrc/searches/useGiftCardTagsSearch';
import { mapMultiValueNodeToChoice } from '@dashboard/oldSrc/utils/maps';

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
  const { t } = useTranslation();

  const { loadMore, search, result } = useGiftCardTagsSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const choices = mapMultiValueNodeToChoice(
    uniq(compact(mapEdgesToItems(result?.data?.search)?.map(({ name }) => name))),
    'tags'
  );

  const label = optional
    ? `${t('dashboard.placeholder', 'Tag')} *${t('optionalField', 'Optional')}`
    : t('dashboard.placeholder', 'Tag');

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
