import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import type { AttributeInput } from '@dashboard/components/attributes/AttributesCard';
import Attributes from '@dashboard/components/attributes/AttributesCard';
import VisibilityCard from '@dashboard/components/cards/VisibilityCard';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import Grid from '@core/ui/components/Grid';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import AssignValueDialog from '@dashboard/components/dialogs/AssignValueDialog';
import SeoForm from '@dashboard/components/forms/SeoForm';
import type {
  PageDetailsFragment,
  PageErrorWithAttributesFragment,
  SearchValuesQuery,
  SearchPagesQuery,
  SearchPageKlassesQuery,
  SearchProductsQuery,
} from '@core/api/graphql';
import useDateLocalize from '@dashboard/hooks/useDateLocalize';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import {
  getReferenceAttributeEntityTypeFromAttribute,
  mergeValues,
} from '@dashboard/oldSrc/attributes/utils/data';
import type { FetchMoreProps, RelayToFlat } from '@dashboard/oldSrc/types';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import PageInfo from '../PageInfo';
import PageOrganizeContent from '../PageOrganizeContent';
import type { PageData, PageUpdateHandlers } from './form';
import PageForm from './form';

export interface PageDetailsPageProps {
  loading: boolean;
  errors: PageErrorWithAttributesFragment[];
  page: Maybe<PageDetailsFragment>;
  pageKlasses?: RelayToFlat<NonNullable<SearchPageKlassesQuery['search']>>;
  referencePages?: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  referenceProducts?: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  allowEmptySlug?: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  selectedPageKlass?: PageDetailsFragment['pageKlass'];
  values: RelayToFlat<SearchValuesQuery['attribute']['choices']>;
  onRemove: () => void;
  onSubmit: (data: PageData) => SubmitPromise;
  fetchPageKlasses?: (data: string) => void;
  fetchMorePageKlasses?: FetchMoreProps;
  assignReferencesAttributeId?: string;
  onAssignReferencesClick: (attribute: AttributeInput) => void;
  fetchReferencePages?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchReferenceProducts?: (data: string) => void;
  fetchMoreReferenceProducts?: FetchMoreProps;
  fetchValues: (query: string, attributeId: string) => void;
  fetchMoreValues?: FetchMoreProps;
  onCloseDialog: () => void;
  onSelectPageKlass?: (pageKlassId: string) => void;
  onAttributeSelectBlur: () => void;
}

