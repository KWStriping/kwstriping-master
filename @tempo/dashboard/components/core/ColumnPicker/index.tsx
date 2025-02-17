import type { IconButtonProps } from '@tempo/ui/components/buttons/IconButton/IconButton';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import type { Choice } from '@tempo/ui/components/Filter';
import ColumnsIcon from '@mui/icons-material/ViewColumn';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import { score } from 'fuzzaldrin';
import sortBy from 'lodash-es/sortBy';
import { useRef, useState, useEffect } from 'react';
import type { FC } from 'react';
import type { MultiAutocompleteChoiceType } from '../../fields/MultiAutocompleteSelectField';
import type { ColumnPickerContentProps } from './ColumnPickerContent';
import ColumnPickerContent from './ColumnPickerContent';
import styles from './index.module.css';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';

export interface ColumnPickerProps
  extends FetchMoreProps,
    Pick<ColumnPickerContentProps, 'onQueryChange'> {
  className?: string;
  availableColumns: MultiAutocompleteChoiceType[];
  defaultColumns: string[];
  initialColumns: Choice[];
  initialOpen?: boolean;
  IconButtonProps?: Omit<IconButtonProps, 'ref'>;
  query: string;
  onSave: (columns: string[]) => void;
}

const ColumnPicker: FC<ColumnPickerProps> = (props) => {
  const {
    className,
    availableColumns,
    defaultColumns,
    initialColumns,
    initialOpen = false,
    onSave,
    query,
    IconButtonProps = {},
    ...rest
  } = props;
  const anchor = useRef<HTMLDivElement>();
  const selectedColumns = useRef(initialColumns.map(({ value }) => value));
  const [isExpanded, setExpansionState] = useState(false);

  // Component is uncontrolled but we need to reset it somehow, so we change
  // initial prop after reset callback to force value refreshing
  const [initialColumnsChoices, setInitialColumnsChoices] = useStateFromProps(initialColumns);

  const onChange: FormChange<string[]> = (event) => {
    selectedColumns.current = event.target.value;
  };

  useEffect(() => {
    setTimeout(() => setExpansionState(initialOpen), 100);
  }, []);

  const handleCancel = () => {
    setExpansionState(false);
    selectedColumns.current = initialColumns.map(({ value }) => value);
  };

  const handleReset = () => {
    selectedColumns.current = defaultColumns;
    const defaultColumnsChoices = defaultColumns.map((value) => ({
      label: availableColumns.find((column) => column.value === value)?.label,
      value,
    }));
    setInitialColumnsChoices(defaultColumnsChoices);
    onChange({ target: { name: '', value: defaultColumns } });
  };

  const handleSave = () => {
    setExpansionState(false);
    onSave(selectedColumns.current);
  };

  const choices = sortBy(
    availableColumns.map((column) => ({
      ...column,
      score: -score(column.label, query),
    })),
    'score'
  );

  return (
    <ClickAwayListener onClickAway={() => setExpansionState(false)}>
      <div ref={anchor} className={className}>
        <IconButton
          {...IconButtonProps}
          state={isExpanded ? 'active' : 'default'}
          onClick={() => setExpansionState((prevState) => !prevState)}
        >
          <ColumnsIcon />
        </IconButton>
        <Popper
          className={styles.popper ?? ''}
          open={isExpanded}
          anchorEl={anchor.current}
          transition
          placement="bottom-end"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'right bottom' : 'right top',
              }}
            >
              <ColumnPickerContent
                choices={choices}
                initialValues={initialColumnsChoices}
                onCancel={handleCancel}
                onChange={onChange}
                onReset={handleReset}
                onSave={handleSave}
                {...rest}
              />
            </Grow>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default ColumnPicker;
