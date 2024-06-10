import { passwordResetUrl } from '@core/auth/urls';
import { useTranslation } from '@core/i18n';
import Button from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import styles from './index.module.css';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  children?: ReactNode;
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
}

const getLoginFormData = () => {
  return { email: '', password: '' };
};

const LoginForm: FC<LoginFormProps> = ({ loading = false, onSubmit }) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: getLoginFormData(),
  });
  const [showPassword, setShowPassword] = useState(false);
  const externalLoginMethods = [];
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'grow'}>
      <div className={'flex flex-col gap-2'}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              autoComplete="email"
              label={t('auth.email', 'Email address')}
              name="email"
              onChange={onChange}
              value={value}
              inputProps={{
                'data-test-id': 'email',
                spellCheck: false,
              }}
              disabled={!!loading}
              helperText={errors?.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <div className={styles.passwordWrapper ?? ''}>
              <TextField
                fullWidth
                autoComplete="password"
                label={t('auth.password', 'Password')}
                name="password"
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                value={value}
                inputProps={{
                  'data-test-id': 'password',
                  spellCheck: false,
                }}
                disabled={loading}
              />
              {/* Not using endAdornment as it looks weird with autocomplete */}
              <IconButton
                className={'absolute top-px bottom-px right-1 hover:bg-transparent'}
                variant="ghost"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
              >
                <VisibilityIcon />
              </IconButton>
            </div>
          )}
        />
        <Link href={passwordResetUrl} data-test-id="reset-password-link">
          <Typography className={styles.link ?? ''}>
            {t('auth.tbL7x', 'Forgot password?')}
          </Typography>
        </Link>
        <div className={styles.buttonContainer ?? ''}>
          <Button
            type={'submit'}
            className={styles.loginButton ?? ''}
            disabled={loading}
            color="primary"
            data-test-id="submit"
          >
            {t('auth.auth.signIn.header', 'Sign in')}
          </Button>
        </div>
        {!!externalLoginMethods?.length && (
          <>
            <Divider />
            <Typography>{t('auth.orLoginUsing', 'or login using')}</Typography>
          </>
        )}
        {/* {[{ id: "", name: "" }].map((externalAuthentication) => (
                <Fragment key={externalAuthentication.id}>
                  <FormSpacer />
                  <Button
                    fullWidth
                    color="secondary"
                    onClick={() => null}
                    data-test-id="external-authentication"
                    disabled={disabled}
                  >
                    {externalAuthentication.name}
                  </Button>
                </Fragment>
              ))} */}
      </div>
    </form>
  );
};

export default LoginForm;
