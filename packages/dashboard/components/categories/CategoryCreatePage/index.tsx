import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import CategoryDetailsForm from '@dashboard/components/categories/CategoryDetailsForm';
import { CardSpacer } from '@dashboard/components/core/CardSpacer';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import SeoForm from '@dashboard/components/forms/SeoForm';
import type { ProductErrorFragment } from '@core/api/graphql';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import type { CategoryCreateData } from './form';
import CategoryCreateForm from './form';

export interface CategoryCreatePageProps {
  errors: ProductErrorFragment[];
  disabled: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  backUrl: string | UrlObject;
  onSubmit(data: CategoryCreateData);
}

export const CategoryCreatePage: FC<CategoryCreatePageProps> = ({
  disabled,
  onSubmit,
  errors,
  saveButtonBarState,
  backUrl,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <CategoryCreateForm onSubmit={onSubmit} disabled={disabled}>
      {({ data, change, handlers, submit, isSaveDisabled }) => (
        <Container>
          <Backlink href={backUrl}>{t('dashboard.categories', 'Categories')}</Backlink>
          <PageHeader
            title={t(
              'dashboard.gsY/X',
              'Create New Category'
              // page header
            )}
          />
          <div>
            <CategoryDetailsForm
              data={data}
              disabled={disabled}
              errors={errors}
              onChange={change}
            />
            <CardSpacer />
            <SeoForm
              allowEmptySlug={true}
              helperText={t(
                'dashboard.QdR8M',
                'Add search engine title and description to make this category easier to find'
              )}
              slug={data?.slug}
              slugPlaceholder={data?.name}
              title={data?.seoTitle}
              titlePlaceholder={data?.name}
              description={data?.seoDescription}
              descriptionPlaceholder={data?.name}
              loading={disabled}
              onChange={change}
              disabled={disabled}
            />
            <CardSpacer />
            <Metadata data={data} onChange={handlers.changeMetadata} />
            <SaveBar
              onCancel={() => router.push(backUrl)}
              onSubmit={submit}
              state={saveButtonBarState}
              disabled={isSaveDisabled}
            />
          </div>
        </Container>
      )}
    </CategoryCreateForm>
  );
};
CategoryCreatePage.displayName = 'CategoryCreatePage';
export default CategoryCreatePage;
