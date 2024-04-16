import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { getUserName } from '@core/utils/user';
import { CardSpacer } from '@dashboard/components/core/CardSpacer';
import Metadata from '@dashboard/components/core/Metadata';
import type { MetadataFormData } from '@dashboard/components/core/Metadata/types';
import PageHeader from '@dashboard/components/core/PageHeader';
import RequirePermissions from '@dashboard/components/core/RequirePermissions';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import CustomerGiftCardsCard from '@dashboard/components/giftCards/GiftCardCustomerCard/CustomerGiftCardsCard';
import { PermissionCode } from '@core/api/constants';
import type { AccountErrorFragment, CustomerDetailsQuery } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { customerAddressesUrl } from '@dashboard/oldSrc/customers/urls';
import { orderListUrl } from '@dashboard/oldSrc/orders/urls';
import { mapMetadataItemToInput } from '@dashboard/oldSrc/utils/maps';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import CustomerAddresses from './CustomerAddresses';
import CustomerDetails from './CustomerDetails';
import CustomerInfo from './CustomerInfo';
import CustomerOrders from './CustomerOrders';
import CustomerStats from './CustomerStats';

export interface CustomerDetailsPageFormData extends MetadataFormData {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  note: string;
}

export interface CustomerDetailsPageProps {
  customerId: string;
  customer: CustomerDetailsQuery['user'];
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onSubmit: (data: CustomerDetailsPageFormData) => SubmitPromise<AccountErrorFragment[]>;
  onDelete: () => void;
}

const CustomerDetailsPage: FC<CustomerDetailsPageProps> = ({
  customerId,
  customer,
  disabled,
  errors,
  saveButtonBar,
  onSubmit,
  onDelete,
}: CustomerDetailsPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const initialForm: CustomerDetailsPageFormData = {
    email: customer?.email || '',
    firstName: customer?.firstName || '',
    isActive: customer?.isActive || false,
    lastName: customer?.lastName || '',
    metadata: customer?.metadata?.map(mapMetadataItemToInput),
    note: customer?.note || '',
    privateMetadata: customer?.privateMetadata?.map(mapMetadataItemToInput),
  };

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  return (
    <Form confirmLeave initial={initialForm} onSubmit={onSubmit} disabled={disabled}>
      {({ change, data, isSaveDisabled, submit }) => {
        const changeMetadata = makeMetadataChangeHandler(change);

        return (
          <Container>
            <Backlink href={'/customers'}>{t('dashboard.customers', 'Customers')}</Backlink>
            <PageHeader title={getUserName(customer, true)} />
            <Grid>
              <div>
                <CustomerDetails
                  customer={customer}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <CustomerInfo data={data} disabled={disabled} errors={errors} onChange={change} />
                <CardSpacer />
                <RequirePermissions requiredPermissions={[PermissionCode.ManageOrders]}>
                  <CustomerOrders
                    orders={mapEdgesToItems(customer?.orders)}
                    viewAllHref={orderListUrl({
                      customer: customer?.email,
                    })}
                  />
                  <CardSpacer />
                </RequirePermissions>
                <Metadata data={data} onChange={changeMetadata} />
              </div>
              <div>
                <CustomerAddresses
                  customer={customer}
                  disabled={disabled}
                  manageAddressHref={customerAddressesUrl(customerId)}
                />
                <CardSpacer />
                <CustomerStats customer={customer} />
                <CardSpacer />
                <RequirePermissions requiredPermissions={[PermissionCode.ManageGiftCard]}>
                  <CustomerGiftCardsCard />
                </RequirePermissions>
              </div>
            </Grid>
            <SaveBar
              disabled={isSaveDisabled}
              state={saveButtonBar}
              onSubmit={submit}
              onCancel={() => router.push('/customers')}
              onDelete={onDelete}
            />
          </Container>
        );
      }}
    </Form>
  );
};
CustomerDetailsPage.displayName = 'CustomerDetailsPage';
export default CustomerDetailsPage;
