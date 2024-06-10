export const AccountErrorCode = {
  AccountNotConfirmed: 'ACCOUNT_NOT_CONFIRMED',
  ActivateOwnAccount: 'ACTIVATE_OWN_ACCOUNT',
  ActivateSuperuserAccount: 'ACTIVATE_SUPERUSER_ACCOUNT',
  ChannelInactive: 'CHANNEL_INACTIVE',
  DeactivateOwnAccount: 'DEACTIVATE_OWN_ACCOUNT',
  DeactivateSuperuserAccount: 'DEACTIVATE_SUPERUSER_ACCOUNT',
  DeleteNonStaffUser: 'DELETE_NON_STAFF_USER',
  DeleteOwnAccount: 'DELETE_OWN_ACCOUNT',
  DeleteStaffAccount: 'DELETE_STAFF_ACCOUNT',
  DeleteSuperuserAccount: 'DELETE_SUPERUSER_ACCOUNT',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Inactive: 'INACTIVE',
  Invalid: 'INVALID',
  InvalidCredentials: 'INVALID_CREDENTIALS',
  InvalidPassword: 'INVALID_PASSWORD',
  JwtDecodeError: 'JWT_DECODE_ERROR',
  JwtInvalidCsrfToken: 'JWT_INVALID_CSRF_TOKEN',
  JwtInvalidToken: 'JWT_INVALID_TOKEN',
  JwtMissingToken: 'JWT_MISSING_TOKEN',
  JwtSignatureExpired: 'JWT_SIGNATURE_EXPIRED',
  LeftNotManageablePermission: 'LEFT_NOT_MANAGEABLE_PERMISSION',
  MissingChannelSlug: 'MISSING_CHANNEL_SLUG',
  NotFound: 'NOT_FOUND',
  OutOfScopeGroup: 'OUT_OF_SCOPE_GROUP',
  OutOfScopePermission: 'OUT_OF_SCOPE_PERMISSION',
  OutOfScopeUser: 'OUT_OF_SCOPE_USER',
  PasswordEntirelyNumeric: 'PASSWORD_ENTIRELY_NUMERIC',
  PasswordTooCommon: 'PASSWORD_TOO_COMMON',
  PasswordTooShort: 'PASSWORD_TOO_SHORT',
  PasswordTooSimilar: 'PASSWORD_TOO_SIMILAR',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type AccountErrorCode = typeof AccountErrorCode[keyof typeof AccountErrorCode];
export const AccountEventType = {
  AccountActivated: 'ACCOUNT_ACTIVATED',
  AccountCreated: 'ACCOUNT_CREATED',
  AccountDeactivated: 'ACCOUNT_DEACTIVATED',
  CustomerDeleted: 'CUSTOMER_DELETED',
  DigitalLinkDownloaded: 'DIGITAL_LINK_DOWNLOADED',
  EmailAssigned: 'EMAIL_ASSIGNED',
  EmailChanged: 'EMAIL_CHANGED',
  EmailChangeRequest: 'EMAIL_CHANGE_REQUEST',
  NameAssigned: 'NAME_ASSIGNED',
  NoteAdded: 'NOTE_ADDED',
  NoteAddedToOrder: 'NOTE_ADDED_TO_ORDER',
  PasswordChanged: 'PASSWORD_CHANGED',
  PasswordReset: 'PASSWORD_RESET',
  PasswordResetLinkSent: 'PASSWORD_RESET_LINK_SENT',
  PlacedOrder: 'PLACED_ORDER'
} as const;

export type AccountEventType = typeof AccountEventType[keyof typeof AccountEventType];
export const AddressType = {
  Billing: 'BILLING',
  Shipping: 'SHIPPING'
} as const;

export type AddressType = typeof AddressType[keyof typeof AddressType];
export const AllocationStrategy = {
  PrioritizeHighStock: 'PRIORITIZE_HIGH_STOCK',
  PrioritizeSortingOrder: 'PRIORITIZE_SORTING_ORDER'
} as const;

export type AllocationStrategy = typeof AllocationStrategy[keyof typeof AllocationStrategy];
export const AppErrorCode = {
  Forbidden: 'FORBIDDEN',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  InvalidManifestFormat: 'INVALID_MANIFEST_FORMAT',
  InvalidPermission: 'INVALID_PERMISSION',
  InvalidStatus: 'INVALID_STATUS',
  InvalidUrlFormat: 'INVALID_URL_FORMAT',
  ManifestUrlCantConnect: 'MANIFEST_URL_CANT_CONNECT',
  NotFound: 'NOT_FOUND',
  OutOfScopeApp: 'OUT_OF_SCOPE_APP',
  OutOfScopePermission: 'OUT_OF_SCOPE_PERMISSION',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type AppErrorCode = typeof AppErrorCode[keyof typeof AppErrorCode];
export const AppExtensionMount = {
  CustomerDetailsMoreActions: 'CUSTOMER_DETAILS_MORE_ACTIONS',
  CustomerOverviewCreate: 'CUSTOMER_OVERVIEW_CREATE',
  CustomerOverviewMoreActions: 'CUSTOMER_OVERVIEW_MORE_ACTIONS',
  NavigationCatalog: 'NAVIGATION_CATALOG',
  NavigationCustomers: 'NAVIGATION_CUSTOMERS',
  NavigationDiscounts: 'NAVIGATION_DISCOUNTS',
  NavigationMedia: 'NAVIGATION_MEDIA',
  NavigationOrders: 'NAVIGATION_ORDERS',
  NavigationPages: 'NAVIGATION_PAGES',
  NavigationTranslations: 'NAVIGATION_TRANSLATIONS',
  OrderDetailsMoreActions: 'ORDER_DETAILS_MORE_ACTIONS',
  OrderOverviewCreate: 'ORDER_OVERVIEW_CREATE',
  OrderOverviewMoreActions: 'ORDER_OVERVIEW_MORE_ACTIONS',
  ProductDetailsMoreActions: 'PRODUCT_DETAILS_MORE_ACTIONS',
  ProductOverviewCreate: 'PRODUCT_OVERVIEW_CREATE',
  ProductOverviewMoreActions: 'PRODUCT_OVERVIEW_MORE_ACTIONS'
} as const;

export type AppExtensionMount = typeof AppExtensionMount[keyof typeof AppExtensionMount];
export const AppExtensionTarget = {
  AppPage: 'APP_PAGE',
  Popup: 'POPUP'
} as const;

export type AppExtensionTarget = typeof AppExtensionTarget[keyof typeof AppExtensionTarget];
export const AppOrdering = {
  CreationDate: 'CREATION_DATE',
  Name: 'NAME'
} as const;

export type AppOrdering = typeof AppOrdering[keyof typeof AppOrdering];
export const AppType = {
  Local: 'LOCAL',
  Thirdparty: 'THIRDPARTY'
} as const;

export type AppType = typeof AppType[keyof typeof AppType];
export const AreaUnit = {
  SqCm: 'SQ_CM',
  SqFt: 'SQ_FT',
  SqInch: 'SQ_INCH',
  SqKm: 'SQ_KM',
  SqM: 'SQ_M',
  SqYd: 'SQ_YD'
} as const;

export type AreaUnit = typeof AreaUnit[keyof typeof AreaUnit];
export const AsyncWebhookEventType = {
  AddressCreated: 'ADDRESS_CREATED',
  AddressDeleted: 'ADDRESS_DELETED',
  AddressUpdated: 'ADDRESS_UPDATED',
  Any: 'ANY',
  AppDeleted: 'APP_DELETED',
  AppInstalled: 'APP_INSTALLED',
  AppStatusChanged: 'APP_STATUS_CHANGED',
  AppUpdated: 'APP_UPDATED',
  AttributeCreated: 'ATTRIBUTE_CREATED',
  AttributeDeleted: 'ATTRIBUTE_DELETED',
  AttributeUpdated: 'ATTRIBUTE_UPDATED',
  AttributeValueCreated: 'ATTRIBUTE_VALUE_CREATED',
  AttributeValueDeleted: 'ATTRIBUTE_VALUE_DELETED',
  AttributeValueUpdated: 'ATTRIBUTE_VALUE_UPDATED',
  CategoryCreated: 'CATEGORY_CREATED',
  CategoryDeleted: 'CATEGORY_DELETED',
  CategoryUpdated: 'CATEGORY_UPDATED',
  ChannelCreated: 'CHANNEL_CREATED',
  ChannelDeleted: 'CHANNEL_DELETED',
  ChannelStatusChanged: 'CHANNEL_STATUS_CHANGED',
  ChannelUpdated: 'CHANNEL_UPDATED',
  CheckoutCreated: 'CHECKOUT_CREATED',
  CheckoutMetadataUpdated: 'CHECKOUT_METADATA_UPDATED',
  CheckoutUpdated: 'CHECKOUT_UPDATED',
  CollectionCreated: 'COLLECTION_CREATED',
  CollectionDeleted: 'COLLECTION_DELETED',
  CollectionMetadataUpdated: 'COLLECTION_METADATA_UPDATED',
  CollectionUpdated: 'COLLECTION_UPDATED',
  CustomerCreated: 'CUSTOMER_CREATED',
  CustomerDeleted: 'CUSTOMER_DELETED',
  CustomerMetadataUpdated: 'CUSTOMER_METADATA_UPDATED',
  CustomerUpdated: 'CUSTOMER_UPDATED',
  DraftOrderCreated: 'DRAFT_ORDER_CREATED',
  DraftOrderDeleted: 'DRAFT_ORDER_DELETED',
  DraftOrderUpdated: 'DRAFT_ORDER_UPDATED',
  FulfillmentApproved: 'FULFILLMENT_APPROVED',
  FulfillmentCanceled: 'FULFILLMENT_CANCELED',
  FulfillmentCreated: 'FULFILLMENT_CREATED',
  FulfillmentMetadataUpdated: 'FULFILLMENT_METADATA_UPDATED',
  GiftCardCreated: 'GIFT_CARD_CREATED',
  GiftCardDeleted: 'GIFT_CARD_DELETED',
  GiftCardMetadataUpdated: 'GIFT_CARD_METADATA_UPDATED',
  GiftCardStatusChanged: 'GIFT_CARD_STATUS_CHANGED',
  GiftCardUpdated: 'GIFT_CARD_UPDATED',
  InvoiceDeleted: 'INVOICE_DELETED',
  InvoiceRequested: 'INVOICE_REQUESTED',
  InvoiceSent: 'INVOICE_SENT',
  MediaCreated: 'MEDIA_CREATED',
  MediaDeleted: 'MEDIA_DELETED',
  MediaUpdated: 'MEDIA_UPDATED',
  MenuCreated: 'MENU_CREATED',
  MenuDeleted: 'MENU_DELETED',
  MenuItemCreated: 'MENU_ITEM_CREATED',
  MenuItemDeleted: 'MENU_ITEM_DELETED',
  MenuItemUpdated: 'MENU_ITEM_UPDATED',
  MenuUpdated: 'MENU_UPDATED',
  NotifyUser: 'NOTIFY_USER',
  Observability: 'OBSERVABILITY',
  OrderCancelled: 'ORDER_CANCELLED',
  OrderConfirmed: 'ORDER_CONFIRMED',
  OrderCreated: 'ORDER_CREATED',
  OrderFulfilled: 'ORDER_FULFILLED',
  OrderFullyPaid: 'ORDER_FULLY_PAID',
  OrderMetadataUpdated: 'ORDER_METADATA_UPDATED',
  OrderUpdated: 'ORDER_UPDATED',
  PageCreated: 'PAGE_CREATED',
  PageDeleted: 'PAGE_DELETED',
  PageTypeCreated: 'PAGE_TYPE_CREATED',
  PageTypeDeleted: 'PAGE_TYPE_DELETED',
  PageTypeUpdated: 'PAGE_TYPE_UPDATED',
  PageUpdated: 'PAGE_UPDATED',
  PermissionGroupCreated: 'PERMISSION_GROUP_CREATED',
  PermissionGroupDeleted: 'PERMISSION_GROUP_DELETED',
  PermissionGroupUpdated: 'PERMISSION_GROUP_UPDATED',
  ProductCreated: 'PRODUCT_CREATED',
  ProductDeleted: 'PRODUCT_DELETED',
  ProductMetadataUpdated: 'PRODUCT_METADATA_UPDATED',
  ProductUpdated: 'PRODUCT_UPDATED',
  ProductVariantBackInStock: 'PRODUCT_VARIANT_BACK_IN_STOCK',
  ProductVariantCreated: 'PRODUCT_VARIANT_CREATED',
  ProductVariantDeleted: 'PRODUCT_VARIANT_DELETED',
  ProductVariantMetadataUpdated: 'PRODUCT_VARIANT_METADATA_UPDATED',
  ProductVariantOutOfStock: 'PRODUCT_VARIANT_OUT_OF_STOCK',
  ProductVariantUpdated: 'PRODUCT_VARIANT_UPDATED',
  SaleCreated: 'SALE_CREATED',
  SaleDeleted: 'SALE_DELETED',
  SaleToggle: 'SALE_TOGGLE',
  SaleUpdated: 'SALE_UPDATED',
  ShippingPriceCreated: 'SHIPPING_PRICE_CREATED',
  ShippingPriceDeleted: 'SHIPPING_PRICE_DELETED',
  ShippingPriceUpdated: 'SHIPPING_PRICE_UPDATED',
  ShippingZoneCreated: 'SHIPPING_ZONE_CREATED',
  ShippingZoneDeleted: 'SHIPPING_ZONE_DELETED',
  ShippingZoneMetadataUpdated: 'SHIPPING_ZONE_METADATA_UPDATED',
  ShippingZoneUpdated: 'SHIPPING_ZONE_UPDATED',
  StaffCreated: 'STAFF_CREATED',
  StaffDeleted: 'STAFF_DELETED',
  StaffUpdated: 'STAFF_UPDATED',
  TransactionActionRequest: 'TRANSACTION_ACTION_REQUEST',
  TransactionItemMetadataUpdated: 'TRANSACTION_ITEM_METADATA_UPDATED',
  TranslationCreated: 'TRANSLATION_CREATED',
  TranslationUpdated: 'TRANSLATION_UPDATED',
  VoucherCreated: 'VOUCHER_CREATED',
  VoucherDeleted: 'VOUCHER_DELETED',
  VoucherMetadataUpdated: 'VOUCHER_METADATA_UPDATED',
  VoucherUpdated: 'VOUCHER_UPDATED',
  WarehouseCreated: 'WAREHOUSE_CREATED',
  WarehouseDeleted: 'WAREHOUSE_DELETED',
  WarehouseMetadataUpdated: 'WAREHOUSE_METADATA_UPDATED',
  WarehouseUpdated: 'WAREHOUSE_UPDATED'
} as const;

export type AsyncWebhookEventType = typeof AsyncWebhookEventType[keyof typeof AsyncWebhookEventType];
export const AttributeChoicesOrdering = {
  Name: 'NAME',
  Slug: 'SLUG'
} as const;

export type AttributeChoicesOrdering = typeof AttributeChoicesOrdering[keyof typeof AttributeChoicesOrdering];
export const AttributeEntityType = {
  Page: 'PAGE',
  Product: 'PRODUCT'
} as const;

export type AttributeEntityType = typeof AttributeEntityType[keyof typeof AttributeEntityType];
export const AttributeErrorCode = {
  AlreadyExists: 'ALREADY_EXISTS',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type AttributeErrorCode = typeof AttributeErrorCode[keyof typeof AttributeErrorCode];
export const AttributeInputType = {
  Boolean: 'BOOLEAN',
  Date: 'DATE',
  DateTime: 'DATE_TIME',
  Dropdown: 'DROPDOWN',
  File: 'FILE',
  Multiselect: 'MULTISELECT',
  Numeric: 'NUMERIC',
  PlainText: 'PLAIN_TEXT',
  Reference: 'REFERENCE',
  RichText: 'RICH_TEXT',
  Swatch: 'SWATCH'
} as const;

export type AttributeInputType = typeof AttributeInputType[keyof typeof AttributeInputType];
export const AttributeOrdering = {
  AvailableInGrid: 'AVAILABLE_IN_GRID',
  FilterableInDashboard: 'FILTERABLE_IN_DASHBOARD',
  FilterableInStorefront: 'FILTERABLE_IN_STOREFRONT',
  IsVariantOnly: 'IS_VARIANT_ONLY',
  Name: 'NAME',
  Slug: 'SLUG',
  StorefrontSearchPosition: 'STOREFRONT_SEARCH_POSITION',
  ValueRequired: 'VALUE_REQUIRED',
  VisibleInStorefront: 'VISIBLE_IN_STOREFRONT'
} as const;

export type AttributeOrdering = typeof AttributeOrdering[keyof typeof AttributeOrdering];
export const AttributeType = {
  PageType: 'PAGE_TYPE',
  ProductType: 'PRODUCT_TYPE'
} as const;

export type AttributeType = typeof AttributeType[keyof typeof AttributeType];
export const CategoryOrdering = {
  Name: 'NAME',
  ProductCount: 'PRODUCT_COUNT',
  SubcategoryCount: 'SUBCATEGORY_COUNT'
} as const;

export type CategoryOrdering = typeof CategoryOrdering[keyof typeof CategoryOrdering];
export const ChannelErrorCode = {
  AlreadyExists: 'ALREADY_EXISTS',
  ChannelsCurrencyMustBeTheSame: 'CHANNELS_CURRENCY_MUST_BE_THE_SAME',
  ChannelWithOrders: 'CHANNEL_WITH_ORDERS',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type ChannelErrorCode = typeof ChannelErrorCode[keyof typeof ChannelErrorCode];
export const ChargeStatus = {
  Cancelled: 'CANCELLED',
  FullyCharged: 'FULLY_CHARGED',
  FullyRefunded: 'FULLY_REFUNDED',
  NotCharged: 'NOT_CHARGED',
  PartiallyCharged: 'PARTIALLY_CHARGED',
  PartiallyRefunded: 'PARTIALLY_REFUNDED',
  Pending: 'PENDING',
  Refused: 'REFUSED'
} as const;

export type ChargeStatus = typeof ChargeStatus[keyof typeof ChargeStatus];
export const CheckoutErrorCode = {
  BillingAddressNotSet: 'BILLING_ADDRESS_NOT_SET',
  ChannelInactive: 'CHANNEL_INACTIVE',
  CheckoutNotFullyPaid: 'CHECKOUT_NOT_FULLY_PAID',
  DeliveryMethodNotApplicable: 'DELIVERY_METHOD_NOT_APPLICABLE',
  EmailNotSet: 'EMAIL_NOT_SET',
  GiftCardNotApplicable: 'GIFT_CARD_NOT_APPLICABLE',
  GraphqlError: 'GRAPHQL_ERROR',
  InactivePayment: 'INACTIVE_PAYMENT',
  InsufficientStock: 'INSUFFICIENT_STOCK',
  Invalid: 'INVALID',
  InvalidShippingMethod: 'INVALID_SHIPPING_METHOD',
  MissingChannelSlug: 'MISSING_CHANNEL_SLUG',
  NotFound: 'NOT_FOUND',
  NoLines: 'NO_LINES',
  PaymentError: 'PAYMENT_ERROR',
  ProductNotPublished: 'PRODUCT_NOT_PUBLISHED',
  ProductUnavailableForPurchase: 'PRODUCT_UNAVAILABLE_FOR_PURCHASE',
  QuantityGreaterThanLimit: 'QUANTITY_GREATER_THAN_LIMIT',
  Required: 'REQUIRED',
  ShippingAddressNotSet: 'SHIPPING_ADDRESS_NOT_SET',
  ShippingMethodNotApplicable: 'SHIPPING_METHOD_NOT_APPLICABLE',
  ShippingMethodNotSet: 'SHIPPING_METHOD_NOT_SET',
  ShippingNotRequired: 'SHIPPING_NOT_REQUIRED',
  TaxError: 'TAX_ERROR',
  UnavailableVariantInChannel: 'UNAVAILABLE_VARIANT_IN_CHANNEL',
  Unique: 'UNIQUE',
  VoucherNotApplicable: 'VOUCHER_NOT_APPLICABLE',
  ZeroQuantity: 'ZERO_QUANTITY'
} as const;

export type CheckoutErrorCode = typeof CheckoutErrorCode[keyof typeof CheckoutErrorCode];
export const CheckoutOrdering = {
  CreationDate: 'CREATION_DATE',
  Customer: 'CUSTOMER',
  Payment: 'PAYMENT'
} as const;

export type CheckoutOrdering = typeof CheckoutOrdering[keyof typeof CheckoutOrdering];
export const CollectionErrorCode = {
  CannotManageProductWithoutVariant: 'CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type CollectionErrorCode = typeof CollectionErrorCode[keyof typeof CollectionErrorCode];
export const CollectionOrdering = {
  Availability: 'AVAILABILITY',
  Name: 'NAME',
  ProductCount: 'PRODUCT_COUNT',
  PublishedAt: 'PUBLISHED_AT'
} as const;

export type CollectionOrdering = typeof CollectionOrdering[keyof typeof CollectionOrdering];
export const CollectionPublished = {
  Hidden: 'HIDDEN',
  Published: 'PUBLISHED'
} as const;

export type CollectionPublished = typeof CollectionPublished[keyof typeof CollectionPublished];
export const ConfigurationTypeField = {
  Boolean: 'BOOLEAN',
  Multiline: 'MULTILINE',
  Output: 'OUTPUT',
  Password: 'PASSWORD',
  Secret: 'SECRET',
  SecretMultiline: 'SECRET_MULTILINE',
  String: 'STRING'
} as const;

export type ConfigurationTypeField = typeof ConfigurationTypeField[keyof typeof ConfigurationTypeField];
export const CountryCode = {
  Ad: 'AD',
  Ae: 'AE',
  Af: 'AF',
  Ag: 'AG',
  Ai: 'AI',
  Al: 'AL',
  Am: 'AM',
  Ao: 'AO',
  Aq: 'AQ',
  Ar: 'AR',
  As: 'AS',
  At: 'AT',
  Au: 'AU',
  Aw: 'AW',
  Ax: 'AX',
  Az: 'AZ',
  Ba: 'BA',
  Bb: 'BB',
  Bd: 'BD',
  Be: 'BE',
  Bf: 'BF',
  Bg: 'BG',
  Bh: 'BH',
  Bi: 'BI',
  Bj: 'BJ',
  Bl: 'BL',
  Bm: 'BM',
  Bn: 'BN',
  Bo: 'BO',
  Bq: 'BQ',
  Br: 'BR',
  Bs: 'BS',
  Bt: 'BT',
  Bv: 'BV',
  Bw: 'BW',
  By: 'BY',
  Bz: 'BZ',
  Ca: 'CA',
  Cc: 'CC',
  Cd: 'CD',
  Cf: 'CF',
  Cg: 'CG',
  Ch: 'CH',
  Ci: 'CI',
  Ck: 'CK',
  Cl: 'CL',
  Cm: 'CM',
  Cn: 'CN',
  Co: 'CO',
  Cr: 'CR',
  Cu: 'CU',
  Cv: 'CV',
  Cw: 'CW',
  Cx: 'CX',
  Cy: 'CY',
  Cz: 'CZ',
  De: 'DE',
  Dj: 'DJ',
  Dk: 'DK',
  Dm: 'DM',
  Do: 'DO',
  Dz: 'DZ',
  Ec: 'EC',
  Ee: 'EE',
  Eg: 'EG',
  Eh: 'EH',
  Er: 'ER',
  Es: 'ES',
  Et: 'ET',
  Eu: 'EU',
  Fi: 'FI',
  Fj: 'FJ',
  Fk: 'FK',
  Fm: 'FM',
  Fo: 'FO',
  Fr: 'FR',
  Ga: 'GA',
  Gb: 'GB',
  Gd: 'GD',
  Ge: 'GE',
  Gf: 'GF',
  Gg: 'GG',
  Gh: 'GH',
  Gi: 'GI',
  Gl: 'GL',
  Gm: 'GM',
  Gn: 'GN',
  Gp: 'GP',
  Gq: 'GQ',
  Gr: 'GR',
  Gs: 'GS',
  Gt: 'GT',
  Gu: 'GU',
  Gw: 'GW',
  Gy: 'GY',
  Hk: 'HK',
  Hm: 'HM',
  Hn: 'HN',
  Hr: 'HR',
  Ht: 'HT',
  Hu: 'HU',
  Id: 'ID',
  Ie: 'IE',
  Il: 'IL',
  Im: 'IM',
  In: 'IN',
  Io: 'IO',
  Iq: 'IQ',
  Ir: 'IR',
  Is: 'IS',
  It: 'IT',
  Je: 'JE',
  Jm: 'JM',
  Jo: 'JO',
  Jp: 'JP',
  Ke: 'KE',
  Kg: 'KG',
  Kh: 'KH',
  Ki: 'KI',
  Km: 'KM',
  Kn: 'KN',
  Kp: 'KP',
  Kr: 'KR',
  Kw: 'KW',
  Ky: 'KY',
  Kz: 'KZ',
  La: 'LA',
  Lb: 'LB',
  Lc: 'LC',
  Li: 'LI',
  Lk: 'LK',
  Lr: 'LR',
  Ls: 'LS',
  Lt: 'LT',
  Lu: 'LU',
  Lv: 'LV',
  Ly: 'LY',
  Ma: 'MA',
  Mc: 'MC',
  Md: 'MD',
  Me: 'ME',
  Mf: 'MF',
  Mg: 'MG',
  Mh: 'MH',
  Mk: 'MK',
  Ml: 'ML',
  Mm: 'MM',
  Mn: 'MN',
  Mo: 'MO',
  Mp: 'MP',
  Mq: 'MQ',
  Mr: 'MR',
  Ms: 'MS',
  Mt: 'MT',
  Mu: 'MU',
  Mv: 'MV',
  Mw: 'MW',
  Mx: 'MX',
  My: 'MY',
  Mz: 'MZ',
  Na: 'NA',
  Nc: 'NC',
  Ne: 'NE',
  Nf: 'NF',
  Ng: 'NG',
  Ni: 'NI',
  Nl: 'NL',
  No: 'NO',
  Np: 'NP',
  Nr: 'NR',
  Nu: 'NU',
  Nz: 'NZ',
  Om: 'OM',
  Pa: 'PA',
  Pe: 'PE',
  Pf: 'PF',
  Pg: 'PG',
  Ph: 'PH',
  Pk: 'PK',
  Pl: 'PL',
  Pm: 'PM',
  Pn: 'PN',
  Pr: 'PR',
  Ps: 'PS',
  Pt: 'PT',
  Pw: 'PW',
  Py: 'PY',
  Qa: 'QA',
  Re: 'RE',
  Ro: 'RO',
  Rs: 'RS',
  Ru: 'RU',
  Rw: 'RW',
  Sa: 'SA',
  Sb: 'SB',
  Sc: 'SC',
  Sd: 'SD',
  Se: 'SE',
  Sg: 'SG',
  Sh: 'SH',
  Si: 'SI',
  Sj: 'SJ',
  Sk: 'SK',
  Sl: 'SL',
  Sm: 'SM',
  Sn: 'SN',
  So: 'SO',
  Sr: 'SR',
  Ss: 'SS',
  St: 'ST',
  Sv: 'SV',
  Sx: 'SX',
  Sy: 'SY',
  Sz: 'SZ',
  Tc: 'TC',
  Td: 'TD',
  Tf: 'TF',
  Tg: 'TG',
  Th: 'TH',
  Tj: 'TJ',
  Tk: 'TK',
  Tl: 'TL',
  Tm: 'TM',
  Tn: 'TN',
  To: 'TO',
  Tr: 'TR',
  Tt: 'TT',
  Tv: 'TV',
  Tw: 'TW',
  Tz: 'TZ',
  Ua: 'UA',
  Ug: 'UG',
  Um: 'UM',
  Us: 'US',
  Uy: 'UY',
  Uz: 'UZ',
  Va: 'VA',
  Vc: 'VC',
  Ve: 'VE',
  Vg: 'VG',
  Vi: 'VI',
  Vn: 'VN',
  Vu: 'VU',
  Wf: 'WF',
  Ws: 'WS',
  Ye: 'YE',
  Yt: 'YT',
  Za: 'ZA',
  Zm: 'ZM',
  Zw: 'ZW'
} as const;

export type CountryCode = typeof CountryCode[keyof typeof CountryCode];
export const Currency = {
  Afn: 'AFN',
  All: 'ALL',
  Ang: 'ANG',
  Ars: 'ARS',
  Aud: 'AUD',
  Awg: 'AWG',
  Azn: 'AZN',
  Bam: 'BAM',
  Bbd: 'BBD',
  Bdt: 'BDT',
  Bgn: 'BGN',
  Bmd: 'BMD',
  Bnd: 'BND',
  Bob: 'BOB',
  Brl: 'BRL',
  Bsd: 'BSD',
  Bwp: 'BWP',
  Byr: 'BYR',
  Bzd: 'BZD',
  Cad: 'CAD',
  Chf: 'CHF',
  Clp: 'CLP',
  Cny: 'CNY',
  Cop: 'COP',
  Crc: 'CRC',
  Cup: 'CUP',
  Czk: 'CZK',
  Dkk: 'DKK',
  Dop: 'DOP',
  Eek: 'EEK',
  Egp: 'EGP',
  Eur: 'EUR',
  Fjd: 'FJD',
  Fkp: 'FKP',
  Gbp: 'GBP',
  Ggp: 'GGP',
  Ghc: 'GHC',
  Gip: 'GIP',
  Gtq: 'GTQ',
  Gyd: 'GYD',
  Hkd: 'HKD',
  Hnl: 'HNL',
  Hrk: 'HRK',
  Huf: 'HUF',
  Idr: 'IDR',
  Ils: 'ILS',
  Imp: 'IMP',
  Inr: 'INR',
  Irr: 'IRR',
  Isk: 'ISK',
  Jep: 'JEP',
  Jmd: 'JMD',
  Jpy: 'JPY',
  Kgs: 'KGS',
  Khr: 'KHR',
  Kpw: 'KPW',
  Krw: 'KRW',
  Kyd: 'KYD',
  Kzt: 'KZT',
  Lak: 'LAK',
  Lbp: 'LBP',
  Lkr: 'LKR',
  Lrd: 'LRD',
  Ltl: 'LTL',
  Lvl: 'LVL',
  Mkd: 'MKD',
  Mnt: 'MNT',
  Mur: 'MUR',
  Mxn: 'MXN',
  Myr: 'MYR',
  Mzn: 'MZN',
  Nad: 'NAD',
  Ngn: 'NGN',
  Nio: 'NIO',
  Nok: 'NOK',
  Npr: 'NPR',
  Nzd: 'NZD',
  Omr: 'OMR',
  Pab: 'PAB',
  Pen: 'PEN',
  Php: 'PHP',
  Pkr: 'PKR',
  Pln: 'PLN',
  Pyg: 'PYG',
  Qar: 'QAR',
  Ron: 'RON',
  Rsd: 'RSD',
  Rub: 'RUB',
  Sar: 'SAR',
  Sbd: 'SBD',
  Scr: 'SCR',
  Sek: 'SEK',
  Sgd: 'SGD',
  Shp: 'SHP',
  Sos: 'SOS',
  Srd: 'SRD',
  Svc: 'SVC',
  Syp: 'SYP',
  Thb: 'THB',
  Trl: 'TRL',
  Try: 'TRY',
  Ttd: 'TTD',
  Tvd: 'TVD',
  Twd: 'TWD',
  Uah: 'UAH',
  Usd: 'USD',
  Uyu: 'UYU',
  Uzs: 'UZS',
  Vef: 'VEF',
  Vnd: 'VND',
  Xcd: 'XCD',
  Yer: 'YER',
  Zar: 'ZAR',
  Zwd: 'ZWD'
} as const;

export type Currency = typeof Currency[keyof typeof Currency];
export const DiscountErrorCode = {
  AlreadyExists: 'ALREADY_EXISTS',
  CannotManageProductWithoutVariant: 'CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type DiscountErrorCode = typeof DiscountErrorCode[keyof typeof DiscountErrorCode];
export const DiscountStatus = {
  Active: 'ACTIVE',
  Expired: 'EXPIRED',
  Scheduled: 'SCHEDULED'
} as const;

export type DiscountStatus = typeof DiscountStatus[keyof typeof DiscountStatus];
export const DiscountValueType = {
  Fixed: 'FIXED',
  Percentage: 'PERCENTAGE'
} as const;

export type DiscountValueType = typeof DiscountValueType[keyof typeof DiscountValueType];
export const DistanceUnit = {
  Cm: 'CM',
  Ft: 'FT',
  Inch: 'INCH',
  Km: 'KM',
  M: 'M',
  Yd: 'YD'
} as const;

export type DistanceUnit = typeof DistanceUnit[keyof typeof DistanceUnit];
export const EventDeliveryOrdering = {
  CreatedAt: 'CREATED_AT'
} as const;

export type EventDeliveryOrdering = typeof EventDeliveryOrdering[keyof typeof EventDeliveryOrdering];
export const EventDeliveryStatus = {
  Failed: 'FAILED',
  Pending: 'PENDING',
  Success: 'SUCCESS'
} as const;

export type EventDeliveryStatus = typeof EventDeliveryStatus[keyof typeof EventDeliveryStatus];
export const ExportErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED'
} as const;

export type ExportErrorCode = typeof ExportErrorCode[keyof typeof ExportErrorCode];
export const ExportEventType = {
  ExportedFileSent: 'EXPORTED_FILE_SENT',
  ExportDeleted: 'EXPORT_DELETED',
  ExportFailed: 'EXPORT_FAILED',
  ExportFailedInfoSent: 'EXPORT_FAILED_INFO_SENT',
  ExportPending: 'EXPORT_PENDING',
  ExportSuccess: 'EXPORT_SUCCESS'
} as const;

export type ExportEventType = typeof ExportEventType[keyof typeof ExportEventType];
export const ExportFileOrdering = {
  CreatedAt: 'CREATED_AT',
  LastModifiedAt: 'LAST_MODIFIED_AT',
  Status: 'STATUS'
} as const;

export type ExportFileOrdering = typeof ExportFileOrdering[keyof typeof ExportFileOrdering];
export const ExportScope = {
  All: 'ALL',
  Filter: 'FILTER',
  Ids: 'IDS'
} as const;

export type ExportScope = typeof ExportScope[keyof typeof ExportScope];
export const FileType = {
  Csv: 'CSV',
  Xlsx: 'XLSX'
} as const;

export type FileType = typeof FileType[keyof typeof FileType];
export const FulfillmentMethodType = {
  CollectionPoint: 'COLLECTION_POINT',
  Digital: 'DIGITAL',
  ShippingMethod: 'SHIPPING_METHOD',
  Warehouse: 'WAREHOUSE'
} as const;

export type FulfillmentMethodType = typeof FulfillmentMethodType[keyof typeof FulfillmentMethodType];
export const FulfillmentStatus = {
  Canceled: 'CANCELED',
  Fulfilled: 'FULFILLED',
  Refunded: 'REFUNDED',
  RefundedAndReturned: 'REFUNDED_AND_RETURNED',
  Replaced: 'REPLACED',
  Returned: 'RETURNED',
  WaitingForApproval: 'WAITING_FOR_APPROVAL'
} as const;

export type FulfillmentStatus = typeof FulfillmentStatus[keyof typeof FulfillmentStatus];
export const GiftCardErrorCode = {
  AlreadyExists: 'ALREADY_EXISTS',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  ExpiredGiftCard: 'EXPIRED_GIFT_CARD',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type GiftCardErrorCode = typeof GiftCardErrorCode[keyof typeof GiftCardErrorCode];
export const GiftCardEventType = {
  Activated: 'ACTIVATED',
  BalanceReset: 'BALANCE_RESET',
  Bought: 'BOUGHT',
  Deactivated: 'DEACTIVATED',
  ExpiryDateUpdated: 'EXPIRY_DATE_UPDATED',
  Issued: 'ISSUED',
  NoteAdded: 'NOTE_ADDED',
  Resent: 'RESENT',
  SentToCustomer: 'SENT_TO_CUSTOMER',
  TagsUpdated: 'TAGS_UPDATED',
  Updated: 'UPDATED',
  UsedInOrder: 'USED_IN_ORDER'
} as const;

export type GiftCardEventType = typeof GiftCardEventType[keyof typeof GiftCardEventType];
export const GiftCardOrdering = {
  CreatedAt: 'CREATED_AT',
  CurrentBalance: 'CURRENT_BALANCE',
  Product: 'PRODUCT',
  UsedBy: 'USED_BY'
} as const;

export type GiftCardOrdering = typeof GiftCardOrdering[keyof typeof GiftCardOrdering];
export const GiftCardSettingsErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  Required: 'REQUIRED'
} as const;

export type GiftCardSettingsErrorCode = typeof GiftCardSettingsErrorCode[keyof typeof GiftCardSettingsErrorCode];
export const GiftCardSettingsExpiryType = {
  ExpiryPeriod: 'EXPIRY_PERIOD',
  NeverExpire: 'NEVER_EXPIRE'
} as const;

export type GiftCardSettingsExpiryType = typeof GiftCardSettingsExpiryType[keyof typeof GiftCardSettingsExpiryType];
export const GroupErrorCode = {
  AssignNonStaffMember: 'ASSIGN_NON_STAFF_MEMBER',
  CannotRemoveFromLastGroup: 'CANNOT_REMOVE_FROM_LAST_GROUP',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  LeftNotManageablePermission: 'LEFT_NOT_MANAGEABLE_PERMISSION',
  OutOfScopePermission: 'OUT_OF_SCOPE_PERMISSION',
  OutOfScopeUser: 'OUT_OF_SCOPE_USER',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type GroupErrorCode = typeof GroupErrorCode[keyof typeof GroupErrorCode];
export const GroupOrdering = {
  Name: 'NAME'
} as const;

export type GroupOrdering = typeof GroupOrdering[keyof typeof GroupOrdering];
export const InvoiceErrorCode = {
  EmailNotSet: 'EMAIL_NOT_SET',
  InvalidStatus: 'INVALID_STATUS',
  NotFound: 'NOT_FOUND',
  NotReady: 'NOT_READY',
  NoInvoicePlugin: 'NO_INVOICE_PLUGIN',
  NumberNotSet: 'NUMBER_NOT_SET',
  Required: 'REQUIRED',
  UrlNotSet: 'URL_NOT_SET'
} as const;

export type InvoiceErrorCode = typeof InvoiceErrorCode[keyof typeof InvoiceErrorCode];
export const JobStatus = {
  Deleted: 'DELETED',
  Failed: 'FAILED',
  Pending: 'PENDING',
  Success: 'SUCCESS'
} as const;

export type JobStatus = typeof JobStatus[keyof typeof JobStatus];
export const LanguageCode = {
  Af: 'AF',
  AfNa: 'AF_NA',
  AfZa: 'AF_ZA',
  BmMl: 'BM_ML',
  Bn: 'BN',
  BnBd: 'BN_BD',
  BnIn: 'BN_IN',
  Bo: 'BO',
  BoCn: 'BO_CN',
  BoIn: 'BO_IN',
  Br: 'BR',
  Brx: 'BRX',
  BrxIn: 'BRX_IN',
  BrFr: 'BR_FR',
  Ca: 'CA',
  CaAd: 'CA_AD',
  CaEs: 'CA_ES',
  CaEsValencia: 'CA_ES_VALENCIA',
  CaFr: 'CA_FR',
  CaIt: 'CA_IT',
  Ccp: 'CCP',
  CcpBd: 'CCP_BD',
  CcpIn: 'CCP_IN',
  Ce: 'CE',
  Ceb: 'CEB',
  CebPh: 'CEB_PH',
  CeRu: 'CE_RU',
  Cgg: 'CGG',
  CggUg: 'CGG_UG',
  Chr: 'CHR',
  ChrUs: 'CHR_US',
  Ckb: 'CKB',
  CkbIq: 'CKB_IQ',
  CkbIr: 'CKB_IR',
  Cs: 'CS',
  CsCz: 'CS_CZ',
  Cu: 'CU',
  CuRu: 'CU_RU',
  Cy: 'CY',
  CyGb: 'CY_GB',
  DeAt: 'DE_AT',
  DeBe: 'DE_BE',
  DeCh: 'DE_CH',
  DeDe: 'DE_DE',
  DeLi: 'DE_LI',
  DeLu: 'DE_LU',
  Dsb: 'DSB',
  DsbDe: 'DSB_DE',
  Dua: 'DUA',
  DuaCm: 'DUA_CM',
  Dv: 'DV',
  DvMv: 'DV_MV',
  Dz: 'DZ',
  DzBt: 'DZ_BT',
  Ebu: 'EBU',
  EbuKe: 'EBU_KE',
  Ee: 'EE',
  EeGh: 'EE_GH',
  EeTg: 'EE_TG',
  El: 'EL',
  ElCy: 'EL_CY',
  ElGr: 'EL_GR',
  En: 'EN',
  En_001: 'EN_001',
  En_150: 'EN_150',
  EnAg: 'EN_AG',
  EnAi: 'EN_AI',
  EnAs: 'EN_AS',
  EnAt: 'EN_AT',
  EnAu: 'EN_AU',
  EnBb: 'EN_BB',
  EnBe: 'EN_BE',
  EnBi: 'EN_BI',
  EnBm: 'EN_BM',
  EnBs: 'EN_BS',
  EnBw: 'EN_BW',
  EnBz: 'EN_BZ',
  EnCa: 'EN_CA',
  EnCc: 'EN_CC',
  EnCh: 'EN_CH',
  EnCk: 'EN_CK',
  EnCm: 'EN_CM',
  EnCx: 'EN_CX',
  EnCy: 'EN_CY',
  EnDe: 'EN_DE',
  EnDg: 'EN_DG',
  EnDk: 'EN_DK',
  EnDm: 'EN_DM',
  EnEr: 'EN_ER',
  EnFi: 'EN_FI',
  EnFj: 'EN_FJ',
  EnFk: 'EN_FK',
  EnFm: 'EN_FM',
  EnGb: 'EN_GB',
  EnGd: 'EN_GD',
  EnGg: 'EN_GG',
  EnGh: 'EN_GH',
  EnGi: 'EN_GI',
  EnGm: 'EN_GM',
  EnGu: 'EN_GU',
  EnGy: 'EN_GY',
  EnHk: 'EN_HK',
  EnIe: 'EN_IE',
  EnIl: 'EN_IL',
  EnIm: 'EN_IM',
  EnIn: 'EN_IN',
  EnIo: 'EN_IO',
  EnJe: 'EN_JE',
  EnJm: 'EN_JM',
  EnKe: 'EN_KE',
  EnKi: 'EN_KI',
  EnKn: 'EN_KN',
  EnKy: 'EN_KY',
  EnLc: 'EN_LC',
  EnLr: 'EN_LR',
  EnLs: 'EN_LS',
  EnMg: 'EN_MG',
  EnMh: 'EN_MH',
  EnMo: 'EN_MO',
  EnMp: 'EN_MP',
  EnMs: 'EN_MS',
  EnMt: 'EN_MT',
  EnMu: 'EN_MU',
  EnMw: 'EN_MW',
  EnMy: 'EN_MY',
  EnNa: 'EN_NA',
  EnNf: 'EN_NF',
  EnNg: 'EN_NG',
  EnNl: 'EN_NL',
  EnNo: 'EN_NO',
  EnNr: 'EN_NR',
  EnNu: 'EN_NU',
  EnNz: 'EN_NZ',
  EnPg: 'EN_PG',
  EnPh: 'EN_PH',
  EnPk: 'EN_PK',
  EnPn: 'EN_PN',
  EnPr: 'EN_PR',
  EnPw: 'EN_PW',
  EnRw: 'EN_RW',
  EnSb: 'EN_SB',
  EnSc: 'EN_SC',
  EnSd: 'EN_SD',
  EnSe: 'EN_SE',
  EnSg: 'EN_SG',
  EnSh: 'EN_SH',
  EnSi: 'EN_SI',
  EnSl: 'EN_SL',
  EnSs: 'EN_SS',
  EnSx: 'EN_SX',
  EnSz: 'EN_SZ',
  EnTc: 'EN_TC',
  EnTk: 'EN_TK',
  EnTo: 'EN_TO',
  EnTt: 'EN_TT',
  EnTv: 'EN_TV',
  EnTz: 'EN_TZ',
  EnUg: 'EN_UG',
  EnUm: 'EN_UM',
  EnUs: 'EN_US',
  EnUsPosix: 'EN_US_POSIX',
  EnVc: 'EN_VC',
  EnVg: 'EN_VG',
  EnVi: 'EN_VI',
  EnVu: 'EN_VU',
  EnWs: 'EN_WS',
  EnZa: 'EN_ZA',
  EnZm: 'EN_ZM',
  EnZw: 'EN_ZW',
  Eo: 'EO',
  Es: 'ES',
  Es_419: 'ES_419',
  EsAr: 'ES_AR',
  EsBo: 'ES_BO',
  EsCl: 'ES_CL',
  EsCo: 'ES_CO',
  EsCr: 'ES_CR',
  EsCu: 'ES_CU',
  EsDo: 'ES_DO',
  EsEa: 'ES_EA',
  EsEc: 'ES_EC',
  EsEs: 'ES_ES',
  EsGq: 'ES_GQ',
  EsGt: 'ES_GT',
  EsHn: 'ES_HN',
  EsIc: 'ES_IC',
  EsMx: 'ES_MX',
  EsNi: 'ES_NI',
  EsPa: 'ES_PA',
  EsPe: 'ES_PE',
  EsPh: 'ES_PH',
  EsPr: 'ES_PR',
  EsPy: 'ES_PY',
  EsSv: 'ES_SV',
  EsUs: 'ES_US',
  EsUy: 'ES_UY',
  EsVe: 'ES_VE',
  Et: 'ET',
  EtEe: 'ET_EE',
  Eu: 'EU',
  EuEs: 'EU_ES',
  Ew: 'EW',
  EwCm: 'EW_CM',
  Fa: 'FA',
  FaAf: 'FA_AF',
  FaIr: 'FA_IR',
  Ff: 'FF',
  FfSn: 'FF_SN',
  Fi: 'FI',
  Fil: 'FIL',
  FilPh: 'FIL_PH',
  FiFi: 'FI_FI',
  Fo: 'FO',
  FoDk: 'FO_DK',
  FoFo: 'FO_FO',
  Fr: 'FR',
  FrBe: 'FR_BE',
  FrBf: 'FR_BF',
  FrBi: 'FR_BI',
  FrBj: 'FR_BJ',
  FrBl: 'FR_BL',
  FrCa: 'FR_CA',
  FrCd: 'FR_CD',
  FrCf: 'FR_CF',
  FrCg: 'FR_CG',
  FrCh: 'FR_CH',
  FrCi: 'FR_CI',
  FrCm: 'FR_CM',
  FrDj: 'FR_DJ',
  FrDz: 'FR_DZ',
  FrFr: 'FR_FR',
  FrGa: 'FR_GA',
  FrGf: 'FR_GF',
  FrGn: 'FR_GN',
  FrGp: 'FR_GP',
  FrGq: 'FR_GQ',
  FrHt: 'FR_HT',
  FrKm: 'FR_KM',
  FrLu: 'FR_LU',
  FrMa: 'FR_MA',
  FrMc: 'FR_MC',
  FrMf: 'FR_MF',
  FrMg: 'FR_MG',
  FrMl: 'FR_ML',
  FrMq: 'FR_MQ',
  FrMr: 'FR_MR',
  FrMu: 'FR_MU',
  FrNc: 'FR_NC',
  FrNe: 'FR_NE',
  FrPf: 'FR_PF',
  FrPm: 'FR_PM',
  FrRe: 'FR_RE',
  FrRw: 'FR_RW',
  FrSc: 'FR_SC',
  FrSn: 'FR_SN',
  FrSy: 'FR_SY',
  FrTd: 'FR_TD',
  FrTg: 'FR_TG',
  FrTn: 'FR_TN',
  FrVu: 'FR_VU',
  FrWf: 'FR_WF',
  FrYt: 'FR_YT',
  Fur: 'FUR',
  FurIt: 'FUR_IT',
  Fy: 'FY',
  FyNl: 'FY_NL',
  Ga: 'GA',
  GaIe: 'GA_IE',
  Gd: 'GD',
  GdGb: 'GD_GB',
  Gl: 'GL',
  GlEs: 'GL_ES',
  Gn: 'GN',
  GnPy: 'GN_PY',
  Gsw: 'GSW',
  GswCh: 'GSW_CH',
  GswFr: 'GSW_FR',
  GswLi: 'GSW_LI',
  Gu: 'GU',
  Guz: 'GUZ',
  GuzKe: 'GUZ_KE',
  GuIn: 'GU_IN',
  Gv: 'GV',
  GvGb: 'GV_GB',
  Ha: 'HA',
  Haw: 'HAW',
  HawUs: 'HAW_US',
  HaGh: 'HA_GH',
  HaNe: 'HA_NE',
  HaNg: 'HA_NG',
  He: 'HE',
  HeIl: 'HE_IL',
  Hi: 'HI',
  HiIn: 'HI_IN',
  Hr: 'HR',
  HrBa: 'HR_BA',
  HrHr: 'HR_HR',
  Hsb: 'HSB',
  HsbDe: 'HSB_DE',
  Hu: 'HU',
  HuHu: 'HU_HU',
  Hy: 'HY',
  HyAm: 'HY_AM',
  Id: 'ID',
  IdId: 'ID_ID',
  Ig: 'IG',
  IgNg: 'IG_NG',
  Ii: 'II',
  IiCn: 'II_CN',
  In: 'IN',
  InId: 'IN_ID',
  Is: 'IS',
  IsIs: 'IS_IS',
  It: 'IT',
  ItCh: 'IT_CH',
  ItIt: 'IT_IT',
  Iu: 'IU',
  IuCa: 'IU_CA',
  IuLatn: 'IU_LATN',
  IuLatnCa: 'IU_LATN_CA',
  Ja: 'JA',
  JaJp: 'JA_JP',
  Jbo: 'JBO',
  Jbo_001: 'JBO_001',
  Jgo: 'JGO',
  JgoCm: 'JGO_CM',
  Jmc: 'JMC',
  JmcTz: 'JMC_TZ',
  Jut: 'JUT',
  JutDk: 'JUT_DK',
  Jv: 'JV',
  JvId: 'JV_ID',
  Ka: 'KA',
  Kab: 'KAB',
  KabDz: 'KAB_DZ',
  Kam: 'KAM',
  KamKe: 'KAM_KE',
  KaGe: 'KA_GE',
  Kcg: 'KCG',
  KcgNg: 'KCG_NG',
  Kda: 'KDA',
  KdaCi: 'KDA_CI',
  Kea: 'KEA',
  KeaCv: 'KEA_CV',
  Khq: 'KHQ',
  KhqMl: 'KHQ_ML',
  Ki: 'KI',
  KiKe: 'KI_KE',
  Kk: 'KK',
  Kkj: 'KKJ',
  KkjCm: 'KKJ_CM',
  KkKz: 'KK_KZ',
  Kl: 'KL',
  Kln: 'KLN',
  KlnKe: 'KLN_KE',
  KlGl: 'KL_GL',
  Km: 'KM',
  KmKh: 'KM_KH',
  Kn: 'KN',
  KnIn: 'KN_IN',
  Ko: 'KO',
  Kok: 'KOK',
  KokIn: 'KOK_IN',
  KoKp: 'KO_KP',
  KoKr: 'KO_KR',
  Kr: 'KR',
  KrNg: 'KR_NG',
  Ks: 'KS',
  Ksb: 'KSB',
  KsbTz: 'KSB_TZ',
  Ksf: 'KSF',
  KsfCm: 'KSF_CM',
  Ksh: 'KSH',
  KshDe: 'KSH_DE',
  KsArab: 'KS_ARAB',
  KsArabIn: 'KS_ARAB_IN',
  KsIn: 'KS_IN',
  Kw: 'KW',
  KwGb: 'KW_GB',
  Ky: 'KY',
  KyKg: 'KY_KG',
  La: 'LA',
  Lag: 'LAG',
  LagTz: 'LAG_TZ',
  La_001: 'LA_001',
  Lb: 'LB',
  LbLu: 'LB_LU',
  Lg: 'LG',
  LgUg: 'LG_UG',
  Lkt: 'LKT',
  LktUs: 'LKT_US',
  Ln: 'LN',
  LnAo: 'LN_AO',
  LnCd: 'LN_CD',
  LnCf: 'LN_CF',
  LnCg: 'LN_CG',
  Lo: 'LO',
  LoLa: 'LO_LA',
  Lt: 'LT',
  LtLt: 'LT_LT',
  Lu: 'LU',
  Luo: 'LUO',
  LuoKe: 'LUO_KE',
  Luy: 'LUY',
  LuyKe: 'LUY_KE',
  LuCd: 'LU_CD',
  Lv: 'LV',
  LvLv: 'LV_LV',
  Mas: 'MAS',
  MasKe: 'MAS_KE',
  MasTz: 'MAS_TZ',
  Mer: 'MER',
  MerKe: 'MER_KE',
  Mfe: 'MFE',
  MfeMu: 'MFE_MU',
  Mg: 'MG',
  Mgh: 'MGH',
  MghMz: 'MGH_MZ',
  Mgo: 'MGO',
  MgoCm: 'MGO_CM',
  MgMg: 'MG_MG',
  Mh: 'MH',
  MhMh: 'MH_MH',
  Mi: 'MI',
  MiNz: 'MI_NZ',
  Mk: 'MK',
  MkMk: 'MK_MK',
  Ml: 'ML',
  MlIn: 'ML_IN',
  Mn: 'MN',
  MnMn: 'MN_MN',
  Moh: 'MOH',
  MohCa: 'MOH_CA',
  Mr: 'MR',
  MrIn: 'MR_IN',
  Ms: 'MS',
  MsBn: 'MS_BN',
  MsMy: 'MS_MY',
  MsSg: 'MS_SG',
  Mt: 'MT',
  MtMt: 'MT_MT',
  Mua: 'MUA',
  MuaCm: 'MUA_CM',
  My: 'MY',
  MyMm: 'MY_MM',
  Naq: 'NAQ',
  NaqNa: 'NAQ_NA',
  Nb: 'NB',
  NbNo: 'NB_NO',
  NbSj: 'NB_SJ',
  Nd: 'ND',
  NdSn: 'ND_SN',
  NdZw: 'ND_ZW',
  Ne: 'NE',
  Nen: 'NEN',
  NenNc: 'NEN_NC',
  NeIn: 'NE_IN',
  NeNp: 'NE_NP',
  Nl: 'NL',
  NlAw: 'NL_AW',
  NlBe: 'NL_BE',
  NlBq: 'NL_BQ',
  NlCw: 'NL_CW',
  NlNl: 'NL_NL',
  NlSx: 'NL_SX',
  Nmg: 'NMG',
  NmgCm: 'NMG_CM',
  Nn: 'NN',
  Nnh: 'NNH',
  NnhCm: 'NNH_CM',
  NnNo: 'NN_NO',
  No: 'NO',
  NoNo: 'NO_NO',
  NoNoNy: 'NO_NO_NY',
  Nr: 'NR',
  NrZa: 'NR_ZA',
  Nus: 'NUS',
  NusSd: 'NUS_SD',
  Nv: 'NV',
  NvUs: 'NV_US',
  Ny: 'NY',
  Nyn: 'NYN',
  NynUg: 'NYN_UG',
  NyMw: 'NY_MW',
  NyZm: 'NY_ZM',
  Oc: 'OC',
  OcFr: 'OC_FR',
  Olo: 'OLO',
  OloRu: 'OLO_RU',
  Om: 'OM',
  OmEt: 'OM_ET',
  OmKe: 'OM_KE',
  Or: 'OR',
  OrIn: 'OR_IN',
  Os: 'OS',
  OsGe: 'OS_GE',
  OsRu: 'OS_RU',
  Pa: 'PA',
  Pap: 'PAP',
  Pap_029: 'PAP_029',
  PaArab: 'PA_ARAB',
  PaArabPk: 'PA_ARAB_PK',
  PaGuru: 'PA_GURU',
  PaGuruIn: 'PA_GURU_IN',
  Pl: 'PL',
  PlPl: 'PL_PL',
  Prg: 'PRG',
  Prg_001: 'PRG_001',
  Ps: 'PS',
  PsAf: 'PS_AF',
  Pt: 'PT',
  PtAo: 'PT_AO',
  PtBr: 'PT_BR',
  PtCh: 'PT_CH',
  PtCv: 'PT_CV',
  PtGq: 'PT_GQ',
  PtGw: 'PT_GW',
  PtLu: 'PT_LU',
  PtMo: 'PT_MO',
  PtMz: 'PT_MZ',
  PtPt: 'PT_PT',
  PtSt: 'PT_ST',
  PtTl: 'PT_TL',
  Qu: 'QU',
  QuBo: 'QU_BO',
  QuEc: 'QU_EC',
  QuPe: 'QU_PE',
  Rm: 'RM',
  RmCh: 'RM_CH',
  Rn: 'RN',
  RnBi: 'RN_BI',
  Ro: 'RO',
  Rof: 'ROF',
  RofTz: 'ROF_TZ',
  RoMd: 'RO_MD',
  RoRo: 'RO_RO',
  Ru: 'RU',
  RuBy: 'RU_BY',
  RuKg: 'RU_KG',
  RuKz: 'RU_KZ',
  RuMd: 'RU_MD',
  RuRu: 'RU_RU',
  RuUa: 'RU_UA',
  Rw: 'RW',
  Rwk: 'RWK',
  RwkTz: 'RWK_TZ',
  RwRw: 'RW_RW',
  Sah: 'SAH',
  SahRu: 'SAH_RU',
  Saq: 'SAQ',
  SaqKe: 'SAQ_KE',
  Sbp: 'SBP',
  SbpTz: 'SBP_TZ',
  Sd: 'SD',
  SdArab: 'SD_ARAB',
  SdArabPk: 'SD_ARAB_PK',
  Se: 'SE',
  Seh: 'SEH',
  SehMz: 'SEH_MZ',
  Ses: 'SES',
  SesMl: 'SES_ML',
  SeFi: 'SE_FI',
  SeNo: 'SE_NO',
  SeSe: 'SE_SE',
  Sg: 'SG',
  SgCf: 'SG_CF',
  Shi: 'SHI',
  ShiLatn: 'SHI_LATN',
  ShiLatnMa: 'SHI_LATN_MA',
  ShiTfng: 'SHI_TFNG',
  ShiTfngMa: 'SHI_TFNG_MA',
  Si: 'SI',
  SiLk: 'SI_LK',
  Sk: 'SK',
  SkSk: 'SK_SK',
  Sl: 'SL',
  SlSi: 'SL_SI',
  Smc: 'SMC',
  SmcIn: 'SMC_IN',
  Smn: 'SMN',
  SmnFi: 'SMN_FI',
  Sn: 'SN',
  SnZw: 'SN_ZW',
  So: 'SO',
  SoDj: 'SO_DJ',
  SoEt: 'SO_ET',
  SoKe: 'SO_KE',
  SoSo: 'SO_SO',
  Sq: 'SQ',
  SqAl: 'SQ_AL',
  SqMk: 'SQ_MK',
  SqXk: 'SQ_XK',
  Sr: 'SR',
  Srn: 'SRN',
  SrnSr: 'SRN_SR',
  SrCyrl: 'SR_CYRL',
  SrCyrlBa: 'SR_CYRL_BA',
  SrCyrlMe: 'SR_CYRL_ME',
  SrCyrlRs: 'SR_CYRL_RS',
  SrLatn: 'SR_LATN',
  SrLatnBa: 'SR_LATN_BA',
  SrLatnMe: 'SR_LATN_ME',
  SrLatnRs: 'SR_LATN_RS',
  Ss: 'SS',
  Ssb: 'SSB',
  SsbNo: 'SSB_NO',
  SsSz: 'SS_SZ',
  SsZa: 'SS_ZA',
  St: 'ST',
  StLs: 'ST_LS',
  StZa: 'ST_ZA',
  Su: 'SU',
  SuId: 'SU_ID',
  Sv: 'SV',
  SvAx: 'SV_AX',
  SvFi: 'SV_FI',
  SvSe: 'SV_SE',
  Sw: 'SW',
  SwCd: 'SW_CD',
  SwKe: 'SW_KE',
  SwTz: 'SW_TZ',
  SwUg: 'SW_UG',
  Ta: 'TA',
  TaIn: 'TA_IN',
  TaLk: 'TA_LK',
  TaMy: 'TA_MY',
  TaSg: 'TA_SG',
  Tcy: 'TCY',
  TcyIn: 'TCY_IN',
  Te: 'TE',
  Tea: 'TEA',
  TeaIn: 'TEA_IN',
  Teo: 'TEO',
  TeoKe: 'TEO_KE',
  TeoUg: 'TEO_UG',
  TeIn: 'TE_IN',
  Tg: 'TG',
  TgCyrl: 'TG_CYRL',
  TgCyrlTj: 'TG_CYRL_TJ',
  Th: 'TH',
  ThTh: 'TH_TH',
  Ti: 'TI',
  Tig: 'TIG',
  TigEr: 'TIG_ER',
  TiEr: 'TI_ER',
  TiEt: 'TI_ET',
  Tk: 'TK',
  TkTm: 'TK_TM',
  Tn: 'TN',
  TnBw: 'TN_BW',
  TnZa: 'TN_ZA',
  To: 'TO',
  ToTo: 'TO_TO',
  Tr: 'TR',
  TrCy: 'TR_CY',
  TrTr: 'TR_TR',
  TrTrCy: 'TR_TR_CY',
  Ts: 'TS',
  TsZa: 'TS_ZA',
  Tt: 'TT',
  TtRu: 'TT_RU',
  Twq: 'TWQ',
  TwqNe: 'TWQ_NE',
  Tzm: 'TZM',
  TzmArab: 'TZM_ARAB',
  TzmArabMa: 'TZM_ARAB_MA',
  TzmLatn: 'TZM_LATN',
  TzmLatnDz: 'TZM_LATN_DZ',
  TzmTfng: 'TZM_TFNG',
  TzmTfngMa: 'TZM_TFNG_MA',
  Ug: 'UG',
  UgCn: 'UG_CN',
  Uk: 'UK',
  UkUa: 'UK_UA',
  Ur: 'UR',
  UrIn: 'UR_IN',
  UrPk: 'UR_PK',
  Uz: 'UZ',
  UzAf: 'UZ_AF',
  UzArab: 'UZ_ARAB',
  UzArabAf: 'UZ_ARAB_AF',
  UzCyrl: 'UZ_CYRL',
  UzCyrlUz: 'UZ_CYRL_UZ',
  UzLatn: 'UZ_LATN',
  UzLatnUz: 'UZ_LATN_UZ',
  Vai: 'VAI',
  VaiLatn: 'VAI_LATN',
  VaiLatnLr: 'VAI_LATN_LR',
  VaiVai: 'VAI_VAI',
  VaiVaiLr: 'VAI_VAI_LR',
  Ve: 'VE',
  VeZa: 'VE_ZA',
  Vi: 'VI',
  ViVn: 'VI_VN',
  Vo: 'VO',
  Vo_001: 'VO_001',
  Vun: 'VUN',
  VunTz: 'VUN_TZ',
  Wae: 'WAE',
  WaeCh: 'WAE_CH',
  Wal: 'WAL',
  WalEt: 'WAL_ET',
  Wo: 'WO',
  WoSn: 'WO_SN',
  Xh: 'XH',
  XhZa: 'XH_ZA',
  Xog: 'XOG',
  XogUg: 'XOG_UG',
  Yav: 'YAV',
  YavCm: 'YAV_CM',
  Yi: 'YI',
  Yi_001: 'YI_001',
  Yo: 'YO',
  YoBj: 'YO_BJ',
  YoNg: 'YO_NG',
  Zgh: 'ZGH',
  ZghTfng: 'ZGH_TFNG',
  ZghTfngMa: 'ZGH_TFNG_MA',
  Zh: 'ZH',
  Zhi: 'ZHI',
  ZhiCn: 'ZHI_CN',
  ZhCn: 'ZH_CN',
  ZhHk: 'ZH_HK',
  ZhMo: 'ZH_MO',
  ZhSg: 'ZH_SG',
  ZhTw: 'ZH_TW',
  Zu: 'ZU',
  ZuZa: 'ZU_ZA'
} as const;

export type LanguageCode = typeof LanguageCode[keyof typeof LanguageCode];
export const MeasurementUnit = {
  AcreFt: 'ACRE_FT',
  AcreIn: 'ACRE_IN',
  Cm: 'CM',
  CubicCentimeter: 'CUBIC_CENTIMETER',
  CubicDecimeter: 'CUBIC_DECIMETER',
  CubicFoot: 'CUBIC_FOOT',
  CubicInch: 'CUBIC_INCH',
  CubicMeter: 'CUBIC_METER',
  CubicMillimeter: 'CUBIC_MILLIMETER',
  CubicYard: 'CUBIC_YARD',
  FlOz: 'FL_OZ',
  Ft: 'FT',
  G: 'G',
  Inch: 'INCH',
  Kg: 'KG',
  Km: 'KM',
  Lb: 'LB',
  Liter: 'LITER',
  M: 'M',
  Oz: 'OZ',
  Pint: 'PINT',
  Qt: 'QT',
  SqCm: 'SQ_CM',
  SqFt: 'SQ_FT',
  SqInch: 'SQ_INCH',
  SqKm: 'SQ_KM',
  SqM: 'SQ_M',
  SqYd: 'SQ_YD',
  Tonne: 'TONNE',
  Yd: 'YD'
} as const;

export type MeasurementUnit = typeof MeasurementUnit[keyof typeof MeasurementUnit];
export const MediaErrorCode = {
  AttributeAlreadyAssigned: 'ATTRIBUTE_ALREADY_ASSIGNED',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type MediaErrorCode = typeof MediaErrorCode[keyof typeof MediaErrorCode];
export const MediaOrdering = {
  PublishedAt: 'PUBLISHED_AT',
  Title: 'TITLE',
  UploadedAt: 'UPLOADED_AT',
  Visibility: 'VISIBILITY'
} as const;

export type MediaOrdering = typeof MediaOrdering[keyof typeof MediaOrdering];
/** Media type. */
export const MediaType = {
  Image: 'IMAGE',
  Video: 'VIDEO'
} as const;

export type MediaType = typeof MediaType[keyof typeof MediaType];
export const MenuErrorCode = {
  CannotAssignNode: 'CANNOT_ASSIGN_NODE',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  InvalidMenuItem: 'INVALID_MENU_ITEM',
  NotFound: 'NOT_FOUND',
  NoMenuItemProvided: 'NO_MENU_ITEM_PROVIDED',
  Required: 'REQUIRED',
  TooManyMenuItems: 'TOO_MANY_MENU_ITEMS',
  Unique: 'UNIQUE'
} as const;

export type MenuErrorCode = typeof MenuErrorCode[keyof typeof MenuErrorCode];
export const MenuItemOrdering = {
  Name: 'NAME'
} as const;

export type MenuItemOrdering = typeof MenuItemOrdering[keyof typeof MenuItemOrdering];
export const MenuOrdering = {
  ItemsCount: 'ITEMS_COUNT',
  Name: 'NAME'
} as const;

export type MenuOrdering = typeof MenuOrdering[keyof typeof MenuOrdering];
export const MetadataErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  NotUpdated: 'NOT_UPDATED',
  Required: 'REQUIRED'
} as const;

export type MetadataErrorCode = typeof MetadataErrorCode[keyof typeof MetadataErrorCode];
export const NavigationType = {
  Main: 'MAIN',
  Secondary: 'SECONDARY'
} as const;

export type NavigationType = typeof NavigationType[keyof typeof NavigationType];
export const OrderAction = {
  Capture: 'CAPTURE',
  MarkAsPaid: 'MARK_AS_PAID',
  Refund: 'REFUND',
  Void: 'VOID'
} as const;

export type OrderAction = typeof OrderAction[keyof typeof OrderAction];
export const OrderAuthorizeStatus = {
  Full: 'FULL',
  None: 'NONE',
  Partial: 'PARTIAL'
} as const;

export type OrderAuthorizeStatus = typeof OrderAuthorizeStatus[keyof typeof OrderAuthorizeStatus];
export const OrderChargeStatus = {
  Full: 'FULL',
  None: 'NONE',
  Overcharged: 'OVERCHARGED',
  Partial: 'PARTIAL'
} as const;

export type OrderChargeStatus = typeof OrderChargeStatus[keyof typeof OrderChargeStatus];
export const OrderDiscountType = {
  Manual: 'MANUAL',
  Voucher: 'VOUCHER'
} as const;

export type OrderDiscountType = typeof OrderDiscountType[keyof typeof OrderDiscountType];
export const OrderErrorCode = {
  BillingAddressNotSet: 'BILLING_ADDRESS_NOT_SET',
  CannotCancelFulfillment: 'CANNOT_CANCEL_FULFILLMENT',
  CannotCancelOrder: 'CANNOT_CANCEL_ORDER',
  CannotDelete: 'CANNOT_DELETE',
  CannotDiscount: 'CANNOT_DISCOUNT',
  CannotFulfillUnpaidOrder: 'CANNOT_FULFILL_UNPAID_ORDER',
  CannotRefund: 'CANNOT_REFUND',
  CaptureInactivePayment: 'CAPTURE_INACTIVE_PAYMENT',
  ChannelInactive: 'CHANNEL_INACTIVE',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  FulfillOrderLine: 'FULFILL_ORDER_LINE',
  GiftCardLine: 'GIFT_CARD_LINE',
  GraphqlError: 'GRAPHQL_ERROR',
  InsufficientStock: 'INSUFFICIENT_STOCK',
  Invalid: 'INVALID',
  InvalidQuantity: 'INVALID_QUANTITY',
  MissingTransactionActionRequestWebhook: 'MISSING_TRANSACTION_ACTION_REQUEST_WEBHOOK',
  NotAvailableInChannel: 'NOT_AVAILABLE_IN_CHANNEL',
  NotEditable: 'NOT_EDITABLE',
  NotFound: 'NOT_FOUND',
  OrderNoShippingAddress: 'ORDER_NO_SHIPPING_ADDRESS',
  PaymentError: 'PAYMENT_ERROR',
  PaymentMissing: 'PAYMENT_MISSING',
  ProductNotPublished: 'PRODUCT_NOT_PUBLISHED',
  ProductUnavailableForPurchase: 'PRODUCT_UNAVAILABLE_FOR_PURCHASE',
  Required: 'REQUIRED',
  ShippingMethodNotApplicable: 'SHIPPING_METHOD_NOT_APPLICABLE',
  ShippingMethodRequired: 'SHIPPING_METHOD_REQUIRED',
  TaxError: 'TAX_ERROR',
  Unique: 'UNIQUE',
  VoidInactivePayment: 'VOID_INACTIVE_PAYMENT',
  ZeroQuantity: 'ZERO_QUANTITY'
} as const;

export type OrderErrorCode = typeof OrderErrorCode[keyof typeof OrderErrorCode];
export const OrderEventEmailType = {
  Confirmed: 'CONFIRMED',
  DigitalLinks: 'DIGITAL_LINKS',
  Fulfillment: 'FULFILLMENT',
  OrderCancel: 'ORDER_CANCEL',
  OrderConfirmation: 'ORDER_CONFIRMATION',
  OrderRefund: 'ORDER_REFUND',
  Payment: 'PAYMENT',
  Shipping: 'SHIPPING',
  TrackingUpdated: 'TRACKING_UPDATED'
} as const;

export type OrderEventEmailType = typeof OrderEventEmailType[keyof typeof OrderEventEmailType];
export const OrderEventType = {
  AddedProducts: 'ADDED_PRODUCTS',
  Canceled: 'CANCELED',
  Confirmed: 'CONFIRMED',
  DraftCreated: 'DRAFT_CREATED',
  DraftCreatedFromReplace: 'DRAFT_CREATED_FROM_REPLACE',
  EmailSent: 'EMAIL_SENT',
  ExternalServiceNotification: 'EXTERNAL_SERVICE_NOTIFICATION',
  FulfillmentAwaitsApproval: 'FULFILLMENT_AWAITS_APPROVAL',
  FulfillmentCanceled: 'FULFILLMENT_CANCELED',
  FulfillmentFulfilledItems: 'FULFILLMENT_FULFILLED_ITEMS',
  FulfillmentRefunded: 'FULFILLMENT_REFUNDED',
  FulfillmentReplaced: 'FULFILLMENT_REPLACED',
  FulfillmentRestockedItems: 'FULFILLMENT_RESTOCKED_ITEMS',
  FulfillmentReturned: 'FULFILLMENT_RETURNED',
  InvoiceGenerated: 'INVOICE_GENERATED',
  InvoiceRequested: 'INVOICE_REQUESTED',
  InvoiceSent: 'INVOICE_SENT',
  InvoiceUpdated: 'INVOICE_UPDATED',
  NoteAdded: 'NOTE_ADDED',
  OrderDiscountAdded: 'ORDER_DISCOUNT_ADDED',
  OrderDiscountAutomaticallyUpdated: 'ORDER_DISCOUNT_AUTOMATICALLY_UPDATED',
  OrderDiscountDeleted: 'ORDER_DISCOUNT_DELETED',
  OrderDiscountUpdated: 'ORDER_DISCOUNT_UPDATED',
  OrderFullyPaid: 'ORDER_FULLY_PAID',
  OrderLineDiscountRemoved: 'ORDER_LINE_DISCOUNT_REMOVED',
  OrderLineDiscountUpdated: 'ORDER_LINE_DISCOUNT_UPDATED',
  OrderLineProductDeleted: 'ORDER_LINE_PRODUCT_DELETED',
  OrderLineVariantDeleted: 'ORDER_LINE_VARIANT_DELETED',
  OrderMarkedAsPaid: 'ORDER_MARKED_AS_PAID',
  OrderReplacementCreated: 'ORDER_REPLACEMENT_CREATED',
  Other: 'OTHER',
  OversoldItems: 'OVERSOLD_ITEMS',
  PaymentAuthorized: 'PAYMENT_AUTHORIZED',
  PaymentCaptured: 'PAYMENT_CAPTURED',
  PaymentFailed: 'PAYMENT_FAILED',
  PaymentRefunded: 'PAYMENT_REFUNDED',
  PaymentVoided: 'PAYMENT_VOIDED',
  Placed: 'PLACED',
  PlacedFromDraft: 'PLACED_FROM_DRAFT',
  RemovedProducts: 'REMOVED_PRODUCTS',
  TrackingUpdated: 'TRACKING_UPDATED',
  TransactionCaptureRequested: 'TRANSACTION_CAPTURE_REQUESTED',
  TransactionEvent: 'TRANSACTION_EVENT',
  TransactionRefundRequested: 'TRANSACTION_REFUND_REQUESTED',
  TransactionVoidRequested: 'TRANSACTION_VOID_REQUESTED',
  UpdatedAddress: 'UPDATED_ADDRESS'
} as const;

export type OrderEventType = typeof OrderEventType[keyof typeof OrderEventType];
export const OrderOrdering = {
  CreatedAt: 'CREATED_AT',
  Customer: 'CUSTOMER',
  FulfillmentStatus: 'FULFILLMENT_STATUS',
  LastModifiedAt: 'LAST_MODIFIED_AT',
  Number: 'NUMBER',
  Payment: 'PAYMENT',
  Rank: 'RANK'
} as const;

export type OrderOrdering = typeof OrderOrdering[keyof typeof OrderOrdering];
export const OrderOrigin = {
  Checkout: 'CHECKOUT',
  Draft: 'DRAFT',
  Reissue: 'REISSUE'
} as const;

export type OrderOrigin = typeof OrderOrigin[keyof typeof OrderOrigin];
export const OrderSettingsErrorCode = {
  Invalid: 'INVALID'
} as const;

export type OrderSettingsErrorCode = typeof OrderSettingsErrorCode[keyof typeof OrderSettingsErrorCode];
export const OrderStatus = {
  Accepted: 'ACCEPTED',
  Canceled: 'CANCELED',
  Draft: 'DRAFT',
  Fulfilled: 'FULFILLED',
  InProgress: 'IN_PROGRESS',
  PartiallyFulfilled: 'PARTIALLY_FULFILLED',
  PartiallyReturned: 'PARTIALLY_RETURNED',
  PendingAcceptance: 'PENDING_ACCEPTANCE',
  Returned: 'RETURNED'
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];
export const OrderStatusFilter = {
  Canceled: 'CANCELED',
  Fulfilled: 'FULFILLED',
  PartiallyFulfilled: 'PARTIALLY_FULFILLED',
  ReadyToCapture: 'READY_TO_CAPTURE',
  ReadyToFulfill: 'READY_TO_FULFILL',
  Unconfirmed: 'UNCONFIRMED',
  Unfulfilled: 'UNFULFILLED'
} as const;

export type OrderStatusFilter = typeof OrderStatusFilter[keyof typeof OrderStatusFilter];
export const OrderingDirection = {
  Asc: 'ASC',
  Desc: 'DESC'
} as const;

export type OrderingDirection = typeof OrderingDirection[keyof typeof OrderingDirection];
export const PageErrorCode = {
  AttributeAlreadyAssigned: 'ATTRIBUTE_ALREADY_ASSIGNED',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type PageErrorCode = typeof PageErrorCode[keyof typeof PageErrorCode];
export const PageKlassOrdering = {
  Name: 'NAME',
  Slug: 'SLUG'
} as const;

export type PageKlassOrdering = typeof PageKlassOrdering[keyof typeof PageKlassOrdering];
export const PageOrdering = {
  CreatedAt: 'CREATED_AT',
  PublishedAt: 'PUBLISHED_AT',
  Slug: 'SLUG',
  Title: 'TITLE',
  Visibility: 'VISIBILITY'
} as const;

export type PageOrdering = typeof PageOrdering[keyof typeof PageOrdering];
export const PaymentErrorCode = {
  BalanceCheckError: 'BALANCE_CHECK_ERROR',
  BillingAddressNotSet: 'BILLING_ADDRESS_NOT_SET',
  ChannelInactive: 'CHANNEL_INACTIVE',
  CheckoutEmailNotSet: 'CHECKOUT_EMAIL_NOT_SET',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  InvalidShippingMethod: 'INVALID_SHIPPING_METHOD',
  NotFound: 'NOT_FOUND',
  NotSupportedGateway: 'NOT_SUPPORTED_GATEWAY',
  NoCheckoutLines: 'NO_CHECKOUT_LINES',
  PartialPaymentNotAllowed: 'PARTIAL_PAYMENT_NOT_ALLOWED',
  PaymentError: 'PAYMENT_ERROR',
  Required: 'REQUIRED',
  ShippingAddressNotSet: 'SHIPPING_ADDRESS_NOT_SET',
  ShippingMethodNotSet: 'SHIPPING_METHOD_NOT_SET',
  UnavailableVariantInChannel: 'UNAVAILABLE_VARIANT_IN_CHANNEL',
  Unique: 'UNIQUE'
} as const;

export type PaymentErrorCode = typeof PaymentErrorCode[keyof typeof PaymentErrorCode];
export const PermissionCode = {
  HandleCheckouts: 'HANDLE_CHECKOUTS',
  HandlePayments: 'HANDLE_PAYMENTS',
  HandleTaxes: 'HANDLE_TAXES',
  ImpersonateUser: 'IMPERSONATE_USER',
  ManageApps: 'MANAGE_APPS',
  ManageChannels: 'MANAGE_CHANNELS',
  ManageCheckouts: 'MANAGE_CHECKOUTS',
  ManageDiscounts: 'MANAGE_DISCOUNTS',
  ManageGiftCard: 'MANAGE_GIFT_CARD',
  ManageMedia: 'MANAGE_MEDIA',
  ManageMenus: 'MANAGE_MENUS',
  ManageObservability: 'MANAGE_OBSERVABILITY',
  ManageOrders: 'MANAGE_ORDERS',
  ManagePages: 'MANAGE_PAGES',
  ManagePageTypesAndAttributes: 'MANAGE_PAGE_TYPES_AND_ATTRIBUTES',
  ManagePlugins: 'MANAGE_PLUGINS',
  ManageProducts: 'MANAGE_PRODUCTS',
  ManageProductTypesAndAttributes: 'MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES',
  ManageSettings: 'MANAGE_SETTINGS',
  ManageShipping: 'MANAGE_SHIPPING',
  ManageStaff: 'MANAGE_STAFF',
  ManageTaxes: 'MANAGE_TAXES',
  ManageTranslations: 'MANAGE_TRANSLATIONS',
  ManageUsers: 'MANAGE_USERS'
} as const;

export type PermissionCode = typeof PermissionCode[keyof typeof PermissionCode];
export const PluginConfigurationType = {
  Global: 'GLOBAL',
  PerChannel: 'PER_CHANNEL'
} as const;

export type PluginConfigurationType = typeof PluginConfigurationType[keyof typeof PluginConfigurationType];
export const PluginOrdering = {
  IsActive: 'IS_ACTIVE',
  Name: 'NAME'
} as const;

export type PluginOrdering = typeof PluginOrdering[keyof typeof PluginOrdering];
export const PostalCodeRuleInclusionType = {
  Exclude: 'EXCLUDE',
  Include: 'INCLUDE'
} as const;

export type PostalCodeRuleInclusionType = typeof PostalCodeRuleInclusionType[keyof typeof PostalCodeRuleInclusionType];
export const ProductAttributeScope = {
  All: 'ALL',
  NotVariantSelection: 'NOT_VARIANT_SELECTION',
  VariantSelection: 'VARIANT_SELECTION'
} as const;

export type ProductAttributeScope = typeof ProductAttributeScope[keyof typeof ProductAttributeScope];
export const ProductAttributeType = {
  Product: 'PRODUCT',
  Variant: 'VARIANT'
} as const;

export type ProductAttributeType = typeof ProductAttributeType[keyof typeof ProductAttributeType];
export const ProductErrorCode = {
  AlreadyExists: 'ALREADY_EXISTS',
  AttributeAlreadyAssigned: 'ATTRIBUTE_ALREADY_ASSIGNED',
  AttributeCannotBeAssigned: 'ATTRIBUTE_CANNOT_BE_ASSIGNED',
  AttributeVariantsDisabled: 'ATTRIBUTE_VARIANTS_DISABLED',
  CannotManageProductWithoutVariant: 'CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  MediaAlreadyAssigned: 'MEDIA_ALREADY_ASSIGNED',
  NotFound: 'NOT_FOUND',
  NotProductsImage: 'NOT_PRODUCTS_IMAGE',
  NotProductsVariant: 'NOT_PRODUCTS_VARIANT',
  PreorderVariantCannotBeDeactivated: 'PREORDER_VARIANT_CANNOT_BE_DEACTIVATED',
  ProductNotAssignedToChannel: 'PRODUCT_NOT_ASSIGNED_TO_CHANNEL',
  ProductWithoutCategory: 'PRODUCT_WITHOUT_CATEGORY',
  Required: 'REQUIRED',
  Unique: 'UNIQUE',
  UnsupportedMediaProvider: 'UNSUPPORTED_MEDIA_PROVIDER',
  VariantNoDigitalContent: 'VARIANT_NO_DIGITAL_CONTENT'
} as const;

export type ProductErrorCode = typeof ProductErrorCode[keyof typeof ProductErrorCode];
export const ProductField = {
  Category: 'CATEGORY',
  ChargeTaxes: 'CHARGE_TAXES',
  Collections: 'COLLECTIONS',
  Description: 'DESCRIPTION',
  Name: 'NAME',
  ProductMedia: 'PRODUCT_MEDIA',
  ProductType: 'PRODUCT_TYPE',
  ProductWeight: 'PRODUCT_WEIGHT',
  VariantId: 'VARIANT_ID',
  VariantMedia: 'VARIANT_MEDIA',
  VariantSku: 'VARIANT_SKU',
  VariantWeight: 'VARIANT_WEIGHT'
} as const;

export type ProductField = typeof ProductField[keyof typeof ProductField];
export const ProductKlassConfigurable = {
  Configurable: 'CONFIGURABLE',
  Simple: 'SIMPLE'
} as const;

export type ProductKlassConfigurable = typeof ProductKlassConfigurable[keyof typeof ProductKlassConfigurable];
export const ProductKlassKind = {
  GiftCard: 'GIFT_CARD',
  Normal: 'NORMAL'
} as const;

export type ProductKlassKind = typeof ProductKlassKind[keyof typeof ProductKlassKind];
export const ProductKlassOrdering = {
  Digital: 'DIGITAL',
  Name: 'NAME',
  ShippingRequired: 'SHIPPING_REQUIRED'
} as const;

export type ProductKlassOrdering = typeof ProductKlassOrdering[keyof typeof ProductKlassOrdering];
export const ProductOrdering = {
  Collection: 'COLLECTION',
  CreatedAt: 'CREATED_AT',
  LastModifiedAt: 'LAST_MODIFIED_AT',
  MinimalPrice: 'MINIMAL_PRICE',
  Name: 'NAME',
  Price: 'PRICE',
  Published: 'PUBLISHED',
  PublishedAt: 'PUBLISHED_AT',
  Rank: 'RANK',
  Rating: 'RATING',
  Type: 'TYPE'
} as const;

export type ProductOrdering = typeof ProductOrdering[keyof typeof ProductOrdering];
export const ReportingPeriod = {
  ThisMonth: 'THIS_MONTH',
  Today: 'TODAY'
} as const;

export type ReportingPeriod = typeof ReportingPeriod[keyof typeof ReportingPeriod];
export const SaleOrdering = {
  CreatedAt: 'CREATED_AT',
  EndDate: 'END_DATE',
  LastModifiedAt: 'LAST_MODIFIED_AT',
  Name: 'NAME',
  StartDate: 'START_DATE',
  Type: 'TYPE',
  Value: 'VALUE'
} as const;

export type SaleOrdering = typeof SaleOrdering[keyof typeof SaleOrdering];
export const SaleType = {
  Fixed: 'FIXED',
  Percentage: 'PERCENTAGE'
} as const;

export type SaleType = typeof SaleType[keyof typeof SaleType];
export const ShippingErrorCode = {
  AlreadyExists: 'ALREADY_EXISTS',
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  MaxLessThanMin: 'MAX_LESS_THAN_MIN',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type ShippingErrorCode = typeof ShippingErrorCode[keyof typeof ShippingErrorCode];
export const ShopErrorCode = {
  AlreadyExists: 'ALREADY_EXISTS',
  CannotFetchTaxRates: 'CANNOT_FETCH_TAX_RATES',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type ShopErrorCode = typeof ShopErrorCode[keyof typeof ShopErrorCode];
export const StaffMemberStatus = {
  Active: 'ACTIVE',
  Deactivated: 'DEACTIVATED'
} as const;

export type StaffMemberStatus = typeof StaffMemberStatus[keyof typeof StaffMemberStatus];
export const StateCode = {
  Ak: 'AK',
  Al: 'AL',
  Ar: 'AR',
  As: 'AS',
  Az: 'AZ',
  Ca: 'CA',
  Co: 'CO',
  Ct: 'CT',
  Dc: 'DC',
  De: 'DE',
  Fl: 'FL',
  Ga: 'GA',
  Gu: 'GU',
  Hi: 'HI',
  Ia: 'IA',
  Id: 'ID',
  Il: 'IL',
  In: 'IN',
  Ks: 'KS',
  Ky: 'KY',
  La: 'LA',
  Ma: 'MA',
  Md: 'MD',
  Me: 'ME',
  Mi: 'MI',
  Mn: 'MN',
  Mo: 'MO',
  Mp: 'MP',
  Ms: 'MS',
  Mt: 'MT',
  Nc: 'NC',
  Nd: 'ND',
  Ne: 'NE',
  Nh: 'NH',
  Nj: 'NJ',
  Nm: 'NM',
  Nv: 'NV',
  Ny: 'NY',
  Oh: 'OH',
  Ok: 'OK',
  Or: 'OR',
  Pa: 'PA',
  Pr: 'PR',
  Ri: 'RI',
  Sc: 'SC',
  Sd: 'SD',
  Tn: 'TN',
  Tx: 'TX',
  Um: 'UM',
  Ut: 'UT',
  Va: 'VA',
  Vi: 'VI',
  Vt: 'VT',
  Wa: 'WA',
  Wi: 'WI',
  Wv: 'WV',
  Wy: 'WY'
} as const;

export type StateCode = typeof StateCode[keyof typeof StateCode];
export const StockAvailability = {
  InStock: 'IN_STOCK',
  OutOfStock: 'OUT_OF_STOCK'
} as const;

export type StockAvailability = typeof StockAvailability[keyof typeof StockAvailability];
export const StockErrorCode = {
  AlreadyExists: 'ALREADY_EXISTS',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type StockErrorCode = typeof StockErrorCode[keyof typeof StockErrorCode];
export const StorePaymentMethod = {
  None: 'NONE',
  OffSession: 'OFF_SESSION',
  OnSession: 'ON_SESSION'
} as const;

export type StorePaymentMethod = typeof StorePaymentMethod[keyof typeof StorePaymentMethod];
export const TaxCalculationStrategy = {
  FlatRates: 'FLAT_RATES',
  TaxApp: 'TAX_APP'
} as const;

export type TaxCalculationStrategy = typeof TaxCalculationStrategy[keyof typeof TaxCalculationStrategy];
export const TaxClassCreateErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND'
} as const;

export type TaxClassCreateErrorCode = typeof TaxClassCreateErrorCode[keyof typeof TaxClassCreateErrorCode];
export const TaxClassDeleteErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND'
} as const;

export type TaxClassDeleteErrorCode = typeof TaxClassDeleteErrorCode[keyof typeof TaxClassDeleteErrorCode];
export const TaxClassOrdering = {
  Name: 'NAME'
} as const;

export type TaxClassOrdering = typeof TaxClassOrdering[keyof typeof TaxClassOrdering];
export const TaxClassUpdateErrorCode = {
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND'
} as const;

export type TaxClassUpdateErrorCode = typeof TaxClassUpdateErrorCode[keyof typeof TaxClassUpdateErrorCode];
export const TaxConfigurationUpdateErrorCode = {
  DuplicatedInputItem: 'DUPLICATED_INPUT_ITEM',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND'
} as const;

export type TaxConfigurationUpdateErrorCode = typeof TaxConfigurationUpdateErrorCode[keyof typeof TaxConfigurationUpdateErrorCode];
export const TaxCountryConfigurationDeleteErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND'
} as const;

export type TaxCountryConfigurationDeleteErrorCode = typeof TaxCountryConfigurationDeleteErrorCode[keyof typeof TaxCountryConfigurationDeleteErrorCode];
export const TaxCountryConfigurationUpdateErrorCode = {
  CannotCreateNegativeRate: 'CANNOT_CREATE_NEGATIVE_RATE',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  OnlyOneDefaultCountryRateAllowed: 'ONLY_ONE_DEFAULT_COUNTRY_RATE_ALLOWED'
} as const;

export type TaxCountryConfigurationUpdateErrorCode = typeof TaxCountryConfigurationUpdateErrorCode[keyof typeof TaxCountryConfigurationUpdateErrorCode];
export const TaxExemptionManageErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotEditableOrder: 'NOT_EDITABLE_ORDER',
  NotFound: 'NOT_FOUND'
} as const;

export type TaxExemptionManageErrorCode = typeof TaxExemptionManageErrorCode[keyof typeof TaxExemptionManageErrorCode];
export const ThumbnailFormat = {
  Jpeg: 'JPEG',
  Svg: 'SVG',
  Webp: 'WEBP'
} as const;

export type ThumbnailFormat = typeof ThumbnailFormat[keyof typeof ThumbnailFormat];
export const TimePeriodType = {
  Day: 'DAY',
  Month: 'MONTH',
  Week: 'WEEK',
  Year: 'YEAR'
} as const;

export type TimePeriodType = typeof TimePeriodType[keyof typeof TimePeriodType];
export const TransactionActionType = {
  Charge: 'CHARGE',
  Refund: 'REFUND',
  Void: 'VOID'
} as const;

export type TransactionActionType = typeof TransactionActionType[keyof typeof TransactionActionType];
export const TransactionCreationMutationErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  IncorrectCurrency: 'INCORRECT_CURRENCY',
  Invalid: 'INVALID',
  MetadataKeyRequired: 'METADATA_KEY_REQUIRED',
  NotFound: 'NOT_FOUND'
} as const;

export type TransactionCreationMutationErrorCode = typeof TransactionCreationMutationErrorCode[keyof typeof TransactionCreationMutationErrorCode];
export const TransactionKind = {
  ActionToConfirm: 'ACTION_TO_CONFIRM',
  Auth: 'AUTH',
  Cancel: 'CANCEL',
  Capture: 'CAPTURE',
  CaptureFailed: 'CAPTURE_FAILED',
  Confirm: 'CONFIRM',
  External: 'EXTERNAL',
  Pending: 'PENDING',
  Refund: 'REFUND',
  RefundFailed: 'REFUND_FAILED',
  RefundOngoing: 'REFUND_ONGOING',
  RefundReversed: 'REFUND_REVERSED',
  Void: 'VOID'
} as const;

export type TransactionKind = typeof TransactionKind[keyof typeof TransactionKind];
export const TransactionRequestActionErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  MissingTransactionActionRequestWebhook: 'MISSING_TRANSACTION_ACTION_REQUEST_WEBHOOK',
  NotFound: 'NOT_FOUND'
} as const;

export type TransactionRequestActionErrorCode = typeof TransactionRequestActionErrorCode[keyof typeof TransactionRequestActionErrorCode];
export const TransactionStatus = {
  Failure: 'FAILURE',
  Pending: 'PENDING',
  Success: 'SUCCESS'
} as const;

export type TransactionStatus = typeof TransactionStatus[keyof typeof TransactionStatus];
export const TransactionUpdateErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  IncorrectCurrency: 'INCORRECT_CURRENCY',
  Invalid: 'INVALID',
  MetadataKeyRequired: 'METADATA_KEY_REQUIRED',
  NotFound: 'NOT_FOUND'
} as const;

export type TransactionUpdateErrorCode = typeof TransactionUpdateErrorCode[keyof typeof TransactionUpdateErrorCode];
export const TranslatableKinds = {
  Attribute: 'ATTRIBUTE',
  AttributeValue: 'ATTRIBUTE_VALUE',
  Category: 'CATEGORY',
  Collection: 'COLLECTION',
  MenuItem: 'MENU_ITEM',
  Page: 'PAGE',
  Product: 'PRODUCT',
  Sale: 'SALE',
  ShippingMethod: 'SHIPPING_METHOD',
  Voucher: 'VOUCHER'
} as const;

export type TranslatableKinds = typeof TranslatableKinds[keyof typeof TranslatableKinds];
export const TranslationErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED'
} as const;

export type TranslationErrorCode = typeof TranslationErrorCode[keyof typeof TranslationErrorCode];
export const UploadErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR'
} as const;

export type UploadErrorCode = typeof UploadErrorCode[keyof typeof UploadErrorCode];
export const UserOrdering = {
  CreatedAt: 'CREATED_AT',
  Email: 'EMAIL',
  FirstName: 'FIRST_NAME',
  LastModifiedAt: 'LAST_MODIFIED_AT',
  LastName: 'LAST_NAME',
  OrderCount: 'ORDER_COUNT'
} as const;

export type UserOrdering = typeof UserOrdering[keyof typeof UserOrdering];
export const VolumeUnit = {
  AcreFt: 'ACRE_FT',
  AcreIn: 'ACRE_IN',
  CubicCentimeter: 'CUBIC_CENTIMETER',
  CubicDecimeter: 'CUBIC_DECIMETER',
  CubicFoot: 'CUBIC_FOOT',
  CubicInch: 'CUBIC_INCH',
  CubicMeter: 'CUBIC_METER',
  CubicMillimeter: 'CUBIC_MILLIMETER',
  CubicYard: 'CUBIC_YARD',
  FlOz: 'FL_OZ',
  Liter: 'LITER',
  Pint: 'PINT',
  Qt: 'QT'
} as const;

export type VolumeUnit = typeof VolumeUnit[keyof typeof VolumeUnit];
export const VoucherDiscountType = {
  Fixed: 'FIXED',
  Percentage: 'PERCENTAGE',
  Shipping: 'SHIPPING'
} as const;

export type VoucherDiscountType = typeof VoucherDiscountType[keyof typeof VoucherDiscountType];
export const VoucherOrdering = {
  Code: 'CODE',
  EndDate: 'END_DATE',
  MinimumSpentAmount: 'MINIMUM_SPENT_AMOUNT',
  StartDate: 'START_DATE',
  Type: 'TYPE',
  UsageLimit: 'USAGE_LIMIT',
  Value: 'VALUE'
} as const;

export type VoucherOrdering = typeof VoucherOrdering[keyof typeof VoucherOrdering];
export const VoucherType = {
  EntireOrder: 'ENTIRE_ORDER',
  Shipping: 'SHIPPING',
  SpecificProduct: 'SPECIFIC_PRODUCT'
} as const;

export type VoucherType = typeof VoucherType[keyof typeof VoucherType];
export const WarehouseClickAndCollectOption = {
  AllWarehouses: 'ALL_WAREHOUSES',
  Disabled: 'DISABLED',
  LocalStock: 'LOCAL_STOCK'
} as const;

export type WarehouseClickAndCollectOption = typeof WarehouseClickAndCollectOption[keyof typeof WarehouseClickAndCollectOption];
export const WarehouseErrorCode = {
  AlreadyExists: 'ALREADY_EXISTS',
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type WarehouseErrorCode = typeof WarehouseErrorCode[keyof typeof WarehouseErrorCode];
export const WarehouseOrdering = {
  Name: 'NAME'
} as const;

export type WarehouseOrdering = typeof WarehouseOrdering[keyof typeof WarehouseOrdering];
export const WebhookErrorCode = {
  GraphqlError: 'GRAPHQL_ERROR',
  Invalid: 'INVALID',
  NotFound: 'NOT_FOUND',
  Required: 'REQUIRED',
  Unique: 'UNIQUE'
} as const;

export type WebhookErrorCode = typeof WebhookErrorCode[keyof typeof WebhookErrorCode];
export const WebhookEventType = {
  AddressCreated: 'ADDRESS_CREATED',
  AddressDeleted: 'ADDRESS_DELETED',
  AddressUpdated: 'ADDRESS_UPDATED',
  Any: 'ANY',
  AppDeleted: 'APP_DELETED',
  AppInstalled: 'APP_INSTALLED',
  AppStatusChanged: 'APP_STATUS_CHANGED',
  AppUpdated: 'APP_UPDATED',
  AttributeCreated: 'ATTRIBUTE_CREATED',
  AttributeDeleted: 'ATTRIBUTE_DELETED',
  AttributeUpdated: 'ATTRIBUTE_UPDATED',
  AttributeValueCreated: 'ATTRIBUTE_VALUE_CREATED',
  AttributeValueDeleted: 'ATTRIBUTE_VALUE_DELETED',
  AttributeValueUpdated: 'ATTRIBUTE_VALUE_UPDATED',
  CategoryCreated: 'CATEGORY_CREATED',
  CategoryDeleted: 'CATEGORY_DELETED',
  CategoryUpdated: 'CATEGORY_UPDATED',
  ChannelCreated: 'CHANNEL_CREATED',
  ChannelDeleted: 'CHANNEL_DELETED',
  ChannelStatusChanged: 'CHANNEL_STATUS_CHANGED',
  ChannelUpdated: 'CHANNEL_UPDATED',
  CheckoutCalculateTaxes: 'CHECKOUT_CALCULATE_TAXES',
  CheckoutCreated: 'CHECKOUT_CREATED',
  CheckoutFilterShippingMethods: 'CHECKOUT_FILTER_SHIPPING_METHODS',
  CheckoutMetadataUpdated: 'CHECKOUT_METADATA_UPDATED',
  CheckoutUpdated: 'CHECKOUT_UPDATED',
  CollectionCreated: 'COLLECTION_CREATED',
  CollectionDeleted: 'COLLECTION_DELETED',
  CollectionMetadataUpdated: 'COLLECTION_METADATA_UPDATED',
  CollectionUpdated: 'COLLECTION_UPDATED',
  CustomerCreated: 'CUSTOMER_CREATED',
  CustomerDeleted: 'CUSTOMER_DELETED',
  CustomerMetadataUpdated: 'CUSTOMER_METADATA_UPDATED',
  CustomerUpdated: 'CUSTOMER_UPDATED',
  DraftOrderCreated: 'DRAFT_ORDER_CREATED',
  DraftOrderDeleted: 'DRAFT_ORDER_DELETED',
  DraftOrderUpdated: 'DRAFT_ORDER_UPDATED',
  FulfillmentApproved: 'FULFILLMENT_APPROVED',
  FulfillmentCanceled: 'FULFILLMENT_CANCELED',
  FulfillmentCreated: 'FULFILLMENT_CREATED',
  FulfillmentMetadataUpdated: 'FULFILLMENT_METADATA_UPDATED',
  GiftCardCreated: 'GIFT_CARD_CREATED',
  GiftCardDeleted: 'GIFT_CARD_DELETED',
  GiftCardMetadataUpdated: 'GIFT_CARD_METADATA_UPDATED',
  GiftCardStatusChanged: 'GIFT_CARD_STATUS_CHANGED',
  GiftCardUpdated: 'GIFT_CARD_UPDATED',
  InvoiceDeleted: 'INVOICE_DELETED',
  InvoiceRequested: 'INVOICE_REQUESTED',
  InvoiceSent: 'INVOICE_SENT',
  MediaCreated: 'MEDIA_CREATED',
  MediaDeleted: 'MEDIA_DELETED',
  MediaUpdated: 'MEDIA_UPDATED',
  MenuCreated: 'MENU_CREATED',
  MenuDeleted: 'MENU_DELETED',
  MenuItemCreated: 'MENU_ITEM_CREATED',
  MenuItemDeleted: 'MENU_ITEM_DELETED',
  MenuItemUpdated: 'MENU_ITEM_UPDATED',
  MenuUpdated: 'MENU_UPDATED',
  NotifyUser: 'NOTIFY_USER',
  Observability: 'OBSERVABILITY',
  OrderCalculateTaxes: 'ORDER_CALCULATE_TAXES',
  OrderCancelled: 'ORDER_CANCELLED',
  OrderConfirmed: 'ORDER_CONFIRMED',
  OrderCreated: 'ORDER_CREATED',
  OrderFilterShippingMethods: 'ORDER_FILTER_SHIPPING_METHODS',
  OrderFulfilled: 'ORDER_FULFILLED',
  OrderFullyPaid: 'ORDER_FULLY_PAID',
  OrderMetadataUpdated: 'ORDER_METADATA_UPDATED',
  OrderUpdated: 'ORDER_UPDATED',
  PageCreated: 'PAGE_CREATED',
  PageDeleted: 'PAGE_DELETED',
  PageTypeCreated: 'PAGE_TYPE_CREATED',
  PageTypeDeleted: 'PAGE_TYPE_DELETED',
  PageTypeUpdated: 'PAGE_TYPE_UPDATED',
  PageUpdated: 'PAGE_UPDATED',
  PaymentAuthorize: 'PAYMENT_AUTHORIZE',
  PaymentCapture: 'PAYMENT_CAPTURE',
  PaymentConfirm: 'PAYMENT_CONFIRM',
  PaymentListGateways: 'PAYMENT_LIST_GATEWAYS',
  PaymentProcess: 'PAYMENT_PROCESS',
  PaymentRefund: 'PAYMENT_REFUND',
  PaymentVoid: 'PAYMENT_VOID',
  PermissionGroupCreated: 'PERMISSION_GROUP_CREATED',
  PermissionGroupDeleted: 'PERMISSION_GROUP_DELETED',
  PermissionGroupUpdated: 'PERMISSION_GROUP_UPDATED',
  ProductCreated: 'PRODUCT_CREATED',
  ProductDeleted: 'PRODUCT_DELETED',
  ProductMetadataUpdated: 'PRODUCT_METADATA_UPDATED',
  ProductUpdated: 'PRODUCT_UPDATED',
  ProductVariantBackInStock: 'PRODUCT_VARIANT_BACK_IN_STOCK',
  ProductVariantCreated: 'PRODUCT_VARIANT_CREATED',
  ProductVariantDeleted: 'PRODUCT_VARIANT_DELETED',
  ProductVariantMetadataUpdated: 'PRODUCT_VARIANT_METADATA_UPDATED',
  ProductVariantOutOfStock: 'PRODUCT_VARIANT_OUT_OF_STOCK',
  ProductVariantUpdated: 'PRODUCT_VARIANT_UPDATED',
  SaleCreated: 'SALE_CREATED',
  SaleDeleted: 'SALE_DELETED',
  SaleToggle: 'SALE_TOGGLE',
  SaleUpdated: 'SALE_UPDATED',
  ShippingListMethodsForCheckout: 'SHIPPING_LIST_METHODS_FOR_CHECKOUT',
  ShippingPriceCreated: 'SHIPPING_PRICE_CREATED',
  ShippingPriceDeleted: 'SHIPPING_PRICE_DELETED',
  ShippingPriceUpdated: 'SHIPPING_PRICE_UPDATED',
  ShippingZoneCreated: 'SHIPPING_ZONE_CREATED',
  ShippingZoneDeleted: 'SHIPPING_ZONE_DELETED',
  ShippingZoneMetadataUpdated: 'SHIPPING_ZONE_METADATA_UPDATED',
  ShippingZoneUpdated: 'SHIPPING_ZONE_UPDATED',
  StaffCreated: 'STAFF_CREATED',
  StaffDeleted: 'STAFF_DELETED',
  StaffUpdated: 'STAFF_UPDATED',
  TransactionActionRequest: 'TRANSACTION_ACTION_REQUEST',
  TransactionItemMetadataUpdated: 'TRANSACTION_ITEM_METADATA_UPDATED',
  TranslationCreated: 'TRANSLATION_CREATED',
  TranslationUpdated: 'TRANSLATION_UPDATED',
  VoucherCreated: 'VOUCHER_CREATED',
  VoucherDeleted: 'VOUCHER_DELETED',
  VoucherMetadataUpdated: 'VOUCHER_METADATA_UPDATED',
  VoucherUpdated: 'VOUCHER_UPDATED',
  WarehouseCreated: 'WAREHOUSE_CREATED',
  WarehouseDeleted: 'WAREHOUSE_DELETED',
  WarehouseMetadataUpdated: 'WAREHOUSE_METADATA_UPDATED',
  WarehouseUpdated: 'WAREHOUSE_UPDATED'
} as const;

export type WebhookEventType = typeof WebhookEventType[keyof typeof WebhookEventType];
export const WebhookEventTypeSync = {
  CheckoutCalculateTaxes: 'CHECKOUT_CALCULATE_TAXES',
  CheckoutFilterShippingMethods: 'CHECKOUT_FILTER_SHIPPING_METHODS',
  OrderCalculateTaxes: 'ORDER_CALCULATE_TAXES',
  OrderFilterShippingMethods: 'ORDER_FILTER_SHIPPING_METHODS',
  PaymentAuthorize: 'PAYMENT_AUTHORIZE',
  PaymentCapture: 'PAYMENT_CAPTURE',
  PaymentConfirm: 'PAYMENT_CONFIRM',
  PaymentListGateways: 'PAYMENT_LIST_GATEWAYS',
  PaymentProcess: 'PAYMENT_PROCESS',
  PaymentRefund: 'PAYMENT_REFUND',
  PaymentVoid: 'PAYMENT_VOID',
  ShippingListMethodsForCheckout: 'SHIPPING_LIST_METHODS_FOR_CHECKOUT'
} as const;

export type WebhookEventTypeSync = typeof WebhookEventTypeSync[keyof typeof WebhookEventTypeSync];
export const WebhookSampleEventType = {
  AddressCreated: 'ADDRESS_CREATED',
  AddressDeleted: 'ADDRESS_DELETED',
  AddressUpdated: 'ADDRESS_UPDATED',
  AppDeleted: 'APP_DELETED',
  AppInstalled: 'APP_INSTALLED',
  AppStatusChanged: 'APP_STATUS_CHANGED',
  AppUpdated: 'APP_UPDATED',
  AttributeCreated: 'ATTRIBUTE_CREATED',
  AttributeDeleted: 'ATTRIBUTE_DELETED',
  AttributeUpdated: 'ATTRIBUTE_UPDATED',
  AttributeValueCreated: 'ATTRIBUTE_VALUE_CREATED',
  AttributeValueDeleted: 'ATTRIBUTE_VALUE_DELETED',
  AttributeValueUpdated: 'ATTRIBUTE_VALUE_UPDATED',
  CategoryCreated: 'CATEGORY_CREATED',
  CategoryDeleted: 'CATEGORY_DELETED',
  CategoryUpdated: 'CATEGORY_UPDATED',
  ChannelCreated: 'CHANNEL_CREATED',
  ChannelDeleted: 'CHANNEL_DELETED',
  ChannelStatusChanged: 'CHANNEL_STATUS_CHANGED',
  ChannelUpdated: 'CHANNEL_UPDATED',
  CheckoutCreated: 'CHECKOUT_CREATED',
  CheckoutMetadataUpdated: 'CHECKOUT_METADATA_UPDATED',
  CheckoutUpdated: 'CHECKOUT_UPDATED',
  CollectionCreated: 'COLLECTION_CREATED',
  CollectionDeleted: 'COLLECTION_DELETED',
  CollectionMetadataUpdated: 'COLLECTION_METADATA_UPDATED',
  CollectionUpdated: 'COLLECTION_UPDATED',
  CustomerCreated: 'CUSTOMER_CREATED',
  CustomerDeleted: 'CUSTOMER_DELETED',
  CustomerMetadataUpdated: 'CUSTOMER_METADATA_UPDATED',
  CustomerUpdated: 'CUSTOMER_UPDATED',
  DraftOrderCreated: 'DRAFT_ORDER_CREATED',
  DraftOrderDeleted: 'DRAFT_ORDER_DELETED',
  DraftOrderUpdated: 'DRAFT_ORDER_UPDATED',
  FulfillmentApproved: 'FULFILLMENT_APPROVED',
  FulfillmentCanceled: 'FULFILLMENT_CANCELED',
  FulfillmentCreated: 'FULFILLMENT_CREATED',
  FulfillmentMetadataUpdated: 'FULFILLMENT_METADATA_UPDATED',
  GiftCardCreated: 'GIFT_CARD_CREATED',
  GiftCardDeleted: 'GIFT_CARD_DELETED',
  GiftCardMetadataUpdated: 'GIFT_CARD_METADATA_UPDATED',
  GiftCardStatusChanged: 'GIFT_CARD_STATUS_CHANGED',
  GiftCardUpdated: 'GIFT_CARD_UPDATED',
  InvoiceDeleted: 'INVOICE_DELETED',
  InvoiceRequested: 'INVOICE_REQUESTED',
  InvoiceSent: 'INVOICE_SENT',
  MediaCreated: 'MEDIA_CREATED',
  MediaDeleted: 'MEDIA_DELETED',
  MediaUpdated: 'MEDIA_UPDATED',
  MenuCreated: 'MENU_CREATED',
  MenuDeleted: 'MENU_DELETED',
  MenuItemCreated: 'MENU_ITEM_CREATED',
  MenuItemDeleted: 'MENU_ITEM_DELETED',
  MenuItemUpdated: 'MENU_ITEM_UPDATED',
  MenuUpdated: 'MENU_UPDATED',
  NotifyUser: 'NOTIFY_USER',
  Observability: 'OBSERVABILITY',
  OrderCancelled: 'ORDER_CANCELLED',
  OrderConfirmed: 'ORDER_CONFIRMED',
  OrderCreated: 'ORDER_CREATED',
  OrderFulfilled: 'ORDER_FULFILLED',
  OrderFullyPaid: 'ORDER_FULLY_PAID',
  OrderMetadataUpdated: 'ORDER_METADATA_UPDATED',
  OrderUpdated: 'ORDER_UPDATED',
  PageCreated: 'PAGE_CREATED',
  PageDeleted: 'PAGE_DELETED',
  PageTypeCreated: 'PAGE_TYPE_CREATED',
  PageTypeDeleted: 'PAGE_TYPE_DELETED',
  PageTypeUpdated: 'PAGE_TYPE_UPDATED',
  PageUpdated: 'PAGE_UPDATED',
  PermissionGroupCreated: 'PERMISSION_GROUP_CREATED',
  PermissionGroupDeleted: 'PERMISSION_GROUP_DELETED',
  PermissionGroupUpdated: 'PERMISSION_GROUP_UPDATED',
  ProductCreated: 'PRODUCT_CREATED',
  ProductDeleted: 'PRODUCT_DELETED',
  ProductMetadataUpdated: 'PRODUCT_METADATA_UPDATED',
  ProductUpdated: 'PRODUCT_UPDATED',
  ProductVariantBackInStock: 'PRODUCT_VARIANT_BACK_IN_STOCK',
  ProductVariantCreated: 'PRODUCT_VARIANT_CREATED',
  ProductVariantDeleted: 'PRODUCT_VARIANT_DELETED',
  ProductVariantMetadataUpdated: 'PRODUCT_VARIANT_METADATA_UPDATED',
  ProductVariantOutOfStock: 'PRODUCT_VARIANT_OUT_OF_STOCK',
  ProductVariantUpdated: 'PRODUCT_VARIANT_UPDATED',
  SaleCreated: 'SALE_CREATED',
  SaleDeleted: 'SALE_DELETED',
  SaleToggle: 'SALE_TOGGLE',
  SaleUpdated: 'SALE_UPDATED',
  ShippingPriceCreated: 'SHIPPING_PRICE_CREATED',
  ShippingPriceDeleted: 'SHIPPING_PRICE_DELETED',
  ShippingPriceUpdated: 'SHIPPING_PRICE_UPDATED',
  ShippingZoneCreated: 'SHIPPING_ZONE_CREATED',
  ShippingZoneDeleted: 'SHIPPING_ZONE_DELETED',
  ShippingZoneMetadataUpdated: 'SHIPPING_ZONE_METADATA_UPDATED',
  ShippingZoneUpdated: 'SHIPPING_ZONE_UPDATED',
  StaffCreated: 'STAFF_CREATED',
  StaffDeleted: 'STAFF_DELETED',
  StaffUpdated: 'STAFF_UPDATED',
  TransactionActionRequest: 'TRANSACTION_ACTION_REQUEST',
  TransactionItemMetadataUpdated: 'TRANSACTION_ITEM_METADATA_UPDATED',
  TranslationCreated: 'TRANSLATION_CREATED',
  TranslationUpdated: 'TRANSLATION_UPDATED',
  VoucherCreated: 'VOUCHER_CREATED',
  VoucherDeleted: 'VOUCHER_DELETED',
  VoucherMetadataUpdated: 'VOUCHER_METADATA_UPDATED',
  VoucherUpdated: 'VOUCHER_UPDATED',
  WarehouseCreated: 'WAREHOUSE_CREATED',
  WarehouseDeleted: 'WAREHOUSE_DELETED',
  WarehouseMetadataUpdated: 'WAREHOUSE_METADATA_UPDATED',
  WarehouseUpdated: 'WAREHOUSE_UPDATED'
} as const;

export type WebhookSampleEventType = typeof WebhookSampleEventType[keyof typeof WebhookSampleEventType];
export const WeightUnit = {
  G: 'G',
  Kg: 'KG',
  Lb: 'LB',
  Oz: 'OZ',
  Tonne: 'TONNE'
} as const;

export type WeightUnit = typeof WeightUnit[keyof typeof WeightUnit];