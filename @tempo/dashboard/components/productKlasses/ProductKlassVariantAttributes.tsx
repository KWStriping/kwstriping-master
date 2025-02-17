import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { Tooltip } from '@tempo/ui/components/Tooltip';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import type { ProductAttributeType } from '@tempo/api/generated/constants';
import type { ProductKlassDetailsQuery } from '@tempo/api/generated/graphql';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import capitalize from 'lodash-es/capitalize';
import type { FC } from 'react';
import { useEffect } from 'react';
import type { ListActions, ReorderAction } from '@tempo/dashboard/oldSrc/types';
import { attributeUrl } from '@tempo/dashboard/oldSrc/attributes/urls';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import {
  SortableTableBody,
  SortableTableRow,
} from '@tempo/dashboard/components/tables/SortableTable';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

const useStyles = makeStyles(
  (theme) => ({
    colAction: {
      '&:last-child': {
        paddingRight: 0,
      },
      width: 80,
    },
    colName: {
      width: 200,
    },
    colSlug: {
      width: 200,
    },
    colVariant: {
      width: 150,
    },
    colVariantContent: {
      display: 'flex',
      alignItems: 'center',
    },
    colVariantDisabled: {
      fill: theme.vars.palette.alert.icon.info,
      fillOpacity: 0.6,
      '&:hover': {
        fillOpacity: 1,
      },
    },
    link: {
      cursor: 'pointer',
    },
  }),
  { name: 'ProductKlassAttributes' }
);

interface ProductKlassVariantAttributesProps extends ListActions {
  productVariantAttributeAssignments: NonNullable<
    ProductKlassDetailsQuery['productKlass']
  >['productVariantAttributeAssignments'];
  disabled: boolean;
  type: ProductAttributeType;
  testId?: string;
  selectedVariantAttributes: string[];
  onAttributeAssign: (type: ProductAttributeType) => void;
  onAttributeReorder: ReorderAction;
  onAttributeUnassign: (id: string) => void;
  setSelectedVariantAttributes: (data: string[]) => void;
}

function handleContainerAssign(
  variantID: string,
  isSelected: boolean,
  selectedAttributes: string[],
  setSelectedAttributes: (data: string[]) => void
) {
  if (isSelected) {
    setSelectedAttributes(
      selectedAttributes.filter((selectedContainer) => selectedContainer !== variantID)
    );
  } else {
    setSelectedAttributes([...selectedAttributes, variantID]);
  }
}

const numberOfColumns = 6;

