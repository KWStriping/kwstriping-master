import * as m from '@paraglide/messages';
import { Title } from '@tempo/checkout/components/Title';
import type { CommonSectionProps } from '@tempo/types/misc';
import Divider from '@mui/material/Divider';
import type { FC } from 'react';
import { BillingAddressSection } from '../~BillingAddressSection/BillingAddressSection';
import { paymentSectionMessages } from './messages';
import { PaymentMethods } from './PaymentMethods';

export const PaymentSection: FC<CommonSectionProps> = ({ collapsed, ...rest }) => {
  if (collapsed) return null;

  return (
    <>
      <Divider />
      <div className="section">
        <Title>
          {m[paymentSectionMessages.paymentProviders.id] ??
            paymentSectionMessages.paymentProviders.defaultMessage}
        </Title>
        <PaymentMethods {...rest} />
        <BillingAddressSection />
      </div>
    </>
  );
};
