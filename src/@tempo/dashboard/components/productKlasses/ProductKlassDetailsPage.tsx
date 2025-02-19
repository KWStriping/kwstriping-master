import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { ProductAttributeType, ProductKlassKind } from '@tempo/api/generated/constants';
import type {
  ProductKlassDetailsQuery,
  TaxClassBaseFragment,
  WeightUnit,
} from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata/types';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import Form from '@tempo/dashboard/components/forms/Form';
import ProductKlassAttributes from '@tempo/dashboard/components/productKlasses/ProductKlassAttributes';
import ProductKlassDetails from '@tempo/dashboard/components/productKlasses/ProductKlassDetails';
import ProductKlassShipping from '@tempo/dashboard/components/productKlasses/ProductKlassShipping';
import ProductKlassTaxes from '@tempo/dashboard/components/productKlasses/ProductKlassTaxes';
import ProductKlassVariantAttributes from '@tempo/dashboard/components/productKlasses/ProductKlassVariantAttributes';
import ControlledSwitch from '@tempo/dashboard/components/widgets/ControlledSwitch';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import { handleTaxClassChange } from '@tempo/dashboard/oldSrc/productKlasses/handlers';
import type {
  FetchMoreProps,
  ListActions,
  ReorderEvent,
  UserError,
} from '@tempo/dashboard/oldSrc/types';
import { mapMetadataItemToInput } from '@tempo/dashboard/oldSrc/utils/maps';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';

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
              {m.dashboard_productKlasses() ?? 'Product Types'}
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
                  label={m.dashboard_pHBSU() ?? 'Product type has variants'}
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
