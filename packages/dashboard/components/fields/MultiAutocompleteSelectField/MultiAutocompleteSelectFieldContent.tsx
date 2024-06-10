import { Trans, useTranslation } from '@core/i18n';
import ChevronDown from '@dashboard/assets/images/ChevronDown.svg';
import Checkbox from '@dashboard/components/core/Checkbox';
import useElementScroll, { isScrolledToBottom } from '@dashboard/hooks/useElementScroll';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { GetItemPropsOptions } from 'downshift';
import { useEffect, useState, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

const menuItemHeight = 46;
const maxMenuItems = 5;
const offset = 24;

export interface MultiAutocompleteActionType {
  label: string;
  onClick: () => void;
}
export interface MultiAutocompleteChoiceType {
  label: string;
  value: unknown;
  disabled?: boolean;
  badge?: ReactNode;
}
export interface MultiAutocompleteSelectFieldContentProps extends Partial<FetchMoreProps> {
  add?: MultiAutocompleteActionType;
  choices: MultiAutocompleteChoiceType[];
  displayCustomValue: boolean;
  displayValues: MultiAutocompleteChoiceType[];
  getItemProps: (options: GetItemPropsOptions<string>) => unknown;
  highlightedIndex: number;
  inputValue: string;
}

function getChoiceIndex(
  index: number,
  displayValues: MultiAutocompleteChoiceType[],
  displayCustomValue: boolean,
  add: boolean
) {
  let choiceIndex = index;
  if (add || displayCustomValue) {
    choiceIndex += 2;
  }
  if (displayValues?.length) {
    choiceIndex += 1 + displayValues.length;
  }

  return choiceIndex;
}

const MultiAutocompleteSelectFieldContent: FC<MultiAutocompleteSelectFieldContentProps> = (
  props
) => {
  const {
    add,
    choices = [],
    displayCustomValue,
    displayValues,
    getItemProps,
    hasMore,
    highlightedIndex,
    loading,
    inputValue,
    onFetchMore,
  } = props;
  if (!!add && !!displayCustomValue) {
    throw new Error('Add and custom value cannot be displayed simultaneously');
  }
  const { t } = useTranslation();
  const anchor = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useElementScroll(anchor);
  const [calledForMore, setCalledForMore] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  useEffect(() => {
    if (!anchor.current) return;
    if (typeof scrollPosition === 'undefined') return;
    setScrolledToBottom(!!isScrolledToBottom(anchor, scrollPosition, offset));
  }, [anchor, scrollPosition]);

  useEffect(() => {
    if (!calledForMore && onFetchMore && scrolledToBottom) {
      onFetchMore();
      setCalledForMore(true);
    }
  }, [scrolledToBottom]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (calledForMore && !loading) {
      setCalledForMore(false);
    }
  }, [loading]);

  const hasValuesToDisplay = displayValues?.length || displayCustomValue || choices?.length;
  return (
    <Paper className={styles.root ?? ''} elevation={8}>
      {hasValuesToDisplay && (
        <div
          className={styles.content ?? ''}
          ref={anchor}
          data-test-id="multi-autocomplete-select-content"
        >
          <>
            {add && (
              <MenuItem
                className={styles.menuItem ?? ''}
                component="div"
                {...getItemProps({
                  item: inputValue,
                })}
                data-test-id="multi-autocomplete-select-option-add"
                onClick={add.onClick}
              >
                <AddIcon color="primary" className={styles.addIcon ?? ''} />
                <Typography color="primary">{add.label}</Typography>
              </MenuItem>
            )}
            {displayCustomValue && (
              <MenuItem
                className={styles.menuItem ?? ''}
                key="customValue"
                component="div"
                {...getItemProps({
                  item: inputValue,
                })}
                data-test-id="multi-autocomplete-select-option-custom"
              >
                <AddIcon className={styles.addIcon ?? ''} color="primary" />
                <Trans t={t} i18nKey={'U2WgwW'} value={inputValue}>
                  {'Add new value: {value}'}
                </Trans>
              </MenuItem>
            )}
            {(!!choices?.length || !!displayValues?.length) && displayCustomValue && (
              <Divider className={styles.hr ?? ''} />
            )}
            {displayValues?.map((value) => (
              <MenuItem
                className={styles.menuItem ?? ''}
                key={value.value}
                selected={true}
                disabled={value.disabled}
                component="div"
                {...getItemProps({
                  item: value.value,
                })}
                data-test-id="multi-autocomplete-select-option"
              >
                <Checkbox
                  className={styles.checkbox ?? ''}
                  checked={true}
                  disabled={value.disabled}
                  disableRipple
                />
                <span className={styles.menuItemLabel ?? ''}>
                  {value.badge}
                  {value.label}
                </span>
              </MenuItem>
            ))}
            {!!displayValues?.length && !!choices?.length && (
              <Divider className={styles.hr ?? ''} />
            )}
            {choices.map((suggestion, index) => {
              const choiceIndex = getChoiceIndex(index, displayValues, displayCustomValue, !!add);

              return (
                <MenuItem
                  className={styles.menuItem ?? ''}
                  key={index}
                  selected={highlightedIndex === choiceIndex}
                  disabled={suggestion.disabled}
                  component="div"
                  {...getItemProps({
                    index: choiceIndex,
                    item: suggestion.value,
                  })}
                  data-test-id="multi-autocomplete-select-option"
                >
                  <Checkbox
                    checked={false}
                    disabled={suggestion.disabled}
                    className={styles.checkbox ?? ''}
                    disableRipple
                  />

                  <span className={styles.menuItemLabel ?? ''}>
                    {suggestion.badge}
                    {suggestion.label}
                  </span>
                </MenuItem>
              );
            })}
          </>
        </div>
      )}
      {!loading && !hasValuesToDisplay && (
        <MenuItem
          disabled={true}
          component="div"
          data-test-id="multi-autocomplete-select-no-options"
        >
          {t('dashboard.X5PAb', 'No results found')}
        </MenuItem>
      )}
      {(hasMore || loading) && (
        <>
          {hasMore && <Divider className={styles.hr ?? ''} />}
          <div className={styles.progressContainer ?? ''}>
            <CircularProgress className={styles.progress ?? ''} size={24} />
          </div>
        </>
      )}
      {choices.length > maxMenuItems && (
        <div className={styles.arrowContainer ?? ''}>
          <div
            className={clsx(
              styles.arrowInnerContainer ?? '',
              scrolledToBottom !== false && styles.hide
            )}
          >
            <ChevronDown />
          </div>
        </div>
      )}
    </Paper>
  );
};

MultiAutocompleteSelectFieldContent.displayName = 'MultiAutocompleteSelectFieldContent';
export default MultiAutocompleteSelectFieldContent;
