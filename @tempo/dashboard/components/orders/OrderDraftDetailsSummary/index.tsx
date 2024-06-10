import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';
import type { FC } from 'react';
import OrderDiscountCommonModal from '../OrderDiscountCommonModal';
import { ORDER_DISCOUNT } from '../OrderDiscountCommonModal/types';
import { messages } from './messages';
import Money from '@tempo/dashboard/components/core/Money';
import type { OrderDiscountContextConsumerProps } from '@tempo/dashboard/components/products/OrderDiscountProviders/OrderDiscountProvider';
import type { OrderDiscountData } from '@tempo/dashboard/components/products/OrderDiscountProviders/types';
import { DiscountValueType } from '@tempo/api/generated/constants';
import type { OrderDetailsFragment, OrderErrorFragment } from '@tempo/api/generated/graphql';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      ...theme.typography.body1,
      lineHeight: 1.9,
      width: '100%',
    },
    textRight: {
      textAlign: 'right',
    },
    textError: {
      color: theme.vars.palette.error.main,
      marginLeft: theme.spacing(1.5),
      display: 'inline',
    },
    subtitle: {
      color: theme.vars.palette.grey[500],
      paddingRight: theme.spacing(1),
    },
    relativeRow: {
      position: 'relative',
    },
    percentDiscountLabelContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-end',
    },
    shippingMethodContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
    },
  }),
  { name: 'OrderDraftDetailsSummary' }
);

const PRICE_PLACEHOLDER = '---';

interface OrderDraftDetailsSummaryProps extends OrderDiscountContextConsumerProps {
  disabled?: boolean;
  order: Maybe<OrderDetailsFragment>;
  errors: OrderErrorFragment[];
  onShippingMethodEdit: () => void;
}

const OrderDraftDetailsSummary: FC<OrderDraftDetailsSummaryProps> = (props) => {
  const {
    order,
    errors,
    onShippingMethodEdit,
    orderDiscount,
    addOrderDiscount,
    removeOrderDiscount,
    openDialog,
    closeDialog,
    isDialogOpen,
    addDiscountToOrderStatus,
    orderDiscountRemoveStatus,
    undiscountedPrice,
  } = props;

  const styles = useStyles(props);

  const popperAnchorRef = useRef<HTMLTableRowElement | null>(null);

  if (!order) return null;

  const {
    subtotal,
    total,
    shippingMethod,
    shippingMethodName,
    shippingMethods,
    shippingPrice,
    shippingAddress,
    isShippingRequired,
  } = order;

  const formErrors = getFormErrors(['shipping'], errors);

  const hasChosenShippingMethod = shippingMethod !== null && shippingMethodName !== null;

  const hasShippingMethods = !!shippingMethods?.length || isShippingRequired;

  const discountTitle = orderDiscount ? messages.discount : messages.addDiscount;

  const getOrderDiscountLabel = (orderDiscountData: OrderDiscountData) => {
    if (!orderDiscountData) {
      return PRICE_PLACEHOLDER;
    }

    const { value: discountValue, calculationMode, amount: discountAmount } = orderDiscountData;
    const currency = total.gross.currency;

    if (calculationMode === DiscountValueType.Percentage) {
      return (
        <div className={styles.percentDiscountLabelContainer ?? ''}>
          <Typography className={styles.subtitle ?? ''}>{`(${discountValue}%)`}</Typography>
          <Money money={discountAmount} />
        </div>
      );
    }

    return <Money money={{ amount: discountValue, currency }} />;
  };

  const getShippingMethodComponent = () => {
    if (hasChosenShippingMethod) {
      return <Link onClick={onShippingMethodEdit}>{`${shippingMethodName}`}</Link>;
    }

    const shippingCarrierBase = m.dashboard_addShippingCarrier() ?? 'Add shipping carrier';

    if (shippingAddress) {
      return (
        <Link onClick={onShippingMethodEdit} data-test-id="add-shipping-carrier">
          {shippingCarrierBase}
        </Link>
      );
    }

    const addShippingAddressInfo = t(
      'dashboard_addShippingAddressInfo',
      'add shipping address first'
    );

    return (
      <div className={styles.shippingMethodContainer ?? ''}>
        <Link underline disabled onClick={onShippingMethodEdit}>
          {shippingCarrierBase}
        </Link>

        <Typography variant="caption">{`(${addShippingAddressInfo})`}</Typography>
      </div>
    );
  };

  return (
    <table className={styles.root ?? ''}>
      <tbody>
        <tr className={styles.relativeRow ?? ''} ref={popperAnchorRef}>
          <td>
            <Link onClick={openDialog}>{m[discountTitle]}</Link>
            <OrderDiscountCommonModal
              dialogPlacement="bottom-start"
              modalType={ORDER_DISCOUNT}
              anchorRef={popperAnchorRef}
              existingDiscount={orderDiscount}
              maxPrice={undiscountedPrice}
              isOpen={isDialogOpen}
              onConfirm={addOrderDiscount}
              onClose={closeDialog}
              onRemove={removeOrderDiscount}
              confirmStatus={addDiscountToOrderStatus}
              removeStatus={orderDiscountRemoveStatus}
            />
          </td>
          <td className={styles.textRight ?? ''}>{getOrderDiscountLabel(orderDiscount)}</td>
        </tr>
        <tr>
          <td>{m.dashboard_subtotal() ?? 'Subtotal'}</td>
          <td className={styles.textRight ?? ''}>
            <Money money={subtotal.gross} />
          </td>
        </tr>
        <tr>
          <td>
            {hasShippingMethods && getShippingMethodComponent()}

            {!hasShippingMethods &&
              (m.dashboard_oShippingCarriers() ?? 'No applicable shipping carriers')}

            {formErrors.shipping && (
              <Typography variant="body2" className={styles.textError ?? ''}>
                {getOrderErrorMessage(formErrors.shipping, t)}
              </Typography>
            )}
          </td>

          <td className={styles.textRight ?? ''}>
            {hasChosenShippingMethod ? <Money money={shippingPrice.gross} /> : PRICE_PLACEHOLDER}
          </td>
        </tr>
        <tr>
          <td>{m.dashboard_taxes() ?? 'Taxes (VAT included)'}</td>
          <td className={styles.textRight ?? ''}>
            <Money money={order.total.tax} />
          </td>
        </tr>
        <tr>
          <td>{m.dashboard_total() ?? 'Subtotal'}</td>
          <td className={styles.textRight ?? ''}>
            <Money money={total.gross} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDraftDetailsSummary;
