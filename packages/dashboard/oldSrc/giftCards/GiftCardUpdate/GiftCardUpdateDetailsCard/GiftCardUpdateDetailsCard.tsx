import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import useGiftCardUpdateDialogs from '../providers/GiftCardUpdateDialogsProvider/hooks/useGiftCardUpdateDialogs';

import useGiftCardUpdateForm from '../providers/GiftCardUpdateFormProvider/hooks/useGiftCardUpdateForm';
import GiftCardUpdateDetailsBalanceSection from './GiftCardUpdateDetailsBalanceSection';
import { updateGiftCardDetailsCardMessages as messages } from './messages';
import GiftCardUpdateExpirySelect from '@dashboard/oldSrc/giftCards/GiftCardUpdate/GiftCardUpdateExpirySelect';
import GiftCardTagInput from '@dashboard/components/giftCards/GiftCardTagInput';
import CardTitle from '@dashboard/components/core/CardTitle';
import CardSpacer from '@dashboard/components/core/CardSpacer';

const GiftCardUpdateDetailsCard: FC = () => {
  const { t } = useTranslation();

  const { loading, giftCard } = useGiftCardDetails();
  const { openSetBalanceDialog } = useGiftCardUpdateDialogs();
  const {
    toggleValue,
    data: { tags },
    formErrors,
  } = useGiftCardUpdateForm();

  return (
    <Card>
      <CardTitle
        title={t('dashboard.title', messages.title.defaultMessage)}
        toolbar={
          !loading &&
          !giftCard?.isExpired && (
            <Button data-test-id="set-balance-button" onClick={openSetBalanceDialog}>
              {t('dashboard.etBalanceButtonLabel', messages.setBalanceButtonLabel.defaultMessage)}
            </Button>
          )
        }
      />
      <CardContent>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <GiftCardUpdateDetailsBalanceSection />
            <CardSpacer />
            <Divider />
            <CardSpacer />
            <Typography color="textSecondary">
              {t('dashboard.agInputLabel', messages.tagInputLabel.defaultMessage)}
            </Typography>
            <GiftCardTagInput
              error={formErrors?.tags}
              name="tags"
              values={tags}
              toggleChange={toggleValue}
            />
            <CardSpacer />
            <GiftCardUpdateExpirySelect />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GiftCardUpdateDetailsCard;
