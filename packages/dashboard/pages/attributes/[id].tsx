import assert from 'assert';
import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import omit from 'lodash-es/omit';
import { useRouter } from 'next/router';
import AttributeDeleteDialog from '@dashboard/components/attributes/AttributeDeleteDialog';
import type { AttributePageFormData } from '@dashboard/components/attributes/AttributePage';
import AttributePage from '@dashboard/components/attributes/AttributePage';
import ValueDeleteDialog from '@dashboard/components/attributes/ValueDeleteDialog';
import ValueEditDialog from '@dashboard/components/attributes/ValueEditDialog';
import {
  ValueCreateDocument,
  AttributeUpdateDocument,
  ValueUpdateDocument,
  ValueDeleteDocument,
  AttributeDeleteDocument,
  ValueReorderDocument,
  AttributeDetailsDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
} from '@core/api/graphql';

import useListSettings from '@dashboard/hooks/useListSettings';
import useLocalPaginator, { useLocalPaginationState } from '@dashboard/hooks/useLocalPaginator';
import type {
  AttributeUrlDialog,
  AttributeUrlQueryParams,
} from '@dashboard/oldSrc/attributes/urls';
import { attributeUrl } from '@dashboard/oldSrc/attributes/urls';
import { valueFragmentToFormData } from '@dashboard/oldSrc/attributes/utils/data';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type { ReorderEvent } from '@dashboard/oldSrc/types';
import { ListViews } from '@dashboard/oldSrc/types';
import getAttributeErrorMessage from '@dashboard/oldSrc/utils/errors/attribute';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { move } from '@dashboard/oldSrc/utils/lists';

interface AttributeDetailsProps {
  id: string;
  params: AttributeUrlQueryParams;
}

