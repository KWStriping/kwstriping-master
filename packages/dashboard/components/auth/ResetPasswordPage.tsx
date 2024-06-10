import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { IconButton } from '@core/ui/components/buttons/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowForward';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { RequestPasswordResetMutation } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { getAppMountPath } from '@dashboard/oldSrc/config';

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
  const { t } = useTranslation();
  const styles = {};
  return (
    <Form initial={{ email: '' }} onSubmit={onSubmit}>
      {({ change: handleChange, data, submit: handleSubmit }) => (
        <>
          <IconButton className={styles.backBtn ?? ''} href={getAppMountPath()} color="secondary">
            <ArrowRightIcon className={styles.arrow ?? ''} />
          </IconButton>
          <Typography variant="h3" className={styles.header ?? ''}>
            {t('dashboard.y/yDL', 'Reset password')}
          </Typography>
          {!!error && <div className={styles.panel ?? ''}>{error}</div>}
          <Typography variant="caption" color="textSecondary">
            <>
              {t(
                'dashboard.4M0Gu',
                'Provide us with an email - if we find it in our database we will send you a link to reset your password. You should be able to find it in your inbox in the next couple of minutes.'
              )}
            </>
          </Typography>
          <FormSpacer />
          <TextField
            autoFocus
            disabled={disabled}
            fullWidth
            autoComplete="username"
            label={t('dashboard.email', 'Email address')}
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

              {t('dashboard.m9NSK', 'Send an email with reset link')}
            </>
          </Button>
        </>
      )}
    </Form>
  );
};

ResetPasswordPage.displayName = 'ResetPasswordPage';
export default ResetPasswordPage;
