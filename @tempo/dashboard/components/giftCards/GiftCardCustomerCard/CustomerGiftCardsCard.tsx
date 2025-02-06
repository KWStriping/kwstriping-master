import type { CustomerGiftCardListQuery, CustomerGiftCardListQueryVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useQuery } from '@tempo/api/hooks';
import CollectionWithDividers from '@tempo/dashboard/components/collections/CollectionWithDividers';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import PreviewPill from '@tempo/dashboard/components/core/PreviewPill';
import { CustomerGiftCardListDocument } from '@tempo/api/generated/graphql';
import { useCustomerDetails } from '@tempo/dashboard/oldSrc/customers/hooks/useCustomerDetails';
import GiftCardCreateDialogContent from '@tempo/dashboard/oldSrc/giftCards/GiftCardCreateDialog/GiftCardCreateDialogContent';
import { getExtendedGiftCard } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardDetailsProvider/utils';
import { giftCardListUrl } from '@tempo/dashboard/oldSrc/giftCards/urls';
import { getFullName } from '@tempo/dashboard/oldSrc/misc';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { Card, CardActions, Dialog } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { useState } from 'react';
import type { FC } from 'react';

import CustomerGiftCardsCardListItem from './CustomerGiftCardsCardListItem';
import { giftCardCustomerCardMessages as messages } from './messages';
import { CUSTOMER_GIFT_CARD_LIST_QUERY } from './queries';
// import { useCardActionsStyles } from "./styles";

const CustomerGiftCardsCard: FC = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const customerDetails = useCustomerDetails();
  const customer = customerDetails?.customer?.user;
  const id = customer?.id;

  const { data, loading } = useQuery(CustomerGiftCardListDocument, {
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
          title={m.dashboard_customerGiftCardsCardTitle() ?? 'Gift Cards'}
          toolbar={
            <>
              {!!giftCards?.length && (
                <Button color="secondary" href={viewAllGiftCardsUrl}>
                  {m.dashboard_customerGiftCardsViewAllButton() ?? 'View All'}
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
            {m.dashboard_customerGiftCardsIssueNewCardButton() ?? 'Issue new card'}
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
