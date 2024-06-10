import { EmailPreferences } from '@tempo/ui/components/auth/AccountPreferences/EmailPreferences';
import { PasswordPreferences } from '@tempo/ui/components/auth/AccountPreferences/PasswordPreferences';

function AccountPreferencesPage() {
  return (
    <>
      <div className="checkout-section-container">
        <EmailPreferences />
      </div>
      <div className="checkout-section-container">
        <PasswordPreferences />
      </div>
    </>
  );
}

export default AccountPreferencesPage;

// AccountPreferencesPage.getLayout = function getLayout(page: ReactElement) {
//   return <AccountLayout>{page}</AccountLayout>;
// };
