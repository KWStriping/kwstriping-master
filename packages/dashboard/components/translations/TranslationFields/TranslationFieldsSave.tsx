import { useTranslation } from '@core/i18n';
import Button from '@core/ui/components/buttons/Button';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@core/ui/theme/styles';
import type { FC } from 'react';

interface TranslationFieldsSaveProps {
  saveButtonState: ConfirmButtonTransitionState;
  onDiscard: () => void;
  onSave: () => void;
}

const useStyles = makeStyles(
  (theme) => ({
    confirmButton: {
      marginLeft: theme.spacing(1),
    },
    root: {
      display: 'flex',
      flexDirection: 'row-reverse',
      marginTop: theme.spacing(1),
    },
  }),
  {
    name: 'TranslationFieldsSave',
  }
);

const TranslationFieldsSave: FC<TranslationFieldsSaveProps> = (props) => {
  const { saveButtonState, onDiscard, onSave } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  return (
    <div className={styles.root ?? ''}>
      <ConfirmButton
        data-test="button-bar-confirm"
        className={styles.confirmButton ?? ''}
        transitionState={saveButtonState}
        onClick={onSave}
      >
        {t('dashboard.save', 'Save')}
      </ConfirmButton>
      <Button onClick={onDiscard} type="submit">
        <>
          {/* button */}

          {t('dashboard.TN5DZ', 'Discard')}
        </>
      </Button>
    </div>
  );
};
TranslationFieldsSave.displayName = 'TranslationFieldsSave';
export default TranslationFieldsSave;
