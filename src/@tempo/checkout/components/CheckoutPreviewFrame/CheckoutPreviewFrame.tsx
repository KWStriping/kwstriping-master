import clsx from 'clsx';
import type { FC, CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './CheckoutPreviewFrame.module.css';
import type { CustomizationSettingsValues } from '@tempo/checkout/types/api';

interface CheckoutPreviewFrameProps {
  settings: CustomizationSettingsValues;
  className?: string;
  style?: CSSProperties;
  checkoutUrl: string;
}

const CheckoutPreviewFrame: FC<CheckoutPreviewFrameProps> = ({
  settings,
  className,
  checkoutUrl,
  style,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [appMounted, setAppMounted] = useState(false);

  const parsedCheckoutUrl = new URL(checkoutUrl);
  const checkoutOrigin = parsedCheckoutUrl.origin;

  const sendMessage = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(settings, checkoutOrigin);
    }
  };

  const mountListener = (event: MessageEvent<'mounted' | undefined>) => {
    if (event.origin === checkoutOrigin && event.data === 'mounted') {
      setAppMounted(true);
    }
  };

  useEffect(() => {
    if (!appMounted) {
      window.addEventListener('message', mountListener);
    }

    sendMessage();

    return () => {
      window.removeEventListener('message', mountListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, checkoutUrl, iframeRef.current]);

  useEffect(() => {
    if (appMounted) {
      sendMessage();
      window.removeEventListener('message', mountListener);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appMounted]);

  return (
    <iframe
      ref={iframeRef}
      src={parsedCheckoutUrl.toString()}
      className={clsx(styles.iframe, className)}
      style={style}
    />
  );
};
export default CheckoutPreviewFrame;
