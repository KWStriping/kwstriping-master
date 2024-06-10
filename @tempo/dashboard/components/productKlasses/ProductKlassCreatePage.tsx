import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import Form from '@tempo/dashboard/components/forms/Form';
import type { TaxClassBaseFragment, WeightUnit } from '@tempo/api/generated/constants';
import { ProductKlassKind } from '@tempo/api/generated/constants';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import {
  handleTaxClassChange,
  makeProductKlassKindChangeHandler,
} from '@tempo/dashboard/oldSrc/productKlasses/handlers';
import type { FetchMoreProps, UserError } from '@tempo/dashboard/oldSrc/types';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import ProductKlassDetails from './ProductKlassDetails';
import ProductKlassShipping from './ProductKlassShipping';
import ProductKlassTaxes from './ProductKlassTaxes';

export interface ProductKlassForm extends MetadataFormData {
  name: string;
  kind: ProductKlassKind;
  isShippingRequired: boolean;
  taxClassId: string;
  weight: number;
}

export interface ProductKlassCreatePageProps {
  errors: UserError[];
  defaultWeightUnit: WeightUnit;
  disabled: boolean;
  pageTitle: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  taxClasses: TaxClassBaseFragment[];
  kind: ProductKlassKind;
  onChangeKind: (kind: ProductKlassKind) => void;
  onSubmit: (data: ProductKlassForm) => SubmitPromise<any[]>;
  onFetchMoreTaxClasses: FetchMoreProps;
}

const formInitialData: ProductKlassForm = {
  isShippingRequired: false,
  metadata: [],
  name: '',
  kind: ProductKlassKind.Normal,
  privateMetadata: [],
  taxClassId: '',
  weight: 0,
};

const ProductKlassCreatePage: FC<ProductKlassCreatePageProps> = ({
  defaultWeightUnit,
  disabled,
  errors,
  pageTitle,
  saveButtonBarState,
  taxClasses,
  kind,
  onChangeKind,
  onSubmit,
  onFetchMoreTaxClasses,
}: ProductKlassCreatePageProps) => {
  const router = useRouter();

  const [taxClassDisplayName, setTaxClassDisplayName] = useStateFromProps('');
  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  const initialData = {
    ...formInitialData,
    kind: kind || formInitialData.kind,
  };

  return (
    <Form confirmLeave initial={initialData} onSubmit={onSubmit} disabled={disabled}>
      {({ change, data, isSaveDisabled, submit }) => {
        const changeMetadata = makeMetadataChangeHandler(change);

        const changeKind = makeProductKlassKindChangeHandler(change, onChangeKind);

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
                  onKindChange={changeKind}
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
                <Metadata data={data} onChange={changeMetadata} />
              </div>
              <div>
                <ProductKlassShipping
                  disabled={disabled}
                  data={data}
                  weightUnit={defaultWeightUnit}
                  onChange={change}
                />
              </div>
            </Grid>
            <SaveBar
              onCancel={() => router.push('/product-types')}
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
ProductKlassCreatePage.displayName = 'ProductKlassCreatePage';
export default ProductKlassCreatePage;
