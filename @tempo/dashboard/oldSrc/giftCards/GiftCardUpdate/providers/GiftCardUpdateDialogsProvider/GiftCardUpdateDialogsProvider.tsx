import GiftCardUpdatePageDeleteDialog from '@tempo/dashboard/components/giftCards/GiftCardDeleteDialog/GiftCardUpdatePageDeleteDialog';
import { giftCardsListPath, giftCardUrl } from '@tempo/dashboard/oldSrc/giftCards/urls';
import useDialogActionHandlers from '@tempo/dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import { useRouter } from 'next/navigation';
import type { FC, ReactNode } from 'react';
import { createContext } from 'react';

import GiftCardResendCodeDialog from '../../GiftCardResendCodeDialog';
import GiftCardUpdateBalanceDialog from '../../GiftCardUpdateBalanceDialog';
import type { GiftCardUpdatePageUrlQueryParams } from '../../types';
import { GiftCardUpdatePageActionParamsEnum } from '../../types';
import useGiftCardDetails from '../GiftCardDetailsProvider/hooks/useGiftCardDetails';

interface GiftCardUpdateDialogsProviderProps {
  children: ReactNode;
  params: GiftCardUpdatePageUrlQueryParams;
  id: string;
}

export interface GiftCardUpdateDialogsConsumerProps {
  onClose: () => void;
  openSetBalanceDialog: () => void;
  openDeleteDialog: () => void;
  openResendCodeDialog: () => void;
}

export const GiftCardUpdateDialogsContext =
  createContext<GiftCardUpdateDialogsConsumerProps>(null);

const GiftCardUpdateDialogsProvider: FC<GiftCardUpdateDialogsProviderProps> = ({
  children,
  params,
  id,
}) => {
  const router = useRouter();

  const { loading: loadingGiftCard } = useGiftCardDetails();

  const { SET_BALANCE, DELETE, RESEND_CODE } = GiftCardUpdatePageActionParamsEnum;

  const [openDialog, onClose] = useDialogActionHandlers<
    GiftCardUpdatePageActionParamsEnum,
    GiftCardUpdatePageUrlQueryParams
  >((params) => giftCardUrl(id, params), params);

  const isDialogOpen = (action: GiftCardUpdatePageActionParamsEnum) => params?.action === action;

  const navigateBack = () => router.push(giftCardsListPath);

  const providerValues: GiftCardUpdateDialogsConsumerProps = {
    openSetBalanceDialog: () => openDialog(SET_BALANCE),
    openDeleteDialog: () => openDialog(DELETE),
    openResendCodeDialog: () => openDialog(RESEND_CODE),
    onClose,
  };

  return (
    <GiftCardUpdateDialogsContext.Provider value={providerValues}>
      {children}
      {!loadingGiftCard && (
        <>
          <GiftCardUpdateBalanceDialog onClose={onClose} open={isDialogOpen(SET_BALANCE)} />
          <GiftCardUpdatePageDeleteDialog
            onClose={onClose}
            open={isDialogOpen(DELETE)}
            onDelete={navigateBack}
          />
          <GiftCardResendCodeDialog open={isDialogOpen(RESEND_CODE)} onClose={onClose} />
        </>
      )}
    </GiftCardUpdateDialogsContext.Provider>
  );
};

export default GiftCardUpdateDialogsProvider;
