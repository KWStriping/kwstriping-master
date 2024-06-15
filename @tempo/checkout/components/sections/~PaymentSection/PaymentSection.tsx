import * as m from '@paraglide/messages';
import PageHeader from '@tempo/ui/components/PageHeader';
import Divider from '@mui/material/Divider';
import type { FC } from 'react';
import { BillingAddressSection } from '../~BillingAddressSection/BillingAddressSection';
import { paymentSectionMessages } from './messages';
import { PaymentMethods } from './PaymentMethods';

export const PaymentSection: FC = () => {
  return (
    <>
      <Divider />
      <div className="section">
        <PageHeader>
          {m[paymentSectionMessages.paymentProviders.id] ??
            paymentSectionMessages.paymentProviders.defaultMessage}
        </PageHeader>
        <PaymentMethods />
        <BillingAddressSection />
      </div>
    </>
  );
};
