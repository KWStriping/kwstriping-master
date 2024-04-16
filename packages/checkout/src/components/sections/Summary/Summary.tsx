import type {
  CheckoutLineFragment,
  GiftCardFragment,
  Money as MoneyType,
  OrderLineFragment,
} from '@core/api';
import { useTranslation } from '@core/i18n';
import type { GrossMoney, GrossMoneyWithTax } from '@core/types/misc';
import Money from '@core/ui/components/Money';
import { getFormattedMoney } from '@core/ui/utils/money';
import { Transition } from '@headlessui/react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { SummaryItemMoneySection } from '@core/checkout/components/sections/Summary/SummaryItemMoneySection';
import { summaryLabels, summaryMessages } from './messages';
import { PromoCodeAdd } from './PromoCodeAdd';
import type { SummaryLine } from './SummaryItem';
import { SummaryItem } from './SummaryItem';

import { SummaryItemMoneyEditableSection } from './SummaryItemMoneyEditableSection';
import { SummaryMoneyRow } from './SummaryMoneyRow';
import { SummaryPromoCodeRow } from './SummaryPromoCodeRow';

/* temporary solution */
const PAGE_MARGINS_HEIGHT = 320;
const LINE_HEIGHT = 104;
const LG_BREAKPOINT = 1024;

interface SummaryProps {
  editable?: boolean;
  lines?: SummaryLine[];
  totalPrice?: GrossMoneyWithTax;
  subtotalPrice?: GrossMoney;
  giftCards?: Maybe<GiftCardFragment[]>;
  voucherCode?: string | null;
  discount?: MoneyType | null;
  shippingPrice?: GrossMoney;
}

export const Summary: FC<SummaryProps> = ({
  editable = true,
  lines,
  totalPrice,
  subtotalPrice,
  giftCards = [],
  voucherCode,
  shippingPrice,
  discount,
}) => {
  const [isOpen, setOpen] = useState(true);
  const recapRef = useRef<HTMLDivElement | null>(null);
  const [maxSummaryHeight, setMaxSummaryHeight] = useState<number>(0);

  const { t } = useTranslation();

  useEffect(() => {
    if (typeof lines?.length === 'undefined') return;
    const handleWindowResize = () => {
      const isLg = window.innerWidth > LG_BREAKPOINT;

      if (isLg) {
        setOpen(true);
      }

      if (!recapRef.current) return;

      const recapHeight = recapRef.current.clientHeight;

      const maxHeight = isLg
        ? window.innerHeight - PAGE_MARGINS_HEIGHT - recapHeight
        : lines.length * LINE_HEIGHT;

      setMaxSummaryHeight(maxHeight);
    };

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [recapRef, lines?.length]);

  if (typeof lines?.length === 'undefined') return null;

  return (
    <div className="summary">
      <div className={clsx('summary-title', isOpen && 'open')}>
        <div className="flex flex-row items-center w-full" onClick={() => setOpen(!isOpen)}>
          <Typography className="bold mb-0">
            {t(summaryMessages.title.id, summaryMessages.title.defaultMessage)}
          </Typography>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        {!isOpen && (
          <Money
            className={'bold'}
            aria-label={t(summaryLabels.totalPrice.id, summaryLabels.totalPrice.defaultMessage)}
            money={totalPrice?.gross ?? null}
          />
        )}
      </div>
      <Transition
        show={isOpen}
        unmount={false}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <ul
          style={{ maxHeight: maxSummaryHeight ? `${maxSummaryHeight}px` : '' }}
          className={clsx(
            'summary-items',
            lines.length * LINE_HEIGHT > maxSummaryHeight ? 'border-b border-primary/[0.15]' : ''
          )}
        >
          {lines.map((line, index) => (
            <SummaryItem line={line} key={index}>
              {editable ? (
                <SummaryItemMoneyEditableSection line={line as CheckoutLineFragment} />
              ) : (
                <SummaryItemMoneySection line={line as OrderLineFragment} />
              )}
            </SummaryItem>
          ))}
        </ul>
        {editable && <PromoCodeAdd />}
        <div className="summary-recap" ref={recapRef}>
          <Divider className="mt-1 mb-4" />
          <SummaryMoneyRow
            label={t(
              summaryMessages.subtotalPrice.id,
              summaryMessages.subtotalPrice.defaultMessage
            )}
            money={subtotalPrice?.gross}
            ariaLabel={t(
              summaryLabels.subtotalPrice.id,
              summaryLabels.subtotalPrice.defaultMessage
            )}
          />
          {voucherCode && (
            <SummaryPromoCodeRow
              editable={editable}
              promoCode={voucherCode}
              ariaLabel={t(summaryLabels.voucher.id, summaryLabels.voucher.defaultMessage)}
              label={t(summaryMessages.voucher.id, summaryMessages.voucher.defaultMessage, {
                voucherCode,
              })}
              money={discount}
              negative
            />
          )}
          {giftCards.map(({ currentBalance, displayCode, id }) => (
            <SummaryPromoCodeRow
              editable={editable}
              promoCodeId={id}
              ariaLabel={t(summaryLabels.giftCard.id, summaryLabels.giftCard.defaultMessage)}
              label={t(summaryMessages.giftCard.id, summaryMessages.giftCard.defaultMessage, {
                giftCardCode: `•••• •••• ${displayCode}`,
              })}
              money={currentBalance}
              negative
            />
          ))}
          <SummaryMoneyRow
            label={t(
              summaryMessages.shippingCost.id,
              summaryMessages.shippingCost.defaultMessage
            )}
            ariaLabel={t(
              summaryLabels.shippingCost.id,
              summaryLabels.shippingCost.defaultMessage
            )}
            money={shippingPrice?.gross}
          />
          <Divider className="my-4" />
          <div className="summary-row pb-4 items-baseline">
            <div className="flex flex-row items-baseline">
              <Typography fontWeight="bold">
                {t(summaryMessages.totalPrice.id, summaryMessages.totalPrice.defaultMessage)}
              </Typography>
              <Typography color="secondary" className="ml-2">
                {t(summaryMessages.taxCost.id, summaryMessages.taxCost.defaultMessage, {
                  taxCost: getFormattedMoney(totalPrice?.tax),
                })}
              </Typography>
            </div>
            <Money
              aria-label={t(summaryLabels.totalPrice.id, summaryLabels.totalPrice.defaultMessage)}
              className="bold"
              money={totalPrice?.gross ?? null}
            />
          </div>
        </div>
      </Transition>
    </div>
  );
};
