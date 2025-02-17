import * as m from '@paraglide/messages';
import type { TextInputProps } from '@tempo/checkout/components/TextInput';
import { TextInput } from '@tempo/checkout/components/TextInput';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { ForwardedRef } from 'react';
import { forwardRef, useState } from 'react';
import type { Control } from 'react-hook-form';
import { IconButton } from '@tempo/ui/components/buttons/IconButton';
import type { ControlFormData } from '@tempo/ui/hooks/useGetInputProps';

const PasswordInputComponent = <
  TControl extends Control<any, any>,
  TFormData extends ControlFormData<TControl>,
>(
  props: TextInputProps<TControl, TFormData>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <TextInput ref={ref} {...props} type={passwordVisible ? 'text' : 'password'} />
      <div className="password-input-icon">
        <IconButton
          // variant="bare"
          aria-label={
            passwordVisible
              ? (m.auth_passwordVisibility_hide() ?? 'Hide')
              : (m.auth_passwordVisibility_show() ?? 'Show')
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
  TFormData extends ControlFormData<TControl>,
>(
  props: TextInputProps<TControl, TFormData> & {
    ref?: ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof PasswordInputComponent>;
