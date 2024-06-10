import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import Form from '@tempo/dashboard/components/forms/Form';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import getAccountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/account';

export interface NewPasswordPageFormData {
  password: string;
  confirmPassword: string;
}
export interface NewPasswordPageProps {
  loading: boolean;
  errors: any; // TODO
  onSubmit: (data: NewPasswordPageFormData) => SubmitPromise;
}

const initialForm: NewPasswordPageFormData = {
  confirmPassword: '',
  password: '',
};

const NewPasswordPage: FC<NewPasswordPageProps> = (props) => {
  const { loading, errors, onSubmit } = props;
  const styles = {};
  return (
    <Form initial={initialForm} onSubmit={onSubmit}>
      {({ change: handleChange, data, submit: handleSubmit }) => {
        const passwordError = data?.password !== data?.confirmPassword && data?.password?.length;

        return (
          <>
            <Typography variant="h3" className={styles.header ?? ''}>
              <>
                {/* page title */}

                {m.dashboard_hKGPA() ?? 'Set up new password'}
              </>
            </Typography>
            {errors.map((error) => (
              <div className={styles.panel ?? ''} key={`${error.code}-${error.field}`}>
                {getAccountErrorMessage(error, t)}
              </div>
            ))}
            <Typography variant="caption" color="textSecondary">
              {t(
                'dashboard_0Dz+2',
                'Please set up a new password for your account. Repeat your new password to make sure you will be able to remember it.'
              )}
            </Typography>
            <FormSpacer />
            <TextField
              autoFocus
              fullWidth
              autoComplete="none"
              disabled={loading}
              label={m.dashboard_v_SEF() ?? 'New Password'}
              name="password"
              onChange={handleChange}
              type="password"
              value={data?.password}
              inputProps={{
                'data-test-id': 'password',
                spellCheck: false,
              }}
              required
            />
            <FormSpacer />
            <TextField
              fullWidth
              error={passwordError}
              autoComplete="none"
              disabled={loading}
              label={m.dashboard_fG() + nh ?? 'Confirm Password'}
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              value={data?.confirmPassword}
              helperText={passwordError && (m.dashboard_Chrsf() ?? 'Passwords do not match')}
              inputProps={{
                'data-test-id': 'confirm-password',
                spellCheck: false,
              }}
              required
            />
            <FormSpacer />
            <Button
              data-test="button-bar-confirm"
              className={styles.submit ?? ''}
              disabled={loading || data?.password?.length === 0 || passwordError}
              color="primary"
              onClick={handleSubmit}
              type="submit"
            >
              <>
                {/* button */}

                {m.dashboard___jIs() ?? 'Set new password'}
              </>
            </Button>
          </>
        );
      }}
    </Form>
  );
};

NewPasswordPage.displayName = 'NewPasswordPage';
export default NewPasswordPage;
