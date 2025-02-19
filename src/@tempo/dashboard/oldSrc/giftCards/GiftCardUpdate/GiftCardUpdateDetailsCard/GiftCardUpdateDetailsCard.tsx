import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
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
import GiftCardUpdateExpirySelect from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/GiftCardUpdateExpirySelect';
import GiftCardTagInput from '@tempo/dashboard/components/giftCards/GiftCardTagInput';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

const GiftCardUpdateDetailsCard: FC = () => {
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
        title={m.dashboard_title() ?? messages.title.defaultMessage}
        toolbar={
          !loading &&
          !giftCard?.isExpired && (
            <Button data-test-id="set-balance-button" onClick={openSetBalanceDialog}>
              {m.dashboard_etBalanceButtonLabel() ??
                messages.setBalanceButtonLabel.defaultMessage}
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
              {m.dashboard_agInputLabel() ?? messages.tagInputLabel.defaultMessage}
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