const ProductKlassVariantAttributes: FC<ProductKlassVariantAttributesProps> = ({
  productVariantAttributeAssignments,
  disabled,
  isChecked,
  selected,
  toggle,
  toggleAll,
  toolbar,
  type,
  testId,
  onAttributeAssign,
  onAttributeReorder,
  onAttributeUnassign,
  setSelectedVariantAttributes,
  selectedVariantAttributes,
}) => {
  const styles = useStyles({});

  useEffect(() => {
    // Populate initial selection - populated inside this component to preserve it's state between data reloads
    setSelectedVariantAttributes(
      productVariantAttributeAssignments
        ?.map((elem) => (elem.variantSelection ? elem.attribute.id : ''))
        .filter(Boolean) || []
    );
  }, []);

  if (!productVariantAttributeAssignments) return null; // TODO
  return (
    <Card data-test-id="variant-attributes">
      <CardTitle
        title={m.dashboard_kEK() / i ?? 'Variant Attributes'}
        toolbar={
          <Button data-test-id={testId} color="secondary" onClick={() => onAttributeAssign(type)}>
            {m.dashboard_xPpRx() ?? 'Assign attribute'}
          </Button>
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col className={'w-[60px]'} />
          <col />
          <col className={styles.colName ?? ''} />
          <col className={styles.colSlug ?? ''} />
          <col className={styles.colVariant ?? ''} />
          <col className={styles.colAction ?? ''} />
        </colgroup>
        {!!productVariantAttributeAssignments?.length && (
          <TableHead
            colSpan={numberOfColumns}
            disabled={disabled}
            dragRows
            selected={selected}
            items={productVariantAttributeAssignments?.map(
              (selectedAttribute) => selectedAttribute.attribute
            )}
            toggleAll={toggleAll}
            toolbar={toolbar}
          >
            <TableCell className={styles.colName ?? ''}>
              {m.dashboard_Tr_o_() ?? 'Attribute name'}
            </TableCell>
            <TableCell className={styles.colName ?? ''}>
              {m.dashboard_f_XSt() ?? 'Slug'}
            </TableCell>
            <TableCell className={styles.colName ?? ''}>
              {m.dashboard_k_rMQ() ?? 'Variant Selection'}
            </TableCell>
            <TableCell />
          </TableHead>
        )}
        <SortableTableBody
          items={productVariantAttributeAssignments.map(({ attribute }) => attribute.id)}
          onSortEnd={onAttributeReorder}
        >
          {renderCollection(
            productVariantAttributeAssignments,
            (assignedProductAttribute) => {
              const { attribute } = assignedProductAttribute;
              const isVariantSelected = assignedProductAttribute
                ? isChecked(attribute.id)
                : false;
              const isSelected = !!selectedVariantAttributes.find(
                (selectedAttribute) => selectedAttribute === attribute.id
              );
              const variantSelectionDisabled =
                !attribute.inputType ||
                !['DROPDOWN', 'BOOLEAN', 'SWATCH', 'NUMERIC'].includes(attribute.inputType);
              const readableAttributeInputType = capitalize(
                attribute.inputType?.split('_').join(' ')
              );

              return (
                <SortableTableRow
                  selected={isVariantSelected}
                  className={styles.link ?? ''}
                  hover={!!attribute}
                  href={attributeUrl(attribute.id)}
                  key={attribute.id}
                  // index={attributeIndex || 0}
                  data-test-id={'id-' + attribute.id}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isVariantSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(attribute.id)}
                    />
                  </TableCell>
                  <TableCell className={styles.colName ?? ''} data-test-id="name">
                    {attribute.name ?? <Skeleton />}
                  </TableCell>
                  <TableCell className={styles.colSlug ?? ''} data-test-id="slug">
                    {attribute.slug ? attribute.slug : <Skeleton />}
                  </TableCell>
                  <TableCell className={styles.colVariant ?? ''} data-test-id="variant-selection">
                    <div className={styles.colVariantContent ?? ''}>
                      <Checkbox
                        data-test-id="variant-selection-checkbox"
                        checked={isSelected}
                        disabled={disabled || variantSelectionDisabled}
                        disableClickPropagation
                        onChange={() =>
                          handleContainerAssign(
                            attribute.id,
                            isSelected,
                            selectedVariantAttributes,
                            setSelectedVariantAttributes
                          )
                        }
                      />
                      {!!variantSelectionDisabled && (
                        <Tooltip
                          title={
                            <Trans
                              id="vlLyvk"
                              defaultMessage="{inputType} attributes cannot be used as variant selection attributes."
                              values={{ inputType: readableAttributeInputType }}
                            />
                          }
                        >
                          <HelpOutline className={styles.colVariantDisabled ?? ''} />
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={styles.colAction ?? ''}>
                    <TableButtonWrapper>
                      <IconButton
                        data-test-id="delete-icon"
                        onClick={() => onAttributeUnassign(attribute.id)}
                        color="primary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableButtonWrapper>
                  </TableCell>
                </SortableTableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {m.dashboard_tQgD_() ?? 'No attributes found'}
                </TableCell>
              </TableRow>
            )
          )}
        </SortableTableBody>
      </ResponsiveTable>
    </Card>
  );
};
ProductKlassVariantAttributes.displayName = 'ProductKlassVariantAttributes';
export default ProductKlassVariantAttributes;
