import type { CheckoutCustomerDetachMutation, CheckoutCustomerDetachMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import { CheckoutCustomerDetachDocument } from '@tempo/api/generated/graphql';
import { useAuthActions, useUser } from '@tempo/api/auth/src';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useMutation } from '@tempo/api/hooks/useMutation';
import type { Locale } from '@tempo/utils';
import { localeToLanguageCode } from '@tempo/utils';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import { contactMessages } from './messages';
import { SignInFormContainer } from './SignInFormContainer';
import type { SignInFormContainerProps } from './SignInFormContainer';

interface SignedInUserProps extends Pick<SignInFormContainerProps, 'onSectionChange'> {
  onSignOutSuccess: () => void;
}

export const SignedInUser: FC<SignedInUserProps> = ({ onSectionChange, onSignOutSuccess }) => {
  const { locale = 'en-US' } = useRouter();

  const { checkout } = useCheckout();
  const { logout } = useAuthActions();
  const { user } = useUser();

  const [customerDetach] = useMutation<CheckoutCustomerDetachMutation, CheckoutCustomerDetachMutationVariables>(CheckoutCustomerDetachDocument);

  const handleLogout = async () => {
    checkout?.id &&
      (await customerDetach({
        languageCode: localeToLanguageCode(locale as Locale),
        id: checkout.id,
      }));
    await logout();
    onSignOutSuccess();
  };

  return (
    <SignInFormContainer
      title={m[contactMessages.account.id] ?? contactMessages.account.defaultMessage}
      onSectionChange={onSectionChange}
    >
      <div className="flex flex-row justify-between">
        <Typography fontWeight="bold" fontSize="md">
          {user?.email}
        </Typography>
        <Button
          aria-label={m.auth_signOut() ?? 'Sign out'}
          color="secondary"
          size="small"
          onClick={handleLogout}
        >
          {m.auth_signOut() ?? 'Sign out'}
        </Button>
      </div>
    </SignInFormContainer>
  );
};
