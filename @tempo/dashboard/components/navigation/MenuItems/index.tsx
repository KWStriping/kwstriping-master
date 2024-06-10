import * as m from '@paraglide/messages';
import Button from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { useColorScheme } from '@tempo/ui/theme/styles';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Draggable from '@tempo/dashboard/oldSrc/icons/Draggable';
import type { RecursiveMenuItem } from '@tempo/dashboard/oldSrc/navigation/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import { useState, useEffect, useMemo } from 'react';

import type { TreeItem } from 'react-complex-tree';
import { UncontrolledTreeEnvironment, StaticTreeDataProvider, Tree } from 'react-complex-tree';
import { objectFromEntries } from 'tsafe';
import type { MenuItemType } from '../MenuItemDialog';
import styles from './index.module.css';
import type { TreeItemProps, TreeOperation } from './tree';
import { getNodeQuantity } from './tree';
import 'react-complex-tree/lib/style-modern.css';

export * from './tree';

const NODE_HEIGHT = 56;
const NODE_MARGIN = 40;

export interface MenuItemsProps {
  canUndo: boolean;
  items: Maybe<RecursiveMenuItem[]>;
  onChange: (operations: TreeOperation[]) => void;
  onItemAdd: () => void;
  onItemClick: (id: string, type: MenuItemType) => void;
  onItemEdit: (id: string) => void;
  onUndo: () => void;
}

const Placeholder: FC = (props) => {
  return (
    <Paper className={styles.row ?? ''} elevation={0}>
      <Typography>{m.dashboard_wZfNK() ?? 'Add new menu item to begin creating menu'}</Typography>
    </Paper>
  );
};

const Node: FC<NodeRendererProps<TreeItemProps>> = (props) => {
  const { node, path, connectDragPreview, connectDragSource, isDragging } = props;

  const draggedClassName = clsx(styles.rowContainer, styles.rowContainerDragged);
  const defaultClassName = isDragging ? draggedClassName : styles.rowContainer;
  const placeholderClassName = clsx(styles.rowContainer, styles.rowContainerPlaceholder);

  const [className, setClassName] = useState(defaultClassName);
  useEffect(() => setClassName(defaultClassName), [isDragging]);

  const handleDragStart = () => {
    setClassName(placeholderClassName);
    setTimeout(() => setClassName(defaultClassName), 0);
  };

  return connectDragPreview(
    <div
      className={className}
      style={{
        marginLeft: NODE_MARGIN * (path.length - 1),
      }}
    >
      <Paper className={styles.row ?? ''} elevation={0}>
        {connectDragSource(
          <div onDragStart={handleDragStart}>
            <Draggable className={styles.dragIcon ?? ''} />
          </div>
        )}
        <Typography className={styles.nodeTitle ?? ''} onClick={node.onEdit}>
          {node.title}
        </Typography>
        <div className={styles.spacer ?? ''} />
        <div className={styles.nodeActions ?? ''}>
          <Button onClick={node.onClick}>{m.dashboard_show() ?? 'Show'}</Button>
          <IconButton color="secondary" onClick={node.onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton
            className={styles.deleteButton ?? ''}
            color="secondary"
            onClick={() =>
              node.onChange?.([
                {
                  id: node.id,
                  type: 'remove',
                },
              ])
            }
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};

const MenuItems: FC<MenuItemsProps> = ({
  canUndo,
  items: _items,
  onChange,
  onItemAdd,
  onItemClick,
  onItemEdit,
  onUndo,
}) => {
  const items = useMemo(() => {
    if (!_items?.length) return undefined;
    const treeItems = _items.flatMap(convertMenuItemToTreeItems);
    const treeItemEntries = treeItems.map((item) => [item.index, item] as [string, TreeItem]);
    return objectFromEntries<[string, TreeItem]>([
      [
        'root',
        { index: 'root', data: 'Root', isFolder: true, children: _items.map(({ id }) => id) },
      ],
      ...treeItemEntries,
    ]);
  }, [_items]);
  const { mode } = useColorScheme();
  console.log('items', items);
  return (
    <Card>
      <CardTitle
        title={m.dashboard_menuItemsHeader() ?? 'Menu Items'}
        toolbar={
          <Button disabled={!canUndo} onClick={onUndo}>
            {m.dashboard_undo() ?? 'Undo'}
          </Button>
        }
      />
      <div
        className={clsx(styles.container, mode === 'dark' && styles.darkContainer)}
        style={{
          minHeight: (_items ? getNodeQuantity(_items) - 1 : 1) * NODE_HEIGHT,
          ...(items
            ? {}
            : {
                padding: '0 24px',
                paddingTop: 20,
              }),
        }}
      >
        {typeof items === 'undefined' ? (
          <Skeleton />
        ) : (
          <UncontrolledTreeEnvironment
            dataProvider={
              new StaticTreeDataProvider(items, (item, data) => {
                console.log('item', item, data);
                return { ...item, data };
              })
            }
            getItemTitle={(item) => item.data}
            viewState={{}}
            // className={styles.root ?? ''}
            // generateNodeProps={({ path }) => ({
            //   className: styles.row ?? '',
            //   style: {
            //     marginLeft: NODE_MARGIN * (path.length - 1),
            //   },
            // })}
            // maxDepth={5}
            // rowHeight={NODE_HEIGHT}
            // treeData={items.map((item) => getNodeData(item, onChange, onItemClick, onItemEdit))}
            // theme={{
            //   nodeContentRenderer: Node,
            // }}
            // onChange={(newTree) =>
            //   onChange(
            //     getDiff(
            //       items.map((item) => getNodeData(item, onChange, onItemClick, onItemEdit)),
            //       newTree as MenuTreeItem[]
            //     )
            //   )
            // }
            // placeholderRenderer={Placeholder}
          >
            <Tree treeId={'menu-item-tree'} rootItem={'root'} />
          </UncontrolledTreeEnvironment>
        )}
      </div>
      <CardActions className={styles.actions ?? ''}>
        <Button onClick={onItemAdd} data-test-id="create-new-menu-item">
          {m.dashboard_createNewMenuItem() ?? 'Create new item'}
        </Button>
      </CardActions>
    </Card>
  );
};

MenuItems.displayName = 'MenuItems';
export default MenuItems;

function convertMenuItemToTreeItems(item: RecursiveMenuItem): TreeItem[] {
  return [
    {
      data: item.name,
      index: item.id,
      canMove: true,
      canRename: true,
      isFolder: !!item.children?.length,
      children: item.children?.map(({ id }) => id),
    },
    ...(item.children?.flatMap(convertMenuItemToTreeItems) ?? []),
  ];
}
