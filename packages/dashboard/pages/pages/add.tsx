import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { getMutationErrors } from '@core/urql/utils';
import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import PageDetailsPage from '@dashboard/components/pages/PageDetailsPage';
import type { PageSubmitData } from '@dashboard/components/pages/PageDetailsPage/form';
import type { PageErrorWithAttributesFragment } from '@core/api/graphql';
import { PageCreateDocument, PageKlassDocument } from '@core/api/graphql';

import { getAttributesAfterFileAttributesUpdate } from '@dashboard/oldSrc/attributes/utils/data';
import {
  handleUploadMultipleFiles,
  prepareAttributesInput,
} from '@dashboard/oldSrc/attributes/utils/handlers';
import { DEFAULT_INITIAL_SEARCH_DATA, VALUES_PAGINATE_BY } from '@dashboard/oldSrc/config';
import type { PageCreateUrlQueryParams } from '@dashboard/oldSrc/pages/urls';
import { createPageUrl, pageUrl } from '@dashboard/oldSrc/pages/urls';
import usePageSearch from '@dashboard/oldSrc/searches/usePageSearch';
import usePageKlassSearch from '@dashboard/oldSrc/searches/usePageKlassSearch';
import useProductSearch from '@dashboard/oldSrc/searches/useProductSearch';
import useValueSearchHandler from '@dashboard/oldSrc/utils/handlers/valueSearchHandler';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { getParsedDataForJsonStringField } from '@dashboard/oldSrc/utils/richText/misc';
import { useRouter } from 'next/router';

export interface PageCreateProps {
  id: string;
  params: PageCreateUrlQueryParams;
}

export const PageCreate = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const selectedPageKlassId = params['page-type-id'];

  const handleSelectPageKlassId = (pageKlassId: string) =>
    void router.push(
      createPageUrl({
        ...params,
        'page-type-id': pageKlassId,
      })
    );

  const {
    loadMore: loadMorePageKlasses,
    search: searchPageKlasses,
    result: searchPageKlassesOpts,
  } = usePageKlassSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });
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

  const [{ data: selectedPageKlass }] = useQuery(PageKlassDocument, {
    variables: {
      id: selectedPageKlassId,
      firstValues: VALUES_PAGINATE_BY,
    },
    pause: !selectedPageKlassId,
  });

  const values = mapEdgesToItems(searchValuesOpts?.data?.attribute.values) || [];

  const [uploadFile, uploadFileOpts] = useMutation(FileUploadDocument, {});

  const [createPage, createPageOpts] = useMutation(PageCreateDocument, {
    onCompleted: (data) => {
      if (data?.createPage?.errors?.length === 0) {
        notify(t('dashboard.MbFNo', 'Successfully created new page'), {
          type: 'success',
        });
        void router.push(pageUrl(data?.createPage?.page?.id));
      }
    },
  });

  const handleCreate = async (formData: PageSubmitData) => {
    const uploadFilesResult = await handleUploadMultipleFiles(
      formData.attributesWithNewFileValue,
      (variables) => uploadFile({ variables })
    );

    const updatedFileAttributes = getAttributesAfterFileAttributesUpdate(
      formData.attributesWithNewFileValue,
      uploadFilesResult
    );

    const result = await createPage({
      variables: {
        input: {
          attributes: prepareAttributesInput({
            attributes: formData.attributes,
            prevAttributes: null,
            updatedFileAttributes,
          }),
          content: getParsedDataForJsonStringField(formData.content),
          isPublished: formData.isPublished,
          pageKlass: formData.pageKlass?.id,
          publishedAt: formData.publishedAt,
          seo: {
            description: formData.seoDescription,
            title: formData.seoTitle,
          },
          slug: formData.slug === '' ? null : formData.slug,
          title: formData.title,
        },
      },
    });

    return {
      id: result.data?.createPage?.page?.id || null,
      errors: getMutationErrors(result),
    };
  };

  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );

  const handleAssignAttributeReferenceClick = (attribute: AttributeInput) =>
    void router.push(
      createPageUrl({
        action: 'assign-attribute-value',
        id: attribute.id,
      })
    );

  const fetchMorePageKlasses = {
    hasMore: searchPageKlassesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchPageKlassesOpts.fetching,
    onFetchMore: loadMorePageKlasses,
  };
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

  const errors = getMutationErrors(createPageOpts) as PageErrorWithAttributesFragment[];

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.X7zJJ',
          'Create Page'
          // header
        )}
      />
      <PageDetailsPage
        loading={createPageOpts.fetching || uploadFileOpts.fetching}
        errors={errors}
        saveButtonBarState={createPageOpts.status}
        page={null}
        values={values}
        pageKlasses={mapEdgesToItems(searchPageKlassesOpts?.data?.search) || []}
        onRemove={() => undefined}
        onSubmit={handleSubmit}
        fetchPageKlasses={searchPageKlasses}
        fetchMorePageKlasses={fetchMorePageKlasses}
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
        onCloseDialog={() => router.push('/pages/add')}
        selectedPageKlass={selectedPageKlass?.pageKlass}
        onSelectPageKlass={handleSelectPageKlassId}
        onAttributeSelectBlur={searchAttributeReset}
      />
    </>
  );
};
export default PageCreate;
