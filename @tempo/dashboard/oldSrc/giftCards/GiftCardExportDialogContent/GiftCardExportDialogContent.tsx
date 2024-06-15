import type { ExportGiftCardsMutation, ExportGiftCardsMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import ExportDialogSettings from '@tempo/dashboard/components/products/ProductExportDialog/ExportDialogSettings';
import {
  exportSettingsInitialFormData,
  exportSettingsInitialFormDataWithIds,
} from '@tempo/dashboard/components/products/ProductExportDialog/types';
import type { ExportSettingsFormData } from '@tempo/dashboard/components/products/ProductExportDialog/types';
import {
  ExportGiftCardsDocument,
  useGiftCardTotalCountQuery,
} from '@tempo/api/generated/graphql';
import useBackgroundTask from '@tempo/dashboard/hooks/useBackgroundTask';
import useForm from '@tempo/dashboard/hooks/useForm';
import { Task } from '@tempo/dashboard/oldSrc/containers/BackgroundTasks/types';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import ContentWithProgress from '../GiftCardCreateDialog/ContentWithProgress';
import { useGiftCardList } from '../GiftCardsList/providers/GiftCardListProvider';
import { giftCardExportDialogMessages as messages } from './messages';
import { getExportGiftCardsInput } from './utils';

const GiftCardExportDialog: FC<
  Pick<DialogProps, 'onClose'> & {
    idsToExport?: string[] | null;
  }
> = ({ onClose, idsToExport }) => {
  const notify = useNotifier();
  const { queue } = useBackgroundTask();

  const hasIdsToExport = !!idsToExport?.length;

  const {
    loading: loadingGiftCardList,
    totalCount: filteredGiftCardsCount,
    listElements,
  } = useGiftCardList();

  const selectedIds = idsToExport ?? listElements;

  const { data: allGiftCardsCountData, loading: loadingGiftCardCount } = useQuery(
    GiftCardTotalCountDocument,
    {}
  );

  const loading = loadingGiftCardList || loadingGiftCardCount;

  const [exportGiftCards, exportGiftCardsOpts] = useMutation<ExportGiftCardsMutation, ExportGiftCardsMutationVariables>(ExportGiftCardsDocument, {
    onCompleted: (data) => {
      const errors = data?.exportGiftCards?.errors;

      if (!errors?.length) {
        notify(
          m.dashboard_successAlertDescription({
            title: t('dashboard_successAlertTitle', messages.successAlertTitle.defaultMessage),
          }) ?? messages.successAlertDescription.defaultMessage
        );

        queue(Task.Export, {
          id: data?.exportGiftCards?.exportFile?.id,
        });

        onClose();
      }
    },
  });

  const handleSubmit = (data: ExportSettingsFormData) => {
    exportGiftCards({
      input: getExportGiftCardsInput({
        data,
        ids: selectedIds,
      }),
    });
  };

  const { data, change, submit } = useForm(
    hasIdsToExport ? exportSettingsInitialFormDataWithIds : exportSettingsInitialFormData,
    handleSubmit
  );
  const allGiftCardsCount = allGiftCardsCountData?.giftCards?.totalCount;

  const exportScopeLabels = {
    allItems:
      m.dashboard_Qk_gB({
        number: allGiftCardsCount || '...',
      }) ?? 'All gift cards ({number})',
    selectedItems:
      m.dashboard___Ii_({
        number: listElements.length,
      }) ?? 'Selected giftCards ({number})',
  };

  return (
    <>
      <DialogTitle>{m.dashboard_title() ?? messages.title.defaultMessage}</DialogTitle>
      <DialogContent>
        <ContentWithProgress>
          {!loading && (
            <>
              <ExportDialogSettings
                errors={exportGiftCardsOpts?.data?.exportGiftCards?.errors}
                onChange={change}
                selectedItems={selectedIds?.length}
                data={data}
                exportScopeLabels={exportScopeLabels}
                allowScopeSelection={!hasIdsToExport}
                itemsQuantity={{
                  filter: filteredGiftCardsCount,
                  all: allGiftCardsCount,
                }}
              />
              <Typography className={styles.note ?? ''} variant="body2">
                {m.dashboard_exportNote() ?? messages.exportNote.defaultMessage}
              </Typography>
            </>
          )}
        </ContentWithProgress>
      </DialogContent>
      <DialogActions>
        <ConfirmButton
          transitionState={exportGiftCardsOpts.status}
          color="primary"
          type="submit"
          data-test-id="submit"
          onClick={submit}
        >
          {m.dashboard_onfirmButtonLabel() ?? messages.confirmButtonLabel.defaultMessage}
        </ConfirmButton>
      </DialogActions>
    </>
  );
};

export default GiftCardExportDialog;
