import type {
  DetachCustomerFromCheckoutMutation,
  DetachCustomerFromCheckoutMutationVariables,
} from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import { DetachCustomerFromCheckoutDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useMutation } from '@tempo/api/hooks/useMutation';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useLocale } from '@tempo/ui/hooks/useLocale';
import { contactMessages } from './messages';
import { SignInFormContainer } from './SignInFormContainer';
import type { SignInFormContainerProps } from './SignInFormContainer';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

interface SignedInUserProps extends Pick<SignInFormContainerProps, 'onSectionChange'> {
  onSignOutSuccess: () => void;
}

export const SignedInUser: FC<SignedInUserProps> = ({ onSectionChange, onSignOutSuccess }) => {
  const { languageCode: locale } = useLocale();

  const { checkout } = useCheckout();
  // const { logout } = useAuthActions();
  const { user } = useUser();

  const [customerDetach] = useMutation<
    DetachCustomerFromCheckoutMutation,
    DetachCustomerFromCheckoutMutationVariables
  >(DetachCustomerFromCheckoutDocument);

  const handleLogout = async () => {
    checkout?.id &&
      (await customerDetach({
        // languageCode: localeToLanguageCode(locale as Locale),
        id: checkout.id,
      }));
    // await logout();
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
