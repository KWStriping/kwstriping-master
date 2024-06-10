import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { makeStyles } from '@tempo/ui/theme/styles';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata/types';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import Form from '@tempo/dashboard/components/forms/Form';
import { AttributeType } from '@tempo/api/generated/constants';
import type { PageErrorFragment, PageKlassDetailsFragment } from '@tempo/api/generated/graphql';
import type { ListActions, ReorderEvent } from '@tempo/dashboard/oldSrc/types';
import { mapMetadataItemToInput } from '@tempo/dashboard/oldSrc/utils/maps';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import PageKlassAttributes from './PageKlassAttributes';
import PageKlassDetails from './PageKlassDetails';

export interface PageKlassForm extends MetadataFormData {
  name: string;
  attributes: SingleAutocompleteChoiceType[];
}

export interface PageKlassDetailsPageProps {
  errors: PageErrorFragment[];
  pageKlass: Maybe<PageKlassDetailsFragment>;
  disabled: boolean;
  pageTitle: string;
  attributeList: ListActions;
  saveButtonBarState: ConfirmButtonTransitionState;
  onAttributeAdd: (type: AttributeType) => void;
  onAttributeReorder: (event: ReorderEvent, type: AttributeType) => void;
  onAttributeUnassign: (id: string) => void;
  onDelete: () => void;
  onSubmit: (data: PageKlassForm) => void;
}

const useStyles = makeStyles(
  (theme) => ({
    hr: {
      gridColumnEnd: 'span 2',
      margin: theme.spacing(1, 0),
    },
  }),
  {
    name: 'PageKlassDetailsPage',
  }
);

const PageKlassDetailsPage: FC<PageKlassDetailsPageProps> = (props) => {
  const {
    disabled,
    errors,
    pageTitle,
    pageKlasses,
    attributeList,
    saveButtonBarState,
    onAttributeAdd,
    onAttributeUnassign,
    onAttributeReorder,
    onDelete,
    onSubmit,
  } = props;
  const styles = useStyles(props);
  const router = useRouter();

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  const formInitialData: PageKlassForm = {
    attributes:
      pageKlasses?.attributes?.map((attribute) => ({
        label: attribute.name,
        value: attribute.id,
      })) || [],
    metadata: pageKlass?.metadata?.map(mapMetadataItemToInput),
    name: pageKlass?.name || '',
    privateMetadata: pageKlass?.privateMetadata?.map(mapMetadataItemToInput),
  };

  const handleSubmit = (data: PageKlassForm) => {
    const metadata = isMetadataModified ? data?.metadata : undefined;
    const privateMetadata = isPrivateMetadataModified ? data?.privateMetadata : undefined;

    onSubmit({
      ...data,
      metadata,
      privateMetadata,
    });
  };

  return (
    <Form confirmLeave initial={formInitialData} onSubmit={handleSubmit} disabled={disabled}>
      {({ change, data, isSaveDisabled, submit }) => {
        const changeMetadata = makeMetadataChangeHandler(change);

        return (
          <Container>
            <Backlink href={'/page-types'}>{m.dashboard_pageKlasses() ?? 'Page Types'}</Backlink>
            <PageHeader title={pageTitle} />
            <Grid variant="inverted">
              <div>
                <Typography>
                  {m.dashboard_generalInformation() ?? 'General Information'}
                </Typography>
                <Typography variant="body2">
                  <>
                    {t(
                      'dashboard_ZfIl/',
                      'These are general information about this Content Type.'
                    )}
                  </>
                </Typography>
              </div>
              <PageKlassDetails
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <Divider className={styles.hr ?? ''} />
              <div>
                <Typography>
                  <>
                    {/* section header */}

                    {m.dashboard_Qxjow() ?? 'Content Attributes'}
                  </>
                </Typography>
                <Typography variant="body2">
                  <>
                    {m.dashboard_ct_qd() ??
                      'This list shows all attributes that will be assigned to pages that have this page type assigned.'}
                  </>
                </Typography>
              </div>
              <PageKlassAttributes
                attributes={pageKlass?.attributes}
                disabled={disabled}
                type={AttributeType.PageKlass}
                onAttributeAssign={onAttributeAdd}
                onAttributeReorder={(event: ReorderEvent) =>
                  onAttributeReorder(event, AttributeType.PageKlass)
                }
                onAttributeUnassign={onAttributeUnassign}
                {...attributeList}
              />
              <Divider className={styles.hr ?? ''} />
              <div>
                <Typography>
                  <>
                    {/* section header */}

                    {m.dashboard_VOU_z() ?? 'Metadata'}
                  </>
                </Typography>
              </div>
              <Metadata data={data} onChange={changeMetadata} />
            </Grid>
            <SaveBar
              onCancel={() => router.push('/page-types')}
              onDelete={onDelete}
              onSubmit={submit}
              disabled={isSaveDisabled}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};
PageKlassDetailsPage.displayName = 'PageKlassDetailsPage';
export default PageKlassDetailsPage;
