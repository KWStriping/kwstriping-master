import * as m from '@paraglide/messages';
import Button from '@tempo/ui/components/buttons/Button';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@tempo/ui/theme/styles';
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
  const styles = {};

  return (
    <div className={styles.root ?? ''}>
      <ConfirmButton
        data-test="button-bar-confirm"
        className={styles.confirmButton ?? ''}
        transitionState={saveButtonState}
        onClick={onSave}
      >
        {m.dashboard_save() ?? 'Save'}
      </ConfirmButton>
      <Button onClick={onDiscard} type="submit">
        <>
          {/* button */}

          {m.dashboard_TN_DZ() ?? 'Discard'}
        </>
      </Button>
    </div>
  );
};
TranslationFieldsSave.displayName = 'TranslationFieldsSave';
export default TranslationFieldsSave;
