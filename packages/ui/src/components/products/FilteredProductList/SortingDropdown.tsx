import type { OrderingDirection, ProductOrderField } from '@core/api';
import { Menu, Transition } from '@headlessui/react';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import { Fragment } from 'react';

import type { UrlSorting } from './sorting';
import { getSortingOptions } from './sorting';

export interface SortingDropdownProps {
  optionToggle: (field?: ProductOrderField, direction?: OrderingDirection) => void;
  chosen: Maybe<UrlSorting>;
}

export function SortingDropdown({ optionToggle, chosen }: SortingDropdownProps) {
  const options = getSortingOptions(chosen);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex w-full items-center justify-left px-2 py-0.5 text-base font-medium hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          data-testid="sortBy"
        >
          Sort by
          <ExpandMoreIcon className="ml-2 -mr-1 h-5 w-5 " aria-hidden="true" />
        </Menu.Button>
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
        <Menu.Items
          className="focus:outline-none absolute left-0 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10"
          data-testid="sortingDropdown"
        >
          {options?.map((option) => (
            <Menu.Item key={option.label}>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => optionToggle(option.field, option.direction)}
                  className={clsx(
                    'group flex w-full items-center px-2 py-2 text-base border-2',
                    active ? 'border-brand text-brand' : 'border-transparent text-gray-900'
                  )}
                  data-testid={`sortByOption${option.label}`}
                >
                  <div className="flex-grow text-left">{option.label}</div>
                  {option.chosen && (
                    <CheckIcon className="ml-2 -mr-1 h-5 w-3 " aria-hidden="true" />
                  )}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default SortingDropdown;
