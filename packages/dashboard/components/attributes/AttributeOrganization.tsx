import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC, ChangeEvent } from 'react';

import type { AttributePageFormData } from './AttributePage';
import { AttributeType } from '@core/api/constants';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import CardTitle from '@dashboard/components/core/CardTitle';

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
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle title={t('dashboard.organizationSectionHeader', 'Organization')} />
      <CardContent>
        {canChangeType ? (
          <RadioGroupField
            choices={[
              {
                label: t('dashboard.productAttribute', 'Product Attribute'),
                value: AttributeType.ProductKlass,
              },
              {
                label: t('dashboard.contentAttribute', 'Content Attribute'),
                value: AttributeType.PageKlass,
              },
            ]}
            disabled={disabled}
            label={
              <>
                {t('dashboard.1pNHW', 'Attribute Class')}
                <Typography variant="caption">
                  {t(
                    'dashboard.rNH3D',
                    'Define where this attribute should be used in Tempo system'
                  )}
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
              {t('dashboard.1pNHW', 'Attribute Class')}
            </Typography>
            <Typography>
              {data?.type === AttributeType.ProductKlass
                ? t('dashboard.productAttribute', 'Product Attribute')
                : t('dashboard.contentAttribute', 'Content Attribute')}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};
AttributeOrganization.displayName = 'AttributeOrganization';
export default AttributeOrganization;
