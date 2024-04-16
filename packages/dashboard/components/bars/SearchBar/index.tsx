import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { FilterTab, FilterTabs } from '@dashboard/components/tables/TableFilter';
import type { SearchPageProps, TabPageProps } from '@dashboard/oldSrc/types';
import type { FC } from 'react';
import styles from './index.module.css';

import SearchInput from './SearchInput';

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
  const { t } = useTranslation();

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
          <FilterTab onClick={() => undefined} label={t('dashboard.IgdO6', 'Custom Filter')} />
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

                {t('dashboard.Ea1T1', 'Save Search')}
              </>
            </Button>
          ) : (
            displayTabAction === 'delete' && (
              <Button className={styles.tabActionButton ?? ''} onClick={onTabDelete}>
                <>
                  {/* button */}

                  {t('dashboard.CwBUI', 'Delete Search')}
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
