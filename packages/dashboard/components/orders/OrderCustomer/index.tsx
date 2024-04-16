import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { EditIconButton } from '@core/ui/components/buttons/EditIconButton';
import Link from '@core/ui/components/Link';
import AddressFormatter from '@dashboard/components/core/AddressFormatter';
import CardTitle from '@dashboard/components/core/CardTitle';
import RequirePermissions from '@dashboard/components/core/RequirePermissions';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import Form from '@dashboard/components/forms/Form';
import { OrderErrorCode, PermissionCode } from '@core/api/constants';
import type {
  OrderDetailsFragment,
  OrderErrorFragment,
  SearchCustomersQuery,
} from '@core/api/graphql';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import { customerUrl } from '@dashboard/oldSrc/customers/urls';

import type { FetchMoreProps, RelayToFlat } from '@dashboard/oldSrc/types';
import createSingleAutocompleteSelectHandler from '@dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import { AddressTextError } from './AddressTextError';
import { PickupAnnotation } from './PickupAnnotation';
import { useStyles } from './styles';

export interface CustomerEditData {
  user?: string;
  userEmail?: string;
  prevUser?: string;
  prevUserEmail?: string;
}

export interface OrderCustomerProps extends Partial<FetchMoreProps> {
  order: Maybe<OrderDetailsFragment>;
  users?: RelayToFlat<NonNullable<SearchCustomersQuery['search']>>;
  loading?: boolean;
  errors: OrderErrorFragment[];
  canEditAddresses: boolean;
  canEditCustomer: boolean;
  fetchUsers?: (query: string) => void;
  onCustomerEdit?: (data: CustomerEditData) => void;
  onProfileView: () => void;
  onBillingAddressEdit?: () => void;
  onShippingAddressEdit?: () => void;
}

