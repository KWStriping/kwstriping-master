import { useTranslation } from '@core/i18n';
import { ButtonWithSelect } from '@core/ui/components/buttons/ButtonWithSelect';
import { makeStyles } from '@core/ui/theme/styles';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import { useMemo } from 'react';
import LimitReachedAlert from '@dashboard/components/alerts/LimitReachedAlert';
import FilterBar from '@dashboard/components/bars/FilterBar';
import CardMenu from '@dashboard/components/core/CardMenu';
import ColumnPicker from '@dashboard/components/core/ColumnPicker';
import { getByName } from '@dashboard/components/core/Filter/utils';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import type {
  GridAttributesQuery,
  ProductListQuery,
  RefreshLimitsQuery,
  SearchAvailableInGridAttributesQuery,
} from '@core/api/graphql';
import type { ProductListColumns } from '@dashboard/oldSrc/config';
import type { ProductListUrlOrdering } from '@dashboard/oldSrc/products/urls';
import type {
  ChannelProps,
  FetchMoreProps,
  FilterPageProps,
  ListActions,
  PageListProps,
  RelayToFlat,
  SortPage,
} from '@dashboard/oldSrc/types';
import { hasLimits, isLimitReached } from '@dashboard/oldSrc/utils/limits';
import ProductList from '../ProductList';
import { getAttributeColumnValue } from './utils';
import { useFilterStructure } from './filters';
import type { ProductFilterKeys, ProductListFilterOpts } from './filters';

export interface ProductListPageProps
  extends PageListProps<ProductListColumns>,
    ListActions,
    FilterPageProps<ProductFilterKeys, ProductListFilterOpts>,
    FetchMoreProps,
    SortPage<ProductListUrlOrdering>,
    ChannelProps {
  activeAttributeSortId: string;
  availableInGridAttributes: RelayToFlat<
    NonNullable<SearchAvailableInGridAttributesQuery['availableInGrid']>
  >;
  columnQuery: string;
  currencySymbol: string;
  gridAttributes: RelayToFlat<NonNullable<GridAttributesQuery['grid']>>;
  limits: RefreshLimitsQuery['shop']['limits'];
  products: RelayToFlat<NonNullable<ProductListQuery['products']>>;
  selectedProductIds: string[];
  onAdd: () => void;
  onExport: () => void;
  onColumnQueryChange: (query: string) => void;
}

const useStyles = makeStyles(
  (theme) => ({
    columnPicker: {
      marginRight: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        '& > button': {
          width: '100%',
        },
      },
    },
    settings: {
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
      },
    },
  }),
  { name: 'ProductListPage' }
);

export const ProductListPage: FC<ProductListPageProps> = ({
  columnQuery,
  currencySymbol,
  currentTab,
  defaultSettings,
  gridAttributes,
  limits,
  availableInGridAttributes,
  filterOpts,
  hasMore,
  initialSearch,
  loading,
  settings,
  tabs,
  onAdd,
  onAll,
  onColumnQueryChange,
  onExport,
  onFetchMore,
  onFilterChange,
  onFilterAttributeFocus,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  onUpdateListSettings,
  selectedChannelId,
  selectedProductIds,
  ...listProps
}) => {
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};

  const staticColumns = [
    {
      label: t('dashboard.vailability', 'Availability'),
      value: 'availability' as ProductListColumns,
    },
    {
      label: t('dashboard.price', 'Price'),
      value: 'price' as ProductListColumns,
    },
    {
      label: t('dashboard.type', 'Type'),
      value: 'productKlass' as ProductListColumns,
    },
    {
      label: t('dashboard.updatedAt', 'Last updated'),
      value: 'date' as ProductListColumns,
    },
  ];

  const initialColumnsChoices = useMemo(() => {
    const selectedStaticColumns = staticColumns.filter((column) =>
      (settings?.columns || []).includes(column.value)
    );
    const selectedAttributeColumns = gridAttributes.map((attribute) => ({
      label: attribute.name,
      value: getAttributeColumnValue(attribute.id),
    }));

    return [...selectedStaticColumns, ...selectedAttributeColumns];
  }, [gridAttributes, settings?.columns]);

  const handleSave = (columns: ProductListColumns[]) =>
    onUpdateListSettings?.('columns', columns);

  const filterStructure = useFilterStructure(filterOpts);

  const filterDependency = filterStructure.find(getByName('channel'));

  const availableColumns: MultiAutocompleteChoiceType[] = [
    ...staticColumns,
    ...availableInGridAttributes.map(
      (attribute) =>
        ({
          label: attribute.name,
          value: getAttributeColumnValue(attribute.id),
        }) as MultiAutocompleteChoiceType
    ),
  ];

  const limitReached = isLimitReached(limits, 'productVariants');

  return (
    <Container>
      <PageHeader
        cardMenu={
          <CardMenu
            className={styles.settings ?? ''}
            menuItems={[
              {
                label: t(
                  'dashboard.FL+WZ',
                  'Export Products'
                  // export products to csv file, button
                ),
                onSelect: onExport,
                testId: 'export',
              },
            ]}
            data-test-id="menu"
          />
        }
        title={t('dashboard.products', 'Products')}
        subtitle={
          hasLimits(limits, 'productVariants') &&
          t('dashboard.w0jHS', '{{count}}/{{max}} SKUs used', {
            count: limits.currentUsage.productVariants,
            max: limits.allowedUsage.productVariants,
          })
        }
      >
        <ColumnPicker
          className={styles.columnPicker ?? ''}
          availableColumns={availableColumns}
          initialColumns={initialColumnsChoices}
          defaultColumns={defaultSettings.columns}
          hasMore={hasMore}
          loading={loading}
          query={columnQuery}
          onQueryChange={onColumnQueryChange}
          onFetchMore={onFetchMore}
          onSave={handleSave}
          IconButtonProps={{ variant: 'secondary' }}
        />
        <ButtonWithSelect
          options={[]}
          data-test-id="add-product"
          disabled={limitReached}
          onClick={onAdd}
        >
          {t('dashboard.createProduct', 'Create Product')}
        </ButtonWithSelect>
      </PageHeader>
      {limitReached && (
        <LimitReachedAlert title={t('dashboard.wHWUm', 'SKU limit reached')}>
          {t(
            'dashboard.Vwnu+',
            'You have reached your SKU limit, you will be no longer able to add SKUs to your store. If you would like to up your limit, contact your administration staff about raising your limits.'
          )}
        </LimitReachedAlert>
      )}
      <Card>
        <FilterBar
          currencySymbol={currencySymbol}
          currentTab={currentTab}
          initialSearch={initialSearch}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onFilterAttributeFocus={onFilterAttributeFocus}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
          tabs={tabs}
          allTabLabel={t('dashboard.allProducts', 'All Products')}
          structure={filterStructure}
          searchPlaceholder={t('dashboard.Ivvax', 'Search Products...')}
        />
        <ProductList
          {...listProps}
          gridAttributes={gridAttributes}
          settings={settings}
          selectedChannelId={selectedChannelId}
          onUpdateListSettings={onUpdateListSettings}
          filterDependency={filterDependency}
        />
      </Card>
    </Container>
  );
};
ProductListPage.displayName = 'ProductListPage';
export default ProductListPage;
