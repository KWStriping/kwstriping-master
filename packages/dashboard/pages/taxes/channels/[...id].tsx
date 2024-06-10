import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';

import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { useRouter } from 'next/router';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import TaxChannelsPage from '@dashboard/components/taxes/pages/TaxChannelsPage';
import {
  TaxConfigurationsListDocument,
  TaxConfigurationUpdateDocument,
} from '@core/api/graphql';
import { taxConfigurationListUrl, taxTabPath } from '@dashboard/oldSrc/taxes/urls';
import type { TaxesUrlDialog, TaxesUrlQueryParams, TaxTab } from '@dashboard/oldSrc/taxes/urls';
import { useTaxUrlRedirect } from '@dashboard/oldSrc/taxes/utils/useTaxUrlRedirect';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';

interface TaxChannelsListProps {
  id: string | undefined;
  params: TaxesUrlQueryParams | undefined;
}

export const TaxChannelsList = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();

  const handleTabChange = (tab: TaxTab) => {
    void router.push(taxTabPath(tab));
  };

  const [
    updateTaxConfigurationMutation,
    { status: mutationStatus, fetching: mutationInProgress },
  ] = useMutation(TaxConfigurationUpdateDocument, {
    onCompleted: (data) => {
      const errors = data?.updateTaxConfiguration?.errors;
      if (errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });

  const shop = useShopSettings();

  const [openDialog, closeDialog] = useDialogActionHandlers<TaxesUrlDialog, TaxesUrlQueryParams>(
    (params) => taxConfigurationListUrl(id, params),
    params
  );

  const [{ data }] = useQuery(TaxConfigurationsListDocument, { variables: { first: 20 } });

  const taxConfigurations = mapEdgesToItems(data?.taxConfigurations);

  useTaxUrlRedirect({
    id,
    data: taxConfigurations,
    urlFunction: taxConfigurationListUrl,
    router,
  });

  if (id === 'undefined' && taxConfigurations) return null;

  return (
    <TaxChannelsPage
      taxConfigurations={taxConfigurations}
      selectedConfigurationId={id!}
      handleTabChange={handleTabChange}
      allCountries={shop?.countries}
      isDialogOpen={params?.action === 'add-country'}
      openDialog={openDialog}
      closeDialog={closeDialog}
      onSubmit={(input) =>
        updateTaxConfigurationMutation({
          variables: {
            id,
            input,
          },
        })
      }
      savebarState={mutationStatus}
      disabled={mutationInProgress}
    />
  );
};

export default TaxChannelsList;