const OrderCustomer: FC<OrderCustomerProps> = ({
  canEditAddresses,
  canEditCustomer,
  fetchUsers,
  hasMore: hasMoreUsers,
  loading,
  errors = [],
  order,
  users,
  onCustomerEdit,
  onBillingAddressEdit,
  onFetchMore: onFetchMoreUsers,
  onProfileView,
  onShippingAddressEdit,
}) => {
  const styles = useStyles({});

  const { t } = useTranslation();

  const user = order?.user;
  const userEmail = order?.userEmail;

  const [userDisplayName, setUserDisplayName] = useStateFromProps(user?.email ?? '');
  const [isInEditMode, setEditModeStatus] = useState(false);
  const toggleEditMode = () => setEditModeStatus(!isInEditMode);

  const billingAddress = order?.billingAddress;
  const shippingAddress = order?.shippingAddress;

  const noBillingAddressError = errors.find(
    (error) => error.code === OrderErrorCode.BillingAddressNotSet
  );
  const noShippingAddressError = errors.find(
    (error) => error.code === OrderErrorCode.OrderNoShippingAddress
  );

  return (
    <Card>
      <CardTitle
        title={t('dashboard.customer', 'Customer')}
        toolbar={
          !!canEditCustomer && (
            <RequirePermissions requiredPermissions={[PermissionCode.ManageOrders]}>
              <Button
                data-test-id="edit-customer"
                color="secondary"
                disabled={!onCustomerEdit}
                onClick={toggleEditMode}
              >
                {t('dashboard.edit', 'Edit')}
              </Button>
            </RequirePermissions>
          )
        }
      />
      <CardContent>
        {user === undefined ? (
          <Skeleton />
        ) : isInEditMode && canEditCustomer ? (
          <Form confirmLeave initial={{ query: '' }}>
            {({ change, data }) => {
              const handleChange = (event: ChangeEvent<unknown>) => {
                change(event);
                const value = event.target.value;

                onCustomerEdit({
                  prevUser: user?.id,
                  prevUserEmail: userEmail,
                  [value.includes('@') ? 'userEmail' : 'user']: value,
                });
                toggleEditMode();
              };
              const userChoices = (users ?? []).map((user) => ({
                label: user.email,
                value: user.id,
              }));
              const handleUserChange = createSingleAutocompleteSelectHandler(
                handleChange,
                setUserDisplayName,
                userChoices
              );
              return (
                <SingleAutocompleteSelectField
                  data-test-id="select-customer"
                  allowCustomValues={true}
                  choices={userChoices}
                  displayValue={userDisplayName}
                  fetchChoices={fetchUsers}
                  hasMore={hasMoreUsers}
                  loading={loading}
                  placeholder={t('dashboard.kSkNx', 'Search Customers')}
                  onChange={handleUserChange}
                  onFetchMore={onFetchMoreUsers}
                  name="query"
                  value={data?.query}
                />
              );
            }}
          </Form>
        ) : user === null ? (
          userEmail === null ? (
            <Typography>{t('dashboard.anonymousUser', 'Anonymous user')}</Typography>
          ) : (
            <Typography className={styles.userEmail ?? ''}>{userEmail}</Typography>
          )
        ) : (
          <>
            <Typography className={styles.userEmail ?? ''} data-test-id="customer-email">
              {user.email}
            </Typography>
            <RequirePermissions requiredPermissions={[PermissionCode.ManageUsers]}>
              <div>
                <Link underline={false} href={customerUrl(user.id)} onClick={onProfileView}>
                  {t('dashboard.viewProfile', 'View Profile')}
                </Link>
              </div>
            </RequirePermissions>
            {/* TODO: Uncomment it after adding ability to filter
                    orders by customer */}
            {/* <div>
                <Link underline={false} href={}>
                  id="J4NBVR"
                  <Trans defaultMessage="View Orders"
                    description="link"
                     />
                </Link>
              </div> */}
          </>
        )}
      </CardContent>
      {!!user && (
        <>
          <Divider />
          <CardContent>
            <div className={styles.sectionHeader ?? ''}>
              <Typography className={styles.sectionHeaderTitle ?? ''}>
                {t('dashboard.contactInformation', 'Contact Information')}
              </Typography>
            </div>

            {order?.userEmail === undefined ? (
              <Skeleton />
            ) : order?.userEmail === null ? (
              <Typography>
                <>
                  {/* customer is not set in draft order */}

                  {t('dashboard.X2zWy', 'Not set')}
                </>
              </Typography>
            ) : (
              <a href={`mailto:${order?.userEmail}`} className={'text-primary'}>
                {order?.userEmail}
              </a>
            )}
          </CardContent>
        </>
      )}
      <Divider />
      <CardContent>
        <div className={styles.sectionHeader ?? ''}>
          <Typography className={styles.sectionHeaderTitle ?? ''}>
            {t('dashboard.shippingAddress', 'Shipping Address')}
          </Typography>
          {canEditAddresses && (
            <div className={styles.sectionHeaderToolbar ?? ''}>
              <EditIconButton
                data-test-id="edit-shipping-address"
                onClick={onShippingAddressEdit}
                disabled={!onShippingAddressEdit && user === undefined}
              />
            </div>
          )}
        </div>
        {shippingAddress === undefined ? (
          <Skeleton />
        ) : (
          <>
            {noShippingAddressError && <AddressTextError orderError={noShippingAddressError} />}
            {shippingAddress === null ? (
              <Typography>{t('dashboard.notSet', 'Not set')}</Typography>
            ) : (
              <>
                <AddressFormatter address={shippingAddress} />
                <PickupAnnotation order={order} />
              </>
            )}
          </>
        )}
      </CardContent>
      <Divider />
      <CardContent>
        <div className={styles.sectionHeader ?? ''}>
          <Typography className={styles.sectionHeaderTitle ?? ''}>
            {t('dashboard.billingAddress', 'Billing address')}
          </Typography>
          {canEditAddresses && (
            <div className={styles.sectionHeaderToolbar ?? ''}>
              <EditIconButton
                data-test-id="edit-billing-address"
                onClick={onBillingAddressEdit}
                disabled={!onBillingAddressEdit && user === undefined}
              />
            </div>
          )}
        </div>
        {billingAddress === undefined ? (
          <Skeleton />
        ) : (
          <>
            {noBillingAddressError && <AddressTextError orderError={noBillingAddressError} />}
            {billingAddress === null ? (
              <Typography>{t('dashboard.notSet', 'Not set')}</Typography>
            ) : shippingAddress.id === billingAddress.id ? (
              <Typography>
                <>
                  {/* billing address */}

                  {t('dashboard.LX9II', 'Same as shipping address')}
                </>
              </Typography>
            ) : (
              <AddressFormatter address={billingAddress} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

OrderCustomer.displayName = 'OrderCustomer';
export default OrderCustomer;
