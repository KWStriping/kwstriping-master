import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC, ChangeEvent } from 'react';

import type { AttributePageFormData } from './AttributePage';
import { AttributeType } from '@tempo/api/generated/constants';
import RadioGroupField from '@tempo/dashboard/components/fields/RadioGroupField';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface AttributeOrganizationProps {
  canChangeType: boolean;
  data: AttributePageFormData;
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const useStyles = makeStyles(
  (theme) => ({
    card: {
      overflow: 'visible',
    },
    cardSubtitle: {
      fontSize: theme.typography.body1.fontSize,
      marginBottom: theme.spacing(0.5),
    },
    label: {
      marginBottom: theme.spacing(0.5),
    },
  }),
  { name: 'AttributeOrganization' }
);

const AttributeOrganization: FC<AttributeOrganizationProps> = (props) => {
  const { canChangeType, data, disabled, onChange } = props;
  // const styles = useStyles();
  const styles = {};

  return (
    <Card>
      <CardTitle title={m.dashboard_organizationSectionHeader() ?? 'Organization'} />
      <CardContent>
        {canChangeType ? (
          <RadioGroupField
            choices={[
              {
                label: m.dashboard_productAttribute() ?? 'Product Attribute',
                value: AttributeType.ProductKlass,
              },
              {
                label: m.dashboard_contentAttribute() ?? 'Content Attribute',
                value: AttributeType.PageKlass,
              },
            ]}
            disabled={disabled}
            label={
              <>
                {m.dashboard__pNHW() ?? 'Attribute Class'}
                <Typography variant="caption">
                  {m.dashboard_rNH_D() ??
                    'Define where this attribute should be used in Tempo system'}
                </Typography>
              </>
            }
            name={'type' as keyof FormData}
            value={data?.type}
            onChange={onChange}
          />
        ) : (
          <>
            <Typography className={styles.label ?? ''} variant="caption">
              {m.dashboard__pNHW() ?? 'Attribute Class'}
            </Typography>
            <Typography>
              {data?.type === AttributeType.ProductKlass
                ? m.dashboard_productAttribute() ?? 'Product Attribute'
                : m.dashboard_contentAttribute() ?? 'Content Attribute'}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};
AttributeOrganization.displayName = 'AttributeOrganization';
export default AttributeOrganization;
