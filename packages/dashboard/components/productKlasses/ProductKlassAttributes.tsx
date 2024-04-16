import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import { SortableTableBody, SortableTableRow } from '@dashboard/components/tables/SortableTable';
import { TableButtonWrapper } from '@dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableHead from '@dashboard/components/tables/TableHead';
import type { ProductAttributeType } from '@core/api/constants';
import type { AttributeFragment } from '@core/api/graphql';
import { attributeUrl } from '@dashboard/oldSrc/attributes/urls';
import type { ListActions, ReorderAction } from '@dashboard/oldSrc/types';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import type { FC } from 'react';

const useStyles = makeStyles(
  {
    colAction: {
      '&:last-child': {
        paddingRight: 0,
      },
      width: 84,
    },
    colGrab: {
      width: 60,
    },
    colSlug: {
      width: 300,
    },
    link: {
      cursor: 'pointer',
    },
  },
  { name: 'ProductKlassAttributes' }
);

interface ProductKlassAttributesProps extends ListActions {
  attributes: AttributeFragment[];
  disabled: boolean;
  type: ProductAttributeType;
  testId?: string;
  onAttributeAssign: (type: ProductAttributeType) => void;
  onAttributeReorder: ReorderAction;
  onAttributeUnassign: (id: string) => void;
}

const numberOfColumns = 5;

const ProductKlassAttributes: FC<ProductKlassAttributesProps> = ({
  attributes,
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
}) => {
  const styles = useStyles({});
  const { t } = useTranslation();
  return (
    <Card data-test-id="product-attributes">
      <CardTitle
        title={t('dashboard.productAttributes', 'Product Attributes')}
        toolbar={
          <Button
            disabled={disabled}
            data-test-id={testId}
            color="secondary"
            onClick={() => onAttributeAssign(type)}
          >
            {t('dashboard.xPpRx', 'Assign attribute')}
          </Button>
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col className={styles.colGrab ?? ''} />
          <col />
          <col className={styles.colName ?? ''} />
          <col className={styles.colSlug ?? ''} />
          <col className={styles.colAction ?? ''} />
        </colgroup>
        {!!attributes?.length && (
          <TableHead
            colSpan={numberOfColumns}
            disabled={disabled}
            dragRows
            selected={selected}
            items={attributes}
            toggleAll={toggleAll}
            toolbar={toolbar}
          >
            <TableCell className={styles.colName ?? ''}>
              {t('dashboard.Tr2o8', 'Attribute name')}
            </TableCell>
            <TableCell className={styles.colName ?? ''}>
              <>
                {/* attribute internal name */}

                {t('dashboard.f3XSt', 'Slug')}
              </>
            </TableCell>
            <TableCell />
          </TableHead>
        )}
        <SortableTableBody items={attributes.map(({ id }) => id)} onSortEnd={onAttributeReorder}>
          {renderCollection(
            attributes,
            (attribute) => {
              if (!attribute) return null;
              const isSelected = attribute ? isChecked(attribute.id) : false;
              return (
                <SortableTableRow
                  selected={isSelected}
                  className={styles.link ?? ''}
                  hover={!!attribute}
                  href={attributeUrl(attribute.id)}
                  key={attribute.id}
                  data-test-id={'id' + attribute.id}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(attribute.id)}
                    />
                  </TableCell>
                  <TableCell className={styles.colName ?? ''} data-test-id="name">
                    {attribute.name ? attribute.name : <Skeleton />}
                  </TableCell>
                  <TableCell className={styles.colSlug ?? ''} data-test-id="slug">
                    {attribute.slug ? attribute.slug : <Skeleton />}
                  </TableCell>
                  <TableCell className={styles.colAction ?? ''}>
                    <TableButtonWrapper>
                      <IconButton
                        data-test-id="delete-icon"
                        disabled={disabled}
                        color="secondary"
                        onClick={() => onAttributeUnassign(attribute.id)}
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
                  {t('dashboard.tQgD8', 'No attributes found')}
                </TableCell>
              </TableRow>
            )
          )}
        </SortableTableBody>
      </ResponsiveTable>
    </Card>
  );
};
ProductKlassAttributes.displayName = 'ProductKlassAttributes';
export default ProductKlassAttributes;
