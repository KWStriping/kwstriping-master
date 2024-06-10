import type { TextInputProps } from '@core/checkout/components/TextInput';
import { TextInput } from '@core/checkout/components/TextInput';
import { useTranslation } from '@core/i18n';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { ForwardedRef } from 'react';
import { forwardRef, useState } from 'react';
import type { Control } from 'react-hook-form';
import { IconButton } from '@core/ui/components/buttons/IconButton';
import type { ControlFormData } from '@core/ui/hooks/useGetInputProps';

const PasswordInputComponent = <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
>(
  props: TextInputProps<TControl, TFormData>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <TextInput ref={ref} {...props} type={passwordVisible ? 'text' : 'password'} />
      <div className="password-input-icon">
        <IconButton
          // variant="bare"
          aria-label={
            passwordVisible
              ? t('auth.passwordVisibility.hide', 'Hide')
              : t('auth.passwordVisibility.show', 'Show')
          }
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          <VisibilityIcon />
        </IconButton>
      </div>
    </div>
  );
};

export const PasswordInput = forwardRef(PasswordInputComponent) as <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>
>(
  props: TextInputProps<TControl, TFormData> & {
    ref?: ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof PasswordInputComponent>;
