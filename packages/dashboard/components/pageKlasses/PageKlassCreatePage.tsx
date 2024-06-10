import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { makeStyles } from '@core/ui/theme/styles';
import type { MetadataFormData } from '@dashboard/components/core/Metadata';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import type { PageErrorFragment } from '@core/api/graphql';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import PageKlassDetails from './PageKlassDetails';

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
  const { t } = useTranslation();
  const router = useRouter();

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  return (
    <Form confirmLeave initial={formInitialData} onSubmit={onSubmit} disabled={disabled}>
      {({ change, data, submit, isSaveDisabled }) => {
        const changeMetadata = makeMetadataChangeHandler(change);

        return (
          <Container>
            <Backlink href={'/page-types'}>{t('dashboard.pageKlasses', 'Page Types')}</Backlink>
            <PageHeader
              title={t(
                'dashboard.aqRmN',
                'Create Page Type'
                // header
              )}
            />
            <Grid variant="inverted">
              <div>
                <Typography>
                  {t('dashboard.generalInformation', 'General Information')}
                </Typography>
                <Typography variant="body2">
                  <>
                    {t(
                      'dashboard.ZfIl/',
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

                    {t('dashboard.VOU1z', 'Metadata')}
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
