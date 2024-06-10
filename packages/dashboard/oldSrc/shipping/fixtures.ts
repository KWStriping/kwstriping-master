import type {
  SearchProductsQuery,
  ShippingZoneFragment,
  ShippingZoneQuery,
} from '@core/api/graphql';
import { } from '@core/api/graphql';
import { WeightUnit, PostalCodeRuleInclusionType } from '@core/api/constants';
import type { RelayToFlat } from '@dashboard/oldSrc/types';

export const shippingZones: ShippingZoneFragment[] = [
  {
    __typename: 'ShippingZone',
    countries: [
      {
        __typename: 'Country',
        code: 'AX',
        country: 'Wyspy Alandzkie',
      },
      {
        __typename: 'Country',
        code: 'AL',
        country: 'Albania',
      },
      {
        __typename: 'Country',
        code: 'AD',
        country: 'Andora',
      },
      {
        __typename: 'Country',
        code: 'AT',
        country: 'Austria',
      },
      {
        __typename: 'Country',
        code: 'BY',
        country: 'Białoruś',
      },
      {
        __typename: 'Country',
        code: 'BE',
        country: 'Belgia',
      },
      {
        __typename: 'Country',
        code: 'BA',
        country: 'Bośnia i Hercegowina',
      },
      {
        __typename: 'Country',
        code: 'BG',
        country: 'Bułgaria',
      },
      {
        __typename: 'Country',
        code: 'HR',
        country: 'Chorwacja',
      },
      {
        __typename: 'Country',
        code: 'CZ',
        country: 'Czechy',
      },
      {
        __typename: 'Country',
        code: 'DK',
        country: 'Dania',
      },
      {
        __typename: 'Country',
        code: 'EE',
        country: 'Estonia',
      },
      {
        __typename: 'Country',
        code: 'FO',
        country: 'Wyspy Owcze',
      },
      {
        __typename: 'Country',
        code: 'FI',
        country: 'Finlandia',
      },
      {
        __typename: 'Country',
        code: 'FR',
        country: 'Francja',
      },
      {
        __typename: 'Country',
        code: 'DE',
        country: 'Niemcy',
      },
      {
        __typename: 'Country',
        code: 'GI',
        country: 'Gibraltar',
      },
      {
        __typename: 'Country',
        code: 'GR',
        country: 'Grecja',
      },
      {
        __typename: 'Country',
        code: 'GG',
        country: 'Guernsey',
      },
      {
        __typename: 'Country',
        code: 'VA',
        country: 'Watykan',
      },
      {
        __typename: 'Country',
        code: 'HU',
        country: 'Węgry',
      },
      {
        __typename: 'Country',
        code: 'IS',
        country: 'Islandia',
      },
      {
        __typename: 'Country',
        code: 'IE',
        country: 'Irlandia',
      },
      {
        __typename: 'Country',
        code: 'IM',
        country: 'Wyspa Man',
      },
      {
        __typename: 'Country',
        code: 'IT',
        country: 'Włochy',
      },
      {
        __typename: 'Country',
        code: 'JE',
        country: 'Jersey',
      },
      {
        __typename: 'Country',
        code: 'LV',
        country: 'Łotwa',
      },
      {
        __typename: 'Country',
        code: 'LI',
        country: 'Liechtenstein',
      },
      {
        __typename: 'Country',
        code: 'LT',
        country: 'Litwa',
      },
      {
        __typename: 'Country',
        code: 'LU',
        country: 'Luksemburg',
      },
      {
        __typename: 'Country',
        code: 'MK',
        country: 'Macedonia',
      },
      {
        __typename: 'Country',
        code: 'MT',
        country: 'Malta',
      },
      {
        __typename: 'Country',
        code: 'MD',
        country: 'Mołdawia',
      },
      {
        __typename: 'Country',
        code: 'MC',
        country: 'Monako',
      },
      {
        __typename: 'Country',
        code: 'ME',
        country: 'Czarnogóra',
      },
      {
        __typename: 'Country',
        code: 'NL',
        country: 'Holandia',
      },
      {
        __typename: 'Country',
        code: 'NO',
        country: 'Norwegia',
      },
      {
        __typename: 'Country',
        code: 'PL',
        country: 'Polska',
      },
      {
        __typename: 'Country',
        code: 'PT',
        country: 'Portugalia',
      },
      {
        __typename: 'Country',
        code: 'RO',
        country: 'Rumunia',
      },
      {
        __typename: 'Country',
        code: 'RU',
        country: 'Rosja',
      },
      {
        __typename: 'Country',
        code: 'SM',
        country: 'San Marino',
      },
      {
        __typename: 'Country',
        code: 'RS',
        country: 'Serbia',
      },
      {
        __typename: 'Country',
        code: 'SK',
        country: 'Słowacja',
      },
      {
        __typename: 'Country',
        code: 'SI',
        country: 'Słowenia',
      },
      {
        __typename: 'Country',
        code: 'ES',
        country: 'Hiszpania',
      },
      {
        __typename: 'Country',
        code: 'SJ',
        country: 'Svalbard i Jan Mayen',
      },
      {
        __typename: 'Country',
        code: 'SE',
        country: 'Szwecja',
      },
      {
        __typename: 'Country',
        code: 'CH',
        country: 'Szwajcaria',
      },
      {
        __typename: 'Country',
        code: 'UA',
        country: 'Ukraina',
      },
      {
        __typename: 'Country',
        code: 'GB',
        country: 'Wielka Brytania',
      },
    ],
    description: 'Shipping zone description',
    id: 'U2hpcHBpbmdab25lOjE=',
    metadata: [],
    name: 'Europe',
    privateMetadata: [],
  },
  {
    __typename: 'ShippingZone',
    countries: [
      {
        __typename: 'Country',
        code: 'AS',
        country: 'Samoa Amerykańskie',
      },
      {
        __typename: 'Country',
        code: 'AU',
        country: 'Australia',
      },
      {
        __typename: 'Country',
        code: 'CX',
        country: 'Wyspa Bożego Narodzenia',
      },
      {
        __typename: 'Country',
        code: 'CC',
        country: 'Wyspy Kokosowe',
      },
      {
        __typename: 'Country',
        code: 'CK',
        country: 'Wyspy Cooka',
      },
      {
        __typename: 'Country',
        code: 'FJ',
        country: 'Fidżi',
      },
      {
        __typename: 'Country',
        code: 'PF',
        country: 'Polinezja Francuska',
      },
      {
        __typename: 'Country',
        code: 'GU',
        country: 'Guam',
      },
      {
        __typename: 'Country',
        code: 'HM',
        country: 'Wyspy Heard i McDonalda',
      },
      {
        __typename: 'Country',
        code: 'KI',
        country: 'Kiribati',
      },
      {
        __typename: 'Country',
        code: 'MH',
        country: 'Wyspy Marshalla',
      },
      {
        __typename: 'Country',
        code: 'FM',
        country: 'Mikronezja',
      },
      {
        __typename: 'Country',
        code: 'NR',
        country: 'Nauru',
      },
      {
        __typename: 'Country',
        code: 'NC',
        country: 'Nowa Kaledonia',
      },
      {
        __typename: 'Country',
        code: 'NZ',
        country: 'Nowa Zelandia',
      },
      {
        __typename: 'Country',
        code: 'NU',
        country: 'Niue',
      },
      {
        __typename: 'Country',
        code: 'NF',
        country: 'Norfolk',
      },
      {
        __typename: 'Country',
        code: 'MP',
        country: 'Mariany Północne',
      },
      {
        __typename: 'Country',
        code: 'PW',
        country: 'Palau',
      },
      {
        __typename: 'Country',
        code: 'PG',
        country: 'Papua-Nowa Gwinea',
      },
      {
        __typename: 'Country',
        code: 'PN',
        country: 'Pitcairn',
      },
      {
        __typename: 'Country',
        code: 'WS',
        country: 'Samoa',
      },
      {
        __typename: 'Country',
        code: 'SB',
        country: 'Wyspy Salomona',
      },
      {
        __typename: 'Country',
        code: 'TK',
        country: 'Tokelau',
      },
      {
        __typename: 'Country',
        code: 'TO',
        country: 'Tonga',
      },
      {
        __typename: 'Country',
        code: 'TV',
        country: 'Tuvalu',
      },
      {
        __typename: 'Country',
        code: 'UM',
        country: 'Dalekie Wyspy Mniejsze Stanów Zjednoczonych',
      },
      {
        __typename: 'Country',
        code: 'VU',
        country: 'Vanuatu',
      },
      {
        __typename: 'Country',
        code: 'WF',
        country: 'Wallis i Futuna',
      },
    ],
    description: 'Shipping zone description',
    id: 'U2hpcHBpbmdab25lOjI=',
    metadata: [],
    name: 'Oceania',
    privateMetadata: [],
  },
  {
    __typename: 'ShippingZone',
    countries: [
      {
        __typename: 'Country',
        code: 'AF',
        country: 'Afganistan',
      },
      {
        __typename: 'Country',
        code: 'AM',
        country: 'Armenia',
      },
      {
        __typename: 'Country',
        code: 'AZ',
        country: 'Azerbejdżan',
      },
      {
        __typename: 'Country',
        code: 'BH',
        country: 'Bahrajn',
      },
      {
        __typename: 'Country',
        code: 'BD',
        country: 'Bangladesz',
      },
      {
        __typename: 'Country',
        code: 'BT',
        country: 'Bhutan',
      },
      {
        __typename: 'Country',
        code: 'BN',
        country: 'Brunei',
      },
      {
        __typename: 'Country',
        code: 'KH',
        country: 'Kambodża',
      },
      {
        __typename: 'Country',
        code: 'CN',
        country: 'Chiny',
      },
      {
        __typename: 'Country',
        code: 'CY',
        country: 'Cypr',
      },
      {
        __typename: 'Country',
        code: 'GE',
        country: 'Gruzja',
      },
      {
        __typename: 'Country',
        code: 'HK',
        country: 'Hongkong',
      },
      {
        __typename: 'Country',
        code: 'IN',
        country: 'Indie',
      },
      {
        __typename: 'Country',
        code: 'ID',
        country: 'Indonezja',
      },
      {
        __typename: 'Country',
        code: 'IR',
        country: 'Iran',
      },
      {
        __typename: 'Country',
        code: 'IQ',
        country: 'Irak',
      },
      {
        __typename: 'Country',
        code: 'IL',
        country: 'Izrael',
      },
      {
        __typename: 'Country',
        code: 'JP',
        country: 'Japonia',
      },
      {
        __typename: 'Country',
        code: 'JO',
        country: 'Jordania',
      },
      {
        __typename: 'Country',
        code: 'KZ',
        country: 'Kazachstan',
      },
      {
        __typename: 'Country',
        code: 'KP',
        country: 'Korea Północna',
      },
      {
        __typename: 'Country',
        code: 'KR',
        country: 'Korea Południowa',
      },
      {
        __typename: 'Country',
        code: 'KW',
        country: 'Kuwejt',
      },
      {
        __typename: 'Country',
        code: 'KG',
        country: 'Kirgistan',
      },
      {
        __typename: 'Country',
        code: 'LA',
        country: 'Laos',
      },
      {
        __typename: 'Country',
        code: 'LB',
        country: 'Liban',
      },
      {
        __typename: 'Country',
        code: 'MO',
        country: 'Makau',
      },
      {
        __typename: 'Country',
        code: 'MY',
        country: 'Malezja',
      },
      {
        __typename: 'Country',
        code: 'MV',
        country: 'Malediwy',
      },
      {
        __typename: 'Country',
        code: 'MN',
        country: 'Mongolia',
      },
      {
        __typename: 'Country',
        code: 'MM',
        country: 'Mjanma',
      },
      {
        __typename: 'Country',
        code: 'NP',
        country: 'Nepal',
      },
      {
        __typename: 'Country',
        code: 'OM',
        country: 'Oman',
      },
      {
        __typename: 'Country',
        code: 'PK',
        country: 'Pakistan',
      },
      {
        __typename: 'Country',
        code: 'PS',
        country: 'Palestyna',
      },
      {
        __typename: 'Country',
        code: 'PH',
        country: 'Filipiny',
      },
      {
        __typename: 'Country',
        code: 'QA',
        country: 'Katar',
      },
      {
        __typename: 'Country',
        code: 'SA',
        country: 'Arabia Saudyjska',
      },
      {
        __typename: 'Country',
        code: 'SG',
        country: 'Singapur',
      },
      {
        __typename: 'Country',
        code: 'LK',
        country: 'Sri Lanka',
      },
      {
        __typename: 'Country',
        code: 'SY',
        country: 'Syria',
      },
      {
        __typename: 'Country',
        code: 'TW',
        country: 'Tajwan',
      },
      {
        __typename: 'Country',
        code: 'TJ',
        country: 'Tadżykistan',
      },
      {
        __typename: 'Country',
        code: 'TH',
        country: 'Tajlandia',
      },
      {
        __typename: 'Country',
        code: 'TL',
        country: 'Timor Wschodni',
      },
      {
        __typename: 'Country',
        code: 'TR',
        country: 'Turcja',
      },
      {
        __typename: 'Country',
        code: 'TM',
        country: 'Turkmenistan',
      },
      {
        __typename: 'Country',
        code: 'AE',
        country: 'Zjednoczone Emiraty Arabskie',
      },
      {
        __typename: 'Country',
        code: 'UZ',
        country: 'Uzbekistan',
      },
      {
        __typename: 'Country',
        code: 'VN',
        country: 'Wietnam',
      },
      {
        __typename: 'Country',
        code: 'YE',
        country: 'Jemen',
      },
    ],
    description: 'Shipping zone description',
    id: 'U2hpcHBpbmdab25lOjM=',
    metadata: [],
    name: 'Asia',
    privateMetadata: [],
  },
  {
    __typename: 'ShippingZone',
    countries: [
      {
        __typename: 'Country',
        code: 'AI',
        country: 'Anguilla',
      },
      {
        __typename: 'Country',
        code: 'AG',
        country: 'Antigua i Barbuda',
      },
      {
        __typename: 'Country',
        code: 'AR',
        country: 'Argentyna',
      },
      {
        __typename: 'Country',
        code: 'AW',
        country: 'Aruba',
      },
      {
        __typename: 'Country',
        code: 'BS',
        country: 'Bahamy',
      },
      {
        __typename: 'Country',
        code: 'BB',
        country: 'Barbados',
      },
      {
        __typename: 'Country',
        code: 'BZ',
        country: 'Belize',
      },
      {
        __typename: 'Country',
        code: 'BM',
        country: 'Bermudy',
      },
      {
        __typename: 'Country',
        code: 'BO',
        country: 'Boliwia',
      },
      {
        __typename: 'Country',
        code: 'BQ',
        country: 'Bonaire, Sint Eustatius i Saba',
      },
      {
        __typename: 'Country',
        code: 'BV',
        country: 'Wyspa Bouveta',
      },
      {
        __typename: 'Country',
        code: 'BR',
        country: 'Brazylia',
      },
      {
        __typename: 'Country',
        code: 'CA',
        country: 'Kanada',
      },
      {
        __typename: 'Country',
        code: 'KY',
        country: 'Kajmany',
      },
      {
        __typename: 'Country',
        code: 'CL',
        country: 'Chile',
      },
      {
        __typename: 'Country',
        code: 'CO',
        country: 'Kolumbia',
      },
      {
        __typename: 'Country',
        code: 'CR',
        country: 'Kostaryka',
      },
      {
        __typename: 'Country',
        code: 'CU',
        country: 'Kuba',
      },
      {
        __typename: 'Country',
        code: 'CW',
        country: 'Curaçao',
      },
      {
        __typename: 'Country',
        code: 'DM',
        country: 'Dominika',
      },
      {
        __typename: 'Country',
        code: 'DO',
        country: 'Dominikana',
      },
      {
        __typename: 'Country',
        code: 'EC',
        country: 'Ekwador',
      },
      {
        __typename: 'Country',
        code: 'SV',
        country: 'Salwador',
      },
      {
        __typename: 'Country',
        code: 'FK',
        country: 'Falklandy',
      },
      {
        __typename: 'Country',
        code: 'GF',
        country: 'Gujana Francuska',
      },
      {
        __typename: 'Country',
        code: 'GL',
        country: 'Grenlandia',
      },
      {
        __typename: 'Country',
        code: 'GD',
        country: 'Grenada',
      },
      {
        __typename: 'Country',
        code: 'GP',
        country: 'Gwadelupa',
      },
      {
        __typename: 'Country',
        code: 'GT',
        country: 'Gwatemala',
      },
      {
        __typename: 'Country',
        code: 'GY',
        country: 'Gujana',
      },
      {
        __typename: 'Country',
        code: 'HT',
        country: 'Haiti',
      },
      {
        __typename: 'Country',
        code: 'HN',
        country: 'Honduras',
      },
      {
        __typename: 'Country',
        code: 'JM',
        country: 'Jamajka',
      },
      {
        __typename: 'Country',
        code: 'MQ',
        country: 'Martynika',
      },
      {
        __typename: 'Country',
        code: 'MX',
        country: 'Meksyk',
      },
      {
        __typename: 'Country',
        code: 'MS',
        country: 'Montserrat',
      },
      {
        __typename: 'Country',
        code: 'NI',
        country: 'Nikaragua',
      },
      {
        __typename: 'Country',
        code: 'PA',
        country: 'Panama',
      },
      {
        __typename: 'Country',
        code: 'PY',
        country: 'Paragwaj',
      },
      {
        __typename: 'Country',
        code: 'PE',
        country: 'Peru',
      },
      {
        __typename: 'Country',
        code: 'PR',
        country: 'Portoryko',
      },
      {
        __typename: 'Country',
        code: 'BL',
        country: 'Saint-Barthélemy',
      },
      {
        __typename: 'Country',
        code: 'KN',
        country: 'Saint Kitts i Nevis',
      },
      {
        __typename: 'Country',
        code: 'LC',
        country: 'Saint Lucia',
      },
      {
        __typename: 'Country',
        code: 'MF',
        country: 'Saint-Martin',
      },
      {
        __typename: 'Country',
        code: 'PM',
        country: 'Saint-Pierre i Miquelon',
      },
      {
        __typename: 'Country',
        code: 'VC',
        country: 'Saint Vincent i Grenadyny',
      },
      {
        __typename: 'Country',
        code: 'SX',
        country: 'Sint Maarten',
      },
      {
        __typename: 'Country',
        code: 'GS',
        country: 'Georgia Południowa i Sandwich Południowy',
      },
      {
        __typename: 'Country',
        code: 'SR',
        country: 'Surinam',
      },
      {
        __typename: 'Country',
        code: 'TT',
        country: 'Trynidad i Tobago',
      },
      {
        __typename: 'Country',
        code: 'TC',
        country: 'Turks i Caicos',
      },
      {
        __typename: 'Country',
        code: 'US',
        country: 'Stany Zjednoczone Ameryki',
      },
      {
        __typename: 'Country',
        code: 'UY',
        country: 'Urugwaj',
      },
      {
        __typename: 'Country',
        code: 'VE',
        country: 'Wenezuela',
      },
      {
        __typename: 'Country',
        code: 'VG',
        country: 'Brytyjskie Wyspy Dziewicze',
      },
      {
        __typename: 'Country',
        code: 'VI',
        country: 'Wyspy Dziewicze Stanów Zjednoczonych',
      },
    ],
    description: 'Shipping zone description',
    id: 'U2hpcHBpbmdab25lOjQ=',
    metadata: [],
    name: 'Americas',
    privateMetadata: [],
  },
  {
    __typename: 'ShippingZone',
    countries: [
      {
        __typename: 'Country',
        code: 'DZ',
        country: 'Algeria',
      },
      {
        __typename: 'Country',
        code: 'AO',
        country: 'Angola',
      },
      {
        __typename: 'Country',
        code: 'BJ',
        country: 'Benin',
      },
      {
        __typename: 'Country',
        code: 'BW',
        country: 'Botswana',
      },
      {
        __typename: 'Country',
        code: 'IO',
        country: 'Brytyjskie Terytorium Oceanu Indyjskiego',
      },
      {
        __typename: 'Country',
        code: 'BF',
        country: 'Burkina Faso',
      },
      {
        __typename: 'Country',
        code: 'BI',
        country: 'Burundi',
      },
      {
        __typename: 'Country',
        code: 'CV',
        country: 'Republika Zielonego Przylądka',
      },
      {
        __typename: 'Country',
        code: 'CM',
        country: 'Kamerun',
      },
      {
        __typename: 'Country',
        code: 'CF',
        country: 'Republika Środkowoafrykańska',
      },
      {
        __typename: 'Country',
        code: 'TD',
        country: 'Czad',
      },
      {
        __typename: 'Country',
        code: 'KM',
        country: 'Komory',
      },
      {
        __typename: 'Country',
        code: 'CG',
        country: 'Kongo',
      },
      {
        __typename: 'Country',
        code: 'CD',
        country: 'Kongo',
      },
      {
        __typename: 'Country',
        code: 'CI',
        country: 'Wybrzeże Kości Słoniowej',
      },
      {
        __typename: 'Country',
        code: 'DJ',
        country: 'Dżibuti',
      },
      {
        __typename: 'Country',
        code: 'EG',
        country: 'Egipt',
      },
      {
        __typename: 'Country',
        code: 'GQ',
        country: 'Gwinea Równikowa',
      },
      {
        __typename: 'Country',
        code: 'ER',
        country: 'Erytrea',
      },
      {
        __typename: 'Country',
        code: 'SZ',
        country: 'Suazi',
      },
      {
        __typename: 'Country',
        code: 'ET',
        country: 'Etiopia',
      },
      {
        __typename: 'Country',
        code: 'TF',
        country: 'Francuskie Terytoria Południowe i Antarktyczne',
      },
      {
        __typename: 'Country',
        code: 'GA',
        country: 'Gabon',
      },
      {
        __typename: 'Country',
        code: 'GM',
        country: 'Gambia',
      },
      {
        __typename: 'Country',
        code: 'GH',
        country: 'Ghana',
      },
      {
        __typename: 'Country',
        code: 'GN',
        country: 'Gwinea',
      },
      {
        __typename: 'Country',
        code: 'GW',
        country: 'Gwinea Bissau',
      },
      {
        __typename: 'Country',
        code: 'KE',
        country: 'Kenia',
      },
      {
        __typename: 'Country',
        code: 'LS',
        country: 'Lesotho',
      },
      {
        __typename: 'Country',
        code: 'LR',
        country: 'Liberia',
      },
      {
        __typename: 'Country',
        code: 'LY',
        country: 'Libia',
      },
      {
        __typename: 'Country',
        code: 'MG',
        country: 'Madagaskar',
      },
      {
        __typename: 'Country',
        code: 'MW',
        country: 'Malawi',
      },
      {
        __typename: 'Country',
        code: 'ML',
        country: 'Mali',
      },
      {
        __typename: 'Country',
        code: 'MR',
        country: 'Mauretania',
      },
      {
        __typename: 'Country',
        code: 'MU',
        country: 'Mauritius',
      },
      {
        __typename: 'Country',
        code: 'YT',
        country: 'Majotta',
      },
      {
        __typename: 'Country',
        code: 'MA',
        country: 'Maroko',
      },
      {
        __typename: 'Country',
        code: 'MZ',
        country: 'Mozambik',
      },
      {
        __typename: 'Country',
        code: 'NA',
        country: 'Namibia',
      },
      {
        __typename: 'Country',
        code: 'NE',
        country: 'Niger',
      },
      {
        __typename: 'Country',
        code: 'NG',
        country: 'Nigeria',
      },
      {
        __typename: 'Country',
        code: 'RE',
        country: 'Reunion',
      },
      {
        __typename: 'Country',
        code: 'RW',
        country: 'Rwanda',
      },
      {
        __typename: 'Country',
        code: 'SH',
        country: 'Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha',
      },
      {
        __typename: 'Country',
        code: 'ST',
        country: 'Wyspy Świętego Tomasza i Książęca',
      },
      {
        __typename: 'Country',
        code: 'SN',
        country: 'Senegal',
      },
      {
        __typename: 'Country',
        code: 'SC',
        country: 'Seszele',
      },
      {
        __typename: 'Country',
        code: 'SL',
        country: 'Sierra Leone',
      },
      {
        __typename: 'Country',
        code: 'SO',
        country: 'Somalia',
      },
      {
        __typename: 'Country',
        code: 'ZA',
        country: 'Republika Południowej Afryki',
      },
      {
        __typename: 'Country',
        code: 'SS',
        country: 'Sudan Południowy',
      },
      {
        __typename: 'Country',
        code: 'SD',
        country: 'Sudan',
      },
      {
        __typename: 'Country',
        code: 'TZ',
        country: 'Tanzania',
      },
      {
        __typename: 'Country',
        code: 'TG',
        country: 'Togo',
      },
      {
        __typename: 'Country',
        code: 'TN',
        country: 'Tunezja',
      },
      {
        __typename: 'Country',
        code: 'UG',
        country: 'Uganda',
      },
      {
        __typename: 'Country',
        code: 'EH',
        country: 'Sahara Zachodnia',
      },
      {
        __typename: 'Country',
        code: 'ZM',
        country: 'Zambia',
      },
      {
        __typename: 'Country',
        code: 'ZW',
        country: 'Zimbabwe',
      },
    ],
    description: 'Shipping zone description',
    id: 'U2hpcHBpbmdab25lOjU=',
    metadata: [],
    name: 'Africa',
    privateMetadata: [],
  },
];

