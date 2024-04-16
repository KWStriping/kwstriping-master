import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { makeStyles } from '@core/ui/theme/styles';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';
import PreviewPill from '@dashboard/components/core/PreviewPill';
import { RadioGroupField } from '@dashboard/components/fields/RadioGroupField';
import { FormSpacer } from '@dashboard/components/forms/Form/FormSpacer';
import { WarehouseClickAndCollectOption } from '@core/api/constants';
import type { WarehouseWithShippingFragment } from '@core/api/graphql';
import { renderCollection } from '@core/ui/utils';
import { shippingZoneUrl } from '@dashboard/oldSrc/shipping/urls';
import type { RelayToFlat } from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import type { ChangeEvent, FC } from 'react';

import type { WarehouseDetailsPageFormData } from '../WarehouseDetailsPage';

export interface WarehouseSettingsProps {
  zones: RelayToFlat<WarehouseWithShippingFragment['shippingZones']>;
  disabled: boolean;
  data: WarehouseDetailsPageFormData;
  onChange: (event: ChangeEvent<unknown>) => void;
  setData: (data: Partial<WarehouseDetailsPageFormData>) => void;
}
const useStyles = makeStyles(
  (theme) => ({
    link: {
      '&:not(:last-of-type)': {
        marginBottom: theme.spacing(1),
      },
    },
    preview: {
      marginLeft: theme.spacing(1),
    },
  }),
  {
    name: 'WarehouseInfoProps',
  }
);

const WarehouseSettings: FC<WarehouseSettingsProps> = ({
  zones,
  disabled,
  data,
  onChange,
  setData,
}) => {
  useEffect(() => {
    if (data?.isPrivate && data?.clickAndCollectOption === WarehouseClickAndCollectOption.Local) {
      setData({
        clickAndCollectOption: WarehouseClickAndCollectOption.Disabled,
      });
    }
  }, [data?.isPrivate]);
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  const booleanRadioHandler = ({ target: { name, value } }) => {
    setData({ [name]: value === 'true' });
  };

  const isPrivateChoices = [
    {
      label: (
        <>
          {t('dashboard.warehouseSettingsPrivateStock', 'Private Stock')}
          <Typography variant="caption" color="textSecondary">
            {t(
              'dashboard.warehouseSettingsPrivateStockDescription',
              "If enabled stock in this warehouse won't be shown"
            )}
          </Typography>
          <FormSpacer />
        </>
      ),
      value: 'true',
    },
    {
      label: (
        <>
          {t('dashboard.warehouseSettingsPublicStock', 'Public Stock')}
          <Typography variant="caption" color="textSecondary">
            {t(
              'dashboard.warehouseSettingsPublicStockDescription',
              'If enabled stock in this warehouse will be shown'
            )}
          </Typography>
        </>
      ),
      value: 'false',
    },
  ];

  const clickAndCollectChoicesPublic = [
    {
      label: (
        <>
          {t('dashboard.warehouseSettingsDisabled', 'Disabled')}
          <Typography variant="caption" color="textSecondary">
            {t(
              'dashboard.warehouseSettingsDisabledDescription',
              "If selected customer won't be able to choose this warehouse as pickup point"
            )}
          </Typography>
          <FormSpacer />
        </>
      ),
      value: WarehouseClickAndCollectOption.Disabled,
    },
    {
      label: (
        <>
          {t('dashboard.warehouseSettingsLocal', 'Local stock only')}
          <Typography variant="caption" color="textSecondary">
            {t(
              'dashboard.warehouseSettingsLocalDescription',
              'If selected customer will be able to choose this warehouse as pickup point. Ordered products will be only fulfilled from this warehouse stock'
            )}
          </Typography>
          <FormSpacer />
        </>
      ),
      value: WarehouseClickAndCollectOption.Local,
    },
    {
      label: (
        <>
          {t('dashboard.warehouseSettingsAllWarehouses', 'All warehouses')}
          <Typography variant="caption" color="textSecondary">
            {t(
              'dashboard.warehouseSettingsAllWarehousesDescription',
              'If selected customer will be able to choose this warehouse as pickup point. Ordered products can be shipped here from a different warehouse'
            )}
          </Typography>
        </>
      ),
      value: WarehouseClickAndCollectOption.All,
    },
  ];

  const clickAndCollectChoices = clickAndCollectChoicesPublic.filter(
    (choice) => choice.value !== WarehouseClickAndCollectOption.Local
  );

  return (
    <Card>
      <CardTitle title={t('dashboard.warehouseSettingsTitle', 'Settings')} />
      <CardContent>
        {renderCollection(
          zones,
          (zone) =>
            zone ? (
              <div className={styles.link ?? ''} key={zone.id}>
                <Link underline href={shippingZoneUrl(zone.id)}>
                  {zone.name}
                </Link>
              </div>
            ) : (
              <Skeleton />
            ),
          () => (
            <Typography color="textSecondary">
              {t(
                'dashboard.warehouseSettingsNoShippingZonesAssigned',
                'This warehouse has no shipping zones assigned.'
              )}
            </Typography>
          )
        )}
      </CardContent>
      <Divider />
      <CardContent>
        <CardSpacer />
        <RadioGroupField
          disabled={disabled}
          choices={isPrivateChoices}
          onChange={booleanRadioHandler}
          value={data?.isPrivate?.toString()}
          name="isPrivate"
          alignTop={true}
        />
      </CardContent>
      <Divider />
      <CardContent>
        <Typography color="textSecondary" variant="h6">
          {t('dashboard.warehouseSettingsPickupTitle', 'Pickup')}
          <PreviewPill className={styles.preview ?? ''} />
        </Typography>
        <CardSpacer />
        <RadioGroupField
          disabled={disabled}
          choices={data?.isPrivate ? clickAndCollectChoices : clickAndCollectChoicesPublic}
          onChange={onChange}
          value={data?.clickAndCollectOption}
          name="clickAndCollectOption"
          alignTop={true}
        />
      </CardContent>
    </Card>
  );
};

WarehouseSettings.displayName = 'WarehouseInfo';
export default WarehouseSettings;
