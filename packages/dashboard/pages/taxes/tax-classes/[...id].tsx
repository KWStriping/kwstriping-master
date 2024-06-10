import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';

import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import TaxClassesPage from '@dashboard/components/taxes/pages/TaxClassesPage';
import { TaxClassesListDocument, TaxClassDeleteDocument } from '@core/api/graphql';
import type { TaxClassCreateErrorFragment, TaxClassFragment } from '@core/api/graphql';
import type { TaxClassesPageFormData } from '@dashboard/oldSrc/taxes/types';
import type { TaxTab } from '@dashboard/oldSrc/taxes/urls';
import { taxClassesListUrl, taxTabPath } from '@dashboard/oldSrc/taxes/urls';
import {
  createTaxClassCreationInput,
  createTaxClassUpdateInput,
} from '@dashboard/oldSrc/taxes/utils/data';
import { useTaxUrlRedirect } from '@dashboard/oldSrc/taxes/utils/useTaxUrlRedirect';
import { mapUndefinedCountriesToTaxClasses } from '@dashboard/oldSrc/taxes/utils/utils';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import type { CreateMetadataHandlerFunctionResult } from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';

interface TaxClassesListProps {
  id: string | undefined;
}

export const TaxClassesList: FC<TaxClassesListProps> = ({ id }) => {
  const router = useRouter();
  const notify = useNotifier();
  const { t } = useTranslation();

  const handleTabChange = (tab: TaxTab) => {
    void router.push(taxTabPath(tab));
  };

  const newTaxClass: TaxClassFragment = useMemo(
    () => ({
      __typename: 'TaxClass' as const,
      id: 'new',
      name: t('dashboard.ewTaxClass', 'New tax class'),
      countries: [],
      metadata: [],
      privateMetadata: [],
    }),
    [t]
  );

  const isNewTaxClass = id === 'new';

  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [deleteTaxClassMutation] = useMutation(TaxClassDeleteDocument, {
    onCompleted: (data) => {
      const errors = data?.deleteTaxClass?.errors;
      if (errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });

  const [updateTaxClassMutation, updateTaxClassMutationState] = useMutation(
    TaxClassUpdateDocument,
    {
      onCompleted: (data) => {
        const errors = data?.updateTaxClass?.errors;
        if (errors?.length === 0) {
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
        }
      },
    }
  );

  const [createTaxClassMutation, createTaxClassMutationState] = useMutation(
    TaxClassCreateDocument,
    {
      onCompleted: (data) => {
        const errors = data?.createTaxClass?.errors;
        if (errors?.length === 0) {
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
          void router.push(taxClassesListUrl(data?.createTaxClass?.taxClass?.id));
        }
      },
    }
  );

  const createTaxClass = async (
    data: TaxClassesPageFormData
  ): Promise<CreateMetadataHandlerFunctionResult<TaxClassCreateErrorFragment>> => {
    const res = await createTaxClassMutation({
      variables: {
        input: createTaxClassCreationInput(data),
      },
    });

    const createTaxClass = res?.data?.createTaxClass;

    return {
      id: createTaxClass?.taxClass?.id,
      errors: createTaxClass?.errors,
    };
  };

  const handleDeleteTaxClass = async (id: string) => {
    if (isNewTaxClass) {
      void router.push('/taxes/tax-classes');
    } else {
      await deleteTaxClassMutation({
        variables: {
          id,
        },
      });
      refetch();
      void router.push('/taxes/tax-classes');
    }
  };

  const updateTaxClass = async (data: TaxClassesPageFormData) => {
    const res = await updateTaxClassMutation({
      variables: {
        id: data?.id,
        input: createTaxClassUpdateInput(data),
      },
    });

    return res?.data?.updateTaxClass?.errors || [];
  };

  const [{ data, refetch }] = useQuery(TaxClassesListDocument, {
    variables: { first: 100 },
  });
  const { data: countryRatesData } = useQuery(TaxCountriesListDocument, {});

  const taxClasses = useMemo(() => {
    if (
      data?.taxClasses === undefined ||
      countryRatesData?.taxCountryConfigurations === undefined
    ) {
      return undefined;
    }

    const apiTaxClasses = mapEdgesToItems(data?.taxClasses);
    const connectedTaxClasses = isNewTaxClass ? [newTaxClass, ...apiTaxClasses] : apiTaxClasses;

    return mapUndefinedCountriesToTaxClasses(
      countryRatesData.taxCountryConfigurations,
      connectedTaxClasses
    );
  }, [countryRatesData?.taxCountryConfigurations, data?.taxClasses, isNewTaxClass, newTaxClass]);

  const selectedTaxClass = useMemo(() => {
    if (isNewTaxClass) {
      return newTaxClass;
    }

    return taxClasses?.find((taxClass) => taxClass.id === id);
  }, [id, isNewTaxClass, newTaxClass, taxClasses]);

  const handleCreateTaxClass = createMetadataCreateHandler(
    createTaxClass,
    updateMetadata,
    updatePrivateMetadata,
    (id) => {
      refetch();
      void router.push(id);
    }
  );

  const handleUpdateTaxClass = createMetadataUpdateHandler(
    selectedTaxClass,
    updateTaxClass,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  const savebarState = isNewTaxClass
    ? createTaxClassMutationState.status
    : updateTaxClassMutationState.status;

  useTaxUrlRedirect({
    id,
    data: taxClasses,
    urlFunction: taxClassesListUrl,
  });

  return (
    <TaxClassesPage
      taxClasses={taxClasses}
      handleTabChange={handleTabChange}
      selectedTaxClassId={id}
      savebarState={savebarState}
      disabled={false}
      onCreateNewButtonClick={() => {
        void router.push(taxClassesListUrl('new'));
      }}
      onTaxClassCreate={handleCreateTaxClass}
      onTaxClassUpdate={handleUpdateTaxClass}
      onTaxClassDelete={handleDeleteTaxClass}
    />
  );
};

export default TaxClassesList;
