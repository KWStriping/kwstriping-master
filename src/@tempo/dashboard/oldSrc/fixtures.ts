import { PermissionCode } from '@tempo/api/generated/constants';
import type {
  ShopInfoQuery,
  ShopLimitFragment,
  UserDetailsQuery,
} from '@tempo/api/generated/graphql';

import type { PaginatorContextValues } from '../hooks/usePaginator';
import type {
  FetchMoreProps,
  FilterPageProps,
  ListActions,
  SearchPageProps,
  SortPage,
  TabPageProps,
} from './types';

const pageInfo = {
  hasNextPage: true,
  hasPreviousPage: false,
};
export const pageListProps = {
  default: {
    disabled: false,
    onAdd: undefined,
    addHref: '',
    onNextPage: undefined,
    onPreviousPage: undefined,
    getRowHref: () => '',
    pageInfo,
    settings: { rowNumber: 20 },
  },
  loading: {
    disabled: true,
    onAdd: undefined,
    addHref: '',
    onNextPage: undefined,
    onPreviousPage: undefined,
    getRowHref: () => '',
    pageInfo,
    settings: undefined,
  },
};
export const listActionsProps: ListActions = {
  isChecked: () => undefined,
  selected: 0,
  toggle: () => undefined,
  toggleAll: () => undefined,
  toolbar: undefined,
};

