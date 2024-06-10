import { useUser } from '@core/auth/react/hooks';
import { Trans, useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import ShippingZonesListPage from '@dashboard/components/shipping/ShippingZonesListPage';
import {
  ShippingZonesDocument,
  DeleteShippingZoneDocument,
  UpdateDefaultWeightUnitDocument,
  BulkDeleteShippingZoneDocument,
} from '@core/api/graphql';

import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { getById } from '@core/utils';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type {
  ShippingZonesListUrlDialog,
  ShippingZonesListUrlQueryParams,
} from '@dashboard/oldSrc/shipping/urls';
import { shippingZonesListUrl } from '@dashboard/oldSrc/shipping/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { assert } from 'tsafe';

export const ShippingZonesList = () => {
  const router = useRouter();
  const params = router.query as ShippingZonesListUrlQueryParams;
  const ids = params.ids || [];
  assert(Array.isArray(ids));
  const notify = useNotifier();
  const shop = useShopSettings();
  const { user } = useUser();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { updateListSettings, settings } = useListSettings(ListViews.ShippingMethodsList);

  usePaginationReset(shippingZonesListUrl, params, settings.rowNumber);

  const { t } = useTranslation();

  const paginationState = createPaginationState(settings.rowNumber, params);

  const queryVariables = useMemo(
    () => ({
      ...paginationState,
    }),
    [params, settings.rowNumber] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const [openModal, closeModal] = useDialogActionHandlers<
    ShippingZonesListUrlDialog,
    ShippingZonesListUrlQueryParams
  >(shippingZonesListUrl, params);

  const [{ data, fetching: loading }, refetch] = useQuery(ShippingZonesDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const [deleteShippingZone, deleteShippingZoneOpts] = useMutation(DeleteShippingZoneDocument, {
    onCompleted: (data) => {
      if (data?.deleteShippingZone?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        closeModal();
        refetch();
      }
    },
  });

  const [updateDefaultWeightUnit, updateDefaultWeightUnitOpts] = useMutation(
    UpdateDefaultWeightUnitDocument,
    {
      onCompleted: (data) => {
        if (data?.updateShopSettings?.errors?.length === 0) {
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
        }
      },
    }
  );

  const [bulkDeleteShippingZone, bulkDeleteShippingZoneOpts] = useMutation(
    BulkDeleteShippingZoneDocument,
    {
      onCompleted: (data) => {
        if (data?.deleteShippingZones?.errors?.length === 0) {
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
          closeModal();
          reset();
          refetch();
        }
      },
    }
  );

  const paginationValues = usePaginator({
    pageInfo: data?.shippingZones?.pageInfo,
    paginationState,
    queryString: params,
  });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <ShippingZonesListPage
        defaultWeightUnit={shop?.defaultWeightUnit}
        settings={settings}
        disabled={
          loading || deleteShippingZoneOpts.fetching || updateDefaultWeightUnitOpts.fetching
        }
        shippingZones={mapEdgesToItems(data?.shippingZones)}
        onUpdateListSettings={updateListSettings}
        onRemove={(id) =>
          openModal('remove', {
            id,
          })
        }
        onSubmit={(unit) =>
          extractMutationErrors(
            updateDefaultWeightUnit({
              unit,
            })
          )
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
          <IconButton
            data-test-id="delete-selected-elements-icon"
            color="secondary"
            onClick={() =>
              openModal('remove-many', {
                ids: listElements,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        userPermissions={user?.userPermissions || []}
      />

      <ActionDialog
        open={params.action === 'remove'}
        confirmButtonState={deleteShippingZoneOpts.status}
        variant="delete"
        title={t(
          'dashboard.3EI/U',
          'Delete Shipping Zone'
          // dialog header
        )}
        onClose={closeModal}
        onConfirm={() =>
          deleteShippingZone({
            id: params.id,
          })
        }
      >
        <DialogContentText>
          <Trans
            t={t}
            i18nKey={'qf/m5l'}
            shippingZoneName={
              <strong>
                {getStringOrPlaceholder(
                  mapEdgesToItems(data?.shippingZones)?.find(getById(params.id))?.name
                )}
              </strong>
            }
          >
            {'Are you sure you want to delete {{shippingZoneName}} shipping zone?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={params.action === 'remove-many'}
        confirmButtonState={bulkDeleteShippingZoneOpts.status}
        variant="delete"
        title={t(
          'dashboard.pZLRH',
          'Delete Shipping Zones'
          // dialog header
        )}
        onClose={closeModal}
        onConfirm={() =>
          bulkDeleteShippingZone({
            ids: params.ids,
          })
        }
      >
        <DialogContentText>
          <Trans t={t} i18nKey={'dashboard.9pcQx'} count={params.ids?.length}>
            {'Are you sure you want to delete <strong>{{count}}</strong> shipping zones?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>
    </PaginatorContext.Provider>
  );
};
export default ShippingZonesList;
