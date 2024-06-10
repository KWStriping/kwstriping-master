import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { useMutation } from '@core/urql/hooks';
import { Grid } from '@core/ui/components/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import { giftCardsListPath } from '../urls';
import GiftCardExpirySettingsCard from './GiftCardExpirySettingsCard';
import { giftCardExpirySettingsCard as expirySettingsMessages } from './GiftCardExpirySettingsCard/messages';
import { giftCardSettingsPageMessages as messages } from './messages';
import type { GiftCardSettingsFormData } from './types';
import { getGiftCardSettingsInputData } from './utils';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import { sectionNames } from '@dashboard/oldSrc/intl';
import { GiftCardSettingsUpdateDocument } from '@core/api/graphql';
import {
  TimePeriodType,
  GiftCardSettingsExpiryType,
} from '@core/api/constants';
import Form from '@dashboard/components/forms/Form';
import SaveBar from '@dashboard/components/core/SaveBar';
import PageHeader from '@dashboard/components/core/PageHeader';

const GiftCardSettingsPage: FC = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, loading } = useQuery(GiftCardSettingsDocument, {});

  const settingsData = data?.giftCardSettings;

  const initialData: GiftCardSettingsFormData = {
    expiryPeriodActive: settingsData?.expiryType === GiftCardSettingsExpiryType.ExpiryPeriod,
    expiryPeriodType: settingsData?.expiryPeriod?.type || TimePeriodType.Year,
    expiryPeriodAmount: settingsData?.expiryPeriod?.amount || 1,
  };

  const [updateGiftCardSettings, updateGiftCardSettingsOpts] = useMutation(
    GiftCardSettingsUpdateDocument,
    {}
  );

  const handleSubmit = (formData: GiftCardSettingsFormData) => {
    updateGiftCardSettings({
      input: getGiftCardSettingsInputData(formData),
    });
  };

  const formLoading = loading || updateGiftCardSettingsOpts?.fetching;

  const apiErrors = updateGiftCardSettingsOpts?.data?.updateGiftCardSettings?.errors;

  const formErrors = getFormErrors(['expiryPeriod'], apiErrors);

  return (
    <Container>
      <Backlink href={giftCardsListPath}>
        {t('dashboard.giftCards', sectionNames.giftCards.defaultMessage)}
      </Backlink>
      <PageHeader
        preview
        title={t('dashboard.title', messages.title.defaultMessage)}
        underline={true}
      />
      <Form initial={initialData} onSubmit={handleSubmit}>
        {({ data: formData, submit, change }) => (
          <Grid variant="inverted">
            <div>
              <Typography>
                {t(
                  'dashboard.expiryDateSectionDescription',
                  expirySettingsMessages.expiryDateSectionDescription.defaultMessage
                )}
              </Typography>
            </div>
            <GiftCardExpirySettingsCard
              data={formData}
              disabled={formLoading}
              onChange={change}
              errors={formErrors}
            />
            <SaveBar
              onCancel={() => router.push(giftCardsListPath)}
              onSubmit={submit}
              disabled={formLoading}
              state={updateGiftCardSettingsOpts?.status}
            />
          </Grid>
        )}
      </Form>
    </Container>
  );
};

export default GiftCardSettingsPage;
