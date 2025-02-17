import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { FC } from 'react';
import styles from './index.module.css';

import SearchInput from './SearchInput';
import type { SearchPageProps, TabPageProps } from '@tempo/dashboard/oldSrc/types';
import { FilterTab, FilterTabs } from '@tempo/dashboard/components/tables/TableFilter';

export interface SearchBarProps extends SearchPageProps, TabPageProps {
  allTabLabel: string;
  searchPlaceholder: string;
}

const SearchBar: FC<SearchBarProps> = (props) => {
  const {
    allTabLabel,
    currentTab,
    initialSearch,
    onSearchChange,
    searchPlaceholder,
    tabs,
    onAll,
    onTabChange,
    onTabDelete,
    onTabSave,
  } = props;

  const isCustom = currentTab === tabs.length + 1;
  const displayTabAction = isCustom ? 'save' : currentTab === 0 ? null : 'delete';

  return (
    <>
      <FilterTabs currentTab={currentTab}>
        <FilterTab label={allTabLabel} onClick={onAll} />
        {tabs.map((tab, tabIndex) => (
          <FilterTab onClick={() => onTabChange(tabIndex + 1)} label={tab} key={tabIndex} />
        ))}
        {isCustom && (
          <FilterTab onClick={() => undefined} label={m.dashboard_IgdO_() ?? 'Custom Filter'} />
        )}
      </FilterTabs>
      <div className={styles.root ?? ''}>
        <SearchInput
          initialSearch={initialSearch}
          placeholder={searchPlaceholder}
          onSearchChange={onSearchChange}
        />
        {displayTabAction &&
          (displayTabAction === 'save' ? (
            <Button className={styles.tabActionButton ?? ''} onClick={onTabSave}>
              <>
                {/* button */}

                {m.dashboard_Ea_T_() ?? 'Save Search'}
              </>
            </Button>
          ) : (
            displayTabAction === 'delete' && (
              <Button className={styles.tabActionButton ?? ''} onClick={onTabDelete}>
                <>
                  {/* button */}

                  {m.dashboard_CwBUI() ?? 'Delete Search'}
                </>
              </Button>
            )
          ))}
      </div>
    </>
  );
};

SearchBar.displayName = 'SearchBar';
export default SearchBar;
