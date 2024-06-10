import Link from 'next/link';
import { useTranslation } from '@core/i18n';
import { usePaths } from '@core/ui/providers/PathsProvider';

export function NavigationPanel() {
  const paths = usePaths();
  const { t } = useTranslation();

  const linkClassname =
    'text-black flex p-4 items-center w-full rounded-md shadow-sm hover:text-blue-500';
  return (
    <div className="group w-full md:w-4/5 cursor-default rounded-md bg-white">
      <Link href={paths.accountPreferences()} className={linkClassname}>
        {t('menuAccountPreferences', 'Account preferences')}
      </Link>
      <Link href={paths.accountAddressBook()} className={linkClassname}>
        {t('menuAccountAddressBook', 'Address book')}
      </Link>
      <Link href={paths.accountOrders()} className={linkClassname}>
        {t('menuAccountOrders', 'Orders')}
      </Link>
    </div>
  );
}

export default NavigationPanel;
