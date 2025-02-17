import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import styles from './index.module.css';
import type { SearchBarProps } from '@tempo/dashboard/components/bars/SearchBar';
import SearchInput from '@tempo/dashboard/components/bars/SearchBar/SearchInput';
import Filter from '@tempo/dashboard/components/core/Filter';
import type { FilterProps, FilterErrorMessages } from '@tempo/dashboard/components/core/Filter';
import FilterTab from '@tempo/dashboard/components/tables/TableFilter/FilterTab';
import FilterTabs from '@tempo/dashboard/components/tables/TableFilter/FilterTabs';

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
          <FilterTab onClick={() => undefined} label={m.dashboard_IgdO_() ?? 'Custom Filter'} />
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
              {m.dashboard_Ea_T_() ?? 'Save Search'}
            </Button>
          ) : (
            displayTabAction === 'delete' && (
              <Button className={styles.tabActionButton ?? ''} onClick={onTabDelete}>
                {m.dashboard_CwBUI() ?? 'Delete Search'}
              </Button>
            )
          ))}
      </div>
    </>
  );
}

FilterBar.displayName = 'FilterBar';
export default FilterBar;