export const shippingZone: ShippingZoneQuery['shippingZone'] = {
  __typename: 'ShippingZone',
  default: true,
  channels: [
    { __typename: 'Channel', id: 'channel1', name: 'GBP', currencyCode: 'GBP' },

    { __typename: 'Channel', id: 'channel2', name: 'PLN', currencyCode: 'PLN' },
  ],
  countries: [
    {
      __typename: 'Country',
      code: 'AX',
      country: 'Wyspy Alandzkie',
    },
    {
      __typename: 'Country',
      code: 'AL',
      country: 'Albania',
    },
    {
      __typename: 'Country',
      code: 'AD',
      country: 'Andora',
    },
    {
      __typename: 'Country',
      code: 'AT',
      country: 'Austria',
    },
    {
      __typename: 'Country',
      code: 'BY',
      country: 'Białoruś',
    },
    {
      __typename: 'Country',
      code: 'BE',
      country: 'Belgia',
    },
    {
      __typename: 'Country',
      code: 'BA',
      country: 'Bośnia i Hercegowina',
    },
    {
      __typename: 'Country',
      code: 'BG',
      country: 'Bułgaria',
    },
    {
      __typename: 'Country',
      code: 'HR',
      country: 'Chorwacja',
    },
    {
      __typename: 'Country',
      code: 'CZ',
      country: 'Czechy',
    },
    {
      __typename: 'Country',
      code: 'DK',
      country: 'Dania',
    },
    {
      __typename: 'Country',
      code: 'EE',
      country: 'Estonia',
    },
    {
      __typename: 'Country',
      code: 'FO',
      country: 'Wyspy Owcze',
    },
    {
      __typename: 'Country',
      code: 'FI',
      country: 'Finlandia',
    },
    {
      __typename: 'Country',
      code: 'FR',
      country: 'Francja',
    },
    {
      __typename: 'Country',
      code: 'DE',
      country: 'Niemcy',
    },
    {
      __typename: 'Country',
      code: 'GI',
      country: 'Gibraltar',
    },
    {
      __typename: 'Country',
      code: 'GR',
      country: 'Grecja',
    },
    {
      __typename: 'Country',
      code: 'GG',
      country: 'Guernsey',
    },
    {
      __typename: 'Country',
      code: 'VA',
      country: 'Watykan',
    },
    {
      __typename: 'Country',
      code: 'HU',
      country: 'Węgry',
    },
    {
      __typename: 'Country',
      code: 'IS',
      country: 'Islandia',
    },
    {
      __typename: 'Country',
      code: 'IE',
      country: 'Irlandia',
    },
    {
      __typename: 'Country',
      code: 'IM',
      country: 'Wyspa Man',
    },
    {
      __typename: 'Country',
      code: 'IT',
      country: 'Włochy',
    },
    {
      __typename: 'Country',
      code: 'JE',
      country: 'Jersey',
    },
    {
      __typename: 'Country',
      code: 'LV',
      country: 'Łotwa',
    },
    {
      __typename: 'Country',
      code: 'LI',
      country: 'Liechtenstein',
    },
    {
      __typename: 'Country',
      code: 'LT',
      country: 'Litwa',
    },
    {
      __typename: 'Country',
      code: 'LU',
      country: 'Luksemburg',
    },
    {
      __typename: 'Country',
      code: 'MK',
      country: 'Macedonia',
    },
    {
      __typename: 'Country',
      code: 'MT',
      country: 'Malta',
    },
    {
      __typename: 'Country',
      code: 'MD',
      country: 'Mołdawia',
    },
    {
      __typename: 'Country',
      code: 'MC',
      country: 'Monako',
    },
    {
      __typename: 'Country',
      code: 'ME',
      country: 'Czarnogóra',
    },
    {
      __typename: 'Country',
      code: 'NL',
      country: 'Holandia',
    },
    {
      __typename: 'Country',
      code: 'NO',
      country: 'Norwegia',
    },
    {
      __typename: 'Country',
      code: 'PL',
      country: 'Polska',
    },
    {
      __typename: 'Country',
      code: 'PT',
      country: 'Portugalia',
    },
    {
      __typename: 'Country',
      code: 'RO',
      country: 'Rumunia',
    },
    {
      __typename: 'Country',
      code: 'RU',
      country: 'Rosja',
    },
    {
      __typename: 'Country',
      code: 'SM',
      country: 'San Marino',
    },
    {
      __typename: 'Country',
      code: 'RS',
      country: 'Serbia',
    },
    {
      __typename: 'Country',
      code: 'SK',
      country: 'Słowacja',
    },
    {
      __typename: 'Country',
      code: 'SI',
      country: 'Słowenia',
    },
    {
      __typename: 'Country',
      code: 'ES',
      country: 'Hiszpania',
    },
    {
      __typename: 'Country',
      code: 'SJ',
      country: 'Svalbard i Jan Mayen',
    },
    {
      __typename: 'Country',
      code: 'SE',
      country: 'Szwecja',
    },
    {
      __typename: 'Country',
      code: 'CH',
      country: 'Szwajcaria',
    },
    {
      __typename: 'Country',
      code: 'UA',
      country: 'Ukraina',
    },
    {
      __typename: 'Country',
      code: 'GB',
      country: 'Wielka Brytania',
    },
  ],
  description: 'Shipping zone description',
  id: 'U2hpcHBpbmdab25lOjE=',
  metadata: [],
  name: 'Europe',
  privateMetadata: [],
  shippingMethods: [
    {
      __typename: 'ShippingMethod',
      taxClass: {
        __typename: 'TaxClass',
        name: 'Shipping method',
        id: 'VGV4Q2xhc3M6MQ==',
      },
      channelListings: [
        {
          __typename: 'ShippingMethodChannelListing',
          channel: {
            __typename: 'Channel',
            currencyCode: 'USD',
            id: 'Q2hhbm5lbDo5',
            name: 'Channel USD',
          },
          id: 'U2hpcHBpbmdNZXRob2RDaGFubmVsTGlzdGluZzo0',
          maximumOrderPrice: {
            __typename: 'Money',
            amount: 2,
            currency: 'USD',
          },
          minimumOrderPrice: {
            __typename: 'Money',
            amount: 1,
            currency: 'USD',
          },
          price: {
            __typename: 'Money',
            amount: 86.21,
            currency: 'USD',
          },
        },
      ],
      excludedProducts: {
        __typename: 'ProductConnection',
        edges: [
          {
            __typename: 'ProductCountableEdge',
            node: {
              __typename: 'Product',
              id: '1',
              name: 'Apple Juice',
              thumbnail: {
                __typename: 'Image',
                url: '',
              },
            },
          },
        ],
        pageInfo: {
          __typename: 'PageInfo',
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
        },
      },
      id: 'U2hpcHBpbmdNZXRob2Q6NA==',
      maximumDeliveryDays: 10,
      maximumOrderWeight: {
        __typename: 'Weight',
        unit: WeightUnit.Kg,
        value: 80,
      },
      metadata: [],
      minimumDeliveryDays: 0,
      minimumOrderWeight: {
        __typename: 'Weight',
        unit: WeightUnit.Kg,
        value: 0,
      },
      name: 'DB Schenker',
      description: `{"time": 1618487908762, "blocks": [{"data": {"text": "General shipping method"}, "type": "paragraph"}], "version": "2.20.0"}`,
      postalCodeRules: [
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: '51-220',
          id: '1',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-210',
        },
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: '51-240',
          id: '2',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-235',
        },
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: null,
          id: '2',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-274',
        },
      ],
      privateMetadata: [],
    },
    {
      __typename: 'ShippingMethod',
      taxClass: {
        __typename: 'TaxClass',
        name: 'Shipping method',
        id: 'VGV4Q2xhc3M6MQ==',
      },
      channelListings: [],
      excludedProducts: {
        __typename: 'ProductConnection',
        edges: [
          {
            __typename: 'ProductCountableEdge',
            node: {
              __typename: 'Product',
              id: '1',
              name: 'Apple Juice',
              thumbnail: {
                __typename: 'Image',
                url: '',
              },
            },
          },
        ],
        pageInfo: {
          __typename: 'PageInfo',
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
        },
      },
      id: 'U2hpcHBpbmdNZXRob2Q6Mw==',
      maximumDeliveryDays: 10,
      maximumOrderWeight: null,
      metadata: [],
      minimumDeliveryDays: 0,
      minimumOrderWeight: {
        __typename: 'Weight',
        unit: WeightUnit.Kg,
        value: 0,
      },
      name: 'Registred priority',
      description: `{"time": 1618487908762, "blocks": [{"data": {"text": "Priority shipping method"}, "type": "paragraph"}], "version": "2.20.0"}`,
      postalCodeRules: [
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: '51-220',
          id: '1',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-210',
        },
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: '51-240',
          id: '2',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-235',
        },
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: null,
          id: '2',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-274',
        },
      ],
      privateMetadata: [],
    },
    {
      __typename: 'ShippingMethod',
      taxClass: {
        __typename: 'TaxClass',
        name: 'Shipping method',
        id: 'VGV4Q2xhc3M6MQ==',
      },
      channelListings: [],
      excludedProducts: {
        __typename: 'ProductConnection',
        edges: [
          {
            __typename: 'ProductCountableEdge',
            node: {
              __typename: 'Product',
              id: '1',
              name: 'Apple Juice',
              thumbnail: {
                __typename: 'Image',
                url: '',
              },
            },
          },
        ],
        pageInfo: {
          __typename: 'PageInfo',
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
        },
      },
      id: 'U2hpcHBpbmdNZXRob2Q6Mg==',
      maximumDeliveryDays: 10,
      maximumOrderWeight: null,
      metadata: [],
      minimumDeliveryDays: 0,
      minimumOrderWeight: {
        __typename: 'Weight',
        unit: WeightUnit.Kg,
        value: 0,
      },
      name: 'UPS',
      description: `{"time": 1618487908762, "blocks": [{"data": {"text": "Different shipping method"}, "type": "paragraph"}], "version": "2.20.0"}`,
      postalCodeRules: [
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: '51-220',
          id: '1',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-210',
        },
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: '51-240',
          id: '2',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-235',
        },
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: null,
          id: '2',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-274',
        },
      ],
      privateMetadata: [],
    },
    {
      __typename: 'ShippingMethod',
      taxClass: {
        __typename: 'TaxClass',
        name: 'Shipping method',
        id: 'VGV4Q2xhc3M6MQ==',
      },
      channelListings: [],
      excludedProducts: {
        __typename: 'ProductConnection',
        edges: [],
        pageInfo: {
          __typename: 'PageInfo',
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
        },
      },
      id: 'U2hpcHBpbmdNZXRob2Q6MQ==',
      maximumDeliveryDays: 10,
      maximumOrderWeight: null,
      metadata: [],
      minimumDeliveryDays: 0,
      minimumOrderWeight: {
        __typename: 'Weight',
        unit: WeightUnit.Kg,
        value: 0,
      },
      name: 'DHL',
      description: `{"time": 1618487908762, "blocks": [{"data": {"text": "Different shipping method"}, "type": "paragraph"}], "version": "2.20.0"}`,
      postalCodeRules: [
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: '51-220',
          id: '1',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-210',
        },
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: '51-240',
          id: '2',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-235',
        },
        {
          __typename: 'ShippingMethodPostalCodeRule',
          end: null,
          id: '2',
          inclusionType: PostalCodeRuleInclusionType.Exclude,
          start: '51-274',
        },
      ],
      privateMetadata: [],
    },
  ],
  warehouses: [
    {
      __typename: 'Warehouse',
      id: 'V2FyZWhvdXNlOmEzMThmMGZlLTcwMmYtNDNjYy1hYmFjLWZmZmMzN2Y3ZTliYw==',
      name: 'C our wares',
    },
    {
      __typename: 'Warehouse',
      id: 'V2FyZWhvdXNlOjJmN2UyOTlmLWEwMzMtNDhjZS1iYmM5LTFkZDM4NjU2ZjMwYw==',
      name: 'Be stocked',
    },
  ],
};

export const products: RelayToFlat<NonNullable<SearchProductsQuery['search']>> = [
  {
    __typename: 'Product',
    id: '1',
    name: 'Apple Juice',
    thumbnail: {
      __typename: 'Image',
      url: '',
    },
    collections: [{ __typename: 'Collection', id: 'Q29sbGVjdGlvbjo0' }],
    variants: [
      {
        __typename: 'Product',
        id: 'UHJvZHVjdFZhcmlhbnQ6MjAz',
        name: '1l',
        sku: '43226647',
        channelListings: [
          {
            __typename: 'ProductChannelListing',
            channel: {
              __typename: 'Channel',
              id: 'Q2hhbm5lbDox',
              isActive: true,
              name: 'Channel-USD',
              currencyCode: 'USD',
            },
            price: {
              __typename: 'Money',
              amount: 5,
              currency: 'USD',
            },
          },
          {
            __typename: 'ProductChannelListing',
            channel: {
              __typename: 'Channel',
              id: 'Q2hhbm5lbDoy',
              isActive: true,
              name: 'Channel-PLN',
              currencyCode: 'PLN',
            },
            price: {
              __typename: 'Money',
              amount: 20,
              currency: 'PLN',
            },
          },
        ],
      },
    ],
  },
];
