import { makeStyles } from '@tempo/ui/theme/styles';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import type { SingleAutocompleteSelectFieldProps } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import type { Choice } from '@tempo/dashboard/components/fields/SingleSelectField';
import type {
  CustomCell,
  CustomCellRenderer,
  ProvideEditorCallback,
} from '@glideapps/glide-data-grid';
import { getMiddleCenterBias } from '@glideapps/glide-data-grid';
import pick from 'lodash-es/pick';
import { useCallback, useState } from 'react';

export type DropdownChoice = Choice<string, string>;
export type DropdownCellContentProps = Pick<
  SingleAutocompleteSelectFieldProps,
  'allowCustomValues' | 'emptyOption'
>;

export type DropdownCellGetSuggestionsFn = (text: string) => Promise<DropdownChoice[]>;
interface DropdownCellProps extends DropdownCellContentProps {
  readonly choices?: DropdownChoice[];
  readonly update?: DropdownCellGetSuggestionsFn;
  readonly kind: 'dropdown-cell';
  readonly value: DropdownChoice | null;
}

export type DropdownCell = CustomCell<DropdownCellProps>;

export const emptyDropdownCellValue: DropdownChoice = {
  label: '',
  value: null,
};

const useStyles = makeStyles(
  {
    root: {
      '& > div': {
        padding: 0,
      },
      '& input': {
        height: 'unset',
      },
    },
  },
  { name: 'DropdownCell' }
);

const DropdownCellEdit: ReturnType<ProvideEditorCallback<DropdownCell>> = ({
  value: cell,
  onFinishedEditing,
}) => {
  const [data, setData] = useState<DropdownChoice[]>([]);
  const styles = {};
  const getChoices = useCallback(
    async (text: string) => {
      setData(await cell.data?.update(text));
    },
    [cell.data]
  );

  const userProps = pick(cell.data, ['allowCustomValues', 'emptyOption']);
  const props = cell.data?.update
    ? { fetchOnFocus: true, fetchChoices: getChoices, choices: data }
    : { choices: cell.data?.choices };

  return (
    <SingleAutocompleteSelectField
      {...userProps}
      {...props}
      className={styles.root ?? ''}
      nakedInput
      onChange={(event) =>
        onFinishedEditing({
          ...cell,
          data: {
            ...cell.data,
            value: props.choices.find((c) => c.value === event.target.value) ?? {
              label: event.target.value,
              value: event.target.value,
            },
          },
        })
      }
      name=""
      displayValue={cell.data?.value?.label}
      value={cell.data?.value?.value}
    />
  );
};

export const dropdownCellRenderer: CustomCellRenderer<DropdownCell> = {
  isMatch: (c): c is DropdownCell => (c.data as unknown).kind === 'dropdown-cell',
  draw: (args, cell) => {
    const { ctx, theme, rect } = args;
    const { value } = cell.data;

    ctx.fillStyle = theme.textDark;
    ctx.fillText(
      value.label,
      rect.x + 8,
      rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme)
    );

    return true;
  },
  provideEditor: () => ({
    editor: DropdownCellEdit,
    disablePadding: true,
    deletedValue: (cell) => ({
      ...cell,
      copyData: '',
      data: {
        ...cell.data,
        display: '',
        value: null,
      },
    }),
  }),
  onPaste: (value, data) => ({
    ...data,
    value: { value, label: value } ?? null,
  }),
};
