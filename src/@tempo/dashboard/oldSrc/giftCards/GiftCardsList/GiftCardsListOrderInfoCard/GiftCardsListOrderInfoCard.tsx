import { Alert } from '@tempo/ui/components/Alert';
import Link from '@tempo/ui/components/Link';
import Typography from '@mui/material/Typography';
import { Trans } from '@tempo/next/i18n';
import type { FC } from 'react';

import { giftCardListOrderCardMessages as messages } from './messages';
import { orderGiftCardBoughtPath } from '@tempo/dashboard/oldSrc/orders/urls';

const GiftCardsListOrderInfoCard: FC = () => (
  <Alert variant="info" close={false}>
    <Typography>
      <Trans
        {...messages.giftCardOrderInfoMessage}
        values={{
          link: (content) => <Link href={orderGiftCardBoughtPath()}>{content}</Link>,
        }}
      />
    </Typography>
  </Alert>
);

export default GiftCardsListOrderInfoCard;
