import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { makeStyles } from '@core/ui/theme/styles';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import MultiAutocompleteSelectField from '@dashboard/components/fields/MultiAutocompleteSelectField';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import { FormSpacer } from '@dashboard/components/forms/Form/FormSpacer';
import { ProductErrorCode } from '@core/api/constants';
import type {
  ProductChannelListingErrorFragment,
  ProductErrorFragment,
} from '@core/api/graphql';
import type { ChangeEvent } from '@dashboard/hooks/useForm';
import { maybe } from '@dashboard/oldSrc/misc';
import { productKlassUrl } from '@dashboard/oldSrc/productKlasses/urls';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import { getFormErrors, getProductErrorMessage } from '@dashboard/oldSrc/utils/errors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface ProductKlass {
  hasVariants: boolean;
  id: string;
  name: string;
}

const useStyles = makeStyles(
  (theme) => ({
    card: {
      overflow: 'visible',
    },
    cardSubtitle: {
      fontSize: theme.typography.body1.fontSize,
      marginBottom: theme.spacing(0.5),
    },
    label: {
      marginBottom: theme.spacing(0.5),
    },
  }),
  { name: 'ProductOrganization' }
);

interface ProductOrganizationProps {
  canChangeType: boolean;
  categories?: SingleAutocompleteChoiceType[];
  categoryInputDisplayValue: string;
  collections?: MultiAutocompleteChoiceType[];
  collectionsInputDisplayValue: MultiAutocompleteChoiceType[];
  data: {
    category: string;
    collections: string[];
    productKlass?: ProductKlass;
  };
  disabled: boolean;
  errors: Array<ProductErrorFragment | ProductChannelListingErrorFragment>;
  productKlass?: ProductKlass;
  productKlassInputDisplayValue?: string;
  productKlasses?: SingleAutocompleteChoiceType[];
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  fetchMoreProductKlasses?: FetchMoreProps;
  fetchProductKlasses?: (data: string) => void;
  onCategoryChange: (event: ChangeEvent) => void;
  onCollectionChange: (event: ChangeEvent) => void;
  onProductKlassChange?: (event: ChangeEvent) => void;
}

const ProductOrganization: FC<ProductOrganizationProps> = (props) => {
  const {
    canChangeType,
    categories,
    categoryInputDisplayValue,
    collections,
    collectionsInputDisplayValue,
    data,
    disabled,
    errors,
    fetchCategories,
    fetchCollections,
    fetchMoreCategories,
    fetchMoreCollections,
    fetchMoreProductKlasses,
    fetchProductKlasses,
    productKlass,
    productKlassInputDisplayValue,
    productKlasses,
    onCategoryChange,
    onCollectionChange,
    onProductKlassChange,
  } = props;
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};
  const formErrors = getFormErrors(
    ['productKlass', 'category', 'collections', 'isPublished'],
    errors
  );
  const noCategoryError =
    formErrors.isPublished?.code === ProductErrorCode.ProductWithoutCategory
      ? formErrors.isPublished
      : null;

  return (
    <Card className={styles.card ?? ''}>
      <CardTitle
        title={t(
          'dashboard.jeZEG',
          'Organize Product'
          // section header
        )}
      />
      <CardContent>
        {canChangeType ? (
          <SingleAutocompleteSelectField
            displayValue={productKlassInputDisplayValue}
            error={!!formErrors.productKlass}
            helperText={getProductErrorMessage(formErrors.productKlass, t)}
            name="productKlass"
            disabled={disabled}
            label={t('dashboard.nK7jD', 'Product Type')}
            choices={productKlasses}
            value={data?.productKlass?.id}
            onChange={onProductKlassChange}
            fetchChoices={fetchProductKlasses}
            data-test-id="product-type"
            {...fetchMoreProductKlasses}
          />
        ) : (
          <>
            <Typography className={styles.label ?? ''} variant="caption">
              {t('dashboard.nK7jD', 'Product Type')}
            </Typography>
            <Typography>
              <Link href={productKlassUrl(productKlass?.id) ?? ''} disabled={!productKlass?.id}>
                {productKlass?.name ?? '...'}
              </Link>
            </Typography>
            <CardSpacer />
            <Typography className={styles.label ?? ''} variant="caption">
              {t('dashboard.e+J13', 'Configurable')}
            </Typography>
            <Typography>
              {maybe(
                () =>
                  productKlass.hasVariants ? t('dashboard.yes', 'Yes') : t('dashboard.no', 'No'),
                '...'
              )}
            </Typography>
          </>
        )}
        <FormSpacer />
        <Divider />
        <FormSpacer />
        <SingleAutocompleteSelectField
          displayValue={categoryInputDisplayValue}
          error={!!(formErrors.category || noCategoryError)}
          helperText={getProductErrorMessage(formErrors.category || noCategoryError, t)}
          disabled={disabled}
          label={t('dashboard.cXLVi', 'Category')}
          choices={disabled ? [] : categories}
          name="category"
          value={data?.category}
          onChange={onCategoryChange}
          fetchChoices={fetchCategories}
          data-test-id="category"
          {...fetchMoreCategories}
        />
        <FormSpacer />
        <Divider />
        <FormSpacer />
        <MultiAutocompleteSelectField
          displayValues={collectionsInputDisplayValue}
          error={!!formErrors.collections}
          label={t('dashboard.lh3kf', 'Collections')}
          choices={disabled ? [] : collections}
          name="collections"
          value={data?.collections}
          helperText={
            getProductErrorMessage(formErrors.collections, t) ||
            t(
              'dashboard.+Pkm+',
              '*Optional. Adding product to collection helps users find it.'
              // field is optional
            )
          }
          onChange={onCollectionChange}
          fetchChoices={fetchCollections}
          data-test-id="collections"
          testId="collection"
          {...fetchMoreCollections}
        />
      </CardContent>
    </Card>
  );
};
ProductOrganization.displayName = 'ProductOrganization';
export default ProductOrganization;
