import { Trans, useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import PageDetailsPage from '@dashboard/components/pages/PageDetailsPage';
import type { PageData, PageSubmitData } from '@dashboard/components/pages/PageDetailsPage/form';
import type {
  AttributeErrorFragment,
  ValueInput,
  PageDetailsFragment,
  PageErrorFragment,
  PageInput,
  UploadErrorFragment,
} from '@core/api/graphql';
import {
  ValueDeleteDocument,
  FileUploadDocument,
  PageUpdateDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  PageRemoveDocument,
  PageDetailsDocument,
} from '@core/api/graphql';
import {
  getAttributesAfterFileAttributesUpdate,
  mergeValueDeleteErrors,
  mergeFileUploadErrors,
} from '@dashboard/oldSrc/attributes/utils/data';
import {
  handleDeleteMultipleValues,
  handleUploadMultipleFiles,
  prepareAttributesInput,
} from '@dashboard/oldSrc/attributes/utils/handlers';
import { DEFAULT_INITIAL_SEARCH_DATA, VALUES_PAGINATE_BY } from '@dashboard/oldSrc/config';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import type { PageUrlQueryParams } from '@dashboard/oldSrc/pages/urls';
import { getAttributeInputFromPage } from '@dashboard/oldSrc/pages/utils/data';
import usePageSearch from '@dashboard/oldSrc/searches/usePageSearch';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import useValueSearchHandler from '@dashboard/oldSrc/utils/handlers/valueSearchHandler';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { getParsedDataForJsonStringField } from '@dashboard/oldSrc/utils/richText/misc';

export interface PageDetailsProps {
  id: string;
  params: PageUrlQueryParams;
}

const createPageInput = (
  data: PageData,
  page: PageDetailsFragment,
  updatedFileAttributes: ValueInput[]
): PageInput => ({
  attributes: prepareAttributesInput({
    attributes: data?.attributes,
    prevAttributes: getAttributeInputFromPage(page),
    updatedFileAttributes,
  }),
  content: getParsedDataForJsonStringField(data?.content),
  isPublished: data?.isPublished,
  publishedAt: data?.publishedAt,
  seo: {
    description: data?.seoDescription,
    title: data?.seoTitle,
  },
  slug: data?.slug === '' ? null : data?.slug,
  title: data?.title,
});

export const PageDetails = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [pageDetails] = useQuery(PageDetailsDocument, {
    variables: {
      id,
      firstValues: VALUES_PAGINATE_BY,
    },
  });

  const [uploadFile, uploadFileOpts] = useMutation(FileUploadDocument, {});

  const [updatePage, updatePageOpts] = useMutation(PageUpdateDocument, {});

  const [deleteValue, deleteValueOpts] = useMutation(
    ValueDeleteDocument,
    {}
  );

  const [pageRemove, pageRemoveOpts] = useMutation(PageRemoveDocument, {
    onCompleted: (data) => {
      if (data?.deletePage?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        void router.push('/pages');
      }
    },
  });

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    void router.push({
      pathname: '/pages/[id]',
      query: { action: 'assign-attribute-value', id: attribute.id },
    });

  const handleUpdate = async (data: PageSubmitData) => {
    let errors: Array<AttributeErrorFragment | UploadErrorFragment | PageErrorFragment> = [];

    const uploadFilesResult = await handleUploadMultipleFiles(
      data?.attributesWithNewFileValue,
      (variables) => uploadFile({ ...variables })
    );

    const deleteValuesResult = await handleDeleteMultipleValues(
      data?.attributesWithNewFileValue,
      pageDetails?.data?.page?.attributes,
      (variables) => deleteValue({ ...variables })
    );

    const updatedFileAttributes = getAttributesAfterFileAttributesUpdate(
      data?.attributesWithNewFileValue,
      uploadFilesResult
    );

    const updateResult = await updatePage({
      id,
      input: createPageInput(data, pageDetails?.data?.page, updatedFileAttributes),
      firstValues: VALUES_PAGINATE_BY,
    });

    errors = [
      ...errors,
      ...mergeFileUploadErrors(uploadFilesResult),
      ...mergeValueDeleteErrors(deleteValuesResult),
      ...updateResult.data?.updatePage?.errors,
    ];

    return errors;
  };

  const handleSubmit = createMetadataUpdateHandler(
    pageDetails.data?.page,
    handleUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  const {
    loadMore: loadMorePages,
    search: searchPages,
    result: searchPagesOpts,
  } = usePageSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const {
    loadMore: loadMoreProducts,
    search: searchProducts,
    result: searchProductsOpts,
  } = useProductSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
  const {
    loadMore: loadMoreValues,
    search: searchValues,
    result: searchValuesOpts,
    reset: searchAttributeReset,
  } = useValueSearchHandler(DEFAULT_INITIAL_SEARCH_DATA);

  const values =
    mapEdgesToItems(searchValuesOpts?.data?.attribute?.values) || [];

  const fetchMoreReferencePages = {
    hasMore: searchPagesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchPagesOpts.fetching,
    onFetchMore: loadMorePages,
  };
  const fetchMoreReferenceProducts = {
    hasMore: searchProductsOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchProductsOpts.fetching,
    onFetchMore: loadMoreProducts,
  };
  const fetchMoreValues = {
    hasMore: !!searchValuesOpts.data?.attribute?.values?.pageInfo?.hasNextPage,
    loading: !!searchValuesOpts.fetching,
    onFetchMore: loadMoreValues,
  };

  return (
    <>
      <WindowTitle title={pageDetails.data?.page?.title} />
      <PageDetailsPage
        loading={
          pageDetails.loading ||
          updatePageOpts.fetching ||
          uploadFileOpts.fetching ||
          deleteValueOpts.fetching
        }
        errors={updatePageOpts.data?.updatePage?.errors || []}
        saveButtonBarState={updatePageOpts.status}
        page={pageDetails.data?.page}
        values={values}
        onRemove={() =>
          void router.push({ pathname: '/pages/[id]', query: { action: 'remove' } })
        }
        onSubmit={handleSubmit}
        assignReferencesAttributeId={params.action === 'assign-attribute-value' && params.id}
        onAssignReferencesClick={handleAssignAttributeReferenceClick}
        referencePages={mapEdgesToItems(searchPagesOpts?.data?.search) || []}
        referenceProducts={mapEdgesToItems(searchProductsOpts?.data?.search) || []}
        fetchReferencePages={searchPages}
        fetchMoreReferencePages={fetchMoreReferencePages}
        fetchReferenceProducts={searchProducts}
        fetchMoreReferenceProducts={fetchMoreReferenceProducts}
        fetchValues={searchValues}
        fetchMoreValues={fetchMoreValues}
        onCloseDialog={() => router.push({ pathname: '/pages/[id]', query: { id } })}
        onAttributeSelectBlur={searchAttributeReset}
      />
      <ActionDialog
        open={params.action === 'remove'}
        confirmButtonState={pageRemoveOpts.status}
        title={t(
          'dashboard.1luwg',
          'Delete Page'
          // dialog header
        )}
        onClose={() => router.push({ pathname: '/pages/[id]', query: { id } })}
        onConfirm={() => pageRemove({ variables: { id } })}
        variant="delete"
      >
        <DialogContentText>
          <Trans
            t={t}
            i18nKey={'4B32Ba'}
            title={`<strong>${getStringOrPlaceholder(pageDetails.data?.page?.title)}</strong>}`}
          >
            {'Are you sure you want to delete {title}?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>
    </>
  );
};
export default PageDetails;
