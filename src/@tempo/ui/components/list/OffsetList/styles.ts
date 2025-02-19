import type {
  BaseListItemCellClassKey,
  BaseListItemClassKey,
} from '@tempo/ui/components/list/BaseList';
import { makeStyles } from '@tempo/ui/theme/styles';

// eslint-disable-next-line ts/no-empty-object-type
export const useStyles = makeStyles<{}, BaseListItemCellClassKey | BaseListItemClassKey | 'body'>(
  (theme) => {
    const outerPadding = {
      '&:first-child': {
        paddingLeft: theme.spacing(4),
      },
      '&:last-child': {
        paddingRight: theme.spacing(4),
      },
    };

    return {
      row: {
        alignItems: 'center',
        display: 'grid',
        minHeight: 48,
        gap: theme.spacing(4),
      },
      rowBody: {
        '&:first-child': {
          marginTop: theme.spacing(1),
        },
        background: theme.vars.palette.background.paper,
        borderRadius: 6,
        boxShadow: theme.shadows[0],
        height: 90,
        margin: theme.spacing(1.5, 0),
        transition: `${theme.transitions.create('box-shadow')},${theme.transitions.create(
          'background',
          {
            delay: 0,
            duration: theme.transitions.duration.shortest,
          }
        )}`,
        ...theme.typography.body1,
      },
      rowFoot: {
        '& $cell': outerPadding,
      },
      rowHead: {
        '& $cell': outerPadding,
      },
      rowHover: {
        '&$rowBody:hover': {
          '& $cell:first-child': {
            color: theme.vars.palette.primary.main,
          },
          boxShadow: theme.shadows[16],
        },
      },
      rowBodySelected: {},
      cell: {
        boxSizing: 'content-box',
        flex: 1,
        transition: theme.transitions.create('color', {
          duration: theme.transitions.duration.shorter,
        }),
      },
      cellAction: {
        '&$cell:last-child': {
          paddingRight: theme.spacing(2.5),
        },
        display: 'flex',
        gap: theme.spacing(1),
        justifyContent: 'flex-end',
      },
      cellCheckbox: {
        '&$cell:first-child': {
          paddingLeft: theme.spacing(2),
        },
      },
      cellBody: {
        ...outerPadding,
        padding: theme.spacing(1, 0),
      },
      cellHeader: {
        ...theme.typography.body2,
        color: theme.vars.palette.text.secondary,
      },
      body: {
        margin: 0,
        padding: 0,
      },
    };
  },
  { name: 'OffsetList' }
);
