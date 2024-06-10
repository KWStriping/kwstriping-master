import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import CategoryDetailsForm from '@tempo/dashboard/components/categories/CategoryDetailsForm';
import { CardSpacer } from '@tempo/dashboard/components/core/CardSpacer';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import SeoForm from '@tempo/dashboard/components/forms/SeoForm';
import type { ProductErrorFragment } from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
    <CategoryCreateForm onSubmit={onSubmit} disabled={disabled}>
      {({ data, change, handlers, submit, isSaveDisabled }) => (
        <Container>
          <Backlink href={backUrl}>{m.dashboard_categories() ?? 'Categories'}</Backlink>
          <PageHeader
            title={t(
              'dashboard_gsY/X',
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
              helperText={
                m.dashboard_QdR_M() ??
                'Add search engine title and description to make this category easier to find'
              }
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
