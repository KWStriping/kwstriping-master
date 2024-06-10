import type { FC } from 'react';

import GiftCardUpdatePage from './GiftCardUpdatePage';
import GiftCardDetailsProvider from './providers/GiftCardDetailsProvider';
import GiftCardUpdateDialogsProvider from './providers/GiftCardUpdateDialogsProvider';
import GiftCardUpdateFormProvider from './providers/GiftCardUpdateFormProvider/GiftCardUpdateFormProvider';
import type { GiftCardUpdatePageUrlQueryParams } from './types';

interface GiftCardUpdateProps {
  params: GiftCardUpdatePageUrlQueryParams;
  id: string;
}

const GiftCardUpdate: FC<GiftCardUpdateProps> = ({ id, params }) => (
  <GiftCardDetailsProvider id={id}>
    <GiftCardUpdateFormProvider>
      <GiftCardUpdateDialogsProvider id={id} params={params}>
        <GiftCardUpdatePage />
      </GiftCardUpdateDialogsProvider>
    </GiftCardUpdateFormProvider>
  </GiftCardDetailsProvider>
);

export default GiftCardUpdate;
