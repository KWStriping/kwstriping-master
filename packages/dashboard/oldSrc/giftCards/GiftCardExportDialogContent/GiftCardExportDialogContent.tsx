import { useTranslation } from '@core/i18n';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import ExportDialogSettings from '@dashboard/components/products/ProductExportDialog/ExportDialogSettings';
import {
  exportSettingsInitialFormData,
  exportSettingsInitialFormDataWithIds,
} from '@dashboard/components/products/ProductExportDialog/types';
import type { ExportSettingsFormData } from '@dashboard/components/products/ProductExportDialog/types';
import {
  ExportGiftCardsDocument,
  useGiftCardTotalCountQuery,
} from '@core/api/graphql';
import useBackgroundTask from '@dashboard/hooks/useBackgroundTask';
import useForm from '@dashboard/hooks/useForm';
import { Task } from '@dashboard/oldSrc/containers/BackgroundTasks/types';
import type { DialogProps } from '@dashboard/oldSrc/types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import ContentWithProgress from '../GiftCardCreateDialog/ContentWithProgress';
import { useGiftCardList } from '../GiftCardsList/providers/GiftCardListProvider';
import { giftCardExportDialogMessages as messages } from './messages';
//
import { getExportGiftCardsInput } from './utils';

const GiftCardExportDialog: FC<
  Pick<DialogProps, 'onClose'> & {
    idsToExport?: string[] | null;
  }
> = ({ onClose, idsToExport }) => {
  const { t } = useTranslation();
  const notify = useNotifier();
  const { queue } = useBackgroundTask();

  const hasIdsToExport = !!idsToExport?.length;

  const {
    loading: loadingGiftCardList,
    totalCount: filteredGiftCardsCount,
    listElements,
  } = useGiftCardList();

  const selectedIds = idsToExport ?? listElements;

  const { data: allGiftCardsCountData, loading: loadingGiftCardCount } =
    useQuery(GiftCardTotalCountDocument, {});

  const loading = loadingGiftCardList || loadingGiftCardCount;

  const [exportGiftCards, exportGiftCardsOpts] = useMutation(ExportGiftCardsDocument, {
    onCompleted: (data) => {
      const errors = data?.exportGiftCards?.errors;

      if (!errors?.length) {
        notify(
          t('dashboard.successAlertDescription', messages.successAlertDescription.defaultMessage),
          {
            title: t('dashboard.successAlertTitle', messages.successAlertTitle.defaultMessage),
          }
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
    allItems: t('dashboard.Qk8gB', 'All gift cards ({number})', {
      number: allGiftCardsCount || '...',
    }),
    selectedItems: t('dashboard.97Ii0', 'Selected giftCards ({number})', {
      number: listElements.length,
    }),
  };

  return (
    <>
      <DialogTitle>{t('dashboard.title', messages.title.defaultMessage)}</DialogTitle>
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
                {t('dashboard.exportNote', messages.exportNote.defaultMessage)}
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
          {t('dashboard.onfirmButtonLabel', messages.confirmButtonLabel.defaultMessage)}
        </ConfirmButton>
      </DialogActions>
    </>
  );
};

export default GiftCardExportDialog;
