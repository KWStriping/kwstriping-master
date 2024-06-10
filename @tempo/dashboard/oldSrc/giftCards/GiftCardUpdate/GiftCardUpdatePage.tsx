import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import Grid from '@tempo/ui/components/Grid';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import { giftCardsListPath } from '../urls';
import GiftCardHistory from './GiftCardHistory/GiftCardHistory';
import GiftCardUpdateDetailsCard from './GiftCardUpdateDetailsCard';
import GiftCardUpdateInfoCard from './GiftCardUpdateInfoCard';
import GiftCardUpdatePageHeader from './GiftCardUpdatePageHeader';
import useGiftCardUpdateDialogs from './providers/GiftCardUpdateDialogsProvider/hooks/useGiftCardUpdateDialogs';
import useGiftCardUpdate from './providers/GiftCardUpdateFormProvider/hooks/useGiftCardUpdate';
import useGiftCardUpdateForm from './providers/GiftCardUpdateFormProvider/hooks/useGiftCardUpdateForm';

const GiftCardUpdatePage: FC = () => {
  const { openDeleteDialog } = useGiftCardUpdateDialogs();
  const router = useRouter();

  const {
    submit,
    data,
    handlers: { changeMetadata },
  } = useGiftCardUpdateForm();

  const {
    opts: { loading: loadingUpdate, status },
  } = useGiftCardUpdate();

  return (
    <Container>
      <GiftCardUpdatePageHeader />
      <Grid>
        <div>
          <GiftCardUpdateDetailsCard />
          <CardSpacer />
          <Metadata data={data} onChange={changeMetadata} />
        </div>
        <div>
          <GiftCardUpdateInfoCard />
        </div>
        <GiftCardHistory />
      </Grid>
      <SaveBar
        state={status}
        onCancel={() => router.push(giftCardsListPath)}
        disabled={loadingUpdate}
        onSubmit={submit}
        onDelete={openDeleteDialog}
      />
    </Container>
  );
};

export default GiftCardUpdatePage;
