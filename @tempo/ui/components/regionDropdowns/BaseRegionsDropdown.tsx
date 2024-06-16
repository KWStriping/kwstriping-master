import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import { Fragment } from 'react';
import type { ReactNode } from 'react';

export type HorizontalAlignment = 'left' | 'right';

interface BaseRegionsDropdownProps {
  label: string;
  children?: ReactNode;
  horizontalAlignment?: Maybe<HorizontalAlignment>;
}

export function BaseRegionsDropdown({
  label,
  children,
  horizontalAlignment = 'left',
}: BaseRegionsDropdownProps) {
  return (
    // <Menu as="div" className="relative inline-block text-left">
    <Menu>
      <div>
        <MenuButton className="inline-flex w-full justify-left py-2 text-md font-bold text-gray-400  hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {label}
          <ExpandMoreIcon className="ml-2 -mr-1 h-5 w-5 " aria-hidden="true" />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={clsx(
            horizontalAlignment === 'left' ? 'left-0' : 'right-0',
            'focus:outline-none absolute -translate-y-full origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10'
          )}
        >
          {children}
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default BaseRegionsDropdown;
