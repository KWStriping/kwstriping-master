import * as m from '@paraglide/messages';
import Link from 'next/link';
import { usePaths } from '@tempo/ui/providers/PathsProvider';

export function NavigationPanel() {
  const paths = usePaths();

  const linkClassname =
    'text-black flex p-4 items-center w-full rounded-md shadow-sm hover:text-blue-500';
  return (
    <div className="group w-full md:w-4/5 cursor-default rounded-md bg-white">
      <Link href={paths.accountPreferences()} className={linkClassname}>
        {m.menuAccountPreferences() ?? 'Account preferences'}
      </Link>
      <Link href={paths.accountAddressBook()} className={linkClassname}>
        {m.menuAccountAddressBook() ?? 'Address book'}
      </Link>
      <Link href={paths.accountOrders()} className={linkClassname}>
        {m.menuAccountOrders() ?? 'Orders'}
      </Link>
    </div>
  );
}

export default NavigationPanel;
