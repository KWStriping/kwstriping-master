import { useUser } from '@tempo/api/auth/react/hooks';
import { useQueryParams } from '@tempo/utils/url';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useCustomerAttach } from '@tempo/checkout/hooks/useCustomerAttach';
import { GuestUserForm } from './GuestUserForm';
import { ResetPassword } from './ResetPassword';
import { SignedInUser } from './SignedInUser';
import { SignInForm } from './SignInForm';

type Section = 'signedInUser' | 'guestUser' | 'signIn' | 'resetPassword';

const onlyContactShownSections: Section[] = ['signIn', 'resetPassword'];

interface ContactProps {
  setShowOnlyContact: (value: boolean) => void;
}

export const Contact: FC<ContactProps> = ({ setShowOnlyContact }) => {
  const { authenticated } = useUser();
  useCustomerAttach();

  const [passwordResetShown, setPasswordResetShown] = useState(false);

  const selectInitialSection = (): Section => {
    const shouldShowPasswordReset = passwordResetToken && !passwordResetShown;

    if (shouldShowPasswordReset) {
      return 'resetPassword';
    }

    return authenticated ? 'signedInUser' : 'guestUser';
  };

  const { passwordResetToken } = useQueryParams();
  const [currentSection, setCurrentSection] = useState<Section>(selectInitialSection());

  const handleChangeSection = (section: Section) => () => {
    if (onlyContactShownSections.includes(section)) {
      setShowOnlyContact(true);
    }
    setCurrentSection(section);
  };

  const isCurrentSection = useCallback(
    (section: Section) => currentSection === section,
    [currentSection]
  );

  const shouldShowOnlyContact = onlyContactShownSections.includes(currentSection);

  useEffect(() => {
    if (isCurrentSection('resetPassword')) {
      setPasswordResetShown(true);
    }
  }, [isCurrentSection]);

  useEffect(() => {
    setShowOnlyContact(shouldShowOnlyContact);
  }, [currentSection, setShowOnlyContact, shouldShowOnlyContact]);

  return (
    <div>
      {isCurrentSection('guestUser') && (
        <GuestUserForm onSectionChange={handleChangeSection('signIn')} />
      )}

      {isCurrentSection('signIn') && (
        <SignInForm
          onSectionChange={handleChangeSection('guestUser')}
          onSignInSuccess={handleChangeSection('signedInUser')}
        />
      )}

      {isCurrentSection('signedInUser') && (
        <SignedInUser
          onSectionChange={handleChangeSection('guestUser')}
          onSignOutSuccess={handleChangeSection('guestUser')}
        />
      )}

      {isCurrentSection('resetPassword') && (
        <ResetPassword
          onSectionChange={handleChangeSection('signIn')}
          onResetPasswordSuccess={handleChangeSection('signedInUser')}
        />
      )}
    </div>
  );
};
