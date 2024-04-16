import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import TaxCountriesPage from '@dashboard/components/taxes/pages/TaxCountriesPage';
import TaxCountryDialog from '@dashboard/components/taxes/TaxCountryDialog';
import {
  TaxClassesListDocument,
  TaxCountryConfigurationDeleteDocument,
  TaxCountryConfigurationUpdateDocument,
} from '@core/api/graphql';
import type { CountryCode, TaxCountryConfigurationFragment } from '@core/api/graphql';
import { taxCountriesListUrl, taxTabPath } from '@dashboard/oldSrc/taxes/urls';
import type { TaxesUrlDialog, TaxesUrlQueryParams, TaxTab } from '@dashboard/oldSrc/taxes/urls';
import { useTaxUrlRedirect } from '@dashboard/oldSrc/taxes/utils/useTaxUrlRedirect';
import {
  excludeExistingCountries,
  mapUndefinedTaxRatesToCountries,
} from '@dashboard/oldSrc/taxes/utils/utils';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';

interface TaxCountriesListProps {
  id: string | undefined;
  params: TaxesUrlQueryParams | undefined;
}

export const TaxCountriesList = () => {
  const router = useRouter();
  const { id, ...params } = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();

  const handleTabChange = (tab: TaxTab) => {
    void router.push(taxTabPath(tab));
  };

  const [
    updateTaxCountryConfigurationMutation,
    { status: mutationStatus, fetching: mutationInProgress },
  ] = useMutation(TaxCountryConfigurationUpdateDocument, {
    onCompleted: (data) => {
      const errors = data?.updateTaxCountryConfiguration?.errors;
      if (errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });
  const [deleteTaxCountryConfigurationMutation] = useMutation(
    TaxCountryConfigurationDeleteDocument,
    {
      onCompleted: (data) => {
        const errors = data?.deleteTaxCountryConfiguration?.errors;
        if (errors?.length === 0) {
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
        }
      },
    }
  );

  const shop = useShopSettings();

  const [openDialog, closeDialog] = useDialogActionHandlers<TaxesUrlDialog, TaxesUrlQueryParams>(
    (params) => taxCountriesListUrl(id, params),
    params
  );

  const [newCountry, setNewCountry] = useState<TaxCountryConfigurationFragment>();

  const { data, refetch, loading: queryInProgress } = useQuery(TaxCountriesListDocument, {});
  const [{ data: taxClassesData }] = useQuery(TaxClassesListDocument, {
    variables: { first: 100 },
  });

  const taxCountryConfigurations = data?.taxCountryConfigurations;
  const taxClasses = mapEdgesToItems(taxClassesData?.taxClasses);

  const allCountryTaxes: TaxCountryConfigurationFragment[] = useMemo(() => {
    if (taxClasses && taxCountryConfigurations) {
      return [
        ...(newCountry ? [newCountry] : []),
        ...mapUndefinedTaxRatesToCountries(taxCountryConfigurations ?? [], taxClasses ?? []),
      ];
    } else {
      return undefined;
    }
  }, [taxCountryConfigurations, newCountry, taxClasses]);

  const handleDeleteConfiguration = async (countryCode: CountryCode) => {
    if (newCountry?.country.code === countryCode) {
      setNewCountry(undefined);
      return;
    }
    const res = await deleteTaxCountryConfigurationMutation({
      variables: {
        countryCode,
      },
    });
    refetch();
    return res;
  };

  useTaxUrlRedirect({
    id,
    data: allCountryTaxes,
    urlFunction: taxCountriesListUrl,
  });

  if (!id) return null;

  return (
    <>
      <TaxCountriesPage
        countryTaxesData={allCountryTaxes}
        selectedCountryId={id}
        handleTabChange={handleTabChange}
        openDialog={openDialog}
        onSubmit={async (data) => {
          const res = await updateTaxCountryConfigurationMutation({
            variables: {
              countryCode: id as CountryCode,
              updateTaxClassRates: data,
            },
          });
          refetch();
          setNewCountry(undefined);
          return res;
        }}
        onDeleteConfiguration={handleDeleteConfiguration}
        savebarState={mutationStatus}
        disabled={mutationInProgress || queryInProgress}
      />
      {shop?.countries && (
        <TaxCountryDialog
          open={params?.action === 'add-country'}
          countries={excludeExistingCountries(shop?.countries, allCountryTaxes)}
          onConfirm={(data) => {
            closeDialog();
            const taxClassCountryRates = taxClasses.map((taxClass) => ({
              __typename: 'TaxClassCountryRate' as const,
              rate: undefined,
              taxClass,
            }));
            taxClassCountryRates.unshift({
              rate: undefined,
              taxClass: null,
              __typename: 'TaxClassCountryRate' as const,
            });
            setNewCountry({
              country: data,
              taxClassCountryRates,
              __typename: 'TaxCountryConfiguration' as const,
            });
            void router.push(taxCountriesListUrl(data?.code));
          }}
          onClose={closeDialog}
        />
      )}
    </>
  );
};

export default TaxCountriesList;
