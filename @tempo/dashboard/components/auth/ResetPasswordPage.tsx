import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { IconButton } from '@tempo/ui/components/buttons/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowForward';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import Form from '@tempo/dashboard/components/forms/Form';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { RequestPasswordResetMutation } from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import { getAppMountPath } from '@tempo/dashboard/oldSrc/config';

export interface ResetPasswordPageFormData {
  email: string;
}
export interface ResetPasswordPageProps {
  disabled: boolean;
  error: string;
  onSubmit: (
    data: ResetPasswordPageFormData
  ) => SubmitPromise<RequestPasswordResetMutation['requestPasswordReset']['errors']>;
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = (props) => {
  const { disabled, error, onSubmit } = props;
  const styles = {};
  return (
    <Form initial={{ email: '' }} onSubmit={onSubmit}>
      {({ change: handleChange, data, submit: handleSubmit }) => (
        <>
          <IconButton className={styles.backBtn ?? ''} href={getAppMountPath()} color="secondary">
            <ArrowRightIcon className={styles.arrow ?? ''} />
          </IconButton>
          <Typography variant="h3" className={styles.header ?? ''}>
            {m.dashboard_y() / yDL ?? 'Reset password'}
          </Typography>
          {!!error && <div className={styles.panel ?? ''}>{error}</div>}
          <Typography variant="caption" color="textSecondary">
            <>
              {m.dashboard__M_Gu() ??
                'Provide us with an email - if we find it in our database we will send you a link to reset your password. You should be able to find it in your inbox in the next couple of minutes.'}
            </>
          </Typography>
          <FormSpacer />
          <TextField
            autoFocus
            disabled={disabled}
            fullWidth
            autoComplete="username"
            label={m.dashboard_email() ?? 'Email address'}
            name="email"
            onChange={handleChange}
            value={data?.email}
            inputProps={{
              'data-test-id': 'email',
              spellCheck: false,
            }}
          />
          <FormSpacer />
          <Button
            data-test-id="submit"
            className={styles.submit ?? ''}
            disabled={disabled}
            color="primary"
            onClick={handleSubmit}
            type="submit"
          >
            <>
              {/* password reset, button */}

              {m.dashboard_m_NSK() ?? 'Send an email with reset link'}
            </>
          </Button>
        </>
      )}
    </Form>
  );
};

ResetPasswordPage.displayName = 'ResetPasswordPage';
export default ResetPasswordPage;
