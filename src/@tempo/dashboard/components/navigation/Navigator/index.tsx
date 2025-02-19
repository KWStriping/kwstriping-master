import * as m from '@paraglide/messages';
import { Divider, Fade, Modal } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Downshift from 'downshift';
import hotkeys from 'hotkeys-js';
import type { InputHTMLAttributes, FC } from 'react';
import { useRef, useEffect } from 'react';
import styles from './index.module.css';

import {
  getActions,
  getCatalog,
  getCustomers,
  getViews,
  hasActions,
  hasCatalog,
  hasCustomers,
  hasViews,
} from './modes/utils';
import NavigatorInput from './NavigatorInput';
import NavigatorSection from './NavigatorSection';
import type { QuickSearchAction } from './types';
import useQuickSearch from './useQuickSearch';

const navigatorHotkey = 'ctrl+k, command+k';

function getItemOffset(actions: QuickSearchAction[], cbs: Array<typeof getViews>): number {
  return cbs.reduce((acc, cb) => cb(actions).length + acc, 0);
}

export interface NavigatorProps {
  visible: boolean;
  setVisibility: (state: boolean) => void;
}

const Navigator: FC<NavigatorProps> = ({ visible, setVisibility }) => {
  const input = useRef(null);
  const [query, mode, change, actions] = useQuickSearch(visible, input);
  const theme = useTheme();

  useEffect(() => {
    hotkeys(navigatorHotkey, (event) => {
      event.preventDefault();
      setVisibility(!visible);
    });
    return () => hotkeys.unbind(navigatorHotkey);
  }, []);

  const hasAnything =
    hasViews(actions) || hasActions(actions) || hasCustomers(actions) || hasCatalog(actions);

  return (
    <Modal className={styles.modal ?? ''} open={visible} onClose={() => setVisibility(false)}>
      <Fade appear in={visible} timeout={theme.transitions.duration.short}>
        <div className={styles.root ?? ''}>
          <Paper className={styles.paper ?? ''}>
            <Downshift
              itemToString={(item: QuickSearchAction | null) => (item ? item.label : '')}
              onSelect={(item: QuickSearchAction) => {
                const shouldRemainVisible = item.onClick();
                if (!shouldRemainVisible) {
                  setVisibility(false);
                }
              }}
              onInputValueChange={(value) =>
                change({
                  target: {
                    name: 'query',
                    value,
                  },
                })
              }
              defaultHighlightedIndex={0}
            >
              {({ getInputProps, getItemProps, highlightedIndex }) => (
                <div>
                  <NavigatorInput
                    mode={mode}
                    value={query}
                    {...(getInputProps({
                      value: query,
                    }) as InputHTMLAttributes<HTMLInputElement>)}
                    ref={input}
                  />
                  {hasAnything && <Divider />}
                  {hasViews(actions) && (
                    <NavigatorSection
                      label={m.navigatorSectionHeaders_navigateTo() ?? 'Navigate to'}
                      getItemProps={getItemProps}
                      highlightedIndex={highlightedIndex}
                      items={getViews(actions)}
                      offset={0}
                    />
                  )}
                  {hasActions(actions) && (
                    <NavigatorSection
                      label={m.navigatorSectionHeaders_quickActions() ?? 'Quick Actions'}
                      getItemProps={getItemProps}
                      highlightedIndex={highlightedIndex}
                      items={getActions(actions)}
                      offset={getItemOffset(actions, [getViews])}
                    />
                  )}
                  {hasCustomers(actions) && (
                    <NavigatorSection
                      label={m.navigatorSectionHeaders_searchCustomers() ?? 'Search in customers'}
                      getItemProps={getItemProps}
                      highlightedIndex={highlightedIndex}
                      items={getCustomers(actions)}
                      offset={getItemOffset(actions, [getViews, getActions])}
                    />
                  )}
                  {hasCatalog(actions) && (
                    <NavigatorSection
                      label={m.navigatorSectionHeaders_searchCatalog() ?? 'Search in catalog'}
                      getItemProps={getItemProps}
                      highlightedIndex={highlightedIndex}
                      items={getCatalog(actions)}
                      offset={0}
                    />
                  )}
                </div>
              )}
            </Downshift>
          </Paper>
        </div>
      </Fade>
    </Modal>
  );
};

export default Navigator;
