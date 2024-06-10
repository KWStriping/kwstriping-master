import { useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import CardTitle from '@dashboard/components/core/CardTitle';
import type {
  AttributeEntityType,
  AttributeInputType,
  ValueDetailsFragment,
  ValueFragment,
  MeasurementUnit,
  PageErrorWithAttributesFragment,
  ProductErrorWithAttributesFragment,
  ProductAttributeScope,
} from '@core/api/graphql';
import type { FormsetAtomicData } from '@dashboard/hooks/useFormset';
import type { AttributeReference } from '@dashboard/oldSrc/attributes/utils/data';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import type { RichTextGetters } from '@dashboard/oldSrc/utils/richText/useMultipleRichText';
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
  const { t } = useTranslation();
  const [expanded, setExpansionStatus] = useState(true);
  const toggleExpansion = () => setExpansionStatus(!expanded);

  return (
    <Card className={styles.card ?? ''}>
      <CardTitle title={title || t('dashboard.header', 'Attributes')} />
      <CardContent className={styles.cardContent ?? ''}>
        <div className={styles.expansionBar ?? ''}>
          <div className={styles.expansionBarLabelContainer ?? ''}>
            <Typography className={styles.expansionBarLabel ?? ''} variant="caption">
              {t('dashboard.attributesNumber', '{{count}} Attributes', {
                count: attributes.length,
              })}
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
