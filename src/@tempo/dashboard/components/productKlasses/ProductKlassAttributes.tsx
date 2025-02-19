import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import type { ProductAttributeType } from '@tempo/api/generated/constants';
import type { AttributeFragment } from '@tempo/api/generated/graphql';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import {
  SortableTableBody,
  SortableTableRow,
} from '@tempo/dashboard/components/tables/SortableTable';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { attributeUrl } from '@tempo/dashboard/oldSrc/attributes/urls';
import type { ListActions, ReorderAction } from '@tempo/dashboard/oldSrc/types';

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
  return (
    <Card data-test-id="product-attributes">
      <CardTitle
        title={m.dashboard_productAttributes() ?? 'Product Attributes'}
        toolbar={
          <Button
            disabled={disabled}
            data-test-id={testId}
            color="secondary"
            onClick={() => onAttributeAssign(type)}
          >
            {m.dashboard_xPpRx() ?? 'Assign attribute'}
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
              {m.dashboard_Tr_o_() ?? 'Attribute name'}
            </TableCell>
            <TableCell className={styles.colName ?? ''}>
              <>
                {/* attribute internal name */}

                {m.dashboard_f_XSt() ?? 'Slug'}
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
ProductKlassAttributes.displayName = 'ProductKlassAttributes';
export default ProductKlassAttributes;
