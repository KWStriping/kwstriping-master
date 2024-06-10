import * as m from '@paraglide/messages';
import { Checkbox } from '@tempo/ui/components/inputs/Checkbox';
import { PasswordInput } from '@tempo/ui/components/PasswordInput';
import { useFormDebouncedSubmit } from '@tempo/ui/hooks/useFormDebouncedSubmit';
import { useGetInputProps } from '@tempo/ui/hooks/useGetInputProps';
import type { FC } from 'react';
import { useState } from 'react';
import { useGuestUserForm } from '@tempo/checkout/components/sections/~ContactInfoSection/useGuestUserForm';
import type { GuestUserFormData } from '@tempo/checkout/components/sections/~ContactInfoSection/useGuestUserForm';
import { TextInput } from '@tempo/checkout/components/TextInput';
import { contactMessages } from './messages';
import { SignInFormContainer } from './SignInFormContainer';
import type { SignInFormContainerProps } from './SignInFormContainer';

type AnonymousCustomerFormProps = Pick<SignInFormContainerProps, 'onSectionChange'>;

export const GuestUserForm: FC<AnonymousCustomerFormProps> = ({ onSectionChange }) => {
  const [createAccountSelected, setCreateAccountSelected] = useState(false);
  const { formProps, onCheckoutContactInfoUpdate, defaultFormData } = useGuestUserForm({
    createAccount: createAccountSelected,
  });

  const { getValues } = formProps;

  const getInputProps = useGetInputProps(formProps as any); // TODO: fix types

  const debouncedSubmit = useFormDebouncedSubmit<GuestUserFormData>({
    onSubmit: onCheckoutContactInfoUpdate,
    getValues,
    defaultFormData,
  });

  return (
    <SignInFormContainer
      title={m.checkout_contactInfo() ?? 'Contact info'}
      redirectSubtitle={
        m[contactMessages.haveAccount.id] ?? contactMessages.haveAccount.defaultMessage
      }
      redirectButtonLabel={m[contactMessages.signIn.id] ?? contactMessages.signIn.defaultMessage}
      onSectionChange={onSectionChange}
    >
      <form method="post" onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label={m[contactMessages.email.id] ?? contactMessages.email.defaultMessage}
          {...getInputProps('email', {
            onChange: debouncedSubmit,
          })}
        />
        <Checkbox
          classNames={{ container: '!mb-0' }}
          value="createAccount"
          label={
            m[contactMessages.wantToCreateAccount.id] ??
            contactMessages.wantToCreateAccount.defaultMessage
          }
          checked={createAccountSelected}
          onChange={(event) => setCreateAccountSelected(event.target.checked)}
          data-testid={'createAccountCheckbox'}
        />
        {createAccountSelected && (
          <div className="mt-2">
            <PasswordInput
              label={m[contactMessages.password.id] ?? contactMessages.password.defaultMessage}
              {...getInputProps('password')}
            />
          </div>
        )}
      </form>
    </SignInFormContainer>
  );
};
