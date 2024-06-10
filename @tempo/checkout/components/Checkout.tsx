import type { CheckoutFragment } from '@tempo/api/generated/graphql';
import Spinner from '@tempo/ui/components/Spinner';
import Typography from '@mui/material/Typography';
import { Turnstile } from '@tempo/ui/components/Turnstile';
import { useLocale } from '@tempo/ui/hooks/useLocale';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CheckoutSidebar } from '@tempo/checkout/components/sidebar/CheckoutSidebar';
import Link from '@tempo/ui/components/Link';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { CreateOrderDocument } from '@tempo/api/generated/graphql';
import { useRouter } from 'next/navigation';
import { usePaths } from '@tempo/ui/providers/PathsProvider';
import { useSelectedPaymentMethod } from '../hooks/state';
import { usePay } from '../hooks/usePay';
import styles from './Checkout.module.css';
import CompleteCheckoutButton from './CompleteCheckoutButton';
import { BillingAddressSection } from './sections/BillingAddressSection';
import { ContactInfoSection } from './sections/ContactInfoSection';
import { FulfillmentSection } from './sections/FulfillmentSection';
import { PaymentSection } from './sections/PaymentSection';
import { ShippingAddressSection } from './sections/ShippingAddressSection';

export interface CheckoutProps {
  checkout: Maybe<CheckoutFragment>;
  loading?: boolean;
}

function Checkout({ checkout, loading }: CheckoutProps) {
  const router = useRouter();
  const paths = usePaths();
  const { languageCode } = useLocale();
  const { enablePointsOfContact, displayPrices: initiallyDisplayPrices } = useShopSettings();
  const [displayPrices, setDisplayPrices] = useState(initiallyDisplayPrices);
  const { paymentMethod, paymentProvider } = useSelectedPaymentMethod();
  const [submitting, setSubmitting] = useState(false);

  const [processPayment, { loading: paying, error: payError }] = usePay();
  const [createOrderFromCheckout] = useMutation(CreateOrderDocument);

  useEffect(() => {
    if (checkout) {
      if (!checkout.validationErrors.length) setDisplayPrices(true);
    }
  }, [checkout]);

  useEffect(() => {
    if (payError) toast(payError.message, { type: 'error' });
  }, [payError]);

  const submit = useCallback(async () => {
    if (!checkout) return;
    if (checkout?.validationErrors.length) return;
    setSubmitting(true);
    if (!checkout || !paymentMethod || !paymentProvider) {
      console.error('Missing data', { checkout, paymentMethod, paymentProvider });
      return;
    }
    // TODO: backend should validate payment status before creating order
    const doPayment = false;
    if (doPayment) {
      const paymentResult = await processPayment({
        languageCode,
        provider: paymentProvider,
        method: paymentMethod,
        checkoutId: checkout.id,
        totalAmount: checkout.totalPrice?.gross?.amount,
      });
    }
    const result = await createOrderFromCheckout({
      id: checkout.id,
    });
    if (result.error) {
      toast(result.error.message, { type: 'error' });
    } else if (!result.data?.createOrderFromCheckout?.result) {
      toast('Error creating order', { type: 'error' });
    } else {
      router.push(paths.orderById(result.data.createOrderFromCheckout.result.id));
    }
    setSubmitting(false);
  }, [
    checkout,
    router,
    paths,
    createOrderFromCheckout,
    languageCode,
    processPayment,
    paymentMethod,
    paymentProvider,
  ]);

  const omitHumanContactData = enablePointsOfContact;
  if (!checkout || loading) return <Spinner />;
  // console.log('validating', validating, 'valid', valid, 'displayPrices', displayPrices);
  return (
    <div className={styles.root}>
      <Turnstile className={'justify-self-center'} />
      {!displayPrices && (
        <div className={'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4'}>
          <Typography component={'span'}>
            {`
            We guarantee fair, competitive prices for our services.
            To see our price for your desired service, please enter your
            job details and contact information. Alternatively, `}
          </Typography>
          <Link href={'/contact'} target="_blank">
            {'contact us'}
          </Link>
          <Typography component={'span'}>
            {' for a quote. Thank you for your understanding.'}
          </Typography>
        </div>
      )}
      <ContactInfoSection checkout={checkout} disabled={submitting} />
      {checkout.isShippingRequired && (
        <>
          <ShippingAddressSection
            checkout={checkout}
            omitHumanContactData={omitHumanContactData}
            disabled={submitting}
          />
          <FulfillmentSection checkout={checkout} disabled={submitting} />
        </>
      )}
      <BillingAddressSection checkout={checkout} disabled={submitting} />
      <PaymentSection checkout={checkout} disabled={submitting} />
      <div>
        <CheckoutSidebar checkout={checkout} />
        <div className={'my-4'}>
          <CompleteCheckoutButton
            onClick={submit}
            disabled={!checkout || !!checkout.validationErrors.length}
            isProcessing={submitting || paying}
          >
            {'Submit request'}
          </CompleteCheckoutButton>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
