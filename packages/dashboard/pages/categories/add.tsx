import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import CategoryCreatePage from '@dashboard/components/categories/CategoryCreatePage';
import type { CategoryCreateData } from '@dashboard/components/categories/CategoryCreatePage/form';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import {
  CategoryCreateDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
} from '@core/api/graphql';
import type { CategoryCreateMutation } from '@core/api/graphql';

import { categoryUrl } from '@dashboard/oldSrc/categories/urls';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import { getParsedDataForJsonStringField } from '@dashboard/oldSrc/utils/richText/misc';

interface CategoryCreateViewProps {
  parentId: string;
}

export const CategoryCreateView = () => {
  const router = useRouter();
  const { id: parentId } = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const handleSuccess = (data: CategoryCreateMutation) => {
    if (data?.createCategory?.errors?.length === 0) {
      notify(t('dashboard.l7Fag', 'Category created'), {
        type: 'success',
      });
      void router.push(categoryUrl(data?.createCategory?.category?.id));
    }
  };

  const [createCategory, createCategoryResult] = useMutation(CategoryCreateDocument, {
    onCompleted: handleSuccess,
  });

  const handleCreate = async (formData: CategoryCreateData) => {
    const result = await createCategory({
      input: {
        description: getParsedDataForJsonStringField(formData.description),
        name: formData.name,
        seo: {
          description: formData.seoDescription,
          title: formData.seoTitle,
        },
        slug: formData.slug,
      },
      parent: parentId || null,
    });

    return {
      id: result.data?.createCategory?.category?.id || null,
      errors: getMutationErrors(result),
    };
  };

  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );

  return (
    <>
      <WindowTitle title={t('dashboard.createCategory', 'Create category')} />
      <CategoryCreatePage
        saveButtonBarState={createCategoryResult.status}
        errors={createCategoryResult.data?.createCategory?.errors || []}
        disabled={createCategoryResult.fetching}
        backUrl={parentId ? categoryUrl(parentId) : '/categories'}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default CategoryCreateView;