const AttributeDetails = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  assert(typeof id === 'string');
  const notify = useNotifier();
  const { t } = useTranslation();
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [openModal, closeModal] = useDialogActionHandlers<
    AttributeUrlDialog,
    AttributeUrlQueryParams
  >((params) => attributeUrl(id, params), params);

  const { updateListSettings, settings } = useListSettings(ListViews.ValueList);

  const [valuesPaginationState, setValuesPaginationState] = useLocalPaginationState(
    settings?.rowNumber
  );

  const [{ data, fetching: loading }] = useQuery(AttributeDetailsDocument, {
    variables: {
      id,
      firstValues: valuesPaginationState.first,
      lastValues: valuesPaginationState.last,
      afterValues: valuesPaginationState.after,
      beforeValues: valuesPaginationState.before,
    },
    pause: !settings,
  });

  const paginateValues = useLocalPaginator(setValuesPaginationState);
  const { loadNextPage, loadPreviousPage, pageInfo } = paginateValues(
    data?.attribute?.values?.pageInfo,
    valuesPaginationState
  );

  const notifySaved = () =>
    notify(t('dashboard.savedChanges', 'Saved changes'), {
      type: 'success',
    });

  const [deleteAttribute, deleteAttributeOpts] = useMutation(AttributeDeleteDocument, {
    onCompleted: (data) => {
      if (data?.deleteAttribute?.errors?.length === 0) {
        notify(t('dashboard./VAHG', 'Attribute deleted'), {
          type: 'success',
        });
        void router.push('/attributes');
      }
    },
  });

  const [deleteValue, deleteValueOpts] = useMutation(
    ValueDeleteDocument,
    {
      onCompleted: (data) => {
        if (data?.deleteValue?.errors?.length === 0) {
          notify(
            t(
              'dashboard.H2D5m',
              'Value deleted'
              // attribute value deleted
            ),
            {
              type: 'success',
            }
          );
          closeModal();
        }
      },
    }
  );

  const [updateValue, updateValueOpts] = useMutation(
    ValueUpdateDocument,
    {
      onCompleted: (data) => {
        if (data?.updateValue?.errors?.length === 0) {
          notifySaved();
          closeModal();
        }
      },
    }
  );

  const [updateAttribute, updateAttributeOpts] = useMutation(AttributeUpdateDocument, {
    onCompleted: (data) => {
      if (data?.updateAttribute?.errors?.length === 0) {
        notifySaved();
      }
    },
  });

  const [createValue, valueCreateOpts] = useMutation(
    ValueCreateDocument,
    {
      onCompleted: (data) => {
        if (data?.createValue?.errors?.length === 0) {
          notify(
            t(
              'dashboard.Vn5B0',
              'Added new value'
              // added new attribute value
            ),
            {
              type: 'success',
            }
          );
          closeModal();
        }
      },
    }
  );

  const [valueReorder] = useMutation(ValueReorderDocument, {
    onCompleted: (data) => {
      if (data?.reorderValues?.errors?.length !== 0) {
        notify(getAttributeErrorMessage(data?.reorderValues?.errors[0], t), {
          type: 'error',
        });
      } else {
        notifySaved();
      }
    },
  });

  const handleValueReorder = ({ newIndex, oldIndex }: ReorderEvent) =>
    valueReorder({
      optimisticResponse: {
        __typename: 'Mutation',
        reorderValues: {
          __typename: 'AttributeReorderValues',
          attribute: {
            ...data?.attribute,
            choices: {
              __typename: 'ValueConnection',
              pageInfo: {
                ...data?.attribute.values?.pageInfo,
              },
              edges: move(
                data?.attribute.values.edges[oldIndex],
                data?.attribute.values.edges,
                (a, b) => a.node.id === b.node.id,
                newIndex
              ),
            },
          },
          errors: [],
        },
      },
      variables: {
        id,
        move: {
          id: data?.attribute.values.edges[oldIndex].node.id,
          sortOrder: newIndex - oldIndex,
        },
        firstValues: valuesPaginationState.first,
        lastValues: valuesPaginationState.last,
        afterValues: valuesPaginationState.after,
        beforeValues: valuesPaginationState.before,
      },
    });

  const handleUpdate = async (data: AttributePageFormData) =>
    extractMutationErrors(
      updateAttribute({
        id,
        input: {
          ...omit(data, ['entityType', 'inputType', 'metadata', 'privateMetadata']),
          storefrontSearchPosition: parseInt(data?.storefrontSearchPosition, 10),
        },
      })
    );

  const handleSubmit = createMetadataUpdateHandler(
    data?.attribute,
    handleUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  return (
    <AttributePage
      attribute={data?.attribute}
      disabled={loading}
      errors={updateAttributeOpts.data?.updateAttribute?.errors || []}
      onDelete={() => openModal('remove')}
      onSubmit={handleSubmit}
      onValueAdd={() => openModal('add-value')}
      onValueDelete={(id) =>
        openModal('remove-value', {
          id,
        })
      }
      onValueReorder={handleValueReorder}
      onValueUpdate={(id) =>
        openModal('edit-value', {
          id,
        })
      }
      saveButtonBarState={updateAttributeOpts.status}
      values={data?.attribute?.values}
      settings={settings}
      onUpdateListSettings={updateListSettings}
      pageInfo={pageInfo}
      onNextPage={loadNextPage}
      onPreviousPage={loadPreviousPage}
    >
      {(attributeFormData) => (
        <>
          <AttributeDeleteDialog
            open={params.action === 'remove'}
            name={data?.attribute?.name ?? '...'}
            confirmButtonState={deleteAttributeOpts.status}
            onClose={closeModal}
            onConfirm={() =>
              deleteAttribute({
                id,
              })
            }
          />
          <ValueDeleteDialog
            attributeName={data?.attribute?.name ?? '...'}
            open={params.action === 'remove-value'}
            name={getStringOrPlaceholder(
              data?.attribute?.values?.edges?.find((value) => params.id === value.node.id)?.node
                .name
            )}
            useName={true}
            confirmButtonState={deleteValueOpts.status}
            onClose={closeModal}
            onConfirm={() =>
              deleteValue({
                id: params.id,
                firstValues: valuesPaginationState.first,
                lastValues: valuesPaginationState.last,
                afterValues: valuesPaginationState.after,
                beforeValues: valuesPaginationState.before,
              })
            }
          />
          <ValueEditDialog
            inputType={attributeFormData.inputType}
            value={null}
            confirmButtonState={valueCreateOpts.status}
            disabled={loading}
            errors={valueCreateOpts.data?.createValue?.errors || []}
            open={params.action === 'add-value'}
            onClose={closeModal}
            onSubmit={(input) =>
              createValue({
                id,
                input,
                firstValues: valuesPaginationState.first,
                lastValues: valuesPaginationState.last,
                afterValues: valuesPaginationState.after,
                beforeValues: valuesPaginationState.before,
              })
            }
          />
          <ValueEditDialog
            inputType={attributeFormData.inputType}
            value={valueFragmentToFormData(
              data?.attribute?.values?.edges?.find((value) => params.id === value.node.id)?.node
            )}
            confirmButtonState={updateValueOpts.status}
            disabled={loading}
            errors={updateValueOpts.data?.updateValue?.errors || []}
            open={params.action === 'edit-value'}
            onClose={closeModal}
            onSubmit={(input) =>
              updateValue({
                id: data?.attribute.values.edges.find((value) => params.id === value.node.id).node
                  .id,
                input,
                firstValues: valuesPaginationState.first,
                lastValues: valuesPaginationState.last,
                afterValues: valuesPaginationState.after,
                beforeValues: valuesPaginationState.before,
              })
            }
          />
        </>
      )}
    </AttributePage>
  );
};

export default AttributeDetails;
