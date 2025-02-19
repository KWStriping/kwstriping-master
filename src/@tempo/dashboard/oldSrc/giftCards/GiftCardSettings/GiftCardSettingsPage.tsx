import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { useMutation } from '@tempo/api/hooks';
import { Grid } from '@tempo/ui/components/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import { GiftCardSettingsUpdateDocument } from '@tempo/api/generated/graphql';
import { TimePeriodType, GiftCardSettingsExpiryType } from '@tempo/api/generated/constants';
import { giftCardsListPath } from '../urls';
import GiftCardExpirySettingsCard from './GiftCardExpirySettingsCard';
import { giftCardExpirySettingsCard as expirySettingsMessages } from './GiftCardExpirySettingsCard/messages';
import { giftCardSettingsPageMessages as messages } from './messages';
import type { GiftCardSettingsFormData } from './types';
import { getGiftCardSettingsInputData } from './utils';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import { sectionNames } from '@tempo/dashboard/oldSrc/intl';
import Form from '@tempo/dashboard/components/forms/Form';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';

const GiftCardSettingsPage: FC = () => {
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
        {m.dashboard_giftCards() ?? sectionNames.giftCards.defaultMessage}
      </Backlink>
      <PageHeader
        preview
        title={m.dashboard_title() ?? messages.title.defaultMessage}
        underline={true}
      />
      <Form initial={initialData} onSubmit={handleSubmit}>
        {({ data: formData, submit, change }) => (
          <Grid variant="inverted">
            <div>
              <Typography>
                {m.dashboard_expiryDateSectionDescription() ??
                  expirySettingsMessages.expiryDateSectionDescription.defaultMessage}
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
