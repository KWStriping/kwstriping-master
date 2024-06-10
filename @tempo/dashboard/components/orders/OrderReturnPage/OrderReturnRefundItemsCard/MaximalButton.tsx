import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    button: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
  }),
  { name: 'MaximalButton' }
);

interface MaximalButtonProps {
  onClick: () => void;
}

const MaximalButton: FC<MaximalButtonProps> = ({ onClick }) => {
  return (
    <Button
      className={styles.button ?? ''}
      onClick={onClick}
      data-test-id="set-maximal-quantity-unfulfilled-button"
    >
      <>
        {/* button */}

        {m.dashboard_W_EBM() ?? 'Set maximal quantities'}
      </>
    </Button>
  );
  // const styles = useStyles();
  const styles = {};
};

export default MaximalButton;
