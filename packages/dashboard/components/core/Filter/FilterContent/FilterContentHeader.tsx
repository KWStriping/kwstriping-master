import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@core/ui/theme/styles';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    container: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 3),
    },
    clear: {
      marginRight: theme.spacing(1),
    },
    label: {
      fontWeight: 600,
    },
  }),
  { name: 'FilterContentHeader' }
);

interface FilterContentHeaderProps {
  onClear: () => void;
}

const FilterContentHeader: FC<FilterContentHeaderProps> = ({ onClear }) => {
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();
  return (
    <div className={styles.container ?? ''}>
      <Typography className={styles.label ?? ''}>{t('dashboard.SOvI0', 'Filters')}</Typography>
      <div>
        <Button
          data-test-id="clear"
          color="secondary"
          className={styles.clear ?? ''}
          onClick={onClear}
        >
          {t('dashboard.lear', 'Clear')}
        </Button>
        <Button data-test-id="submit" color="primary" type="submit">
          {t('dashboard.one', 'Done')}
        </Button>
      </div>
    </div>
  );
};

export default FilterContentHeader;
