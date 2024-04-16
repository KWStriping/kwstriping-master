import { useTranslation } from '@core/i18n';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@core/ui/theme/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Popper from '@mui/material/Popper';
import type { PopperPlacementType } from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FC, ChangeEvent, MutableRefObject } from 'react';

import ModalTitle from './ModalTitle';
import type { OrderDiscountCommonInput, OrderDiscountType } from './types';
import { ORDER_LINE_DISCOUNT } from './types';
import { useUpdateEffect } from '@dashboard/hooks/useUpdateEffect';
import type { MoneyFragment } from '@core/api/graphql';
import { DiscountValueType } from '@core/api/constants';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import PriceField from '@dashboard/components/fields/PriceField';
import DialogButtons from '@dashboard/components/dialogs/ActionDialog/DialogButtons';
import CardSpacer from '@dashboard/components/core/CardSpacer';

const fullNumbersRegex = /^\d*$/;
const numbersRegex = /(\d+(?:\.\d*)?)$/;
const PERMIL = 0.01;

const useStyles = makeStyles(
  (theme) => ({
    container: {
      zIndex: 1000,
      marginTop: theme.spacing(1),
    },
    removeButton: {
      '&:hover': {
        backgroundColor: theme.vars.palette.error.main,
      },
      backgroundColor: theme.vars.palette.error.main,
      color: theme.vars.palette.error.contrastText,
    },
    radioContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    reasonInput: {
      marginTop: theme.spacing(1),
      width: '100%',
    },
    buttonWrapper: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    },
  }),
  { name: 'OrderLineDiscountModal' }
);

const messages = {
  buttonLabel: {
    id: 'QSnh4Y',
    defaultMessage: 'Add',
    description: 'add button label',
  },
  itemDiscountTitle: {
    id: 'WTj17Z',
    defaultMessage: 'Discount Item',
    description: 'dialog title item discount',
  },
  orderDiscountTitle: {
    id: 'YFDAaX',
    defaultMessage: 'Discount this Order by:',
    description: 'dialog title order discount',
  },
  percentageOption: {
    id: 'WUf3Iu',
    defaultMessage: 'Percentage',
    description: 'percentage option',
  },
  fixedAmountOption: {
    id: 'fo7nfa',
    defaultMessage: 'Fixed Amount',
    description: 'fixed amount',
  },
  invalidValue: {
    id: 'IN5iJz',
    defaultMessage: 'Invalid value',
    description: 'value input helper text',
  },
  discountValueLabel: {
    id: 'GAmGog',
    defaultMessage: 'Discount value',
    description: 'value input label',
  },
  discountReasonLabel: {
    id: 'nvSJNR',
    defaultMessage: 'Reason',
    description: 'discount reason input lavel',
  },
};

export interface OrderDiscountCommonModalProps {
  maxPrice: Maybe<MoneyFragment>;
  onConfirm: (discount: OrderDiscountCommonInput) => void;
  onClose: () => void;
  onRemove: () => void;
  modalType: OrderDiscountType;
  anchorRef: MutableRefObject<unknown>;
  existingDiscount: OrderDiscountCommonInput;
  dialogPlacement: PopperPlacementType;
  isOpen: boolean;
  confirmStatus: ConfirmButtonTransitionState;
  removeStatus: ConfirmButtonTransitionState;
}

