import { Trans, useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { useQuery } from '@core/urql/hooks';
import CollectionWithDividers from '@dashboard/components/collections/CollectionWithDividers';
import CardTitle from '@dashboard/components/core/CardTitle';
import PreviewPill from '@dashboard/components/core/PreviewPill';
import { CustomerGiftCardListDocument } from '@core/api/graphql';
import { useCustomerDetails } from '@dashboard/oldSrc/customers/hooks/useCustomerDetails';
import GiftCardCreateDialogContent from '@dashboard/oldSrc/giftCards/GiftCardCreateDialog/GiftCardCreateDialogContent';
import { getExtendedGiftCard } from '@dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardDetailsProvider/utils';
import { giftCardListUrl } from '@dashboard/oldSrc/giftCards/urls';
import { getFullName } from '@dashboard/oldSrc/misc';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { Card, CardActions, Dialog } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { useState } from 'react';
import type { FC } from 'react';

import CustomerGiftCardsCardListItem from './CustomerGiftCardsCardListItem';
import { giftCardCustomerCardMessages as messages } from './messages';
import { CUSTOMER_GIFT_CARD_LIST_QUERY } from './queries';
// import { useCardActionsStyles } from "./styles";

const CustomerGiftCardsCard: FC = () => {
  const { t } = useTranslation();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const customerDetails = useCustomerDetails();
  const customer = customerDetails?.customer?.user;
  const id = customer?.id;

  const [{ data, fetching: loading }] = useQuery(CustomerGiftCardListDocument, {
    variables: {
      first: 5,
      filter: {
        usedBy: [id],
      },
    },
    pause: !id,
  });

  const closeCreateDialog = () => setOpenCreateDialog(false);

  const giftCards = mapEdgesToItems(data?.giftCards);

  // const styles = useCardActionsStyles({
  //   buttonPosition: giftCards?.length ? 'right' : 'left',
  // });

  const viewAllGiftCardsUrl = giftCardListUrl({
    usedBy: [id],
  });

  const handleCreateNewCardButton = () => {
    setOpenCreateDialog(true);
  };

  return (
    <>
      <Card>
        <CardTitle
          title={t('dashboard.customerGiftCardsCardTitle', 'Gift Cards')}
          toolbar={
            <>
              {!!giftCards?.length && (
                <Button color="secondary" href={viewAllGiftCardsUrl}>
                  {t('dashboard.customerGiftCardsViewAllButton', 'View All')}
                </Button>
              )}
              <PreviewPill className={styles.previewPill ?? ''} />
            </>
          }
        >
          <Trans
            {...(giftCards?.length
              ? messages.customerGiftCardsPresentSubtitle
              : messages.customerGiftCardsAbsentSubtitle)}
          />
        </CardTitle>
        {!loading && giftCards ? (
          <CollectionWithDividers
            collection={giftCards}
            renderItem={(giftCard) => (
              <CustomerGiftCardsCardListItem giftCard={getExtendedGiftCard(giftCard)} />
            )}
            withOuterDividers
          />
        ) : (
          <Skeleton />
        )}
        <CardActions className={styles.cardActions ?? ''}>
          <Button color="secondary" onClick={handleCreateNewCardButton}>
            {t('dashboard.customerGiftCardsIssueNewCardButton', 'Issue new card')}
          </Button>
        </CardActions>
      </Card>
      <Dialog open={openCreateDialog} maxWidth="sm" onClose={closeCreateDialog}>
        <GiftCardCreateDialogContent
          onClose={closeCreateDialog}
          refetchQueries={[CUSTOMER_GIFT_CARD_LIST_QUERY]}
          initialCustomer={{
            email: customer?.email,
            name: getFullName(customer),
          }}
        />
      </Dialog>
    </>
  );
};

export default CustomerGiftCardsCard;
