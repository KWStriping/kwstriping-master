import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';
import slugify from 'slugify';
import AttributeDetails from './AttributeDetails';
import AttributeOrganization from './AttributeOrganization';
import AttributeProperties from './AttributeProperties';
import Values from './Values';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import Metadata from '@dashboard/components/core/Metadata';
import type { MetadataFormData } from '@dashboard/components/core/Metadata/types';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import type { ListSettingsUpdate } from '@dashboard/components/tables/TablePagination';
import { AttributeInputType, AttributeType } from '@core/api/constants';
import type {
  AttributeDetailsFragment,
  AttributeDetailsQuery,
  AttributeEntityType,
  AttributeErrorFragment,
  MeasurementUnit,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { ATTRIBUTE_TYPES_WITH_DEDICATED_VALUES } from '@dashboard/oldSrc/attributes/utils/data';
import type { ListSettings, ReorderAction } from '@dashboard/oldSrc/types';
import { mapMetadataItemToInput } from '@dashboard/oldSrc/utils/maps';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';

export interface AttributePageProps {
  attribute: AttributeDetailsFragment | null;
  disabled: boolean;
  errors: AttributeErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  values: AttributeDetailsQuery['attribute']['choices'];
  onDelete: () => void;
  onSubmit: (data: AttributePageFormData) => SubmitPromise;
  onValueAdd: () => void;
  onValueDelete: (id: string) => void;
  onValueReorder: ReorderAction;
  onValueUpdate: (id: string) => void;
  settings?: ListSettings;
  onUpdateListSettings?: ListSettingsUpdate;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  onNextPage: () => void;
  onPreviousPage: () => void;
  children: (data: AttributePageFormData) => ReactNode;
}

export interface AttributePageFormData extends MetadataFormData {
  type: AttributeType;
  availableInGrid: boolean;
  filterableInDashboard: boolean;
  inputType: AttributeInputType;
  entityType: AttributeEntityType;
  filterableInStorefront: boolean;
  name: string;
  slug: string;
  storefrontSearchPosition: string;
  valueRequired: boolean;
  unit: MeasurementUnit | null | undefined;
  visibleInStorefront: boolean;
}

const AttributePage: FC<AttributePageProps> = ({
  attribute,
  disabled,
  errors: apiErrors,
  saveButtonBarState,
  values,
  onDelete,
  onSubmit,
  onValueAdd,
  onValueDelete,
  onValueReorder,
  onValueUpdate,
  settings,
  onUpdateListSettings,
  pageInfo,
  onNextPage,
  onPreviousPage,
  children,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  const initialForm: AttributePageFormData =
    attribute === null
      ? {
          availableInGrid: true,
          entityType: null,
          filterableInDashboard: true,
          filterableInStorefront: true,
          inputType: AttributeInputType.Dropdown,
          metadata: [],
          name: '',
          privateMetadata: [],
          slug: '',
          storefrontSearchPosition: '',
          type: AttributeType.ProductKlass,
          valueRequired: true,
          visibleInStorefront: true,
          unit: undefined,
        }
      : {
          availableInGrid: attribute?.availableInGrid ?? true,
          entityType: attribute?.entityType ?? null,
          filterableInDashboard: attribute?.filterableInDashboard ?? true,
          filterableInStorefront: attribute?.filterableInStorefront ?? true,
          inputType: attribute?.inputType ?? AttributeInputType.Dropdown,
          metadata: attribute?.metadata?.map(mapMetadataItemToInput),
          name: attribute?.name ?? '',
          privateMetadata: attribute?.privateMetadata?.map(mapMetadataItemToInput),
          slug: attribute?.slug ?? '',
          storefrontSearchPosition: attribute?.storefrontSearchPosition.toString() ?? '',
          type: attribute?.type || AttributeType.ProductKlass,
          valueRequired: !!attribute?.valueRequired ?? true,
          visibleInStorefront: attribute?.visibleInStorefront ?? true,
          unit: attribute?.unit || null,
        };

  const handleSubmit = (data: AttributePageFormData) => {
    const metadata = !attribute || isMetadataModified ? data?.metadata : undefined;
    const privateMetadata =
      !attribute || isPrivateMetadataModified ? data?.privateMetadata : undefined;
    const type = attribute === null ? data?.type : undefined;

    return onSubmit({
      ...data,
      metadata,
      privateMetadata,
      slug: data?.slug || slugify(data?.name).toLowerCase(),
      type,
    });
  };

  return (
    <Form confirmLeave initial={initialForm} onSubmit={handleSubmit} disabled={disabled}>
      {({ change, set, data, isSaveDisabled, submit, errors, setError, clearErrors }) => {
        const changeMetadata = makeMetadataChangeHandler(change);

        return (
          <>
            <Container>
              <Backlink href={'/attributes'}>{t('dashboard.attributes', 'Attributes')}</Backlink>
              <PageHeader
                title={
                  attribute
                    ? attribute.name
                    : t('dashboard.createNewAttributePageHeader', 'Create New Attribute')
                }
              />
              <Grid>
                <div>
                  <AttributeDetails
                    canChangeType={attribute === null}
                    data={data}
                    disabled={disabled}
                    apiErrors={apiErrors}
                    onChange={change}
                    set={set}
                    errors={errors}
                    setError={setError}
                    clearErrors={clearErrors}
                  />
                  {ATTRIBUTE_TYPES_WITH_DEDICATED_VALUES.includes(data?.inputType) && (
                    <>
                      <CardSpacer />
                      <Values
                        inputType={data?.inputType}
                        disabled={disabled}
                        values={mapEdgesToItems(values)}
                        onValueAdd={onValueAdd}
                        onValueDelete={onValueDelete}
                        onValueReorder={onValueReorder}
                        onValueUpdate={onValueUpdate}
                        settings={settings}
                        onUpdateListSettings={onUpdateListSettings}
                        pageInfo={pageInfo}
                        onNextPage={onNextPage}
                        onPreviousPage={onPreviousPage}
                      />
                    </>
                  )}
                  <CardSpacer />
                  <Metadata data={data} onChange={changeMetadata} />
                </div>
                <div>
                  <AttributeOrganization
                    canChangeType={attribute === null}
                    data={data}
                    disabled={disabled}
                    onChange={change}
                  />
                  <CardSpacer />
                  <AttributeProperties
                    data={data}
                    errors={apiErrors}
                    disabled={disabled}
                    onChange={change}
                  />
                </div>
              </Grid>
              <SaveBar
                disabled={isSaveDisabled}
                state={saveButtonBarState}
                onCancel={() => router.push('/attributes')}
                onSubmit={submit}
                onDelete={attribute === null ? undefined : onDelete}
              />
            </Container>
            {children(data)}
          </>
        );
      }}
    </Form>
  );
};
AttributePage.displayName = 'AttributePage';
export default AttributePage;
