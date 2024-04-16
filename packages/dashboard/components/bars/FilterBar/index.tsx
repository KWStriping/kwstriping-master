import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import type { SearchBarProps } from '@dashboard/components/bars/SearchBar';
import SearchInput from '@dashboard/components/bars/SearchBar/SearchInput';
import Filter from '@dashboard/components/core/Filter';
import type { FilterProps, FilterErrorMessages } from '@dashboard/components/core/Filter';
import FilterTab from '@dashboard/components/tables/TableFilter/FilterTab';
import FilterTabs from '@dashboard/components/tables/TableFilter/FilterTabs';
import styles from './index.module.css';

export interface FilterBarProps<TKeys extends string = string>
  extends FilterProps<TKeys>,
    SearchBarProps {
  errorMessages?: FilterErrorMessages<TKeys>;
}

function FilterBar<TKeys extends string = string>({
  allTabLabel,
  currencySymbol,
  structure,
  currentTab,
  initialSearch,
  searchPlaceholder,
  tabs,
  onAll,
  onSearchChange,
  onFilterChange,
  onFilterAttributeFocus,
  onTabChange,
  onTabDelete,
  onTabSave,
  errorMessages,
}: FilterBarProps<TKeys>) {
  const { t } = useTranslation();

  const isCustom = currentTab === tabs.length + 1;
  const displayTabAction = isCustom ? 'save' : currentTab === 0 ? null : 'delete';

  console.log('FilterBar', { currentTab, tabs, isCustom, displayTabAction, structure });

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
        <Filter
          errorMessages={errorMessages}
          structure={structure}
          currencySymbol={currencySymbol}
          onFilterChange={onFilterChange}
          onFilterAttributeFocus={onFilterAttributeFocus}
        />
        <SearchInput
          initialSearch={initialSearch}
          placeholder={searchPlaceholder}
          onSearchChange={onSearchChange}
        />
        {displayTabAction &&
          (displayTabAction === 'save' ? (
            <Button className={styles.tabActionButton ?? ''} onClick={onTabSave}>
              {t('dashboard.Ea1T1', 'Save Search')}
            </Button>
          ) : (
            displayTabAction === 'delete' && (
              <Button className={styles.tabActionButton ?? ''} onClick={onTabDelete}>
                {t('dashboard.CwBUI', 'Delete Search')}
              </Button>
            )
          ))}
      </div>
    </>
  );
}

FilterBar.displayName = 'FilterBar';
export default FilterBar;
