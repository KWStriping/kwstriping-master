import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import { assert } from 'tsafe/assert';
import type { ShippingZoneCreateFormData } from '@dashboard/components/shipping/ShippingZoneCreatePage';
import ShippingZoneCreatePage from '@dashboard/components/shipping/ShippingZoneCreatePage';
import { ShopCountriesDocument, CreateShippingZoneDocument } from '@core/api/graphql';
import { shippingZoneUrl } from '@dashboard/oldSrc/shipping/urls';
import { mapCountriesToCountriesCodes } from '@dashboard/oldSrc/utils/maps';

const ShippingZoneCreate = () => {
  const router = useRouter();
  const notify = useNotifier();
  const shop = useShopSettings();
  const { t } = useTranslation();

  const [{ data: restWorldCountries }] = useQuery(ShopCountriesDocument, {
    variables: {
      filter: {
        attachedToShippingZones: false,
      },
    },
  });

  const [createShippingZone, createShippingZoneOpts] = useMutation(CreateShippingZoneDocument, {
    onCompleted: (data) => {
      if (data?.createShippingZone?.errors?.length === 0) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        assert(data?.createShippingZone?.shippingZone?.id);
        void router.push(shippingZoneUrl(data?.createShippingZone?.shippingZone?.id));
      }
    },
  });

  const handleSubmit = (data: ShippingZoneCreateFormData) =>
    extractMutationErrors(
      createShippingZone({
        input: data,
      })
    );

  return (
    <ShippingZoneCreatePage
      countries={shop?.countries || []}
      restWorldCountries={mapCountriesToCountriesCodes(restWorldCountries?.shop?.countries) || []}
      disabled={createShippingZoneOpts.fetching}
      errors={createShippingZoneOpts.data?.createShippingZone?.errors || []}
      onSubmit={handleSubmit}
      saveButtonBarState={createShippingZoneOpts.status}
    />
  );
};
export default ShippingZoneCreate;
