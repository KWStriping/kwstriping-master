import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { makeStyles } from '@tempo/ui/theme/styles';
import { AttributeType } from '@tempo/api/generated/constants';
import type { AttributeFragment } from '@tempo/api/generated/graphql';
import { renderCollection } from '@tempo/ui/utils';
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
      width: 80,
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
  { name: 'PageKlassAttributes' }
);

interface PageKlassAttributesProps extends ListActions {
  attributes: AttributeFragment[];
  disabled: boolean;
  type: string;
  onAttributeAssign: (type: AttributeType) => void;
  onAttributeReorder: ReorderAction;
  onAttributeUnassign: (id: string) => void;
}

const numberOfColumns = 5;

const PageKlassAttributes: FC<PageKlassAttributesProps> = (props) => {
  const {
    attributes,
    disabled,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar,
    type,
    onAttributeAssign,
    onAttributeReorder,
    onAttributeUnassign,
  } = props;
  const styles = useStyles(props);

  return (
    <Card data-test-id="page-attributes">
      <CardTitle
        title={
          m.dashboard_Qxjow() ?? 'Content Attributes'
          // section header
        }
        toolbar={
          <Button
            color="secondary"
            onClick={() => onAttributeAssign(AttributeType[type])}
            data-test-id="assign-attributes"
          >
            <>
              {/* button */}

              {m.dashboard_xPpRx() ?? 'Assign attribute'}
            </>
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
                  // index={attributeIndex || 0}
                  data-test-id={'id-' + attribute?.id}
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
                    {attribute?.name || <Skeleton />}
                  </TableCell>
                  <TableCell className={styles.colSlug ?? ''} data-test-id="slug">
                    {attribute?.slug || <Skeleton />}
                  </TableCell>
                  <TableCell className={styles.colAction ?? ''}>
                    <TableButtonWrapper>
                      <IconButton
                        color="secondary"
                        onClick={() => onAttributeUnassign(attribute.id)}
                      >
                        <DeleteIcon color="primary" />
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
PageKlassAttributes.displayName = 'PageKlassAttributes';
export default PageKlassAttributes;
