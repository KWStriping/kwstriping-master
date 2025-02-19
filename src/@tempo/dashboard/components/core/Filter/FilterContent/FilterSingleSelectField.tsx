import type { FC } from 'react';
import type { FilterFieldBaseProps } from '@tempo/dashboard/components/core/Filter';
import { FilterType } from '@tempo/dashboard/components/core/Filter';
import {
  getIsFilterMultipleChoices,
  // useCommonStyles,
} from '@tempo/dashboard/components/core/Filter/FilterContent/utils';
import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';

type FilterSingleSelectFieldProps = FilterFieldBaseProps<string>;

export const FilterSingleSelectField: FC<FilterSingleSelectFieldProps> = ({
  filter,
  onFilterPropertyChange,
}) => {
  // const styles = useCommonStyles({});
  const styles = {};

  return (
    <>
      <SingleSelectField
        data-test-id="filter-range-type-choice"
        choices={getIsFilterMultipleChoices(t)}
        value={filter.multiple ? FilterType.Multiple : FilterType.Singular}
        InputProps={{
          classes: {
            input: styles.input ?? '',
          },
        }}
        onChange={(event) =>
          onFilterPropertyChange({
            payload: {
              name: filter.name,
              update: {
                multiple: event.target.value === FilterType.Multiple,
                ...(event.target.value !== FilterType.Multiple && {
                  value: filter.value?.slice(0, 1) as string[],
                }),
              },
            },
            type: 'set-property',
          })
        }
      />
      <FormSpacer />
    </>
  );
};