const PageDetailsPage: FC<PageDetailsPageProps> = ({
  loading,
  errors: apiErrors,
  page,
  pageKlasses: pageKlassesChoiceList,
  referencePages,
  referenceProducts,
  saveButtonBarState,
  selectedPageKlass,
  values,
  onRemove,
  onSubmit,
  fetchPageKlasses,
  fetchMorePageKlasses,
  assignReferencesAttributeId,
  onAssignReferencesClick,
  fetchReferencePages,
  fetchMoreReferencePages,
  fetchReferenceProducts,
  fetchMoreReferenceProducts,
  fetchValues,
  fetchMoreValues,
  onCloseDialog,
  onSelectPageKlass,
  onAttributeSelectBlur,
}) => {
  const { t } = useTranslation();
  const localizeDate = useDateLocalize();
  const router = useRouter();

  const pageExists = page !== null;

  const canOpenAssignReferencesAttributeDialog = !!assignReferencesAttributeId;

  const pageKlasses = pageKlassesChoiceList ? mapNodeToChoice(pageKlassesChoiceList) : [];

  const handleAssignReferenceAttribute = (
    values: string[],
    data: PageData,
    handlers: PageUpdateHandlers
  ) => {
    handlers.selectAttributeReference(
      assignReferencesAttributeId,
      mergeValues(assignReferencesAttributeId, values, data?.attributes)
    );
    onCloseDialog();
  };

  const handleSelectPageKlass = (pageKlassId: string) =>
    onSelectPageKlass && onSelectPageKlass(pageKlassId);

  return (
    <PageForm
      page={page}
      pageKlasses={pageKlassesChoiceList}
      selectedPageKlass={selectedPageKlass}
      onSelectPageKlass={handleSelectPageKlass}
      referencePages={referencePages}
      referenceProducts={referenceProducts}
      fetchReferencePages={fetchReferencePages}
      fetchMoreReferencePages={fetchMoreReferencePages}
      fetchReferenceProducts={fetchReferenceProducts}
      fetchMoreReferenceProducts={fetchMoreReferenceProducts}
      assignReferencesAttributeId={assignReferencesAttributeId}
      onSubmit={onSubmit}
      disabled={loading}
    >
      {({ change, data, validationErrors, handlers, submit, attributeRichTextGetters }) => {
        const errors = [...apiErrors, ...validationErrors];

        return (
          <Container>
            <Backlink href={'/pages'}>{t('dashboard.pages', 'Pages')}</Backlink>
            <PageHeader title={!pageExists ? t('dashboard.title', 'Create Page') : page?.title} />
            <Grid>
              <div>
                <PageInfo data={data} disabled={loading} errors={errors} onChange={change} />
                <CardSpacer />
                <SeoForm
                  errors={errors}
                  allowEmptySlug={!pageExists}
                  description={data?.seoDescription}
                  disabled={loading}
                  descriptionPlaceholder={''} // TODO: Cast description to string and trim it
                  onChange={change}
                  slug={data?.slug}
                  slugPlaceholder={data?.title}
                  title={data?.seoTitle}
                  titlePlaceholder={data?.title}
                  helperText={t(
                    'dashboard.eoOptionsDescription',
                    'Add search engine title and description to make this page easier to find'
                  )}
                />
                <CardSpacer />
                {!!data?.attributes?.length && (
                  <Attributes
                    attributes={data?.attributes}
                    values={values}
                    disabled={loading}
                    loading={loading}
                    errors={errors}
                    onChange={handlers.selectAttribute}
                    onMultiChange={handlers.selectAttributeMulti}
                    onFileChange={handlers.selectAttributeFile}
                    onReferencesRemove={handlers.selectAttributeReference}
                    onReferencesAddClick={onAssignReferencesClick}
                    onReferencesReorder={handlers.reorderValue}
                    fetchValues={fetchValues}
                    fetchMoreValues={fetchMoreValues}
                    onAttributeSelectBlur={onAttributeSelectBlur}
                    richTextGetters={attributeRichTextGetters}
                  />
                )}
                <CardSpacer />
                <Metadata data={data} onChange={handlers.changeMetadata} />
              </div>
              <div>
                <VisibilityCard
                  data={data}
                  errors={errors}
                  disabled={loading}
                  messages={{
                    hiddenLabel: t('dashboard.hiddenLabel', 'Hidden'),
                    hiddenSecondLabel: t(
                      'dashboard.hiddenSecondLabel',
                      'will be visible from {{date}}',
                      {
                        date: localizeDate(data?.publishedAt),
                      }
                    ),
                    visibleLabel: t('dashboard.isibleLabel', 'Visible'),
                  }}
                  onChange={change}
                />
                <CardSpacer />
                <PageOrganizeContent
                  data={data}
                  errors={errors}
                  disabled={loading}
                  pageKlasses={pageKlasses}
                  pageKlasses={data?.pageKlasses}
                  pageKlassesInputDisplayValue={data?.pageKlasses?.name || ''}
                  onPageKlassChange={handlers.selectPageKlass}
                  fetchPageKlasses={fetchPageKlasses}
                  fetchMorePageKlasses={fetchMorePageKlasses}
                  canChangeType={!page?.pageKlasses}
                />
              </div>
            </Grid>
            <SaveBar
              disabled={loading}
              state={saveButtonBarState}
              onCancel={() => router.push('/pages')}
              onDelete={page === null ? undefined : onRemove}
              onSubmit={submit}
            />
            {canOpenAssignReferencesAttributeDialog && (
              <AssignValueDialog
                entityType={getReferenceAttributeEntityTypeFromAttribute(
                  assignReferencesAttributeId,
                  data?.attributes
                )}
                confirmButtonState={'default'}
                products={referenceProducts}
                pages={referencePages}
                hasMore={handlers.fetchMoreReferences?.hasMore}
                open={canOpenAssignReferencesAttributeDialog}
                onFetch={handlers.fetchReferences}
                onFetchMore={handlers.fetchMoreReferences?.onFetchMore}
                loading={handlers.fetchMoreReferences?.fetching}
                onClose={onCloseDialog}
                onSubmit={(values) => handleAssignReferenceAttribute(values, data, handlers)}
              />
            )}
          </Container>
        );
      }}
    </PageForm>
  );
};
PageDetailsPage.displayName = 'PageDetailsPage';
export default PageDetailsPage;
