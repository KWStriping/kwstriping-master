import { CheckoutCustomerDetachDocument } from '@core/api';
import { useAuthActions, useUser } from '@core/auth';
import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { useMutation } from '@core/urql/hooks/useMutation';
import type { Locale } from '@core/utils';
import { localeToLanguageCode } from '@core/utils';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';
import { contactMessages } from './messages';
import { SignInFormContainer } from './SignInFormContainer';
import type { SignInFormContainerProps } from './SignInFormContainer';

interface SignedInUserProps extends Pick<SignInFormContainerProps, 'onSectionChange'> {
  onSignOutSuccess: () => void;
}

export const SignedInUser: FC<SignedInUserProps> = ({ onSectionChange, onSignOutSuccess }) => {
  const { t } = useTranslation();
  const { locale = 'en-US' } = useRouter();

  const { checkout } = useCheckout();
  const { logout } = useAuthActions();
  const { user } = useUser();

  const [customerDetach] = useMutation(CheckoutCustomerDetachDocument);

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
      title={t(contactMessages.account.id, contactMessages.account.defaultMessage)}
      onSectionChange={onSectionChange}
    >
      <div className="flex flex-row justify-between">
        <Typography fontWeight="bold" fontSize="md">
          {user?.email}
        </Typography>
        <Button
          aria-label={t('auth.signOut', 'Sign out')}
          color="secondary"
          size="small"
          onClick={handleLogout}
        >
          {t('auth.signOut', 'Sign out')}
        </Button>
      </div>
    </SignInFormContainer>
  );
};
