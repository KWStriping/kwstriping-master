import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import Grid from '@core/ui/components/Grid';
import Metadata from '@dashboard/components/core/Metadata';
import type { MetadataFormData } from '@dashboard/components/core/Metadata/types';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import ProductKlassAttributes from '@dashboard/components/productKlasses/ProductKlassAttributes';
import ProductKlassDetails from '@dashboard/components/productKlasses/ProductKlassDetails';
import ProductKlassShipping from '@dashboard/components/productKlasses/ProductKlassShipping';
import ProductKlassTaxes from '@dashboard/components/productKlasses/ProductKlassTaxes';
import ProductKlassVariantAttributes from '@dashboard/components/productKlasses/ProductKlassVariantAttributes';
import ControlledSwitch from '@dashboard/components/widgets/ControlledSwitch';
import { ProductAttributeType, ProductKlassKind } from '@core/api/constants';
import type {
  ProductKlassDetailsQuery,
  TaxClassBaseFragment,
  WeightUnit,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import { handleTaxClassChange } from '@dashboard/oldSrc/productKlasses/handlers';
import type {
  FetchMoreProps,
  ListActions,
  ReorderEvent,
  UserError,
} from '@dashboard/oldSrc/types';
import { mapMetadataItemToInput } from '@dashboard/oldSrc/utils/maps';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';

interface ChoiceType {
  label: string;
  value: string;
}

export interface ProductKlassForm extends MetadataFormData {
  name: string;
  kind: ProductKlassKind;
  hasVariants: boolean;
  isShippingRequired: boolean;
  taxClassId: string;
  productAttributes: ChoiceType[];
  variantAttributes: ChoiceType[];
  weight: number;
}

export interface ProductKlassDetailsPageProps {
  errors: UserError[];
  productKlass: ProductKlassDetailsQuery['productKlass'];
  defaultWeightUnit: WeightUnit;
  disabled: boolean;
  pageTitle: string;
  productAttributeList: ListActions;
  saveButtonBarState: ConfirmButtonTransitionState;
  taxClasses: TaxClassBaseFragment[];
  variantAttributeList: ListActions;
  onAttributeAdd: (type: ProductAttributeType) => void;
  onAttributeReorder: (event: ReorderEvent, type: ProductAttributeType) => void;
  onAttributeUnassign: (id: string) => void;
  onDelete: () => void;
  onHasVariantsToggle: (hasVariants: boolean) => void;
  onSubmit: (data: ProductKlassForm) => SubmitPromise;
  setSelectedVariantAttributes: (data: string[]) => void;
  selectedVariantAttributes: string[];
  onFetchMoreTaxClasses: FetchMoreProps;
}

const ProductKlassDetailsPage: FC<ProductKlassDetailsPageProps> = ({
  defaultWeightUnit,
  disabled,
  errors,
  pageTitle,
  productKlass,
  productAttributeList,
  saveButtonBarState,
  taxClasses,
  variantAttributeList,
  onAttributeAdd,
  onAttributeUnassign,
  onAttributeReorder,
  onDelete,
  onHasVariantsToggle,
  onSubmit,
  setSelectedVariantAttributes,
  selectedVariantAttributes,
  onFetchMoreTaxClasses,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  const [taxClassDisplayName, setTaxClassDisplayName] = useStateFromProps(
    productKlass?.taxClass?.name ?? ''
  );

  if (!productKlass) return null;

  const formInitialData: ProductKlassForm = {
    hasVariants: productKlass.hasVariants !== undefined ? productKlass.hasVariants : false,
    isShippingRequired:
      productKlass.isShippingRequired !== undefined ? productKlass.isShippingRequired : false,
    metadata: productKlass?.metadata?.map(mapMetadataItemToInput),
    name: productKlass.name !== undefined ? productKlass.name : '',
    kind: productKlass?.kind || ProductKlassKind.Normal,
    privateMetadata: productKlass?.privateMetadata?.map(mapMetadataItemToInput),
    productAttributes:
      productKlass.productAttributes?.map((attribute) => ({
        label: attribute.name,
        value: attribute.id,
      })) ?? [],
    taxClassId: productKlass?.taxClass?.id ?? '',
    variantAttributes:
      productKlass.variantAttributes?.map((attribute) => ({
        label: attribute.name,
        value: attribute.id,
      })) ?? [],
    weight: productKlass.weight?.value,
  };

  const handleSubmit = (data: ProductKlassForm) => {
    const metadata = isMetadataModified ? data?.metadata : undefined;
    const privateMetadata = isPrivateMetadataModified ? data?.privateMetadata : undefined;

    return onSubmit({
      ...data,
      metadata,
      privateMetadata,
    });
  };

  return (
    <Form initial={formInitialData} onSubmit={handleSubmit} confirmLeave disabled={disabled}>
      {({ change, data, isSaveDisabled, submit }) => {
        const changeMetadata = makeMetadataChangeHandler(change);

        return (
          <Container>
            <Backlink href={'/product-types'}>
              {t('dashboard.productKlasses', 'Product Types')}
            </Backlink>
            <PageHeader title={pageTitle} />
            <Grid>
              <div>
                <ProductKlassDetails
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                  onKindChange={change}
                />
                <CardSpacer />
                <ProductKlassTaxes
                  disabled={disabled}
                  data={data}
                  taxClasses={taxClasses}
                  taxClassDisplayName={taxClassDisplayName}
                  onChange={(event) =>
                    handleTaxClassChange(event, taxClasses, change, setTaxClassDisplayName)
                  }
                  onFetchMore={onFetchMoreTaxClasses}
                />
                <CardSpacer />
                <ProductKlassAttributes
                  testId="assign-products-attributes"
                  attributes={productKlass.productAttributes ?? []}
                  disabled={disabled}
                  type={ProductAttributeType.Product}
                  onAttributeAssign={onAttributeAdd}
                  onAttributeReorder={(event: ReorderEvent) =>
                    onAttributeReorder(event, ProductAttributeType.Product)
                  }
                  onAttributeUnassign={onAttributeUnassign}
                  {...productAttributeList}
                />
                <CardSpacer />
                <ControlledSwitch
                  checked={data?.hasVariants}
                  disabled={disabled}
                  label={t('dashboard.pHBSU', 'Product type has variants')}
                  name="hasVariants"
                  onChange={(event) => onHasVariantsToggle(event.target.value)}
                />
                {data?.hasVariants && (
                  <>
                    <CardSpacer />
                    <ProductKlassVariantAttributes
                      testId="assign-variants-attributes"
                      productVariantAttributeAssignments={
                        productKlass.productVariantAttributeAssignments
                      }
                      disabled={disabled}
                      type={ProductAttributeType.Variant}
                      onAttributeAssign={onAttributeAdd}
                      onAttributeReorder={(event: ReorderEvent) =>
                        onAttributeReorder(event, ProductAttributeType.Variant)
                      }
                      onAttributeUnassign={onAttributeUnassign}
                      setSelectedVariantAttributes={setSelectedVariantAttributes}
                      selectedVariantAttributes={selectedVariantAttributes}
                      {...variantAttributeList}
                    />
                  </>
                )}
                <CardSpacer />
                <Metadata data={data} onChange={changeMetadata} />
              </div>
              <div>
                <ProductKlassShipping
                  disabled={disabled}
                  data={data}
                  weightUnit={productKlass?.weight?.unit || defaultWeightUnit}
                  onChange={change}
                />
              </div>
            </Grid>
            <SaveBar
              onCancel={() => router.push('/product-types')}
              onDelete={onDelete}
              onSubmit={submit}
              disabled={isSaveDisabled}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};
ProductKlassDetailsPage.displayName = 'ProductKlassDetailsPage';
export default ProductKlassDetailsPage;
