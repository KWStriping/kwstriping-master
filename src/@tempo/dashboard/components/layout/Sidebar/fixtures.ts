import homeIcon from '../../stories/assets/menu-home-icon.svg';
import type { SidebarMenuItem } from './types';

export const menu: SidebarMenuItem[] = [
  {
    ariaLabel: 'Menu 1',
    id: 'menu1',
    label: 'Menu 1',
    icon: homeIcon,
    url: '/section1/',
  },
  {
    ariaLabel: 'Menu 2',
    id: 'menu2',
    label: 'Menu 2',
    icon: homeIcon,
    children: [
      {
        ariaLabel: 'Menu 2.1',
        id: 'menu21',
        label: 'Menu 21',
        url: '/section21/',
      },
      {
        ariaLabel: 'Menu 2.2',
        id: 'menu22',
        label: 'Menu 22',
        url: '/section22/',
      },
      {
        ariaLabel: 'Menu 2.3',
        id: 'menu23',
        label: 'Menu 23',
        url: '/section23/',
      },
      {
        label: 'External',
        id: 'menu2external',
      },
      {
        ariaLabel: 'Menu 2.4',
        id: 'menu24',
        label: 'Menu 24 - external',
        url: 'http://example.com/menu24',
        external: true,
      },
      {
        ariaLabel: 'Menu 2.5',
        id: 'menu25',
        label: 'Menu 25 - external',
        url: 'http://example.com/menu25',
        external: true,
      },
    ],
  },
  {
    ariaLabel: 'Menu 3',
    id: 'menu3',
    label: 'Menu 3',
    icon: homeIcon,
    children: [
      {
        ariaLabel: 'Menu 3.1',
        id: 'menu31',
        label: 'Menu 31',
        url: '/section31/',
      },
      {
        ariaLabel: 'Menu 3.2',
        id: 'menu32',
        label: 'Menu 32 - external',
        url: 'http://example.com/menu32',
        external: true,
      },
    ],
  },
];
