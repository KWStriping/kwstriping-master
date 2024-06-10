import { Alert } from '@core/ui/components/Alert';
import Link from '@core/ui/components/Link';
import { orderGiftCardBoughtPath } from '@dashboard/oldSrc/orders/urls';
import Typography from '@mui/material/Typography';
import { Trans } from '@core/i18n';
import type { FC } from 'react';

import { giftCardListOrderCardMessages as messages } from './messages';

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
