import * as m from '@paraglide/messages';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type {
  AttributeEntityType,
  AttributeInputType,
  ValueDetailsFragment,
  ValueFragment,
  MeasurementUnit,
  PageErrorWithAttributesFragment,
  ProductErrorWithAttributesFragment,
  ProductAttributeScope,
} from '@tempo/api/generated/graphql';
import type { FormsetAtomicData } from '@tempo/dashboard/hooks/useFormset';
import type { AttributeReference } from '@tempo/dashboard/oldSrc/attributes/utils/data';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import type { RichTextGetters } from '@tempo/dashboard/oldSrc/utils/richText/useMultipleRichText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import type { FC, ReactNode } from 'react';
import AttributeRow from './AttributeRow';
import styles from './index.module.css';

import type { AttributeRowHandlers } from './types';

export interface AttributeInputData {
  inputType: AttributeInputType;
  entityType?: AttributeEntityType;
  unit?: MeasurementUnit | null;
  variantAttributeScope?: ProductAttributeScope;
  isRequired: boolean;
  values: ValueDetailsFragment[];
  selectedValues?: Maybe<ValueDetailsFragment[]>;
  references?: AttributeReference[];
}
export type AttributeInput = FormsetAtomicData<AttributeInputData, string[]>;
export type AttributeFileInput = FormsetAtomicData<AttributeInputData, File[]>;
export interface AttributesProps extends AttributeRowHandlers {
  attributes: AttributeInput[];
  values: ValueFragment[];
  fetchValues: (query: string, attributeId: string) => void;
  fetchMoreValues: FetchMoreProps;
  onAttributeSelectBlur: () => void;
  disabled: boolean;
  loading: boolean;
  errors: Array<ProductErrorWithAttributesFragment | PageErrorWithAttributesFragment>;
  title?: ReactNode;
  richTextGetters: RichTextGetters<string>;
}

const Attributes: FC<AttributesProps> = ({
  attributes,
  values,
  errors,
  title,
  onAttributeSelectBlur,
  richTextGetters,
  ...props
}) => {
  const [expanded, setExpansionStatus] = useState(true);
  const toggleExpansion = () => setExpansionStatus(!expanded);

  return (
    <Card className={styles.card ?? ''}>
      <CardTitle title={title || (m.dashboard_header() ?? 'Attributes')} />
      <CardContent className={styles.cardContent ?? ''}>
        <div className={styles.expansionBar ?? ''}>
          <div className={styles.expansionBarLabelContainer ?? ''}>
            <Typography className={styles.expansionBarLabel ?? ''} variant="caption">
              {m.dashboard_attributesNumber({
                count: attributes.length,
              }) ?? '{{count}} Attributes'}
            </Typography>
          </div>
          <IconButton
            color="secondary"
            hoverOutline={false}
            className={styles.expansionBarButton ?? ''}
            onClick={toggleExpansion}
            data-test-id="attributes-expand"
          >
            <ExpandMoreIcon
              className={clsx(styles.expansionBarButtonIcon, expanded && styles.rotate)}
            />
          </IconButton>
        </div>
        {expanded && !!attributes?.length && (
          <>
            <Divider />
            {attributes.map((attribute, attributeIndex) => {
              const error = errors.find((err) => err.attributes?.includes(attribute.id));

              return (
                <Fragment key={attribute.id}>
                  {attributeIndex > 0 && <Divider />}
                  <AttributeRow
                    attribute={attribute}
                    values={values}
                    error={error}
                    onAttributeSelectBlur={onAttributeSelectBlur}
                    richTextGetters={richTextGetters}
                    {...props}
                  />
                </Fragment>
              );
            })}
          </>
        )}
      </CardContent>
    </Card>
  );
};
Attributes.displayName = 'Attributes';
export default Attributes;
