import { Title } from '@core/checkout/components/Title';
import { useTranslation } from '@core/i18n';
import type { CommonSectionProps } from '@core/types/misc';
import Divider from '@mui/material/Divider';
import type { FC } from 'react';
import { BillingAddressSection } from '../~BillingAddressSection/BillingAddressSection';
import { paymentSectionMessages } from './messages';
import { PaymentMethods } from './PaymentMethods';

export const PaymentSection: FC<CommonSectionProps> = ({ collapsed, ...rest }) => {
  const { t } = useTranslation();

  if (collapsed) return null;

  return (
    <>
      <Divider />
      <div className="section">
        <Title>
          {t(
            paymentSectionMessages.paymentProviders.id,
            paymentSectionMessages.paymentProviders.defaultMessage
          )}
        </Title>
        <PaymentMethods {...rest} />
        <BillingAddressSection />
      </div>
    </>
  );
};
