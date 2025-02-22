import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { PageErrorFragment } from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import PageKlassDetails from './PageKlassDetails';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import Form from '@tempo/dashboard/components/forms/Form';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';

export interface PageKlassForm extends MetadataFormData {
  name: string;
}

export interface PageKlassCreatePageProps {
  errors: PageErrorFragment[];
  disabled: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit: (data: PageKlassForm) => void;
}

const formInitialData: PageKlassForm = {
  metadata: [],
  name: '',
  privateMetadata: [],
};

const useStyles = makeStyles(
  (theme) => ({
    hr: {
      gridColumnEnd: 'span 2',
      margin: theme.spacing(1, 0),
    },
  }),
  {
    name: 'PageKlassCreatePage',
  }
);

const PageKlassCreatePage: FC<PageKlassCreatePageProps> = (props) => {
  const { disabled, errors, saveButtonBarState, onSubmit } = props;
  const styles = useStyles(props);
  const router = useRouter();

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  return (
    <Form confirmLeave initial={formInitialData} onSubmit={onSubmit} disabled={disabled}>
      {({ change, data, submit, isSaveDisabled }) => {
        const changeMetadata = makeMetadataChangeHandler(change);

        return (
          <Container>
            <Backlink href={'/page-types'}>{m.dashboard_pageKlasses() ?? 'Page Types'}</Backlink>
            <PageHeader
              title={
                m.dashboard_aqRmN() ?? 'Create Page Type'
                // header
              }
            />
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

                    {m.dashboard_VOU_z() ?? 'Metadata'}
                  </>
                </Typography>
              </div>
              <Metadata data={data} onChange={changeMetadata} />
              <div></div>
            </Grid>
            <SaveBar
              onCancel={() => router.push('/page-types')}
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
PageKlassCreatePage.displayName = 'PageKlassCreatePage';
export default PageKlassCreatePage;
