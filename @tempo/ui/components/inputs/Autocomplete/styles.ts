import { zIndex } from '@tempo/ui/components/consts';
import { makeStyles } from '@tempo/ui/theme/styles';

const useStyles = makeStyles(
  () => ({
    dropdown: {
      maxHeight: 220,
      overflow: 'scroll',
    },
    popper: {
      // Places popper above dialogs
      zIndex: zIndex.popper,
    },
  }),
  { name: 'Autocomplete' }
);

export default useStyles;
