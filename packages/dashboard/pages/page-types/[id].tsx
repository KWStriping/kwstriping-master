import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useSearch } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { assert } from 'tsafe/assert';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import AssignAttributeDialog from '@dashboard/components/dialogs/AssignAttributeDialog';
import AttributeUnassignDialog from '@dashboard/components/dialogs/AttributeUnassignDialog';
import BulkAttributeUnassignDialog from '@dashboard/components/dialogs/BulkAttributeUnassignDialog';
import TypeDeleteWarningDialog from '@dashboard/components/dialogs/TypeDeleteWarningDialog';
import PageKlassDetailsPage from '@dashboard/components/pageKlasses/PageKlassDetailsPage';
import type { PageKlassForm } from '@dashboard/components/pageKlasses/PageKlassDetailsPage';
import {
  PageKlassUpdateDocument,
  PageKlassAttributeReorderDocument,
  PageKlassDeleteDocument,
  UnassignPageAttributeDocument,
  AssignPageAttributeDocument,
  UpdatePrivateMetadataDocument,
  PageKlassDetailsDocument,
  UpdateMetadataDocument,
  SearchAvailablePageAttributesDocument,
} from '@core/api/graphql';

import useBulkActions from '@dashboard/hooks/useBulkActions';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import usePageKlassDelete from '@dashboard/oldSrc/pageKlasses/hooks/usePageKlassDelete';
import type { PageKlassUrlQueryParams } from '@dashboard/oldSrc/pageKlasses/urls';
import type { ReorderEvent } from '@dashboard/oldSrc/types';
import getPageErrorMessage from '@dashboard/oldSrc/utils/errors/page';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { pageKlassUrl } from '@dashboard/oldSrc/pageKlasses/urls';

interface PageKlassDetailsProps {
  id: string;
  params: PageKlassUrlQueryParams;
}