export const countries = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AX', name: 'Åland Islands' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'AndorrA' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AQ', name: 'Antarctica' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BV', name: 'Bouvet Island' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IO', name: 'British Indian Ocean Territory' },
  { code: 'BN', name: 'Brunei Darussalam' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CX', name: 'Christmas Island' },
  { code: 'CC', name: 'Cocos (Keeling) Islands' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CD', name: 'Congo, The Democratic Republic of the' },
  { code: 'CK', name: 'Cook Islands' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: "Cote D'Ivoire" },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FK', name: 'Falkland Islands (Malvinas)' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GF', name: 'French Guiana' },
  { code: 'PF', name: 'French Polynesia' },
  { code: 'TF', name: 'French Southern Territories' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GR', name: 'Greece' },
  { code: 'GL', name: 'Greenland' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GP', name: 'Guadeloupe' },
  { code: 'GU', name: 'Guam' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GG', name: 'Guernsey' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HM', name: 'Heard Island and Mcdonald Islands' },
  { code: 'VA', name: 'Holy See (Vatican City State)' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran, Islamic Republic Of' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IM', name: 'Isle of Man' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JE', name: 'Jersey' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: "Korea, Democratic People'S Republic of" },
  { code: 'KR', name: 'Korea, Republic of' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: "Lao People'S Democratic Republic" },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libyan Arab Jamahiriya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macao' },
  { code: 'MK', name: 'Macedonia, The Former Yugoslav Republic of' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MQ', name: 'Martinique' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'YT', name: 'Mayotte' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia, Federated States of' },
  { code: 'MD', name: 'Moldova, Republic of' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'MS', name: 'Montserrat' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'AN', name: 'Netherlands Antilles' },
  { code: 'NC', name: 'New Caledonia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NU', name: 'Niue' },
  { code: 'NF', name: 'Norfolk Island' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestinian Territory, Occupied' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PN', name: 'Pitcairn' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RE', name: 'Reunion' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russian Federation' },
  { code: 'RW', name: 'RWANDA' },
  { code: 'SH', name: 'Saint Helena' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'PM', name: 'Saint Pierre and Miquelon' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome and Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'CS', name: 'Serbia and Montenegro' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'GS', name: 'South Georgia and the South Sandwich Islands' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen' },
  { code: 'SZ', name: 'Swaziland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syrian Arab Republic' },
  { code: 'TW', name: 'Taiwan, Province of China' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania, United Republic of' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TC', name: 'Turks and Caicos Islands' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UM', name: 'United States Minor Outlying Islands' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Viet Nam' },
  { code: 'VG', name: 'Virgin Islands, British' },
  { code: 'VI', name: 'Virgin Islands, U.S.' },
  { code: 'WF', name: 'Wallis and Futuna' },
  { code: 'EH', name: 'Western Sahara' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
];

export const tabPageProps: TabPageProps = {
  currentTab: 0,
  onAll: () => undefined,
  onTabChange: () => undefined,
  onTabDelete: () => undefined,
  onTabSave: () => undefined,
  tabs: ['Tab X'],
};

export const paginatorContextValues: PaginatorContextValues = {
  endCursor: '',
  startCursor: '',
  hasNextPage: false,
  hasPreviousPage: false,
  nextHref: '',
  prevHref: '',
  paginatorType: 'link',
};

export const searchPageProps: SearchPageProps = {
  initialSearch: '',
  onSearchChange: () => undefined,
};

export const filterPageProps: FilterPageProps<string, {}> = {
  ...searchPageProps,
  ...tabPageProps,
  filterOpts: {
    status: { value: undefined, active: false },
    channel: { value: undefined, active: false },
  },
  onFilterChange: () => undefined,
};

export const fetchMoreProps: FetchMoreProps = {
  hasMore: true,
  loading: false,
  onFetchMore: () => undefined,
};

export const sortPageProps: SortPage<string> = {
  onSort: () => undefined,
  sort: {
    asc: true,
  },
};

export const permissions: ShopInfoQuery['shop']['permissions'] = [
  {
    code: PermissionCode.ManageDiscounts,
    name: 'Manage sales and vouchers.',
  },
  {
    code: PermissionCode.ManageMedia,
    name: 'Manage media.',
  },
  {
    code: PermissionCode.ManageMenus,
    name: 'Manage navigation.',
  },
  {
    code: PermissionCode.ManageOrders,
    name: 'Manage orders.',
  },
  {
    code: PermissionCode.ManagePages,
    name: 'Manage pages.',
  },
  {
    code: PermissionCode.ManageProducts,
    name: 'Manage products.',
  },
  {
    code: PermissionCode.ManageProductKlassesAndAttributes,
    name: 'Manage product types and attributes.',
  },
  {
    code: PermissionCode.ManageSettings,
    name: 'Manage settings.',
  },
  {
    code: PermissionCode.ManageShipping,
    name: 'Manage shipping.',
  },
  {
    code: PermissionCode.ManageStaff,
    name: 'Manage staff.',
  },
  {
    code: PermissionCode.ManageUsers,
    name: 'Manage customers.',
  },
  {
    code: PermissionCode.ManagePlugins,
    name: 'Manage plugins.',
  },
  {
    code: PermissionCode.ManageApps,
    name: 'Manage apps.',
  },
  {
    code: PermissionCode.ManageApps,
    name: 'Manage webhooks.',
  },
].map((perm) => ({
  __typename: 'Permission' as const,
  ...perm,
}));

export const date = {
  from: '2019-12-09',
  to: '2019-12-38',
};

export const adminUserPermissions: UserDetailsQuery['me']['userPermissions'] = [
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageCheckouts,
    name: 'Manage checkouts',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageCheckouts,
    name: 'Manage checkouts',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageDiscounts,
    name: 'Manage sales and vouchers.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageGiftCard,
    name: 'Manage gift cards.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageGiftCard,
    name: 'Manage gift cards.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageMedia,
    name: 'Manage media.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageMenus,
    name: 'Manage navigation.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageOrders,
    name: 'Manage orders.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageOrders,
    name: 'Manage orders.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManagePages,
    name: 'Manage pages.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManagePlugins,
    name: 'Manage plugins',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageProducts,
    name: 'Manage products.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageProductKlassesAndAttributes,
    name: 'Manage product types and attributes.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageSettings,
    name: 'Manage settings.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageShipping,
    name: 'Manage shipping.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageStaff,
    name: 'Manage staff.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageStaff,
    name: 'Manage staff.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageTranslations,
    name: 'Manage translations.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageUsers,
    name: 'Manage customers.',
  },
  {
    __typename: 'UserPermission',
    code: PermissionCode.ManageUsers,
    name: 'Manage customers.',
  },
];

export const address = {
  __typename: 'Address' as const,
  city: 'Port Danielshire',
  cityArea: '',
  companyName: '',
  country: {
    __typename: 'Country' as const,
    code: 'SE',
    country: 'Szwecja',
  },
  countryArea: '',
  firstName: 'Elizabeth',
  id: 'QWRkcmVzczoy',
  lastName: 'Vaughn',
  phone: '',
  postalCode: '52203',
  streetAddress1: '419 Ruiz Orchard Apt. 199',
  streetAddress2: '0238 Cremin Freeway',
};

export const limits: ShopLimitFragment['limits'] = {
  __typename: 'LimitInfo',
  allowedUsage: {
    __typename: 'Limits',
    channels: 5,
    orders: 500,
    productVariants: 1000,
    staffUsers: 10,
    warehouses: 3,
  },
  currentUsage: {
    __typename: 'Limits',
    channels: 2,
    orders: 230,
    productVariants: 100,
    staffUsers: 7,
    warehouses: 1,
  },
};
export const limitsReached: ShopLimitFragment['limits'] = {
  __typename: 'LimitInfo',
  allowedUsage: {
    __typename: 'Limits',
    channels: 5,
    orders: 500,
    productVariants: 1000,
    staffUsers: 10,
    warehouses: 3,
  },
  currentUsage: {
    __typename: 'Limits',
    channels: 5,
    orders: 500,
    productVariants: 1000,
    staffUsers: 10,
    warehouses: 3,
  },
};
