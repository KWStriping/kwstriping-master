import { useTranslation } from '@core/i18n';
import { useQuery } from '@core/urql/hooks';
import { useEffect } from 'react';
import type { FC } from 'react';
import type {
  GiftCardBulkCreateFormErrors,
  GiftCardCreateCommonFormData,
} from '../GiftCardBulkCreateDialog/types';
import { getGiftCardErrorMessage } from '../GiftCardUpdate/messages';
import { createGiftCardMessages as messages } from './messages';
import TextWithSelectField from '@dashboard/components/fields/TextWithSelectField';
import { ChannelCurrenciesDocument } from '@core/api/graphql';
import type { ChangeEvent, FormChange } from '@dashboard/hooks/useForm';
import useLocalStorage from '@dashboard/hooks/useLocalStorage';
import { mapSingleValueNodeToChoice } from '@dashboard/oldSrc/utils/maps';

// import { useGiftCardCreateFormStyles as useStyles } from "./styles";

interface GiftCardCreateMoneyInputProps {
  change: FormChange;
  errors: GiftCardBulkCreateFormErrors;
  data: Pick<GiftCardCreateCommonFormData, 'balanceCurrency' | 'balanceAmount'>;
  set: (data: Partial<GiftCardCreateCommonFormData>) => void;
}

const GiftCardCreateMoneyInput: FC<GiftCardCreateMoneyInputProps> = ({
  errors,
  data: { balanceAmount, balanceCurrency },
  change,
  set,
}) => {
  const { t } = useTranslation();

  const [{ data: channelCurrenciesData }] = useQuery(ChannelCurrenciesDocument, {});

  const { channelCurrencies } = channelCurrenciesData?.shop;

  const [savedCurrency, setCurrency] = useLocalStorage('createGiftCardCurrency', undefined);

  const getInitialCurrency = () => {
    if (
      savedCurrency &&
      !!channelCurrencies.find((currency: string) => currency === savedCurrency)
    ) {
      return savedCurrency;
    }

    return channelCurrencies[0];
  };

  useEffect(() => {
    set({
      balanceCurrency: getInitialCurrency(),
    });
  }, []);

  const handleInputChange = (event: ChangeEvent<unknown>) => {
    if (event.target?.name === 'balanceCurrency') {
      setCurrency(event.target?.value);
    }

    change(event);
  };

  return (
    <TextWithSelectField
      isError={!!errors?.balance}
      helperText={getGiftCardErrorMessage(errors?.balance, t)}
      change={handleInputChange}
      choices={mapSingleValueNodeToChoice(channelCurrencies)}
      containerClassName={styles.fullWidthContainer}
      textFieldProps={{
        type: 'float',
        label: t('dashboard.mountLabel', messages.amountLabel.defaultMessage),
        name: 'balanceAmount',
        value: balanceAmount,
        minValue: 0,
      }}
      selectFieldProps={{
        name: 'balanceCurrency',
        value: balanceCurrency,
        className: styles.currencySelectField ?? '',
      }}
    />
  );
};

export default GiftCardCreateMoneyInput;