export const PageKlassDetails = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const notify = useNotifier();
  const { id, ...params } = router.query;
  const ids = typeof params.ids === 'string' ? params.ids.split(',') : [];
  assert(typeof id === 'string');
  const attributeListActions = useBulkActions();

  const notifySaved = () =>
    notify(t('dashboard.savedChanges', 'Saved changes'), {
      type: 'success',
    });

  const [updatePageKlass, updatePageKlassOpts] = useMutation(PageKlassUpdateDocument, {
    onCompleted: (updateData) => {
      if (
        !updateData.updatePageKlass?.errors ||
        updateData.updatePageKlass.errors?.length === 0
      ) {
        notifySaved();
      }
    },
  });
  const [deletePageKlass, deletePageKlassOpts] = useMutation(PageKlassDeleteDocument, {
    onCompleted: (deleteData) => {
      if (deleteData.deletePageKlass?.errors?.length === 0) {
        notify(t('dashboard.Gc9kE', 'Page type deleted'), {
          type: 'success',
        });
        void router.replace('/page-types');
      }
    },
  });
  const [assignAttribute, assignAttributeOpts] = useMutation(AssignPageAttributeDocument, {
    onCompleted: (data) => {
      if (data?.assignPageAttribute?.errors?.length === 0) {
        notifySaved();
        closeModal();
      }
    },
  });
  const [unassignAttribute, unassignAttributeOpts] = useMutation(UnassignPageAttributeDocument, {
    onCompleted: (data) => {
      if (data?.unassignPageAttribute?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        closeModal();
        attributeListActions.reset();
      }
    },
  });
  const [reorderAttribute] = useMutation(PageKlassAttributeReorderDocument, {
    onCompleted: (data) => {
      if (data?.reorderPageKlassAttributes?.errors?.length === 0) {
        notifySaved();
      }
    },
  });

  const deletePageKlassData = usePageKlassDelete({
    singleId: id,
    params,
  });

  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const handlePageKlassUpdate = async (formData: PageKlassForm) => {
    const result = await updatePageKlass({
      id,
      input: {
        name: formData.name,
      },
    });

    return result.data?.updatePageKlass?.errors;
  };
  const handlePageKlassDelete = () => deletePageKlass({ id });
  const handleAssignAttribute = () => {
    assert(ids);
    assignAttribute({
      id,
      ids,
    });
  };
  const handleAttributeUnassign = () => {
    // assert(params.id);
    unassignAttribute({
      id,
      ids: [params.id],
    });
  };
  const handleBulkAttributeUnassign = () => {
    assert(ids);
    unassignAttribute({
      id,
      ids,
    });
  };
  const handleAttributeReorder = (event: ReorderEvent) => {
    reorderAttribute({
      move: {
        id: data?.pageKlasses?.attributes?.[event.oldIndex]?.id,
        sortOrder: event.newIndex - event.oldIndex,
      },
      pageKlassId: id,
    });
  };

  const [{ data, fetching: dataLoading }] = useQuery(PageKlassDetailsDocument, {
    variables: { id },
  });

  const { loadMore, search, result } = useSearch(SearchAvailablePageAttributesDocument, {
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      id,
    },
  });

  const pageKlasses = data?.pageKlasses;

  if (pageKlasses === null) {
    return <NotFoundPage backHref={'/page-types'} />;
  }

  const closeModal = () => router.replace({ pathname: '/page-types/[id]', query: { id } });

  const handleSubmit = createMetadataUpdateHandler(
    data?.pageKlasses,
    handlePageKlassUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  const loading = updatePageKlassOpts.fetching || dataLoading;

  return (
    <>
      <WindowTitle title={data?.pageKlasses?.name} />
      <PageKlassDetailsPage
        disabled={loading}
        errors={updatePageKlassOpts.data?.updatePageKlass?.errors}
        pageTitle={data?.pageKlasses?.name}
        pageKlasses={data?.pageKlasses}
        saveButtonBarState={updatePageKlassOpts.status}
        onAttributeAdd={(type) =>
          void router.push(
            pageKlassUrl(id, {
              action: 'assign-attribute',
              type,
            })
          )
        }
        onAttributeReorder={handleAttributeReorder}
        onAttributeUnassign={(attributeId) =>
          void router.push({
            pathname: '/page-types/[id]',
            query: { action: 'unassign-attribute', id: attributeId },
          })
        }
        onDelete={() =>
          void router.push({
            pathname: '/page-types/[id]',
            query: { action: 'remove' },
          })
        }
        onSubmit={handleSubmit}
        attributeList={{
          isChecked: attributeListActions.isSelected,
          selected: attributeListActions.listElements.length,
          toggle: attributeListActions.toggle,
          toggleAll: attributeListActions.toggleAll,
          toolbar: (
            <Button
              onClick={() =>
                void router.push(
                  pageKlassUrl(id, {
                    action: 'unassign-attributes',
                    ids: attributeListActions.listElements,
                  })
                )
              }
            >
              <>
                {/* unassign attribute from page type, button */}

                {t('dashboard.FG7Zk', 'Unassign')}
              </>
            </Button>
          ),
        }}
      />

      {pageKlasses && (
        <>
          <TypeDeleteWarningDialog
            {...deletePageKlassData}
            typesData={[pageKlasses]}
            typesToDelete={[id]}
            onClose={closeModal}
            onDelete={handlePageKlassDelete}
            deleteButtonState={deletePageKlassOpts.status}
          />
          <AssignAttributeDialog
            attributes={mapEdgesToItems(result?.data?.pageKlasses?.availableAttributes)}
            confirmButtonState={assignAttributeOpts.status}
            errors={
              assignAttributeOpts.data?.assignPageAttribute?.errors
                ? assignAttributeOpts.data?.assignPageAttribute?.errors?.map((err) =>
                    getPageErrorMessage(err, t)
                  )
                : []
            }
            loading={result.fetching}
            onClose={closeModal}
            onSubmit={handleAssignAttribute}
            onFetch={search}
            onFetchMore={loadMore}
            onOpen={result.refetch}
            hasMore={!!result.data?.pageKlasses?.availableAttributes?.pageInfo.hasNextPage}
            open={params.action === 'assign-attribute'}
            selected={ids || []}
            onToggle={(attributeId) => {
              console.log(attributeId);
              assert(ids);
              void router.push(
                pageKlassUrl(id, {
                  ...params,
                  ids: ids.includes(attributeId)
                    ? ids.filter((selectedId) => selectedId !== attributeId)
                    : [...ids, attributeId],
                })
              );
            }}
          />
        </>
      )}
      <BulkAttributeUnassignDialog
        title={t(
          'dashboard.pfa+t',
          'Unassign Attribute from Page Type'
          // dialog header
        )}
        attributeQuantity={ids?.length}
        confirmButtonState={unassignAttributeOpts.status}
        onClose={closeModal}
        onConfirm={handleBulkAttributeUnassign}
        open={params.action === 'unassign-attributes'}
        itemTypeName={getStringOrPlaceholder(data?.pageKlasses.name)}
      />
      <AttributeUnassignDialog
        title={t(
          '/L8wzi',
          'Unassign Attribute From Page Type'
          // dialog header
        )}
        attributeName={getStringOrPlaceholder(
          data?.pageKlasses.attributes.find((attribute) => attribute.id === params.id)?.name
        )}
        confirmButtonState={unassignAttributeOpts.status}
        onClose={closeModal}
        onConfirm={handleAttributeUnassign}
        open={params.action === 'unassign-attribute'}
        itemTypeName={getStringOrPlaceholder(data?.pageKlasses?.name)}
      />
    </>
  );
};
export default PageKlassDetails;
