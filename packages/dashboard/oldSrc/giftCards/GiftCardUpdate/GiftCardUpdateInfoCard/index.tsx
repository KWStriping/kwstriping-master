import { useTranslation } from '@core/i18n';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { FC } from 'react';

import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import GiftCardUpdateInfoCardContent from './GiftCardUpdateInfoCardContent';
import { updateGiftCardInfoCardMessages as messages } from './messages';
import CardTitle from '@dashboard/components/core/CardTitle';

const GiftCardUpdateInfoCard: FC = () => {
  const { t } = useTranslation();

  const { loading } = useGiftCardDetails();

  return (
    <Card>
      <CardTitle title={t('dashboard.title', messages.title.defaultMessage)} />
      <CardContent>{loading ? <Skeleton /> : <GiftCardUpdateInfoCardContent />}</CardContent>
    </Card>
  );
};

export default GiftCardUpdateInfoCard;
