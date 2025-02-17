import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import Grid from '@tempo/ui/components/Grid';
import Skeleton from '@mui/material/Skeleton';
import type {
  ProductErrorWithAttributesFragment,
  ProductFragment,
} from '@tempo/api/generated/graphql';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { FormsetAtomicData, FormsetChange } from '@tempo/dashboard/hooks/useFormset';
import { getProductAttributeErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors/product';

export interface ProductAttributeInputData {
  values: Array<
    | ProductFragment['selectionAttributes'][0]['attribute']['choices']['edges'][0]
    | ProductFragment['nonSelectionAttributes'][0]['attribute']['choices']['edges'][0]
  >;
}
export type ProductAttributeInput = FormsetAtomicData<ProductAttributeInputData, string>;

interface ProductAttributesProps {
  attributes: ProductAttributeInput[];
  disabled: boolean;
  errors: ProductErrorWithAttributesFragment[];
  onChange: FormsetChange<ProductAttributeInputData>;
}

function getAttributeDisplayValue(
  id: string,
  slug: string,
  attributes: ProductAttributeInput[]
): string {
  const attribute = attributes.find((attr) => attr.id === id);
  const value = attribute.data?.values?.find((value) => value.node.slug === slug);
  if (value) {
    return value.node.name;
  }

  return slug || '';
}

function getValue(id: string, attributes: ProductAttributeInput[]): string {
  const attribute = attributes.find((attr) => attr.id === id);
  return attribute?.value === null ? undefined : attribute.value;
}

function getValueChoices(
  id: string,
  attributes: ProductAttributeInput[]
): SingleAutocompleteChoiceType[] {
  const attribute = attributes.find((attr) => attr.id === id);
  return attribute.data?.values?.map((value) => ({
    label: value.node.name,
    value: value.node.slug,
  }));
}

const ProductAttributes: FC<ProductAttributesProps> = ({
  attributes,
  disabled,
  errors,
  onChange,
}) => {
  return (
    <Card>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <Grid variant="uniform">
          {attributes === undefined ? (
            <Skeleton />
          ) : (
            attributes.map((attribute) => {
              const error = errors.find((err) => err.attributes?.includes(attribute.id));

              return (
                <SingleAutocompleteSelectField
                  key={attribute.id}
                  disabled={disabled}
                  displayValue={getAttributeDisplayValue(
                    attribute.id,
                    attribute.value,
                    attributes
                  )}
                  error={!!error}
                  helperText={getProductAttributeErrorMessage(error, t)}
                  label={attribute.label}
                  name={`attribute:${attribute.id}`}
                  onChange={(event) => onChange(attribute.id, event.target.value)}
                  value={getValue(attribute.id, attributes)}
                  choices={getValueChoices(attribute.id, attributes)}
                  allowCustomValues
                  data-test-id="variant-attribute-input"
                />
              );
            })
          )}
        </Grid>
        {!!errors?.length && (
          <>
            <FormSpacer />
            {errors
              .filter((error) => error.field === 'attributes' && error.attributes === null)
              .map((error) => (
                <Typography color="error" key={error.code}>
                  {getProductAttributeErrorMessage(error, t)}
                </Typography>
              ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};
ProductAttributes.displayName = 'ProductAttributes';
export default ProductAttributes;
