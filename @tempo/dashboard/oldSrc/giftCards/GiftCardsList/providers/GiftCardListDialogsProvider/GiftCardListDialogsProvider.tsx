import GiftCardListPageDeleteDialog from '@tempo/dashboard/components/giftCards/GiftCardDeleteDialog/GiftCardListPageDeleteDialog';
import GiftCardBulkCreateDialog from '@tempo/dashboard/oldSrc/giftCards/GiftCardBulkCreateDialog';
import GiftCardCreateDialogContent from '@tempo/dashboard/oldSrc/giftCards/GiftCardCreateDialog';
import GiftCardExportDialogContent from '@tempo/dashboard/oldSrc/giftCards/GiftCardExportDialogContent';
import { giftCardListUrl } from '@tempo/dashboard/oldSrc/giftCards/urls';
import useDialogActionHandlers from '@tempo/dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/navigation';
import { createContext, useContext } from 'react';
import type { MouseEvent, FC, ReactNode } from 'react';

import { GIFT_CARD_LIST_QUERY } from '../../queries';
import type { GiftCardListUrlQueryParams } from '../../types';
import { GiftCardListActionParamsEnum } from '../../types';

interface GiftCardListDialogsProviderProps {
  children: ReactNode;
  params: GiftCardListUrlQueryParams;
}

export interface GiftCardListDialogsConsumerProps {
  openCreateDialog: () => void;
  openBulkCreateDialog: () => void;
  openDeleteDialog: (id?: string | MouseEvent) => void;
  openSearchSaveDialog: () => void;
  openSearchDeleteDialog: () => void;
  onClose: () => void;
  openExportDialog: () => void;
  id: string;
}

export const GiftCardListDialogsContext = createContext<GiftCardListDialogsConsumerProps>(null);

export const useGiftCardListDialogs = () => useContext(GiftCardListDialogsContext);

const GiftCardListDialogsProvider: FC<GiftCardListDialogsProviderProps> = ({
  children,
  params,
}) => {
  const router = useRouter();

  const id = params?.id;

  const { CREATE, DELETE, EXPORT, BULK_CREATE } = GiftCardListActionParamsEnum;

  const [openDialog, onClose] = useDialogActionHandlers<
    GiftCardListActionParamsEnum,
    GiftCardListUrlQueryParams
  >(giftCardListUrl, params);

  const handleOpenDialog = (type: GiftCardListActionParamsEnum) => () => openDialog(type);

  const isDialogOpen = (type: GiftCardListActionParamsEnum) => params?.action === type;

  const handleDeleteDialogOpen = (id?: string) => {
    openDialog(DELETE, id ? { id } : undefined);
  };

  const openSearchDeleteDialog = () => openDialog(GiftCardListActionParamsEnum.DeleteSearch);

  const openSearchSaveDialog = () => openDialog(GiftCardListActionParamsEnum.SaveSearch);

  const providerValues: GiftCardListDialogsConsumerProps = {
    openCreateDialog: handleOpenDialog(CREATE),
    openExportDialog: handleOpenDialog(EXPORT),
    openBulkCreateDialog: handleOpenDialog(BULK_CREATE),
    openDeleteDialog: handleDeleteDialogOpen,
    openSearchSaveDialog,
    openSearchDeleteDialog,
    onClose,
    id,
  };

  return (
    <GiftCardListDialogsContext.Provider value={providerValues}>
      {children}
      <Dialog open={isDialogOpen(CREATE)} maxWidth="sm" onClose={onClose} fullWidth>
        <GiftCardCreateDialogContent onClose={onClose} refetchQueries={[GIFT_CARD_LIST_QUERY]} />
      </Dialog>
      <GiftCardListPageDeleteDialog open={isDialogOpen(DELETE)} onClose={onClose} />
      <Dialog open={isDialogOpen(EXPORT)} maxWidth="sm" onClose={onClose} fullWidth>
        <GiftCardExportDialogContent onClose={onClose} />
      </Dialog>
      <GiftCardBulkCreateDialog open={isDialogOpen(BULK_CREATE)} onClose={onClose} />
    </GiftCardListDialogsContext.Provider>
  );
};

export default GiftCardListDialogsProvider;
