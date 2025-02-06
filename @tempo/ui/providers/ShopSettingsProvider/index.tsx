'use client';

import type {
  CountryCode,
  ShopInfoQuery,
  ShopInfoQueryVariables,
  ShopSettingsFragment,
} from '@tempo/api/generated/graphql';
import { ShopInfoDocument } from '@tempo/api/generated/graphql';
import { gql } from '@tempo/api';
import type { PaymentMethodID, PaymentProviderID } from '@tempo/checkout/types/payments';
import type { StateCode } from '@tempo/next/types/addresses';
import { useQuery } from '@tempo/api/hooks';
import type { Locale } from '@tempo/utils/regions';
import omitBy from 'lodash-es/omitBy';
import type { FC, ReactNode } from 'react';
import { useEffect, useState, createContext, useContext } from 'react';
import isEqual from 'react-fast-compare';

export const STOREFRONT_NAME = process.env.NEXT_PUBLIC_STOREFRONT_NAME ?? '';

export const STOREFRONT_ADDRESS = process.env.NEXT_PUBLIC_STOREFRONT_ADDRESS ?? '';
export const STOREFRONT_CITY = process.env.NEXT_PUBLIC_STOREFRONT_CITY ?? '';
export const STOREFRONT_STATE = process.env.NEXT_PUBLIC_STOREFRONT_STATE ?? '';
export const STOREFRONT_ZIP = process.env.NEXT_PUBLIC_STOREFRONT_ZIP ?? '';
export const STOREFRONT_COUNTRY = process.env.NEXT_PUBLIC_STOREFRONT_COUNTRY ?? '';

export const STOREFRONT_PHONE = process.env.NEXT_PUBLIC_STOREFRONT_PHONE ?? '';
export const STOREFRONT_EMAIL = process.env.NEXT_PUBLIC_STOREFRONT_EMAIL ?? '';

export const CHECKOUT_TOKEN = 'checkoutToken';

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
export const HOMEPAGE_MENU = process.env.NEXT_PUBLIC_HOMEPAGE_MENU || '';
export const GEOLOCATION = process.env.NEXT_PUBLIC_GEOLOCATION === 'true';

export const DEFAULT_CHANNEL = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL || 'default';
// TODO: validate
export const DEFAULT_LOCALE = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en-US') as Locale;
// TODO: validate
export const DEFAULT_COUNTRY = (process.env.NEXT_PUBLIC_DEFAULT_COUNTRY || 'US') as CountryCode;

export const COUNTRY_FRAGMENT = gql(`
  fragment Country on Country {
    name
    code
  }
`);

export const LANGUAGE_FRAGMENT = gql(`
  fragment Language on LanguageDisplay {
    code
    language
  }
`);

export const SHOP_SETTINGS_FRAGMENT = gql(`
  fragment ShopSettings on Site {
    countries {
      ...Country
    }
    allowedStates
    defaultCountry {
      ...Country
    }
    defaultWeightUnit
    domain
    languages {
      ...Language
    }
    logo {
      url
      alt
      height
      width
    }
    name
    trackInventoryByDefault
    maxItemCountPerCheckout
  }
`);

interface HardCodedShopSettings {
  demoMode: boolean;
  shopAddress: string;
  shopCity: string;
  shopState: string;
  shopZip: string;
  shopCountry: string;
  shopPhone: string;
  shopEmail: string;
  allowedStates: StateCode[];
  defaultLocale: Locale;
  displayPrices: boolean;
  displayProductImages: boolean;
  enableCart: boolean;
  enableDiscounts: boolean;
  enableLocaleSwitcher: boolean;
  enableLogin: boolean;
  enableFulfillmentDeadline: boolean;
  enableGiftCards: boolean;
  enableGoogleMapsAPI: boolean;
  enableMetadata: boolean;
  enableOrderHistoryComments: boolean;
  enablePointsOfContact: boolean;
  enableSearch: boolean;
  enableStockTracking: boolean;
  enableTranslations: boolean;
  enableUseSameAsBilling: boolean;
  fulfillmentTypes: ('shipping' | 'delivery' | 'pickup')[];
  fulfillmentAddressExcludedFields: string[];
  omitNameFromShippingAddress: boolean;
  paymentMethods: PaymentMethodID[];
  paymentProviders: PaymentProviderID[];
}

export type ShopSettings = HardCodedShopSettings &
  NonNullable<Omit<ShopSettingsFragment, '__typename'>>;

const DEFAULTS: ShopSettings = {
  countries: [],
  defaultCountry: {
    __typename: 'Country',
    code: DEFAULT_COUNTRY,
    name: '', // TODO
  },
  defaultLocale: DEFAULT_LOCALE,
  defaultWeightUnit: 'LB',
  demoMode: DEMO_MODE,
  domain: '',
  displayProductImages: true,
  displayPrices: true,
  enableCart: true,
  enableDiscounts: false,
  enableFulfillmentDeadline: false,
  enableGiftCards: false,
  enableGoogleMapsAPI: false,
  enableLocaleSwitcher: false,
  enableLogin: true,
  enableMetadata: false,
  enableOrderHistoryComments: false,
  enablePointsOfContact: false,
  enableSearch: false,
  enableStockTracking: false,
  enableTranslations: false,
  enableUseSameAsBilling: true,
  fulfillmentTypes: ['shipping'],
  fulfillmentAddressExcludedFields: [],
  languages: [],
  logo: {
    __typename: 'Image',
    url: '/logo-black.svg',
    height: 48,
    width: 192,
    alt: 'Logo',
  },
  name: STOREFRONT_NAME,
  omitNameFromShippingAddress: false,
  paymentMethods: [],
  paymentProviders: [],
  shopAddress: STOREFRONT_ADDRESS,
  shopCity: STOREFRONT_CITY,
  shopState: STOREFRONT_STATE,
  shopCountry: STOREFRONT_COUNTRY,
  shopZip: STOREFRONT_ZIP,
  shopPhone: STOREFRONT_PHONE,
  shopEmail: STOREFRONT_EMAIL,
  allowedStates: [],
  trackInventoryByDefault: true,
};

const ShopSettingsContext = createContext<ShopSettings>(DEFAULTS);

interface ShopSettingsProviderProps {
  children: ReactNode;
  settings?: Partial<ShopSettings>;
}

export const ShopSettingsProvider: FC<ShopSettingsProviderProps> = ({
  settings: settingsFromProps = {},
  children,
}) => {
  const { data } = useQuery(ShopInfoDocument, {});
  const [settings, setSettings] = useState<ShopSettings>({
    ...DEFAULTS,
    ...settingsFromProps,
    ...(data?.shop ? omitBy(data.shop, (_) => _ == null) : {}),
  });
  useEffect(() => {
    if (!data?.shop) return;
    const mergedSettings = {
      ...DEFAULTS,
      ...settingsFromProps,
      ...(data?.shop ? omitBy(data.shop, (_) => _ == null) : {}),
    };
    if (isEqual(mergedSettings, settings)) return;
    setSettings(mergedSettings);
  }, [data?.shop, settingsFromProps]);
  return (
    <>
      {/* <Head>
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
        <link rel="mask-icon" href={safariPinnedTab} />
      </Head> */}
      <ShopSettingsContext.Provider value={settings}>{children}</ShopSettingsContext.Provider>
    </>
  );
};

export const useShopSettings = () => {
  return useContext(ShopSettingsContext);
};

export default ShopSettingsProvider;
