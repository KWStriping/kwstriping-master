import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import PreviewPill from '@tempo/dashboard/components/core/PreviewPill';
import { RadioGroupField } from '@tempo/dashboard/components/fields/RadioGroupField';
import { FormSpacer } from '@tempo/dashboard/components/forms/Form/FormSpacer';
import { WarehouseClickAndCollectOption } from '@tempo/api/generated/constants';
import type { WarehouseWithShippingFragment } from '@tempo/api/generated/graphql';
import { renderCollection } from '@tempo/ui/utils';
import { shippingZoneUrl } from '@tempo/dashboard/oldSrc/shipping/urls';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';
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

  const booleanRadioHandler = ({ target: { name, value } }) => {
    setData({ [name]: value === 'true' });
  };

  const isPrivateChoices = [
    {
      label: (
        <>
          {m.dashboard_warehouseSettingsPrivateStock() ?? 'Private Stock'}
          <Typography variant="caption" color="textSecondary">
            {m.dashboard_warehouseSettingsPrivateStockDescription() ??
              "If enabled stock in this warehouse won't be shown"}
          </Typography>
          <FormSpacer />
        </>
      ),
      value: 'true',
    },
    {
      label: (
        <>
          {m.dashboard_warehouseSettingsPublicStock() ?? 'Public Stock'}
          <Typography variant="caption" color="textSecondary">
            {m.dashboard_warehouseSettingsPublicStockDescription() ??
              'If enabled stock in this warehouse will be shown'}
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
          {m.dashboard_warehouseSettingsDisabled() ?? 'Disabled'}
          <Typography variant="caption" color="textSecondary">
            {m.dashboard_warehouseSettingsDisabledDescription() ??
              "If selected customer won't be able to choose this warehouse as pickup point"}
          </Typography>
          <FormSpacer />
        </>
      ),
      value: WarehouseClickAndCollectOption.Disabled,
    },
    {
      label: (
        <>
          {m.dashboard_warehouseSettingsLocal() ?? 'Local stock only'}
          <Typography variant="caption" color="textSecondary">
            {m.dashboard_warehouseSettingsLocalDescription() ??
              'If selected customer will be able to choose this warehouse as pickup point. Ordered products will be only fulfilled from this warehouse stock'}
          </Typography>
          <FormSpacer />
        </>
      ),
      value: WarehouseClickAndCollectOption.Local,
    },
    {
      label: (
        <>
          {m.dashboard_warehouseSettingsAllWarehouses() ?? 'All warehouses'}
          <Typography variant="caption" color="textSecondary">
            {m.dashboard_warehouseSettingsAllWarehousesDescription() ??
              'If selected customer will be able to choose this warehouse as pickup point. Ordered products can be shipped here from a different warehouse'}
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
      <CardTitle title={m.dashboard_warehouseSettingsTitle() ?? 'Settings'} />
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
              {m.dashboard_warehouseSettingsNoShippingZonesAssigned() ??
                'This warehouse has no shipping zones assigned.'}
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
          {m.dashboard_warehouseSettingsPickupTitle() ?? 'Pickup'}
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
