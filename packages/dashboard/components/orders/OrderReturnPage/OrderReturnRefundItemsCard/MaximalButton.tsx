import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { makeStyles } from '@core/ui/theme/styles';
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

        {t('dashboard.W4EBM', 'Set maximal quantities')}
      </>
    </Button>
  );
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();
};

export default MaximalButton;
