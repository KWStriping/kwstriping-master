import { useTranslation } from '@core/i18n';
import { Checkbox } from '@core/ui/components/inputs/Checkbox';
import { PasswordInput } from '@core/ui/components/PasswordInput';
import { useFormDebouncedSubmit } from '@core/ui/hooks/useFormDebouncedSubmit';
import { useGetInputProps } from '@core/ui/hooks/useGetInputProps';
import type { FC } from 'react';
import { useState } from 'react';
import { useGuestUserForm } from '@core/checkout/components/sections/~ContactInfoSection/useGuestUserForm';
import type { GuestUserFormData } from '@core/checkout/components/sections/~ContactInfoSection/useGuestUserForm';
import { TextInput } from '@core/checkout/components/TextInput';
import { contactMessages } from './messages';
import { SignInFormContainer } from './SignInFormContainer';
import type { SignInFormContainerProps } from './SignInFormContainer';

type AnonymousCustomerFormProps = Pick<SignInFormContainerProps, 'onSectionChange'>;

export const GuestUserForm: FC<AnonymousCustomerFormProps> = ({ onSectionChange }) => {
  const { t } = useTranslation();
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
      title={t('checkout.contactInfo', 'Contact info')}
      redirectSubtitle={t(
        contactMessages.haveAccount.id,
        contactMessages.haveAccount.defaultMessage
      )}
      redirectButtonLabel={t(contactMessages.signIn.id, contactMessages.signIn.defaultMessage)}
      onSectionChange={onSectionChange}
    >
      <form method="post" onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label={t(contactMessages.email.id, contactMessages.email.defaultMessage)}
          {...getInputProps('email', {
            onChange: debouncedSubmit,
          })}
        />
        <Checkbox
          classNames={{ container: '!mb-0' }}
          value="createAccount"
          label={t(
            contactMessages.wantToCreateAccount.id,
            contactMessages.wantToCreateAccount.defaultMessage
          )}
          checked={createAccountSelected}
          onChange={(event) => setCreateAccountSelected(event.target.checked)}
          data-testid={'createAccountCheckbox'}
        />
        {createAccountSelected && (
          <div className="mt-2">
            <PasswordInput
              label={t(contactMessages.password.id, contactMessages.password.defaultMessage)}
              {...getInputProps('password')}
            />
          </div>
        )}
      </form>
    </SignInFormContainer>
  );
};
