import { makeStyles } from '@core/ui/theme/styles';
// import { alpha } from '@mui/system';

const useStyles = makeStyles(
  (theme) => {
    const hover = {
      '&:hover': {
        // background: alpha(theme.vars.palette.primary.main, 0.1),
      },
    };

    const isDarkMode = theme.vars.palette.mode === 'dark';

    return {
      editor: {
        '& .codex-editor': {
          zIndex: 2,
        },
        '& .cdx-quote__text': {
          minHeight: 24,
        },
        '& .ce-block--selected .ce-block__content': {
          // background: `${alpha(theme.vars.palette.primary.main, 0.2)} !important`,
        },
        '& .ce-block__content': {
          margin: 0,
          maxWidth: 'unset',
        },
        '& .ce-conversion-tool': {
          ...hover,
        },
        '& .ce-conversion-tool--focused': {
          // background: `${alpha(theme.vars.palette.primary.main, 0.1)} !important`,
        },
        '& .ce-conversion-tool__icon': {
          background: 'none',
        },
        '& .ce-conversion-toolbar': {
          background: theme.vars.palette.background.paper,
        },
        '& .ce-header': {
          marginBottom: 0,
          paddingBottom: theme.spacing(1),
        },
        '& .ce-inline-tool': {
          ...hover,
          color: theme.vars.palette.text.primary,
          height: 32,
          transition: theme.transitions.duration.short + 'ms',
          width: 32,
        },
        '& .ce-inline-toolbar': {
          '& input': {
            background: 'none',
          },
          background: theme.vars.palette.background.paper,
          color: theme.vars.palette.text.primary,
        },
        '& .ce-inline-toolbar__dropdown': {
          ...hover,
          height: 32,
          marginRight: 0,
        },
        '& .ce-inline-toolbar__toggler-and-button-wrapper': {
          paddingRight: 0,
        },
        '& .ce-toolbar__actions': {
          right: 0,
          top: 0,
        },
        '& .ce-toolbar__content': {
          maxWidth: 'unset',
        },
        '& .ce-toolbar__plus': {
          left: -9,
          color: theme.vars.palette.text.primary,
          ...hover,
        },
        '& .ce-popover': {
          backgroundColor: theme.vars.palette.background.paper,
        },
        '& .ce-popover__item': {
          ...hover,
        },
        '& .ce-popover__item-icon': {
          // color: theme.vars.palette.generic.verydark,
          color: theme.vars.palette.generic.dark,
        },
        '& .ce-toolbox.ce-toolbox--opened': {
          left: 16,
        },
        '& .codex-editor__redactor': {
          marginRight: `${theme.spacing(4)}px !important`,
          paddingBottom: '0 ', // !important'
        },
        '& a': {
          color: theme.vars.palette.primary.light,
        },
        '&:not($rootDisabled):hover': {
          borderColor: isDarkMode
            ? theme.vars.palette.primary[200]
            : theme.vars.palette.primary[400],
          boxShadow: `0 0 0 3px ${
            isDarkMode ? theme.vars.palette.primary[400] : theme.vars.palette.primary[600]
          }`,
        },
      },
      root: {
        border: `1px solid ${theme.vars.palette.primary[400]}`,
        borderRadius: 4,
        fontSize: theme.typography.body1.fontSize,
        minHeight: 56,
        padding: theme.spacing(3, 2),
        paddingBottom: theme.spacing(1),
        paddingLeft: 10,
        position: 'relative',
        transition: theme.transitions.duration.short + 'ms',
      },
      rootActive: {
        borderColor: theme.vars.palette.primary[100],
      },
      rootDisabled: {
        // ...theme.overrides.MuiOutlinedInput.root["&$disabled"]["& fieldset"],
        background: theme.vars.palette.background.default,
        color: theme.vars.palette.primary[400],
      },
      rootError: {
        borderColor: theme.vars.palette.error.main,
      },
      rootStatic: {
        fontSize: theme.typography.body1.fontSize,
      },
    };
  },
  { name: 'RichTextEditor' }
);

export default useStyles;
