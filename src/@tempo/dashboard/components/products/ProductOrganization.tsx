import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';
import { ProductErrorCode } from '@tempo/api/generated/constants';
import type {
  ProductChannelListingErrorFragment,
  ProductErrorFragment,
} from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import MultiAutocompleteSelectField from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import { FormSpacer } from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { ChangeEvent } from '@tempo/dashboard/hooks/useForm';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { productKlassUrl } from '@tempo/dashboard/oldSrc/productKlasses/urls';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import { getFormErrors, getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';

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
        title={
          m.dashboard_jeZEG() ?? 'Organize Product'
          // section header
        }
      />
      <CardContent>
        {canChangeType ? (
          <SingleAutocompleteSelectField
            displayValue={productKlassInputDisplayValue}
            error={!!formErrors.productKlass}
            helperText={getProductErrorMessage(formErrors.productKlass, t)}
            name="productKlass"
            disabled={disabled}
            label={m.dashboard_nK_jD() ?? 'Product Type'}
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
              {m.dashboard_nK_jD() ?? 'Product Type'}
            </Typography>
            <Typography>
              <Link href={productKlassUrl(productKlass?.id) ?? ''} disabled={!productKlass?.id}>
                {productKlass?.name ?? '...'}
              </Link>
            </Typography>
            <CardSpacer />
            <Typography className={styles.label ?? ''} variant="caption">
              {m.dashboard_e() + J13 ?? 'Configurable'}
            </Typography>
            <Typography>
              {maybe(
                () =>
                  productKlass.hasVariants
                    ? (m.dashboard_yes() ?? 'Yes')
                    : (m.dashboard_no() ?? 'No'),
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
          label={m.dashboard_cXLVi() ?? 'Category'}
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
          label={m.dashboard_lh_kf() ?? 'Collections'}
          choices={disabled ? [] : collections}
          name="collections"
          value={data?.collections}
          helperText={
            getProductErrorMessage(formErrors.collections, t) ||
            t(
              'dashboard_+Pkm+',
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
