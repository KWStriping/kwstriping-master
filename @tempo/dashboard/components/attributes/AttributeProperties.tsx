import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import ControlledSwitch from '@tempo/dashboard/components/widgets/ControlledSwitch';
import { AttributeType } from '@tempo/api/generated/constants';
import type { AttributeErrorFragment } from '@tempo/api/generated/graphql';
import { ATTRIBUTE_TYPES_WITH_CONFIGURABLE_FACED_NAVIGATION } from '@tempo/dashboard/oldSrc/attributes/utils/data';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getAttributeErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/attribute';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC, ChangeEvent } from 'react';

import type { AttributePageFormData } from '../AttributePage';

const messages = {
  availableInGrid: {
    id: 'jswILH',
    defaultMessage: 'Add to Column Options',
    description: 'add attribute as column in product list table',
  },
  availableInGridCaption: {
    id: 'AzMSmb',
    defaultMessage: 'If enabled this attribute can be used as a column in product table.',
    description: 'caption',
  },
  dashboardPropertiesTitle: {
    id: 'lCxfDe',
    defaultMessage: 'Dashboard Properties',
    description: 'attribute properties regarding dashboard',
  },
  filterableInDashboard: {
    id: 'RH+aOF',
    defaultMessage: 'Use in Filtering',
    description: 'use attribute in filtering',
  },
  filterableInDashboardCaption: {
    id: 'Q9wTrz',
    defaultMessage:
      'If enabled, you’ll be able to use this attribute to filter products in product list.',
    description: 'caption',
  },
  filterableInStorefront: {
    defaultMessage: 'Use as filter',
    id: 'e1vU/4',
    description: 'attribute is filterable in storefront',
  },
  storefrontPropertiesTitle: {
    id: 'AgY5Mv',
    defaultMessage: 'Storefront Properties',
    description: 'attribute properties regarding storefront',
  },
  storefrontSearchPosition: {
    id: 'cJ5ASN',
    defaultMessage: 'Position in faceted navigation',
    description: 'attribute position in storefront filters',
  },
  visibleInStorefront: {
    id: 'x8V/xS',
    defaultMessage: 'Public',
    description: 'attribute visibility in storefront',
  },
  visibleInStorefrontCaption: {
    id: 'h2Hta6',
    defaultMessage: 'If enabled, attribute will be accessible to customers.',
    description: 'caption',
  },
};

export interface AttributePropertiesProps {
  data: AttributePageFormData;
  disabled: boolean;
  errors: AttributeErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const AttributeProperties: FC<AttributePropertiesProps> = ({
  data,
  errors,
  disabled,
  onChange,
}) => {
  const formErrors = getFormErrors(['storefrontSearchPosition'], errors);

  const storefrontFacetedNavigationProperties =
    ATTRIBUTE_TYPES_WITH_CONFIGURABLE_FACED_NAVIGATION.includes(data?.inputType) &&
    data?.type === AttributeType.ProductKlass;

  return (
    <Card>
      <CardTitle title={m.dashboard_properties() ?? 'Properties'} />
      <CardContent>
        {storefrontFacetedNavigationProperties && (
          <>
            <ControlledCheckbox
              name={'filterableInStorefront' as keyof FormData}
              label={m.dashboard_filterableInStorefront() ?? 'Use as filter'}
              checked={data?.filterableInStorefront}
              onChange={onChange}
              disabled={disabled}
            />
            {data?.filterableInStorefront && (
              <>
                <FormSpacer />
                <TextField
                  disabled={disabled}
                  error={!!formErrors.storefrontSearchPosition}
                  fullWidth
                  helperText={getAttributeErrorMessage(formErrors.storefrontSearchPosition, t)}
                  name={'storefrontSearchPosition' as keyof AttributePageFormData}
                  label={
                    m.dashboard_storefrontSearchPosition() ??
                    messages.storefrontSearchPosition.defaultMessage
                  }
                  value={data?.storefrontSearchPosition}
                  onChange={onChange}
                />
              </>
            )}
            <FormSpacer />
          </>
        )}
        <ControlledSwitch
          name={'visibleInStorefront' as keyof FormData}
          label={
            <>
              {m.dashboard_isibleInStorefront() ?? messages.visibleInStorefront.defaultMessage}
              <Typography variant="caption">
                {m.dashboard_isibleInStorefrontCaption() ??
                  messages.visibleInStorefrontCaption.defaultMessage}
              </Typography>
            </>
          }
          checked={data?.visibleInStorefront}
          onChange={onChange}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
};
AttributeProperties.displayName = 'AttributeProperties';
export default AttributeProperties;
