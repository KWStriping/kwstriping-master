import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import ChevronDown from '@dashboard/assets/images/ChevronDown.svg';
import Add from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { GetItemPropsOptions } from 'downshift';
import type { CSSProperties, FC, ReactElement } from 'react';
import { isValidElement, useState, useRef, useEffect } from 'react';

import styles from './index.module.css';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import useElementScroll, { isScrolledToBottom } from '@tempo/dashboard/hooks/useElementScroll';

const menuItemHeight = 46;
const maxMenuItems = 5;
const offset = 24;

export type ChoiceValue = string;
export interface SingleAutocompleteChoiceType<V extends ChoiceValue = ChoiceValue, L = string> {
  label: L;
  value: V;
}
export interface SingleAutocompleteActionType {
  label: string;
  onClick: () => void;
}
export interface SingleAutocompleteSelectFieldContentProps extends Partial<FetchMoreProps> {
  add?: SingleAutocompleteActionType;
  choices: Array<SingleAutocompleteChoiceType<string, string | JSX.Element>>;
  displayCustomValue: boolean;
  emptyOption: boolean;
  getItemProps: (options: GetItemPropsOptions<string>) => unknown;
  highlightedIndex: number;
  inputValue: string;
  isCustomValueSelected: boolean;
  selectedItem: unknown;
  style?: CSSProperties;
}

function getChoiceIndex(index: number, emptyValue: boolean, customValue: boolean, add: boolean) {
  let choiceIndex = index;
  if (emptyValue) {
    choiceIndex += 1;
  }
  if (customValue || add) {
    choiceIndex += 2;
  }

  return choiceIndex;
}

const sliceSize = 20;

const SingleAutocompleteSelectFieldContent: FC<SingleAutocompleteSelectFieldContentProps> = (
  props
) => {
  const {
    add,
    choices,
    displayCustomValue,
    emptyOption,
    getItemProps,
    hasMore,
    loading,
    inputValue,
    isCustomValueSelected,
    selectedItem,
    onFetchMore,
    style,
  } = props;

  if (!!add && !!displayCustomValue) {
    throw new Error('Add and custom value cannot be displayed simultaneously');
  }
  const anchor = useRef<HTMLDivElement>();
  const scrollPosition = useElementScroll(anchor);
  const [calledForMore, setCalledForMore] = useState(false);
  const [slice, setSlice] = useState(onFetchMore ? 10000 : sliceSize);
  const [initialized, setInitialized] = useState(false);

  const scrolledToBottom = isScrolledToBottom(anchor, scrollPosition, offset);

  useEffect(() => {
    if (!calledForMore && onFetchMore && scrolledToBottom && hasMore) {
      onFetchMore();
      setCalledForMore(true);
    } else if (scrolledToBottom && !onFetchMore) {
      setSlice((slice) => slice + sliceSize);
    }
  }, [scrolledToBottom]);

  useEffect(() => {
    if (!onFetchMore) {
      setSlice(sliceSize);
    }
    if (anchor.current?.scrollTo && !initialized) {
      anchor.current.scrollTo({
        top: 0,
      });
      setInitialized(true);
    }
  }, [choices?.length]);

  useEffect(() => {
    setInitialized(false);
  }, [inputValue]);

  useEffect(() => {
    if (calledForMore && !loading) {
      setCalledForMore(false);
    }
  }, [loading]);

  const emptyOptionProps = getItemProps({
    item: '',
  });

  const choicesToDisplay = choices.slice(0, slice);

  return (
    <Paper
      // click-outside-ignore is used by glide-datagrid
      className={clsx('click-outside-ignore', styles.root)}
      elevation={8}
      style={style}
    >
      <div
        className={styles.content ?? ''}
        ref={anchor}
        data-test-id="autocomplete-dropdown"
        aria-label="autocomplete-dropdown"
      >
        {choices?.length || displayCustomValue ? (
          <>
            {emptyOption && (
              <MenuItem
                className={styles.menuItem ?? ''}
                component="div"
                data-test-id="single-autocomplete-select-option"
                data-test-type="empty"
                {...emptyOptionProps}
              >
                <Typography color="textSecondary">{m.dashboard___Fty() ?? 'None'}</Typography>
              </MenuItem>
            )}
            {add && (
              <MenuItem
                className={styles.menuItem ?? ''}
                component="div"
                {...getItemProps({
                  item: inputValue,
                })}
                data-test-id="single-autocomplete-select-option-add"
                data-test-type="add"
                onClick={add.onClick}
              >
                <Add color="primary" className={styles.add ?? ''} />
                <Typography color="primary">{add.label}</Typography>
              </MenuItem>
            )}
            {displayCustomValue && (
              <MenuItem
                className={styles.menuItem ?? ''}
                key={'customValue'}
                selected={isCustomValueSelected}
                component="div"
                {...getItemProps({
                  item: inputValue,
                })}
                data-test-id="single-autocomplete-select-option"
                data-test-type="custom"
              >
                <Trans t={t} i18nKey={'U2WgwW'} value={inputValue}>
                  {'Add new value: {value}'}
                </Trans>
              </MenuItem>
            )}
            {!!choices?.length && (!!add || displayCustomValue) && (
              <Divider className={styles.hr ?? ''} />
            )}
            {choicesToDisplay.map((suggestion, index) => {
              const choiceIndex = getChoiceIndex(index, emptyOption, displayCustomValue, !!add);
              const key = isValidElement(suggestion.label)
                ? `${index}${suggestion.value}${(suggestion as unknown as ReactElement).props}`
                : JSON.stringify(suggestion);

              return (
                <MenuItem
                  className={styles.menuItem ?? ''}
                  key={key}
                  selected={selectedItem === suggestion.value}
                  component="div"
                  {...getItemProps({
                    index: choiceIndex,
                    item: suggestion.value,
                  })}
                  data-test-id="single-autocomplete-select-option"
                  data-test-value={suggestion.value}
                  data-test-type="option"
                >
                  {suggestion.label}
                </MenuItem>
              );
            })}
            {hasMore && (
              <>
                <Divider className={styles.hr ?? ''} />
                <div className={styles.progressContainer ?? ''}>
                  <CircularProgress className={styles.progress ?? ''} size={24} />
                </div>
              </>
            )}
          </>
        ) : (
          <MenuItem
            disabled={true}
            component="div"
            data-test-id="single-autocomplete-select-no-options"
          >
            {m.dashboard_X_PAb() ?? 'No results found'}
          </MenuItem>
        )}
      </div>
      {choices.length > maxMenuItems && (
        <div className={styles.arrowContainer ?? ''}>
          <div
            className={clsx(
              styles.arrowInnerContainer ?? '',
              // Needs to be explicitly compared to false because
              // scrolledToBottom can be either true, false or undefined
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

SingleAutocompleteSelectFieldContent.displayName = 'SingleAutocompleteSelectFieldContent';
export default SingleAutocompleteSelectFieldContent;
