import Container from '@mui/material/Container';
import type { FC } from 'react';

import GiftCardsListHeader from './GiftCardsListHeader';
import GiftCardsListOrderInfoCard from './GiftCardsListOrderInfoCard/GiftCardsListOrderInfoCard';
import GiftCardsListTable from './GiftCardsListTable';

const GiftCardsListPage: FC = () => (
  <Container>
    <GiftCardsListHeader />
    <GiftCardsListTable />
    <GiftCardsListOrderInfoCard />
  </Container>
);

export default GiftCardsListPage;