const OrderDiscountCommonModal: FC<OrderDiscountCommonModalProps> = ({
  maxPrice = { amount: null, currency: '' },
  onConfirm,
  modalType,
  anchorRef,
  onClose,
  onRemove,
  existingDiscount,
  dialogPlacement,
  isOpen,
  confirmStatus,
  removeStatus,
}) => {
  const { currency, amount: maxAmount } = maxPrice;
  // const styles = useStyles();
  const styles = {};

  const getInitialDiscountValue = (calculationMode: DiscountValueType) => {
    if (!existingDiscount?.value) {
      return '';
    }

    const stringifiedValue = existingDiscount.value.toString();

    if (calculationMode === DiscountValueType.Fixed) {
      return parseFloat(stringifiedValue).toFixed(2);
    }

    return stringifiedValue;
  };

  const getInitialData = () => {
    const calculationMode = existingDiscount?.calculationMode || DiscountValueType.Percentage;

    return {
      calculationMode,
      reason: existingDiscount?.reason || '',
      value: getInitialDiscountValue(calculationMode),
    };
  };

  const initialData = getInitialData();

  const [isValueError, setValueError] = useState<boolean>(false);
  const [reason, setReason] = useState<string>(initialData.reason);
  const [value, setValue] = useState<string>(initialData.value);
  const [calculationMode, setCalculationMode] = useState<DiscountValueType>(
    initialData.calculationMode
  );
  const previousCalculationMode = useRef(calculationMode);

  const { t } = useTranslation();

  const discountTypeChoices = [
    {
      label: t('dashboard.ercentageOption', 'Percentage'),
      value: DiscountValueType.Percentage,
    },
    {
      label: t('dashboard.ixedAmountOption', 'Fixed Amount'),
      value: DiscountValueType.Fixed,
    },
  ];

  const isDiscountTypePercentage = calculationMode === DiscountValueType.Percentage;

  const handleSetDiscountValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    handleSetError(value);
    setValue(value);
  };

  const getParsedDiscountValue = () => parseFloat(value) || 0;

  const isAmountTooLarge = () => {
    const topAmount = isDiscountTypePercentage ? 100 : maxAmount;

    return getParsedDiscountValue() > topAmount;
  };

  const handleSetError = (value: string) => {
    const regexToCheck = isDiscountTypePercentage ? fullNumbersRegex : numbersRegex;

    setValueError(!regexToCheck.test(value));
  };

  const handleConfirm = () => {
    onConfirm({
      calculationMode,
      reason,
      value: getParsedDiscountValue(),
    });
  };

  const setDefaultValues = () => {
    setReason(initialData.reason);
    setValue(initialData.value);
    setCalculationMode(initialData.calculationMode);
    setValueError(false);
  };

  useEffect(setDefaultValues, [existingDiscount?.value, existingDiscount?.reason]);

  const handleValueConversion = () => {
    if (getParsedDiscountValue() === 0) return;

    const changedFromPercentageToFixed =
      previousCalculationMode.current === DiscountValueType.Percentage &&
      calculationMode === DiscountValueType.Fixed;

    const recalculatedValueFromPercentageToFixed = (
      getParsedDiscountValue() *
      PERMIL *
      maxPrice.amount
    ).toFixed(2);

    const recalculatedValueFromFixedToPercentage = Math.round(
      (getParsedDiscountValue() * (1 / PERMIL)) / maxPrice.amount
    ).toString();

    const recalculatedValue = changedFromPercentageToFixed
      ? recalculatedValueFromPercentageToFixed
      : recalculatedValueFromFixedToPercentage;

    handleSetError(recalculatedValue);
    setValue(recalculatedValue);
  };

  useUpdateEffect(handleValueConversion, [calculationMode]);

  const dialogTitle =
    modalType === ORDER_LINE_DISCOUNT ? messages.itemDiscountTitle : messages.orderDiscountTitle;

  const valueFieldSymbol = calculationMode === DiscountValueType.Fixed ? currency : '%';

  const isSubmitDisabled = !getParsedDiscountValue() || isValueError || isAmountTooLarge();

  return (
    <Popper
      open={isOpen}
      anchorEl={anchorRef.current}
      className={styles.container ?? ''}
      placement={dialogPlacement}
    >
      <Card>
        <ModalTitle title={t(dialogTitle)} onClose={onClose} />
        <CardContent>
          <RadioGroupField
            innerContainerClassName={styles.radioContainer}
            choices={discountTypeChoices}
            name="discountType"
            variant="inlineJustify"
            value={calculationMode}
            onChange={(event) => setCalculationMode(event.target.value)}
          />
          <CardSpacer />
          <PriceField
            label={t('dashboard.discountValueLabel', 'Discount value')}
            error={isValueError}
            hint={isValueError && t('dashboard.invalidValue', 'Invalid value')}
            value={value}
            onChange={handleSetDiscountValue}
            currencySymbol={valueFieldSymbol}
          />
          <CardSpacer />
          <Typography>{t('dashboard.discountReasonLabel', 'Reason')}</Typography>
          <TextField
            className={styles.reasonInput ?? ''}
            label={t('dashboard.discountReasonLabel', 'Reason')}
            value={reason}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setReason(event.target.value)}
          />
        </CardContent>
        <DialogButtons
          onConfirm={handleConfirm}
          onClose={onClose}
          disabled={isSubmitDisabled}
          showBackButton={false}
          confirmButtonState={confirmStatus}
        >
          {existingDiscount && (
            <div className={styles.buttonWrapper ?? ''}>
              <ConfirmButton
                data-test-id="button-remove"
                onClick={onRemove}
                className={styles.removeButton ?? ''}
                transitionState={removeStatus}
              >
                {t('dashboard.remove', 'Remove')}
              </ConfirmButton>
            </div>
          )}
        </DialogButtons>
      </Card>
    </Popper>
  );
};

export default OrderDiscountCommonModal;
