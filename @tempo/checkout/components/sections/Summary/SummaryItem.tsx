import * as m from '@paraglide/messages';
import type { CheckoutLineFragment, OrderLineFragment } from '@tempo/api/generated/graphql';
// import { useTranslation } from '@tempo/next/i18n';
import PhotoIcon from '@mui/icons-material/Photo';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import type { ReactNode, FC } from 'react';
import { summaryLabels } from './messages';
import { getSummaryLineAttributesText, getSummaryLineProps } from './utils';

export type SummaryLine = CheckoutLineFragment | OrderLineFragment;

interface LineItemProps {
  line: SummaryLine;
  children: ReactNode;
}

export const SummaryItem: FC<LineItemProps> = ({ line, children }) => {
  const { productName, productImage } = getSummaryLineProps(line);

  const attributesText = getSummaryLineAttributesText(line);

  return (
    <li className="summary-item">
      <div className="relative flex flex-row">
        <div className="summary-item-image-container mr-4 z-1">
          {productImage ? (
            <Image
              src={productImage.url}
              alt={productImage.alt ?? ''}
              className="object-contain"
              fill
            />
          ) : (
            <PhotoIcon />
          )}
        </div>
      </div>
      <div className="summary-row w-full items-start">
        <div className="flex flex-col">
          <Typography
            fontWeight="bold"
            aria-label={
              m[summaryLabels.summaryItemName.id] ?? summaryLabels.summaryItemName.defaultMessage
            }
            className="mb-3"
          >
            {productName}
          </Typography>
          <Typography
            fontSize="xs"
            aria-label={
              m[summaryLabels.productName.id] ?? summaryLabels.productName.defaultMessage
            }
            className="max-w-38"
          >
            {attributesText}
          </Typography>
        </div>
        {children}
      </div>
    </li>
  );
};
