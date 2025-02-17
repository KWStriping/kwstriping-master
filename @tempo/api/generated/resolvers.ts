/// <reference path="./graphql.ts" />
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  AppUser: ( Omit<App, 'metadata' | 'privateMetadata' | 'webhooks'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, webhooks: Array<_RefType['Webhook']> } ) | ( Omit<User, 'avatar' | 'checkout' | 'checkouts' | 'editableGroups' | 'events' | 'giftCards' | 'groups' | 'metadata' | 'orders' | 'privateMetadata' | 'storedPaymentSources' | 'userPermissions'> & { avatar?: Maybe<_RefType['Image']>, checkout?: Maybe<_RefType['Checkout']>, checkouts: _RefType['CheckoutNodeConnection'], editableGroups: Array<_RefType['Group']>, events: Array<_RefType['AccountEvent']>, giftCards: _RefType['GiftCardNodeConnection'], groups: Array<_RefType['Group']>, metadata: Array<_RefType['MetadataItem']>, orders: _RefType['OrderNodeConnection'], privateMetadata: Array<_RefType['MetadataItem']>, storedPaymentSources: Array<_RefType['PaymentSource']>, userPermissions: Array<_RefType['UserPermission']> } );
  FulfillmentMethod: ( Omit<ShippingMethod, 'channelListings' | 'excludedProducts' | 'metadata' | 'privateMetadata' | 'translation'> & { channelListings: Array<_RefType['ShippingMethodChannelListing']>, excludedProducts: _RefType['ProductConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['ShippingMethodTranslation']> } ) | ( Omit<Warehouse, 'metadata' | 'privateMetadata' | 'shippingZones'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingZones: _RefType['ShippingZoneConnection'] } );
  ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation: ( Omit<AttributeTranslation, 'attribute'> & { attribute: _RefType['Attribute'] } ) | ( Omit<CategoryTranslation, 'category'> & { category: _RefType['Category'] } ) | ( Omit<CollectionTranslation, 'collection'> & { collection: _RefType['Collection'] } ) | ( Omit<MenuItemTranslation, 'menuItem'> & { menuItem: _RefType['MenuItem'] } ) | ( Omit<PageTranslation, 'page'> & { page: _RefType['Page'] } ) | ( Omit<ProductTranslation, 'product' | 'values'> & { product: _RefType['Product'], values: Array<_RefType['ValueTranslation']> } ) | ( Omit<SaleTranslation, 'sale'> & { sale: _RefType['Sale'] } ) | ( Omit<ShippingMethodTranslation, 'shippingMethod'> & { shippingMethod: _RefType['ShippingMethod'] } ) | ( Omit<ValueTranslation, 'attribute' | 'value'> & { attribute: _RefType['Attribute'], value: _RefType['Value'] } ) | ( Omit<VoucherTranslation, 'voucher'> & { voucher: _RefType['Voucher'] } );
  TaxSourceLine: ( Omit<CheckoutLine, 'metadata' | 'privateMetadata' | 'product'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product: _RefType['ConcreteProduct'] } ) | ( Omit<OrderLine, 'allocations' | 'digitalContentUrl' | 'metadata' | 'privateMetadata' | 'product' | 'taxClassMetadata' | 'taxClassPrivateMetadata' | 'thumbnail'> & { allocations: Array<_RefType['Allocation']>, digitalContentUrl: _RefType['DigitalContentUrl'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product?: Maybe<_RefType['ConcreteProduct']>, taxClassMetadata: Array<_RefType['MetadataItem']>, taxClassPrivateMetadata: Array<_RefType['MetadataItem']>, thumbnail?: Maybe<_RefType['Image']> } );
  TaxSourceObject: ( Omit<Checkout, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['CheckoutLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } ) | ( Omit<Order, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['OrderLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } );
  TranslatableItem: ( Omit<AttributeTranslation, 'attribute'> & { attribute: _RefType['Attribute'] } ) | ( Omit<CategoryTranslation, 'category'> & { category: _RefType['Category'] } ) | ( Omit<CollectionTranslation, 'collection'> & { collection: _RefType['Collection'] } ) | ( Omit<MenuItemTranslation, 'menuItem'> & { menuItem: _RefType['MenuItem'] } ) | ( Omit<PageTranslation, 'page'> & { page: _RefType['Page'] } ) | ( Omit<ProductTranslation, 'product' | 'values'> & { product: _RefType['Product'], values: Array<_RefType['ValueTranslation']> } ) | ( Omit<SaleTranslation, 'sale'> & { sale: _RefType['Sale'] } ) | ( Omit<ShippingMethodTranslation, 'shippingMethod'> & { shippingMethod: _RefType['ShippingMethod'] } ) | ( Omit<ValueTranslation, 'attribute' | 'value'> & { attribute: _RefType['Attribute'], value: _RefType['Value'] } ) | ( Omit<VoucherTranslation, 'voucher'> & { voucher: _RefType['Voucher'] } );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  AbstractOrder: ( Omit<Checkout, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['CheckoutLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } ) | ( Omit<Order, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['OrderLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } );
  AddressBase: ( Address );
  AddressEvent: ( Omit<AddressCreated, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AddressDeleted, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AddressUpdated, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } );
  AppBase: ( Omit<AppDeleted, 'app' | 'issuingPrincipal' | 'recipient'> & { app: _RefType['App'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AppInstalled, 'app' | 'issuingPrincipal' | 'recipient'> & { app: _RefType['App'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AppStatusChanged, 'app' | 'issuingPrincipal' | 'recipient'> & { app: _RefType['App'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AppUpdated, 'app' | 'issuingPrincipal' | 'recipient'> & { app: _RefType['App'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } );
  AttributeBase: ( Omit<AttributeCreated, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: _RefType['Attribute'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AttributeDeleted, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: _RefType['Attribute'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AttributeUpdated, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: _RefType['Attribute'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } );
  BaseMutationResult: ( Omit<AddressMutationResult, 'errors' | 'user'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, user: _RefType['User'] } ) | ( Omit<AppInstallationMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<AppMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['App'] } ) | ( Omit<AppTokenMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<AttributeMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Attribute'] } ) | ( Omit<AuthPluginMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<BoolMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<CategoryMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Category'] } ) | ( Omit<ChannelMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Channel'] } ) | ( Omit<ChannelReorderWarehousesMutationResult, 'channel' | 'errors'> & { channel: _RefType['Channel'], errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<CheckoutCompleteMutationResult, 'errors' | 'order'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, order: _RefType['Order'] } ) | ( Omit<CheckoutMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Checkout'] } ) | ( Omit<CheckoutOptionalMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result?: Maybe<_RefType['Checkout']> } ) | ( Omit<CheckoutPaymentMutationResult, 'checkout' | 'errors' | 'payment'> & { checkout: _RefType['Checkout'], errors?: Maybe<Array<_RefType['ErrorInterface']>>, payment: _RefType['Payment'] } ) | ( Omit<CollectionChannelListingMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['CollectionChannelListing'] } ) | ( Omit<CollectionMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Collection'] } ) | ( Omit<DigitalContentMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['DigitalContent'] } ) | ( Omit<EventDeliveryMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<ExportFileMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['ExportFile'] } ) | ( Omit<ExternalNotificationTriggerMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<FileMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['File'] } ) | ( Omit<GiftCardBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, objects: Array<_RefType['GiftCard']> } ) | ( Omit<GiftCardMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['GiftCard'] } ) | ( Omit<GiftCardSettingsMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<Giftcardmutationresult, 'errors' | 'event' | 'giftCard'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, event: _RefType['GiftCardEvent'], giftCard: _RefType['GiftCard'] } ) | ( Omit<GroupMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Group'] } ) | ( Omit<IdListMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<InvoiceMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Invoice'] } ) | ( Omit<JwtMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['JWT'] } ) | ( Omit<ManifestMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<MediaItemMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['MediaItem'] } ) | ( Omit<MenuItemMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['MenuItem'] } ) | ( Omit<MenuMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Menu'] } ) | ( Omit<ObjectWithMetadataMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['ObjectWithMetadata'] } ) | ( Omit<OrderBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, objects: Array<_RefType['Order']> } ) | ( Omit<OrderFulfillmentMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['OrderFulfillment'] } ) | ( Omit<OrderInvoiceMutationResult, 'errors' | 'invoice' | 'order'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, invoice: _RefType['Invoice'], order: _RefType['Order'] } ) | ( Omit<OrderLineMutationResult, 'errors' | 'order' | 'orderLine'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, order: _RefType['Order'], orderLine: _RefType['OrderLine'] } ) | ( Omit<OrderLinesMutationResult, 'errors' | 'order' | 'orderLines'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, order: _RefType['Order'], orderLines: Array<_RefType['OrderLine']> } ) | ( Omit<OrderMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Order'] } ) | ( Omit<OrderSettingsMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<Ordermutationresult, 'errors' | 'event' | 'order'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, event: _RefType['OrderEvent'], order: _RefType['Order'] } ) | ( Omit<PageBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, objects: Array<_RefType['Page']> } ) | ( Omit<PageKlassMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['PageKlass'] } ) | ( Omit<PageMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Page'] } ) | ( Omit<PaymentCheckBalanceMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<PaymentInitializeMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<PaymentMutationResult, 'errors' | 'payment'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, payment: _RefType['Payment'] } ) | ( Omit<PluginMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Plugin'] } ) | ( Omit<ProductAttributeAssignmentMutationResult, 'errors' | 'productKlass'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, productKlass: _RefType['ProductKlass'] } ) | ( Omit<ProductBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, objects: Array<_RefType['Product']> } ) | ( Omit<ProductKlassMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['ProductKlass'] } ) | ( Omit<ProductMediaAssignmentMutationResult, 'errors' | 'mediaItem' | 'product'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, mediaItem: _RefType['ProductMediaItem'], product: _RefType['Product'] } ) | ( Omit<ProductMediaMutationResult, 'errors' | 'media' | 'product'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, media: _RefType['ProductMediaItem'], product: _RefType['Product'] } ) | ( Omit<ProductMediaUnassignmentMutationResult, 'errors' | 'mediaItem' | 'product'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, mediaItem: _RefType['ProductMediaItem'], product: _RefType['Product'] } ) | ( Omit<ProductMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Product'] } ) | ( Omit<ProductPreorderDeactivationMutationResult, 'errors' | 'productVariant'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, productVariant: _RefType['Product'] } ) | ( Omit<SaleMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Sale'] } ) | ( Omit<ShippingMethodChannelListingMutationResult, 'channelListing' | 'errors' | 'shippingMethod'> & { channelListing: _RefType['ShippingMethodChannelListing'], errors?: Maybe<Array<_RefType['ErrorInterface']>>, shippingMethod: _RefType['ShippingMethod'] } ) | ( Omit<ShippingMethodMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['ShippingMethod'] } ) | ( Omit<ShippingPriceMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['ShippingPrice'] } ) | ( Omit<ShippingPriceRemoveProductFromExcludeMutationResult, 'errors' | 'shippingMethod'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, shippingMethod: _RefType['ShippingMethod'] } ) | ( Omit<ShippingZoneMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['ShippingZone'] } ) | ( Omit<SiteMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Site'] } ) | ( Omit<SiteTranslationMutationResult, 'errors' | 'shop'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, shop: _RefType['Site'] } ) | ( Omit<StaffNotificationRecipientMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['StaffNotificationRecipient'] } ) | ( Omit<TaxClassMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<TaxConfigurationMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['TaxConfiguration'] } ) | ( Omit<TaxCountryConfigurationMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<TaxSourceObjectMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['TaxSourceObject'] } ) | ( Omit<TokenVerificationMutationResult, 'errors' | 'payload' | 'user'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, payload: _RefType['JWT'], user: _RefType['User'] } ) | ( Omit<TransactionItemMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['TransactionItem'] } ) | ( Omit<UserBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, objects: Array<_RefType['User']> } ) | ( Omit<UserCreationResult, 'errors' | 'user'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, user: _RefType['User'] } ) | ( Omit<UserMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['User'] } ) | ( Omit<ValueMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Value'] } ) | ( Omit<VoucherMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Voucher'] } ) | ( Omit<WarehouseMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, result: _RefType['Warehouse'] } ) | ( Omit<WarehouseShippingZoneAssignmentMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<WarehouseShippingZoneUnassignmentMutationResult, 'errors'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>> } ) | ( Omit<WebhookMutationResult, 'errors' | 'webhook'> & { errors?: Maybe<Array<_RefType['ErrorInterface']>>, webhook: _RefType['Webhook'] } );
  BasePricingInfo: ( ProductPricingInfo );
  BaseTranslation: ( Omit<AttributeTranslation, 'attribute'> & { attribute: _RefType['Attribute'] } ) | ( Omit<CategoryTranslation, 'category'> & { category: _RefType['Category'] } ) | ( Omit<CollectionTranslation, 'collection'> & { collection: _RefType['Collection'] } ) | ( Omit<MenuItemTranslation, 'menuItem'> & { menuItem: _RefType['MenuItem'] } ) | ( Omit<PageTranslation, 'page'> & { page: _RefType['Page'] } ) | ( Omit<ProductTranslation, 'product' | 'values'> & { product: _RefType['Product'], values: Array<_RefType['ValueTranslation']> } ) | ( Omit<SaleTranslation, 'sale'> & { sale: _RefType['Sale'] } ) | ( Omit<ShippingMethodTranslation, 'shippingMethod'> & { shippingMethod: _RefType['ShippingMethod'] } ) | ( SiteTranslation ) | ( Omit<ValueTranslation, 'attribute' | 'value'> & { attribute: _RefType['Attribute'], value: _RefType['Value'] } ) | ( Omit<VoucherTranslation, 'voucher'> & { voucher: _RefType['Voucher'] } );
  CategoryBase: ( Omit<CategoryCreated, 'category' | 'issuingPrincipal' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CategoryDeleted, 'category' | 'issuingPrincipal' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CategoryUpdated, 'category' | 'issuingPrincipal' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } );
  ChannelBase: ( Omit<ChannelCreated, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: _RefType['Channel'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<ChannelDeleted, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: _RefType['Channel'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<ChannelStatusChanged, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: _RefType['Channel'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<ChannelUpdated, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: _RefType['Channel'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } );
  CheckoutBase: ( Omit<CheckoutCreated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CheckoutFilterShippingMethods, 'checkout' | 'issuingPrincipal' | 'recipient' | 'shippingMethods'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethods: Array<_RefType['ShippingMethod']> } ) | ( Omit<CheckoutMetadataUpdated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CheckoutUpdated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<PaymentListGateways, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<ShippingListMethodsForCheckout, 'checkout' | 'issuingPrincipal' | 'recipient' | 'shippingMethods'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethods: Array<_RefType['ShippingMethod']> } );
  CollectionBase: ( Omit<CollectionCreated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: _RefType['Collection'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CollectionDeleted, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: _RefType['Collection'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CollectionMetadataUpdated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: _RefType['Collection'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CollectionUpdated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: _RefType['Collection'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } );
  ErrorInterface: ( AccountError ) | ( AppError ) | ( BulkProductError ) | ( BulkStockError ) | ( ChannelError ) | ( CheckoutError ) | ( CollectionChannelListingError ) | ( DiscountError ) | ( Error ) | ( GiftCardError ) | ( GroupError ) | ( MediaError ) | ( OrderError ) | ( PageError ) | ( PaymentError ) | ( ProductChannelListingError ) | ( ProductError ) | ( ProductWithoutVariantError ) | ( ShippingError ) | ( StaffError ) | ( TaxClassCreateError ) | ( TaxClassDeleteError ) | ( TaxClassUpdateError ) | ( TaxConfigurationUpdateError ) | ( TaxCountryConfigurationUpdateError ) | ( WarehouseError );
  Event: ( Omit<AddressCreated, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AddressDeleted, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AddressUpdated, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AppDeleted, 'app' | 'issuingPrincipal' | 'recipient'> & { app: _RefType['App'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AppInstalled, 'app' | 'issuingPrincipal' | 'recipient'> & { app: _RefType['App'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AppStatusChanged, 'app' | 'issuingPrincipal' | 'recipient'> & { app: _RefType['App'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AppUpdated, 'app' | 'issuingPrincipal' | 'recipient'> & { app: _RefType['App'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AttributeCreated, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: _RefType['Attribute'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AttributeDeleted, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: _RefType['Attribute'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<AttributeUpdated, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: _RefType['Attribute'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CalculateTaxes, 'issuingPrincipal' | 'recipient' | 'taxBase'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], taxBase: _RefType['TaxableObject'] } ) | ( Omit<CategoryCreated, 'category' | 'issuingPrincipal' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CategoryDeleted, 'category' | 'issuingPrincipal' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CategoryUpdated, 'category' | 'issuingPrincipal' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<ChannelCreated, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: _RefType['Channel'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<ChannelDeleted, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: _RefType['Channel'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<ChannelStatusChanged, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: _RefType['Channel'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<ChannelUpdated, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: _RefType['Channel'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CheckoutCreated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CheckoutFilterShippingMethods, 'checkout' | 'issuingPrincipal' | 'recipient' | 'shippingMethods'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethods: Array<_RefType['ShippingMethod']> } ) | ( Omit<CheckoutMetadataUpdated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CheckoutUpdated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CollectionCreated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: _RefType['Collection'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CollectionDeleted, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: _RefType['Collection'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CollectionMetadataUpdated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: _RefType['Collection'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CollectionUpdated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: _RefType['Collection'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<CreateOrderd, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<CustomerCreated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<CustomerMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<CustomerUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<DraftOrderCreated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<DraftOrderDeleted, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<DraftOrderUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<FulfillmentApproved, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: _RefType['Fulfillment'], issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<FulfillmentCanceled, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: _RefType['Fulfillment'], issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<FulfillmentCreated, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: _RefType['Fulfillment'], issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<FulfillmentMetadataUpdated, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: _RefType['Fulfillment'], issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<GiftCardCreated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GiftCardDeleted, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GiftCardMetadataUpdated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GiftCardStatusChanged, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GiftCardUpdated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GroupCreated, 'group' | 'issuingPrincipal' | 'recipient'> & { group: _RefType['Group'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GroupDeleted, 'group' | 'issuingPrincipal' | 'recipient'> & { group: _RefType['Group'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GroupUpdated, 'group' | 'issuingPrincipal' | 'recipient'> & { group: _RefType['Group'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<InvoiceDeleted, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: _RefType['Invoice'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<InvoiceRequested, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: _RefType['Invoice'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<InvoiceSent, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: _RefType['Invoice'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<MediaCreated, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], media: _RefType['MediaItem'], recipient: _RefType['App'] } ) | ( Omit<MediaDeleted, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], media: _RefType['MediaItem'], recipient: _RefType['App'] } ) | ( Omit<MediaUpdated, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], media: _RefType['MediaItem'], recipient: _RefType['App'] } ) | ( Omit<MenuCreated, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menu: _RefType['Menu'], recipient: _RefType['App'] } ) | ( Omit<MenuDeleted, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menu: _RefType['Menu'], recipient: _RefType['App'] } ) | ( Omit<MenuItemCreated, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menuItem: _RefType['MenuItem'], recipient: _RefType['App'] } ) | ( Omit<MenuItemDeleted, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menuItem: _RefType['MenuItem'], recipient: _RefType['App'] } ) | ( Omit<MenuItemUpdated, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menuItem: _RefType['MenuItem'], recipient: _RefType['App'] } ) | ( Omit<MenuUpdated, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menu: _RefType['Menu'], recipient: _RefType['App'] } ) | ( Omit<OrderCancelled, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderConfirmed, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderFilterShippingMethods, 'issuingPrincipal' | 'order' | 'recipient' | 'shippingMethods'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'], shippingMethods: Array<_RefType['ShippingMethod']> } ) | ( Omit<OrderFulfilled, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderFullyPaid, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderMetadataUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<PageCreated, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], page: _RefType['Page'], recipient: _RefType['App'] } ) | ( Omit<PageDeleted, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], page: _RefType['Page'], recipient: _RefType['App'] } ) | ( Omit<PageKlassCreated, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], pageKlass: _RefType['PageKlass'], recipient: _RefType['App'] } ) | ( Omit<PageKlassDeleted, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], pageKlass: _RefType['PageKlass'], recipient: _RefType['App'] } ) | ( Omit<PageKlassUpdated, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], pageKlass: _RefType['PageKlass'], recipient: _RefType['App'] } ) | ( Omit<PageUpdated, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], page: _RefType['Page'], recipient: _RefType['App'] } ) | ( Omit<PaymentAuthorize, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentCaptureEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentConfirmEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentListGateways, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<PaymentProcessEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentRefundEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentVoidEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<ProductBackInStock, 'category' | 'issuingPrincipal' | 'product' | 'productVariant' | 'recipient' | 'warehouse'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], productVariant: _RefType['Product'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<ProductCreated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], recipient: _RefType['App'] } ) | ( Omit<ProductDeleted, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], recipient: _RefType['App'] } ) | ( Omit<ProductMetadataUpdated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], recipient: _RefType['App'] } ) | ( Omit<ProductOutOfStock, 'category' | 'issuingPrincipal' | 'product' | 'productVariant' | 'recipient' | 'warehouse'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], productVariant: _RefType['Product'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<ProductUpdated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], recipient: _RefType['App'] } ) | ( Omit<SaleCreated, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], sale: _RefType['Sale'] } ) | ( Omit<SaleDeleted, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], sale: _RefType['Sale'] } ) | ( Omit<SaleToggle, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], sale: _RefType['Sale'] } ) | ( Omit<SaleUpdated, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], sale: _RefType['Sale'] } ) | ( Omit<ShippingListMethodsForCheckout, 'checkout' | 'issuingPrincipal' | 'recipient' | 'shippingMethods'> & { checkout: _RefType['Checkout'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethods: Array<_RefType['ShippingMethod']> } ) | ( Omit<ShippingPriceCreated, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethod: _RefType['ShippingMethod'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingPriceDeleted, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethod: _RefType['ShippingMethod'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingPriceUpdated, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethod: _RefType['ShippingMethod'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingZoneCreated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingZoneDeleted, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingZoneMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingZoneUpdated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<StaffCreated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<StaffDeleted, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<StaffUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<Subscription, 'event' | 'issuingPrincipal' | 'recipient'> & { event: _RefType['Event'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<TransactionAction, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<TransactionActionRequest, 'action' | 'issuingPrincipal' | 'recipient' | 'transaction'> & { action: _RefType['TransactionAction'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], transaction: _RefType['TransactionItem'] } ) | ( Omit<TransactionItemMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'transaction'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], transaction: _RefType['TransactionItem'] } ) | ( Omit<TranslationCreated, 'issuingPrincipal' | 'recipient' | 'translation'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], translation: _RefType['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] } ) | ( Omit<TranslationUpdated, 'issuingPrincipal' | 'recipient' | 'translation'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], translation: _RefType['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] } ) | ( Omit<ValueCreated, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], value: _RefType['Value'] } ) | ( Omit<ValueDeleted, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], value: _RefType['Value'] } ) | ( Omit<ValueUpdated, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], value: _RefType['Value'] } ) | ( Omit<VoucherCreated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], voucher: _RefType['Voucher'] } ) | ( Omit<VoucherDeleted, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], voucher: _RefType['Voucher'] } ) | ( Omit<VoucherMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], voucher: _RefType['Voucher'] } ) | ( Omit<VoucherUpdated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], voucher: _RefType['Voucher'] } ) | ( Omit<WarehouseCreated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<WarehouseDeleted, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<WarehouseMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<WarehouseUpdated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } );
  FulfillmentBase: ( Omit<FulfillmentApproved, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: _RefType['Fulfillment'], issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<FulfillmentCanceled, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: _RefType['Fulfillment'], issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<FulfillmentCreated, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: _RefType['Fulfillment'], issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<FulfillmentMetadataUpdated, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: _RefType['Fulfillment'], issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } );
  GiftCardBase: ( Omit<GiftCardCreated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GiftCardDeleted, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GiftCardMetadataUpdated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GiftCardStatusChanged, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GiftCardUpdated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: _RefType['GiftCard'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } );
  GoogleAddressBase: ( Address );
  GroupBase: ( Omit<GroupCreated, 'group' | 'issuingPrincipal' | 'recipient'> & { group: _RefType['Group'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GroupDeleted, 'group' | 'issuingPrincipal' | 'recipient'> & { group: _RefType['Group'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<GroupUpdated, 'group' | 'issuingPrincipal' | 'recipient'> & { group: _RefType['Group'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } );
  InvoiceBase: ( Omit<InvoiceDeleted, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: _RefType['Invoice'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<InvoiceRequested, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: _RefType['Invoice'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } ) | ( Omit<InvoiceSent, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: _RefType['Invoice'], issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'] } );
  Job: ( AppInstallation ) | ( Omit<ExportFile, 'app' | 'events' | 'user'> & { app: _RefType['App'], events: Array<_RefType['ExportEvent']>, user: _RefType['User'] } ) | ( Omit<Invoice, 'metadata' | 'privateMetadata'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } );
  MediaBase: ( Omit<MediaCreated, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], media: _RefType['MediaItem'], recipient: _RefType['App'] } ) | ( Omit<MediaDeleted, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], media: _RefType['MediaItem'], recipient: _RefType['App'] } ) | ( Omit<MediaUpdated, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], media: _RefType['MediaItem'], recipient: _RefType['App'] } );
  MenuBase: ( Omit<MenuCreated, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menu: _RefType['Menu'], recipient: _RefType['App'] } ) | ( Omit<MenuDeleted, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menu: _RefType['Menu'], recipient: _RefType['App'] } ) | ( Omit<MenuUpdated, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menu: _RefType['Menu'], recipient: _RefType['App'] } );
  MenuItemBase: ( Omit<MenuItemCreated, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menuItem: _RefType['MenuItem'], recipient: _RefType['App'] } ) | ( Omit<MenuItemDeleted, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menuItem: _RefType['MenuItem'], recipient: _RefType['App'] } ) | ( Omit<MenuItemUpdated, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], menuItem: _RefType['MenuItem'], recipient: _RefType['App'] } );
  Node: ( Omit<AbstractProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<_RefType['AbstractProduct']>, attribute: _RefType['Attribute'], attributes: Array<_RefType['Attribute']>, category?: Maybe<_RefType['Category']>, channelListings: Array<_RefType['ProductChannelListing']>, collections: Array<_RefType['Collection']>, defaultVariant: _RefType['Product'], digitalContent: _RefType['DigitalContent'], imageById: _RefType['ProductImage'], images: Array<_RefType['ProductImage']>, media: Array<_RefType['ProductMediaItem']>, mediaById: _RefType['ProductMediaItem'], metadata: Array<_RefType['MetadataItem']>, parent: _RefType['AbstractProduct'], privateMetadata: Array<_RefType['MetadataItem']>, productKlass: _RefType['ProductKlass'], stocks: Array<_RefType['Stock']>, thumbnail?: Maybe<_RefType['Image']>, translation?: Maybe<_RefType['ProductTranslation']>, variant: _RefType['Product'], variants: Array<_RefType['Product']> } ) | ( Omit<AccountEvent, 'app' | 'order' | 'orderLine' | 'user'> & { app?: Maybe<_RefType['App']>, order: _RefType['Order'], orderLine: _RefType['OrderLine'], user: _RefType['User'] } ) | ( Address ) | ( Omit<Allocation, 'warehouse'> & { warehouse: _RefType['Warehouse'] } ) | ( Omit<App, 'metadata' | 'privateMetadata' | 'webhooks'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, webhooks: Array<_RefType['Webhook']> } ) | ( Omit<AppExtension, 'app'> & { app: _RefType['App'] } ) | ( AppInstallation ) | ( AppToken ) | ( AsyncWebhookEvent ) | ( Omit<Attribute, 'metadata' | 'privateMetadata' | 'productKlasses' | 'productVariantTypes' | 'translation' | 'values'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, productKlasses: _RefType['ProductKlassNodeConnection'], productVariantTypes: _RefType['ProductKlassNodeConnection'], translation: _RefType['AttributeTranslation'], values: _RefType['ValueConnection'] } ) | ( Omit<AttributeTranslation, 'attribute'> & { attribute: _RefType['Attribute'] } ) | ( Omit<Category, 'backgroundImage' | 'metadata' | 'parent' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<_RefType['Image']>, metadata: Array<_RefType['MetadataItem']>, parent: _RefType['Category'], privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductNodeConnection'], translation?: Maybe<_RefType['CategoryTranslation']> } ) | ( Omit<CategoryTranslation, 'category'> & { category: _RefType['Category'] } ) | ( Omit<Channel, 'stockSettings' | 'warehouses'> & { stockSettings: _RefType['StockSettings'], warehouses: Array<_RefType['Warehouse']> } ) | ( Omit<Checkout, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['CheckoutLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } ) | ( Omit<CheckoutLine, 'metadata' | 'privateMetadata' | 'product'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product: _RefType['ConcreteProduct'] } ) | ( Omit<Collection, 'backgroundImage' | 'channelListings' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<_RefType['Image']>, channelListings: Array<_RefType['CollectionChannelListing']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductConnection'], translation?: Maybe<_RefType['CollectionTranslation']> } ) | ( Omit<CollectionChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( Omit<CollectionTranslation, 'collection'> & { collection: _RefType['Collection'] } ) | ( Omit<ConcreteProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<_RefType['AbstractProduct']>, attribute: _RefType['Attribute'], attributes: Array<_RefType['Attribute']>, category?: Maybe<_RefType['Category']>, channelListings: Array<_RefType['ProductChannelListing']>, collections: Array<_RefType['Collection']>, defaultVariant: _RefType['Product'], digitalContent: _RefType['DigitalContent'], imageById: _RefType['ProductImage'], images: Array<_RefType['ProductImage']>, media: Array<_RefType['ProductMediaItem']>, mediaById: _RefType['ProductMediaItem'], metadata: Array<_RefType['MetadataItem']>, parent: _RefType['AbstractProduct'], privateMetadata: Array<_RefType['MetadataItem']>, productKlass: _RefType['ProductKlass'], stocks: Array<_RefType['Stock']>, thumbnail?: Maybe<_RefType['Image']>, translation?: Maybe<_RefType['ProductTranslation']>, variant: _RefType['Product'], variants: Array<_RefType['Product']> } ) | ( Omit<DigitalContent, 'metadata' | 'privateMetadata' | 'productVariant' | 'urls'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, productVariant: _RefType['Product'], urls: Array<_RefType['DigitalContentUrl']> } ) | ( Omit<DigitalContentUrl, 'content'> & { content: _RefType['DigitalContent'] } ) | ( EventDelivery ) | ( Omit<ExportEvent, 'app' | 'user'> & { app?: Maybe<_RefType['App']>, user?: Maybe<_RefType['User']> } ) | ( Omit<ExportFile, 'app' | 'events' | 'user'> & { app: _RefType['App'], events: Array<_RefType['ExportEvent']>, user: _RefType['User'] } ) | ( Omit<Fulfillment, 'lines' | 'metadata' | 'privateMetadata' | 'warehouse'> & { lines: Array<_RefType['FulfillmentLine']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, warehouse?: Maybe<_RefType['Warehouse']> } ) | ( Omit<FulfillmentLine, 'orderLine'> & { orderLine: _RefType['OrderLine'] } ) | ( Omit<GiftCard, 'app' | 'createdBy' | 'events' | 'metadata' | 'privateMetadata' | 'product' | 'usedBy' | 'user'> & { app: _RefType['App'], createdBy: _RefType['User'], events: Array<_RefType['GiftCardEvent']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product: _RefType['Product'], usedBy: _RefType['User'], user?: Maybe<_RefType['User']> } ) | ( Omit<GiftCardEvent, 'app' | 'user'> & { app: _RefType['App'], user: _RefType['User'] } ) | ( GiftCardTag ) | ( Omit<Group, 'users'> & { users: Array<_RefType['User']> } ) | ( Omit<Invoice, 'metadata' | 'privateMetadata'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<MediaItem, 'file' | 'metadata' | 'privateMetadata'> & { file: _RefType['File'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<Menu, 'items' | 'metadata' | 'privateMetadata'> & { items: Array<_RefType['MenuItem']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<MenuItem, 'category' | 'children' | 'collection' | 'menu' | 'metadata' | 'page' | 'parent' | 'privateMetadata' | 'translation'> & { category?: Maybe<_RefType['Category']>, children?: Maybe<Array<_RefType['MenuItem']>>, collection?: Maybe<_RefType['Collection']>, menu: _RefType['Menu'], metadata: Array<_RefType['MetadataItem']>, page?: Maybe<_RefType['Page']>, parent?: Maybe<_RefType['MenuItem']>, privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['MenuItemTranslation']> } ) | ( Omit<MenuItemTranslation, 'menuItem'> & { menuItem: _RefType['MenuItem'] } ) | ( Omit<Order, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['OrderLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } ) | ( OrderDiscount ) | ( Omit<OrderEvent, 'app' | 'fulfilledItems' | 'lines' | 'relatedOrder' | 'user' | 'warehouse'> & { app: _RefType['App'], fulfilledItems: Array<_RefType['FulfillmentLine']>, lines: Array<_RefType['OrderEventOrderLineObject']>, relatedOrder: _RefType['Order'], user: _RefType['User'], warehouse: _RefType['Warehouse'] } ) | ( Omit<OrderLine, 'allocations' | 'digitalContentUrl' | 'metadata' | 'privateMetadata' | 'product' | 'taxClassMetadata' | 'taxClassPrivateMetadata' | 'thumbnail'> & { allocations: Array<_RefType['Allocation']>, digitalContentUrl: _RefType['DigitalContentUrl'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product?: Maybe<_RefType['ConcreteProduct']>, taxClassMetadata: Array<_RefType['MetadataItem']>, taxClassPrivateMetadata: Array<_RefType['MetadataItem']>, thumbnail?: Maybe<_RefType['Image']> } ) | ( Omit<Page, 'attributes' | 'metadata' | 'pageKlass' | 'privateMetadata' | 'translation'> & { attributes: Array<_RefType['Attribute']>, metadata: Array<_RefType['MetadataItem']>, pageKlass: _RefType['PageKlass'], privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['PageTranslation']> } ) | ( Omit<PageKlass, 'attributes' | 'availableAttributes' | 'metadata' | 'privateMetadata'> & { attributes: Array<_RefType['Attribute']>, availableAttributes: _RefType['AttributeConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<PageTranslation, 'page'> & { page: _RefType['Page'] } ) | ( Omit<Payment, 'checkout' | 'metadata' | 'order' | 'privateMetadata' | 'transactions'> & { checkout: _RefType['Checkout'], metadata: Array<_RefType['MetadataItem']>, order: _RefType['Order'], privateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['Transaction']> } ) | ( PointOfContact ) | ( Omit<ProductChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( Omit<ProductImage, 'url'> & { url?: Maybe<_RefType['Image']> } ) | ( Omit<ProductKlass, 'metadata' | 'privateMetadata' | 'productAttributes' | 'productVariantAttributeAssignments' | 'products' | 'variantAttributes'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, productAttributes: Array<_RefType['Attribute']>, productVariantAttributeAssignments: Array<_RefType['ProductAttributeAssignment']>, products: _RefType['ProductNodeConnection'], variantAttributes: Array<_RefType['Attribute']> } ) | ( Omit<ProductMediaItem, 'mediaItem'> & { mediaItem: _RefType['MediaItem'] } ) | ( Omit<ProductTranslation, 'product' | 'values'> & { product: _RefType['Product'], values: Array<_RefType['ValueTranslation']> } ) | ( Omit<Sale, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<_RefType['SaleChannelListing']>, collections: _RefType['CollectionConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductNodeConnection'], translation?: Maybe<_RefType['SaleTranslation']> } ) | ( Omit<SaleChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( Omit<SaleTranslation, 'sale'> & { sale: _RefType['Sale'] } ) | ( Omit<ShippingMethod, 'channelListings' | 'excludedProducts' | 'metadata' | 'privateMetadata' | 'translation'> & { channelListings: Array<_RefType['ShippingMethodChannelListing']>, excludedProducts: _RefType['ProductConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['ShippingMethodTranslation']> } ) | ( Omit<ShippingMethodChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( ShippingMethodPostalCodeRule ) | ( Omit<ShippingMethodTranslation, 'shippingMethod'> & { shippingMethod: _RefType['ShippingMethod'] } ) | ( Omit<ShippingZone, 'channels' | 'metadata' | 'privateMetadata' | 'shippingMethods' | 'warehouses'> & { channels: Array<_RefType['Channel']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethods: Array<_RefType['ShippingMethod']>, warehouses: Array<_RefType['Warehouse']> } ) | ( Omit<Site, 'availableShippingMethods' | 'logo' | 'staffNotificationRecipients'> & { availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, logo?: Maybe<_RefType['Image']>, staffNotificationRecipients?: Maybe<Array<_RefType['StaffNotificationRecipient']>> } ) | ( SiteTranslation ) | ( Omit<StaffNotificationRecipient, 'user'> & { user?: Maybe<_RefType['User']> } ) | ( Omit<Stock, 'productVariant' | 'warehouse'> & { productVariant: _RefType['Product'], warehouse: _RefType['Warehouse'] } ) | ( SyncWebhookEvent ) | ( Omit<TaxClass, 'metadata' | 'privateMetadata'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<TaxConfiguration, 'channel' | 'metadata' | 'privateMetadata'> & { channel: _RefType['Channel'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( TaxConfigurationPerCountry ) | ( Omit<Transaction, 'payment'> & { payment: _RefType['Payment'] } ) | ( TransactionEvent ) | ( Omit<TransactionItem, 'events' | 'metadata' | 'order' | 'privateMetadata'> & { events: Array<_RefType['TransactionEvent']>, metadata: Array<_RefType['MetadataItem']>, order?: Maybe<_RefType['Order']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<User, 'avatar' | 'checkout' | 'checkouts' | 'editableGroups' | 'events' | 'giftCards' | 'groups' | 'metadata' | 'orders' | 'privateMetadata' | 'storedPaymentSources' | 'userPermissions'> & { avatar?: Maybe<_RefType['Image']>, checkout?: Maybe<_RefType['Checkout']>, checkouts: _RefType['CheckoutNodeConnection'], editableGroups: Array<_RefType['Group']>, events: Array<_RefType['AccountEvent']>, giftCards: _RefType['GiftCardNodeConnection'], groups: Array<_RefType['Group']>, metadata: Array<_RefType['MetadataItem']>, orders: _RefType['OrderNodeConnection'], privateMetadata: Array<_RefType['MetadataItem']>, storedPaymentSources: Array<_RefType['PaymentSource']>, userPermissions: Array<_RefType['UserPermission']> } ) | ( Omit<Value, 'file' | 'translation'> & { file?: Maybe<_RefType['File']>, translation?: Maybe<_RefType['ValueTranslation']> } ) | ( Omit<ValueTranslation, 'attribute' | 'value'> & { attribute: _RefType['Attribute'], value: _RefType['Value'] } ) | ( Omit<Voucher, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<_RefType['VoucherChannelListing']>, collections: _RefType['CollectionConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductNodeConnection'], translation?: Maybe<_RefType['VoucherTranslation']> } ) | ( Omit<VoucherChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( Omit<VoucherTranslation, 'voucher'> & { voucher: _RefType['Voucher'] } ) | ( Omit<Warehouse, 'metadata' | 'privateMetadata' | 'shippingZones'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingZones: _RefType['ShippingZoneConnection'] } ) | ( Omit<Webhook, 'app'> & { app: _RefType['App'] } );
  ObjectWithMetadata: ( Omit<AbstractProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<_RefType['AbstractProduct']>, attribute: _RefType['Attribute'], attributes: Array<_RefType['Attribute']>, category?: Maybe<_RefType['Category']>, channelListings: Array<_RefType['ProductChannelListing']>, collections: Array<_RefType['Collection']>, defaultVariant: _RefType['Product'], digitalContent: _RefType['DigitalContent'], imageById: _RefType['ProductImage'], images: Array<_RefType['ProductImage']>, media: Array<_RefType['ProductMediaItem']>, mediaById: _RefType['ProductMediaItem'], metadata: Array<_RefType['MetadataItem']>, parent: _RefType['AbstractProduct'], privateMetadata: Array<_RefType['MetadataItem']>, productKlass: _RefType['ProductKlass'], stocks: Array<_RefType['Stock']>, thumbnail?: Maybe<_RefType['Image']>, translation?: Maybe<_RefType['ProductTranslation']>, variant: _RefType['Product'], variants: Array<_RefType['Product']> } ) | ( Omit<App, 'metadata' | 'privateMetadata' | 'webhooks'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, webhooks: Array<_RefType['Webhook']> } ) | ( Omit<Attribute, 'metadata' | 'privateMetadata' | 'productKlasses' | 'productVariantTypes' | 'translation' | 'values'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, productKlasses: _RefType['ProductKlassNodeConnection'], productVariantTypes: _RefType['ProductKlassNodeConnection'], translation: _RefType['AttributeTranslation'], values: _RefType['ValueConnection'] } ) | ( Omit<Category, 'backgroundImage' | 'metadata' | 'parent' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<_RefType['Image']>, metadata: Array<_RefType['MetadataItem']>, parent: _RefType['Category'], privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductNodeConnection'], translation?: Maybe<_RefType['CategoryTranslation']> } ) | ( Omit<Checkout, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['CheckoutLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } ) | ( Omit<CheckoutLine, 'metadata' | 'privateMetadata' | 'product'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product: _RefType['ConcreteProduct'] } ) | ( Omit<Collection, 'backgroundImage' | 'channelListings' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<_RefType['Image']>, channelListings: Array<_RefType['CollectionChannelListing']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductConnection'], translation?: Maybe<_RefType['CollectionTranslation']> } ) | ( Omit<ConcreteProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<_RefType['AbstractProduct']>, attribute: _RefType['Attribute'], attributes: Array<_RefType['Attribute']>, category?: Maybe<_RefType['Category']>, channelListings: Array<_RefType['ProductChannelListing']>, collections: Array<_RefType['Collection']>, defaultVariant: _RefType['Product'], digitalContent: _RefType['DigitalContent'], imageById: _RefType['ProductImage'], images: Array<_RefType['ProductImage']>, media: Array<_RefType['ProductMediaItem']>, mediaById: _RefType['ProductMediaItem'], metadata: Array<_RefType['MetadataItem']>, parent: _RefType['AbstractProduct'], privateMetadata: Array<_RefType['MetadataItem']>, productKlass: _RefType['ProductKlass'], stocks: Array<_RefType['Stock']>, thumbnail?: Maybe<_RefType['Image']>, translation?: Maybe<_RefType['ProductTranslation']>, variant: _RefType['Product'], variants: Array<_RefType['Product']> } ) | ( Omit<DigitalContent, 'metadata' | 'privateMetadata' | 'productVariant' | 'urls'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, productVariant: _RefType['Product'], urls: Array<_RefType['DigitalContentUrl']> } ) | ( Omit<Fulfillment, 'lines' | 'metadata' | 'privateMetadata' | 'warehouse'> & { lines: Array<_RefType['FulfillmentLine']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, warehouse?: Maybe<_RefType['Warehouse']> } ) | ( Omit<GiftCard, 'app' | 'createdBy' | 'events' | 'metadata' | 'privateMetadata' | 'product' | 'usedBy' | 'user'> & { app: _RefType['App'], createdBy: _RefType['User'], events: Array<_RefType['GiftCardEvent']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product: _RefType['Product'], usedBy: _RefType['User'], user?: Maybe<_RefType['User']> } ) | ( Omit<Invoice, 'metadata' | 'privateMetadata'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<MediaItem, 'file' | 'metadata' | 'privateMetadata'> & { file: _RefType['File'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<Menu, 'items' | 'metadata' | 'privateMetadata'> & { items: Array<_RefType['MenuItem']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<MenuItem, 'category' | 'children' | 'collection' | 'menu' | 'metadata' | 'page' | 'parent' | 'privateMetadata' | 'translation'> & { category?: Maybe<_RefType['Category']>, children?: Maybe<Array<_RefType['MenuItem']>>, collection?: Maybe<_RefType['Collection']>, menu: _RefType['Menu'], metadata: Array<_RefType['MetadataItem']>, page?: Maybe<_RefType['Page']>, parent?: Maybe<_RefType['MenuItem']>, privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['MenuItemTranslation']> } ) | ( Omit<Order, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['OrderLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } ) | ( Omit<OrderLine, 'allocations' | 'digitalContentUrl' | 'metadata' | 'privateMetadata' | 'product' | 'taxClassMetadata' | 'taxClassPrivateMetadata' | 'thumbnail'> & { allocations: Array<_RefType['Allocation']>, digitalContentUrl: _RefType['DigitalContentUrl'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product?: Maybe<_RefType['ConcreteProduct']>, taxClassMetadata: Array<_RefType['MetadataItem']>, taxClassPrivateMetadata: Array<_RefType['MetadataItem']>, thumbnail?: Maybe<_RefType['Image']> } ) | ( Omit<Page, 'attributes' | 'metadata' | 'pageKlass' | 'privateMetadata' | 'translation'> & { attributes: Array<_RefType['Attribute']>, metadata: Array<_RefType['MetadataItem']>, pageKlass: _RefType['PageKlass'], privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['PageTranslation']> } ) | ( Omit<PageKlass, 'attributes' | 'availableAttributes' | 'metadata' | 'privateMetadata'> & { attributes: Array<_RefType['Attribute']>, availableAttributes: _RefType['AttributeConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<Payment, 'checkout' | 'metadata' | 'order' | 'privateMetadata' | 'transactions'> & { checkout: _RefType['Checkout'], metadata: Array<_RefType['MetadataItem']>, order: _RefType['Order'], privateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['Transaction']> } ) | ( Omit<ProductKlass, 'metadata' | 'privateMetadata' | 'productAttributes' | 'productVariantAttributeAssignments' | 'products' | 'variantAttributes'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, productAttributes: Array<_RefType['Attribute']>, productVariantAttributeAssignments: Array<_RefType['ProductAttributeAssignment']>, products: _RefType['ProductNodeConnection'], variantAttributes: Array<_RefType['Attribute']> } ) | ( Omit<Sale, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<_RefType['SaleChannelListing']>, collections: _RefType['CollectionConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductNodeConnection'], translation?: Maybe<_RefType['SaleTranslation']> } ) | ( Omit<ShippingMethod, 'channelListings' | 'excludedProducts' | 'metadata' | 'privateMetadata' | 'translation'> & { channelListings: Array<_RefType['ShippingMethodChannelListing']>, excludedProducts: _RefType['ProductConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['ShippingMethodTranslation']> } ) | ( Omit<ShippingZone, 'channels' | 'metadata' | 'privateMetadata' | 'shippingMethods' | 'warehouses'> & { channels: Array<_RefType['Channel']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethods: Array<_RefType['ShippingMethod']>, warehouses: Array<_RefType['Warehouse']> } ) | ( Omit<TaxClass, 'metadata' | 'privateMetadata'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<TaxConfiguration, 'channel' | 'metadata' | 'privateMetadata'> & { channel: _RefType['Channel'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<TransactionItem, 'events' | 'metadata' | 'order' | 'privateMetadata'> & { events: Array<_RefType['TransactionEvent']>, metadata: Array<_RefType['MetadataItem']>, order?: Maybe<_RefType['Order']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<User, 'avatar' | 'checkout' | 'checkouts' | 'editableGroups' | 'events' | 'giftCards' | 'groups' | 'metadata' | 'orders' | 'privateMetadata' | 'storedPaymentSources' | 'userPermissions'> & { avatar?: Maybe<_RefType['Image']>, checkout?: Maybe<_RefType['Checkout']>, checkouts: _RefType['CheckoutNodeConnection'], editableGroups: Array<_RefType['Group']>, events: Array<_RefType['AccountEvent']>, giftCards: _RefType['GiftCardNodeConnection'], groups: Array<_RefType['Group']>, metadata: Array<_RefType['MetadataItem']>, orders: _RefType['OrderNodeConnection'], privateMetadata: Array<_RefType['MetadataItem']>, storedPaymentSources: Array<_RefType['PaymentSource']>, userPermissions: Array<_RefType['UserPermission']> } ) | ( Omit<Voucher, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<_RefType['VoucherChannelListing']>, collections: _RefType['CollectionConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductNodeConnection'], translation?: Maybe<_RefType['VoucherTranslation']> } ) | ( Omit<Warehouse, 'metadata' | 'privateMetadata' | 'shippingZones'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingZones: _RefType['ShippingZoneConnection'] } );
  OrderBase: ( Omit<CreateOrderd, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<DraftOrderCreated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<DraftOrderDeleted, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<DraftOrderUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderCancelled, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderConfirmed, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderFilterShippingMethods, 'issuingPrincipal' | 'order' | 'recipient' | 'shippingMethods'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'], shippingMethods: Array<_RefType['ShippingMethod']> } ) | ( Omit<OrderFulfilled, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderFullyPaid, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderMetadataUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } ) | ( Omit<OrderUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], order: _RefType['Order'], recipient: _RefType['App'] } );
  PageBase: ( Omit<PageCreated, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], page: _RefType['Page'], recipient: _RefType['App'] } ) | ( Omit<PageDeleted, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], page: _RefType['Page'], recipient: _RefType['App'] } ) | ( Omit<PageUpdated, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], page: _RefType['Page'], recipient: _RefType['App'] } );
  PageKlassBase: ( Omit<PageKlassCreated, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], pageKlass: _RefType['PageKlass'], recipient: _RefType['App'] } ) | ( Omit<PageKlassDeleted, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], pageKlass: _RefType['PageKlass'], recipient: _RefType['App'] } ) | ( Omit<PageKlassUpdated, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], pageKlass: _RefType['PageKlass'], recipient: _RefType['App'] } );
  PaymentBase: ( Omit<PaymentAuthorize, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentCaptureEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentConfirmEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentProcessEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentRefundEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } ) | ( Omit<PaymentVoidEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: _RefType['AppUser'], payment: _RefType['Payment'], recipient: _RefType['App'] } );
  Product: ( Omit<AbstractProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<_RefType['AbstractProduct']>, attribute: _RefType['Attribute'], attributes: Array<_RefType['Attribute']>, category?: Maybe<_RefType['Category']>, channelListings: Array<_RefType['ProductChannelListing']>, collections: Array<_RefType['Collection']>, defaultVariant: _RefType['Product'], digitalContent: _RefType['DigitalContent'], imageById: _RefType['ProductImage'], images: Array<_RefType['ProductImage']>, media: Array<_RefType['ProductMediaItem']>, mediaById: _RefType['ProductMediaItem'], metadata: Array<_RefType['MetadataItem']>, parent: _RefType['AbstractProduct'], privateMetadata: Array<_RefType['MetadataItem']>, productKlass: _RefType['ProductKlass'], stocks: Array<_RefType['Stock']>, thumbnail?: Maybe<_RefType['Image']>, translation?: Maybe<_RefType['ProductTranslation']>, variant: _RefType['Product'], variants: Array<_RefType['Product']> } ) | ( Omit<ConcreteProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<_RefType['AbstractProduct']>, attribute: _RefType['Attribute'], attributes: Array<_RefType['Attribute']>, category?: Maybe<_RefType['Category']>, channelListings: Array<_RefType['ProductChannelListing']>, collections: Array<_RefType['Collection']>, defaultVariant: _RefType['Product'], digitalContent: _RefType['DigitalContent'], imageById: _RefType['ProductImage'], images: Array<_RefType['ProductImage']>, media: Array<_RefType['ProductMediaItem']>, mediaById: _RefType['ProductMediaItem'], metadata: Array<_RefType['MetadataItem']>, parent: _RefType['AbstractProduct'], privateMetadata: Array<_RefType['MetadataItem']>, productKlass: _RefType['ProductKlass'], stocks: Array<_RefType['Stock']>, thumbnail?: Maybe<_RefType['Image']>, translation?: Maybe<_RefType['ProductTranslation']>, variant: _RefType['Product'], variants: Array<_RefType['Product']> } );
  ProductBase: ( Omit<ProductBackInStock, 'category' | 'issuingPrincipal' | 'product' | 'productVariant' | 'recipient' | 'warehouse'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], productVariant: _RefType['Product'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<ProductCreated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], recipient: _RefType['App'] } ) | ( Omit<ProductDeleted, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], recipient: _RefType['App'] } ) | ( Omit<ProductMetadataUpdated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], recipient: _RefType['App'] } ) | ( Omit<ProductOutOfStock, 'category' | 'issuingPrincipal' | 'product' | 'productVariant' | 'recipient' | 'warehouse'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], productVariant: _RefType['Product'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<ProductUpdated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: _RefType['Category'], issuingPrincipal: _RefType['AppUser'], product: _RefType['Product'], recipient: _RefType['App'] } );
  SaleBase: ( Omit<SaleCreated, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], sale: _RefType['Sale'] } ) | ( Omit<SaleDeleted, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], sale: _RefType['Sale'] } ) | ( Omit<SaleToggle, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], sale: _RefType['Sale'] } ) | ( Omit<SaleUpdated, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], sale: _RefType['Sale'] } );
  ShippingPriceBase: ( Omit<ShippingPriceCreated, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethod: _RefType['ShippingMethod'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingPriceDeleted, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethod: _RefType['ShippingMethod'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingPriceUpdated, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingMethod: _RefType['ShippingMethod'], shippingZone: _RefType['ShippingZone'] } );
  ShippingZoneBase: ( Omit<ShippingZoneCreated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingZoneDeleted, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingZoneMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingZone: _RefType['ShippingZone'] } ) | ( Omit<ShippingZoneUpdated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], shippingZone: _RefType['ShippingZone'] } );
  TempoNode: ( Omit<AbstractProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<_RefType['AbstractProduct']>, attribute: _RefType['Attribute'], attributes: Array<_RefType['Attribute']>, category?: Maybe<_RefType['Category']>, channelListings: Array<_RefType['ProductChannelListing']>, collections: Array<_RefType['Collection']>, defaultVariant: _RefType['Product'], digitalContent: _RefType['DigitalContent'], imageById: _RefType['ProductImage'], images: Array<_RefType['ProductImage']>, media: Array<_RefType['ProductMediaItem']>, mediaById: _RefType['ProductMediaItem'], metadata: Array<_RefType['MetadataItem']>, parent: _RefType['AbstractProduct'], privateMetadata: Array<_RefType['MetadataItem']>, productKlass: _RefType['ProductKlass'], stocks: Array<_RefType['Stock']>, thumbnail?: Maybe<_RefType['Image']>, translation?: Maybe<_RefType['ProductTranslation']>, variant: _RefType['Product'], variants: Array<_RefType['Product']> } ) | ( Omit<AccountEvent, 'app' | 'order' | 'orderLine' | 'user'> & { app?: Maybe<_RefType['App']>, order: _RefType['Order'], orderLine: _RefType['OrderLine'], user: _RefType['User'] } ) | ( Address ) | ( Omit<Allocation, 'warehouse'> & { warehouse: _RefType['Warehouse'] } ) | ( Omit<App, 'metadata' | 'privateMetadata' | 'webhooks'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, webhooks: Array<_RefType['Webhook']> } ) | ( Omit<AppExtension, 'app'> & { app: _RefType['App'] } ) | ( AppInstallation ) | ( AsyncWebhookEvent ) | ( Omit<Attribute, 'metadata' | 'privateMetadata' | 'productKlasses' | 'productVariantTypes' | 'translation' | 'values'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, productKlasses: _RefType['ProductKlassNodeConnection'], productVariantTypes: _RefType['ProductKlassNodeConnection'], translation: _RefType['AttributeTranslation'], values: _RefType['ValueConnection'] } ) | ( Omit<AttributeTranslation, 'attribute'> & { attribute: _RefType['Attribute'] } ) | ( Omit<Category, 'backgroundImage' | 'metadata' | 'parent' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<_RefType['Image']>, metadata: Array<_RefType['MetadataItem']>, parent: _RefType['Category'], privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductNodeConnection'], translation?: Maybe<_RefType['CategoryTranslation']> } ) | ( Omit<CategoryTranslation, 'category'> & { category: _RefType['Category'] } ) | ( Omit<Channel, 'stockSettings' | 'warehouses'> & { stockSettings: _RefType['StockSettings'], warehouses: Array<_RefType['Warehouse']> } ) | ( Omit<Checkout, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['CheckoutLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } ) | ( Omit<CheckoutLine, 'metadata' | 'privateMetadata' | 'product'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product: _RefType['ConcreteProduct'] } ) | ( Omit<Collection, 'backgroundImage' | 'channelListings' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<_RefType['Image']>, channelListings: Array<_RefType['CollectionChannelListing']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductConnection'], translation?: Maybe<_RefType['CollectionTranslation']> } ) | ( Omit<CollectionChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( Omit<CollectionTranslation, 'collection'> & { collection: _RefType['Collection'] } ) | ( Omit<ConcreteProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<_RefType['AbstractProduct']>, attribute: _RefType['Attribute'], attributes: Array<_RefType['Attribute']>, category?: Maybe<_RefType['Category']>, channelListings: Array<_RefType['ProductChannelListing']>, collections: Array<_RefType['Collection']>, defaultVariant: _RefType['Product'], digitalContent: _RefType['DigitalContent'], imageById: _RefType['ProductImage'], images: Array<_RefType['ProductImage']>, media: Array<_RefType['ProductMediaItem']>, mediaById: _RefType['ProductMediaItem'], metadata: Array<_RefType['MetadataItem']>, parent: _RefType['AbstractProduct'], privateMetadata: Array<_RefType['MetadataItem']>, productKlass: _RefType['ProductKlass'], stocks: Array<_RefType['Stock']>, thumbnail?: Maybe<_RefType['Image']>, translation?: Maybe<_RefType['ProductTranslation']>, variant: _RefType['Product'], variants: Array<_RefType['Product']> } ) | ( Omit<DigitalContent, 'metadata' | 'privateMetadata' | 'productVariant' | 'urls'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, productVariant: _RefType['Product'], urls: Array<_RefType['DigitalContentUrl']> } ) | ( Omit<DigitalContentUrl, 'content'> & { content: _RefType['DigitalContent'] } ) | ( EventDelivery ) | ( Omit<ExportEvent, 'app' | 'user'> & { app?: Maybe<_RefType['App']>, user?: Maybe<_RefType['User']> } ) | ( Omit<ExportFile, 'app' | 'events' | 'user'> & { app: _RefType['App'], events: Array<_RefType['ExportEvent']>, user: _RefType['User'] } ) | ( Omit<Fulfillment, 'lines' | 'metadata' | 'privateMetadata' | 'warehouse'> & { lines: Array<_RefType['FulfillmentLine']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, warehouse?: Maybe<_RefType['Warehouse']> } ) | ( Omit<FulfillmentLine, 'orderLine'> & { orderLine: _RefType['OrderLine'] } ) | ( Omit<GiftCard, 'app' | 'createdBy' | 'events' | 'metadata' | 'privateMetadata' | 'product' | 'usedBy' | 'user'> & { app: _RefType['App'], createdBy: _RefType['User'], events: Array<_RefType['GiftCardEvent']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product: _RefType['Product'], usedBy: _RefType['User'], user?: Maybe<_RefType['User']> } ) | ( Omit<GiftCardEvent, 'app' | 'user'> & { app: _RefType['App'], user: _RefType['User'] } ) | ( GiftCardTag ) | ( Omit<Group, 'users'> & { users: Array<_RefType['User']> } ) | ( Omit<Invoice, 'metadata' | 'privateMetadata'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<MediaItem, 'file' | 'metadata' | 'privateMetadata'> & { file: _RefType['File'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<Menu, 'items' | 'metadata' | 'privateMetadata'> & { items: Array<_RefType['MenuItem']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<MenuItem, 'category' | 'children' | 'collection' | 'menu' | 'metadata' | 'page' | 'parent' | 'privateMetadata' | 'translation'> & { category?: Maybe<_RefType['Category']>, children?: Maybe<Array<_RefType['MenuItem']>>, collection?: Maybe<_RefType['Collection']>, menu: _RefType['Menu'], metadata: Array<_RefType['MetadataItem']>, page?: Maybe<_RefType['Page']>, parent?: Maybe<_RefType['MenuItem']>, privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['MenuItemTranslation']> } ) | ( Omit<MenuItemTranslation, 'menuItem'> & { menuItem: _RefType['MenuItem'] } ) | ( Omit<Order, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<_RefType['Warehouse']>, availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, channel: _RefType['Channel'], events: Array<_RefType['OrderEvent']>, fulfillmentMethod?: Maybe<_RefType['FulfillmentMethod']>, fulfillments: Array<_RefType['Fulfillment']>, giftCards: Array<_RefType['GiftCard']>, invoices: Array<_RefType['Invoice']>, lines: Array<_RefType['OrderLine']>, metadata: Array<_RefType['MetadataItem']>, payments: Array<_RefType['Payment']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethod?: Maybe<_RefType['ShippingMethod']>, shippingMethods: Array<_RefType['ShippingMethod']>, shippingTaxClassMetadata: Array<_RefType['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['TransactionItem']>, user?: Maybe<_RefType['User']>, voucher?: Maybe<_RefType['Voucher']> } ) | ( OrderDiscount ) | ( Omit<OrderEvent, 'app' | 'fulfilledItems' | 'lines' | 'relatedOrder' | 'user' | 'warehouse'> & { app: _RefType['App'], fulfilledItems: Array<_RefType['FulfillmentLine']>, lines: Array<_RefType['OrderEventOrderLineObject']>, relatedOrder: _RefType['Order'], user: _RefType['User'], warehouse: _RefType['Warehouse'] } ) | ( Omit<OrderLine, 'allocations' | 'digitalContentUrl' | 'metadata' | 'privateMetadata' | 'product' | 'taxClassMetadata' | 'taxClassPrivateMetadata' | 'thumbnail'> & { allocations: Array<_RefType['Allocation']>, digitalContentUrl: _RefType['DigitalContentUrl'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, product?: Maybe<_RefType['ConcreteProduct']>, taxClassMetadata: Array<_RefType['MetadataItem']>, taxClassPrivateMetadata: Array<_RefType['MetadataItem']>, thumbnail?: Maybe<_RefType['Image']> } ) | ( Omit<Page, 'attributes' | 'metadata' | 'pageKlass' | 'privateMetadata' | 'translation'> & { attributes: Array<_RefType['Attribute']>, metadata: Array<_RefType['MetadataItem']>, pageKlass: _RefType['PageKlass'], privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['PageTranslation']> } ) | ( Omit<PageKlass, 'attributes' | 'availableAttributes' | 'metadata' | 'privateMetadata'> & { attributes: Array<_RefType['Attribute']>, availableAttributes: _RefType['AttributeConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<PageTranslation, 'page'> & { page: _RefType['Page'] } ) | ( Omit<Payment, 'checkout' | 'metadata' | 'order' | 'privateMetadata' | 'transactions'> & { checkout: _RefType['Checkout'], metadata: Array<_RefType['MetadataItem']>, order: _RefType['Order'], privateMetadata: Array<_RefType['MetadataItem']>, transactions: Array<_RefType['Transaction']> } ) | ( PointOfContact ) | ( Omit<ProductChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( Omit<ProductImage, 'url'> & { url?: Maybe<_RefType['Image']> } ) | ( Omit<ProductKlass, 'metadata' | 'privateMetadata' | 'productAttributes' | 'productVariantAttributeAssignments' | 'products' | 'variantAttributes'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, productAttributes: Array<_RefType['Attribute']>, productVariantAttributeAssignments: Array<_RefType['ProductAttributeAssignment']>, products: _RefType['ProductNodeConnection'], variantAttributes: Array<_RefType['Attribute']> } ) | ( Omit<ProductMediaItem, 'mediaItem'> & { mediaItem: _RefType['MediaItem'] } ) | ( Omit<ProductTranslation, 'product' | 'values'> & { product: _RefType['Product'], values: Array<_RefType['ValueTranslation']> } ) | ( Omit<Sale, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<_RefType['SaleChannelListing']>, collections: _RefType['CollectionConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductNodeConnection'], translation?: Maybe<_RefType['SaleTranslation']> } ) | ( Omit<SaleChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( Omit<SaleTranslation, 'sale'> & { sale: _RefType['Sale'] } ) | ( Omit<ShippingMethod, 'channelListings' | 'excludedProducts' | 'metadata' | 'privateMetadata' | 'translation'> & { channelListings: Array<_RefType['ShippingMethodChannelListing']>, excludedProducts: _RefType['ProductConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, translation?: Maybe<_RefType['ShippingMethodTranslation']> } ) | ( Omit<ShippingMethodChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( ShippingMethodPostalCodeRule ) | ( Omit<ShippingMethodTranslation, 'shippingMethod'> & { shippingMethod: _RefType['ShippingMethod'] } ) | ( Omit<ShippingZone, 'channels' | 'metadata' | 'privateMetadata' | 'shippingMethods' | 'warehouses'> & { channels: Array<_RefType['Channel']>, metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingMethods: Array<_RefType['ShippingMethod']>, warehouses: Array<_RefType['Warehouse']> } ) | ( Omit<Site, 'availableShippingMethods' | 'logo' | 'staffNotificationRecipients'> & { availableShippingMethods?: Maybe<Array<_RefType['ShippingMethod']>>, logo?: Maybe<_RefType['Image']>, staffNotificationRecipients?: Maybe<Array<_RefType['StaffNotificationRecipient']>> } ) | ( SiteTranslation ) | ( Omit<StaffNotificationRecipient, 'user'> & { user?: Maybe<_RefType['User']> } ) | ( Omit<Stock, 'productVariant' | 'warehouse'> & { productVariant: _RefType['Product'], warehouse: _RefType['Warehouse'] } ) | ( SyncWebhookEvent ) | ( Omit<TaxClass, 'metadata' | 'privateMetadata'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<TaxConfiguration, 'channel' | 'metadata' | 'privateMetadata'> & { channel: _RefType['Channel'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( TaxConfigurationPerCountry ) | ( Omit<Transaction, 'payment'> & { payment: _RefType['Payment'] } ) | ( TransactionEvent ) | ( Omit<TransactionItem, 'events' | 'metadata' | 'order' | 'privateMetadata'> & { events: Array<_RefType['TransactionEvent']>, metadata: Array<_RefType['MetadataItem']>, order?: Maybe<_RefType['Order']>, privateMetadata: Array<_RefType['MetadataItem']> } ) | ( Omit<User, 'avatar' | 'checkout' | 'checkouts' | 'editableGroups' | 'events' | 'giftCards' | 'groups' | 'metadata' | 'orders' | 'privateMetadata' | 'storedPaymentSources' | 'userPermissions'> & { avatar?: Maybe<_RefType['Image']>, checkout?: Maybe<_RefType['Checkout']>, checkouts: _RefType['CheckoutNodeConnection'], editableGroups: Array<_RefType['Group']>, events: Array<_RefType['AccountEvent']>, giftCards: _RefType['GiftCardNodeConnection'], groups: Array<_RefType['Group']>, metadata: Array<_RefType['MetadataItem']>, orders: _RefType['OrderNodeConnection'], privateMetadata: Array<_RefType['MetadataItem']>, storedPaymentSources: Array<_RefType['PaymentSource']>, userPermissions: Array<_RefType['UserPermission']> } ) | ( Omit<Value, 'file' | 'translation'> & { file?: Maybe<_RefType['File']>, translation?: Maybe<_RefType['ValueTranslation']> } ) | ( Omit<ValueTranslation, 'attribute' | 'value'> & { attribute: _RefType['Attribute'], value: _RefType['Value'] } ) | ( Omit<Voucher, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<_RefType['VoucherChannelListing']>, collections: _RefType['CollectionConnection'], metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, products: _RefType['ProductNodeConnection'], translation?: Maybe<_RefType['VoucherTranslation']> } ) | ( Omit<VoucherChannelListing, 'channel'> & { channel: _RefType['Channel'] } ) | ( Omit<VoucherTranslation, 'voucher'> & { voucher: _RefType['Voucher'] } ) | ( Omit<Warehouse, 'metadata' | 'privateMetadata' | 'shippingZones'> & { metadata: Array<_RefType['MetadataItem']>, privateMetadata: Array<_RefType['MetadataItem']>, shippingZones: _RefType['ShippingZoneConnection'] } ) | ( Omit<Webhook, 'app'> & { app: _RefType['App'] } );
  TranslationBase: ( Omit<TranslationCreated, 'issuingPrincipal' | 'recipient' | 'translation'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], translation: _RefType['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] } ) | ( Omit<TranslationUpdated, 'issuingPrincipal' | 'recipient' | 'translation'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], translation: _RefType['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] } );
  UserBase: ( Omit<CustomerCreated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<CustomerMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<CustomerUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<StaffCreated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<StaffDeleted, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } ) | ( Omit<StaffUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], user: _RefType['User'] } );
  ValueBase: ( Omit<ValueCreated, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], value: _RefType['Value'] } ) | ( Omit<ValueDeleted, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], value: _RefType['Value'] } ) | ( Omit<ValueUpdated, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], value: _RefType['Value'] } );
  VoucherBase: ( Omit<VoucherCreated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], voucher: _RefType['Voucher'] } ) | ( Omit<VoucherDeleted, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], voucher: _RefType['Voucher'] } ) | ( Omit<VoucherMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], voucher: _RefType['Voucher'] } ) | ( Omit<VoucherUpdated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], voucher: _RefType['Voucher'] } );
  WarehouseBase: ( Omit<WarehouseCreated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<WarehouseDeleted, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<WarehouseMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } ) | ( Omit<WarehouseUpdated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: _RefType['AppUser'], recipient: _RefType['App'], warehouse: _RefType['Warehouse'] } );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AbstractOrder: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AbstractOrder']>;
  AbstractProduct: ResolverTypeWrapper<Omit<AbstractProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<ResolversTypes['AbstractProduct']>, attribute: ResolversTypes['Attribute'], attributes: Array<ResolversTypes['Attribute']>, category?: Maybe<ResolversTypes['Category']>, channelListings: Array<ResolversTypes['ProductChannelListing']>, collections: Array<ResolversTypes['Collection']>, defaultVariant: ResolversTypes['Product'], digitalContent: ResolversTypes['DigitalContent'], imageById: ResolversTypes['ProductImage'], images: Array<ResolversTypes['ProductImage']>, media: Array<ResolversTypes['ProductMediaItem']>, mediaById: ResolversTypes['ProductMediaItem'], metadata: Array<ResolversTypes['MetadataItem']>, parent: ResolversTypes['AbstractProduct'], privateMetadata: Array<ResolversTypes['MetadataItem']>, productKlass: ResolversTypes['ProductKlass'], stocks: Array<ResolversTypes['Stock']>, thumbnail?: Maybe<ResolversTypes['Image']>, translation?: Maybe<ResolversTypes['ProductTranslation']>, variant: ResolversTypes['Product'], variants: Array<ResolversTypes['Product']> }>;
  AccountError: ResolverTypeWrapper<AccountError>;
  AccountErrorCode: AccountErrorCode;
  AccountEvent: ResolverTypeWrapper<Omit<AccountEvent, 'app' | 'order' | 'orderLine' | 'user'> & { app?: Maybe<ResolversTypes['App']>, order: ResolversTypes['Order'], orderLine: ResolversTypes['OrderLine'], user: ResolversTypes['User'] }>;
  AccountEventType: AccountEventType;
  Address: ResolverTypeWrapper<Address>;
  AddressBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AddressBase']>;
  AddressCreated: ResolverTypeWrapper<Omit<AddressCreated, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AddressDeleted: ResolverTypeWrapper<Omit<AddressDeleted, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AddressEvent: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AddressEvent']>;
  AddressMutationResult: ResolverTypeWrapper<Omit<AddressMutationResult, 'errors' | 'user'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, user: ResolversTypes['User'] }>;
  AddressType: AddressType;
  AddressUpdateInput: AddressUpdateInput;
  AddressUpdated: ResolverTypeWrapper<Omit<AddressUpdated, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AddressValidationData: ResolverTypeWrapper<AddressValidationData>;
  Allocation: ResolverTypeWrapper<Omit<Allocation, 'warehouse'> & { warehouse: ResolversTypes['Warehouse'] }>;
  AllocationStrategy: AllocationStrategy;
  App: ResolverTypeWrapper<Omit<App, 'metadata' | 'privateMetadata' | 'webhooks'> & { metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, webhooks: Array<ResolversTypes['Webhook']> }>;
  AppBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AppBase']>;
  AppConnection: ResolverTypeWrapper<Omit<AppConnection, 'edges'> & { edges: Array<ResolversTypes['AppEdge']> }>;
  AppDeleted: ResolverTypeWrapper<Omit<AppDeleted, 'app' | 'issuingPrincipal' | 'recipient'> & { app: ResolversTypes['App'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AppEdge: ResolverTypeWrapper<Omit<AppEdge, 'node'> & { node: ResolversTypes['App'] }>;
  AppError: ResolverTypeWrapper<AppError>;
  AppErrorCode: AppErrorCode;
  AppExtension: ResolverTypeWrapper<Omit<AppExtension, 'app'> & { app: ResolversTypes['App'] }>;
  AppExtensionConnection: ResolverTypeWrapper<AppExtensionConnection>;
  AppExtensionEdge: ResolverTypeWrapper<AppExtensionEdge>;
  AppExtensionFilter: AppExtensionFilter;
  AppExtensionMount: AppExtensionMount;
  AppExtensionTarget: AppExtensionTarget;
  AppFilter: AppFilter;
  AppInput: AppInput;
  AppInstallInput: AppInstallInput;
  AppInstallation: ResolverTypeWrapper<AppInstallation>;
  AppInstallationMutationResult: ResolverTypeWrapper<Omit<AppInstallationMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  AppInstalled: ResolverTypeWrapper<Omit<AppInstalled, 'app' | 'issuingPrincipal' | 'recipient'> & { app: ResolversTypes['App'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AppManifestExtension: ResolverTypeWrapper<AppManifestExtension>;
  AppManifestWebhook: ResolverTypeWrapper<AppManifestWebhook>;
  AppMutationResult: ResolverTypeWrapper<Omit<AppMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['App'] }>;
  AppOrdering: AppOrdering;
  AppStatusChanged: ResolverTypeWrapper<Omit<AppStatusChanged, 'app' | 'issuingPrincipal' | 'recipient'> & { app: ResolversTypes['App'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AppToken: ResolverTypeWrapper<AppToken>;
  AppTokenInput: AppTokenInput;
  AppTokenMutationResult: ResolverTypeWrapper<Omit<AppTokenMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  AppType: AppType;
  AppUpdated: ResolverTypeWrapper<Omit<AppUpdated, 'app' | 'issuingPrincipal' | 'recipient'> & { app: ResolversTypes['App'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AppUser: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AppUser']>;
  AreaUnit: AreaUnit;
  AsyncWebhookEvent: ResolverTypeWrapper<AsyncWebhookEvent>;
  AsyncWebhookEventType: AsyncWebhookEventType;
  Attribute: ResolverTypeWrapper<Omit<Attribute, 'metadata' | 'privateMetadata' | 'productKlasses' | 'productVariantTypes' | 'translation' | 'values'> & { metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, productKlasses: ResolversTypes['ProductKlassNodeConnection'], productVariantTypes: ResolversTypes['ProductKlassNodeConnection'], translation: ResolversTypes['AttributeTranslation'], values: ResolversTypes['ValueConnection'] }>;
  AttributeBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AttributeBase']>;
  AttributeChoicesOrdering: AttributeChoicesOrdering;
  AttributeChoicesOrderingInput: AttributeChoicesOrderingInput;
  AttributeConnection: ResolverTypeWrapper<Omit<AttributeConnection, 'edges'> & { edges: Array<ResolversTypes['AttributeEdge']> }>;
  AttributeCreated: ResolverTypeWrapper<Omit<AttributeCreated, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: ResolversTypes['Attribute'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AttributeCreationInput: AttributeCreationInput;
  AttributeDeleted: ResolverTypeWrapper<Omit<AttributeDeleted, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: ResolversTypes['Attribute'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AttributeEdge: ResolverTypeWrapper<Omit<AttributeEdge, 'node'> & { node: ResolversTypes['Attribute'] }>;
  AttributeEntityType: AttributeEntityType;
  AttributeErrorCode: AttributeErrorCode;
  AttributeFilter: AttributeFilter;
  AttributeInput: AttributeInput;
  AttributeInputType: AttributeInputType;
  AttributeMutationResult: ResolverTypeWrapper<Omit<AttributeMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Attribute'] }>;
  AttributeNodeConnection: ResolverTypeWrapper<AttributeNodeConnection>;
  AttributeNodeEdge: ResolverTypeWrapper<Omit<AttributeNodeEdge, 'node'> & { node: ResolversTypes['Attribute'] }>;
  AttributeOrdering: AttributeOrdering;
  AttributeOrderingInput: AttributeOrderingInput;
  AttributeTranslation: ResolverTypeWrapper<Omit<AttributeTranslation, 'attribute'> & { attribute: ResolversTypes['Attribute'] }>;
  AttributeType: AttributeType;
  AttributeUpdateInput: AttributeUpdateInput;
  AttributeUpdated: ResolverTypeWrapper<Omit<AttributeUpdated, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: ResolversTypes['Attribute'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  AuthInput: AuthInput;
  AuthPluginInput: AuthPluginInput;
  AuthPluginMutationResult: ResolverTypeWrapper<Omit<AuthPluginMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  BaseMutationResult: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseMutationResult']>;
  BasePricingInfo: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BasePricingInfo']>;
  BaseTranslation: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseTranslation']>;
  BoolMutationResult: ResolverTypeWrapper<Omit<BoolMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BulkProductError: ResolverTypeWrapper<BulkProductError>;
  BulkStockError: ResolverTypeWrapper<BulkStockError>;
  BulkValueInput: BulkValueInput;
  CalculateTaxes: ResolverTypeWrapper<Omit<CalculateTaxes, 'issuingPrincipal' | 'recipient' | 'taxBase'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], taxBase: ResolversTypes['TaxableObject'] }>;
  CardInput: CardInput;
  CatalogueInput: CatalogueInput;
  Category: ResolverTypeWrapper<Omit<Category, 'backgroundImage' | 'metadata' | 'parent' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<ResolversTypes['Image']>, metadata: Array<ResolversTypes['MetadataItem']>, parent: ResolversTypes['Category'], privateMetadata: Array<ResolversTypes['MetadataItem']>, products: ResolversTypes['ProductNodeConnection'], translation?: Maybe<ResolversTypes['CategoryTranslation']> }>;
  CategoryBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CategoryBase']>;
  CategoryConnection: ResolverTypeWrapper<Omit<CategoryConnection, 'edges'> & { edges: Array<ResolversTypes['CategoryEdge']> }>;
  CategoryCreated: ResolverTypeWrapper<Omit<CategoryCreated, 'category' | 'issuingPrincipal' | 'recipient'> & { category: ResolversTypes['Category'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  CategoryDeleted: ResolverTypeWrapper<Omit<CategoryDeleted, 'category' | 'issuingPrincipal' | 'recipient'> & { category: ResolversTypes['Category'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  CategoryEdge: ResolverTypeWrapper<Omit<CategoryEdge, 'node'> & { node: ResolversTypes['Category'] }>;
  CategoryFilter: CategoryFilter;
  CategoryInput: CategoryInput;
  CategoryMutationResult: ResolverTypeWrapper<Omit<CategoryMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Category'] }>;
  CategoryNodeConnection: ResolverTypeWrapper<CategoryNodeConnection>;
  CategoryNodeEdge: ResolverTypeWrapper<Omit<CategoryNodeEdge, 'node'> & { node: ResolversTypes['Category'] }>;
  CategoryOrdering: CategoryOrdering;
  CategoryOrderingInput: CategoryOrderingInput;
  CategoryTranslation: ResolverTypeWrapper<Omit<CategoryTranslation, 'category'> & { category: ResolversTypes['Category'] }>;
  CategoryUpdated: ResolverTypeWrapper<Omit<CategoryUpdated, 'category' | 'issuingPrincipal' | 'recipient'> & { category: ResolversTypes['Category'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  Channel: ResolverTypeWrapper<Omit<Channel, 'stockSettings' | 'warehouses'> & { stockSettings: ResolversTypes['StockSettings'], warehouses: Array<ResolversTypes['Warehouse']> }>;
  ChannelBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ChannelBase']>;
  ChannelCreated: ResolverTypeWrapper<Omit<ChannelCreated, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: ResolversTypes['Channel'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  ChannelCreationInput: ChannelCreationInput;
  ChannelDeleteInput: ChannelDeleteInput;
  ChannelDeleted: ResolverTypeWrapper<Omit<ChannelDeleted, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: ResolversTypes['Channel'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  ChannelError: ResolverTypeWrapper<ChannelError>;
  ChannelErrorCode: ChannelErrorCode;
  ChannelMutationResult: ResolverTypeWrapper<Omit<ChannelMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Channel'] }>;
  ChannelReorderWarehousesMutationResult: ResolverTypeWrapper<Omit<ChannelReorderWarehousesMutationResult, 'channel' | 'errors'> & { channel: ResolversTypes['Channel'], errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  ChannelStatusChanged: ResolverTypeWrapper<Omit<ChannelStatusChanged, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: ResolversTypes['Channel'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  ChannelUpdateInput: ChannelUpdateInput;
  ChannelUpdated: ResolverTypeWrapper<Omit<ChannelUpdated, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: ResolversTypes['Channel'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  ChargeStatus: ChargeStatus;
  Checkout: ResolverTypeWrapper<Omit<Checkout, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<ResolversTypes['Warehouse']>, availableShippingMethods?: Maybe<Array<ResolversTypes['ShippingMethod']>>, channel: ResolversTypes['Channel'], events: Array<ResolversTypes['OrderEvent']>, fulfillmentMethod?: Maybe<ResolversTypes['FulfillmentMethod']>, fulfillments: Array<ResolversTypes['Fulfillment']>, giftCards: Array<ResolversTypes['GiftCard']>, invoices: Array<ResolversTypes['Invoice']>, lines: Array<ResolversTypes['CheckoutLine']>, metadata: Array<ResolversTypes['MetadataItem']>, payments: Array<ResolversTypes['Payment']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, shippingMethod?: Maybe<ResolversTypes['ShippingMethod']>, shippingMethods: Array<ResolversTypes['ShippingMethod']>, shippingTaxClassMetadata: Array<ResolversTypes['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<ResolversTypes['MetadataItem']>, transactions: Array<ResolversTypes['TransactionItem']>, user?: Maybe<ResolversTypes['User']>, voucher?: Maybe<ResolversTypes['Voucher']> }>;
  CheckoutAddressValidationRules: CheckoutAddressValidationRules;
  CheckoutBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CheckoutBase']>;
  CheckoutCompleteMutationResult: ResolverTypeWrapper<Omit<CheckoutCompleteMutationResult, 'errors' | 'order'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, order: ResolversTypes['Order'] }>;
  CheckoutConnection: ResolverTypeWrapper<Omit<CheckoutConnection, 'edges'> & { edges: Array<ResolversTypes['CheckoutEdge']> }>;
  CheckoutContactInfoUpdateInput: CheckoutContactInfoUpdateInput;
  CheckoutCreated: ResolverTypeWrapper<Omit<CheckoutCreated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: ResolversTypes['Checkout'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  CheckoutCreationInput: CheckoutCreationInput;
  CheckoutEdge: ResolverTypeWrapper<Omit<CheckoutEdge, 'node'> & { node: ResolversTypes['Checkout'] }>;
  CheckoutError: ResolverTypeWrapper<CheckoutError>;
  CheckoutErrorCode: CheckoutErrorCode;
  CheckoutFilter: CheckoutFilter;
  CheckoutFilterShippingMethods: ResolverTypeWrapper<Omit<CheckoutFilterShippingMethods, 'checkout' | 'issuingPrincipal' | 'recipient' | 'shippingMethods'> & { checkout: ResolversTypes['Checkout'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], shippingMethods: Array<ResolversTypes['ShippingMethod']> }>;
  CheckoutLine: ResolverTypeWrapper<Omit<CheckoutLine, 'metadata' | 'privateMetadata' | 'product'> & { metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, product: ResolversTypes['ConcreteProduct'] }>;
  CheckoutLineConnection: ResolverTypeWrapper<Omit<CheckoutLineConnection, 'edges'> & { edges: Array<ResolversTypes['CheckoutLineEdge']> }>;
  CheckoutLineEdge: ResolverTypeWrapper<Omit<CheckoutLineEdge, 'node'> & { node: ResolversTypes['CheckoutLine'] }>;
  CheckoutLineInput: CheckoutLineInput;
  CheckoutLineUpdateInput: CheckoutLineUpdateInput;
  CheckoutMetadataUpdated: ResolverTypeWrapper<Omit<CheckoutMetadataUpdated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: ResolversTypes['Checkout'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  CheckoutMutationResult: ResolverTypeWrapper<Omit<CheckoutMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Checkout'] }>;
  CheckoutNodeConnection: ResolverTypeWrapper<Omit<CheckoutNodeConnection, 'edges'> & { edges: Array<ResolversTypes['CheckoutNodeEdge']> }>;
  CheckoutNodeEdge: ResolverTypeWrapper<Omit<CheckoutNodeEdge, 'node'> & { node: ResolversTypes['Checkout'] }>;
  CheckoutOptionalMutationResult: ResolverTypeWrapper<Omit<CheckoutOptionalMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result?: Maybe<ResolversTypes['Checkout']> }>;
  CheckoutOrdering: CheckoutOrdering;
  CheckoutOrderingInput: CheckoutOrderingInput;
  CheckoutPaymentMutationResult: ResolverTypeWrapper<Omit<CheckoutPaymentMutationResult, 'checkout' | 'errors' | 'payment'> & { checkout: ResolversTypes['Checkout'], errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, payment: ResolversTypes['Payment'] }>;
  CheckoutPointOfContactInput: CheckoutPointOfContactInput;
  CheckoutUpdated: ResolverTypeWrapper<Omit<CheckoutUpdated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: ResolversTypes['Checkout'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  CheckoutValidationRules: CheckoutValidationRules;
  ChoiceValue: ResolverTypeWrapper<ChoiceValue>;
  Collection: ResolverTypeWrapper<Omit<Collection, 'backgroundImage' | 'channelListings' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<ResolversTypes['Image']>, channelListings: Array<ResolversTypes['CollectionChannelListing']>, metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, products: ResolversTypes['ProductConnection'], translation?: Maybe<ResolversTypes['CollectionTranslation']> }>;
  CollectionBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CollectionBase']>;
  CollectionChannelListing: ResolverTypeWrapper<Omit<CollectionChannelListing, 'channel'> & { channel: ResolversTypes['Channel'] }>;
  CollectionChannelListingError: ResolverTypeWrapper<CollectionChannelListingError>;
  CollectionChannelListingMutationResult: ResolverTypeWrapper<Omit<CollectionChannelListingMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['CollectionChannelListing'] }>;
  CollectionChannelListingUpdateInput: CollectionChannelListingUpdateInput;
  CollectionConnection: ResolverTypeWrapper<Omit<CollectionConnection, 'edges'> & { edges: Array<ResolversTypes['CollectionEdge']> }>;
  CollectionCreated: ResolverTypeWrapper<Omit<CollectionCreated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: ResolversTypes['Collection'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  CollectionCreationInput: CollectionCreationInput;
  CollectionDeleted: ResolverTypeWrapper<Omit<CollectionDeleted, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: ResolversTypes['Collection'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  CollectionEdge: ResolverTypeWrapper<Omit<CollectionEdge, 'node'> & { node: ResolversTypes['Collection'] }>;
  CollectionErrorCode: CollectionErrorCode;
  CollectionFilter: CollectionFilter;
  CollectionInput: CollectionInput;
  CollectionMetadataUpdated: ResolverTypeWrapper<Omit<CollectionMetadataUpdated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: ResolversTypes['Collection'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  CollectionMutationResult: ResolverTypeWrapper<Omit<CollectionMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Collection'] }>;
  CollectionOrdering: CollectionOrdering;
  CollectionOrderingInput: CollectionOrderingInput;
  CollectionPublished: CollectionPublished;
  CollectionTranslation: ResolverTypeWrapper<Omit<CollectionTranslation, 'collection'> & { collection: ResolversTypes['Collection'] }>;
  CollectionUpdated: ResolverTypeWrapper<Omit<CollectionUpdated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: ResolversTypes['Collection'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  ConcreteProduct: ResolverTypeWrapper<Omit<ConcreteProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<ResolversTypes['AbstractProduct']>, attribute: ResolversTypes['Attribute'], attributes: Array<ResolversTypes['Attribute']>, category?: Maybe<ResolversTypes['Category']>, channelListings: Array<ResolversTypes['ProductChannelListing']>, collections: Array<ResolversTypes['Collection']>, defaultVariant: ResolversTypes['Product'], digitalContent: ResolversTypes['DigitalContent'], imageById: ResolversTypes['ProductImage'], images: Array<ResolversTypes['ProductImage']>, media: Array<ResolversTypes['ProductMediaItem']>, mediaById: ResolversTypes['ProductMediaItem'], metadata: Array<ResolversTypes['MetadataItem']>, parent: ResolversTypes['AbstractProduct'], privateMetadata: Array<ResolversTypes['MetadataItem']>, productKlass: ResolversTypes['ProductKlass'], stocks: Array<ResolversTypes['Stock']>, thumbnail?: Maybe<ResolversTypes['Image']>, translation?: Maybe<ResolversTypes['ProductTranslation']>, variant: ResolversTypes['Product'], variants: Array<ResolversTypes['Product']> }>;
  ConfigurationItem: ResolverTypeWrapper<ConfigurationItem>;
  ConfigurationItemInput: ConfigurationItemInput;
  ConfigurationTypeField: ConfigurationTypeField;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  Country: ResolverTypeWrapper<Country>;
  CountryCode: CountryCode;
  CountryFilter: CountryFilter;
  CountryRateInput: CountryRateInput;
  CountryRateUpdateInput: CountryRateUpdateInput;
  CreateOrderd: ResolverTypeWrapper<Omit<CreateOrderd, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  CreditCard: ResolverTypeWrapper<CreditCard>;
  Currency: Currency;
  CustomerCreated: ResolverTypeWrapper<Omit<CustomerCreated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], user: ResolversTypes['User'] }>;
  CustomerFilter: CustomerFilter;
  CustomerMetadataUpdated: ResolverTypeWrapper<Omit<CustomerMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], user: ResolversTypes['User'] }>;
  CustomerUpdated: ResolverTypeWrapper<Omit<CustomerUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], user: ResolversTypes['User'] }>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateRangeInput: DateRangeInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeRangeInput: DateTimeRangeInput;
  DigitalContent: ResolverTypeWrapper<Omit<DigitalContent, 'metadata' | 'privateMetadata' | 'productVariant' | 'urls'> & { metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, productVariant: ResolversTypes['Product'], urls: Array<ResolversTypes['DigitalContentUrl']> }>;
  DigitalContentConnection: ResolverTypeWrapper<Omit<DigitalContentConnection, 'edges'> & { edges: Array<ResolversTypes['DigitalContentEdge']> }>;
  DigitalContentEdge: ResolverTypeWrapper<Omit<DigitalContentEdge, 'node'> & { node: ResolversTypes['DigitalContent'] }>;
  DigitalContentInput: DigitalContentInput;
  DigitalContentMutationResult: ResolverTypeWrapper<Omit<DigitalContentMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['DigitalContent'] }>;
  DigitalContentUploadInput: DigitalContentUploadInput;
  DigitalContentUrl: ResolverTypeWrapper<Omit<DigitalContentUrl, 'content'> & { content: ResolversTypes['DigitalContent'] }>;
  DigitalContentUrlCreationInput: DigitalContentUrlCreationInput;
  DiscountError: ResolverTypeWrapper<DiscountError>;
  DiscountErrorCode: DiscountErrorCode;
  DiscountStatus: DiscountStatus;
  DiscountValueType: DiscountValueType;
  DistanceUnit: DistanceUnit;
  DraftOrderCreated: ResolverTypeWrapper<Omit<DraftOrderCreated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  DraftOrderCreationInput: DraftOrderCreationInput;
  DraftOrderDeleted: ResolverTypeWrapper<Omit<DraftOrderDeleted, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  DraftOrderInput: DraftOrderInput;
  DraftOrderUpdated: ResolverTypeWrapper<Omit<DraftOrderUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  Error: ResolverTypeWrapper<Error>;
  ErrorInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ErrorInterface']>;
  Event: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Event']>;
  EventDelivery: ResolverTypeWrapper<EventDelivery>;
  EventDeliveryConnection: ResolverTypeWrapper<EventDeliveryConnection>;
  EventDeliveryEdge: ResolverTypeWrapper<EventDeliveryEdge>;
  EventDeliveryFilter: EventDeliveryFilter;
  EventDeliveryMutationResult: ResolverTypeWrapper<Omit<EventDeliveryMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  EventDeliveryOrdering: EventDeliveryOrdering;
  EventDeliveryOrderingInput: EventDeliveryOrderingInput;
  EventDeliveryStatus: EventDeliveryStatus;
  ExportErrorCode: ExportErrorCode;
  ExportEvent: ResolverTypeWrapper<Omit<ExportEvent, 'app' | 'user'> & { app?: Maybe<ResolversTypes['App']>, user?: Maybe<ResolversTypes['User']> }>;
  ExportEventType: ExportEventType;
  ExportFile: ResolverTypeWrapper<Omit<ExportFile, 'app' | 'events' | 'user'> & { app: ResolversTypes['App'], events: Array<ResolversTypes['ExportEvent']>, user: ResolversTypes['User'] }>;
  ExportFileConnection: ResolverTypeWrapper<Omit<ExportFileConnection, 'edges'> & { edges: Array<ResolversTypes['ExportFileEdge']> }>;
  ExportFileEdge: ResolverTypeWrapper<Omit<ExportFileEdge, 'node'> & { node: ResolversTypes['ExportFile'] }>;
  ExportFileFilter: ExportFileFilter;
  ExportFileMutationResult: ResolverTypeWrapper<Omit<ExportFileMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['ExportFile'] }>;
  ExportFileOrdering: ExportFileOrdering;
  ExportFileOrderingInput: ExportFileOrderingInput;
  ExportGiftCardsInput: ExportGiftCardsInput;
  ExportInfoInput: ExportInfoInput;
  ExportProductsInput: ExportProductsInput;
  ExportScope: ExportScope;
  ExternalAuthentication: ResolverTypeWrapper<ExternalAuthentication>;
  ExternalNotificationTriggerInput: ExternalNotificationTriggerInput;
  ExternalNotificationTriggerMutationResult: ResolverTypeWrapper<Omit<ExternalNotificationTriggerMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  File: ResolverTypeWrapper<File>;
  FileMutationResult: ResolverTypeWrapper<Omit<FileMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['File'] }>;
  FileType: FileType;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Fulfillment: ResolverTypeWrapper<Omit<Fulfillment, 'lines' | 'metadata' | 'privateMetadata' | 'warehouse'> & { lines: Array<ResolversTypes['FulfillmentLine']>, metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, warehouse?: Maybe<ResolversTypes['Warehouse']> }>;
  FulfillmentApproved: ResolverTypeWrapper<Omit<FulfillmentApproved, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: ResolversTypes['Fulfillment'], issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  FulfillmentBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['FulfillmentBase']>;
  FulfillmentCancelInput: FulfillmentCancelInput;
  FulfillmentCanceled: ResolverTypeWrapper<Omit<FulfillmentCanceled, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: ResolversTypes['Fulfillment'], issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  FulfillmentCreated: ResolverTypeWrapper<Omit<FulfillmentCreated, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: ResolversTypes['Fulfillment'], issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  FulfillmentLine: ResolverTypeWrapper<Omit<FulfillmentLine, 'orderLine'> & { orderLine: ResolversTypes['OrderLine'] }>;
  FulfillmentMetadataUpdated: ResolverTypeWrapper<Omit<FulfillmentMetadataUpdated, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: ResolversTypes['Fulfillment'], issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  FulfillmentMethod: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['FulfillmentMethod']>;
  FulfillmentMethodType: FulfillmentMethodType;
  FulfillmentStatus: FulfillmentStatus;
  FulfillmentUpdateTrackingInput: FulfillmentUpdateTrackingInput;
  GatewayConfigLine: ResolverTypeWrapper<GatewayConfigLine>;
  GiftCard: ResolverTypeWrapper<Omit<GiftCard, 'app' | 'createdBy' | 'events' | 'metadata' | 'privateMetadata' | 'product' | 'usedBy' | 'user'> & { app: ResolversTypes['App'], createdBy: ResolversTypes['User'], events: Array<ResolversTypes['GiftCardEvent']>, metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, product: ResolversTypes['Product'], usedBy: ResolversTypes['User'], user?: Maybe<ResolversTypes['User']> }>;
  GiftCardAddNoteInput: GiftCardAddNoteInput;
  GiftCardBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GiftCardBase']>;
  GiftCardBulkCreationInput: GiftCardBulkCreationInput;
  GiftCardBulkMutationResult: ResolverTypeWrapper<Omit<GiftCardBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, objects: Array<ResolversTypes['GiftCard']> }>;
  GiftCardConnection: ResolverTypeWrapper<Omit<GiftCardConnection, 'edges'> & { edges: Array<ResolversTypes['GiftCardEdge']> }>;
  GiftCardCreated: ResolverTypeWrapper<Omit<GiftCardCreated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversTypes['GiftCard'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  GiftCardCreationInput: GiftCardCreationInput;
  GiftCardDeleted: ResolverTypeWrapper<Omit<GiftCardDeleted, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversTypes['GiftCard'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  GiftCardEdge: ResolverTypeWrapper<Omit<GiftCardEdge, 'node'> & { node: ResolversTypes['GiftCard'] }>;
  GiftCardError: ResolverTypeWrapper<GiftCardError>;
  GiftCardErrorCode: GiftCardErrorCode;
  GiftCardEvent: ResolverTypeWrapper<Omit<GiftCardEvent, 'app' | 'user'> & { app: ResolversTypes['App'], user: ResolversTypes['User'] }>;
  GiftCardEventBalance: ResolverTypeWrapper<GiftCardEventBalance>;
  GiftCardEventFilter: GiftCardEventFilter;
  GiftCardEventType: GiftCardEventType;
  GiftCardFilter: GiftCardFilter;
  GiftCardMetadataUpdated: ResolverTypeWrapper<Omit<GiftCardMetadataUpdated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversTypes['GiftCard'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  GiftCardMutationResult: ResolverTypeWrapper<Omit<GiftCardMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['GiftCard'] }>;
  GiftCardNodeConnection: ResolverTypeWrapper<Omit<GiftCardNodeConnection, 'edges'> & { edges: Array<ResolversTypes['GiftCardNodeEdge']> }>;
  GiftCardNodeEdge: ResolverTypeWrapper<Omit<GiftCardNodeEdge, 'node'> & { node: ResolversTypes['GiftCard'] }>;
  GiftCardOrdering: GiftCardOrdering;
  GiftCardOrderingInput: GiftCardOrderingInput;
  GiftCardResendInput: GiftCardResendInput;
  GiftCardSettings: ResolverTypeWrapper<GiftCardSettings>;
  GiftCardSettingsErrorCode: GiftCardSettingsErrorCode;
  GiftCardSettingsExpiryType: GiftCardSettingsExpiryType;
  GiftCardSettingsMutationResult: ResolverTypeWrapper<Omit<GiftCardSettingsMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  GiftCardSettingsUpdateInput: GiftCardSettingsUpdateInput;
  GiftCardStatusChanged: ResolverTypeWrapper<Omit<GiftCardStatusChanged, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversTypes['GiftCard'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  GiftCardTag: ResolverTypeWrapper<GiftCardTag>;
  GiftCardTagConnection: ResolverTypeWrapper<GiftCardTagConnection>;
  GiftCardTagEdge: ResolverTypeWrapper<GiftCardTagEdge>;
  GiftCardTagFilter: GiftCardTagFilter;
  GiftCardUpdateInput: GiftCardUpdateInput;
  GiftCardUpdated: ResolverTypeWrapper<Omit<GiftCardUpdated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversTypes['GiftCard'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  Giftcardmutationresult: ResolverTypeWrapper<Omit<Giftcardmutationresult, 'errors' | 'event' | 'giftCard'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, event: ResolversTypes['GiftCardEvent'], giftCard: ResolversTypes['GiftCard'] }>;
  GlobalID: ResolverTypeWrapper<Scalars['GlobalID']['output']>;
  GoogleAddressBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GoogleAddressBase']>;
  Group: ResolverTypeWrapper<Omit<Group, 'users'> & { users: Array<ResolversTypes['User']> }>;
  GroupBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GroupBase']>;
  GroupConnection: ResolverTypeWrapper<Omit<GroupConnection, 'edges'> & { edges: Array<ResolversTypes['GroupEdge']> }>;
  GroupCreated: ResolverTypeWrapper<Omit<GroupCreated, 'group' | 'issuingPrincipal' | 'recipient'> & { group: ResolversTypes['Group'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  GroupCreationInput: GroupCreationInput;
  GroupDeleted: ResolverTypeWrapper<Omit<GroupDeleted, 'group' | 'issuingPrincipal' | 'recipient'> & { group: ResolversTypes['Group'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  GroupEdge: ResolverTypeWrapper<Omit<GroupEdge, 'node'> & { node: ResolversTypes['Group'] }>;
  GroupError: ResolverTypeWrapper<GroupError>;
  GroupErrorCode: GroupErrorCode;
  GroupFilter: GroupFilter;
  GroupMutationResult: ResolverTypeWrapper<Omit<GroupMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Group'] }>;
  GroupOrdering: GroupOrdering;
  GroupOrderingInput: GroupOrderingInput;
  GroupUpdateInput: GroupUpdateInput;
  GroupUpdated: ResolverTypeWrapper<Omit<GroupUpdated, 'group' | 'issuingPrincipal' | 'recipient'> & { group: ResolversTypes['Group'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IDListMutationResult: ResolverTypeWrapper<Omit<IdListMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IntRangeInput: IntRangeInput;
  Invoice: ResolverTypeWrapper<Omit<Invoice, 'metadata' | 'privateMetadata'> & { metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']> }>;
  InvoiceBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['InvoiceBase']>;
  InvoiceCreationInput: InvoiceCreationInput;
  InvoiceDeleted: ResolverTypeWrapper<Omit<InvoiceDeleted, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: ResolversTypes['Invoice'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  InvoiceErrorCode: InvoiceErrorCode;
  InvoiceMutationResult: ResolverTypeWrapper<Omit<InvoiceMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Invoice'] }>;
  InvoiceRequested: ResolverTypeWrapper<Omit<InvoiceRequested, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: ResolversTypes['Invoice'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  InvoiceSent: ResolverTypeWrapper<Omit<InvoiceSent, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: ResolversTypes['Invoice'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  JSONString: ResolverTypeWrapper<Scalars['JSONString']['output']>;
  JWT: ResolverTypeWrapper<Omit<Jwt, 'user'> & { user: ResolversTypes['User'] }>;
  JWTMutationResult: ResolverTypeWrapper<Omit<JwtMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['JWT'] }>;
  Job: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Job']>;
  JobStatus: JobStatus;
  LanguageCode: LanguageCode;
  LanguageDisplay: ResolverTypeWrapper<LanguageDisplay>;
  LimitInfo: ResolverTypeWrapper<LimitInfo>;
  Limits: ResolverTypeWrapper<Limits>;
  Manifest: ResolverTypeWrapper<Manifest>;
  ManifestMutationResult: ResolverTypeWrapper<Omit<ManifestMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  MeasurementUnit: MeasurementUnit;
  MediaBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MediaBase']>;
  MediaCreated: ResolverTypeWrapper<Omit<MediaCreated, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], media: ResolversTypes['MediaItem'], recipient: ResolversTypes['App'] }>;
  MediaCreationInput: MediaCreationInput;
  MediaDeleted: ResolverTypeWrapper<Omit<MediaDeleted, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], media: ResolversTypes['MediaItem'], recipient: ResolversTypes['App'] }>;
  MediaError: ResolverTypeWrapper<MediaError>;
  MediaErrorCode: MediaErrorCode;
  MediaFilter: MediaFilter;
  MediaInput: MediaInput;
  MediaItem: ResolverTypeWrapper<Omit<MediaItem, 'file' | 'metadata' | 'privateMetadata'> & { file: ResolversTypes['File'], metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']> }>;
  MediaItemConnection: ResolverTypeWrapper<Omit<MediaItemConnection, 'edges'> & { edges: Array<ResolversTypes['MediaItemEdge']> }>;
  MediaItemEdge: ResolverTypeWrapper<Omit<MediaItemEdge, 'node'> & { node: ResolversTypes['MediaItem'] }>;
  MediaItemMutationResult: ResolverTypeWrapper<Omit<MediaItemMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['MediaItem'] }>;
  MediaOrdering: MediaOrdering;
  MediaOrderingInput: MediaOrderingInput;
  MediaType: MediaType;
  MediaUpdated: ResolverTypeWrapper<Omit<MediaUpdated, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], media: ResolversTypes['MediaItem'], recipient: ResolversTypes['App'] }>;
  Menu: ResolverTypeWrapper<Omit<Menu, 'items' | 'metadata' | 'privateMetadata'> & { items: Array<ResolversTypes['MenuItem']>, metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']> }>;
  MenuBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MenuBase']>;
  MenuConnection: ResolverTypeWrapper<Omit<MenuConnection, 'edges'> & { edges: Array<ResolversTypes['MenuEdge']> }>;
  MenuCreated: ResolverTypeWrapper<Omit<MenuCreated, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], menu: ResolversTypes['Menu'], recipient: ResolversTypes['App'] }>;
  MenuCreationInput: MenuCreationInput;
  MenuDeleted: ResolverTypeWrapper<Omit<MenuDeleted, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], menu: ResolversTypes['Menu'], recipient: ResolversTypes['App'] }>;
  MenuEdge: ResolverTypeWrapper<Omit<MenuEdge, 'node'> & { node: ResolversTypes['Menu'] }>;
  MenuErrorCode: MenuErrorCode;
  MenuInput: MenuInput;
  MenuItem: ResolverTypeWrapper<Omit<MenuItem, 'category' | 'children' | 'collection' | 'menu' | 'metadata' | 'page' | 'parent' | 'privateMetadata' | 'translation'> & { category?: Maybe<ResolversTypes['Category']>, children?: Maybe<Array<ResolversTypes['MenuItem']>>, collection?: Maybe<ResolversTypes['Collection']>, menu: ResolversTypes['Menu'], metadata: Array<ResolversTypes['MetadataItem']>, page?: Maybe<ResolversTypes['Page']>, parent?: Maybe<ResolversTypes['MenuItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, translation?: Maybe<ResolversTypes['MenuItemTranslation']> }>;
  MenuItemBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MenuItemBase']>;
  MenuItemConnection: ResolverTypeWrapper<Omit<MenuItemConnection, 'edges'> & { edges: Array<ResolversTypes['MenuItemEdge']> }>;
  MenuItemCreated: ResolverTypeWrapper<Omit<MenuItemCreated, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], menuItem: ResolversTypes['MenuItem'], recipient: ResolversTypes['App'] }>;
  MenuItemCreationInput: MenuItemCreationInput;
  MenuItemDeleted: ResolverTypeWrapper<Omit<MenuItemDeleted, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], menuItem: ResolversTypes['MenuItem'], recipient: ResolversTypes['App'] }>;
  MenuItemEdge: ResolverTypeWrapper<Omit<MenuItemEdge, 'node'> & { node: ResolversTypes['MenuItem'] }>;
  MenuItemFilter: MenuItemFilter;
  MenuItemInput: MenuItemInput;
  MenuItemMoveInput: MenuItemMoveInput;
  MenuItemMutationResult: ResolverTypeWrapper<Omit<MenuItemMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['MenuItem'] }>;
  MenuItemOrdering: MenuItemOrdering;
  MenuItemOrderingInput: MenuItemOrderingInput;
  MenuItemTranslation: ResolverTypeWrapper<Omit<MenuItemTranslation, 'menuItem'> & { menuItem: ResolversTypes['MenuItem'] }>;
  MenuItemUpdated: ResolverTypeWrapper<Omit<MenuItemUpdated, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], menuItem: ResolversTypes['MenuItem'], recipient: ResolversTypes['App'] }>;
  MenuMutationResult: ResolverTypeWrapper<Omit<MenuMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Menu'] }>;
  MenuOrdering: MenuOrdering;
  MenuOrderingInput: MenuOrderingInput;
  MenuUpdated: ResolverTypeWrapper<Omit<MenuUpdated, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], menu: ResolversTypes['Menu'], recipient: ResolversTypes['App'] }>;
  Metadata: ResolverTypeWrapper<Scalars['Metadata']['output']>;
  MetadataErrorCode: MetadataErrorCode;
  MetadataFilter: MetadataFilter;
  MetadataInput: MetadataInput;
  MetadataItem: ResolverTypeWrapper<MetadataItem>;
  Money: ResolverTypeWrapper<Money>;
  MoneyInput: MoneyInput;
  MoneyRange: ResolverTypeWrapper<MoneyRange>;
  MoveProductInput: MoveProductInput;
  Mutation: ResolverTypeWrapper<{}>;
  NameTranslationInput: NameTranslationInput;
  NavigationType: NavigationType;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  ObjectWithMetadata: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ObjectWithMetadata']>;
  ObjectWithMetadataMutationResult: ResolverTypeWrapper<Omit<ObjectWithMetadataMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['ObjectWithMetadata'] }>;
  Order: ResolverTypeWrapper<Omit<Order, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<ResolversTypes['Warehouse']>, availableShippingMethods?: Maybe<Array<ResolversTypes['ShippingMethod']>>, channel: ResolversTypes['Channel'], events: Array<ResolversTypes['OrderEvent']>, fulfillmentMethod?: Maybe<ResolversTypes['FulfillmentMethod']>, fulfillments: Array<ResolversTypes['Fulfillment']>, giftCards: Array<ResolversTypes['GiftCard']>, invoices: Array<ResolversTypes['Invoice']>, lines: Array<ResolversTypes['OrderLine']>, metadata: Array<ResolversTypes['MetadataItem']>, payments: Array<ResolversTypes['Payment']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, shippingMethod?: Maybe<ResolversTypes['ShippingMethod']>, shippingMethods: Array<ResolversTypes['ShippingMethod']>, shippingTaxClassMetadata: Array<ResolversTypes['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<ResolversTypes['MetadataItem']>, transactions: Array<ResolversTypes['TransactionItem']>, user?: Maybe<ResolversTypes['User']>, voucher?: Maybe<ResolversTypes['Voucher']> }>;
  OrderAction: OrderAction;
  OrderAddNoteInput: OrderAddNoteInput;
  OrderAuthorizeStatus: OrderAuthorizeStatus;
  OrderBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['OrderBase']>;
  OrderBulkMutationResult: ResolverTypeWrapper<Omit<OrderBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, objects: Array<ResolversTypes['Order']> }>;
  OrderCancelled: ResolverTypeWrapper<Omit<OrderCancelled, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  OrderChargeStatus: OrderChargeStatus;
  OrderConfirmed: ResolverTypeWrapper<Omit<OrderConfirmed, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  OrderConnection: ResolverTypeWrapper<Omit<OrderConnection, 'edges'> & { edges: Array<ResolversTypes['OrderEdge']> }>;
  OrderDiscount: ResolverTypeWrapper<OrderDiscount>;
  OrderDiscountCommonInput: OrderDiscountCommonInput;
  OrderDiscountType: OrderDiscountType;
  OrderDraftFilter: OrderDraftFilter;
  OrderEdge: ResolverTypeWrapper<Omit<OrderEdge, 'node'> & { node: ResolversTypes['Order'] }>;
  OrderError: ResolverTypeWrapper<OrderError>;
  OrderErrorCode: OrderErrorCode;
  OrderEvent: ResolverTypeWrapper<Omit<OrderEvent, 'app' | 'fulfilledItems' | 'lines' | 'relatedOrder' | 'user' | 'warehouse'> & { app: ResolversTypes['App'], fulfilledItems: Array<ResolversTypes['FulfillmentLine']>, lines: Array<ResolversTypes['OrderEventOrderLineObject']>, relatedOrder: ResolversTypes['Order'], user: ResolversTypes['User'], warehouse: ResolversTypes['Warehouse'] }>;
  OrderEventConnection: ResolverTypeWrapper<Omit<OrderEventConnection, 'edges'> & { edges: Array<ResolversTypes['OrderEventEdge']> }>;
  OrderEventEdge: ResolverTypeWrapper<Omit<OrderEventEdge, 'node'> & { node: ResolversTypes['OrderEvent'] }>;
  OrderEventEmailType: OrderEventEmailType;
  OrderEventOrderLineObject: ResolverTypeWrapper<Omit<OrderEventOrderLineObject, 'orderLine'> & { orderLine: ResolversTypes['OrderLine'] }>;
  OrderEventType: OrderEventType;
  OrderFilter: OrderFilter;
  OrderFilterShippingMethods: ResolverTypeWrapper<Omit<OrderFilterShippingMethods, 'issuingPrincipal' | 'order' | 'recipient' | 'shippingMethods'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'], shippingMethods: Array<ResolversTypes['ShippingMethod']> }>;
  OrderFulfillInput: OrderFulfillInput;
  OrderFulfillStockInput: OrderFulfillStockInput;
  OrderFulfilled: ResolverTypeWrapper<Omit<OrderFulfilled, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  OrderFulfillment: ResolverTypeWrapper<Omit<OrderFulfillment, 'fulfillment' | 'order'> & { fulfillment: ResolversTypes['Fulfillment'], order: ResolversTypes['Order'] }>;
  OrderFulfillmentLineInput: OrderFulfillmentLineInput;
  OrderFulfillmentMutationResult: ResolverTypeWrapper<Omit<OrderFulfillmentMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['OrderFulfillment'] }>;
  OrderFullyPaid: ResolverTypeWrapper<Omit<OrderFullyPaid, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  OrderInvoiceMutationResult: ResolverTypeWrapper<Omit<OrderInvoiceMutationResult, 'errors' | 'invoice' | 'order'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, invoice: ResolversTypes['Invoice'], order: ResolversTypes['Order'] }>;
  OrderLine: ResolverTypeWrapper<Omit<OrderLine, 'allocations' | 'digitalContentUrl' | 'metadata' | 'privateMetadata' | 'product' | 'taxClassMetadata' | 'taxClassPrivateMetadata' | 'thumbnail'> & { allocations: Array<ResolversTypes['Allocation']>, digitalContentUrl: ResolversTypes['DigitalContentUrl'], metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, product?: Maybe<ResolversTypes['ConcreteProduct']>, taxClassMetadata: Array<ResolversTypes['MetadataItem']>, taxClassPrivateMetadata: Array<ResolversTypes['MetadataItem']>, thumbnail?: Maybe<ResolversTypes['Image']> }>;
  OrderLineCreationInput: OrderLineCreationInput;
  OrderLineInput: OrderLineInput;
  OrderLineMutationResult: ResolverTypeWrapper<Omit<OrderLineMutationResult, 'errors' | 'order' | 'orderLine'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, order: ResolversTypes['Order'], orderLine: ResolversTypes['OrderLine'] }>;
  OrderLinesMutationResult: ResolverTypeWrapper<Omit<OrderLinesMutationResult, 'errors' | 'order' | 'orderLines'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, order: ResolversTypes['Order'], orderLines: Array<ResolversTypes['OrderLine']> }>;
  OrderMetadataUpdated: ResolverTypeWrapper<Omit<OrderMetadataUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  OrderMutationResult: ResolverTypeWrapper<Omit<OrderMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Order'] }>;
  OrderNodeConnection: ResolverTypeWrapper<Omit<OrderNodeConnection, 'edges'> & { edges: Array<ResolversTypes['OrderNodeEdge']> }>;
  OrderNodeEdge: ResolverTypeWrapper<Omit<OrderNodeEdge, 'node'> & { node: ResolversTypes['Order'] }>;
  OrderOrdering: OrderOrdering;
  OrderOrderingInput: OrderOrderingInput;
  OrderOrigin: OrderOrigin;
  OrderRefundFulfillmentLineInput: OrderRefundFulfillmentLineInput;
  OrderRefundLineInput: OrderRefundLineInput;
  OrderRefundProductsInput: OrderRefundProductsInput;
  OrderReturnFulfillmentLineInput: OrderReturnFulfillmentLineInput;
  OrderReturnLineInput: OrderReturnLineInput;
  OrderReturnProductsInput: OrderReturnProductsInput;
  OrderSettings: ResolverTypeWrapper<OrderSettings>;
  OrderSettingsErrorCode: OrderSettingsErrorCode;
  OrderSettingsMutationResult: ResolverTypeWrapper<Omit<OrderSettingsMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  OrderSettingsUpdateInput: OrderSettingsUpdateInput;
  OrderStatus: OrderStatus;
  OrderStatusFilter: OrderStatusFilter;
  OrderUpdateInput: OrderUpdateInput;
  OrderUpdateShippingInput: OrderUpdateShippingInput;
  OrderUpdated: ResolverTypeWrapper<Omit<OrderUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], order: ResolversTypes['Order'], recipient: ResolversTypes['App'] }>;
  OrderingDirection: OrderingDirection;
  Ordermutationresult: ResolverTypeWrapper<Omit<Ordermutationresult, 'errors' | 'event' | 'order'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, event: ResolversTypes['OrderEvent'], order: ResolversTypes['Order'] }>;
  Page: ResolverTypeWrapper<Omit<Page, 'attributes' | 'metadata' | 'pageKlass' | 'privateMetadata' | 'translation'> & { attributes: Array<ResolversTypes['Attribute']>, metadata: Array<ResolversTypes['MetadataItem']>, pageKlass: ResolversTypes['PageKlass'], privateMetadata: Array<ResolversTypes['MetadataItem']>, translation?: Maybe<ResolversTypes['PageTranslation']> }>;
  PageBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PageBase']>;
  PageBulkMutationResult: ResolverTypeWrapper<Omit<PageBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, objects: Array<ResolversTypes['Page']> }>;
  PageConnection: ResolverTypeWrapper<Omit<PageConnection, 'edges'> & { edges: Array<ResolversTypes['PageEdge']> }>;
  PageCreated: ResolverTypeWrapper<Omit<PageCreated, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], page: ResolversTypes['Page'], recipient: ResolversTypes['App'] }>;
  PageCreationInput: PageCreationInput;
  PageDeleted: ResolverTypeWrapper<Omit<PageDeleted, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], page: ResolversTypes['Page'], recipient: ResolversTypes['App'] }>;
  PageEdge: ResolverTypeWrapper<Omit<PageEdge, 'node'> & { node: ResolversTypes['Page'] }>;
  PageError: ResolverTypeWrapper<PageError>;
  PageErrorCode: PageErrorCode;
  PageFilter: PageFilter;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PageInput: PageInput;
  PageKlass: ResolverTypeWrapper<Omit<PageKlass, 'attributes' | 'availableAttributes' | 'metadata' | 'privateMetadata'> & { attributes: Array<ResolversTypes['Attribute']>, availableAttributes: ResolversTypes['AttributeConnection'], metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']> }>;
  PageKlassBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PageKlassBase']>;
  PageKlassConnection: ResolverTypeWrapper<Omit<PageKlassConnection, 'edges'> & { edges: Array<ResolversTypes['PageKlassEdge']> }>;
  PageKlassCreated: ResolverTypeWrapper<Omit<PageKlassCreated, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], pageKlass: ResolversTypes['PageKlass'], recipient: ResolversTypes['App'] }>;
  PageKlassCreationInput: PageKlassCreationInput;
  PageKlassDeleted: ResolverTypeWrapper<Omit<PageKlassDeleted, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], pageKlass: ResolversTypes['PageKlass'], recipient: ResolversTypes['App'] }>;
  PageKlassEdge: ResolverTypeWrapper<Omit<PageKlassEdge, 'node'> & { node: ResolversTypes['PageKlass'] }>;
  PageKlassFilter: PageKlassFilter;
  PageKlassMutationResult: ResolverTypeWrapper<Omit<PageKlassMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['PageKlass'] }>;
  PageKlassOrdering: PageKlassOrdering;
  PageKlassOrderingInput: PageKlassOrderingInput;
  PageKlassUpdateInput: PageKlassUpdateInput;
  PageKlassUpdated: ResolverTypeWrapper<Omit<PageKlassUpdated, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], pageKlass: ResolversTypes['PageKlass'], recipient: ResolversTypes['App'] }>;
  PageMutationResult: ResolverTypeWrapper<Omit<PageMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Page'] }>;
  PageOrdering: PageOrdering;
  PageOrderingInput: PageOrderingInput;
  PageTranslation: ResolverTypeWrapper<Omit<PageTranslation, 'page'> & { page: ResolversTypes['Page'] }>;
  PageTranslationInput: PageTranslationInput;
  PageUpdated: ResolverTypeWrapper<Omit<PageUpdated, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], page: ResolversTypes['Page'], recipient: ResolversTypes['App'] }>;
  Payment: ResolverTypeWrapper<Omit<Payment, 'checkout' | 'metadata' | 'order' | 'privateMetadata' | 'transactions'> & { checkout: ResolversTypes['Checkout'], metadata: Array<ResolversTypes['MetadataItem']>, order: ResolversTypes['Order'], privateMetadata: Array<ResolversTypes['MetadataItem']>, transactions: Array<ResolversTypes['Transaction']> }>;
  PaymentAuthorize: ResolverTypeWrapper<Omit<PaymentAuthorize, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], payment: ResolversTypes['Payment'], recipient: ResolversTypes['App'] }>;
  PaymentBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PaymentBase']>;
  PaymentCaptureEvent: ResolverTypeWrapper<Omit<PaymentCaptureEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], payment: ResolversTypes['Payment'], recipient: ResolversTypes['App'] }>;
  PaymentCheckBalanceInput: PaymentCheckBalanceInput;
  PaymentCheckBalanceMutationResult: ResolverTypeWrapper<Omit<PaymentCheckBalanceMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  PaymentConfirmEvent: ResolverTypeWrapper<Omit<PaymentConfirmEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], payment: ResolversTypes['Payment'], recipient: ResolversTypes['App'] }>;
  PaymentConnection: ResolverTypeWrapper<Omit<PaymentConnection, 'edges'> & { edges: Array<ResolversTypes['PaymentEdge']> }>;
  PaymentEdge: ResolverTypeWrapper<Omit<PaymentEdge, 'node'> & { node: ResolversTypes['Payment'] }>;
  PaymentError: ResolverTypeWrapper<PaymentError>;
  PaymentErrorCode: PaymentErrorCode;
  PaymentFilter: PaymentFilter;
  PaymentGateway: ResolverTypeWrapper<PaymentGateway>;
  PaymentInitializeMutationResult: ResolverTypeWrapper<Omit<PaymentInitializeMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  PaymentInitialized: ResolverTypeWrapper<PaymentInitialized>;
  PaymentInput: PaymentInput;
  PaymentListGateways: ResolverTypeWrapper<Omit<PaymentListGateways, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: ResolversTypes['Checkout'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  PaymentMutationResult: ResolverTypeWrapper<Omit<PaymentMutationResult, 'errors' | 'payment'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, payment: ResolversTypes['Payment'] }>;
  PaymentProcessEvent: ResolverTypeWrapper<Omit<PaymentProcessEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], payment: ResolversTypes['Payment'], recipient: ResolversTypes['App'] }>;
  PaymentRefundEvent: ResolverTypeWrapper<Omit<PaymentRefundEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], payment: ResolversTypes['Payment'], recipient: ResolversTypes['App'] }>;
  PaymentSource: ResolverTypeWrapper<Omit<PaymentSource, 'metadata'> & { metadata: Array<ResolversTypes['MetadataItem']> }>;
  PaymentVoidEvent: ResolverTypeWrapper<Omit<PaymentVoidEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], payment: ResolversTypes['Payment'], recipient: ResolversTypes['App'] }>;
  Permission: ResolverTypeWrapper<Permission>;
  PermissionCode: PermissionCode;
  Plugin: ResolverTypeWrapper<Omit<Plugin, 'channelConfigurations' | 'globalConfiguration'> & { channelConfigurations: Array<ResolversTypes['PluginConfiguration']>, globalConfiguration: ResolversTypes['PluginConfiguration'] }>;
  PluginConfiguration: ResolverTypeWrapper<Omit<PluginConfiguration, 'channel'> & { channel: ResolversTypes['Channel'] }>;
  PluginConfigurationType: PluginConfigurationType;
  PluginConnection: ResolverTypeWrapper<Omit<PluginConnection, 'edges'> & { edges: Array<ResolversTypes['PluginEdge']> }>;
  PluginEdge: ResolverTypeWrapper<Omit<PluginEdge, 'node'> & { node: ResolversTypes['Plugin'] }>;
  PluginFilter: PluginFilter;
  PluginMutationResult: ResolverTypeWrapper<Omit<PluginMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Plugin'] }>;
  PluginOrdering: PluginOrdering;
  PluginOrderingInput: PluginOrderingInput;
  PluginStatusInChannelsInput: PluginStatusInChannelsInput;
  PluginUpdateInput: PluginUpdateInput;
  PointOfContact: ResolverTypeWrapper<PointOfContact>;
  PositiveDecimal: ResolverTypeWrapper<Scalars['PositiveDecimal']['output']>;
  PostalCodeRuleInclusionType: PostalCodeRuleInclusionType;
  PreorderData: ResolverTypeWrapper<PreorderData>;
  PreorderSettingsInput: PreorderSettingsInput;
  PreorderThreshold: ResolverTypeWrapper<PreorderThreshold>;
  PriceInput: PriceInput;
  PriceRangeInput: PriceRangeInput;
  Product: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Product']>;
  ProductAttributeAssignInput: ProductAttributeAssignInput;
  ProductAttributeAssignment: ResolverTypeWrapper<Omit<ProductAttributeAssignment, 'attribute'> & { attribute: ResolversTypes['Attribute'] }>;
  ProductAttributeAssignmentMutationResult: ResolverTypeWrapper<Omit<ProductAttributeAssignmentMutationResult, 'errors' | 'productKlass'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, productKlass: ResolversTypes['ProductKlass'] }>;
  ProductAttributeAssignmentUpdateInput: ProductAttributeAssignmentUpdateInput;
  ProductAttributeScope: ProductAttributeScope;
  ProductAttributeType: ProductAttributeType;
  ProductBackInStock: ResolverTypeWrapper<Omit<ProductBackInStock, 'category' | 'issuingPrincipal' | 'product' | 'productVariant' | 'recipient' | 'warehouse'> & { category: ResolversTypes['Category'], issuingPrincipal: ResolversTypes['AppUser'], product: ResolversTypes['Product'], productVariant: ResolversTypes['Product'], recipient: ResolversTypes['App'], warehouse: ResolversTypes['Warehouse'] }>;
  ProductBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ProductBase']>;
  ProductBulkCreationInput: ProductBulkCreationInput;
  ProductBulkMutationResult: ResolverTypeWrapper<Omit<ProductBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, objects: Array<ResolversTypes['Product']> }>;
  ProductChannelListing: ResolverTypeWrapper<Omit<ProductChannelListing, 'channel'> & { channel: ResolversTypes['Channel'] }>;
  ProductChannelListingAddInput: ProductChannelListingAddInput;
  ProductChannelListingError: ResolverTypeWrapper<ProductChannelListingError>;
  ProductConnection: ResolverTypeWrapper<Omit<ProductConnection, 'edges'> & { edges: Array<ResolversTypes['ProductEdge']> }>;
  ProductCreated: ResolverTypeWrapper<Omit<ProductCreated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: ResolversTypes['Category'], issuingPrincipal: ResolversTypes['AppUser'], product: ResolversTypes['Product'], recipient: ResolversTypes['App'] }>;
  ProductCreationInput: ProductCreationInput;
  ProductDeleted: ResolverTypeWrapper<Omit<ProductDeleted, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: ResolversTypes['Category'], issuingPrincipal: ResolversTypes['AppUser'], product: ResolversTypes['Product'], recipient: ResolversTypes['App'] }>;
  ProductEdge: ResolverTypeWrapper<Omit<ProductEdge, 'node'> & { node: ResolversTypes['Product'] }>;
  ProductError: ResolverTypeWrapper<ProductError>;
  ProductErrorCode: ProductErrorCode;
  ProductField: ProductField;
  ProductFilter: ProductFilter;
  ProductImage: ResolverTypeWrapper<Omit<ProductImage, 'url'> & { url?: Maybe<ResolversTypes['Image']> }>;
  ProductInput: ProductInput;
  ProductKlass: ResolverTypeWrapper<Omit<ProductKlass, 'metadata' | 'privateMetadata' | 'productAttributes' | 'productVariantAttributeAssignments' | 'products' | 'variantAttributes'> & { metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, productAttributes: Array<ResolversTypes['Attribute']>, productVariantAttributeAssignments: Array<ResolversTypes['ProductAttributeAssignment']>, products: ResolversTypes['ProductNodeConnection'], variantAttributes: Array<ResolversTypes['Attribute']> }>;
  ProductKlassConfigurable: ProductKlassConfigurable;
  ProductKlassConnection: ResolverTypeWrapper<Omit<ProductKlassConnection, 'edges'> & { edges: Array<ResolversTypes['ProductKlassEdge']> }>;
  ProductKlassEdge: ResolverTypeWrapper<Omit<ProductKlassEdge, 'node'> & { node: ResolversTypes['ProductKlass'] }>;
  ProductKlassFilter: ProductKlassFilter;
  ProductKlassInput: ProductKlassInput;
  ProductKlassKind: ProductKlassKind;
  ProductKlassMutationResult: ResolverTypeWrapper<Omit<ProductKlassMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['ProductKlass'] }>;
  ProductKlassNodeConnection: ResolverTypeWrapper<Omit<ProductKlassNodeConnection, 'edges'> & { edges: Array<ResolversTypes['ProductKlassNodeEdge']> }>;
  ProductKlassNodeEdge: ResolverTypeWrapper<Omit<ProductKlassNodeEdge, 'node'> & { node: ResolversTypes['ProductKlass'] }>;
  ProductKlassOrdering: ProductKlassOrdering;
  ProductKlassOrderingInput: ProductKlassOrderingInput;
  ProductMediaAssignmentMutationResult: ResolverTypeWrapper<Omit<ProductMediaAssignmentMutationResult, 'errors' | 'mediaItem' | 'product'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, mediaItem: ResolversTypes['ProductMediaItem'], product: ResolversTypes['Product'] }>;
  ProductMediaCreationInput: ProductMediaCreationInput;
  ProductMediaItem: ResolverTypeWrapper<Omit<ProductMediaItem, 'mediaItem'> & { mediaItem: ResolversTypes['MediaItem'] }>;
  ProductMediaMutationResult: ResolverTypeWrapper<Omit<ProductMediaMutationResult, 'errors' | 'media' | 'product'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, media: ResolversTypes['ProductMediaItem'], product: ResolversTypes['Product'] }>;
  ProductMediaUnassignmentMutationResult: ResolverTypeWrapper<Omit<ProductMediaUnassignmentMutationResult, 'errors' | 'mediaItem' | 'product'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, mediaItem: ResolversTypes['ProductMediaItem'], product: ResolversTypes['Product'] }>;
  ProductMediaUpdateInput: ProductMediaUpdateInput;
  ProductMetadataUpdated: ResolverTypeWrapper<Omit<ProductMetadataUpdated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: ResolversTypes['Category'], issuingPrincipal: ResolversTypes['AppUser'], product: ResolversTypes['Product'], recipient: ResolversTypes['App'] }>;
  ProductMutationResult: ResolverTypeWrapper<Omit<ProductMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Product'] }>;
  ProductNodeConnection: ResolverTypeWrapper<Omit<ProductNodeConnection, 'edges'> & { edges: Array<ResolversTypes['ProductNodeEdge']> }>;
  ProductNodeEdge: ResolverTypeWrapper<Omit<ProductNodeEdge, 'node'> & { node: ResolversTypes['Product'] }>;
  ProductOrdering: ProductOrdering;
  ProductOrderingInput: ProductOrderingInput;
  ProductOutOfStock: ResolverTypeWrapper<Omit<ProductOutOfStock, 'category' | 'issuingPrincipal' | 'product' | 'productVariant' | 'recipient' | 'warehouse'> & { category: ResolversTypes['Category'], issuingPrincipal: ResolversTypes['AppUser'], product: ResolversTypes['Product'], productVariant: ResolversTypes['Product'], recipient: ResolversTypes['App'], warehouse: ResolversTypes['Warehouse'] }>;
  ProductPreorderDeactivationMutationResult: ResolverTypeWrapper<Omit<ProductPreorderDeactivationMutationResult, 'errors' | 'productVariant'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, productVariant: ResolversTypes['Product'] }>;
  ProductPricingInfo: ResolverTypeWrapper<ProductPricingInfo>;
  ProductStockFilter: ProductStockFilter;
  ProductTranslation: ResolverTypeWrapper<Omit<ProductTranslation, 'product' | 'values'> & { product: ResolversTypes['Product'], values: Array<ResolversTypes['ValueTranslation']> }>;
  ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation']>;
  ProductUpdated: ResolverTypeWrapper<Omit<ProductUpdated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: ResolversTypes['Category'], issuingPrincipal: ResolversTypes['AppUser'], product: ResolversTypes['Product'], recipient: ResolversTypes['App'] }>;
  ProductWithoutVariantError: ResolverTypeWrapper<ProductWithoutVariantError>;
  PublishableChannelListingInput: PublishableChannelListingInput;
  Query: ResolverTypeWrapper<{}>;
  ReducedRate: ResolverTypeWrapper<ReducedRate>;
  ReorderInput: ReorderInput;
  ReportingPeriod: ReportingPeriod;
  Sale: ResolverTypeWrapper<Omit<Sale, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<ResolversTypes['SaleChannelListing']>, collections: ResolversTypes['CollectionConnection'], metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, products: ResolversTypes['ProductNodeConnection'], translation?: Maybe<ResolversTypes['SaleTranslation']> }>;
  SaleBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['SaleBase']>;
  SaleChannelListing: ResolverTypeWrapper<Omit<SaleChannelListing, 'channel'> & { channel: ResolversTypes['Channel'] }>;
  SaleChannelListingAddInput: SaleChannelListingAddInput;
  SaleChannelListingInput: SaleChannelListingInput;
  SaleConnection: ResolverTypeWrapper<Omit<SaleConnection, 'edges'> & { edges: Array<ResolversTypes['SaleEdge']> }>;
  SaleCreated: ResolverTypeWrapper<Omit<SaleCreated, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], sale: ResolversTypes['Sale'] }>;
  SaleDeleted: ResolverTypeWrapper<Omit<SaleDeleted, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], sale: ResolversTypes['Sale'] }>;
  SaleEdge: ResolverTypeWrapper<Omit<SaleEdge, 'node'> & { node: ResolversTypes['Sale'] }>;
  SaleFilter: SaleFilter;
  SaleInput: SaleInput;
  SaleMutationResult: ResolverTypeWrapper<Omit<SaleMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Sale'] }>;
  SaleOrdering: SaleOrdering;
  SaleOrderingInput: SaleOrderingInput;
  SaleToggle: ResolverTypeWrapper<Omit<SaleToggle, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], sale: ResolversTypes['Sale'] }>;
  SaleTranslation: ResolverTypeWrapper<Omit<SaleTranslation, 'sale'> & { sale: ResolversTypes['Sale'] }>;
  SaleType: SaleType;
  SaleUpdated: ResolverTypeWrapper<Omit<SaleUpdated, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], sale: ResolversTypes['Sale'] }>;
  SeoInput: SeoInput;
  ShippingError: ResolverTypeWrapper<ShippingError>;
  ShippingErrorCode: ShippingErrorCode;
  ShippingListMethodsForCheckout: ResolverTypeWrapper<Omit<ShippingListMethodsForCheckout, 'checkout' | 'issuingPrincipal' | 'recipient' | 'shippingMethods'> & { checkout: ResolversTypes['Checkout'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], shippingMethods: Array<ResolversTypes['ShippingMethod']> }>;
  ShippingMethod: ResolverTypeWrapper<Omit<ShippingMethod, 'channelListings' | 'excludedProducts' | 'metadata' | 'privateMetadata' | 'translation'> & { channelListings: Array<ResolversTypes['ShippingMethodChannelListing']>, excludedProducts: ResolversTypes['ProductConnection'], metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, translation?: Maybe<ResolversTypes['ShippingMethodTranslation']> }>;
  ShippingMethodChannelListing: ResolverTypeWrapper<Omit<ShippingMethodChannelListing, 'channel'> & { channel: ResolversTypes['Channel'] }>;
  ShippingMethodChannelListingAddInput: ShippingMethodChannelListingAddInput;
  ShippingMethodChannelListingInput: ShippingMethodChannelListingInput;
  ShippingMethodChannelListingMutationResult: ResolverTypeWrapper<Omit<ShippingMethodChannelListingMutationResult, 'channelListing' | 'errors' | 'shippingMethod'> & { channelListing: ResolversTypes['ShippingMethodChannelListing'], errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, shippingMethod: ResolversTypes['ShippingMethod'] }>;
  ShippingMethodMutationResult: ResolverTypeWrapper<Omit<ShippingMethodMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['ShippingMethod'] }>;
  ShippingMethodPostalCodeRule: ResolverTypeWrapper<ShippingMethodPostalCodeRule>;
  ShippingMethodTranslation: ResolverTypeWrapper<Omit<ShippingMethodTranslation, 'shippingMethod'> & { shippingMethod: ResolversTypes['ShippingMethod'] }>;
  ShippingPostalCodeRulesCreationInputRange: ShippingPostalCodeRulesCreationInputRange;
  ShippingPrice: ResolverTypeWrapper<Omit<ShippingPrice, 'shippingMethod' | 'shippingZone'> & { shippingMethod: ResolversTypes['ShippingMethod'], shippingZone: ResolversTypes['ShippingZone'] }>;
  ShippingPriceBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ShippingPriceBase']>;
  ShippingPriceCreated: ResolverTypeWrapper<Omit<ShippingPriceCreated, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], shippingMethod: ResolversTypes['ShippingMethod'], shippingZone: ResolversTypes['ShippingZone'] }>;
  ShippingPriceDeleted: ResolverTypeWrapper<Omit<ShippingPriceDeleted, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], shippingMethod: ResolversTypes['ShippingMethod'], shippingZone: ResolversTypes['ShippingZone'] }>;
  ShippingPriceExcludeProductsInput: ShippingPriceExcludeProductsInput;
  ShippingPriceInput: ShippingPriceInput;
  ShippingPriceMutationResult: ResolverTypeWrapper<Omit<ShippingPriceMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['ShippingPrice'] }>;
  ShippingPriceRemoveProductFromExcludeMutationResult: ResolverTypeWrapper<Omit<ShippingPriceRemoveProductFromExcludeMutationResult, 'errors' | 'shippingMethod'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, shippingMethod: ResolversTypes['ShippingMethod'] }>;
  ShippingPriceTranslationInput: ShippingPriceTranslationInput;
  ShippingPriceUpdated: ResolverTypeWrapper<Omit<ShippingPriceUpdated, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], shippingMethod: ResolversTypes['ShippingMethod'], shippingZone: ResolversTypes['ShippingZone'] }>;
  ShippingZone: ResolverTypeWrapper<Omit<ShippingZone, 'channels' | 'metadata' | 'privateMetadata' | 'shippingMethods' | 'warehouses'> & { channels: Array<ResolversTypes['Channel']>, metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, shippingMethods: Array<ResolversTypes['ShippingMethod']>, warehouses: Array<ResolversTypes['Warehouse']> }>;
  ShippingZoneBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ShippingZoneBase']>;
  ShippingZoneConnection: ResolverTypeWrapper<Omit<ShippingZoneConnection, 'edges'> & { edges: Array<ResolversTypes['ShippingZoneEdge']> }>;
  ShippingZoneCreated: ResolverTypeWrapper<Omit<ShippingZoneCreated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], shippingZone: ResolversTypes['ShippingZone'] }>;
  ShippingZoneCreationInput: ShippingZoneCreationInput;
  ShippingZoneDeleted: ResolverTypeWrapper<Omit<ShippingZoneDeleted, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], shippingZone: ResolversTypes['ShippingZone'] }>;
  ShippingZoneEdge: ResolverTypeWrapper<Omit<ShippingZoneEdge, 'node'> & { node: ResolversTypes['ShippingZone'] }>;
  ShippingZoneFilter: ShippingZoneFilter;
  ShippingZoneMetadataUpdated: ResolverTypeWrapper<Omit<ShippingZoneMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], shippingZone: ResolversTypes['ShippingZone'] }>;
  ShippingZoneMutationResult: ResolverTypeWrapper<Omit<ShippingZoneMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['ShippingZone'] }>;
  ShippingZoneUpdateInput: ShippingZoneUpdateInput;
  ShippingZoneUpdated: ResolverTypeWrapper<Omit<ShippingZoneUpdated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], shippingZone: ResolversTypes['ShippingZone'] }>;
  ShopErrorCode: ShopErrorCode;
  ShopSettingsUpdateInput: ShopSettingsUpdateInput;
  Site: ResolverTypeWrapper<Omit<Site, 'availableShippingMethods' | 'logo' | 'staffNotificationRecipients'> & { availableShippingMethods?: Maybe<Array<ResolversTypes['ShippingMethod']>>, logo?: Maybe<ResolversTypes['Image']>, staffNotificationRecipients?: Maybe<Array<ResolversTypes['StaffNotificationRecipient']>> }>;
  SiteDomainInput: SiteDomainInput;
  SiteMutationResult: ResolverTypeWrapper<Omit<SiteMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Site'] }>;
  SiteTranslation: ResolverTypeWrapper<SiteTranslation>;
  SiteTranslationInput: SiteTranslationInput;
  SiteTranslationMutationResult: ResolverTypeWrapper<Omit<SiteTranslationMutationResult, 'errors' | 'shop'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, shop: ResolversTypes['Site'] }>;
  Size: ResolverTypeWrapper<Size>;
  StaffCreated: ResolverTypeWrapper<Omit<StaffCreated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], user: ResolversTypes['User'] }>;
  StaffCreationInput: StaffCreationInput;
  StaffDeleted: ResolverTypeWrapper<Omit<StaffDeleted, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], user: ResolversTypes['User'] }>;
  StaffError: ResolverTypeWrapper<StaffError>;
  StaffMemberStatus: StaffMemberStatus;
  StaffNotificationRecipient: ResolverTypeWrapper<Omit<StaffNotificationRecipient, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  StaffNotificationRecipientInput: StaffNotificationRecipientInput;
  StaffNotificationRecipientMutationResult: ResolverTypeWrapper<Omit<StaffNotificationRecipientMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['StaffNotificationRecipient'] }>;
  StaffUpdateInput: StaffUpdateInput;
  StaffUpdated: ResolverTypeWrapper<Omit<StaffUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], user: ResolversTypes['User'] }>;
  StaffUserFilter: StaffUserFilter;
  StateCode: StateCode;
  Stock: ResolverTypeWrapper<Omit<Stock, 'productVariant' | 'warehouse'> & { productVariant: ResolversTypes['Product'], warehouse: ResolversTypes['Warehouse'] }>;
  StockAvailability: StockAvailability;
  StockConnection: ResolverTypeWrapper<Omit<StockConnection, 'edges'> & { edges: Array<ResolversTypes['StockEdge']> }>;
  StockEdge: ResolverTypeWrapper<Omit<StockEdge, 'node'> & { node: ResolversTypes['Stock'] }>;
  StockErrorCode: StockErrorCode;
  StockFilter: StockFilter;
  StockInput: StockInput;
  StockSettings: ResolverTypeWrapper<StockSettings>;
  StockSettingsInput: StockSettingsInput;
  StorePaymentMethod: StorePaymentMethod;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  SyncWebhookEvent: ResolverTypeWrapper<SyncWebhookEvent>;
  TaxCalculationStrategy: TaxCalculationStrategy;
  TaxClass: ResolverTypeWrapper<Omit<TaxClass, 'metadata' | 'privateMetadata'> & { metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']> }>;
  TaxClassConnection: ResolverTypeWrapper<TaxClassConnection>;
  TaxClassCountryRate: ResolverTypeWrapper<TaxClassCountryRate>;
  TaxClassCreateError: ResolverTypeWrapper<TaxClassCreateError>;
  TaxClassCreateErrorCode: TaxClassCreateErrorCode;
  TaxClassCreationInput: TaxClassCreationInput;
  TaxClassDeleteError: ResolverTypeWrapper<TaxClassDeleteError>;
  TaxClassDeleteErrorCode: TaxClassDeleteErrorCode;
  TaxClassEdge: ResolverTypeWrapper<TaxClassEdge>;
  TaxClassFilter: TaxClassFilter;
  TaxClassMutationResult: ResolverTypeWrapper<Omit<TaxClassMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  TaxClassOrdering: TaxClassOrdering;
  TaxClassOrderingInput: TaxClassOrderingInput;
  TaxClassRateInput: TaxClassRateInput;
  TaxClassUpdateError: ResolverTypeWrapper<TaxClassUpdateError>;
  TaxClassUpdateErrorCode: TaxClassUpdateErrorCode;
  TaxClassUpdateInput: TaxClassUpdateInput;
  TaxConfiguration: ResolverTypeWrapper<Omit<TaxConfiguration, 'channel' | 'metadata' | 'privateMetadata'> & { channel: ResolversTypes['Channel'], metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']> }>;
  TaxConfigurationConnection: ResolverTypeWrapper<Omit<TaxConfigurationConnection, 'edges'> & { edges: Array<ResolversTypes['TaxConfigurationEdge']> }>;
  TaxConfigurationEdge: ResolverTypeWrapper<Omit<TaxConfigurationEdge, 'node'> & { node: ResolversTypes['TaxConfiguration'] }>;
  TaxConfigurationFilter: TaxConfigurationFilter;
  TaxConfigurationMutationResult: ResolverTypeWrapper<Omit<TaxConfigurationMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['TaxConfiguration'] }>;
  TaxConfigurationPerCountry: ResolverTypeWrapper<TaxConfigurationPerCountry>;
  TaxConfigurationPerCountryInput: TaxConfigurationPerCountryInput;
  TaxConfigurationUpdateError: ResolverTypeWrapper<TaxConfigurationUpdateError>;
  TaxConfigurationUpdateErrorCode: TaxConfigurationUpdateErrorCode;
  TaxConfigurationUpdateInput: TaxConfigurationUpdateInput;
  TaxCountryConfiguration: ResolverTypeWrapper<TaxCountryConfiguration>;
  TaxCountryConfigurationDeleteErrorCode: TaxCountryConfigurationDeleteErrorCode;
  TaxCountryConfigurationMutationResult: ResolverTypeWrapper<Omit<TaxCountryConfigurationMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  TaxCountryConfigurationUpdateError: ResolverTypeWrapper<TaxCountryConfigurationUpdateError>;
  TaxCountryConfigurationUpdateErrorCode: TaxCountryConfigurationUpdateErrorCode;
  TaxExemptionManageErrorCode: TaxExemptionManageErrorCode;
  TaxSourceLine: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TaxSourceLine']>;
  TaxSourceObject: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TaxSourceObject']>;
  TaxSourceObjectMutationResult: ResolverTypeWrapper<Omit<TaxSourceObjectMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['TaxSourceObject'] }>;
  TaxType: ResolverTypeWrapper<TaxType>;
  TaxableObject: ResolverTypeWrapper<Omit<TaxableObject, 'channel' | 'lines' | 'sourceObject'> & { channel: ResolversTypes['Channel'], lines: Array<ResolversTypes['TaxableObjectLine']>, sourceObject: ResolversTypes['TaxSourceObject'] }>;
  TaxableObjectDiscount: ResolverTypeWrapper<TaxableObjectDiscount>;
  TaxableObjectLine: ResolverTypeWrapper<Omit<TaxableObjectLine, 'sourceLine'> & { sourceLine: ResolversTypes['TaxSourceLine'] }>;
  TaxedMoney: ResolverTypeWrapper<TaxedMoney>;
  TaxedMoneyRange: ResolverTypeWrapper<TaxedMoneyRange>;
  TempoNode: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['TempoNode']>;
  Thumbnail: ResolverTypeWrapper<Thumbnail>;
  ThumbnailFormat: ThumbnailFormat;
  TimePeriod: ResolverTypeWrapper<TimePeriod>;
  TimePeriodInputType: TimePeriodInputType;
  TimePeriodType: TimePeriodType;
  TokenVerificationMutationResult: ResolverTypeWrapper<Omit<TokenVerificationMutationResult, 'errors' | 'payload' | 'user'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, payload: ResolversTypes['JWT'], user: ResolversTypes['User'] }>;
  Transaction: ResolverTypeWrapper<Omit<Transaction, 'payment'> & { payment: ResolversTypes['Payment'] }>;
  TransactionAction: ResolverTypeWrapper<Omit<TransactionAction, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'] }>;
  TransactionActionRequest: ResolverTypeWrapper<Omit<TransactionActionRequest, 'action' | 'issuingPrincipal' | 'recipient' | 'transaction'> & { action: ResolversTypes['TransactionAction'], issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], transaction: ResolversTypes['TransactionItem'] }>;
  TransactionActionType: TransactionActionType;
  TransactionCreationInput: TransactionCreationInput;
  TransactionCreationMutationErrorCode: TransactionCreationMutationErrorCode;
  TransactionEvent: ResolverTypeWrapper<TransactionEvent>;
  TransactionEventInput: TransactionEventInput;
  TransactionItem: ResolverTypeWrapper<Omit<TransactionItem, 'events' | 'metadata' | 'order' | 'privateMetadata'> & { events: Array<ResolversTypes['TransactionEvent']>, metadata: Array<ResolversTypes['MetadataItem']>, order?: Maybe<ResolversTypes['Order']>, privateMetadata: Array<ResolversTypes['MetadataItem']> }>;
  TransactionItemMetadataUpdated: ResolverTypeWrapper<Omit<TransactionItemMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'transaction'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], transaction: ResolversTypes['TransactionItem'] }>;
  TransactionItemMutationResult: ResolverTypeWrapper<Omit<TransactionItemMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['TransactionItem'] }>;
  TransactionKind: TransactionKind;
  TransactionRequestActionErrorCode: TransactionRequestActionErrorCode;
  TransactionStatus: TransactionStatus;
  TransactionUpdateErrorCode: TransactionUpdateErrorCode;
  TransactionUpdateInput: TransactionUpdateInput;
  TranslatableItem: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TranslatableItem']>;
  TranslatableItemConnection: ResolverTypeWrapper<Omit<TranslatableItemConnection, 'edges'> & { edges: Array<ResolversTypes['TranslatableItemEdge']> }>;
  TranslatableItemEdge: ResolverTypeWrapper<Omit<TranslatableItemEdge, 'node'> & { node: ResolversTypes['TranslatableItem'] }>;
  TranslatableKinds: TranslatableKinds;
  TranslationBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['TranslationBase']>;
  TranslationCreated: ResolverTypeWrapper<Omit<TranslationCreated, 'issuingPrincipal' | 'recipient' | 'translation'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], translation: ResolversTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] }>;
  TranslationErrorCode: TranslationErrorCode;
  TranslationInput: TranslationInput;
  TranslationUpdated: ResolverTypeWrapper<Omit<TranslationUpdated, 'issuingPrincipal' | 'recipient' | 'translation'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], translation: ResolversTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] }>;
  UpdateInvoiceInput: UpdateInvoiceInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  UploadErrorCode: UploadErrorCode;
  User: ResolverTypeWrapper<Omit<User, 'avatar' | 'checkout' | 'checkouts' | 'editableGroups' | 'events' | 'giftCards' | 'groups' | 'metadata' | 'orders' | 'privateMetadata' | 'storedPaymentSources' | 'userPermissions'> & { avatar?: Maybe<ResolversTypes['Image']>, checkout?: Maybe<ResolversTypes['Checkout']>, checkouts: ResolversTypes['CheckoutNodeConnection'], editableGroups: Array<ResolversTypes['Group']>, events: Array<ResolversTypes['AccountEvent']>, giftCards: ResolversTypes['GiftCardNodeConnection'], groups: Array<ResolversTypes['Group']>, metadata: Array<ResolversTypes['MetadataItem']>, orders: ResolversTypes['OrderNodeConnection'], privateMetadata: Array<ResolversTypes['MetadataItem']>, storedPaymentSources: Array<ResolversTypes['PaymentSource']>, userPermissions: Array<ResolversTypes['UserPermission']> }>;
  UserBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['UserBase']>;
  UserBulkMutationResult: ResolverTypeWrapper<Omit<UserBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, objects: Array<ResolversTypes['User']> }>;
  UserConnection: ResolverTypeWrapper<Omit<UserConnection, 'edges'> & { edges: Array<ResolversTypes['UserEdge']> }>;
  UserCreationInput: UserCreationInput;
  UserCreationResult: ResolverTypeWrapper<Omit<UserCreationResult, 'errors' | 'user'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, user: ResolversTypes['User'] }>;
  UserEdge: ResolverTypeWrapper<Omit<UserEdge, 'node'> & { node: ResolversTypes['User'] }>;
  UserMutationResult: ResolverTypeWrapper<Omit<UserMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['User'] }>;
  UserOrdering: UserOrdering;
  UserOrderingInput: UserOrderingInput;
  UserPermission: ResolverTypeWrapper<Omit<UserPermission, 'sourceGroups'> & { sourceGroups?: Maybe<Array<ResolversTypes['Group']>> }>;
  UserUpdateInput: UserUpdateInput;
  Usercreationinput: Usercreationinput;
  VAT: ResolverTypeWrapper<Vat>;
  Value: ResolverTypeWrapper<Omit<Value, 'file' | 'translation'> & { file?: Maybe<ResolversTypes['File']>, translation?: Maybe<ResolversTypes['ValueTranslation']> }>;
  ValueBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ValueBase']>;
  ValueConnection: ResolverTypeWrapper<Omit<ValueConnection, 'edges'> & { edges: Array<ResolversTypes['ValueEdge']> }>;
  ValueCreated: ResolverTypeWrapper<Omit<ValueCreated, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], value: ResolversTypes['Value'] }>;
  ValueCreationInput: ValueCreationInput;
  ValueDeleted: ResolverTypeWrapper<Omit<ValueDeleted, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], value: ResolversTypes['Value'] }>;
  ValueEdge: ResolverTypeWrapper<Omit<ValueEdge, 'node'> & { node: ResolversTypes['Value'] }>;
  ValueFilter: ValueFilter;
  ValueInput: ValueInput;
  ValueMutationResult: ResolverTypeWrapper<Omit<ValueMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Value'] }>;
  ValueSelectableTypeInput: ValueSelectableTypeInput;
  ValueTranslation: ResolverTypeWrapper<Omit<ValueTranslation, 'attribute' | 'value'> & { attribute: ResolversTypes['Attribute'], value: ResolversTypes['Value'] }>;
  ValueTranslationInput: ValueTranslationInput;
  ValueUpdateInput: ValueUpdateInput;
  ValueUpdated: ResolverTypeWrapper<Omit<ValueUpdated, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], value: ResolversTypes['Value'] }>;
  Void: ResolverTypeWrapper<Scalars['Void']['output']>;
  VolumeUnit: VolumeUnit;
  Voucher: ResolverTypeWrapper<Omit<Voucher, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<ResolversTypes['VoucherChannelListing']>, collections: ResolversTypes['CollectionConnection'], metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, products: ResolversTypes['ProductNodeConnection'], translation?: Maybe<ResolversTypes['VoucherTranslation']> }>;
  VoucherBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['VoucherBase']>;
  VoucherChannelListing: ResolverTypeWrapper<Omit<VoucherChannelListing, 'channel'> & { channel: ResolversTypes['Channel'] }>;
  VoucherChannelListingAddInput: VoucherChannelListingAddInput;
  VoucherChannelListingInput: VoucherChannelListingInput;
  VoucherConnection: ResolverTypeWrapper<Omit<VoucherConnection, 'edges'> & { edges: Array<ResolversTypes['VoucherEdge']> }>;
  VoucherCreated: ResolverTypeWrapper<Omit<VoucherCreated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], voucher: ResolversTypes['Voucher'] }>;
  VoucherDeleted: ResolverTypeWrapper<Omit<VoucherDeleted, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], voucher: ResolversTypes['Voucher'] }>;
  VoucherDiscountType: VoucherDiscountType;
  VoucherEdge: ResolverTypeWrapper<Omit<VoucherEdge, 'node'> & { node: ResolversTypes['Voucher'] }>;
  VoucherFilter: VoucherFilter;
  VoucherInput: VoucherInput;
  VoucherMetadataUpdated: ResolverTypeWrapper<Omit<VoucherMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], voucher: ResolversTypes['Voucher'] }>;
  VoucherMutationResult: ResolverTypeWrapper<Omit<VoucherMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Voucher'] }>;
  VoucherOrdering: VoucherOrdering;
  VoucherOrderingInput: VoucherOrderingInput;
  VoucherTranslation: ResolverTypeWrapper<Omit<VoucherTranslation, 'voucher'> & { voucher: ResolversTypes['Voucher'] }>;
  VoucherType: VoucherType;
  VoucherUpdated: ResolverTypeWrapper<Omit<VoucherUpdated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], voucher: ResolversTypes['Voucher'] }>;
  Warehouse: ResolverTypeWrapper<Omit<Warehouse, 'metadata' | 'privateMetadata' | 'shippingZones'> & { metadata: Array<ResolversTypes['MetadataItem']>, privateMetadata: Array<ResolversTypes['MetadataItem']>, shippingZones: ResolversTypes['ShippingZoneConnection'] }>;
  WarehouseBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['WarehouseBase']>;
  WarehouseClickAndCollectOption: WarehouseClickAndCollectOption;
  WarehouseConnection: ResolverTypeWrapper<Omit<WarehouseConnection, 'edges'> & { edges: Array<ResolversTypes['WarehouseEdge']> }>;
  WarehouseCreated: ResolverTypeWrapper<Omit<WarehouseCreated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], warehouse: ResolversTypes['Warehouse'] }>;
  WarehouseCreationInput: WarehouseCreationInput;
  WarehouseDeleted: ResolverTypeWrapper<Omit<WarehouseDeleted, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], warehouse: ResolversTypes['Warehouse'] }>;
  WarehouseEdge: ResolverTypeWrapper<Omit<WarehouseEdge, 'node'> & { node: ResolversTypes['Warehouse'] }>;
  WarehouseError: ResolverTypeWrapper<WarehouseError>;
  WarehouseErrorCode: WarehouseErrorCode;
  WarehouseFilter: WarehouseFilter;
  WarehouseMetadataUpdated: ResolverTypeWrapper<Omit<WarehouseMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], warehouse: ResolversTypes['Warehouse'] }>;
  WarehouseMutationResult: ResolverTypeWrapper<Omit<WarehouseMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, result: ResolversTypes['Warehouse'] }>;
  WarehouseOrdering: WarehouseOrdering;
  WarehouseOrderingInput: WarehouseOrderingInput;
  WarehouseShippingZoneAssignmentMutationResult: ResolverTypeWrapper<Omit<WarehouseShippingZoneAssignmentMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  WarehouseShippingZoneUnassignmentMutationResult: ResolverTypeWrapper<Omit<WarehouseShippingZoneUnassignmentMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>> }>;
  WarehouseUpdateInput: WarehouseUpdateInput;
  WarehouseUpdated: ResolverTypeWrapper<Omit<WarehouseUpdated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: ResolversTypes['AppUser'], recipient: ResolversTypes['App'], warehouse: ResolversTypes['Warehouse'] }>;
  Webhook: ResolverTypeWrapper<Omit<Webhook, 'app'> & { app: ResolversTypes['App'] }>;
  WebhookCreationInput: WebhookCreationInput;
  WebhookErrorCode: WebhookErrorCode;
  WebhookEventType: WebhookEventType;
  WebhookEventTypeSync: WebhookEventTypeSync;
  WebhookMutationResult: ResolverTypeWrapper<Omit<WebhookMutationResult, 'errors' | 'webhook'> & { errors?: Maybe<Array<ResolversTypes['ErrorInterface']>>, webhook: ResolversTypes['Webhook'] }>;
  WebhookSampleEventType: WebhookSampleEventType;
  WebhookUpdateInput: WebhookUpdateInput;
  Weight: ResolverTypeWrapper<Scalars['Weight']['output']>;
  WeightUnit: WeightUnit;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AbstractOrder: ResolversInterfaceTypes<ResolversParentTypes>['AbstractOrder'];
  AbstractProduct: Omit<AbstractProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<ResolversParentTypes['AbstractProduct']>, attribute: ResolversParentTypes['Attribute'], attributes: Array<ResolversParentTypes['Attribute']>, category?: Maybe<ResolversParentTypes['Category']>, channelListings: Array<ResolversParentTypes['ProductChannelListing']>, collections: Array<ResolversParentTypes['Collection']>, defaultVariant: ResolversParentTypes['Product'], digitalContent: ResolversParentTypes['DigitalContent'], imageById: ResolversParentTypes['ProductImage'], images: Array<ResolversParentTypes['ProductImage']>, media: Array<ResolversParentTypes['ProductMediaItem']>, mediaById: ResolversParentTypes['ProductMediaItem'], metadata: Array<ResolversParentTypes['MetadataItem']>, parent: ResolversParentTypes['AbstractProduct'], privateMetadata: Array<ResolversParentTypes['MetadataItem']>, productKlass: ResolversParentTypes['ProductKlass'], stocks: Array<ResolversParentTypes['Stock']>, thumbnail?: Maybe<ResolversParentTypes['Image']>, translation?: Maybe<ResolversParentTypes['ProductTranslation']>, variant: ResolversParentTypes['Product'], variants: Array<ResolversParentTypes['Product']> };
  AccountError: AccountError;
  AccountEvent: Omit<AccountEvent, 'app' | 'order' | 'orderLine' | 'user'> & { app?: Maybe<ResolversParentTypes['App']>, order: ResolversParentTypes['Order'], orderLine: ResolversParentTypes['OrderLine'], user: ResolversParentTypes['User'] };
  Address: Address;
  AddressBase: ResolversInterfaceTypes<ResolversParentTypes>['AddressBase'];
  AddressCreated: Omit<AddressCreated, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AddressDeleted: Omit<AddressDeleted, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AddressEvent: ResolversInterfaceTypes<ResolversParentTypes>['AddressEvent'];
  AddressMutationResult: Omit<AddressMutationResult, 'errors' | 'user'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, user: ResolversParentTypes['User'] };
  AddressUpdateInput: AddressUpdateInput;
  AddressUpdated: Omit<AddressUpdated, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AddressValidationData: AddressValidationData;
  Allocation: Omit<Allocation, 'warehouse'> & { warehouse: ResolversParentTypes['Warehouse'] };
  App: Omit<App, 'metadata' | 'privateMetadata' | 'webhooks'> & { metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, webhooks: Array<ResolversParentTypes['Webhook']> };
  AppBase: ResolversInterfaceTypes<ResolversParentTypes>['AppBase'];
  AppConnection: Omit<AppConnection, 'edges'> & { edges: Array<ResolversParentTypes['AppEdge']> };
  AppDeleted: Omit<AppDeleted, 'app' | 'issuingPrincipal' | 'recipient'> & { app: ResolversParentTypes['App'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AppEdge: Omit<AppEdge, 'node'> & { node: ResolversParentTypes['App'] };
  AppError: AppError;
  AppExtension: Omit<AppExtension, 'app'> & { app: ResolversParentTypes['App'] };
  AppExtensionConnection: AppExtensionConnection;
  AppExtensionEdge: AppExtensionEdge;
  AppExtensionFilter: AppExtensionFilter;
  AppFilter: AppFilter;
  AppInput: AppInput;
  AppInstallInput: AppInstallInput;
  AppInstallation: AppInstallation;
  AppInstallationMutationResult: Omit<AppInstallationMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  AppInstalled: Omit<AppInstalled, 'app' | 'issuingPrincipal' | 'recipient'> & { app: ResolversParentTypes['App'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AppManifestExtension: AppManifestExtension;
  AppManifestWebhook: AppManifestWebhook;
  AppMutationResult: Omit<AppMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['App'] };
  AppStatusChanged: Omit<AppStatusChanged, 'app' | 'issuingPrincipal' | 'recipient'> & { app: ResolversParentTypes['App'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AppToken: AppToken;
  AppTokenInput: AppTokenInput;
  AppTokenMutationResult: Omit<AppTokenMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  AppUpdated: Omit<AppUpdated, 'app' | 'issuingPrincipal' | 'recipient'> & { app: ResolversParentTypes['App'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AppUser: ResolversUnionTypes<ResolversParentTypes>['AppUser'];
  AsyncWebhookEvent: AsyncWebhookEvent;
  Attribute: Omit<Attribute, 'metadata' | 'privateMetadata' | 'productKlasses' | 'productVariantTypes' | 'translation' | 'values'> & { metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, productKlasses: ResolversParentTypes['ProductKlassNodeConnection'], productVariantTypes: ResolversParentTypes['ProductKlassNodeConnection'], translation: ResolversParentTypes['AttributeTranslation'], values: ResolversParentTypes['ValueConnection'] };
  AttributeBase: ResolversInterfaceTypes<ResolversParentTypes>['AttributeBase'];
  AttributeChoicesOrderingInput: AttributeChoicesOrderingInput;
  AttributeConnection: Omit<AttributeConnection, 'edges'> & { edges: Array<ResolversParentTypes['AttributeEdge']> };
  AttributeCreated: Omit<AttributeCreated, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: ResolversParentTypes['Attribute'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AttributeCreationInput: AttributeCreationInput;
  AttributeDeleted: Omit<AttributeDeleted, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: ResolversParentTypes['Attribute'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AttributeEdge: Omit<AttributeEdge, 'node'> & { node: ResolversParentTypes['Attribute'] };
  AttributeFilter: AttributeFilter;
  AttributeInput: AttributeInput;
  AttributeMutationResult: Omit<AttributeMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Attribute'] };
  AttributeNodeConnection: AttributeNodeConnection;
  AttributeNodeEdge: Omit<AttributeNodeEdge, 'node'> & { node: ResolversParentTypes['Attribute'] };
  AttributeOrderingInput: AttributeOrderingInput;
  AttributeTranslation: Omit<AttributeTranslation, 'attribute'> & { attribute: ResolversParentTypes['Attribute'] };
  AttributeUpdateInput: AttributeUpdateInput;
  AttributeUpdated: Omit<AttributeUpdated, 'attribute' | 'issuingPrincipal' | 'recipient'> & { attribute: ResolversParentTypes['Attribute'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  AuthInput: AuthInput;
  AuthPluginInput: AuthPluginInput;
  AuthPluginMutationResult: Omit<AuthPluginMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  BaseMutationResult: ResolversInterfaceTypes<ResolversParentTypes>['BaseMutationResult'];
  BasePricingInfo: ResolversInterfaceTypes<ResolversParentTypes>['BasePricingInfo'];
  BaseTranslation: ResolversInterfaceTypes<ResolversParentTypes>['BaseTranslation'];
  BoolMutationResult: Omit<BoolMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  Boolean: Scalars['Boolean']['output'];
  BulkProductError: BulkProductError;
  BulkStockError: BulkStockError;
  BulkValueInput: BulkValueInput;
  CalculateTaxes: Omit<CalculateTaxes, 'issuingPrincipal' | 'recipient' | 'taxBase'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], taxBase: ResolversParentTypes['TaxableObject'] };
  CardInput: CardInput;
  CatalogueInput: CatalogueInput;
  Category: Omit<Category, 'backgroundImage' | 'metadata' | 'parent' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<ResolversParentTypes['Image']>, metadata: Array<ResolversParentTypes['MetadataItem']>, parent: ResolversParentTypes['Category'], privateMetadata: Array<ResolversParentTypes['MetadataItem']>, products: ResolversParentTypes['ProductNodeConnection'], translation?: Maybe<ResolversParentTypes['CategoryTranslation']> };
  CategoryBase: ResolversInterfaceTypes<ResolversParentTypes>['CategoryBase'];
  CategoryConnection: Omit<CategoryConnection, 'edges'> & { edges: Array<ResolversParentTypes['CategoryEdge']> };
  CategoryCreated: Omit<CategoryCreated, 'category' | 'issuingPrincipal' | 'recipient'> & { category: ResolversParentTypes['Category'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  CategoryDeleted: Omit<CategoryDeleted, 'category' | 'issuingPrincipal' | 'recipient'> & { category: ResolversParentTypes['Category'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  CategoryEdge: Omit<CategoryEdge, 'node'> & { node: ResolversParentTypes['Category'] };
  CategoryFilter: CategoryFilter;
  CategoryInput: CategoryInput;
  CategoryMutationResult: Omit<CategoryMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Category'] };
  CategoryNodeConnection: CategoryNodeConnection;
  CategoryNodeEdge: Omit<CategoryNodeEdge, 'node'> & { node: ResolversParentTypes['Category'] };
  CategoryOrderingInput: CategoryOrderingInput;
  CategoryTranslation: Omit<CategoryTranslation, 'category'> & { category: ResolversParentTypes['Category'] };
  CategoryUpdated: Omit<CategoryUpdated, 'category' | 'issuingPrincipal' | 'recipient'> & { category: ResolversParentTypes['Category'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  Channel: Omit<Channel, 'stockSettings' | 'warehouses'> & { stockSettings: ResolversParentTypes['StockSettings'], warehouses: Array<ResolversParentTypes['Warehouse']> };
  ChannelBase: ResolversInterfaceTypes<ResolversParentTypes>['ChannelBase'];
  ChannelCreated: Omit<ChannelCreated, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: ResolversParentTypes['Channel'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  ChannelCreationInput: ChannelCreationInput;
  ChannelDeleteInput: ChannelDeleteInput;
  ChannelDeleted: Omit<ChannelDeleted, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: ResolversParentTypes['Channel'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  ChannelError: ChannelError;
  ChannelMutationResult: Omit<ChannelMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Channel'] };
  ChannelReorderWarehousesMutationResult: Omit<ChannelReorderWarehousesMutationResult, 'channel' | 'errors'> & { channel: ResolversParentTypes['Channel'], errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  ChannelStatusChanged: Omit<ChannelStatusChanged, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: ResolversParentTypes['Channel'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  ChannelUpdateInput: ChannelUpdateInput;
  ChannelUpdated: Omit<ChannelUpdated, 'channel' | 'issuingPrincipal' | 'recipient'> & { channel: ResolversParentTypes['Channel'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  Checkout: Omit<Checkout, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<ResolversParentTypes['Warehouse']>, availableShippingMethods?: Maybe<Array<ResolversParentTypes['ShippingMethod']>>, channel: ResolversParentTypes['Channel'], events: Array<ResolversParentTypes['OrderEvent']>, fulfillmentMethod?: Maybe<ResolversParentTypes['FulfillmentMethod']>, fulfillments: Array<ResolversParentTypes['Fulfillment']>, giftCards: Array<ResolversParentTypes['GiftCard']>, invoices: Array<ResolversParentTypes['Invoice']>, lines: Array<ResolversParentTypes['CheckoutLine']>, metadata: Array<ResolversParentTypes['MetadataItem']>, payments: Array<ResolversParentTypes['Payment']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, shippingMethod?: Maybe<ResolversParentTypes['ShippingMethod']>, shippingMethods: Array<ResolversParentTypes['ShippingMethod']>, shippingTaxClassMetadata: Array<ResolversParentTypes['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<ResolversParentTypes['MetadataItem']>, transactions: Array<ResolversParentTypes['TransactionItem']>, user?: Maybe<ResolversParentTypes['User']>, voucher?: Maybe<ResolversParentTypes['Voucher']> };
  CheckoutAddressValidationRules: CheckoutAddressValidationRules;
  CheckoutBase: ResolversInterfaceTypes<ResolversParentTypes>['CheckoutBase'];
  CheckoutCompleteMutationResult: Omit<CheckoutCompleteMutationResult, 'errors' | 'order'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, order: ResolversParentTypes['Order'] };
  CheckoutConnection: Omit<CheckoutConnection, 'edges'> & { edges: Array<ResolversParentTypes['CheckoutEdge']> };
  CheckoutContactInfoUpdateInput: CheckoutContactInfoUpdateInput;
  CheckoutCreated: Omit<CheckoutCreated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: ResolversParentTypes['Checkout'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  CheckoutCreationInput: CheckoutCreationInput;
  CheckoutEdge: Omit<CheckoutEdge, 'node'> & { node: ResolversParentTypes['Checkout'] };
  CheckoutError: CheckoutError;
  CheckoutFilter: CheckoutFilter;
  CheckoutFilterShippingMethods: Omit<CheckoutFilterShippingMethods, 'checkout' | 'issuingPrincipal' | 'recipient' | 'shippingMethods'> & { checkout: ResolversParentTypes['Checkout'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], shippingMethods: Array<ResolversParentTypes['ShippingMethod']> };
  CheckoutLine: Omit<CheckoutLine, 'metadata' | 'privateMetadata' | 'product'> & { metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, product: ResolversParentTypes['ConcreteProduct'] };
  CheckoutLineConnection: Omit<CheckoutLineConnection, 'edges'> & { edges: Array<ResolversParentTypes['CheckoutLineEdge']> };
  CheckoutLineEdge: Omit<CheckoutLineEdge, 'node'> & { node: ResolversParentTypes['CheckoutLine'] };
  CheckoutLineInput: CheckoutLineInput;
  CheckoutLineUpdateInput: CheckoutLineUpdateInput;
  CheckoutMetadataUpdated: Omit<CheckoutMetadataUpdated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: ResolversParentTypes['Checkout'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  CheckoutMutationResult: Omit<CheckoutMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Checkout'] };
  CheckoutNodeConnection: Omit<CheckoutNodeConnection, 'edges'> & { edges: Array<ResolversParentTypes['CheckoutNodeEdge']> };
  CheckoutNodeEdge: Omit<CheckoutNodeEdge, 'node'> & { node: ResolversParentTypes['Checkout'] };
  CheckoutOptionalMutationResult: Omit<CheckoutOptionalMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result?: Maybe<ResolversParentTypes['Checkout']> };
  CheckoutOrderingInput: CheckoutOrderingInput;
  CheckoutPaymentMutationResult: Omit<CheckoutPaymentMutationResult, 'checkout' | 'errors' | 'payment'> & { checkout: ResolversParentTypes['Checkout'], errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, payment: ResolversParentTypes['Payment'] };
  CheckoutPointOfContactInput: CheckoutPointOfContactInput;
  CheckoutUpdated: Omit<CheckoutUpdated, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: ResolversParentTypes['Checkout'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  CheckoutValidationRules: CheckoutValidationRules;
  ChoiceValue: ChoiceValue;
  Collection: Omit<Collection, 'backgroundImage' | 'channelListings' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { backgroundImage?: Maybe<ResolversParentTypes['Image']>, channelListings: Array<ResolversParentTypes['CollectionChannelListing']>, metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, products: ResolversParentTypes['ProductConnection'], translation?: Maybe<ResolversParentTypes['CollectionTranslation']> };
  CollectionBase: ResolversInterfaceTypes<ResolversParentTypes>['CollectionBase'];
  CollectionChannelListing: Omit<CollectionChannelListing, 'channel'> & { channel: ResolversParentTypes['Channel'] };
  CollectionChannelListingError: CollectionChannelListingError;
  CollectionChannelListingMutationResult: Omit<CollectionChannelListingMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['CollectionChannelListing'] };
  CollectionChannelListingUpdateInput: CollectionChannelListingUpdateInput;
  CollectionConnection: Omit<CollectionConnection, 'edges'> & { edges: Array<ResolversParentTypes['CollectionEdge']> };
  CollectionCreated: Omit<CollectionCreated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: ResolversParentTypes['Collection'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  CollectionCreationInput: CollectionCreationInput;
  CollectionDeleted: Omit<CollectionDeleted, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: ResolversParentTypes['Collection'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  CollectionEdge: Omit<CollectionEdge, 'node'> & { node: ResolversParentTypes['Collection'] };
  CollectionFilter: CollectionFilter;
  CollectionInput: CollectionInput;
  CollectionMetadataUpdated: Omit<CollectionMetadataUpdated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: ResolversParentTypes['Collection'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  CollectionMutationResult: Omit<CollectionMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Collection'] };
  CollectionOrderingInput: CollectionOrderingInput;
  CollectionTranslation: Omit<CollectionTranslation, 'collection'> & { collection: ResolversParentTypes['Collection'] };
  CollectionUpdated: Omit<CollectionUpdated, 'collection' | 'issuingPrincipal' | 'recipient'> & { collection: ResolversParentTypes['Collection'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  ConcreteProduct: Omit<ConcreteProduct, 'ancestors' | 'attribute' | 'attributes' | 'category' | 'channelListings' | 'collections' | 'defaultVariant' | 'digitalContent' | 'imageById' | 'images' | 'media' | 'mediaById' | 'metadata' | 'parent' | 'privateMetadata' | 'productKlass' | 'stocks' | 'thumbnail' | 'translation' | 'variant' | 'variants'> & { ancestors: Array<ResolversParentTypes['AbstractProduct']>, attribute: ResolversParentTypes['Attribute'], attributes: Array<ResolversParentTypes['Attribute']>, category?: Maybe<ResolversParentTypes['Category']>, channelListings: Array<ResolversParentTypes['ProductChannelListing']>, collections: Array<ResolversParentTypes['Collection']>, defaultVariant: ResolversParentTypes['Product'], digitalContent: ResolversParentTypes['DigitalContent'], imageById: ResolversParentTypes['ProductImage'], images: Array<ResolversParentTypes['ProductImage']>, media: Array<ResolversParentTypes['ProductMediaItem']>, mediaById: ResolversParentTypes['ProductMediaItem'], metadata: Array<ResolversParentTypes['MetadataItem']>, parent: ResolversParentTypes['AbstractProduct'], privateMetadata: Array<ResolversParentTypes['MetadataItem']>, productKlass: ResolversParentTypes['ProductKlass'], stocks: Array<ResolversParentTypes['Stock']>, thumbnail?: Maybe<ResolversParentTypes['Image']>, translation?: Maybe<ResolversParentTypes['ProductTranslation']>, variant: ResolversParentTypes['Product'], variants: Array<ResolversParentTypes['Product']> };
  ConfigurationItem: ConfigurationItem;
  ConfigurationItemInput: ConfigurationItemInput;
  Coordinates: Coordinates;
  Country: Country;
  CountryFilter: CountryFilter;
  CountryRateInput: CountryRateInput;
  CountryRateUpdateInput: CountryRateUpdateInput;
  CreateOrderd: Omit<CreateOrderd, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  CreditCard: CreditCard;
  CustomerCreated: Omit<CustomerCreated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], user: ResolversParentTypes['User'] };
  CustomerFilter: CustomerFilter;
  CustomerMetadataUpdated: Omit<CustomerMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], user: ResolversParentTypes['User'] };
  CustomerUpdated: Omit<CustomerUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], user: ResolversParentTypes['User'] };
  Date: Scalars['Date']['output'];
  DateRangeInput: DateRangeInput;
  DateTime: Scalars['DateTime']['output'];
  DateTimeRangeInput: DateTimeRangeInput;
  DigitalContent: Omit<DigitalContent, 'metadata' | 'privateMetadata' | 'productVariant' | 'urls'> & { metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, productVariant: ResolversParentTypes['Product'], urls: Array<ResolversParentTypes['DigitalContentUrl']> };
  DigitalContentConnection: Omit<DigitalContentConnection, 'edges'> & { edges: Array<ResolversParentTypes['DigitalContentEdge']> };
  DigitalContentEdge: Omit<DigitalContentEdge, 'node'> & { node: ResolversParentTypes['DigitalContent'] };
  DigitalContentInput: DigitalContentInput;
  DigitalContentMutationResult: Omit<DigitalContentMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['DigitalContent'] };
  DigitalContentUploadInput: DigitalContentUploadInput;
  DigitalContentUrl: Omit<DigitalContentUrl, 'content'> & { content: ResolversParentTypes['DigitalContent'] };
  DigitalContentUrlCreationInput: DigitalContentUrlCreationInput;
  DiscountError: DiscountError;
  DraftOrderCreated: Omit<DraftOrderCreated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  DraftOrderCreationInput: DraftOrderCreationInput;
  DraftOrderDeleted: Omit<DraftOrderDeleted, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  DraftOrderInput: DraftOrderInput;
  DraftOrderUpdated: Omit<DraftOrderUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  Error: Error;
  ErrorInterface: ResolversInterfaceTypes<ResolversParentTypes>['ErrorInterface'];
  Event: ResolversInterfaceTypes<ResolversParentTypes>['Event'];
  EventDelivery: EventDelivery;
  EventDeliveryConnection: EventDeliveryConnection;
  EventDeliveryEdge: EventDeliveryEdge;
  EventDeliveryFilter: EventDeliveryFilter;
  EventDeliveryMutationResult: Omit<EventDeliveryMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  EventDeliveryOrderingInput: EventDeliveryOrderingInput;
  ExportEvent: Omit<ExportEvent, 'app' | 'user'> & { app?: Maybe<ResolversParentTypes['App']>, user?: Maybe<ResolversParentTypes['User']> };
  ExportFile: Omit<ExportFile, 'app' | 'events' | 'user'> & { app: ResolversParentTypes['App'], events: Array<ResolversParentTypes['ExportEvent']>, user: ResolversParentTypes['User'] };
  ExportFileConnection: Omit<ExportFileConnection, 'edges'> & { edges: Array<ResolversParentTypes['ExportFileEdge']> };
  ExportFileEdge: Omit<ExportFileEdge, 'node'> & { node: ResolversParentTypes['ExportFile'] };
  ExportFileFilter: ExportFileFilter;
  ExportFileMutationResult: Omit<ExportFileMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['ExportFile'] };
  ExportFileOrderingInput: ExportFileOrderingInput;
  ExportGiftCardsInput: ExportGiftCardsInput;
  ExportInfoInput: ExportInfoInput;
  ExportProductsInput: ExportProductsInput;
  ExternalAuthentication: ExternalAuthentication;
  ExternalNotificationTriggerInput: ExternalNotificationTriggerInput;
  ExternalNotificationTriggerMutationResult: Omit<ExternalNotificationTriggerMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  File: File;
  FileMutationResult: Omit<FileMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['File'] };
  Float: Scalars['Float']['output'];
  Fulfillment: Omit<Fulfillment, 'lines' | 'metadata' | 'privateMetadata' | 'warehouse'> & { lines: Array<ResolversParentTypes['FulfillmentLine']>, metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, warehouse?: Maybe<ResolversParentTypes['Warehouse']> };
  FulfillmentApproved: Omit<FulfillmentApproved, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: ResolversParentTypes['Fulfillment'], issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  FulfillmentBase: ResolversInterfaceTypes<ResolversParentTypes>['FulfillmentBase'];
  FulfillmentCancelInput: FulfillmentCancelInput;
  FulfillmentCanceled: Omit<FulfillmentCanceled, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: ResolversParentTypes['Fulfillment'], issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  FulfillmentCreated: Omit<FulfillmentCreated, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: ResolversParentTypes['Fulfillment'], issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  FulfillmentLine: Omit<FulfillmentLine, 'orderLine'> & { orderLine: ResolversParentTypes['OrderLine'] };
  FulfillmentMetadataUpdated: Omit<FulfillmentMetadataUpdated, 'fulfillment' | 'issuingPrincipal' | 'order' | 'recipient'> & { fulfillment: ResolversParentTypes['Fulfillment'], issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  FulfillmentMethod: ResolversUnionTypes<ResolversParentTypes>['FulfillmentMethod'];
  FulfillmentUpdateTrackingInput: FulfillmentUpdateTrackingInput;
  GatewayConfigLine: GatewayConfigLine;
  GiftCard: Omit<GiftCard, 'app' | 'createdBy' | 'events' | 'metadata' | 'privateMetadata' | 'product' | 'usedBy' | 'user'> & { app: ResolversParentTypes['App'], createdBy: ResolversParentTypes['User'], events: Array<ResolversParentTypes['GiftCardEvent']>, metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, product: ResolversParentTypes['Product'], usedBy: ResolversParentTypes['User'], user?: Maybe<ResolversParentTypes['User']> };
  GiftCardAddNoteInput: GiftCardAddNoteInput;
  GiftCardBase: ResolversInterfaceTypes<ResolversParentTypes>['GiftCardBase'];
  GiftCardBulkCreationInput: GiftCardBulkCreationInput;
  GiftCardBulkMutationResult: Omit<GiftCardBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, objects: Array<ResolversParentTypes['GiftCard']> };
  GiftCardConnection: Omit<GiftCardConnection, 'edges'> & { edges: Array<ResolversParentTypes['GiftCardEdge']> };
  GiftCardCreated: Omit<GiftCardCreated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversParentTypes['GiftCard'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  GiftCardCreationInput: GiftCardCreationInput;
  GiftCardDeleted: Omit<GiftCardDeleted, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversParentTypes['GiftCard'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  GiftCardEdge: Omit<GiftCardEdge, 'node'> & { node: ResolversParentTypes['GiftCard'] };
  GiftCardError: GiftCardError;
  GiftCardEvent: Omit<GiftCardEvent, 'app' | 'user'> & { app: ResolversParentTypes['App'], user: ResolversParentTypes['User'] };
  GiftCardEventBalance: GiftCardEventBalance;
  GiftCardEventFilter: GiftCardEventFilter;
  GiftCardFilter: GiftCardFilter;
  GiftCardMetadataUpdated: Omit<GiftCardMetadataUpdated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversParentTypes['GiftCard'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  GiftCardMutationResult: Omit<GiftCardMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['GiftCard'] };
  GiftCardNodeConnection: Omit<GiftCardNodeConnection, 'edges'> & { edges: Array<ResolversParentTypes['GiftCardNodeEdge']> };
  GiftCardNodeEdge: Omit<GiftCardNodeEdge, 'node'> & { node: ResolversParentTypes['GiftCard'] };
  GiftCardOrderingInput: GiftCardOrderingInput;
  GiftCardResendInput: GiftCardResendInput;
  GiftCardSettings: GiftCardSettings;
  GiftCardSettingsMutationResult: Omit<GiftCardSettingsMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  GiftCardSettingsUpdateInput: GiftCardSettingsUpdateInput;
  GiftCardStatusChanged: Omit<GiftCardStatusChanged, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversParentTypes['GiftCard'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  GiftCardTag: GiftCardTag;
  GiftCardTagConnection: GiftCardTagConnection;
  GiftCardTagEdge: GiftCardTagEdge;
  GiftCardTagFilter: GiftCardTagFilter;
  GiftCardUpdateInput: GiftCardUpdateInput;
  GiftCardUpdated: Omit<GiftCardUpdated, 'giftCard' | 'issuingPrincipal' | 'recipient'> & { giftCard: ResolversParentTypes['GiftCard'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  Giftcardmutationresult: Omit<Giftcardmutationresult, 'errors' | 'event' | 'giftCard'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, event: ResolversParentTypes['GiftCardEvent'], giftCard: ResolversParentTypes['GiftCard'] };
  GlobalID: Scalars['GlobalID']['output'];
  GoogleAddressBase: ResolversInterfaceTypes<ResolversParentTypes>['GoogleAddressBase'];
  Group: Omit<Group, 'users'> & { users: Array<ResolversParentTypes['User']> };
  GroupBase: ResolversInterfaceTypes<ResolversParentTypes>['GroupBase'];
  GroupConnection: Omit<GroupConnection, 'edges'> & { edges: Array<ResolversParentTypes['GroupEdge']> };
  GroupCreated: Omit<GroupCreated, 'group' | 'issuingPrincipal' | 'recipient'> & { group: ResolversParentTypes['Group'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  GroupCreationInput: GroupCreationInput;
  GroupDeleted: Omit<GroupDeleted, 'group' | 'issuingPrincipal' | 'recipient'> & { group: ResolversParentTypes['Group'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  GroupEdge: Omit<GroupEdge, 'node'> & { node: ResolversParentTypes['Group'] };
  GroupError: GroupError;
  GroupFilter: GroupFilter;
  GroupMutationResult: Omit<GroupMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Group'] };
  GroupOrderingInput: GroupOrderingInput;
  GroupUpdateInput: GroupUpdateInput;
  GroupUpdated: Omit<GroupUpdated, 'group' | 'issuingPrincipal' | 'recipient'> & { group: ResolversParentTypes['Group'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  ID: Scalars['ID']['output'];
  IDListMutationResult: Omit<IdListMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  Image: Image;
  Int: Scalars['Int']['output'];
  IntRangeInput: IntRangeInput;
  Invoice: Omit<Invoice, 'metadata' | 'privateMetadata'> & { metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']> };
  InvoiceBase: ResolversInterfaceTypes<ResolversParentTypes>['InvoiceBase'];
  InvoiceCreationInput: InvoiceCreationInput;
  InvoiceDeleted: Omit<InvoiceDeleted, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: ResolversParentTypes['Invoice'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  InvoiceMutationResult: Omit<InvoiceMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Invoice'] };
  InvoiceRequested: Omit<InvoiceRequested, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: ResolversParentTypes['Invoice'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  InvoiceSent: Omit<InvoiceSent, 'invoice' | 'issuingPrincipal' | 'recipient'> & { invoice: ResolversParentTypes['Invoice'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  JSONString: Scalars['JSONString']['output'];
  JWT: Omit<Jwt, 'user'> & { user: ResolversParentTypes['User'] };
  JWTMutationResult: Omit<JwtMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['JWT'] };
  Job: ResolversInterfaceTypes<ResolversParentTypes>['Job'];
  LanguageDisplay: LanguageDisplay;
  LimitInfo: LimitInfo;
  Limits: Limits;
  Manifest: Manifest;
  ManifestMutationResult: Omit<ManifestMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  MediaBase: ResolversInterfaceTypes<ResolversParentTypes>['MediaBase'];
  MediaCreated: Omit<MediaCreated, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], media: ResolversParentTypes['MediaItem'], recipient: ResolversParentTypes['App'] };
  MediaCreationInput: MediaCreationInput;
  MediaDeleted: Omit<MediaDeleted, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], media: ResolversParentTypes['MediaItem'], recipient: ResolversParentTypes['App'] };
  MediaError: MediaError;
  MediaFilter: MediaFilter;
  MediaInput: MediaInput;
  MediaItem: Omit<MediaItem, 'file' | 'metadata' | 'privateMetadata'> & { file: ResolversParentTypes['File'], metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']> };
  MediaItemConnection: Omit<MediaItemConnection, 'edges'> & { edges: Array<ResolversParentTypes['MediaItemEdge']> };
  MediaItemEdge: Omit<MediaItemEdge, 'node'> & { node: ResolversParentTypes['MediaItem'] };
  MediaItemMutationResult: Omit<MediaItemMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['MediaItem'] };
  MediaOrderingInput: MediaOrderingInput;
  MediaUpdated: Omit<MediaUpdated, 'issuingPrincipal' | 'media' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], media: ResolversParentTypes['MediaItem'], recipient: ResolversParentTypes['App'] };
  Menu: Omit<Menu, 'items' | 'metadata' | 'privateMetadata'> & { items: Array<ResolversParentTypes['MenuItem']>, metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']> };
  MenuBase: ResolversInterfaceTypes<ResolversParentTypes>['MenuBase'];
  MenuConnection: Omit<MenuConnection, 'edges'> & { edges: Array<ResolversParentTypes['MenuEdge']> };
  MenuCreated: Omit<MenuCreated, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], menu: ResolversParentTypes['Menu'], recipient: ResolversParentTypes['App'] };
  MenuCreationInput: MenuCreationInput;
  MenuDeleted: Omit<MenuDeleted, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], menu: ResolversParentTypes['Menu'], recipient: ResolversParentTypes['App'] };
  MenuEdge: Omit<MenuEdge, 'node'> & { node: ResolversParentTypes['Menu'] };
  MenuInput: MenuInput;
  MenuItem: Omit<MenuItem, 'category' | 'children' | 'collection' | 'menu' | 'metadata' | 'page' | 'parent' | 'privateMetadata' | 'translation'> & { category?: Maybe<ResolversParentTypes['Category']>, children?: Maybe<Array<ResolversParentTypes['MenuItem']>>, collection?: Maybe<ResolversParentTypes['Collection']>, menu: ResolversParentTypes['Menu'], metadata: Array<ResolversParentTypes['MetadataItem']>, page?: Maybe<ResolversParentTypes['Page']>, parent?: Maybe<ResolversParentTypes['MenuItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, translation?: Maybe<ResolversParentTypes['MenuItemTranslation']> };
  MenuItemBase: ResolversInterfaceTypes<ResolversParentTypes>['MenuItemBase'];
  MenuItemConnection: Omit<MenuItemConnection, 'edges'> & { edges: Array<ResolversParentTypes['MenuItemEdge']> };
  MenuItemCreated: Omit<MenuItemCreated, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], menuItem: ResolversParentTypes['MenuItem'], recipient: ResolversParentTypes['App'] };
  MenuItemCreationInput: MenuItemCreationInput;
  MenuItemDeleted: Omit<MenuItemDeleted, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], menuItem: ResolversParentTypes['MenuItem'], recipient: ResolversParentTypes['App'] };
  MenuItemEdge: Omit<MenuItemEdge, 'node'> & { node: ResolversParentTypes['MenuItem'] };
  MenuItemFilter: MenuItemFilter;
  MenuItemInput: MenuItemInput;
  MenuItemMoveInput: MenuItemMoveInput;
  MenuItemMutationResult: Omit<MenuItemMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['MenuItem'] };
  MenuItemOrderingInput: MenuItemOrderingInput;
  MenuItemTranslation: Omit<MenuItemTranslation, 'menuItem'> & { menuItem: ResolversParentTypes['MenuItem'] };
  MenuItemUpdated: Omit<MenuItemUpdated, 'issuingPrincipal' | 'menuItem' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], menuItem: ResolversParentTypes['MenuItem'], recipient: ResolversParentTypes['App'] };
  MenuMutationResult: Omit<MenuMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Menu'] };
  MenuOrderingInput: MenuOrderingInput;
  MenuUpdated: Omit<MenuUpdated, 'issuingPrincipal' | 'menu' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], menu: ResolversParentTypes['Menu'], recipient: ResolversParentTypes['App'] };
  Metadata: Scalars['Metadata']['output'];
  MetadataFilter: MetadataFilter;
  MetadataInput: MetadataInput;
  MetadataItem: MetadataItem;
  Money: Money;
  MoneyInput: MoneyInput;
  MoneyRange: MoneyRange;
  MoveProductInput: MoveProductInput;
  Mutation: {};
  NameTranslationInput: NameTranslationInput;
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  ObjectWithMetadata: ResolversInterfaceTypes<ResolversParentTypes>['ObjectWithMetadata'];
  ObjectWithMetadataMutationResult: Omit<ObjectWithMetadataMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['ObjectWithMetadata'] };
  Order: Omit<Order, 'availableCollectionPoints' | 'availableShippingMethods' | 'channel' | 'events' | 'fulfillmentMethod' | 'fulfillments' | 'giftCards' | 'invoices' | 'lines' | 'metadata' | 'payments' | 'privateMetadata' | 'shippingMethod' | 'shippingMethods' | 'shippingTaxClassMetadata' | 'shippingTaxClassPrivateMetadata' | 'transactions' | 'user' | 'voucher'> & { availableCollectionPoints: Array<ResolversParentTypes['Warehouse']>, availableShippingMethods?: Maybe<Array<ResolversParentTypes['ShippingMethod']>>, channel: ResolversParentTypes['Channel'], events: Array<ResolversParentTypes['OrderEvent']>, fulfillmentMethod?: Maybe<ResolversParentTypes['FulfillmentMethod']>, fulfillments: Array<ResolversParentTypes['Fulfillment']>, giftCards: Array<ResolversParentTypes['GiftCard']>, invoices: Array<ResolversParentTypes['Invoice']>, lines: Array<ResolversParentTypes['OrderLine']>, metadata: Array<ResolversParentTypes['MetadataItem']>, payments: Array<ResolversParentTypes['Payment']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, shippingMethod?: Maybe<ResolversParentTypes['ShippingMethod']>, shippingMethods: Array<ResolversParentTypes['ShippingMethod']>, shippingTaxClassMetadata: Array<ResolversParentTypes['MetadataItem']>, shippingTaxClassPrivateMetadata: Array<ResolversParentTypes['MetadataItem']>, transactions: Array<ResolversParentTypes['TransactionItem']>, user?: Maybe<ResolversParentTypes['User']>, voucher?: Maybe<ResolversParentTypes['Voucher']> };
  OrderAddNoteInput: OrderAddNoteInput;
  OrderBase: ResolversInterfaceTypes<ResolversParentTypes>['OrderBase'];
  OrderBulkMutationResult: Omit<OrderBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, objects: Array<ResolversParentTypes['Order']> };
  OrderCancelled: Omit<OrderCancelled, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  OrderConfirmed: Omit<OrderConfirmed, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  OrderConnection: Omit<OrderConnection, 'edges'> & { edges: Array<ResolversParentTypes['OrderEdge']> };
  OrderDiscount: OrderDiscount;
  OrderDiscountCommonInput: OrderDiscountCommonInput;
  OrderDraftFilter: OrderDraftFilter;
  OrderEdge: Omit<OrderEdge, 'node'> & { node: ResolversParentTypes['Order'] };
  OrderError: OrderError;
  OrderEvent: Omit<OrderEvent, 'app' | 'fulfilledItems' | 'lines' | 'relatedOrder' | 'user' | 'warehouse'> & { app: ResolversParentTypes['App'], fulfilledItems: Array<ResolversParentTypes['FulfillmentLine']>, lines: Array<ResolversParentTypes['OrderEventOrderLineObject']>, relatedOrder: ResolversParentTypes['Order'], user: ResolversParentTypes['User'], warehouse: ResolversParentTypes['Warehouse'] };
  OrderEventConnection: Omit<OrderEventConnection, 'edges'> & { edges: Array<ResolversParentTypes['OrderEventEdge']> };
  OrderEventEdge: Omit<OrderEventEdge, 'node'> & { node: ResolversParentTypes['OrderEvent'] };
  OrderEventOrderLineObject: Omit<OrderEventOrderLineObject, 'orderLine'> & { orderLine: ResolversParentTypes['OrderLine'] };
  OrderFilter: OrderFilter;
  OrderFilterShippingMethods: Omit<OrderFilterShippingMethods, 'issuingPrincipal' | 'order' | 'recipient' | 'shippingMethods'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'], shippingMethods: Array<ResolversParentTypes['ShippingMethod']> };
  OrderFulfillInput: OrderFulfillInput;
  OrderFulfillStockInput: OrderFulfillStockInput;
  OrderFulfilled: Omit<OrderFulfilled, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  OrderFulfillment: Omit<OrderFulfillment, 'fulfillment' | 'order'> & { fulfillment: ResolversParentTypes['Fulfillment'], order: ResolversParentTypes['Order'] };
  OrderFulfillmentLineInput: OrderFulfillmentLineInput;
  OrderFulfillmentMutationResult: Omit<OrderFulfillmentMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['OrderFulfillment'] };
  OrderFullyPaid: Omit<OrderFullyPaid, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  OrderInvoiceMutationResult: Omit<OrderInvoiceMutationResult, 'errors' | 'invoice' | 'order'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, invoice: ResolversParentTypes['Invoice'], order: ResolversParentTypes['Order'] };
  OrderLine: Omit<OrderLine, 'allocations' | 'digitalContentUrl' | 'metadata' | 'privateMetadata' | 'product' | 'taxClassMetadata' | 'taxClassPrivateMetadata' | 'thumbnail'> & { allocations: Array<ResolversParentTypes['Allocation']>, digitalContentUrl: ResolversParentTypes['DigitalContentUrl'], metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, product?: Maybe<ResolversParentTypes['ConcreteProduct']>, taxClassMetadata: Array<ResolversParentTypes['MetadataItem']>, taxClassPrivateMetadata: Array<ResolversParentTypes['MetadataItem']>, thumbnail?: Maybe<ResolversParentTypes['Image']> };
  OrderLineCreationInput: OrderLineCreationInput;
  OrderLineInput: OrderLineInput;
  OrderLineMutationResult: Omit<OrderLineMutationResult, 'errors' | 'order' | 'orderLine'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, order: ResolversParentTypes['Order'], orderLine: ResolversParentTypes['OrderLine'] };
  OrderLinesMutationResult: Omit<OrderLinesMutationResult, 'errors' | 'order' | 'orderLines'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, order: ResolversParentTypes['Order'], orderLines: Array<ResolversParentTypes['OrderLine']> };
  OrderMetadataUpdated: Omit<OrderMetadataUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  OrderMutationResult: Omit<OrderMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Order'] };
  OrderNodeConnection: Omit<OrderNodeConnection, 'edges'> & { edges: Array<ResolversParentTypes['OrderNodeEdge']> };
  OrderNodeEdge: Omit<OrderNodeEdge, 'node'> & { node: ResolversParentTypes['Order'] };
  OrderOrderingInput: OrderOrderingInput;
  OrderRefundFulfillmentLineInput: OrderRefundFulfillmentLineInput;
  OrderRefundLineInput: OrderRefundLineInput;
  OrderRefundProductsInput: OrderRefundProductsInput;
  OrderReturnFulfillmentLineInput: OrderReturnFulfillmentLineInput;
  OrderReturnLineInput: OrderReturnLineInput;
  OrderReturnProductsInput: OrderReturnProductsInput;
  OrderSettings: OrderSettings;
  OrderSettingsMutationResult: Omit<OrderSettingsMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  OrderSettingsUpdateInput: OrderSettingsUpdateInput;
  OrderUpdateInput: OrderUpdateInput;
  OrderUpdateShippingInput: OrderUpdateShippingInput;
  OrderUpdated: Omit<OrderUpdated, 'issuingPrincipal' | 'order' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], order: ResolversParentTypes['Order'], recipient: ResolversParentTypes['App'] };
  Ordermutationresult: Omit<Ordermutationresult, 'errors' | 'event' | 'order'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, event: ResolversParentTypes['OrderEvent'], order: ResolversParentTypes['Order'] };
  Page: Omit<Page, 'attributes' | 'metadata' | 'pageKlass' | 'privateMetadata' | 'translation'> & { attributes: Array<ResolversParentTypes['Attribute']>, metadata: Array<ResolversParentTypes['MetadataItem']>, pageKlass: ResolversParentTypes['PageKlass'], privateMetadata: Array<ResolversParentTypes['MetadataItem']>, translation?: Maybe<ResolversParentTypes['PageTranslation']> };
  PageBase: ResolversInterfaceTypes<ResolversParentTypes>['PageBase'];
  PageBulkMutationResult: Omit<PageBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, objects: Array<ResolversParentTypes['Page']> };
  PageConnection: Omit<PageConnection, 'edges'> & { edges: Array<ResolversParentTypes['PageEdge']> };
  PageCreated: Omit<PageCreated, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], page: ResolversParentTypes['Page'], recipient: ResolversParentTypes['App'] };
  PageCreationInput: PageCreationInput;
  PageDeleted: Omit<PageDeleted, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], page: ResolversParentTypes['Page'], recipient: ResolversParentTypes['App'] };
  PageEdge: Omit<PageEdge, 'node'> & { node: ResolversParentTypes['Page'] };
  PageError: PageError;
  PageFilter: PageFilter;
  PageInfo: PageInfo;
  PageInput: PageInput;
  PageKlass: Omit<PageKlass, 'attributes' | 'availableAttributes' | 'metadata' | 'privateMetadata'> & { attributes: Array<ResolversParentTypes['Attribute']>, availableAttributes: ResolversParentTypes['AttributeConnection'], metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']> };
  PageKlassBase: ResolversInterfaceTypes<ResolversParentTypes>['PageKlassBase'];
  PageKlassConnection: Omit<PageKlassConnection, 'edges'> & { edges: Array<ResolversParentTypes['PageKlassEdge']> };
  PageKlassCreated: Omit<PageKlassCreated, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], pageKlass: ResolversParentTypes['PageKlass'], recipient: ResolversParentTypes['App'] };
  PageKlassCreationInput: PageKlassCreationInput;
  PageKlassDeleted: Omit<PageKlassDeleted, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], pageKlass: ResolversParentTypes['PageKlass'], recipient: ResolversParentTypes['App'] };
  PageKlassEdge: Omit<PageKlassEdge, 'node'> & { node: ResolversParentTypes['PageKlass'] };
  PageKlassFilter: PageKlassFilter;
  PageKlassMutationResult: Omit<PageKlassMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['PageKlass'] };
  PageKlassOrderingInput: PageKlassOrderingInput;
  PageKlassUpdateInput: PageKlassUpdateInput;
  PageKlassUpdated: Omit<PageKlassUpdated, 'issuingPrincipal' | 'pageKlass' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], pageKlass: ResolversParentTypes['PageKlass'], recipient: ResolversParentTypes['App'] };
  PageMutationResult: Omit<PageMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Page'] };
  PageOrderingInput: PageOrderingInput;
  PageTranslation: Omit<PageTranslation, 'page'> & { page: ResolversParentTypes['Page'] };
  PageTranslationInput: PageTranslationInput;
  PageUpdated: Omit<PageUpdated, 'issuingPrincipal' | 'page' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], page: ResolversParentTypes['Page'], recipient: ResolversParentTypes['App'] };
  Payment: Omit<Payment, 'checkout' | 'metadata' | 'order' | 'privateMetadata' | 'transactions'> & { checkout: ResolversParentTypes['Checkout'], metadata: Array<ResolversParentTypes['MetadataItem']>, order: ResolversParentTypes['Order'], privateMetadata: Array<ResolversParentTypes['MetadataItem']>, transactions: Array<ResolversParentTypes['Transaction']> };
  PaymentAuthorize: Omit<PaymentAuthorize, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], payment: ResolversParentTypes['Payment'], recipient: ResolversParentTypes['App'] };
  PaymentBase: ResolversInterfaceTypes<ResolversParentTypes>['PaymentBase'];
  PaymentCaptureEvent: Omit<PaymentCaptureEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], payment: ResolversParentTypes['Payment'], recipient: ResolversParentTypes['App'] };
  PaymentCheckBalanceInput: PaymentCheckBalanceInput;
  PaymentCheckBalanceMutationResult: Omit<PaymentCheckBalanceMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  PaymentConfirmEvent: Omit<PaymentConfirmEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], payment: ResolversParentTypes['Payment'], recipient: ResolversParentTypes['App'] };
  PaymentConnection: Omit<PaymentConnection, 'edges'> & { edges: Array<ResolversParentTypes['PaymentEdge']> };
  PaymentEdge: Omit<PaymentEdge, 'node'> & { node: ResolversParentTypes['Payment'] };
  PaymentError: PaymentError;
  PaymentFilter: PaymentFilter;
  PaymentGateway: PaymentGateway;
  PaymentInitializeMutationResult: Omit<PaymentInitializeMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  PaymentInitialized: PaymentInitialized;
  PaymentInput: PaymentInput;
  PaymentListGateways: Omit<PaymentListGateways, 'checkout' | 'issuingPrincipal' | 'recipient'> & { checkout: ResolversParentTypes['Checkout'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  PaymentMutationResult: Omit<PaymentMutationResult, 'errors' | 'payment'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, payment: ResolversParentTypes['Payment'] };
  PaymentProcessEvent: Omit<PaymentProcessEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], payment: ResolversParentTypes['Payment'], recipient: ResolversParentTypes['App'] };
  PaymentRefundEvent: Omit<PaymentRefundEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], payment: ResolversParentTypes['Payment'], recipient: ResolversParentTypes['App'] };
  PaymentSource: Omit<PaymentSource, 'metadata'> & { metadata: Array<ResolversParentTypes['MetadataItem']> };
  PaymentVoidEvent: Omit<PaymentVoidEvent, 'issuingPrincipal' | 'payment' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], payment: ResolversParentTypes['Payment'], recipient: ResolversParentTypes['App'] };
  Permission: Permission;
  Plugin: Omit<Plugin, 'channelConfigurations' | 'globalConfiguration'> & { channelConfigurations: Array<ResolversParentTypes['PluginConfiguration']>, globalConfiguration: ResolversParentTypes['PluginConfiguration'] };
  PluginConfiguration: Omit<PluginConfiguration, 'channel'> & { channel: ResolversParentTypes['Channel'] };
  PluginConnection: Omit<PluginConnection, 'edges'> & { edges: Array<ResolversParentTypes['PluginEdge']> };
  PluginEdge: Omit<PluginEdge, 'node'> & { node: ResolversParentTypes['Plugin'] };
  PluginFilter: PluginFilter;
  PluginMutationResult: Omit<PluginMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Plugin'] };
  PluginOrderingInput: PluginOrderingInput;
  PluginStatusInChannelsInput: PluginStatusInChannelsInput;
  PluginUpdateInput: PluginUpdateInput;
  PointOfContact: PointOfContact;
  PositiveDecimal: Scalars['PositiveDecimal']['output'];
  PreorderData: PreorderData;
  PreorderSettingsInput: PreorderSettingsInput;
  PreorderThreshold: PreorderThreshold;
  PriceInput: PriceInput;
  PriceRangeInput: PriceRangeInput;
  Product: ResolversInterfaceTypes<ResolversParentTypes>['Product'];
  ProductAttributeAssignInput: ProductAttributeAssignInput;
  ProductAttributeAssignment: Omit<ProductAttributeAssignment, 'attribute'> & { attribute: ResolversParentTypes['Attribute'] };
  ProductAttributeAssignmentMutationResult: Omit<ProductAttributeAssignmentMutationResult, 'errors' | 'productKlass'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, productKlass: ResolversParentTypes['ProductKlass'] };
  ProductAttributeAssignmentUpdateInput: ProductAttributeAssignmentUpdateInput;
  ProductBackInStock: Omit<ProductBackInStock, 'category' | 'issuingPrincipal' | 'product' | 'productVariant' | 'recipient' | 'warehouse'> & { category: ResolversParentTypes['Category'], issuingPrincipal: ResolversParentTypes['AppUser'], product: ResolversParentTypes['Product'], productVariant: ResolversParentTypes['Product'], recipient: ResolversParentTypes['App'], warehouse: ResolversParentTypes['Warehouse'] };
  ProductBase: ResolversInterfaceTypes<ResolversParentTypes>['ProductBase'];
  ProductBulkCreationInput: ProductBulkCreationInput;
  ProductBulkMutationResult: Omit<ProductBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, objects: Array<ResolversParentTypes['Product']> };
  ProductChannelListing: Omit<ProductChannelListing, 'channel'> & { channel: ResolversParentTypes['Channel'] };
  ProductChannelListingAddInput: ProductChannelListingAddInput;
  ProductChannelListingError: ProductChannelListingError;
  ProductConnection: Omit<ProductConnection, 'edges'> & { edges: Array<ResolversParentTypes['ProductEdge']> };
  ProductCreated: Omit<ProductCreated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: ResolversParentTypes['Category'], issuingPrincipal: ResolversParentTypes['AppUser'], product: ResolversParentTypes['Product'], recipient: ResolversParentTypes['App'] };
  ProductCreationInput: ProductCreationInput;
  ProductDeleted: Omit<ProductDeleted, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: ResolversParentTypes['Category'], issuingPrincipal: ResolversParentTypes['AppUser'], product: ResolversParentTypes['Product'], recipient: ResolversParentTypes['App'] };
  ProductEdge: Omit<ProductEdge, 'node'> & { node: ResolversParentTypes['Product'] };
  ProductError: ProductError;
  ProductFilter: ProductFilter;
  ProductImage: Omit<ProductImage, 'url'> & { url?: Maybe<ResolversParentTypes['Image']> };
  ProductInput: ProductInput;
  ProductKlass: Omit<ProductKlass, 'metadata' | 'privateMetadata' | 'productAttributes' | 'productVariantAttributeAssignments' | 'products' | 'variantAttributes'> & { metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, productAttributes: Array<ResolversParentTypes['Attribute']>, productVariantAttributeAssignments: Array<ResolversParentTypes['ProductAttributeAssignment']>, products: ResolversParentTypes['ProductNodeConnection'], variantAttributes: Array<ResolversParentTypes['Attribute']> };
  ProductKlassConnection: Omit<ProductKlassConnection, 'edges'> & { edges: Array<ResolversParentTypes['ProductKlassEdge']> };
  ProductKlassEdge: Omit<ProductKlassEdge, 'node'> & { node: ResolversParentTypes['ProductKlass'] };
  ProductKlassFilter: ProductKlassFilter;
  ProductKlassInput: ProductKlassInput;
  ProductKlassMutationResult: Omit<ProductKlassMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['ProductKlass'] };
  ProductKlassNodeConnection: Omit<ProductKlassNodeConnection, 'edges'> & { edges: Array<ResolversParentTypes['ProductKlassNodeEdge']> };
  ProductKlassNodeEdge: Omit<ProductKlassNodeEdge, 'node'> & { node: ResolversParentTypes['ProductKlass'] };
  ProductKlassOrderingInput: ProductKlassOrderingInput;
  ProductMediaAssignmentMutationResult: Omit<ProductMediaAssignmentMutationResult, 'errors' | 'mediaItem' | 'product'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, mediaItem: ResolversParentTypes['ProductMediaItem'], product: ResolversParentTypes['Product'] };
  ProductMediaCreationInput: ProductMediaCreationInput;
  ProductMediaItem: Omit<ProductMediaItem, 'mediaItem'> & { mediaItem: ResolversParentTypes['MediaItem'] };
  ProductMediaMutationResult: Omit<ProductMediaMutationResult, 'errors' | 'media' | 'product'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, media: ResolversParentTypes['ProductMediaItem'], product: ResolversParentTypes['Product'] };
  ProductMediaUnassignmentMutationResult: Omit<ProductMediaUnassignmentMutationResult, 'errors' | 'mediaItem' | 'product'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, mediaItem: ResolversParentTypes['ProductMediaItem'], product: ResolversParentTypes['Product'] };
  ProductMediaUpdateInput: ProductMediaUpdateInput;
  ProductMetadataUpdated: Omit<ProductMetadataUpdated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: ResolversParentTypes['Category'], issuingPrincipal: ResolversParentTypes['AppUser'], product: ResolversParentTypes['Product'], recipient: ResolversParentTypes['App'] };
  ProductMutationResult: Omit<ProductMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Product'] };
  ProductNodeConnection: Omit<ProductNodeConnection, 'edges'> & { edges: Array<ResolversParentTypes['ProductNodeEdge']> };
  ProductNodeEdge: Omit<ProductNodeEdge, 'node'> & { node: ResolversParentTypes['Product'] };
  ProductOrderingInput: ProductOrderingInput;
  ProductOutOfStock: Omit<ProductOutOfStock, 'category' | 'issuingPrincipal' | 'product' | 'productVariant' | 'recipient' | 'warehouse'> & { category: ResolversParentTypes['Category'], issuingPrincipal: ResolversParentTypes['AppUser'], product: ResolversParentTypes['Product'], productVariant: ResolversParentTypes['Product'], recipient: ResolversParentTypes['App'], warehouse: ResolversParentTypes['Warehouse'] };
  ProductPreorderDeactivationMutationResult: Omit<ProductPreorderDeactivationMutationResult, 'errors' | 'productVariant'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, productVariant: ResolversParentTypes['Product'] };
  ProductPricingInfo: ProductPricingInfo;
  ProductStockFilter: ProductStockFilter;
  ProductTranslation: Omit<ProductTranslation, 'product' | 'values'> & { product: ResolversParentTypes['Product'], values: Array<ResolversParentTypes['ValueTranslation']> };
  ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation: ResolversUnionTypes<ResolversParentTypes>['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'];
  ProductUpdated: Omit<ProductUpdated, 'category' | 'issuingPrincipal' | 'product' | 'recipient'> & { category: ResolversParentTypes['Category'], issuingPrincipal: ResolversParentTypes['AppUser'], product: ResolversParentTypes['Product'], recipient: ResolversParentTypes['App'] };
  ProductWithoutVariantError: ProductWithoutVariantError;
  PublishableChannelListingInput: PublishableChannelListingInput;
  Query: {};
  ReducedRate: ReducedRate;
  ReorderInput: ReorderInput;
  Sale: Omit<Sale, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<ResolversParentTypes['SaleChannelListing']>, collections: ResolversParentTypes['CollectionConnection'], metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, products: ResolversParentTypes['ProductNodeConnection'], translation?: Maybe<ResolversParentTypes['SaleTranslation']> };
  SaleBase: ResolversInterfaceTypes<ResolversParentTypes>['SaleBase'];
  SaleChannelListing: Omit<SaleChannelListing, 'channel'> & { channel: ResolversParentTypes['Channel'] };
  SaleChannelListingAddInput: SaleChannelListingAddInput;
  SaleChannelListingInput: SaleChannelListingInput;
  SaleConnection: Omit<SaleConnection, 'edges'> & { edges: Array<ResolversParentTypes['SaleEdge']> };
  SaleCreated: Omit<SaleCreated, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], sale: ResolversParentTypes['Sale'] };
  SaleDeleted: Omit<SaleDeleted, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], sale: ResolversParentTypes['Sale'] };
  SaleEdge: Omit<SaleEdge, 'node'> & { node: ResolversParentTypes['Sale'] };
  SaleFilter: SaleFilter;
  SaleInput: SaleInput;
  SaleMutationResult: Omit<SaleMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Sale'] };
  SaleOrderingInput: SaleOrderingInput;
  SaleToggle: Omit<SaleToggle, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], sale: ResolversParentTypes['Sale'] };
  SaleTranslation: Omit<SaleTranslation, 'sale'> & { sale: ResolversParentTypes['Sale'] };
  SaleUpdated: Omit<SaleUpdated, 'issuingPrincipal' | 'recipient' | 'sale'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], sale: ResolversParentTypes['Sale'] };
  SeoInput: SeoInput;
  ShippingError: ShippingError;
  ShippingListMethodsForCheckout: Omit<ShippingListMethodsForCheckout, 'checkout' | 'issuingPrincipal' | 'recipient' | 'shippingMethods'> & { checkout: ResolversParentTypes['Checkout'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], shippingMethods: Array<ResolversParentTypes['ShippingMethod']> };
  ShippingMethod: Omit<ShippingMethod, 'channelListings' | 'excludedProducts' | 'metadata' | 'privateMetadata' | 'translation'> & { channelListings: Array<ResolversParentTypes['ShippingMethodChannelListing']>, excludedProducts: ResolversParentTypes['ProductConnection'], metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, translation?: Maybe<ResolversParentTypes['ShippingMethodTranslation']> };
  ShippingMethodChannelListing: Omit<ShippingMethodChannelListing, 'channel'> & { channel: ResolversParentTypes['Channel'] };
  ShippingMethodChannelListingAddInput: ShippingMethodChannelListingAddInput;
  ShippingMethodChannelListingInput: ShippingMethodChannelListingInput;
  ShippingMethodChannelListingMutationResult: Omit<ShippingMethodChannelListingMutationResult, 'channelListing' | 'errors' | 'shippingMethod'> & { channelListing: ResolversParentTypes['ShippingMethodChannelListing'], errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, shippingMethod: ResolversParentTypes['ShippingMethod'] };
  ShippingMethodMutationResult: Omit<ShippingMethodMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['ShippingMethod'] };
  ShippingMethodPostalCodeRule: ShippingMethodPostalCodeRule;
  ShippingMethodTranslation: Omit<ShippingMethodTranslation, 'shippingMethod'> & { shippingMethod: ResolversParentTypes['ShippingMethod'] };
  ShippingPostalCodeRulesCreationInputRange: ShippingPostalCodeRulesCreationInputRange;
  ShippingPrice: Omit<ShippingPrice, 'shippingMethod' | 'shippingZone'> & { shippingMethod: ResolversParentTypes['ShippingMethod'], shippingZone: ResolversParentTypes['ShippingZone'] };
  ShippingPriceBase: ResolversInterfaceTypes<ResolversParentTypes>['ShippingPriceBase'];
  ShippingPriceCreated: Omit<ShippingPriceCreated, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], shippingMethod: ResolversParentTypes['ShippingMethod'], shippingZone: ResolversParentTypes['ShippingZone'] };
  ShippingPriceDeleted: Omit<ShippingPriceDeleted, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], shippingMethod: ResolversParentTypes['ShippingMethod'], shippingZone: ResolversParentTypes['ShippingZone'] };
  ShippingPriceExcludeProductsInput: ShippingPriceExcludeProductsInput;
  ShippingPriceInput: ShippingPriceInput;
  ShippingPriceMutationResult: Omit<ShippingPriceMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['ShippingPrice'] };
  ShippingPriceRemoveProductFromExcludeMutationResult: Omit<ShippingPriceRemoveProductFromExcludeMutationResult, 'errors' | 'shippingMethod'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, shippingMethod: ResolversParentTypes['ShippingMethod'] };
  ShippingPriceTranslationInput: ShippingPriceTranslationInput;
  ShippingPriceUpdated: Omit<ShippingPriceUpdated, 'issuingPrincipal' | 'recipient' | 'shippingMethod' | 'shippingZone'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], shippingMethod: ResolversParentTypes['ShippingMethod'], shippingZone: ResolversParentTypes['ShippingZone'] };
  ShippingZone: Omit<ShippingZone, 'channels' | 'metadata' | 'privateMetadata' | 'shippingMethods' | 'warehouses'> & { channels: Array<ResolversParentTypes['Channel']>, metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, shippingMethods: Array<ResolversParentTypes['ShippingMethod']>, warehouses: Array<ResolversParentTypes['Warehouse']> };
  ShippingZoneBase: ResolversInterfaceTypes<ResolversParentTypes>['ShippingZoneBase'];
  ShippingZoneConnection: Omit<ShippingZoneConnection, 'edges'> & { edges: Array<ResolversParentTypes['ShippingZoneEdge']> };
  ShippingZoneCreated: Omit<ShippingZoneCreated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], shippingZone: ResolversParentTypes['ShippingZone'] };
  ShippingZoneCreationInput: ShippingZoneCreationInput;
  ShippingZoneDeleted: Omit<ShippingZoneDeleted, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], shippingZone: ResolversParentTypes['ShippingZone'] };
  ShippingZoneEdge: Omit<ShippingZoneEdge, 'node'> & { node: ResolversParentTypes['ShippingZone'] };
  ShippingZoneFilter: ShippingZoneFilter;
  ShippingZoneMetadataUpdated: Omit<ShippingZoneMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], shippingZone: ResolversParentTypes['ShippingZone'] };
  ShippingZoneMutationResult: Omit<ShippingZoneMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['ShippingZone'] };
  ShippingZoneUpdateInput: ShippingZoneUpdateInput;
  ShippingZoneUpdated: Omit<ShippingZoneUpdated, 'issuingPrincipal' | 'recipient' | 'shippingZone'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], shippingZone: ResolversParentTypes['ShippingZone'] };
  ShopSettingsUpdateInput: ShopSettingsUpdateInput;
  Site: Omit<Site, 'availableShippingMethods' | 'logo' | 'staffNotificationRecipients'> & { availableShippingMethods?: Maybe<Array<ResolversParentTypes['ShippingMethod']>>, logo?: Maybe<ResolversParentTypes['Image']>, staffNotificationRecipients?: Maybe<Array<ResolversParentTypes['StaffNotificationRecipient']>> };
  SiteDomainInput: SiteDomainInput;
  SiteMutationResult: Omit<SiteMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Site'] };
  SiteTranslation: SiteTranslation;
  SiteTranslationInput: SiteTranslationInput;
  SiteTranslationMutationResult: Omit<SiteTranslationMutationResult, 'errors' | 'shop'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, shop: ResolversParentTypes['Site'] };
  Size: Size;
  StaffCreated: Omit<StaffCreated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], user: ResolversParentTypes['User'] };
  StaffCreationInput: StaffCreationInput;
  StaffDeleted: Omit<StaffDeleted, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], user: ResolversParentTypes['User'] };
  StaffError: StaffError;
  StaffNotificationRecipient: Omit<StaffNotificationRecipient, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  StaffNotificationRecipientInput: StaffNotificationRecipientInput;
  StaffNotificationRecipientMutationResult: Omit<StaffNotificationRecipientMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['StaffNotificationRecipient'] };
  StaffUpdateInput: StaffUpdateInput;
  StaffUpdated: Omit<StaffUpdated, 'issuingPrincipal' | 'recipient' | 'user'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], user: ResolversParentTypes['User'] };
  StaffUserFilter: StaffUserFilter;
  Stock: Omit<Stock, 'productVariant' | 'warehouse'> & { productVariant: ResolversParentTypes['Product'], warehouse: ResolversParentTypes['Warehouse'] };
  StockConnection: Omit<StockConnection, 'edges'> & { edges: Array<ResolversParentTypes['StockEdge']> };
  StockEdge: Omit<StockEdge, 'node'> & { node: ResolversParentTypes['Stock'] };
  StockFilter: StockFilter;
  StockInput: StockInput;
  StockSettings: StockSettings;
  StockSettingsInput: StockSettingsInput;
  String: Scalars['String']['output'];
  Subscription: {};
  SyncWebhookEvent: SyncWebhookEvent;
  TaxClass: Omit<TaxClass, 'metadata' | 'privateMetadata'> & { metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']> };
  TaxClassConnection: TaxClassConnection;
  TaxClassCountryRate: TaxClassCountryRate;
  TaxClassCreateError: TaxClassCreateError;
  TaxClassCreationInput: TaxClassCreationInput;
  TaxClassDeleteError: TaxClassDeleteError;
  TaxClassEdge: TaxClassEdge;
  TaxClassFilter: TaxClassFilter;
  TaxClassMutationResult: Omit<TaxClassMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  TaxClassOrderingInput: TaxClassOrderingInput;
  TaxClassRateInput: TaxClassRateInput;
  TaxClassUpdateError: TaxClassUpdateError;
  TaxClassUpdateInput: TaxClassUpdateInput;
  TaxConfiguration: Omit<TaxConfiguration, 'channel' | 'metadata' | 'privateMetadata'> & { channel: ResolversParentTypes['Channel'], metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']> };
  TaxConfigurationConnection: Omit<TaxConfigurationConnection, 'edges'> & { edges: Array<ResolversParentTypes['TaxConfigurationEdge']> };
  TaxConfigurationEdge: Omit<TaxConfigurationEdge, 'node'> & { node: ResolversParentTypes['TaxConfiguration'] };
  TaxConfigurationFilter: TaxConfigurationFilter;
  TaxConfigurationMutationResult: Omit<TaxConfigurationMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['TaxConfiguration'] };
  TaxConfigurationPerCountry: TaxConfigurationPerCountry;
  TaxConfigurationPerCountryInput: TaxConfigurationPerCountryInput;
  TaxConfigurationUpdateError: TaxConfigurationUpdateError;
  TaxConfigurationUpdateInput: TaxConfigurationUpdateInput;
  TaxCountryConfiguration: TaxCountryConfiguration;
  TaxCountryConfigurationMutationResult: Omit<TaxCountryConfigurationMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  TaxCountryConfigurationUpdateError: TaxCountryConfigurationUpdateError;
  TaxSourceLine: ResolversUnionTypes<ResolversParentTypes>['TaxSourceLine'];
  TaxSourceObject: ResolversUnionTypes<ResolversParentTypes>['TaxSourceObject'];
  TaxSourceObjectMutationResult: Omit<TaxSourceObjectMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['TaxSourceObject'] };
  TaxType: TaxType;
  TaxableObject: Omit<TaxableObject, 'channel' | 'lines' | 'sourceObject'> & { channel: ResolversParentTypes['Channel'], lines: Array<ResolversParentTypes['TaxableObjectLine']>, sourceObject: ResolversParentTypes['TaxSourceObject'] };
  TaxableObjectDiscount: TaxableObjectDiscount;
  TaxableObjectLine: Omit<TaxableObjectLine, 'sourceLine'> & { sourceLine: ResolversParentTypes['TaxSourceLine'] };
  TaxedMoney: TaxedMoney;
  TaxedMoneyRange: TaxedMoneyRange;
  TempoNode: ResolversInterfaceTypes<ResolversParentTypes>['TempoNode'];
  Thumbnail: Thumbnail;
  TimePeriod: TimePeriod;
  TimePeriodInputType: TimePeriodInputType;
  TokenVerificationMutationResult: Omit<TokenVerificationMutationResult, 'errors' | 'payload' | 'user'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, payload: ResolversParentTypes['JWT'], user: ResolversParentTypes['User'] };
  Transaction: Omit<Transaction, 'payment'> & { payment: ResolversParentTypes['Payment'] };
  TransactionAction: Omit<TransactionAction, 'issuingPrincipal' | 'recipient'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'] };
  TransactionActionRequest: Omit<TransactionActionRequest, 'action' | 'issuingPrincipal' | 'recipient' | 'transaction'> & { action: ResolversParentTypes['TransactionAction'], issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], transaction: ResolversParentTypes['TransactionItem'] };
  TransactionCreationInput: TransactionCreationInput;
  TransactionEvent: TransactionEvent;
  TransactionEventInput: TransactionEventInput;
  TransactionItem: Omit<TransactionItem, 'events' | 'metadata' | 'order' | 'privateMetadata'> & { events: Array<ResolversParentTypes['TransactionEvent']>, metadata: Array<ResolversParentTypes['MetadataItem']>, order?: Maybe<ResolversParentTypes['Order']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']> };
  TransactionItemMetadataUpdated: Omit<TransactionItemMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'transaction'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], transaction: ResolversParentTypes['TransactionItem'] };
  TransactionItemMutationResult: Omit<TransactionItemMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['TransactionItem'] };
  TransactionUpdateInput: TransactionUpdateInput;
  TranslatableItem: ResolversUnionTypes<ResolversParentTypes>['TranslatableItem'];
  TranslatableItemConnection: Omit<TranslatableItemConnection, 'edges'> & { edges: Array<ResolversParentTypes['TranslatableItemEdge']> };
  TranslatableItemEdge: Omit<TranslatableItemEdge, 'node'> & { node: ResolversParentTypes['TranslatableItem'] };
  TranslationBase: ResolversInterfaceTypes<ResolversParentTypes>['TranslationBase'];
  TranslationCreated: Omit<TranslationCreated, 'issuingPrincipal' | 'recipient' | 'translation'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], translation: ResolversParentTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] };
  TranslationInput: TranslationInput;
  TranslationUpdated: Omit<TranslationUpdated, 'issuingPrincipal' | 'recipient' | 'translation'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], translation: ResolversParentTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] };
  UpdateInvoiceInput: UpdateInvoiceInput;
  Upload: Scalars['Upload']['output'];
  User: Omit<User, 'avatar' | 'checkout' | 'checkouts' | 'editableGroups' | 'events' | 'giftCards' | 'groups' | 'metadata' | 'orders' | 'privateMetadata' | 'storedPaymentSources' | 'userPermissions'> & { avatar?: Maybe<ResolversParentTypes['Image']>, checkout?: Maybe<ResolversParentTypes['Checkout']>, checkouts: ResolversParentTypes['CheckoutNodeConnection'], editableGroups: Array<ResolversParentTypes['Group']>, events: Array<ResolversParentTypes['AccountEvent']>, giftCards: ResolversParentTypes['GiftCardNodeConnection'], groups: Array<ResolversParentTypes['Group']>, metadata: Array<ResolversParentTypes['MetadataItem']>, orders: ResolversParentTypes['OrderNodeConnection'], privateMetadata: Array<ResolversParentTypes['MetadataItem']>, storedPaymentSources: Array<ResolversParentTypes['PaymentSource']>, userPermissions: Array<ResolversParentTypes['UserPermission']> };
  UserBase: ResolversInterfaceTypes<ResolversParentTypes>['UserBase'];
  UserBulkMutationResult: Omit<UserBulkMutationResult, 'errors' | 'objects'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, objects: Array<ResolversParentTypes['User']> };
  UserConnection: Omit<UserConnection, 'edges'> & { edges: Array<ResolversParentTypes['UserEdge']> };
  UserCreationInput: UserCreationInput;
  UserCreationResult: Omit<UserCreationResult, 'errors' | 'user'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, user: ResolversParentTypes['User'] };
  UserEdge: Omit<UserEdge, 'node'> & { node: ResolversParentTypes['User'] };
  UserMutationResult: Omit<UserMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['User'] };
  UserOrderingInput: UserOrderingInput;
  UserPermission: Omit<UserPermission, 'sourceGroups'> & { sourceGroups?: Maybe<Array<ResolversParentTypes['Group']>> };
  UserUpdateInput: UserUpdateInput;
  Usercreationinput: Usercreationinput;
  VAT: Vat;
  Value: Omit<Value, 'file' | 'translation'> & { file?: Maybe<ResolversParentTypes['File']>, translation?: Maybe<ResolversParentTypes['ValueTranslation']> };
  ValueBase: ResolversInterfaceTypes<ResolversParentTypes>['ValueBase'];
  ValueConnection: Omit<ValueConnection, 'edges'> & { edges: Array<ResolversParentTypes['ValueEdge']> };
  ValueCreated: Omit<ValueCreated, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], value: ResolversParentTypes['Value'] };
  ValueCreationInput: ValueCreationInput;
  ValueDeleted: Omit<ValueDeleted, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], value: ResolversParentTypes['Value'] };
  ValueEdge: Omit<ValueEdge, 'node'> & { node: ResolversParentTypes['Value'] };
  ValueFilter: ValueFilter;
  ValueInput: ValueInput;
  ValueMutationResult: Omit<ValueMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Value'] };
  ValueSelectableTypeInput: ValueSelectableTypeInput;
  ValueTranslation: Omit<ValueTranslation, 'attribute' | 'value'> & { attribute: ResolversParentTypes['Attribute'], value: ResolversParentTypes['Value'] };
  ValueTranslationInput: ValueTranslationInput;
  ValueUpdateInput: ValueUpdateInput;
  ValueUpdated: Omit<ValueUpdated, 'issuingPrincipal' | 'recipient' | 'value'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], value: ResolversParentTypes['Value'] };
  Void: Scalars['Void']['output'];
  Voucher: Omit<Voucher, 'channelListings' | 'collections' | 'metadata' | 'privateMetadata' | 'products' | 'translation'> & { channelListings: Array<ResolversParentTypes['VoucherChannelListing']>, collections: ResolversParentTypes['CollectionConnection'], metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, products: ResolversParentTypes['ProductNodeConnection'], translation?: Maybe<ResolversParentTypes['VoucherTranslation']> };
  VoucherBase: ResolversInterfaceTypes<ResolversParentTypes>['VoucherBase'];
  VoucherChannelListing: Omit<VoucherChannelListing, 'channel'> & { channel: ResolversParentTypes['Channel'] };
  VoucherChannelListingAddInput: VoucherChannelListingAddInput;
  VoucherChannelListingInput: VoucherChannelListingInput;
  VoucherConnection: Omit<VoucherConnection, 'edges'> & { edges: Array<ResolversParentTypes['VoucherEdge']> };
  VoucherCreated: Omit<VoucherCreated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], voucher: ResolversParentTypes['Voucher'] };
  VoucherDeleted: Omit<VoucherDeleted, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], voucher: ResolversParentTypes['Voucher'] };
  VoucherEdge: Omit<VoucherEdge, 'node'> & { node: ResolversParentTypes['Voucher'] };
  VoucherFilter: VoucherFilter;
  VoucherInput: VoucherInput;
  VoucherMetadataUpdated: Omit<VoucherMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], voucher: ResolversParentTypes['Voucher'] };
  VoucherMutationResult: Omit<VoucherMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Voucher'] };
  VoucherOrderingInput: VoucherOrderingInput;
  VoucherTranslation: Omit<VoucherTranslation, 'voucher'> & { voucher: ResolversParentTypes['Voucher'] };
  VoucherUpdated: Omit<VoucherUpdated, 'issuingPrincipal' | 'recipient' | 'voucher'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], voucher: ResolversParentTypes['Voucher'] };
  Warehouse: Omit<Warehouse, 'metadata' | 'privateMetadata' | 'shippingZones'> & { metadata: Array<ResolversParentTypes['MetadataItem']>, privateMetadata: Array<ResolversParentTypes['MetadataItem']>, shippingZones: ResolversParentTypes['ShippingZoneConnection'] };
  WarehouseBase: ResolversInterfaceTypes<ResolversParentTypes>['WarehouseBase'];
  WarehouseConnection: Omit<WarehouseConnection, 'edges'> & { edges: Array<ResolversParentTypes['WarehouseEdge']> };
  WarehouseCreated: Omit<WarehouseCreated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], warehouse: ResolversParentTypes['Warehouse'] };
  WarehouseCreationInput: WarehouseCreationInput;
  WarehouseDeleted: Omit<WarehouseDeleted, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], warehouse: ResolversParentTypes['Warehouse'] };
  WarehouseEdge: Omit<WarehouseEdge, 'node'> & { node: ResolversParentTypes['Warehouse'] };
  WarehouseError: WarehouseError;
  WarehouseFilter: WarehouseFilter;
  WarehouseMetadataUpdated: Omit<WarehouseMetadataUpdated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], warehouse: ResolversParentTypes['Warehouse'] };
  WarehouseMutationResult: Omit<WarehouseMutationResult, 'errors' | 'result'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, result: ResolversParentTypes['Warehouse'] };
  WarehouseOrderingInput: WarehouseOrderingInput;
  WarehouseShippingZoneAssignmentMutationResult: Omit<WarehouseShippingZoneAssignmentMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  WarehouseShippingZoneUnassignmentMutationResult: Omit<WarehouseShippingZoneUnassignmentMutationResult, 'errors'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>> };
  WarehouseUpdateInput: WarehouseUpdateInput;
  WarehouseUpdated: Omit<WarehouseUpdated, 'issuingPrincipal' | 'recipient' | 'warehouse'> & { issuingPrincipal: ResolversParentTypes['AppUser'], recipient: ResolversParentTypes['App'], warehouse: ResolversParentTypes['Warehouse'] };
  Webhook: Omit<Webhook, 'app'> & { app: ResolversParentTypes['App'] };
  WebhookCreationInput: WebhookCreationInput;
  WebhookMutationResult: Omit<WebhookMutationResult, 'errors' | 'webhook'> & { errors?: Maybe<Array<ResolversParentTypes['ErrorInterface']>>, webhook: ResolversParentTypes['Webhook'] };
  WebhookUpdateInput: WebhookUpdateInput;
  Weight: Scalars['Weight']['output'];
};

export type AbstractOrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['AbstractOrder'] = ResolversParentTypes['AbstractOrder']> = {
  __resolveType: TypeResolveFn<'Checkout' | 'Order', ParentType, ContextType>;
  actions?: Resolver<Array<ResolversTypes['OrderAction']>, ParentType, ContextType>;
  authorizeStatus?: Resolver<ResolversTypes['OrderAuthorizeStatus'], ParentType, ContextType>;
  availableCollectionPoints?: Resolver<Array<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  availableShippingMethods?: Resolver<Maybe<Array<ResolversTypes['ShippingMethod']>>, ParentType, ContextType>;
  billingAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  canFinalize?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  chargeStatus?: Resolver<ResolversTypes['OrderChargeStatus'], ParentType, ContextType>;
  collectionPointName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customerEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerFirstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerLastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerNote?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['Money']>, ParentType, ContextType>;
  discountName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discounts?: Resolver<Array<ResolversTypes['OrderDiscount']>, ParentType, ContextType>;
  displayGrossPrices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Array<ResolversTypes['OrderError']>, ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['OrderEvent']>, ParentType, ContextType>;
  fulfillmentDeadline?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fulfillmentMethod?: Resolver<Maybe<ResolversTypes['FulfillmentMethod']>, ParentType, ContextType>;
  fulfillmentMethodType?: Resolver<Maybe<ResolversTypes['FulfillmentMethodType']>, ParentType, ContextType>;
  fulfillments?: Resolver<Array<ResolversTypes['Fulfillment']>, ParentType, ContextType>;
  giftCards?: Resolver<Array<ResolversTypes['GiftCard']>, ParentType, ContextType>;
  invoices?: Resolver<Array<ResolversTypes['Invoice']>, ParentType, ContextType>;
  isPaid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isShippingRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<AbstractOrderMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<AbstractOrderMetafieldsArgs, 'keys'>>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['OrderOrigin'], ParentType, ContextType>;
  original?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes['ChargeStatus'], ParentType, ContextType>;
  paymentStatusDisplay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payments?: Resolver<Array<ResolversTypes['Payment']>, ParentType, ContextType>;
  pointsOfContact?: Resolver<Array<ResolversTypes['PointOfContact']>, ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<AbstractOrderPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<AbstractOrderPrivateMetafieldsArgs, 'keys'>>;
  redirectUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  shippingMethod?: Resolver<Maybe<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  shippingMethodName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingMethods?: Resolver<Array<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  shippingPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  shippingTaxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  shippingTaxClassMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  shippingTaxClassName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingTaxClassPrivateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  shippingTaxRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  statusDisplay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtotal?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  taxExemption?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  totalAuthorized?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  totalBalance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  totalCaptured?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  trackingClientId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['TransactionItem']>, ParentType, ContextType>;
  translatedDiscountName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  undiscountedTotal?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voucher?: Resolver<Maybe<ResolversTypes['Voucher']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Weight']>, ParentType, ContextType>;
};

export type AbstractProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['AbstractProduct'] = ResolversParentTypes['AbstractProduct']> = {
  ancestors?: Resolver<Array<ResolversTypes['AbstractProduct']>, ParentType, ContextType, RequireFields<AbstractProductAncestorsArgs, 'includeSelf'>>;
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType, RequireFields<AbstractProductAttributeArgs, 'slug'>>;
  attributes?: Resolver<Array<ResolversTypes['Attribute']>, ParentType, ContextType, RequireFields<AbstractProductAttributesArgs, 'variantSelection'>>;
  availableForPurchaseAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  channelListings?: Resolver<Array<ResolversTypes['ProductChannelListing']>, ParentType, ContextType>;
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  digitalContent?: Resolver<ResolversTypes['DigitalContent'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  imageById?: Resolver<ResolversTypes['ProductImage'], ParentType, ContextType, RequireFields<AbstractProductImageByIdArgs, 'id'>>;
  images?: Resolver<Array<ResolversTypes['ProductImage']>, ParentType, ContextType>;
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<AbstractProductIsAvailableArgs, 'address'>>;
  isAvailableForPurchase?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<AbstractProductIsAvailableForPurchaseArgs, 'channel'>>;
  media?: Resolver<Array<ResolversTypes['ProductMediaItem']>, ParentType, ContextType>;
  mediaById?: Resolver<ResolversTypes['ProductMediaItem'], ParentType, ContextType, RequireFields<AbstractProductMediaByIdArgs, 'id'>>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<AbstractProductMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<AbstractProductMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['AbstractProduct'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preorder?: Resolver<Maybe<ResolversTypes['PreorderData']>, ParentType, ContextType>;
  pricing?: Resolver<Maybe<ResolversTypes['ProductPricingInfo']>, ParentType, ContextType, RequireFields<AbstractProductPricingArgs, 'address' | 'channelSlug'>>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<AbstractProductPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<AbstractProductPrivateMetafieldsArgs, 'keys'>>;
  productKlass?: Resolver<ResolversTypes['ProductKlass'], ParentType, ContextType>;
  quantityAvailable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<AbstractProductQuantityAvailableArgs, 'address' | 'countryCode'>>;
  quantityOrdered?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  revenue?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType, RequireFields<AbstractProductRevenueArgs, 'period'>>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stocks?: Resolver<Array<ResolversTypes['Stock']>, ParentType, ContextType, RequireFields<AbstractProductStocksArgs, 'address' | 'countryCode'>>;
  taxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<AbstractProductThumbnailArgs, 'format' | 'size'>>;
  translation?: Resolver<Maybe<ResolversTypes['ProductTranslation']>, ParentType, ContextType, RequireFields<AbstractProductTranslationArgs, 'languageCode'>>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  variant?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<AbstractProductVariantArgs, 'id' | 'sku'>>;
  variants?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Weight'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountError'] = ResolversParentTypes['AccountError']> = {
  addressType?: Resolver<Maybe<ResolversTypes['AddressType']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountEvent'] = ResolversParentTypes['AccountEvent']> = {
  app?: Resolver<Maybe<ResolversTypes['App']>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  orderLine?: Resolver<ResolversTypes['OrderLine'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AccountEventType'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityArea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinates?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  countryArea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isDefaultBillingAddress?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isDefaultShippingAddress?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetAddress1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetAddress2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressBase'] = ResolversParentTypes['AddressBase']> = {
  __resolveType: TypeResolveFn<'Address', ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityArea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryArea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetAddress1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetAddress2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AddressCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressCreated'] = ResolversParentTypes['AddressCreated']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressDeleted'] = ResolversParentTypes['AddressDeleted']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressEvent'] = ResolversParentTypes['AddressEvent']> = {
  __resolveType: TypeResolveFn<'AddressCreated' | 'AddressDeleted' | 'AddressUpdated', ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
};

export type AddressMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressMutationResult'] = ResolversParentTypes['AddressMutationResult']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressUpdated'] = ResolversParentTypes['AddressUpdated']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressValidationDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressValidationData'] = ResolversParentTypes['AddressValidationData']> = {
  addressFormat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  addressLatinFormat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  allowedFields?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  cityAreaChoices?: Resolver<Array<ResolversTypes['ChoiceValue']>, ParentType, ContextType>;
  cityAreaType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityChoices?: Resolver<Array<ResolversTypes['ChoiceValue']>, ParentType, ContextType>;
  cityType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryAreaChoices?: Resolver<Array<ResolversTypes['ChoiceValue']>, ParentType, ContextType>;
  countryAreaType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCodeExamples?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  postalCodeMatchers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  postalCodePrefix?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCodeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requiredFields?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  upperFields?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AllocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Allocation'] = ResolversParentTypes['Allocation']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppResolvers<ContextType = any, ParentType extends ResolversParentTypes['App'] = ResolversParentTypes['App']> = {
  aboutApp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  appUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  configurationUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dataPrivacyUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extensions?: Resolver<Array<ResolversTypes['AppExtension']>, ParentType, ContextType>;
  homepageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  manifestUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<AppMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<AppMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['Permission']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<AppPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<AppPrivateMetafieldsArgs, 'keys'>>;
  supportUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokens?: Resolver<Array<ResolversTypes['AppToken']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AppType'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webhooks?: Resolver<Array<ResolversTypes['Webhook']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppBase'] = ResolversParentTypes['AppBase']> = {
  __resolveType: TypeResolveFn<'AppDeleted' | 'AppInstalled' | 'AppStatusChanged' | 'AppUpdated', ParentType, ContextType>;
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
};

export type AppConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppConnection'] = ResolversParentTypes['AppConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AppEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppDeleted'] = ResolversParentTypes['AppDeleted']> = {
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppEdge'] = ResolversParentTypes['AppEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppError'] = ResolversParentTypes['AppError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['PermissionCode']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppExtensionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppExtension'] = ResolversParentTypes['AppExtension']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mount?: Resolver<ResolversTypes['AppExtensionMount'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['Permission']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppExtensionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppExtensionConnection'] = ResolversParentTypes['AppExtensionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AppExtensionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppExtensionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppExtensionEdge'] = ResolversParentTypes['AppExtensionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['AppExtension'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppInstallationResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppInstallation'] = ResolversParentTypes['AppInstallation']> = {
  appName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  manifestUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['JobStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppInstallationMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppInstallationMutationResult'] = ResolversParentTypes['AppInstallationMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['AppInstallation'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppInstalledResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppInstalled'] = ResolversParentTypes['AppInstalled']> = {
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppManifestExtensionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppManifestExtension'] = ResolversParentTypes['AppManifestExtension']> = {
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mount?: Resolver<ResolversTypes['AppExtensionMount'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['Permission']>, ParentType, ContextType>;
  target?: Resolver<ResolversTypes['AppExtensionTarget'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppManifestWebhookResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppManifestWebhook'] = ResolversParentTypes['AppManifestWebhook']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  syncEvents?: Resolver<Array<ResolversTypes['WebhookEventTypeSync']>, ParentType, ContextType>;
  targetUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppMutationResult'] = ResolversParentTypes['AppMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppStatusChangedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppStatusChanged'] = ResolversParentTypes['AppStatusChanged']> = {
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppToken'] = ResolversParentTypes['AppToken']> = {
  authToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppTokenMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppTokenMutationResult'] = ResolversParentTypes['AppTokenMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['AppToken'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppUpdated'] = ResolversParentTypes['AppUpdated']> = {
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppUser'] = ResolversParentTypes['AppUser']> = {
  __resolveType: TypeResolveFn<'App' | 'User', ParentType, ContextType>;
};

export type AsyncWebhookEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['AsyncWebhookEvent'] = ResolversParentTypes['AsyncWebhookEvent']> = {
  eventType?: Resolver<ResolversTypes['AsyncWebhookEventType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attribute'] = ResolversParentTypes['Attribute']> = {
  availableInGrid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  entityType?: Resolver<Maybe<ResolversTypes['AttributeEntityType']>, ParentType, ContextType>;
  filterableInDashboard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  filterableInStorefront?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  inputType?: Resolver<ResolversTypes['AttributeInputType'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<AttributeMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<AttributeMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<AttributePrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<AttributePrivateMetafieldsArgs, 'keys'>>;
  productKlasses?: Resolver<ResolversTypes['ProductKlassNodeConnection'], ParentType, ContextType, RequireFields<AttributeProductKlassesArgs, 'after' | 'before' | 'first' | 'last'>>;
  productVariantTypes?: Resolver<ResolversTypes['ProductKlassNodeConnection'], ParentType, ContextType, RequireFields<AttributeProductVariantTypesArgs, 'after' | 'before' | 'first' | 'last'>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storefrontSearchPosition?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  translation?: Resolver<ResolversTypes['AttributeTranslation'], ParentType, ContextType, RequireFields<AttributeTranslationArgs, 'languageCode'>>;
  type?: Resolver<ResolversTypes['AttributeType'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['MeasurementUnit'], ParentType, ContextType>;
  valueRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  values?: Resolver<ResolversTypes['ValueConnection'], ParentType, ContextType, RequireFields<AttributeValuesArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  visibleInStorefront?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  withChoices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeBase'] = ResolversParentTypes['AttributeBase']> = {
  __resolveType: TypeResolveFn<'AttributeCreated' | 'AttributeDeleted' | 'AttributeUpdated', ParentType, ContextType>;
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
};

export type AttributeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeConnection'] = ResolversParentTypes['AttributeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AttributeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeCreated'] = ResolversParentTypes['AttributeCreated']> = {
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeDeleted'] = ResolversParentTypes['AttributeDeleted']> = {
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeEdge'] = ResolversParentTypes['AttributeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeMutationResult'] = ResolversParentTypes['AttributeMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeNodeConnection'] = ResolversParentTypes['AttributeNodeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['AttributeNodeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeNodeEdge'] = ResolversParentTypes['AttributeNodeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeTranslation'] = ResolversParentTypes['AttributeTranslation']> = {
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AttributeUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AttributeUpdated'] = ResolversParentTypes['AttributeUpdated']> = {
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthPluginMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPluginMutationResult'] = ResolversParentTypes['AuthPluginMutationResult']> = {
  data?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseMutationResult'] = ResolversParentTypes['BaseMutationResult']> = {
  __resolveType: TypeResolveFn<'AddressMutationResult' | 'AppInstallationMutationResult' | 'AppMutationResult' | 'AppTokenMutationResult' | 'AttributeMutationResult' | 'AuthPluginMutationResult' | 'BoolMutationResult' | 'CategoryMutationResult' | 'ChannelMutationResult' | 'ChannelReorderWarehousesMutationResult' | 'CheckoutCompleteMutationResult' | 'CheckoutMutationResult' | 'CheckoutOptionalMutationResult' | 'CheckoutPaymentMutationResult' | 'CollectionChannelListingMutationResult' | 'CollectionMutationResult' | 'DigitalContentMutationResult' | 'EventDeliveryMutationResult' | 'ExportFileMutationResult' | 'ExternalNotificationTriggerMutationResult' | 'FileMutationResult' | 'GiftCardBulkMutationResult' | 'GiftCardMutationResult' | 'GiftCardSettingsMutationResult' | 'Giftcardmutationresult' | 'GroupMutationResult' | 'IDListMutationResult' | 'InvoiceMutationResult' | 'JWTMutationResult' | 'ManifestMutationResult' | 'MediaItemMutationResult' | 'MenuItemMutationResult' | 'MenuMutationResult' | 'ObjectWithMetadataMutationResult' | 'OrderBulkMutationResult' | 'OrderFulfillmentMutationResult' | 'OrderInvoiceMutationResult' | 'OrderLineMutationResult' | 'OrderLinesMutationResult' | 'OrderMutationResult' | 'OrderSettingsMutationResult' | 'Ordermutationresult' | 'PageBulkMutationResult' | 'PageKlassMutationResult' | 'PageMutationResult' | 'PaymentCheckBalanceMutationResult' | 'PaymentInitializeMutationResult' | 'PaymentMutationResult' | 'PluginMutationResult' | 'ProductAttributeAssignmentMutationResult' | 'ProductBulkMutationResult' | 'ProductKlassMutationResult' | 'ProductMediaAssignmentMutationResult' | 'ProductMediaMutationResult' | 'ProductMediaUnassignmentMutationResult' | 'ProductMutationResult' | 'ProductPreorderDeactivationMutationResult' | 'SaleMutationResult' | 'ShippingMethodChannelListingMutationResult' | 'ShippingMethodMutationResult' | 'ShippingPriceMutationResult' | 'ShippingPriceRemoveProductFromExcludeMutationResult' | 'ShippingZoneMutationResult' | 'SiteMutationResult' | 'SiteTranslationMutationResult' | 'StaffNotificationRecipientMutationResult' | 'TaxClassMutationResult' | 'TaxConfigurationMutationResult' | 'TaxCountryConfigurationMutationResult' | 'TaxSourceObjectMutationResult' | 'TokenVerificationMutationResult' | 'TransactionItemMutationResult' | 'UserBulkMutationResult' | 'UserCreationResult' | 'UserMutationResult' | 'ValueMutationResult' | 'VoucherMutationResult' | 'WarehouseMutationResult' | 'WarehouseShippingZoneAssignmentMutationResult' | 'WarehouseShippingZoneUnassignmentMutationResult' | 'WebhookMutationResult', ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
};

export type BasePricingInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['BasePricingInfo'] = ResolversParentTypes['BasePricingInfo']> = {
  __resolveType: TypeResolveFn<'ProductPricingInfo', ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  discountLocalCurrency?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  onSale?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type BaseTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseTranslation'] = ResolversParentTypes['BaseTranslation']> = {
  __resolveType: TypeResolveFn<'AttributeTranslation' | 'CategoryTranslation' | 'CollectionTranslation' | 'MenuItemTranslation' | 'PageTranslation' | 'ProductTranslation' | 'SaleTranslation' | 'ShippingMethodTranslation' | 'SiteTranslation' | 'ValueTranslation' | 'VoucherTranslation', ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
};

export type BoolMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoolMutationResult'] = ResolversParentTypes['BoolMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BulkProductErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['BulkProductError'] = ResolversParentTypes['BulkProductError']> = {
  attributes?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  channels?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  warehouses?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BulkStockErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['BulkStockError'] = ResolversParentTypes['BulkStockError']> = {
  attributes?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalculateTaxesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CalculateTaxes'] = ResolversParentTypes['CalculateTaxes']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  taxBase?: Resolver<ResolversTypes['TaxableObject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  ancestors?: Resolver<ResolversTypes['CategoryNodeConnection'], ParentType, ContextType, RequireFields<CategoryAncestorsArgs, 'after' | 'before' | 'first' | 'last'>>;
  backgroundImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<CategoryBackgroundImageArgs, 'format' | 'size'>>;
  children?: Resolver<ResolversTypes['CategoryNodeConnection'], ParentType, ContextType, RequireFields<CategoryChildrenArgs, 'after' | 'before' | 'first' | 'last'>>;
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CategoryMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<CategoryMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CategoryPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<CategoryPrivateMetafieldsArgs, 'keys'>>;
  products?: Resolver<ResolversTypes['ProductNodeConnection'], ParentType, ContextType, RequireFields<CategoryProductsArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['CategoryTranslation']>, ParentType, ContextType, RequireFields<CategoryTranslationArgs, 'languageCode'>>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryBase'] = ResolversParentTypes['CategoryBase']> = {
  __resolveType: TypeResolveFn<'CategoryCreated' | 'CategoryDeleted' | 'CategoryUpdated', ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
};

export type CategoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryConnection'] = ResolversParentTypes['CategoryConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CategoryEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryCreated'] = ResolversParentTypes['CategoryCreated']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryDeleted'] = ResolversParentTypes['CategoryDeleted']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryEdge'] = ResolversParentTypes['CategoryEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryMutationResult'] = ResolversParentTypes['CategoryMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryNodeConnection'] = ResolversParentTypes['CategoryNodeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CategoryNodeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryNodeEdge'] = ResolversParentTypes['CategoryNodeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryTranslation'] = ResolversParentTypes['CategoryTranslation']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryUpdated'] = ResolversParentTypes['CategoryUpdated']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  hasOrders?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stockSettings?: Resolver<ResolversTypes['StockSettings'], ParentType, ContextType>;
  warehouses?: Resolver<Array<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelBase'] = ResolversParentTypes['ChannelBase']> = {
  __resolveType: TypeResolveFn<'ChannelCreated' | 'ChannelDeleted' | 'ChannelStatusChanged' | 'ChannelUpdated', ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
};

export type ChannelCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelCreated'] = ResolversParentTypes['ChannelCreated']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelDeleted'] = ResolversParentTypes['ChannelDeleted']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelError'] = ResolversParentTypes['ChannelError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingZones?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  warehouses?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelMutationResult'] = ResolversParentTypes['ChannelMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelReorderWarehousesMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelReorderWarehousesMutationResult'] = ResolversParentTypes['ChannelReorderWarehousesMutationResult']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelStatusChangedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelStatusChanged'] = ResolversParentTypes['ChannelStatusChanged']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelUpdated'] = ResolversParentTypes['ChannelUpdated']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['Checkout'] = ResolversParentTypes['Checkout']> = {
  actions?: Resolver<Array<ResolversTypes['OrderAction']>, ParentType, ContextType>;
  authorizeStatus?: Resolver<ResolversTypes['OrderAuthorizeStatus'], ParentType, ContextType>;
  availableCollectionPoints?: Resolver<Array<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  availablePaymentGateways?: Resolver<Array<ResolversTypes['PaymentGateway']>, ParentType, ContextType>;
  availableShippingMethods?: Resolver<Maybe<Array<ResolversTypes['ShippingMethod']>>, ParentType, ContextType>;
  billingAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  canFinalize?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  chargeStatus?: Resolver<ResolversTypes['OrderChargeStatus'], ParentType, ContextType>;
  collectionPointName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customerEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerFirstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerLastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerNote?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  discountName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discounts?: Resolver<Array<ResolversTypes['OrderDiscount']>, ParentType, ContextType>;
  displayGrossPrices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Array<ResolversTypes['OrderError']>, ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['OrderEvent']>, ParentType, ContextType>;
  fulfillmentDeadline?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fulfillmentMethod?: Resolver<Maybe<ResolversTypes['FulfillmentMethod']>, ParentType, ContextType>;
  fulfillmentMethodType?: Resolver<Maybe<ResolversTypes['FulfillmentMethodType']>, ParentType, ContextType>;
  fulfillments?: Resolver<Array<ResolversTypes['Fulfillment']>, ParentType, ContextType>;
  giftCards?: Resolver<Array<ResolversTypes['GiftCard']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  invoices?: Resolver<Array<ResolversTypes['Invoice']>, ParentType, ContextType>;
  isPaid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isShippingRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  lines?: Resolver<Array<ResolversTypes['CheckoutLine']>, ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CheckoutMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<CheckoutMetafieldsArgs, 'keys'>>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['OrderOrigin'], ParentType, ContextType>;
  original?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes['ChargeStatus'], ParentType, ContextType>;
  paymentStatusDisplay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payments?: Resolver<Array<ResolversTypes['Payment']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pointsOfContact?: Resolver<Array<ResolversTypes['PointOfContact']>, ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CheckoutPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<CheckoutPrivateMetafieldsArgs, 'keys'>>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  redirectUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  shippingMethod?: Resolver<Maybe<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  shippingMethodName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingMethods?: Resolver<Array<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  shippingPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  shippingTaxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  shippingTaxClassMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  shippingTaxClassName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingTaxClassPrivateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  shippingTaxRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  statusDisplay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stockReservationExpires?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  subtotal?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  subtotalPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  taxExemption?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  totalAuthorized?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  totalBalance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  totalCaptured?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  trackingClientId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['TransactionItem']>, ParentType, ContextType>;
  translatedDiscountName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  undiscountedTotal?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validationErrors?: Resolver<Array<ResolversTypes['Error']>, ParentType, ContextType>;
  voucher?: Resolver<Maybe<ResolversTypes['Voucher']>, ParentType, ContextType>;
  voucherCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Weight']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutBase'] = ResolversParentTypes['CheckoutBase']> = {
  __resolveType: TypeResolveFn<'CheckoutCreated' | 'CheckoutFilterShippingMethods' | 'CheckoutMetadataUpdated' | 'CheckoutUpdated' | 'PaymentListGateways' | 'ShippingListMethodsForCheckout', ParentType, ContextType>;
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
};

export type CheckoutCompleteMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutCompleteMutationResult'] = ResolversParentTypes['CheckoutCompleteMutationResult']> = {
  confirmationData?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  confirmationNeeded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutConnection'] = ResolversParentTypes['CheckoutConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CheckoutEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutCreated'] = ResolversParentTypes['CheckoutCreated']> = {
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutEdge'] = ResolversParentTypes['CheckoutEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutError'] = ResolversParentTypes['CheckoutError']> = {
  addressType?: Resolver<Maybe<ResolversTypes['AddressType']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lines?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variants?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutFilterShippingMethodsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutFilterShippingMethods'] = ResolversParentTypes['CheckoutFilterShippingMethods']> = {
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingMethods?: Resolver<Array<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutLine'] = ResolversParentTypes['CheckoutLine']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CheckoutLineMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<CheckoutLineMetafieldsArgs, 'keys'>>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CheckoutLinePrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<CheckoutLinePrivateMetafieldsArgs, 'keys'>>;
  product?: Resolver<ResolversTypes['ConcreteProduct'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  requiresShipping?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  undiscountedTotalPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  undiscountedUnitPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  unitPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutLineConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutLineConnection'] = ResolversParentTypes['CheckoutLineConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CheckoutLineEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutLineEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutLineEdge'] = ResolversParentTypes['CheckoutLineEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['CheckoutLine'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutMetadataUpdated'] = ResolversParentTypes['CheckoutMetadataUpdated']> = {
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutMutationResult'] = ResolversParentTypes['CheckoutMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutNodeConnection'] = ResolversParentTypes['CheckoutNodeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CheckoutNodeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutNodeEdge'] = ResolversParentTypes['CheckoutNodeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutOptionalMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutOptionalMutationResult'] = ResolversParentTypes['CheckoutOptionalMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes['Checkout']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutPaymentMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutPaymentMutationResult'] = ResolversParentTypes['CheckoutPaymentMutationResult']> = {
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckoutUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CheckoutUpdated'] = ResolversParentTypes['CheckoutUpdated']> = {
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChoiceValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChoiceValue'] = ResolversParentTypes['ChoiceValue']> = {
  raw?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verbose?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  backgroundImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<CollectionBackgroundImageArgs, 'format' | 'size'>>;
  channel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  channelListings?: Resolver<Array<ResolversTypes['CollectionChannelListing']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CollectionMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<CollectionMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<CollectionPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<CollectionPrivateMetafieldsArgs, 'keys'>>;
  products?: Resolver<ResolversTypes['ProductConnection'], ParentType, ContextType, RequireFields<CollectionProductsArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['CollectionTranslation']>, ParentType, ContextType, RequireFields<CollectionTranslationArgs, 'languageCode'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionBase'] = ResolversParentTypes['CollectionBase']> = {
  __resolveType: TypeResolveFn<'CollectionCreated' | 'CollectionDeleted' | 'CollectionMetadataUpdated' | 'CollectionUpdated', ParentType, ContextType>;
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<CollectionBaseCollectionArgs, 'channel'>>;
};

export type CollectionChannelListingResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionChannelListing'] = ResolversParentTypes['CollectionChannelListing']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isPublished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionChannelListingErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionChannelListingError'] = ResolversParentTypes['CollectionChannelListingError']> = {
  attributes?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  channels?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionChannelListingMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionChannelListingMutationResult'] = ResolversParentTypes['CollectionChannelListingMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['CollectionChannelListing'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionConnection'] = ResolversParentTypes['CollectionConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CollectionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionCreated'] = ResolversParentTypes['CollectionCreated']> = {
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<CollectionCreatedCollectionArgs, 'channel'>>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionDeleted'] = ResolversParentTypes['CollectionDeleted']> = {
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<CollectionDeletedCollectionArgs, 'channel'>>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionEdge'] = ResolversParentTypes['CollectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionMetadataUpdated'] = ResolversParentTypes['CollectionMetadataUpdated']> = {
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<CollectionMetadataUpdatedCollectionArgs, 'channel'>>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionMutationResult'] = ResolversParentTypes['CollectionMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionTranslation'] = ResolversParentTypes['CollectionTranslation']> = {
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectionUpdated'] = ResolversParentTypes['CollectionUpdated']> = {
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<CollectionUpdatedCollectionArgs, 'channel'>>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConcreteProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConcreteProduct'] = ResolversParentTypes['ConcreteProduct']> = {
  ancestors?: Resolver<Array<ResolversTypes['AbstractProduct']>, ParentType, ContextType, RequireFields<ConcreteProductAncestorsArgs, 'includeSelf'>>;
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType, RequireFields<ConcreteProductAttributeArgs, 'slug'>>;
  attributes?: Resolver<Array<ResolversTypes['Attribute']>, ParentType, ContextType, RequireFields<ConcreteProductAttributesArgs, 'variantSelection'>>;
  availableForPurchaseAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  channelListings?: Resolver<Array<ResolversTypes['ProductChannelListing']>, ParentType, ContextType>;
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  digitalContent?: Resolver<ResolversTypes['DigitalContent'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  imageById?: Resolver<ResolversTypes['ProductImage'], ParentType, ContextType, RequireFields<ConcreteProductImageByIdArgs, 'id'>>;
  images?: Resolver<Array<ResolversTypes['ProductImage']>, ParentType, ContextType>;
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<ConcreteProductIsAvailableArgs, 'address'>>;
  isAvailableForPurchase?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<ConcreteProductIsAvailableForPurchaseArgs, 'channel'>>;
  margin?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  media?: Resolver<Array<ResolversTypes['ProductMediaItem']>, ParentType, ContextType>;
  mediaById?: Resolver<ResolversTypes['ProductMediaItem'], ParentType, ContextType, RequireFields<ConcreteProductMediaByIdArgs, 'id'>>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ConcreteProductMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ConcreteProductMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['AbstractProduct'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preorder?: Resolver<Maybe<ResolversTypes['PreorderData']>, ParentType, ContextType>;
  pricing?: Resolver<Maybe<ResolversTypes['ProductPricingInfo']>, ParentType, ContextType, RequireFields<ConcreteProductPricingArgs, 'address' | 'channelSlug'>>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ConcreteProductPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ConcreteProductPrivateMetafieldsArgs, 'keys'>>;
  productKlass?: Resolver<ResolversTypes['ProductKlass'], ParentType, ContextType>;
  quantityAvailable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<ConcreteProductQuantityAvailableArgs, 'address' | 'countryCode'>>;
  quantityLimitPerCustomer?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityOrdered?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  revenue?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType, RequireFields<ConcreteProductRevenueArgs, 'period'>>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stocks?: Resolver<Array<ResolversTypes['Stock']>, ParentType, ContextType, RequireFields<ConcreteProductStocksArgs, 'address' | 'countryCode'>>;
  taxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<ConcreteProductThumbnailArgs, 'format' | 'size'>>;
  trackInventory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['ProductTranslation']>, ParentType, ContextType, RequireFields<ConcreteProductTranslationArgs, 'languageCode'>>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  variant?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ConcreteProductVariantArgs, 'id' | 'sku'>>;
  variants?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Weight'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigurationItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfigurationItem'] = ResolversParentTypes['ConfigurationItem']> = {
  helpText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ConfigurationTypeField'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  code?: Resolver<ResolversTypes['CountryCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateOrderdResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOrderd'] = ResolversParentTypes['CreateOrderd']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditCardResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreditCard'] = ResolversParentTypes['CreditCard']> = {
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expMonth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  expYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  firstDigits?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastDigits?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerCreated'] = ResolversParentTypes['CustomerCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerMetadataUpdated'] = ResolversParentTypes['CustomerMetadataUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerUpdated'] = ResolversParentTypes['CustomerUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DigitalContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['DigitalContent'] = ResolversParentTypes['DigitalContent']> = {
  autoFulfill?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  contentFile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  maxDownloads?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<DigitalContentMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<DigitalContentMetafieldsArgs, 'keys'>>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<DigitalContentPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<DigitalContentPrivateMetafieldsArgs, 'keys'>>;
  productVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  urlValidDays?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  urls?: Resolver<Array<ResolversTypes['DigitalContentUrl']>, ParentType, ContextType>;
  useDefaultSettings?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DigitalContentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DigitalContentConnection'] = ResolversParentTypes['DigitalContentConnection']> = {
  edges?: Resolver<Array<ResolversTypes['DigitalContentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DigitalContentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DigitalContentEdge'] = ResolversParentTypes['DigitalContentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['DigitalContent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DigitalContentMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DigitalContentMutationResult'] = ResolversParentTypes['DigitalContentMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['DigitalContent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DigitalContentUrlResolvers<ContextType = any, ParentType extends ResolversParentTypes['DigitalContentUrl'] = ResolversParentTypes['DigitalContentUrl']> = {
  content?: Resolver<ResolversTypes['DigitalContent'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  downloadNum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscountErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscountError'] = ResolversParentTypes['DiscountError']> = {
  channels?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftOrderCreated'] = ResolversParentTypes['DraftOrderCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftOrderDeleted'] = ResolversParentTypes['DraftOrderDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftOrderUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftOrderUpdated'] = ResolversParentTypes['DraftOrderUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorInterface'] = ResolversParentTypes['ErrorInterface']> = {
  __resolveType: TypeResolveFn<'AccountError' | 'AppError' | 'BulkProductError' | 'BulkStockError' | 'ChannelError' | 'CheckoutError' | 'CollectionChannelListingError' | 'DiscountError' | 'Error' | 'GiftCardError' | 'GroupError' | 'MediaError' | 'OrderError' | 'PageError' | 'PaymentError' | 'ProductChannelListingError' | 'ProductError' | 'ProductWithoutVariantError' | 'ShippingError' | 'StaffError' | 'TaxClassCreateError' | 'TaxClassDeleteError' | 'TaxClassUpdateError' | 'TaxConfigurationUpdateError' | 'TaxCountryConfigurationUpdateError' | 'WarehouseError', ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  __resolveType: TypeResolveFn<'AddressCreated' | 'AddressDeleted' | 'AddressUpdated' | 'AppDeleted' | 'AppInstalled' | 'AppStatusChanged' | 'AppUpdated' | 'AttributeCreated' | 'AttributeDeleted' | 'AttributeUpdated' | 'CalculateTaxes' | 'CategoryCreated' | 'CategoryDeleted' | 'CategoryUpdated' | 'ChannelCreated' | 'ChannelDeleted' | 'ChannelStatusChanged' | 'ChannelUpdated' | 'CheckoutCreated' | 'CheckoutFilterShippingMethods' | 'CheckoutMetadataUpdated' | 'CheckoutUpdated' | 'CollectionCreated' | 'CollectionDeleted' | 'CollectionMetadataUpdated' | 'CollectionUpdated' | 'CreateOrderd' | 'CustomerCreated' | 'CustomerMetadataUpdated' | 'CustomerUpdated' | 'DraftOrderCreated' | 'DraftOrderDeleted' | 'DraftOrderUpdated' | 'FulfillmentApproved' | 'FulfillmentCanceled' | 'FulfillmentCreated' | 'FulfillmentMetadataUpdated' | 'GiftCardCreated' | 'GiftCardDeleted' | 'GiftCardMetadataUpdated' | 'GiftCardStatusChanged' | 'GiftCardUpdated' | 'GroupCreated' | 'GroupDeleted' | 'GroupUpdated' | 'InvoiceDeleted' | 'InvoiceRequested' | 'InvoiceSent' | 'MediaCreated' | 'MediaDeleted' | 'MediaUpdated' | 'MenuCreated' | 'MenuDeleted' | 'MenuItemCreated' | 'MenuItemDeleted' | 'MenuItemUpdated' | 'MenuUpdated' | 'OrderCancelled' | 'OrderConfirmed' | 'OrderFilterShippingMethods' | 'OrderFulfilled' | 'OrderFullyPaid' | 'OrderMetadataUpdated' | 'OrderUpdated' | 'PageCreated' | 'PageDeleted' | 'PageKlassCreated' | 'PageKlassDeleted' | 'PageKlassUpdated' | 'PageUpdated' | 'PaymentAuthorize' | 'PaymentCaptureEvent' | 'PaymentConfirmEvent' | 'PaymentListGateways' | 'PaymentProcessEvent' | 'PaymentRefundEvent' | 'PaymentVoidEvent' | 'ProductBackInStock' | 'ProductCreated' | 'ProductDeleted' | 'ProductMetadataUpdated' | 'ProductOutOfStock' | 'ProductUpdated' | 'SaleCreated' | 'SaleDeleted' | 'SaleToggle' | 'SaleUpdated' | 'ShippingListMethodsForCheckout' | 'ShippingPriceCreated' | 'ShippingPriceDeleted' | 'ShippingPriceUpdated' | 'ShippingZoneCreated' | 'ShippingZoneDeleted' | 'ShippingZoneMetadataUpdated' | 'ShippingZoneUpdated' | 'StaffCreated' | 'StaffDeleted' | 'StaffUpdated' | 'Subscription' | 'TransactionAction' | 'TransactionActionRequest' | 'TransactionItemMetadataUpdated' | 'TranslationCreated' | 'TranslationUpdated' | 'ValueCreated' | 'ValueDeleted' | 'ValueUpdated' | 'VoucherCreated' | 'VoucherDeleted' | 'VoucherMetadataUpdated' | 'VoucherUpdated' | 'WarehouseCreated' | 'WarehouseDeleted' | 'WarehouseMetadataUpdated' | 'WarehouseUpdated', ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
};

export type EventDeliveryResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventDelivery'] = ResolversParentTypes['EventDelivery']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  eventType?: Resolver<ResolversTypes['WebhookEventType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EventDeliveryStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventDeliveryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventDeliveryConnection'] = ResolversParentTypes['EventDeliveryConnection']> = {
  edges?: Resolver<Array<ResolversTypes['EventDeliveryEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventDeliveryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventDeliveryEdge'] = ResolversParentTypes['EventDeliveryEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['EventDelivery'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventDeliveryMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventDeliveryMutationResult'] = ResolversParentTypes['EventDeliveryMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['EventDelivery'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExportEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExportEvent'] = ResolversParentTypes['ExportEvent']> = {
  app?: Resolver<Maybe<ResolversTypes['App']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ExportEventType'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExportFileResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExportFile'] = ResolversParentTypes['ExportFile']> = {
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['ExportEvent']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['JobStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExportFileConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExportFileConnection'] = ResolversParentTypes['ExportFileConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ExportFileEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExportFileEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExportFileEdge'] = ResolversParentTypes['ExportFileEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ExportFile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExportFileMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExportFileMutationResult'] = ResolversParentTypes['ExportFileMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['ExportFile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalAuthenticationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalAuthentication'] = ResolversParentTypes['ExternalAuthentication']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalNotificationTriggerMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalNotificationTriggerMutationResult'] = ResolversParentTypes['ExternalNotificationTriggerMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  none?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['FileMutationResult'] = ResolversParentTypes['FileMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['File'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Fulfillment'] = ResolversParentTypes['Fulfillment']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  fulfillmentOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  lines?: Resolver<Array<ResolversTypes['FulfillmentLine']>, ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<FulfillmentMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<FulfillmentMetafieldsArgs, 'keys'>>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<FulfillmentPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<FulfillmentPrivateMetafieldsArgs, 'keys'>>;
  status?: Resolver<ResolversTypes['FulfillmentStatus'], ParentType, ContextType>;
  statusDisplay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  trackingNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentApprovedResolvers<ContextType = any, ParentType extends ResolversParentTypes['FulfillmentApproved'] = ResolversParentTypes['FulfillmentApproved']> = {
  fulfillment?: Resolver<ResolversTypes['Fulfillment'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FulfillmentBase'] = ResolversParentTypes['FulfillmentBase']> = {
  __resolveType: TypeResolveFn<'FulfillmentApproved' | 'FulfillmentCanceled' | 'FulfillmentCreated' | 'FulfillmentMetadataUpdated', ParentType, ContextType>;
  fulfillment?: Resolver<ResolversTypes['Fulfillment'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
};

export type FulfillmentCanceledResolvers<ContextType = any, ParentType extends ResolversParentTypes['FulfillmentCanceled'] = ResolversParentTypes['FulfillmentCanceled']> = {
  fulfillment?: Resolver<ResolversTypes['Fulfillment'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['FulfillmentCreated'] = ResolversParentTypes['FulfillmentCreated']> = {
  fulfillment?: Resolver<ResolversTypes['Fulfillment'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['FulfillmentLine'] = ResolversParentTypes['FulfillmentLine']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  orderLine?: Resolver<ResolversTypes['OrderLine'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['FulfillmentMetadataUpdated'] = ResolversParentTypes['FulfillmentMetadataUpdated']> = {
  fulfillment?: Resolver<ResolversTypes['Fulfillment'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FulfillmentMethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['FulfillmentMethod'] = ResolversParentTypes['FulfillmentMethod']> = {
  __resolveType: TypeResolveFn<'ShippingMethod' | 'Warehouse', ParentType, ContextType>;
};

export type GatewayConfigLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['GatewayConfigLine'] = ResolversParentTypes['GatewayConfigLine']> = {
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCard'] = ResolversParentTypes['GiftCard']> = {
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  boughtInChannel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdByEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentBalance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  displayCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['GiftCardEvent']>, ParentType, ContextType, RequireFields<GiftCardEventsArgs, 'filters'>>;
  expiryDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  initialBalance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  last4CodeChars?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastUsedOn?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<GiftCardMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<GiftCardMetafieldsArgs, 'keys'>>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<GiftCardPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<GiftCardPrivateMetafieldsArgs, 'keys'>>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['GiftCardTag']>, ParentType, ContextType>;
  usedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  usedByEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardBase'] = ResolversParentTypes['GiftCardBase']> = {
  __resolveType: TypeResolveFn<'GiftCardCreated' | 'GiftCardDeleted' | 'GiftCardMetadataUpdated' | 'GiftCardStatusChanged' | 'GiftCardUpdated', ParentType, ContextType>;
  giftCard?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
};

export type GiftCardBulkMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardBulkMutationResult'] = ResolversParentTypes['GiftCardBulkMutationResult']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  objects?: Resolver<Array<ResolversTypes['GiftCard']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardConnection'] = ResolversParentTypes['GiftCardConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GiftCardEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardCreated'] = ResolversParentTypes['GiftCardCreated']> = {
  giftCard?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardDeleted'] = ResolversParentTypes['GiftCardDeleted']> = {
  giftCard?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardEdge'] = ResolversParentTypes['GiftCardEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardError'] = ResolversParentTypes['GiftCardError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardEvent'] = ResolversParentTypes['GiftCardEvent']> = {
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['GiftCardEventBalance'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiryDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  oldExpiryDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  oldTags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['GiftCardEventType'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardEventBalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardEventBalance'] = ResolversParentTypes['GiftCardEventBalance']> = {
  currentBalance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  initialBalance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  oldCurrentBalance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  oldInitialBalance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardMetadataUpdated'] = ResolversParentTypes['GiftCardMetadataUpdated']> = {
  giftCard?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardMutationResult'] = ResolversParentTypes['GiftCardMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardNodeConnection'] = ResolversParentTypes['GiftCardNodeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GiftCardNodeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardNodeEdge'] = ResolversParentTypes['GiftCardNodeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardSettings'] = ResolversParentTypes['GiftCardSettings']> = {
  expiryPeriod?: Resolver<Maybe<ResolversTypes['TimePeriod']>, ParentType, ContextType>;
  expiryType?: Resolver<ResolversTypes['GiftCardSettingsExpiryType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardSettingsMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardSettingsMutationResult'] = ResolversParentTypes['GiftCardSettingsMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['GiftCardSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardStatusChangedResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardStatusChanged'] = ResolversParentTypes['GiftCardStatusChanged']> = {
  giftCard?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardTag'] = ResolversParentTypes['GiftCardTag']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardTagConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardTagConnection'] = ResolversParentTypes['GiftCardTagConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GiftCardTagEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardTagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardTagEdge'] = ResolversParentTypes['GiftCardTagEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GiftCardTag'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftCardUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['GiftCardUpdated'] = ResolversParentTypes['GiftCardUpdated']> = {
  giftCard?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GiftcardmutationresultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Giftcardmutationresult'] = ResolversParentTypes['Giftcardmutationresult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  event?: Resolver<ResolversTypes['GiftCardEvent'], ParentType, ContextType>;
  giftCard?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GlobalIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GlobalID'], any> {
  name: 'GlobalID';
}

export type GoogleAddressBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GoogleAddressBase'] = ResolversParentTypes['GoogleAddressBase']> = {
  __resolveType: TypeResolveFn<'Address', ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityArea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryArea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetAddress1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streetAddress2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['Permission']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userCanManage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupBase'] = ResolversParentTypes['GroupBase']> = {
  __resolveType: TypeResolveFn<'GroupCreated' | 'GroupDeleted' | 'GroupUpdated', ParentType, ContextType>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
};

export type GroupConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupConnection'] = ResolversParentTypes['GroupConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GroupEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupCreated'] = ResolversParentTypes['GroupCreated']> = {
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupDeleted'] = ResolversParentTypes['GroupDeleted']> = {
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupEdge'] = ResolversParentTypes['GroupEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupError'] = ResolversParentTypes['GroupError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['PermissionCode']>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupMutationResult'] = ResolversParentTypes['GroupMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupUpdated'] = ResolversParentTypes['GroupUpdated']> = {
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IdListMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['IDListMutationResult'] = ResolversParentTypes['IDListMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  alt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  aspectRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  format?: Resolver<ResolversTypes['ThumbnailFormat'], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  externalUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<InvoiceMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<InvoiceMetafieldsArgs, 'keys'>>;
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<InvoicePrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<InvoicePrivateMetafieldsArgs, 'keys'>>;
  status?: Resolver<ResolversTypes['JobStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvoiceBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceBase'] = ResolversParentTypes['InvoiceBase']> = {
  __resolveType: TypeResolveFn<'InvoiceDeleted' | 'InvoiceRequested' | 'InvoiceSent', ParentType, ContextType>;
  invoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType>;
};

export type InvoiceDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceDeleted'] = ResolversParentTypes['InvoiceDeleted']> = {
  invoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvoiceMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceMutationResult'] = ResolversParentTypes['InvoiceMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvoiceRequestedResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceRequested'] = ResolversParentTypes['InvoiceRequested']> = {
  invoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvoiceSentResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceSent'] = ResolversParentTypes['InvoiceSent']> = {
  invoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONString'], any> {
  name: 'JSONString';
}

export type JwtResolvers<ContextType = any, ParentType extends ResolversParentTypes['JWT'] = ResolversParentTypes['JWT']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  csrfToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JwtMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['JWTMutationResult'] = ResolversParentTypes['JWTMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobResolvers<ContextType = any, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  __resolveType: TypeResolveFn<'AppInstallation' | 'ExportFile' | 'Invoice', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['JobStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type LanguageDisplayResolvers<ContextType = any, ParentType extends ResolversParentTypes['LanguageDisplay'] = ResolversParentTypes['LanguageDisplay']> = {
  code?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LimitInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['LimitInfo'] = ResolversParentTypes['LimitInfo']> = {
  allowedUsage?: Resolver<ResolversTypes['Limits'], ParentType, ContextType>;
  currentUsage?: Resolver<ResolversTypes['Limits'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LimitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Limits'] = ResolversParentTypes['Limits']> = {
  channels?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  productVariants?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  staffUsers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  warehouses?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManifestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Manifest'] = ResolversParentTypes['Manifest']> = {
  about?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  appUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  audience?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dataPrivacyUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extensions?: Resolver<Array<ResolversTypes['AppManifestExtension']>, ParentType, ContextType>;
  homepageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  supportUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenTargetUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  webhooks?: Resolver<Array<ResolversTypes['AppManifestWebhook']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManifestMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ManifestMutationResult'] = ResolversParentTypes['ManifestMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Manifest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaBase'] = ResolversParentTypes['MediaBase']> = {
  __resolveType: TypeResolveFn<'MediaCreated' | 'MediaDeleted' | 'MediaUpdated', ParentType, ContextType>;
  media?: Resolver<ResolversTypes['MediaItem'], ParentType, ContextType>;
};

export type MediaCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaCreated'] = ResolversParentTypes['MediaCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['MediaItem'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaDeleted'] = ResolversParentTypes['MediaDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['MediaItem'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaError'] = ResolversParentTypes['MediaError']> = {
  attributes?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaItem'] = ResolversParentTypes['MediaItem']> = {
  alt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  aspectRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<MediaItemFileArgs, 'format' | 'size'>>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isPublished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MediaItemMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<MediaItemMetafieldsArgs, 'keys'>>;
  oembedData?: Resolver<ResolversTypes['JSONString'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  placeholder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MediaItemPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<MediaItemPrivateMetafieldsArgs, 'keys'>>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Size']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  uploadedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaItemConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaItemConnection'] = ResolversParentTypes['MediaItemConnection']> = {
  edges?: Resolver<Array<ResolversTypes['MediaItemEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaItemEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaItemEdge'] = ResolversParentTypes['MediaItemEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['MediaItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaItemMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaItemMutationResult'] = ResolversParentTypes['MediaItemMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['MediaItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaUpdated'] = ResolversParentTypes['MediaUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['MediaItem'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuResolvers<ContextType = any, ParentType extends ResolversParentTypes['Menu'] = ResolversParentTypes['Menu']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MenuMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<MenuMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MenuPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<MenuPrivateMetafieldsArgs, 'keys'>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuBase'] = ResolversParentTypes['MenuBase']> = {
  __resolveType: TypeResolveFn<'MenuCreated' | 'MenuDeleted' | 'MenuUpdated', ParentType, ContextType>;
  menu?: Resolver<ResolversTypes['Menu'], ParentType, ContextType, RequireFields<MenuBaseMenuArgs, 'channel'>>;
};

export type MenuConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuConnection'] = ResolversParentTypes['MenuConnection']> = {
  edges?: Resolver<Array<ResolversTypes['MenuEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuCreated'] = ResolversParentTypes['MenuCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  menu?: Resolver<ResolversTypes['Menu'], ParentType, ContextType, RequireFields<MenuCreatedMenuArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuDeleted'] = ResolversParentTypes['MenuDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  menu?: Resolver<ResolversTypes['Menu'], ParentType, ContextType, RequireFields<MenuDeletedMenuArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuEdge'] = ResolversParentTypes['MenuEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Menu'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItem'] = ResolversParentTypes['MenuItem']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  children?: Resolver<Maybe<Array<ResolversTypes['MenuItem']>>, ParentType, ContextType>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  menu?: Resolver<ResolversTypes['Menu'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MenuItemMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<MenuItemMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Page']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MenuItemPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<MenuItemPrivateMetafieldsArgs, 'keys'>>;
  translation?: Resolver<Maybe<ResolversTypes['MenuItemTranslation']>, ParentType, ContextType, RequireFields<MenuItemTranslationArgs, 'languageCode'>>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemBase'] = ResolversParentTypes['MenuItemBase']> = {
  __resolveType: TypeResolveFn<'MenuItemCreated' | 'MenuItemDeleted' | 'MenuItemUpdated', ParentType, ContextType>;
  menuItem?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<MenuItemBaseMenuItemArgs, 'channel'>>;
};

export type MenuItemConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemConnection'] = ResolversParentTypes['MenuItemConnection']> = {
  edges?: Resolver<Array<ResolversTypes['MenuItemEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemCreated'] = ResolversParentTypes['MenuItemCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  menuItem?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<MenuItemCreatedMenuItemArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemDeleted'] = ResolversParentTypes['MenuItemDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  menuItem?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<MenuItemDeletedMenuItemArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemEdge'] = ResolversParentTypes['MenuItemEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemMutationResult'] = ResolversParentTypes['MenuItemMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemTranslation'] = ResolversParentTypes['MenuItemTranslation']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  menuItem?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemUpdated'] = ResolversParentTypes['MenuItemUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  menuItem?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<MenuItemUpdatedMenuItemArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuMutationResult'] = ResolversParentTypes['MenuMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Menu'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuUpdated'] = ResolversParentTypes['MenuUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  menu?: Resolver<ResolversTypes['Menu'], ParentType, ContextType, RequireFields<MenuUpdatedMenuArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MetadataScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Metadata'], any> {
  name: 'Metadata';
}

export type MetadataItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['MetadataItem'] = ResolversParentTypes['MetadataItem']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoneyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Money'] = ResolversParentTypes['Money']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  localized?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoneyRangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MoneyRange'] = ResolversParentTypes['MoneyRange']> = {
  start?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  stop?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  activateApp?: Resolver<ResolversTypes['AppMutationResult'], ParentType, ContextType, RequireFields<MutationActivateAppArgs, 'id'>>;
  activateChannel?: Resolver<ResolversTypes['ChannelMutationResult'], ParentType, ContextType, RequireFields<MutationActivateChannelArgs, 'id'>>;
  activateGiftCard?: Resolver<ResolversTypes['GiftCardMutationResult'], ParentType, ContextType, RequireFields<MutationActivateGiftCardArgs, 'id'>>;
  activateGiftCards?: Resolver<ResolversTypes['GiftCardBulkMutationResult'], ParentType, ContextType, RequireFields<MutationActivateGiftCardsArgs, 'ids'>>;
  addAddress?: Resolver<ResolversTypes['AddressMutationResult'], ParentType, ContextType, RequireFields<MutationAddAddressArgs, 'data' | 'type' | 'userId'>>;
  addCataloguesToSale?: Resolver<ResolversTypes['SaleMutationResult'], ParentType, ContextType, RequireFields<MutationAddCataloguesToSaleArgs, 'data' | 'id'>>;
  addCataloguesToVoucher?: Resolver<ResolversTypes['VoucherMutationResult'], ParentType, ContextType, RequireFields<MutationAddCataloguesToVoucherArgs, 'data' | 'id'>>;
  addCheckoutLines?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationAddCheckoutLinesArgs, 'id' | 'lines'>>;
  addDiscountToOrder?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationAddDiscountToOrderArgs, 'data' | 'orderId'>>;
  addNoteToGiftCard?: Resolver<ResolversTypes['Giftcardmutationresult'], ParentType, ContextType, RequireFields<MutationAddNoteToGiftCardArgs, 'data' | 'id'>>;
  addNoteToOrder?: Resolver<ResolversTypes['Ordermutationresult'], ParentType, ContextType, RequireFields<MutationAddNoteToOrderArgs, 'data' | 'id'>>;
  addPointsOfContactToCheckout?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationAddPointsOfContactToCheckoutArgs, 'id' | 'pointsOfContact'>>;
  addProductsToCollection?: Resolver<ResolversTypes['CollectionMutationResult'], ParentType, ContextType, RequireFields<MutationAddProductsToCollectionArgs, 'collectionId' | 'products'>>;
  addPromoCodeToCheckout?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationAddPromoCodeToCheckoutArgs, 'id' | 'promoCode'>>;
  approveFulfillment?: Resolver<ResolversTypes['OrderFulfillmentMutationResult'], ParentType, ContextType, RequireFields<MutationApproveFulfillmentArgs, 'allowStockToBeExceeded' | 'id' | 'notifyCustomer'>>;
  assignNavigation?: Resolver<ResolversTypes['MenuMutationResult'], ParentType, ContextType, RequireFields<MutationAssignNavigationArgs, 'menu' | 'navigationType'>>;
  assignPageAttribute?: Resolver<ResolversTypes['PageKlassMutationResult'], ParentType, ContextType, RequireFields<MutationAssignPageAttributeArgs, 'attributeIds' | 'pageKlassId'>>;
  assignProductAttribute?: Resolver<ResolversTypes['ProductAttributeAssignmentMutationResult'], ParentType, ContextType, RequireFields<MutationAssignProductAttributeArgs, 'klassId' | 'operations'>>;
  assignProductMedia?: Resolver<ResolversTypes['ProductMediaAssignmentMutationResult'], ParentType, ContextType, RequireFields<MutationAssignProductMediaArgs, 'mediaItemId' | 'productId'>>;
  assignWarehouseShippingZone?: Resolver<ResolversTypes['WarehouseShippingZoneAssignmentMutationResult'], ParentType, ContextType, RequireFields<MutationAssignWarehouseShippingZoneArgs, 'id' | 'shippingZoneIds'>>;
  attachCustomerToCheckout?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationAttachCustomerToCheckoutArgs, 'customerId' | 'id'>>;
  cancelFulfillment?: Resolver<ResolversTypes['OrderFulfillmentMutationResult'], ParentType, ContextType, RequireFields<MutationCancelFulfillmentArgs, 'id'>>;
  cancelOrder?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationCancelOrderArgs, 'id'>>;
  cancelOrders?: Resolver<ResolversTypes['OrderBulkMutationResult'], ParentType, ContextType, RequireFields<MutationCancelOrdersArgs, 'ids'>>;
  captureOrder?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationCaptureOrderArgs, 'amount' | 'id'>>;
  capturePayment?: Resolver<ResolversTypes['PaymentMutationResult'], ParentType, ContextType, RequireFields<MutationCapturePaymentArgs, 'amount' | 'paymentId'>>;
  changePassword?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'newPassword' | 'oldPassword'>>;
  checkPaymentBalance?: Resolver<ResolversTypes['PaymentCheckBalanceMutationResult'], ParentType, ContextType, RequireFields<MutationCheckPaymentBalanceArgs, 'data'>>;
  completeCheckout?: Resolver<ResolversTypes['CheckoutCompleteMutationResult'], ParentType, ContextType, RequireFields<MutationCompleteCheckoutArgs, 'id' | 'metadata' | 'paymentData' | 'redirectUrl'>>;
  completeOrderDraft?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationCompleteOrderDraftArgs, 'id'>>;
  confirmAccount?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationConfirmAccountArgs, 'email' | 'token'>>;
  confirmEmailChange?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationConfirmEmailChangeArgs, 'channel' | 'token'>>;
  confirmOrder?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationConfirmOrderArgs, 'id'>>;
  createApp?: Resolver<ResolversTypes['AppMutationResult'], ParentType, ContextType, RequireFields<MutationCreateAppArgs, 'data'>>;
  createAppToken?: Resolver<ResolversTypes['AppTokenMutationResult'], ParentType, ContextType, RequireFields<MutationCreateAppTokenArgs, 'data'>>;
  createAttribute?: Resolver<ResolversTypes['AttributeMutationResult'], ParentType, ContextType, RequireFields<MutationCreateAttributeArgs, 'data'>>;
  createCategory?: Resolver<ResolversTypes['CategoryMutationResult'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'data' | 'parentId'>>;
  createChannel?: Resolver<ResolversTypes['ChannelMutationResult'], ParentType, ContextType, RequireFields<MutationCreateChannelArgs, 'data'>>;
  createCheckout?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationCreateCheckoutArgs, 'data'>>;
  createCheckoutPayment?: Resolver<ResolversTypes['CheckoutPaymentMutationResult'], ParentType, ContextType, RequireFields<MutationCreateCheckoutPaymentArgs, 'data' | 'id'>>;
  createCollection?: Resolver<ResolversTypes['CollectionMutationResult'], ParentType, ContextType, RequireFields<MutationCreateCollectionArgs, 'data'>>;
  createCustomer?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'data'>>;
  createDigitalContent?: Resolver<ResolversTypes['DigitalContentMutationResult'], ParentType, ContextType, RequireFields<MutationCreateDigitalContentArgs, 'data' | 'productId'>>;
  createDigitalContentUrl?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationCreateDigitalContentUrlArgs, 'data'>>;
  createDraftOrder?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationCreateDraftOrderArgs, 'data'>>;
  createGiftCard?: Resolver<ResolversTypes['GiftCardMutationResult'], ParentType, ContextType, RequireFields<MutationCreateGiftCardArgs, 'data'>>;
  createGiftCards?: Resolver<ResolversTypes['GiftCardBulkMutationResult'], ParentType, ContextType, RequireFields<MutationCreateGiftCardsArgs, 'data'>>;
  createGroup?: Resolver<ResolversTypes['GroupMutationResult'], ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'data'>>;
  createInvoice?: Resolver<ResolversTypes['InvoiceMutationResult'], ParentType, ContextType, RequireFields<MutationCreateInvoiceArgs, 'data' | 'orderId'>>;
  createMedia?: Resolver<ResolversTypes['MediaItemMutationResult'], ParentType, ContextType, RequireFields<MutationCreateMediaArgs, 'data'>>;
  createMenu?: Resolver<ResolversTypes['MenuMutationResult'], ParentType, ContextType, RequireFields<MutationCreateMenuArgs, 'data'>>;
  createMenuItem?: Resolver<ResolversTypes['MenuItemMutationResult'], ParentType, ContextType, RequireFields<MutationCreateMenuItemArgs, 'data'>>;
  createOrderFromCheckout?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationCreateOrderFromCheckoutArgs, 'id' | 'metadata' | 'privateMetadata'>>;
  createOrderLines?: Resolver<ResolversTypes['OrderLinesMutationResult'], ParentType, ContextType, RequireFields<MutationCreateOrderLinesArgs, 'data' | 'id'>>;
  createPage?: Resolver<ResolversTypes['PageMutationResult'], ParentType, ContextType, RequireFields<MutationCreatePageArgs, 'data'>>;
  createPageKlass?: Resolver<ResolversTypes['PageKlassMutationResult'], ParentType, ContextType, RequireFields<MutationCreatePageKlassArgs, 'data'>>;
  createProduct?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'data'>>;
  createProductKlass?: Resolver<ResolversTypes['ProductKlassMutationResult'], ParentType, ContextType, RequireFields<MutationCreateProductKlassArgs, 'data'>>;
  createProductMediaItem?: Resolver<ResolversTypes['ProductMediaMutationResult'], ParentType, ContextType, RequireFields<MutationCreateProductMediaItemArgs, 'data'>>;
  createProductStocks?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationCreateProductStocksArgs, 'productId' | 'stocks'>>;
  createProductVariant?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationCreateProductVariantArgs, 'data'>>;
  createProducts?: Resolver<ResolversTypes['ProductBulkMutationResult'], ParentType, ContextType, RequireFields<MutationCreateProductsArgs, 'productId' | 'variants'>>;
  createSale?: Resolver<ResolversTypes['SaleMutationResult'], ParentType, ContextType, RequireFields<MutationCreateSaleArgs, 'data'>>;
  createShippingPrice?: Resolver<ResolversTypes['ShippingPriceMutationResult'], ParentType, ContextType, RequireFields<MutationCreateShippingPriceArgs, 'data'>>;
  createShippingZone?: Resolver<ResolversTypes['ShippingZoneMutationResult'], ParentType, ContextType, RequireFields<MutationCreateShippingZoneArgs, 'data'>>;
  createStaffMember?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationCreateStaffMemberArgs, 'data'>>;
  createStaffNotificationRecipient?: Resolver<ResolversTypes['StaffNotificationRecipientMutationResult'], ParentType, ContextType, RequireFields<MutationCreateStaffNotificationRecipientArgs, 'data'>>;
  createTaxClass?: Resolver<ResolversTypes['TaxClassMutationResult'], ParentType, ContextType, RequireFields<MutationCreateTaxClassArgs, 'data'>>;
  createTransaction?: Resolver<ResolversTypes['TransactionItemMutationResult'], ParentType, ContextType, RequireFields<MutationCreateTransactionArgs, 'id' | 'transaction' | 'transactionEvent'>>;
  createUser?: Resolver<ResolversTypes['UserCreationResult'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  createValue?: Resolver<ResolversTypes['AttributeMutationResult'], ParentType, ContextType, RequireFields<MutationCreateValueArgs, 'attributeId' | 'data'>>;
  createVoucher?: Resolver<ResolversTypes['VoucherMutationResult'], ParentType, ContextType, RequireFields<MutationCreateVoucherArgs, 'data'>>;
  createWarehouse?: Resolver<ResolversTypes['WarehouseMutationResult'], ParentType, ContextType, RequireFields<MutationCreateWarehouseArgs, 'data'>>;
  createWebhook?: Resolver<ResolversTypes['WebhookMutationResult'], ParentType, ContextType, RequireFields<MutationCreateWebhookArgs, 'data'>>;
  deactivateAllUserTokens?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType>;
  deactivateApp?: Resolver<ResolversTypes['AppMutationResult'], ParentType, ContextType, RequireFields<MutationDeactivateAppArgs, 'id'>>;
  deactivateChannel?: Resolver<ResolversTypes['ChannelMutationResult'], ParentType, ContextType, RequireFields<MutationDeactivateChannelArgs, 'id'>>;
  deactivateGiftCard?: Resolver<ResolversTypes['GiftCardMutationResult'], ParentType, ContextType, RequireFields<MutationDeactivateGiftCardArgs, 'id'>>;
  deactivateGiftCards?: Resolver<ResolversTypes['GiftCardBulkMutationResult'], ParentType, ContextType, RequireFields<MutationDeactivateGiftCardsArgs, 'ids'>>;
  deactivateProductPreorder?: Resolver<ResolversTypes['ProductPreorderDeactivationMutationResult'], ParentType, ContextType, RequireFields<MutationDeactivateProductPreorderArgs, 'id'>>;
  deleteAccount?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'token'>>;
  deleteAddress?: Resolver<ResolversTypes['AddressMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteAddressArgs, 'id'>>;
  deleteApp?: Resolver<ResolversTypes['AppMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteAppArgs, 'id'>>;
  deleteAppToken?: Resolver<ResolversTypes['AppTokenMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteAppTokenArgs, 'id'>>;
  deleteAttribute?: Resolver<ResolversTypes['AttributeMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteAttributeArgs, 'id'>>;
  deleteAttributes?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteAttributesArgs, 'ids'>>;
  deleteCategories?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteCategoriesArgs, 'ids'>>;
  deleteCategory?: Resolver<ResolversTypes['CategoryMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deleteChannel?: Resolver<ResolversTypes['ChannelMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteChannelArgs, 'data' | 'id'>>;
  deleteCheckoutLine?: Resolver<ResolversTypes['CheckoutOptionalMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteCheckoutLineArgs, 'id' | 'lineId'>>;
  deleteCheckoutLines?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteCheckoutLinesArgs, 'id' | 'linesIds'>>;
  deleteCollection?: Resolver<ResolversTypes['CollectionMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteCollectionArgs, 'id'>>;
  deleteCollections?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteCollectionsArgs, 'ids'>>;
  deleteCustomer?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteCustomerArgs, 'id'>>;
  deleteCustomers?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteCustomersArgs, 'ids'>>;
  deleteDigitalContent?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType>;
  deleteFailedInstallation?: Resolver<ResolversTypes['AppInstallationMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteFailedInstallationArgs, 'id'>>;
  deleteGiftCard?: Resolver<ResolversTypes['GiftCardMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteGiftCardArgs, 'id'>>;
  deleteGiftCards?: Resolver<ResolversTypes['GiftCardBulkMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteGiftCardsArgs, 'ids'>>;
  deleteGroup?: Resolver<ResolversTypes['GroupMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteGroupArgs, 'id'>>;
  deleteInvoice?: Resolver<ResolversTypes['InvoiceMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteInvoiceArgs, 'id'>>;
  deleteMediaItem?: Resolver<ResolversTypes['MediaItemMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteMediaItemArgs, 'id'>>;
  deleteMediaItems?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteMediaItemsArgs, 'ids'>>;
  deleteMenu?: Resolver<ResolversTypes['MenuMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteMenuArgs, 'id'>>;
  deleteMenuItem?: Resolver<ResolversTypes['MenuItemMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteMenuItemArgs, 'id'>>;
  deleteMenuItems?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteMenuItemsArgs, 'ids'>>;
  deleteMenus?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteMenusArgs, 'ids'>>;
  deleteMetadata?: Resolver<ResolversTypes['ObjectWithMetadataMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteMetadataArgs, 'id' | 'keys'>>;
  deleteOrderDiscount?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteOrderDiscountArgs, 'discountId'>>;
  deleteOrderDraft?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteOrderDraftArgs, 'id'>>;
  deleteOrderDrafts?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteOrderDraftsArgs, 'ids'>>;
  deleteOrderLine?: Resolver<ResolversTypes['OrderLineMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteOrderLineArgs, 'id'>>;
  deletePage?: Resolver<ResolversTypes['PageMutationResult'], ParentType, ContextType, RequireFields<MutationDeletePageArgs, 'id'>>;
  deletePageKlass?: Resolver<ResolversTypes['PageKlassMutationResult'], ParentType, ContextType, RequireFields<MutationDeletePageKlassArgs, 'id'>>;
  deletePageKlasses?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeletePageKlassesArgs, 'ids'>>;
  deletePages?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeletePagesArgs, 'ids'>>;
  deletePrivateMetadata?: Resolver<ResolversTypes['ObjectWithMetadataMutationResult'], ParentType, ContextType, RequireFields<MutationDeletePrivateMetadataArgs, 'id' | 'keys'>>;
  deleteProduct?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteProductKlass?: Resolver<ResolversTypes['ProductKlassMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteProductKlassArgs, 'id'>>;
  deleteProductKlasses?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteProductKlassesArgs, 'ids'>>;
  deleteProductMediaItem?: Resolver<ResolversTypes['ProductMediaMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteProductMediaItemArgs, 'id'>>;
  deleteProductMediaItems?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteProductMediaItemsArgs, 'ids'>>;
  deleteProductStocks?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteProductStocksArgs, 'productId' | 'sku' | 'warehouseIds'>>;
  deleteProductVariant?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteProductVariantArgs, 'id' | 'sku'>>;
  deleteProductVariants?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteProductVariantsArgs, 'ids' | 'skus'>>;
  deleteProducts?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteProductsArgs, 'ids'>>;
  deleteSale?: Resolver<ResolversTypes['SaleMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteSaleArgs, 'id'>>;
  deleteSales?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteSalesArgs, 'ids'>>;
  deleteShippingPrice?: Resolver<ResolversTypes['ShippingPriceMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteShippingPriceArgs, 'id'>>;
  deleteShippingPrices?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteShippingPricesArgs, 'ids'>>;
  deleteShippingZone?: Resolver<ResolversTypes['ShippingZoneMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteShippingZoneArgs, 'id'>>;
  deleteShippingZones?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteShippingZonesArgs, 'ids'>>;
  deleteStaffMember?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteStaffMemberArgs, 'id'>>;
  deleteStaffMembers?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteStaffMembersArgs, 'ids'>>;
  deleteStaffNotificationRecipient?: Resolver<ResolversTypes['StaffNotificationRecipientMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteStaffNotificationRecipientArgs, 'id'>>;
  deleteTaxClass?: Resolver<ResolversTypes['TaxClassMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteTaxClassArgs, 'id'>>;
  deleteTaxCountryConfiguration?: Resolver<ResolversTypes['TaxCountryConfigurationMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteTaxCountryConfigurationArgs, 'countryCode'>>;
  deleteUserAvatar?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType>;
  deleteValue?: Resolver<ResolversTypes['AttributeMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteValueArgs, 'id'>>;
  deleteValues?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteValuesArgs, 'ids'>>;
  deleteVoucher?: Resolver<ResolversTypes['VoucherMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteVoucherArgs, 'id'>>;
  deleteVouchers?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteVouchersArgs, 'ids'>>;
  deleteWarehouse?: Resolver<ResolversTypes['WarehouseMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteWarehouseArgs, 'id'>>;
  deleteWebhook?: Resolver<ResolversTypes['WebhookMutationResult'], ParentType, ContextType, RequireFields<MutationDeleteWebhookArgs, 'id'>>;
  detachCustomerFromCheckout?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationDetachCustomerFromCheckoutArgs, 'id'>>;
  excludeProductsFromShippingPrice?: Resolver<ResolversTypes['ShippingMethodMutationResult'], ParentType, ContextType, RequireFields<MutationExcludeProductsFromShippingPriceArgs, 'data' | 'id'>>;
  exportGiftCards?: Resolver<ResolversTypes['ExportFileMutationResult'], ParentType, ContextType, RequireFields<MutationExportGiftCardsArgs, 'data'>>;
  exportProducts?: Resolver<ResolversTypes['ExportFileMutationResult'], ParentType, ContextType, RequireFields<MutationExportProductsArgs, 'data'>>;
  externalAuthenticationUrl?: Resolver<ResolversTypes['AuthPluginMutationResult'], ParentType, ContextType, RequireFields<MutationExternalAuthenticationUrlArgs, 'pluginInput'>>;
  fetchAppManifest?: Resolver<ResolversTypes['ManifestMutationResult'], ParentType, ContextType, RequireFields<MutationFetchAppManifestArgs, 'manifestUrl'>>;
  fulfillOrder?: Resolver<ResolversTypes['OrderFulfillmentMutationResult'], ParentType, ContextType, RequireFields<MutationFulfillOrderArgs, 'data' | 'order'>>;
  initializePayment?: Resolver<ResolversTypes['PaymentInitializeMutationResult'], ParentType, ContextType, RequireFields<MutationInitializePaymentArgs, 'channel' | 'gateway' | 'paymentData'>>;
  installApp?: Resolver<ResolversTypes['AppMutationResult'], ParentType, ContextType, RequireFields<MutationInstallAppArgs, 'data'>>;
  logout?: Resolver<ResolversTypes['AuthPluginMutationResult'], ParentType, ContextType, RequireFields<MutationLogoutArgs, 'pluginInput'>>;
  manageTaxExemption?: Resolver<ResolversTypes['TaxSourceObjectMutationResult'], ParentType, ContextType, RequireFields<MutationManageTaxExemptionArgs, 'id' | 'taxExemption'>>;
  markOrderAsPaid?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationMarkOrderAsPaidArgs, 'id'>>;
  moveMenuItem?: Resolver<ResolversTypes['MenuMutationResult'], ParentType, ContextType, RequireFields<MutationMoveMenuItemArgs, 'menuId' | 'moves'>>;
  obtainToken?: Resolver<ResolversTypes['JWTMutationResult'], ParentType, ContextType, RequireFields<MutationObtainTokenArgs, 'audience' | 'authInput' | 'pluginInput'>>;
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  productKlass?: Resolver<ResolversTypes['ProductKlass'], ParentType, ContextType>;
  publishMediaItems?: Resolver<ResolversTypes['IDListMutationResult'], ParentType, ContextType, RequireFields<MutationPublishMediaItemsArgs, 'ids' | 'isPublished'>>;
  publishPages?: Resolver<ResolversTypes['PageBulkMutationResult'], ParentType, ContextType, RequireFields<MutationPublishPagesArgs, 'ids' | 'isPublished'>>;
  refreshToken?: Resolver<ResolversTypes['JWTMutationResult'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'csrfToken' | 'pluginInput' | 'refreshToken'>>;
  refundFulfilledProducts?: Resolver<ResolversTypes['OrderFulfillmentMutationResult'], ParentType, ContextType, RequireFields<MutationRefundFulfilledProductsArgs, 'data' | 'order'>>;
  refundOrder?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationRefundOrderArgs, 'amount' | 'id'>>;
  refundPayment?: Resolver<ResolversTypes['PaymentMutationResult'], ParentType, ContextType, RequireFields<MutationRefundPaymentArgs, 'amount' | 'paymentId'>>;
  removeCataloguesFromSale?: Resolver<ResolversTypes['SaleMutationResult'], ParentType, ContextType, RequireFields<MutationRemoveCataloguesFromSaleArgs, 'data' | 'id'>>;
  removeCataloguesFromVoucher?: Resolver<ResolversTypes['VoucherMutationResult'], ParentType, ContextType, RequireFields<MutationRemoveCataloguesFromVoucherArgs, 'data' | 'id'>>;
  removeOrderLineDiscount?: Resolver<ResolversTypes['OrderLineMutationResult'], ParentType, ContextType, RequireFields<MutationRemoveOrderLineDiscountArgs, 'orderLineId'>>;
  removeProductFromShippingPriceExclusionList?: Resolver<ResolversTypes['ShippingPriceRemoveProductFromExcludeMutationResult'], ParentType, ContextType, RequireFields<MutationRemoveProductFromShippingPriceExclusionListArgs, 'id' | 'products'>>;
  removeProductsFromCollection?: Resolver<ResolversTypes['CollectionMutationResult'], ParentType, ContextType, RequireFields<MutationRemoveProductsFromCollectionArgs, 'collectionId' | 'products'>>;
  removePromoCodeFromCheckout?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationRemovePromoCodeFromCheckoutArgs, 'id' | 'promoCode' | 'promoCodeId'>>;
  reorderChannelWarehouses?: Resolver<ResolversTypes['ChannelReorderWarehousesMutationResult'], ParentType, ContextType, RequireFields<MutationReorderChannelWarehousesArgs, 'channelId' | 'moves'>>;
  reorderCollectionProducts?: Resolver<ResolversTypes['CollectionMutationResult'], ParentType, ContextType, RequireFields<MutationReorderCollectionProductsArgs, 'collectionId' | 'moves'>>;
  reorderPageKlassAttributes?: Resolver<ResolversTypes['PageKlassMutationResult'], ParentType, ContextType, RequireFields<MutationReorderPageKlassAttributesArgs, 'moves' | 'pageKlassId'>>;
  reorderPageValues?: Resolver<ResolversTypes['PageMutationResult'], ParentType, ContextType, RequireFields<MutationReorderPageValuesArgs, 'attributeId' | 'moves' | 'pageId'>>;
  reorderProductKlassAttributes?: Resolver<ResolversTypes['ProductKlassMutationResult'], ParentType, ContextType, RequireFields<MutationReorderProductKlassAttributesArgs, 'klassId' | 'moves' | 'type'>>;
  reorderProductMedia?: Resolver<ResolversTypes['ProductMediaMutationResult'], ParentType, ContextType, RequireFields<MutationReorderProductMediaArgs, 'mediaItemIds' | 'productId'>>;
  reorderProductValues?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationReorderProductValuesArgs, 'attributeId' | 'moves' | 'productId'>>;
  reorderProductVariants?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationReorderProductVariantsArgs, 'moves' | 'productId'>>;
  reorderValues?: Resolver<ResolversTypes['AttributeMutationResult'], ParentType, ContextType, RequireFields<MutationReorderValuesArgs, 'attributeId' | 'moves'>>;
  requestAccountDeletion?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationRequestAccountDeletionArgs, 'channel' | 'id'>>;
  requestEmailChange?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationRequestEmailChangeArgs, 'channel' | 'newEmail' | 'password'>>;
  requestInvoice?: Resolver<ResolversTypes['OrderInvoiceMutationResult'], ParentType, ContextType, RequireFields<MutationRequestInvoiceArgs, 'orderId'>>;
  requestInvoiceDeletion?: Resolver<ResolversTypes['InvoiceMutationResult'], ParentType, ContextType, RequireFields<MutationRequestInvoiceDeletionArgs, 'id'>>;
  requestPasswordReset?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationRequestPasswordResetArgs, 'channel' | 'email' | 'redirectUrl'>>;
  requestTransactionAction?: Resolver<ResolversTypes['TransactionItemMutationResult'], ParentType, ContextType, RequireFields<MutationRequestTransactionActionArgs, 'actionType' | 'amount' | 'id'>>;
  resendGiftCard?: Resolver<ResolversTypes['GiftCardMutationResult'], ParentType, ContextType, RequireFields<MutationResendGiftCardArgs, 'data'>>;
  retryAppInstallation?: Resolver<ResolversTypes['AppMutationResult'], ParentType, ContextType, RequireFields<MutationRetryAppInstallationArgs, 'activateAfterInstallation' | 'id'>>;
  retryEventDelivery?: Resolver<ResolversTypes['EventDeliveryMutationResult'], ParentType, ContextType, RequireFields<MutationRetryEventDeliveryArgs, 'id'>>;
  returnFulfilledProducts?: Resolver<ResolversTypes['OrderFulfillmentMutationResult'], ParentType, ContextType, RequireFields<MutationReturnFulfilledProductsArgs, 'data' | 'order'>>;
  sendInvoiceNotification?: Resolver<ResolversTypes['InvoiceMutationResult'], ParentType, ContextType, RequireFields<MutationSendInvoiceNotificationArgs, 'id'>>;
  setDefaultAddress?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationSetDefaultAddressArgs, 'addressId' | 'type' | 'userId'>>;
  setDefaultVariant?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationSetDefaultVariantArgs, 'productId' | 'variantId'>>;
  setPassword?: Resolver<ResolversTypes['JWTMutationResult'], ParentType, ContextType, RequireFields<MutationSetPasswordArgs, 'email' | 'password' | 'token'>>;
  setUsersActive?: Resolver<ResolversTypes['UserBulkMutationResult'], ParentType, ContextType, RequireFields<MutationSetUsersActiveArgs, 'ids' | 'isActive'>>;
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType>;
  translateAttribute?: Resolver<ResolversTypes['AttributeMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateAttributeArgs, 'data' | 'id' | 'languageCode'>>;
  translateCategory?: Resolver<ResolversTypes['CategoryMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateCategoryArgs, 'data' | 'id' | 'languageCode'>>;
  translateCollection?: Resolver<ResolversTypes['CollectionMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateCollectionArgs, 'data' | 'id' | 'languageCode'>>;
  translateMenuItem?: Resolver<ResolversTypes['MenuItemMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateMenuItemArgs, 'data' | 'id' | 'languageCode'>>;
  translatePage?: Resolver<ResolversTypes['PageMutationResult'], ParentType, ContextType, RequireFields<MutationTranslatePageArgs, 'data' | 'id' | 'languageCode'>>;
  translateProduct?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateProductArgs, 'data' | 'id' | 'languageCode'>>;
  translateProductVariant?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateProductVariantArgs, 'data' | 'id' | 'languageCode'>>;
  translateSale?: Resolver<ResolversTypes['SaleMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateSaleArgs, 'data' | 'id' | 'languageCode'>>;
  translateShippingPrice?: Resolver<ResolversTypes['ShippingMethodMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateShippingPriceArgs, 'data' | 'id' | 'languageCode'>>;
  translateShopSettings?: Resolver<ResolversTypes['SiteTranslationMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateShopSettingsArgs, 'data' | 'languageCode'>>;
  translateValue?: Resolver<ResolversTypes['ValueMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateValueArgs, 'data' | 'id' | 'languageCode'>>;
  translateVoucher?: Resolver<ResolversTypes['VoucherMutationResult'], ParentType, ContextType, RequireFields<MutationTranslateVoucherArgs, 'data' | 'id' | 'languageCode'>>;
  triggerExternalNotification?: Resolver<ResolversTypes['ExternalNotificationTriggerMutationResult'], ParentType, ContextType, RequireFields<MutationTriggerExternalNotificationArgs, 'channel' | 'data' | 'pluginId'>>;
  unassignPageAttribute?: Resolver<ResolversTypes['PageKlassMutationResult'], ParentType, ContextType, RequireFields<MutationUnassignPageAttributeArgs, 'attributeIds' | 'pageKlassId'>>;
  unassignProductAttribute?: Resolver<ResolversTypes['ProductKlassMutationResult'], ParentType, ContextType, RequireFields<MutationUnassignProductAttributeArgs, 'attributeIds' | 'klassId'>>;
  unassignProductMedia?: Resolver<ResolversTypes['ProductMediaUnassignmentMutationResult'], ParentType, ContextType, RequireFields<MutationUnassignProductMediaArgs, 'mediaItemId' | 'productId'>>;
  unassignWarehouseShippingZone?: Resolver<ResolversTypes['WarehouseShippingZoneUnassignmentMutationResult'], ParentType, ContextType, RequireFields<MutationUnassignWarehouseShippingZoneArgs, 'id' | 'shippingZoneIds'>>;
  updateAddress?: Resolver<ResolversTypes['AddressMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateAddressArgs, 'data' | 'id'>>;
  updateApp?: Resolver<ResolversTypes['AppMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateAppArgs, 'data' | 'id'>>;
  updateAttribute?: Resolver<ResolversTypes['AttributeMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateAttributeArgs, 'data' | 'id'>>;
  updateCategory?: Resolver<ResolversTypes['CategoryMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'data' | 'id'>>;
  updateChannel?: Resolver<ResolversTypes['ChannelMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateChannelArgs, 'data' | 'id'>>;
  updateCheckoutBillingAddress?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCheckoutBillingAddressArgs, 'data' | 'id' | 'validationRules'>>;
  updateCheckoutContactInfo?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCheckoutContactInfoArgs, 'data' | 'id'>>;
  updateCheckoutFulfillmentMethod?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCheckoutFulfillmentMethodArgs, 'fulfillmentDeadline' | 'fulfillmentMethodId' | 'id'>>;
  updateCheckoutLanguageCode?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCheckoutLanguageCodeArgs, 'id' | 'languageCode'>>;
  updateCheckoutLines?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCheckoutLinesArgs, 'id' | 'lines'>>;
  updateCheckoutShippingAddress?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCheckoutShippingAddressArgs, 'data' | 'id' | 'validationRules'>>;
  updateCheckoutShippingMethod?: Resolver<ResolversTypes['CheckoutMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCheckoutShippingMethodArgs, 'id' | 'shippingMethodId'>>;
  updateCollection?: Resolver<ResolversTypes['CollectionMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCollectionArgs, 'data' | 'id'>>;
  updateCollectionChannelListing?: Resolver<ResolversTypes['CollectionChannelListingMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateCollectionChannelListingArgs, 'data' | 'id'>>;
  updateDigitalContent?: Resolver<ResolversTypes['DigitalContentMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateDigitalContentArgs, 'data' | 'productId'>>;
  updateDraftOrder?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateDraftOrderArgs, 'data' | 'id'>>;
  updateFulfillmentTracking?: Resolver<ResolversTypes['OrderFulfillmentMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateFulfillmentTrackingArgs, 'data' | 'id'>>;
  updateGiftCard?: Resolver<ResolversTypes['GiftCardMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateGiftCardArgs, 'data' | 'id'>>;
  updateGiftCardSettings?: Resolver<ResolversTypes['GiftCardSettingsMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateGiftCardSettingsArgs, 'data'>>;
  updateGroup?: Resolver<ResolversTypes['GroupMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateGroupArgs, 'data' | 'id'>>;
  updateInvoice?: Resolver<ResolversTypes['InvoiceMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateInvoiceArgs, 'data' | 'id'>>;
  updateMedia?: Resolver<ResolversTypes['MediaItemMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateMediaArgs, 'data' | 'id'>>;
  updateMenu?: Resolver<ResolversTypes['MenuMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateMenuArgs, 'data' | 'id'>>;
  updateMenuItem?: Resolver<ResolversTypes['MenuItemMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateMenuItemArgs, 'data' | 'id'>>;
  updateMetadata?: Resolver<ResolversTypes['ObjectWithMetadataMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateMetadataArgs, 'data' | 'id'>>;
  updateOrder?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateOrderArgs, 'data' | 'id'>>;
  updateOrderDiscount?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateOrderDiscountArgs, 'data' | 'discountId'>>;
  updateOrderLine?: Resolver<ResolversTypes['OrderLineMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateOrderLineArgs, 'data' | 'id'>>;
  updateOrderLineDiscount?: Resolver<ResolversTypes['OrderLineMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateOrderLineDiscountArgs, 'data' | 'orderLineId'>>;
  updateOrderSettings?: Resolver<ResolversTypes['OrderSettingsMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateOrderSettingsArgs, 'data'>>;
  updateOrderShipping?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateOrderShippingArgs, 'data' | 'orderId'>>;
  updatePage?: Resolver<ResolversTypes['PageMutationResult'], ParentType, ContextType, RequireFields<MutationUpdatePageArgs, 'data' | 'id'>>;
  updatePageKlass?: Resolver<ResolversTypes['PageKlassMutationResult'], ParentType, ContextType, RequireFields<MutationUpdatePageKlassArgs, 'data' | 'id'>>;
  updatePlugin?: Resolver<ResolversTypes['PluginMutationResult'], ParentType, ContextType, RequireFields<MutationUpdatePluginArgs, 'channelId' | 'data' | 'id'>>;
  updatePrivateMetadata?: Resolver<ResolversTypes['ObjectWithMetadataMutationResult'], ParentType, ContextType, RequireFields<MutationUpdatePrivateMetadataArgs, 'data' | 'id'>>;
  updateProduct?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'data' | 'id'>>;
  updateProductAttributeAssignment?: Resolver<ResolversTypes['ProductKlassMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateProductAttributeAssignmentArgs, 'klassId' | 'operations'>>;
  updateProductChannelListing?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateProductChannelListingArgs, 'data' | 'id' | 'sku'>>;
  updateProductKlass?: Resolver<ResolversTypes['ProductKlassMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateProductKlassArgs, 'data' | 'id'>>;
  updateProductMedia?: Resolver<ResolversTypes['ProductMediaMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateProductMediaArgs, 'data' | 'id'>>;
  updateProductStocks?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateProductStocksArgs, 'productId' | 'sku' | 'stocks'>>;
  updateProductVariant?: Resolver<ResolversTypes['ProductMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateProductVariantArgs, 'data' | 'id' | 'sku'>>;
  updateSale?: Resolver<ResolversTypes['SaleMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateSaleArgs, 'data' | 'id'>>;
  updateSaleChannelListing?: Resolver<ResolversTypes['SaleMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateSaleChannelListingArgs, 'data' | 'id'>>;
  updateShippingMethodChannelListing?: Resolver<ResolversTypes['ShippingMethodChannelListingMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateShippingMethodChannelListingArgs, 'data' | 'id'>>;
  updateShippingPrice?: Resolver<ResolversTypes['ShippingPriceMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateShippingPriceArgs, 'data' | 'id'>>;
  updateShippingZone?: Resolver<ResolversTypes['ShippingZoneMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateShippingZoneArgs, 'data' | 'id'>>;
  updateShopAddress?: Resolver<ResolversTypes['SiteMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateShopAddressArgs, 'data'>>;
  updateShopDomain?: Resolver<ResolversTypes['SiteMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateShopDomainArgs, 'data'>>;
  updateShopSettings?: Resolver<ResolversTypes['SiteMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateShopSettingsArgs, 'data'>>;
  updateStaffMember?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateStaffMemberArgs, 'data' | 'id'>>;
  updateStaffNotificationRecipient?: Resolver<ResolversTypes['StaffNotificationRecipientMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateStaffNotificationRecipientArgs, 'data' | 'id'>>;
  updateTaxClass?: Resolver<ResolversTypes['TaxClassMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateTaxClassArgs, 'data' | 'id'>>;
  updateTaxConfiguration?: Resolver<ResolversTypes['TaxConfigurationMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateTaxConfigurationArgs, 'data' | 'id'>>;
  updateTaxCountryConfiguration?: Resolver<ResolversTypes['TaxCountryConfigurationMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateTaxCountryConfigurationArgs, 'countryCode' | 'updateTaxClassRates'>>;
  updateTransaction?: Resolver<ResolversTypes['TransactionItemMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateTransactionArgs, 'id' | 'transaction' | 'transactionEvent'>>;
  updateUser?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data' | 'id'>>;
  updateUserAvatar?: Resolver<ResolversTypes['UserMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateUserAvatarArgs, 'image'>>;
  updateValue?: Resolver<ResolversTypes['AttributeMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateValueArgs, 'data' | 'id'>>;
  updateVoucher?: Resolver<ResolversTypes['VoucherMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateVoucherArgs, 'data' | 'id'>>;
  updateVoucherChannelListing?: Resolver<ResolversTypes['VoucherMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateVoucherChannelListingArgs, 'data' | 'id'>>;
  updateWarehouse?: Resolver<ResolversTypes['WarehouseMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateWarehouseArgs, 'data' | 'id'>>;
  updateWebhook?: Resolver<ResolversTypes['WebhookMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateWebhookArgs, 'data' | 'id'>>;
  uploadFile?: Resolver<ResolversTypes['FileMutationResult'], ParentType, ContextType, RequireFields<MutationUploadFileArgs, 'file'>>;
  verifyAppToken?: Resolver<ResolversTypes['BoolMutationResult'], ParentType, ContextType, RequireFields<MutationVerifyAppTokenArgs, 'token'>>;
  verifyToken?: Resolver<ResolversTypes['TokenVerificationMutationResult'], ParentType, ContextType, RequireFields<MutationVerifyTokenArgs, 'pluginInput' | 'token'>>;
  voidOrder?: Resolver<ResolversTypes['OrderMutationResult'], ParentType, ContextType, RequireFields<MutationVoidOrderArgs, 'id'>>;
  voidPayment?: Resolver<ResolversTypes['PaymentMutationResult'], ParentType, ContextType, RequireFields<MutationVoidPaymentArgs, 'paymentId'>>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'AbstractProduct' | 'AccountEvent' | 'Address' | 'Allocation' | 'App' | 'AppExtension' | 'AppInstallation' | 'AppToken' | 'AsyncWebhookEvent' | 'Attribute' | 'AttributeTranslation' | 'Category' | 'CategoryTranslation' | 'Channel' | 'Checkout' | 'CheckoutLine' | 'Collection' | 'CollectionChannelListing' | 'CollectionTranslation' | 'ConcreteProduct' | 'DigitalContent' | 'DigitalContentUrl' | 'EventDelivery' | 'ExportEvent' | 'ExportFile' | 'Fulfillment' | 'FulfillmentLine' | 'GiftCard' | 'GiftCardEvent' | 'GiftCardTag' | 'Group' | 'Invoice' | 'MediaItem' | 'Menu' | 'MenuItem' | 'MenuItemTranslation' | 'Order' | 'OrderDiscount' | 'OrderEvent' | 'OrderLine' | 'Page' | 'PageKlass' | 'PageTranslation' | 'Payment' | 'PointOfContact' | 'ProductChannelListing' | 'ProductImage' | 'ProductKlass' | 'ProductMediaItem' | 'ProductTranslation' | 'Sale' | 'SaleChannelListing' | 'SaleTranslation' | 'ShippingMethod' | 'ShippingMethodChannelListing' | 'ShippingMethodPostalCodeRule' | 'ShippingMethodTranslation' | 'ShippingZone' | 'Site' | 'SiteTranslation' | 'StaffNotificationRecipient' | 'Stock' | 'SyncWebhookEvent' | 'TaxClass' | 'TaxConfiguration' | 'TaxConfigurationPerCountry' | 'Transaction' | 'TransactionEvent' | 'TransactionItem' | 'User' | 'Value' | 'ValueTranslation' | 'Voucher' | 'VoucherChannelListing' | 'VoucherTranslation' | 'Warehouse' | 'Webhook', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
};

export type ObjectWithMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ObjectWithMetadata'] = ResolversParentTypes['ObjectWithMetadata']> = {
  __resolveType: TypeResolveFn<'AbstractProduct' | 'App' | 'Attribute' | 'Category' | 'Checkout' | 'CheckoutLine' | 'Collection' | 'ConcreteProduct' | 'DigitalContent' | 'Fulfillment' | 'GiftCard' | 'Invoice' | 'MediaItem' | 'Menu' | 'MenuItem' | 'Order' | 'OrderLine' | 'Page' | 'PageKlass' | 'Payment' | 'ProductKlass' | 'Sale' | 'ShippingMethod' | 'ShippingZone' | 'TaxClass' | 'TaxConfiguration' | 'TransactionItem' | 'User' | 'Voucher' | 'Warehouse', ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ObjectWithMetadataMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ObjectWithMetadataMetafieldsArgs, 'keys'>>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ObjectWithMetadataPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ObjectWithMetadataPrivateMetafieldsArgs, 'keys'>>;
};

export type ObjectWithMetadataMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ObjectWithMetadataMutationResult'] = ResolversParentTypes['ObjectWithMetadataMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['ObjectWithMetadata'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  actions?: Resolver<Array<ResolversTypes['OrderAction']>, ParentType, ContextType>;
  authorizeStatus?: Resolver<ResolversTypes['OrderAuthorizeStatus'], ParentType, ContextType>;
  availableCollectionPoints?: Resolver<Array<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  availableShippingMethods?: Resolver<Maybe<Array<ResolversTypes['ShippingMethod']>>, ParentType, ContextType>;
  billingAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  canFinalize?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  chargeStatus?: Resolver<ResolversTypes['OrderChargeStatus'], ParentType, ContextType>;
  collectionPointName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  customerEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerFirstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerLastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customerNote?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['Money']>, ParentType, ContextType>;
  discountName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discounts?: Resolver<Array<ResolversTypes['OrderDiscount']>, ParentType, ContextType>;
  displayGrossPrices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Array<ResolversTypes['OrderError']>, ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['OrderEvent']>, ParentType, ContextType>;
  fulfillmentDeadline?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fulfillmentMethod?: Resolver<Maybe<ResolversTypes['FulfillmentMethod']>, ParentType, ContextType>;
  fulfillmentMethodType?: Resolver<Maybe<ResolversTypes['FulfillmentMethodType']>, ParentType, ContextType>;
  fulfillments?: Resolver<Array<ResolversTypes['Fulfillment']>, ParentType, ContextType>;
  giftCards?: Resolver<Array<ResolversTypes['GiftCard']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  invoices?: Resolver<Array<ResolversTypes['Invoice']>, ParentType, ContextType>;
  isPaid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isShippingRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  lines?: Resolver<Array<ResolversTypes['OrderLine']>, ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<OrderMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<OrderMetafieldsArgs, 'keys'>>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['OrderOrigin'], ParentType, ContextType>;
  original?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes['ChargeStatus'], ParentType, ContextType>;
  paymentStatusDisplay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payments?: Resolver<Array<ResolversTypes['Payment']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pointsOfContact?: Resolver<Array<ResolversTypes['PointOfContact']>, ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<OrderPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<OrderPrivateMetafieldsArgs, 'keys'>>;
  redirectUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  shippingMethod?: Resolver<Maybe<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  shippingMethodName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingMethods?: Resolver<Array<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  shippingPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  shippingTaxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  shippingTaxClassMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  shippingTaxClassName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingTaxClassPrivateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  shippingTaxRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  statusDisplay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtotal?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  taxExemption?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  totalAuthorized?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  totalBalance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  totalCaptured?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  trackingClientId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['TransactionItem']>, ParentType, ContextType>;
  translatedDiscountName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  undiscountedTotal?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  voucher?: Resolver<Maybe<ResolversTypes['Voucher']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Weight']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderBase'] = ResolversParentTypes['OrderBase']> = {
  __resolveType: TypeResolveFn<'CreateOrderd' | 'DraftOrderCreated' | 'DraftOrderDeleted' | 'DraftOrderUpdated' | 'OrderCancelled' | 'OrderConfirmed' | 'OrderFilterShippingMethods' | 'OrderFulfilled' | 'OrderFullyPaid' | 'OrderMetadataUpdated' | 'OrderUpdated', ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
};

export type OrderBulkMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderBulkMutationResult'] = ResolversParentTypes['OrderBulkMutationResult']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  objects?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderCancelledResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderCancelled'] = ResolversParentTypes['OrderCancelled']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderConfirmedResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderConfirmed'] = ResolversParentTypes['OrderConfirmed']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderConnection'] = ResolversParentTypes['OrderConnection']> = {
  edges?: Resolver<Array<ResolversTypes['OrderEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderDiscountResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderDiscount'] = ResolversParentTypes['OrderDiscount']> = {
  amount?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  translatedName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['OrderDiscountType'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['PositiveDecimal'], ParentType, ContextType>;
  valueType?: Resolver<ResolversTypes['DiscountValueType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderEdge'] = ResolversParentTypes['OrderEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderError'] = ResolversParentTypes['OrderError']> = {
  addressType?: Resolver<Maybe<ResolversTypes['AddressType']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderLines?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  variants?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderEvent'] = ResolversParentTypes['OrderEvent']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  composedId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['OrderDiscount'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailType?: Resolver<ResolversTypes['OrderEventEmailType'], ParentType, ContextType>;
  fulfilledItems?: Resolver<Array<ResolversTypes['FulfillmentLine']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  invoiceNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lines?: Resolver<Array<ResolversTypes['OrderEventOrderLineObject']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  oversoldItems?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  paymentGateway?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relatedOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  shippingCostsIncluded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TransactionStatus'], ParentType, ContextType>;
  transactionReference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['OrderEventType'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderEventConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderEventConnection'] = ResolversParentTypes['OrderEventConnection']> = {
  edges?: Resolver<Array<ResolversTypes['OrderEventEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderEventEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderEventEdge'] = ResolversParentTypes['OrderEventEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['OrderEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderEventOrderLineObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderEventOrderLineObject'] = ResolversParentTypes['OrderEventOrderLineObject']> = {
  discount?: Resolver<ResolversTypes['OrderDiscount'], ParentType, ContextType>;
  itemName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderLine?: Resolver<ResolversTypes['OrderLine'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderFilterShippingMethodsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderFilterShippingMethods'] = ResolversParentTypes['OrderFilterShippingMethods']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingMethods?: Resolver<Array<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderFulfilledResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderFulfilled'] = ResolversParentTypes['OrderFulfilled']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderFulfillmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderFulfillment'] = ResolversParentTypes['OrderFulfillment']> = {
  fulfillment?: Resolver<ResolversTypes['Fulfillment'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderFulfillmentMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderFulfillmentMutationResult'] = ResolversParentTypes['OrderFulfillmentMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['OrderFulfillment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderFullyPaidResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderFullyPaid'] = ResolversParentTypes['OrderFullyPaid']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderInvoiceMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderInvoiceMutationResult'] = ResolversParentTypes['OrderInvoiceMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  invoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderLine'] = ResolversParentTypes['OrderLine']> = {
  allocations?: Resolver<Array<ResolversTypes['Allocation']>, ParentType, ContextType>;
  digitalContentUrl?: Resolver<ResolversTypes['DigitalContentUrl'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isShippingRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<OrderLineMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<OrderLineMetafieldsArgs, 'keys'>>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<OrderLinePrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<OrderLinePrivateMetafieldsArgs, 'keys'>>;
  product?: Resolver<Maybe<ResolversTypes['ConcreteProduct']>, ParentType, ContextType>;
  productName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productSku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityFulfilled?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityToFulfill?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  taxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  taxClassMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  taxClassName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxClassPrivateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  taxRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<OrderLineThumbnailArgs, 'format' | 'size'>>;
  totalPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  translatedProductName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  undiscountedTotalPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  undiscountedUnitPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  unitDiscount?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  unitDiscountReason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unitDiscountType?: Resolver<ResolversTypes['DiscountValueType'], ParentType, ContextType>;
  unitDiscountValue?: Resolver<ResolversTypes['PositiveDecimal'], ParentType, ContextType>;
  unitPrice?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLineMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderLineMutationResult'] = ResolversParentTypes['OrderLineMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  orderLine?: Resolver<ResolversTypes['OrderLine'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderLinesMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderLinesMutationResult'] = ResolversParentTypes['OrderLinesMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  orderLines?: Resolver<Array<ResolversTypes['OrderLine']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderMetadataUpdated'] = ResolversParentTypes['OrderMetadataUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderMutationResult'] = ResolversParentTypes['OrderMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderNodeConnection'] = ResolversParentTypes['OrderNodeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['OrderNodeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderNodeEdge'] = ResolversParentTypes['OrderNodeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderSettings'] = ResolversParentTypes['OrderSettings']> = {
  autoConfirmAllNewOrders?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoFulfillNonShippableGiftCard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderSettingsMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderSettingsMutationResult'] = ResolversParentTypes['OrderSettingsMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['OrderSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderUpdated'] = ResolversParentTypes['OrderUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrdermutationresultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ordermutationresult'] = ResolversParentTypes['Ordermutationresult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  event?: Resolver<ResolversTypes['OrderEvent'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  attributes?: Resolver<Array<ResolversTypes['Attribute']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['JSONString'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isPublished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<PageMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<PageMetafieldsArgs, 'keys'>>;
  pageKlass?: Resolver<ResolversTypes['PageKlass'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<PagePrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<PagePrivateMetafieldsArgs, 'keys'>>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['PageTranslation']>, ParentType, ContextType, RequireFields<PageTranslationArgs, 'languageCode'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageBase'] = ResolversParentTypes['PageBase']> = {
  __resolveType: TypeResolveFn<'PageCreated' | 'PageDeleted' | 'PageUpdated', ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
};

export type PageBulkMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageBulkMutationResult'] = ResolversParentTypes['PageBulkMutationResult']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  objects?: Resolver<Array<ResolversTypes['Page']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageConnection'] = ResolversParentTypes['PageConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PageEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageCreated'] = ResolversParentTypes['PageCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageDeleted'] = ResolversParentTypes['PageDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageEdge'] = ResolversParentTypes['PageEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageError'] = ResolversParentTypes['PageError']> = {
  attributes?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageKlassResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageKlass'] = ResolversParentTypes['PageKlass']> = {
  attributes?: Resolver<Array<ResolversTypes['Attribute']>, ParentType, ContextType>;
  availableAttributes?: Resolver<ResolversTypes['AttributeConnection'], ParentType, ContextType, RequireFields<PageKlassAvailableAttributesArgs, 'after' | 'before' | 'filters' | 'first' | 'last'>>;
  hasPages?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<PageKlassMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<PageKlassMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<PageKlassPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<PageKlassPrivateMetafieldsArgs, 'keys'>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageKlassBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageKlassBase'] = ResolversParentTypes['PageKlassBase']> = {
  __resolveType: TypeResolveFn<'PageKlassCreated' | 'PageKlassDeleted' | 'PageKlassUpdated', ParentType, ContextType>;
  pageKlass?: Resolver<ResolversTypes['PageKlass'], ParentType, ContextType>;
};

export type PageKlassConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageKlassConnection'] = ResolversParentTypes['PageKlassConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PageKlassEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageKlassCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageKlassCreated'] = ResolversParentTypes['PageKlassCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  pageKlass?: Resolver<ResolversTypes['PageKlass'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageKlassDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageKlassDeleted'] = ResolversParentTypes['PageKlassDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  pageKlass?: Resolver<ResolversTypes['PageKlass'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageKlassEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageKlassEdge'] = ResolversParentTypes['PageKlassEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PageKlass'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageKlassMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageKlassMutationResult'] = ResolversParentTypes['PageKlassMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['PageKlass'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageKlassUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageKlassUpdated'] = ResolversParentTypes['PageKlassUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  pageKlass?: Resolver<ResolversTypes['PageKlass'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageMutationResult'] = ResolversParentTypes['PageMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageTranslation'] = ResolversParentTypes['PageTranslation']> = {
  content?: Resolver<ResolversTypes['JSONString'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageUpdated'] = ResolversParentTypes['PageUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  actions?: Resolver<Array<ResolversTypes['OrderAction']>, ParentType, ContextType>;
  amountCaptured?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  availableCaptureAmount?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  availableRefundAmount?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  chargeStatus?: Resolver<ResolversTypes['ChargeStatus'], ParentType, ContextType>;
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creditCard?: Resolver<ResolversTypes['CreditCard'], ParentType, ContextType>;
  customerIpAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gateway?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<PaymentMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<PaymentMetafieldsArgs, 'keys'>>;
  modified?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType>;
  paymentMethodType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<PaymentPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<PaymentPrivateMetafieldsArgs, 'keys'>>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentAuthorizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentAuthorize'] = ResolversParentTypes['PaymentAuthorize']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentBase'] = ResolversParentTypes['PaymentBase']> = {
  __resolveType: TypeResolveFn<'PaymentAuthorize' | 'PaymentCaptureEvent' | 'PaymentConfirmEvent' | 'PaymentProcessEvent' | 'PaymentRefundEvent' | 'PaymentVoidEvent', ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
};

export type PaymentCaptureEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentCaptureEvent'] = ResolversParentTypes['PaymentCaptureEvent']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentCheckBalanceMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentCheckBalanceMutationResult'] = ResolversParentTypes['PaymentCheckBalanceMutationResult']> = {
  data?: Resolver<ResolversTypes['JSONString'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentConfirmEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentConfirmEvent'] = ResolversParentTypes['PaymentConfirmEvent']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentConnection'] = ResolversParentTypes['PaymentConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PaymentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentEdge'] = ResolversParentTypes['PaymentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentError'] = ResolversParentTypes['PaymentError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variants?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentGatewayResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentGateway'] = ResolversParentTypes['PaymentGateway']> = {
  config?: Resolver<Array<ResolversTypes['GatewayConfigLine']>, ParentType, ContextType>;
  currencies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentInitializeMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentInitializeMutationResult'] = ResolversParentTypes['PaymentInitializeMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  initializedPayment?: Resolver<Maybe<ResolversTypes['PaymentInitialized']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentInitializedResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentInitialized'] = ResolversParentTypes['PaymentInitialized']> = {
  gateway?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentListGatewaysResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentListGateways'] = ResolversParentTypes['PaymentListGateways']> = {
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentMutationResult'] = ResolversParentTypes['PaymentMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentProcessEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentProcessEvent'] = ResolversParentTypes['PaymentProcessEvent']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentRefundEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentRefundEvent'] = ResolversParentTypes['PaymentRefundEvent']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentSource'] = ResolversParentTypes['PaymentSource']> = {
  creditCardInfo?: Resolver<ResolversTypes['CreditCard'], ParentType, ContextType>;
  gateway?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  paymentMethodId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentVoidEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentVoidEvent'] = ResolversParentTypes['PaymentVoidEvent']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Permission'] = ResolversParentTypes['Permission']> = {
  code?: Resolver<ResolversTypes['PermissionCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PluginResolvers<ContextType = any, ParentType extends ResolversParentTypes['Plugin'] = ResolversParentTypes['Plugin']> = {
  channelConfigurations?: Resolver<Array<ResolversTypes['PluginConfiguration']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  globalConfiguration?: Resolver<ResolversTypes['PluginConfiguration'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PluginConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['PluginConfiguration'] = ResolversParentTypes['PluginConfiguration']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  configuration?: Resolver<Array<ResolversTypes['ConfigurationItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PluginConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PluginConnection'] = ResolversParentTypes['PluginConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PluginEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PluginEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PluginEdge'] = ResolversParentTypes['PluginEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Plugin'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PluginMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PluginMutationResult'] = ResolversParentTypes['PluginMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Plugin'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PointOfContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['PointOfContact'] = ResolversParentTypes['PointOfContact']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PositiveDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveDecimal'], any> {
  name: 'PositiveDecimal';
}

export type PreorderDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreorderData'] = ResolversParentTypes['PreorderData']> = {
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  globalSoldUnits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  globalThreshold?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreorderThresholdResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreorderThreshold'] = ResolversParentTypes['PreorderThreshold']> = {
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  soldUnits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  __resolveType: TypeResolveFn<'AbstractProduct' | 'ConcreteProduct', ParentType, ContextType>;
  ancestors?: Resolver<Array<ResolversTypes['AbstractProduct']>, ParentType, ContextType, RequireFields<ProductAncestorsArgs, 'includeSelf'>>;
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType, RequireFields<ProductAttributeArgs, 'slug'>>;
  attributes?: Resolver<Array<ResolversTypes['Attribute']>, ParentType, ContextType, RequireFields<ProductAttributesArgs, 'variantSelection'>>;
  availableForPurchaseAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  channelListings?: Resolver<Array<ResolversTypes['ProductChannelListing']>, ParentType, ContextType>;
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  digitalContent?: Resolver<ResolversTypes['DigitalContent'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  imageById?: Resolver<ResolversTypes['ProductImage'], ParentType, ContextType, RequireFields<ProductImageByIdArgs, 'id'>>;
  images?: Resolver<Array<ResolversTypes['ProductImage']>, ParentType, ContextType>;
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<ProductIsAvailableArgs, 'address'>>;
  isAvailableForPurchase?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<ProductIsAvailableForPurchaseArgs, 'channel'>>;
  media?: Resolver<Array<ResolversTypes['ProductMediaItem']>, ParentType, ContextType>;
  mediaById?: Resolver<ResolversTypes['ProductMediaItem'], ParentType, ContextType, RequireFields<ProductMediaByIdArgs, 'id'>>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ProductMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ProductMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<ResolversTypes['AbstractProduct'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preorder?: Resolver<Maybe<ResolversTypes['PreorderData']>, ParentType, ContextType>;
  pricing?: Resolver<Maybe<ResolversTypes['ProductPricingInfo']>, ParentType, ContextType, RequireFields<ProductPricingArgs, 'address' | 'channelSlug'>>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ProductPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ProductPrivateMetafieldsArgs, 'keys'>>;
  productKlass?: Resolver<ResolversTypes['ProductKlass'], ParentType, ContextType>;
  quantityAvailable?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<ProductQuantityAvailableArgs, 'address' | 'countryCode'>>;
  quantityOrdered?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  revenue?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType, RequireFields<ProductRevenueArgs, 'period'>>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stocks?: Resolver<Array<ResolversTypes['Stock']>, ParentType, ContextType, RequireFields<ProductStocksArgs, 'address' | 'countryCode'>>;
  taxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<ProductThumbnailArgs, 'format' | 'size'>>;
  translation?: Resolver<Maybe<ResolversTypes['ProductTranslation']>, ParentType, ContextType, RequireFields<ProductTranslationArgs, 'languageCode'>>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  variant?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductVariantArgs, 'id' | 'sku'>>;
  variants?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Weight'], ParentType, ContextType>;
};

export type ProductAttributeAssignmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductAttributeAssignment'] = ResolversParentTypes['ProductAttributeAssignment']> = {
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
  variantSelection?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductAttributeAssignmentMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductAttributeAssignmentMutationResult'] = ResolversParentTypes['ProductAttributeAssignmentMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  productKlass?: Resolver<ResolversTypes['ProductKlass'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductBackInStockResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductBackInStock'] = ResolversParentTypes['ProductBackInStock']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductBackInStockProductArgs, 'channel'>>;
  productVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductBackInStockProductVariantArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductBase'] = ResolversParentTypes['ProductBase']> = {
  __resolveType: TypeResolveFn<'ProductBackInStock' | 'ProductCreated' | 'ProductDeleted' | 'ProductMetadataUpdated' | 'ProductOutOfStock' | 'ProductUpdated', ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductBaseProductArgs, 'channel'>>;
};

export type ProductBulkMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductBulkMutationResult'] = ResolversParentTypes['ProductBulkMutationResult']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  objects?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductChannelListingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductChannelListing'] = ResolversParentTypes['ProductChannelListing']> = {
  availableForPurchaseAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  costPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  discountedPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isAvailableForPurchase?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPublished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  margin?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preorderThreshold?: Resolver<Maybe<ResolversTypes['PreorderThreshold']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  pricing?: Resolver<Maybe<ResolversTypes['ProductPricingInfo']>, ParentType, ContextType, RequireFields<ProductChannelListingPricingArgs, 'address'>>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  purchaseCost?: Resolver<Maybe<ResolversTypes['MoneyRange']>, ParentType, ContextType>;
  visibleInListings?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductChannelListingErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductChannelListingError'] = ResolversParentTypes['ProductChannelListingError']> = {
  attributes?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  channels?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  variants?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductConnection'] = ResolversParentTypes['ProductConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ProductEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductCreated'] = ResolversParentTypes['ProductCreated']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductCreatedProductArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductDeleted'] = ResolversParentTypes['ProductDeleted']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductDeletedProductArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductEdge'] = ResolversParentTypes['ProductEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductError'] = ResolversParentTypes['ProductError']> = {
  attributes?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductImage'] = ResolversParentTypes['ProductImage']> = {
  alt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sortOrder?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<ProductImageUrlArgs, 'format' | 'size'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductKlassResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductKlass'] = ResolversParentTypes['ProductKlass']> = {
  availableAttributes?: Resolver<ResolversTypes['AttributeNodeConnection'], ParentType, ContextType, RequireFields<ProductKlassAvailableAttributesArgs, 'after' | 'before' | 'filters' | 'first' | 'last'>>;
  hasVariants?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isDigital?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isShippingRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['ProductKlassKind'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ProductKlassMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ProductKlassMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ProductKlassPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ProductKlassPrivateMetafieldsArgs, 'keys'>>;
  productAttributes?: Resolver<Array<ResolversTypes['Attribute']>, ParentType, ContextType>;
  productVariantAttributeAssignments?: Resolver<Array<ResolversTypes['ProductAttributeAssignment']>, ParentType, ContextType, RequireFields<ProductKlassProductVariantAttributeAssignmentsArgs, 'variantSelection'>>;
  products?: Resolver<ResolversTypes['ProductNodeConnection'], ParentType, ContextType, RequireFields<ProductKlassProductsArgs, 'after' | 'before' | 'channel' | 'first' | 'last'>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  variantAttributes?: Resolver<Array<ResolversTypes['Attribute']>, ParentType, ContextType, RequireFields<ProductKlassVariantAttributesArgs, 'variantSelection'>>;
  weight?: Resolver<ResolversTypes['Weight'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductKlassConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductKlassConnection'] = ResolversParentTypes['ProductKlassConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ProductKlassEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductKlassEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductKlassEdge'] = ResolversParentTypes['ProductKlassEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ProductKlass'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductKlassMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductKlassMutationResult'] = ResolversParentTypes['ProductKlassMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['ProductKlass'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductKlassNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductKlassNodeConnection'] = ResolversParentTypes['ProductKlassNodeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ProductKlassNodeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductKlassNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductKlassNodeEdge'] = ResolversParentTypes['ProductKlassNodeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ProductKlass'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMediaAssignmentMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMediaAssignmentMutationResult'] = ResolversParentTypes['ProductMediaAssignmentMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  mediaItem?: Resolver<ResolversTypes['ProductMediaItem'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMediaItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMediaItem'] = ResolversParentTypes['ProductMediaItem']> = {
  alt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  mediaItem?: Resolver<ResolversTypes['MediaItem'], ParentType, ContextType>;
  oembedData?: Resolver<ResolversTypes['JSONString'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sortOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<ProductMediaItemUrlArgs, 'format' | 'size'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMediaMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMediaMutationResult'] = ResolversParentTypes['ProductMediaMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  media?: Resolver<ResolversTypes['ProductMediaItem'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMediaUnassignmentMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMediaUnassignmentMutationResult'] = ResolversParentTypes['ProductMediaUnassignmentMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  mediaItem?: Resolver<ResolversTypes['ProductMediaItem'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMetadataUpdated'] = ResolversParentTypes['ProductMetadataUpdated']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductMetadataUpdatedProductArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductMutationResult'] = ResolversParentTypes['ProductMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductNodeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductNodeConnection'] = ResolversParentTypes['ProductNodeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ProductNodeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductNodeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductNodeEdge'] = ResolversParentTypes['ProductNodeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductOutOfStockResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductOutOfStock'] = ResolversParentTypes['ProductOutOfStock']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductOutOfStockProductArgs, 'channel'>>;
  productVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductOutOfStockProductVariantArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductPreorderDeactivationMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductPreorderDeactivationMutationResult'] = ResolversParentTypes['ProductPreorderDeactivationMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  productVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductPricingInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductPricingInfo'] = ResolversParentTypes['ProductPricingInfo']> = {
  discount?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  discountLocalCurrency?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  displayGrossPrices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  onSale?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  priceLocalCurrency?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  priceRange?: Resolver<ResolversTypes['TaxedMoneyRange'], ParentType, ContextType>;
  priceRangeLocalCurrency?: Resolver<ResolversTypes['TaxedMoneyRange'], ParentType, ContextType>;
  priceRangeUndiscounted?: Resolver<ResolversTypes['TaxedMoneyRange'], ParentType, ContextType>;
  priceUndiscounted?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductTranslation'] = ResolversParentTypes['ProductTranslation']> = {
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  seoDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seoTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['ValueTranslation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] = ResolversParentTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation']> = {
  __resolveType: TypeResolveFn<'AttributeTranslation' | 'CategoryTranslation' | 'CollectionTranslation' | 'MenuItemTranslation' | 'PageTranslation' | 'ProductTranslation' | 'SaleTranslation' | 'ShippingMethodTranslation' | 'ValueTranslation' | 'VoucherTranslation', ParentType, ContextType>;
};

export type ProductUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductUpdated'] = ResolversParentTypes['ProductUpdated']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<ProductUpdatedProductArgs, 'channel'>>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductWithoutVariantErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductWithoutVariantError'] = ResolversParentTypes['ProductWithoutVariantError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType, RequireFields<QueryAddressArgs, 'id'>>;
  addressValidationRules?: Resolver<ResolversTypes['AddressValidationData'], ParentType, ContextType, RequireFields<QueryAddressValidationRulesArgs, 'city' | 'cityArea' | 'countryArea' | 'countryCode'>>;
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType, RequireFields<QueryAppArgs, 'id'>>;
  appExtension?: Resolver<ResolversTypes['AppExtension'], ParentType, ContextType, RequireFields<QueryAppExtensionArgs, 'id'>>;
  appExtensions?: Resolver<ResolversTypes['AppExtensionConnection'], ParentType, ContextType, RequireFields<QueryAppExtensionsArgs, 'after' | 'before' | 'filters' | 'first' | 'last'>>;
  apps?: Resolver<ResolversTypes['AppConnection'], ParentType, ContextType, RequireFields<QueryAppsArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  appsInstallations?: Resolver<Array<ResolversTypes['AppInstallation']>, ParentType, ContextType>;
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType, RequireFields<QueryAttributeArgs, 'id' | 'slug'>>;
  attributes?: Resolver<ResolversTypes['AttributeConnection'], ParentType, ContextType, RequireFields<QueryAttributesArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  categories?: Resolver<ResolversTypes['CategoryConnection'], ParentType, ContextType, RequireFields<QueryCategoriesArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'level' | 'sortBy'>>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id' | 'slug'>>;
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QueryChannelArgs, 'id' | 'slug'>>;
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>;
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType, RequireFields<QueryCheckoutArgs, 'id' | 'languageCode'>>;
  checkoutLines?: Resolver<ResolversTypes['CheckoutLineConnection'], ParentType, ContextType, RequireFields<QueryCheckoutLinesArgs, 'after' | 'before' | 'first' | 'last'>>;
  checkouts?: Resolver<ResolversTypes['CheckoutConnection'], ParentType, ContextType, RequireFields<QueryCheckoutsArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<QueryCollectionArgs, 'channel' | 'id' | 'slug'>>;
  collections?: Resolver<ResolversTypes['CollectionConnection'], ParentType, ContextType, RequireFields<QueryCollectionsArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  customers?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<QueryCustomersArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  digitalContent?: Resolver<ResolversTypes['DigitalContent'], ParentType, ContextType, RequireFields<QueryDigitalContentArgs, 'id'>>;
  digitalContents?: Resolver<ResolversTypes['DigitalContentConnection'], ParentType, ContextType, RequireFields<QueryDigitalContentsArgs, 'after' | 'before' | 'first' | 'last'>>;
  exportFile?: Resolver<Maybe<ResolversTypes['ExportFile']>, ParentType, ContextType, RequireFields<QueryExportFileArgs, 'id'>>;
  exportFiles?: Resolver<ResolversTypes['ExportFileConnection'], ParentType, ContextType, RequireFields<QueryExportFilesArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  giftCard?: Resolver<ResolversTypes['GiftCard'], ParentType, ContextType, RequireFields<QueryGiftCardArgs, 'id'>>;
  giftCardCurrencies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  giftCardSettings?: Resolver<ResolversTypes['GiftCardSettings'], ParentType, ContextType>;
  giftCardTags?: Resolver<ResolversTypes['GiftCardTagConnection'], ParentType, ContextType, RequireFields<QueryGiftCardTagsArgs, 'after' | 'before' | 'filters' | 'first' | 'last'>>;
  giftCards?: Resolver<ResolversTypes['GiftCardConnection'], ParentType, ContextType, RequireFields<QueryGiftCardsArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<QueryGroupArgs, 'id'>>;
  groups?: Resolver<ResolversTypes['GroupConnection'], ParentType, ContextType, RequireFields<QueryGroupsArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  homepageEvents?: Resolver<ResolversTypes['OrderEventConnection'], ParentType, ContextType, RequireFields<QueryHomepageEventsArgs, 'after' | 'before' | 'first' | 'last'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['MediaItemConnection'], ParentType, ContextType, RequireFields<QueryMediaArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  mediaItem?: Resolver<ResolversTypes['MediaItem'], ParentType, ContextType, RequireFields<QueryMediaItemArgs, 'id' | 'slug'>>;
  menu?: Resolver<ResolversTypes['Menu'], ParentType, ContextType, RequireFields<QueryMenuArgs, 'channel' | 'id' | 'name' | 'slug'>>;
  menuItem?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType, RequireFields<QueryMenuItemArgs, 'channel' | 'id'>>;
  menuItems?: Resolver<ResolversTypes['MenuItemConnection'], ParentType, ContextType, RequireFields<QueryMenuItemsArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  menus?: Resolver<ResolversTypes['MenuConnection'], ParentType, ContextType, RequireFields<QueryMenusArgs, 'after' | 'before' | 'channel' | 'first' | 'last' | 'sortBy'>>;
  order?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<QueryOrderArgs, 'id'>>;
  orderDrafts?: Resolver<ResolversTypes['OrderConnection'], ParentType, ContextType, RequireFields<QueryOrderDraftsArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  orderSettings?: Resolver<ResolversTypes['OrderSettings'], ParentType, ContextType>;
  orders?: Resolver<ResolversTypes['OrderConnection'], ParentType, ContextType, RequireFields<QueryOrdersArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  ordersTotal?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType, RequireFields<QueryOrdersTotalArgs, 'channel' | 'period'>>;
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType, RequireFields<QueryPageArgs, 'id' | 'slug'>>;
  pageKlass?: Resolver<ResolversTypes['PageKlass'], ParentType, ContextType, RequireFields<QueryPageKlassArgs, 'id'>>;
  pageKlasses?: Resolver<ResolversTypes['PageKlassConnection'], ParentType, ContextType, RequireFields<QueryPageKlassesArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  pages?: Resolver<ResolversTypes['PageConnection'], ParentType, ContextType, RequireFields<QueryPagesArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType, RequireFields<QueryPaymentArgs, 'id'>>;
  payments?: Resolver<ResolversTypes['PaymentConnection'], ParentType, ContextType, RequireFields<QueryPaymentsArgs, 'after' | 'before' | 'filters' | 'first' | 'last'>>;
  plugin?: Resolver<ResolversTypes['Plugin'], ParentType, ContextType, RequireFields<QueryPluginArgs, 'id'>>;
  plugins?: Resolver<ResolversTypes['PluginConnection'], ParentType, ContextType, RequireFields<QueryPluginsArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<QueryProductArgs, 'channel' | 'id' | 'slug'>>;
  productKlass?: Resolver<ResolversTypes['ProductKlass'], ParentType, ContextType, RequireFields<QueryProductKlassArgs, 'id'>>;
  productKlasses?: Resolver<ResolversTypes['ProductKlassConnection'], ParentType, ContextType, RequireFields<QueryProductKlassesArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  productVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<QueryProductVariantArgs, 'channel' | 'id' | 'sku'>>;
  productVariants?: Resolver<ResolversTypes['ProductConnection'], ParentType, ContextType, RequireFields<QueryProductVariantsArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'ids' | 'last' | 'sortBy'>>;
  products?: Resolver<ResolversTypes['ProductConnection'], ParentType, ContextType, RequireFields<QueryProductsArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  reportProductSales?: Resolver<ResolversTypes['ProductConnection'], ParentType, ContextType, RequireFields<QueryReportProductSalesArgs, 'after' | 'before' | 'channel' | 'first' | 'last' | 'period'>>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType, RequireFields<QuerySaleArgs, 'channel' | 'id'>>;
  sales?: Resolver<ResolversTypes['SaleConnection'], ParentType, ContextType, RequireFields<QuerySalesArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<QueryShippingZoneArgs, 'channel' | 'id'>>;
  shippingZones?: Resolver<ResolversTypes['ShippingZoneConnection'], ParentType, ContextType, RequireFields<QueryShippingZonesArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last'>>;
  shop?: Resolver<ResolversTypes['Site'], ParentType, ContextType>;
  staffUsers?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<QueryStaffUsersArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  stock?: Resolver<ResolversTypes['Stock'], ParentType, ContextType, RequireFields<QueryStockArgs, 'id'>>;
  stocks?: Resolver<ResolversTypes['StockConnection'], ParentType, ContextType, RequireFields<QueryStocksArgs, 'after' | 'before' | 'filter' | 'first' | 'last'>>;
  taxClass?: Resolver<ResolversTypes['TaxClass'], ParentType, ContextType, RequireFields<QueryTaxClassArgs, 'id'>>;
  taxClasses?: Resolver<ResolversTypes['TaxClassConnection'], ParentType, ContextType, RequireFields<QueryTaxClassesArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  taxConfiguration?: Resolver<ResolversTypes['TaxConfiguration'], ParentType, ContextType, RequireFields<QueryTaxConfigurationArgs, 'id'>>;
  taxConfigurations?: Resolver<ResolversTypes['TaxConfigurationConnection'], ParentType, ContextType, RequireFields<QueryTaxConfigurationsArgs, 'after' | 'before' | 'filters' | 'first' | 'last'>>;
  taxCountryConfiguration?: Resolver<ResolversTypes['TaxCountryConfiguration'], ParentType, ContextType, RequireFields<QueryTaxCountryConfigurationArgs, 'countryCode'>>;
  taxCountryConfigurations?: Resolver<Array<ResolversTypes['TaxCountryConfiguration']>, ParentType, ContextType>;
  taxTypes?: Resolver<Array<ResolversTypes['TaxType']>, ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['TransactionItem'], ParentType, ContextType, RequireFields<QueryTransactionArgs, 'id'>>;
  translation?: Resolver<ResolversTypes['TranslatableItem'], ParentType, ContextType, RequireFields<QueryTranslationArgs, 'id' | 'kind'>>;
  translations?: Resolver<ResolversTypes['TranslatableItemConnection'], ParentType, ContextType, RequireFields<QueryTranslationsArgs, 'after' | 'before' | 'first' | 'kind' | 'last'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'email' | 'id'>>;
  voucher?: Resolver<ResolversTypes['Voucher'], ParentType, ContextType, RequireFields<QueryVoucherArgs, 'channel' | 'id'>>;
  vouchers?: Resolver<ResolversTypes['VoucherConnection'], ParentType, ContextType, RequireFields<QueryVouchersArgs, 'after' | 'before' | 'channel' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType, RequireFields<QueryWarehouseArgs, 'id'>>;
  warehouses?: Resolver<ResolversTypes['WarehouseConnection'], ParentType, ContextType, RequireFields<QueryWarehousesArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType, RequireFields<QueryWebhookArgs, 'id'>>;
  webhookSamplePayload?: Resolver<ResolversTypes['JSONString'], ParentType, ContextType, RequireFields<QueryWebhookSamplePayloadArgs, 'eventType'>>;
};

export type ReducedRateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReducedRate'] = ResolversParentTypes['ReducedRate']> = {
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rateType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = {
  categories?: Resolver<ResolversTypes['CategoryNodeConnection'], ParentType, ContextType, RequireFields<SaleCategoriesArgs, 'after' | 'before' | 'first' | 'last'>>;
  channelListings?: Resolver<Array<ResolversTypes['SaleChannelListing']>, ParentType, ContextType>;
  collections?: Resolver<ResolversTypes['CollectionConnection'], ParentType, ContextType, RequireFields<SaleCollectionsArgs, 'after' | 'before' | 'first' | 'last'>>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discountValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<SaleMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<SaleMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<SalePrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<SalePrivateMetafieldsArgs, 'keys'>>;
  products?: Resolver<ResolversTypes['ProductNodeConnection'], ParentType, ContextType, RequireFields<SaleProductsArgs, 'after' | 'before' | 'first' | 'last'>>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['SaleTranslation']>, ParentType, ContextType, RequireFields<SaleTranslationArgs, 'languageCode'>>;
  type?: Resolver<ResolversTypes['SaleType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleBase'] = ResolversParentTypes['SaleBase']> = {
  __resolveType: TypeResolveFn<'SaleCreated' | 'SaleDeleted' | 'SaleToggle' | 'SaleUpdated', ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType, Partial<SaleBaseSaleArgs>>;
};

export type SaleChannelListingResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleChannelListing'] = ResolversParentTypes['SaleChannelListing']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discountValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleConnection'] = ResolversParentTypes['SaleConnection']> = {
  edges?: Resolver<Array<ResolversTypes['SaleEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleCreated'] = ResolversParentTypes['SaleCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType, Partial<SaleCreatedSaleArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleDeleted'] = ResolversParentTypes['SaleDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType, Partial<SaleDeletedSaleArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleEdge'] = ResolversParentTypes['SaleEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Sale'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleMutationResult'] = ResolversParentTypes['SaleMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Sale'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleToggleResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleToggle'] = ResolversParentTypes['SaleToggle']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType, Partial<SaleToggleSaleArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleTranslation'] = ResolversParentTypes['SaleTranslation']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleUpdated'] = ResolversParentTypes['SaleUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  sale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType, Partial<SaleUpdatedSaleArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingError'] = ResolversParentTypes['ShippingError']> = {
  channels?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  warehouses?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingListMethodsForCheckoutResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingListMethodsForCheckout'] = ResolversParentTypes['ShippingListMethodsForCheckout']> = {
  checkout?: Resolver<ResolversTypes['Checkout'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingMethods?: Resolver<Array<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingMethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingMethod'] = ResolversParentTypes['ShippingMethod']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  channelListings?: Resolver<Array<ResolversTypes['ShippingMethodChannelListing']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  excludedProducts?: Resolver<ResolversTypes['ProductConnection'], ParentType, ContextType, RequireFields<ShippingMethodExcludedProductsArgs, 'after' | 'before' | 'first' | 'last'>>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  maximumDeliveryDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maximumOrderPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  maximumOrderWeight?: Resolver<Maybe<ResolversTypes['Weight']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ShippingMethodMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ShippingMethodMetafieldsArgs, 'keys'>>;
  minimumDeliveryDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minimumOrderPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  minimumOrderWeight?: Resolver<ResolversTypes['Weight'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCodeRules?: Resolver<Array<ResolversTypes['ShippingMethodPostalCodeRule']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Money'], ParentType, ContextType, RequireFields<ShippingMethodPriceArgs, 'channelId'>>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ShippingMethodPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ShippingMethodPrivateMetafieldsArgs, 'keys'>>;
  taxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['ShippingMethodTranslation']>, ParentType, ContextType, RequireFields<ShippingMethodTranslationArgs, 'languageCode'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingMethodChannelListingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingMethodChannelListing'] = ResolversParentTypes['ShippingMethodChannelListing']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  maximumOrderPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  minimumOrderPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingMethodChannelListingMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingMethodChannelListingMutationResult'] = ResolversParentTypes['ShippingMethodChannelListingMutationResult']> = {
  channelListing?: Resolver<ResolversTypes['ShippingMethodChannelListing'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingMethodMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingMethodMutationResult'] = ResolversParentTypes['ShippingMethodMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingMethodPostalCodeRuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingMethodPostalCodeRule'] = ResolversParentTypes['ShippingMethodPostalCodeRule']> = {
  end?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  inclusionType?: Resolver<ResolversTypes['PostalCodeRuleInclusionType'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingMethodTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingMethodTranslation'] = ResolversParentTypes['ShippingMethodTranslation']> = {
  description?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingPriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingPrice'] = ResolversParentTypes['ShippingPrice']> = {
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingPriceBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingPriceBase'] = ResolversParentTypes['ShippingPriceBase']> = {
  __resolveType: TypeResolveFn<'ShippingPriceCreated' | 'ShippingPriceDeleted' | 'ShippingPriceUpdated', ParentType, ContextType>;
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType, RequireFields<ShippingPriceBaseShippingMethodArgs, 'channel'>>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<ShippingPriceBaseShippingZoneArgs, 'channel'>>;
};

export type ShippingPriceCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingPriceCreated'] = ResolversParentTypes['ShippingPriceCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType, RequireFields<ShippingPriceCreatedShippingMethodArgs, 'channel'>>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<ShippingPriceCreatedShippingZoneArgs, 'channel'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingPriceDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingPriceDeleted'] = ResolversParentTypes['ShippingPriceDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType, RequireFields<ShippingPriceDeletedShippingMethodArgs, 'channel'>>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<ShippingPriceDeletedShippingZoneArgs, 'channel'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingPriceMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingPriceMutationResult'] = ResolversParentTypes['ShippingPriceMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['ShippingPrice'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingPriceRemoveProductFromExcludeMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingPriceRemoveProductFromExcludeMutationResult'] = ResolversParentTypes['ShippingPriceRemoveProductFromExcludeMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingPriceUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingPriceUpdated'] = ResolversParentTypes['ShippingPriceUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingMethod?: Resolver<ResolversTypes['ShippingMethod'], ParentType, ContextType, RequireFields<ShippingPriceUpdatedShippingMethodArgs, 'channel'>>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<ShippingPriceUpdatedShippingZoneArgs, 'channel'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingZoneResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingZone'] = ResolversParentTypes['ShippingZone']> = {
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  default?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ShippingZoneMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ShippingZoneMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priceRange?: Resolver<Maybe<ResolversTypes['MoneyRange']>, ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<ShippingZonePrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<ShippingZonePrivateMetafieldsArgs, 'keys'>>;
  shippingMethods?: Resolver<Array<ResolversTypes['ShippingMethod']>, ParentType, ContextType>;
  warehouses?: Resolver<Array<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingZoneBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingZoneBase'] = ResolversParentTypes['ShippingZoneBase']> = {
  __resolveType: TypeResolveFn<'ShippingZoneCreated' | 'ShippingZoneDeleted' | 'ShippingZoneMetadataUpdated' | 'ShippingZoneUpdated', ParentType, ContextType>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<ShippingZoneBaseShippingZoneArgs, 'channel'>>;
};

export type ShippingZoneConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingZoneConnection'] = ResolversParentTypes['ShippingZoneConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ShippingZoneEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingZoneCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingZoneCreated'] = ResolversParentTypes['ShippingZoneCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<ShippingZoneCreatedShippingZoneArgs, 'channel'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingZoneDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingZoneDeleted'] = ResolversParentTypes['ShippingZoneDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<ShippingZoneDeletedShippingZoneArgs, 'channel'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingZoneEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingZoneEdge'] = ResolversParentTypes['ShippingZoneEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingZoneMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingZoneMetadataUpdated'] = ResolversParentTypes['ShippingZoneMetadataUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<ShippingZoneMetadataUpdatedShippingZoneArgs, 'channel'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingZoneMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingZoneMutationResult'] = ResolversParentTypes['ShippingZoneMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShippingZoneUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingZoneUpdated'] = ResolversParentTypes['ShippingZoneUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  shippingZone?: Resolver<ResolversTypes['ShippingZone'], ParentType, ContextType, RequireFields<ShippingZoneUpdatedShippingZoneArgs, 'channel'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Site'] = ResolversParentTypes['Site']> = {
  allowedStates?: Resolver<Array<ResolversTypes['StateCode']>, ParentType, ContextType>;
  autoApproveFulfillment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  autoFulfillDigitalProducts?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  availableExternalAuthentications?: Resolver<Array<ResolversTypes['ExternalAuthentication']>, ParentType, ContextType>;
  availablePaymentGateways?: Resolver<Array<ResolversTypes['PaymentGateway']>, ParentType, ContextType, RequireFields<SiteAvailablePaymentGatewaysArgs, 'channel' | 'currency'>>;
  availableShippingMethods?: Resolver<Maybe<Array<ResolversTypes['ShippingMethod']>>, ParentType, ContextType, RequireFields<SiteAvailableShippingMethodsArgs, 'address' | 'channelSlug'>>;
  channelCurrencies?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  companyAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<SiteCountriesArgs, 'filters' | 'languageCode'>>;
  customerSetPasswordUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  defaultCountry?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  defaultDigitalMaxDownloads?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  defaultDigitalUrlValidDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  defaultMailSenderAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultMailSenderName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  defaultWeightUnit?: Resolver<ResolversTypes['WeightUnit'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enableUnauthenticatedCheckout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  fulfillmentAllowUnpaid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  limits?: Resolver<ResolversTypes['LimitInfo'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<SiteLogoArgs, 'format' | 'size'>>;
  maxItemCountPerCheckout?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['Permission']>, ParentType, ContextType>;
  phonePrefixes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reserveStockDurationAnonymousUser?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reserveStockDurationAuthenticatedUser?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  staffNotificationRecipients?: Resolver<Maybe<Array<ResolversTypes['StaffNotificationRecipient']>>, ParentType, ContextType>;
  trackInventoryByDefault?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['SiteTranslation']>, ParentType, ContextType, RequireFields<SiteTranslationArgs, 'languageCode'>>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SiteMutationResult'] = ResolversParentTypes['SiteMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Site'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SiteTranslation'] = ResolversParentTypes['SiteTranslation']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SiteTranslationMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SiteTranslationMutationResult'] = ResolversParentTypes['SiteTranslationMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  shop?: Resolver<ResolversTypes['Site'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Size'] = ResolversParentTypes['Size']> = {
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaffCreated'] = ResolversParentTypes['StaffCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaffDeleted'] = ResolversParentTypes['StaffDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaffError'] = ResolversParentTypes['StaffError']> = {
  addressType?: Resolver<Maybe<ResolversTypes['AddressType']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groups?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['PermissionCode']>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffNotificationRecipientResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaffNotificationRecipient'] = ResolversParentTypes['StaffNotificationRecipient']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffNotificationRecipientMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaffNotificationRecipientMutationResult'] = ResolversParentTypes['StaffNotificationRecipientMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['StaffNotificationRecipient'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaffUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaffUpdated'] = ResolversParentTypes['StaffUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stock'] = ResolversParentTypes['Stock']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productVariant?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityAllocated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityReserved?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockConnection'] = ResolversParentTypes['StockConnection']> = {
  edges?: Resolver<Array<ResolversTypes['StockEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockEdge'] = ResolversParentTypes['StockEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Stock'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockSettings'] = ResolversParentTypes['StockSettings']> = {
  allocationStrategy?: Resolver<ResolversTypes['AllocationStrategy'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  event?: SubscriptionResolver<ResolversTypes['Event'], "event", ParentType, ContextType>;
  issuedAt?: SubscriptionResolver<ResolversTypes['DateTime'], "issuedAt", ParentType, ContextType>;
  issuingPrincipal?: SubscriptionResolver<ResolversTypes['AppUser'], "issuingPrincipal", ParentType, ContextType>;
  recipient?: SubscriptionResolver<ResolversTypes['App'], "recipient", ParentType, ContextType>;
};

export type SyncWebhookEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['SyncWebhookEvent'] = ResolversParentTypes['SyncWebhookEvent']> = {
  eventType?: Resolver<ResolversTypes['WebhookEventTypeSync'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxClassResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxClass'] = ResolversParentTypes['TaxClass']> = {
  countries?: Resolver<Array<ResolversTypes['TaxClassCountryRate']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TaxClassMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<TaxClassMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TaxClassPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<TaxClassPrivateMetafieldsArgs, 'keys'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxClassConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxClassConnection'] = ResolversParentTypes['TaxClassConnection']> = {
  edges?: Resolver<Array<ResolversTypes['TaxClassEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxClassCountryRateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxClassCountryRate'] = ResolversParentTypes['TaxClassCountryRate']> = {
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['PositiveDecimal'], ParentType, ContextType>;
  taxClass?: Resolver<Maybe<ResolversTypes['TaxClass']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxClassCreateErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxClassCreateError'] = ResolversParentTypes['TaxClassCreateError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxClassDeleteErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxClassDeleteError'] = ResolversParentTypes['TaxClassDeleteError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxClassEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxClassEdge'] = ResolversParentTypes['TaxClassEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TaxClass'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxClassMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxClassMutationResult'] = ResolversParentTypes['TaxClassMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['TaxClass'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxClassUpdateErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxClassUpdateError'] = ResolversParentTypes['TaxClassUpdateError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxConfiguration'] = ResolversParentTypes['TaxConfiguration']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  chargeTaxes?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['TaxConfigurationPerCountry']>, ParentType, ContextType>;
  displayGrossPrices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TaxConfigurationMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<TaxConfigurationMetafieldsArgs, 'keys'>>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pricesEnteredWithTax?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TaxConfigurationPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<TaxConfigurationPrivateMetafieldsArgs, 'keys'>>;
  taxCalculationStrategy?: Resolver<Maybe<ResolversTypes['TaxCalculationStrategy']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxConfigurationConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxConfigurationConnection'] = ResolversParentTypes['TaxConfigurationConnection']> = {
  edges?: Resolver<Array<ResolversTypes['TaxConfigurationEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxConfigurationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxConfigurationEdge'] = ResolversParentTypes['TaxConfigurationEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TaxConfiguration'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxConfigurationMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxConfigurationMutationResult'] = ResolversParentTypes['TaxConfigurationMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['TaxConfiguration'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxConfigurationPerCountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxConfigurationPerCountry'] = ResolversParentTypes['TaxConfigurationPerCountry']> = {
  chargeTaxes?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  displayGrossPrices?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxCalculationStrategy?: Resolver<Maybe<ResolversTypes['TaxCalculationStrategy']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxConfigurationUpdateErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxConfigurationUpdateError'] = ResolversParentTypes['TaxConfigurationUpdateError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCodes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxCountryConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxCountryConfiguration'] = ResolversParentTypes['TaxCountryConfiguration']> = {
  country?: Resolver<ResolversTypes['Country'], ParentType, ContextType>;
  taxClassCountryRates?: Resolver<Array<ResolversTypes['TaxClassCountryRate']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxCountryConfigurationMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxCountryConfigurationMutationResult'] = ResolversParentTypes['TaxCountryConfigurationMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['TaxCountryConfiguration'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxCountryConfigurationUpdateErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxCountryConfigurationUpdateError'] = ResolversParentTypes['TaxCountryConfigurationUpdateError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxClassIds?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxSourceLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxSourceLine'] = ResolversParentTypes['TaxSourceLine']> = {
  __resolveType: TypeResolveFn<'CheckoutLine' | 'OrderLine', ParentType, ContextType>;
};

export type TaxSourceObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxSourceObject'] = ResolversParentTypes['TaxSourceObject']> = {
  __resolveType: TypeResolveFn<'Checkout' | 'Order', ParentType, ContextType>;
};

export type TaxSourceObjectMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxSourceObjectMutationResult'] = ResolversParentTypes['TaxSourceObjectMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['TaxSourceObject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxType'] = ResolversParentTypes['TaxType']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taxCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxableObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxableObject'] = ResolversParentTypes['TaxableObject']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discounts?: Resolver<Array<ResolversTypes['TaxableObjectDiscount']>, ParentType, ContextType>;
  lines?: Resolver<Array<ResolversTypes['TaxableObjectLine']>, ParentType, ContextType>;
  pricesEnteredWithTax?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  shippingPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  sourceObject?: Resolver<ResolversTypes['TaxSourceObject'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxableObjectDiscountResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxableObjectDiscount'] = ResolversParentTypes['TaxableObjectDiscount']> = {
  amount?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxableObjectLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxableObjectLine'] = ResolversParentTypes['TaxableObjectLine']> = {
  chargeTaxes?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  productName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productSku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceLine?: Resolver<ResolversTypes['TaxSourceLine'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  unitPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  variantName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxedMoneyResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxedMoney'] = ResolversParentTypes['TaxedMoney']> = {
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gross?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  net?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  tax?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxedMoneyRangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxedMoneyRange'] = ResolversParentTypes['TaxedMoneyRange']> = {
  start?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  stop?: Resolver<ResolversTypes['TaxedMoney'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TempoNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TempoNode'] = ResolversParentTypes['TempoNode']> = {
  __resolveType: TypeResolveFn<'AbstractProduct' | 'AccountEvent' | 'Address' | 'Allocation' | 'App' | 'AppExtension' | 'AppInstallation' | 'AsyncWebhookEvent' | 'Attribute' | 'AttributeTranslation' | 'Category' | 'CategoryTranslation' | 'Channel' | 'Checkout' | 'CheckoutLine' | 'Collection' | 'CollectionChannelListing' | 'CollectionTranslation' | 'ConcreteProduct' | 'DigitalContent' | 'DigitalContentUrl' | 'EventDelivery' | 'ExportEvent' | 'ExportFile' | 'Fulfillment' | 'FulfillmentLine' | 'GiftCard' | 'GiftCardEvent' | 'GiftCardTag' | 'Group' | 'Invoice' | 'MediaItem' | 'Menu' | 'MenuItem' | 'MenuItemTranslation' | 'Order' | 'OrderDiscount' | 'OrderEvent' | 'OrderLine' | 'Page' | 'PageKlass' | 'PageTranslation' | 'Payment' | 'PointOfContact' | 'ProductChannelListing' | 'ProductImage' | 'ProductKlass' | 'ProductMediaItem' | 'ProductTranslation' | 'Sale' | 'SaleChannelListing' | 'SaleTranslation' | 'ShippingMethod' | 'ShippingMethodChannelListing' | 'ShippingMethodPostalCodeRule' | 'ShippingMethodTranslation' | 'ShippingZone' | 'Site' | 'SiteTranslation' | 'StaffNotificationRecipient' | 'Stock' | 'SyncWebhookEvent' | 'TaxClass' | 'TaxConfiguration' | 'TaxConfigurationPerCountry' | 'Transaction' | 'TransactionEvent' | 'TransactionItem' | 'User' | 'Value' | 'ValueTranslation' | 'Voucher' | 'VoucherChannelListing' | 'VoucherTranslation' | 'Warehouse' | 'Webhook', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ThumbnailResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thumbnail'] = ResolversParentTypes['Thumbnail']> = {
  alt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  aspectRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  format?: Resolver<ResolversTypes['ThumbnailFormat'], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimePeriodResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimePeriod'] = ResolversParentTypes['TimePeriod']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TimePeriodType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenVerificationMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenVerificationMutationResult'] = ResolversParentTypes['TokenVerificationMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  isValid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['JWT'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  amount?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  error?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gatewayResponse?: Resolver<ResolversTypes['JSONString'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isSuccess?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['TransactionKind'], ParentType, ContextType>;
  payment?: Resolver<ResolversTypes['Payment'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionActionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionAction'] = ResolversParentTypes['TransactionAction']> = {
  actionType?: Resolver<ResolversTypes['TransactionActionType'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['PositiveDecimal'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionActionRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionActionRequest'] = ResolversParentTypes['TransactionActionRequest']> = {
  action?: Resolver<ResolversTypes['TransactionAction'], ParentType, ContextType>;
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['TransactionItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionEvent'] = ResolversParentTypes['TransactionEvent']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TransactionStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionItem'] = ResolversParentTypes['TransactionItem']> = {
  actions?: Resolver<Array<ResolversTypes['TransactionActionType']>, ParentType, ContextType>;
  amountAuthorized?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  amountCharged?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  amountRefunded?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  amountVoided?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['TransactionEvent']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TransactionItemMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<TransactionItemMetafieldsArgs, 'keys'>>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<TransactionItemPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<TransactionItemPrivateMetafieldsArgs, 'keys'>>;
  reference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionItemMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionItemMetadataUpdated'] = ResolversParentTypes['TransactionItemMetadataUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['TransactionItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionItemMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionItemMutationResult'] = ResolversParentTypes['TransactionItemMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['TransactionItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TranslatableItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['TranslatableItem'] = ResolversParentTypes['TranslatableItem']> = {
  __resolveType: TypeResolveFn<'AttributeTranslation' | 'CategoryTranslation' | 'CollectionTranslation' | 'MenuItemTranslation' | 'PageTranslation' | 'ProductTranslation' | 'SaleTranslation' | 'ShippingMethodTranslation' | 'ValueTranslation' | 'VoucherTranslation', ParentType, ContextType>;
};

export type TranslatableItemConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TranslatableItemConnection'] = ResolversParentTypes['TranslatableItemConnection']> = {
  edges?: Resolver<Array<ResolversTypes['TranslatableItemEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TranslatableItemEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TranslatableItemEdge'] = ResolversParentTypes['TranslatableItemEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['TranslatableItem'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TranslationBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TranslationBase'] = ResolversParentTypes['TranslationBase']> = {
  __resolveType: TypeResolveFn<'TranslationCreated' | 'TranslationUpdated', ParentType, ContextType>;
  translation?: Resolver<ResolversTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'], ParentType, ContextType, RequireFields<TranslationBaseTranslationArgs, 'languageCode'>>;
};

export type TranslationCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['TranslationCreated'] = ResolversParentTypes['TranslationCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  translation?: Resolver<ResolversTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'], ParentType, ContextType, RequireFields<TranslationCreatedTranslationArgs, 'languageCode'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TranslationUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['TranslationUpdated'] = ResolversParentTypes['TranslationUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  translation?: Resolver<ResolversTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'], ParentType, ContextType, RequireFields<TranslationUpdatedTranslationArgs, 'languageCode'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<UserAvatarArgs, 'format' | 'size'>>;
  checkout?: Resolver<Maybe<ResolversTypes['Checkout']>, ParentType, ContextType>;
  checkoutIds?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<UserCheckoutIdsArgs, 'channel'>>;
  checkouts?: Resolver<ResolversTypes['CheckoutNodeConnection'], ParentType, ContextType, RequireFields<UserCheckoutsArgs, 'after' | 'before' | 'channel' | 'first' | 'last'>>;
  dateJoined?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  defaultBillingAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  defaultShippingAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  editableGroups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['AccountEvent']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  giftCards?: Resolver<ResolversTypes['GiftCardNodeConnection'], ParentType, ContextType, RequireFields<UserGiftCardsArgs, 'after' | 'before' | 'first' | 'last'>>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isStaff?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  lastLogin?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<UserMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<UserMetafieldsArgs, 'keys'>>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<ResolversTypes['OrderNodeConnection'], ParentType, ContextType, RequireFields<UserOrdersArgs, 'after' | 'before' | 'first' | 'last'>>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<UserPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<UserPrivateMetafieldsArgs, 'keys'>>;
  requiresConfirmation?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  storedPaymentSources?: Resolver<Array<ResolversTypes['PaymentSource']>, ParentType, ContextType, RequireFields<UserStoredPaymentSourcesArgs, 'channel'>>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userPermissions?: Resolver<Array<ResolversTypes['UserPermission']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBase'] = ResolversParentTypes['UserBase']> = {
  __resolveType: TypeResolveFn<'CustomerCreated' | 'CustomerMetadataUpdated' | 'CustomerUpdated' | 'StaffCreated' | 'StaffDeleted' | 'StaffUpdated', ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type UserBulkMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserBulkMutationResult'] = ResolversParentTypes['UserBulkMutationResult']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  objects?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserCreationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserCreationResult'] = ResolversParentTypes['UserCreationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  requiresConfirmation?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserMutationResult'] = ResolversParentTypes['UserMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPermission'] = ResolversParentTypes['UserPermission']> = {
  code?: Resolver<ResolversTypes['PermissionCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourceGroups?: Resolver<Maybe<Array<ResolversTypes['Group']>>, ParentType, ContextType, RequireFields<UserPermissionSourceGroupsArgs, 'userId'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VatResolvers<ContextType = any, ParentType extends ResolversParentTypes['VAT'] = ResolversParentTypes['VAT']> = {
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reducedRates?: Resolver<Array<ResolversTypes['ReducedRate']>, ParentType, ContextType>;
  standardRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Value'] = ResolversParentTypes['Value']> = {
  boolean?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dateTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['File']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  inputType?: Resolver<ResolversTypes['AttributeInputType'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plainText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reference?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  richText?: Resolver<Maybe<ResolversTypes['JSONString']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['ValueTranslation']>, ParentType, ContextType, RequireFields<ValueTranslationArgs, 'languageCode'>>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValueBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValueBase'] = ResolversParentTypes['ValueBase']> = {
  __resolveType: TypeResolveFn<'ValueCreated' | 'ValueDeleted' | 'ValueUpdated', ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Value'], ParentType, ContextType>;
};

export type ValueConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValueConnection'] = ResolversParentTypes['ValueConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ValueEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValueCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValueCreated'] = ResolversParentTypes['ValueCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Value'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValueDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValueDeleted'] = ResolversParentTypes['ValueDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Value'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValueEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValueEdge'] = ResolversParentTypes['ValueEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Value'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValueMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValueMutationResult'] = ResolversParentTypes['ValueMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Value'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValueTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValueTranslation'] = ResolversParentTypes['ValueTranslation']> = {
  attribute?: Resolver<ResolversTypes['Attribute'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plainText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  richText?: Resolver<ResolversTypes['JSONString'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Value'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValueUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValueUpdated'] = ResolversParentTypes['ValueUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Value'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type VoucherResolvers<ContextType = any, ParentType extends ResolversParentTypes['Voucher'] = ResolversParentTypes['Voucher']> = {
  applyOncePerCustomer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  applyOncePerOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  categories?: Resolver<ResolversTypes['CategoryNodeConnection'], ParentType, ContextType, RequireFields<VoucherCategoriesArgs, 'after' | 'before' | 'first' | 'last'>>;
  channelListings?: Resolver<Array<ResolversTypes['VoucherChannelListing']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collections?: Resolver<ResolversTypes['CollectionConnection'], ParentType, ContextType, RequireFields<VoucherCollectionsArgs, 'after' | 'before' | 'first' | 'last'>>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discountValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  discountValueType?: Resolver<ResolversTypes['DiscountValueType'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<VoucherMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<VoucherMetafieldsArgs, 'keys'>>;
  minCheckoutItemsQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minSpent?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  onlyForStaff?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<VoucherPrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<VoucherPrivateMetafieldsArgs, 'keys'>>;
  products?: Resolver<ResolversTypes['ProductNodeConnection'], ParentType, ContextType, RequireFields<VoucherProductsArgs, 'after' | 'before' | 'first' | 'last'>>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['VoucherTranslation']>, ParentType, ContextType, RequireFields<VoucherTranslationArgs, 'languageCode'>>;
  type?: Resolver<ResolversTypes['VoucherType'], ParentType, ContextType>;
  usageLimit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  used?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoucherBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherBase'] = ResolversParentTypes['VoucherBase']> = {
  __resolveType: TypeResolveFn<'VoucherCreated' | 'VoucherDeleted' | 'VoucherMetadataUpdated' | 'VoucherUpdated', ParentType, ContextType>;
  voucher?: Resolver<ResolversTypes['Voucher'], ParentType, ContextType>;
};

export type VoucherChannelListingResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherChannelListing'] = ResolversParentTypes['VoucherChannelListing']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discountValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  minSpent?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoucherConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherConnection'] = ResolversParentTypes['VoucherConnection']> = {
  edges?: Resolver<Array<ResolversTypes['VoucherEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoucherCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherCreated'] = ResolversParentTypes['VoucherCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  voucher?: Resolver<ResolversTypes['Voucher'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoucherDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherDeleted'] = ResolversParentTypes['VoucherDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  voucher?: Resolver<ResolversTypes['Voucher'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoucherEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherEdge'] = ResolversParentTypes['VoucherEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Voucher'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoucherMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherMetadataUpdated'] = ResolversParentTypes['VoucherMetadataUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  voucher?: Resolver<ResolversTypes['Voucher'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoucherMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherMutationResult'] = ResolversParentTypes['VoucherMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Voucher'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoucherTranslationResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherTranslation'] = ResolversParentTypes['VoucherTranslation']> = {
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['LanguageDisplay']>, ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes['LanguageCode'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  voucher?: Resolver<ResolversTypes['Voucher'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoucherUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherUpdated'] = ResolversParentTypes['VoucherUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  voucher?: Resolver<ResolversTypes['Voucher'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Warehouse'] = ResolversParentTypes['Warehouse']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  clickAndCollectOption?: Resolver<ResolversTypes['WarehouseClickAndCollectOption'], ParentType, ContextType>;
  companyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  metadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  metafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<WarehouseMetafieldArgs, 'key'>>;
  metafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<WarehouseMetafieldsArgs, 'keys'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privateMetadata?: Resolver<Array<ResolversTypes['MetadataItem']>, ParentType, ContextType>;
  privateMetafield?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<WarehousePrivateMetafieldArgs, 'key'>>;
  privateMetafields?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType, RequireFields<WarehousePrivateMetafieldsArgs, 'keys'>>;
  shippingZones?: Resolver<ResolversTypes['ShippingZoneConnection'], ParentType, ContextType, RequireFields<WarehouseShippingZonesArgs, 'after' | 'before' | 'first' | 'last'>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseBase'] = ResolversParentTypes['WarehouseBase']> = {
  __resolveType: TypeResolveFn<'WarehouseCreated' | 'WarehouseDeleted' | 'WarehouseMetadataUpdated' | 'WarehouseUpdated', ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
};

export type WarehouseConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseConnection'] = ResolversParentTypes['WarehouseConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WarehouseEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseCreatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseCreated'] = ResolversParentTypes['WarehouseCreated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseDeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseDeleted'] = ResolversParentTypes['WarehouseDeleted']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseEdge'] = ResolversParentTypes['WarehouseEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseError'] = ResolversParentTypes['WarehouseError']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingZones?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseMetadataUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseMetadataUpdated'] = ResolversParentTypes['WarehouseMetadataUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseMutationResult'] = ResolversParentTypes['WarehouseMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseShippingZoneAssignmentMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseShippingZoneAssignmentMutationResult'] = ResolversParentTypes['WarehouseShippingZoneAssignmentMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseShippingZoneUnassignmentMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseShippingZoneUnassignmentMutationResult'] = ResolversParentTypes['WarehouseShippingZoneUnassignmentMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseUpdatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseUpdated'] = ResolversParentTypes['WarehouseUpdated']> = {
  issuedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  issuingPrincipal?: Resolver<ResolversTypes['AppUser'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouse'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Webhook'] = ResolversParentTypes['Webhook']> = {
  app?: Resolver<ResolversTypes['App'], ParentType, ContextType>;
  asyncEvents?: Resolver<Array<ResolversTypes['AsyncWebhookEvent']>, ParentType, ContextType>;
  eventDeliveries?: Resolver<ResolversTypes['EventDeliveryConnection'], ParentType, ContextType, RequireFields<WebhookEventDeliveriesArgs, 'after' | 'before' | 'filters' | 'first' | 'last' | 'sortBy'>>;
  id?: Resolver<ResolversTypes['GlobalID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  secretKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subscriptionQuery?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  syncEvents?: Resolver<Array<ResolversTypes['SyncWebhookEvent']>, ParentType, ContextType>;
  targetUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookMutationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookMutationResult'] = ResolversParentTypes['WebhookMutationResult']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['ErrorInterface']>>, ParentType, ContextType>;
  webhook?: Resolver<ResolversTypes['Webhook'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface WeightScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Weight'], any> {
  name: 'Weight';
}

export type Resolvers<ContextType = any> = {
  AbstractOrder?: AbstractOrderResolvers<ContextType>;
  AbstractProduct?: AbstractProductResolvers<ContextType>;
  AccountError?: AccountErrorResolvers<ContextType>;
  AccountEvent?: AccountEventResolvers<ContextType>;
  Address?: AddressResolvers<ContextType>;
  AddressBase?: AddressBaseResolvers<ContextType>;
  AddressCreated?: AddressCreatedResolvers<ContextType>;
  AddressDeleted?: AddressDeletedResolvers<ContextType>;
  AddressEvent?: AddressEventResolvers<ContextType>;
  AddressMutationResult?: AddressMutationResultResolvers<ContextType>;
  AddressUpdated?: AddressUpdatedResolvers<ContextType>;
  AddressValidationData?: AddressValidationDataResolvers<ContextType>;
  Allocation?: AllocationResolvers<ContextType>;
  App?: AppResolvers<ContextType>;
  AppBase?: AppBaseResolvers<ContextType>;
  AppConnection?: AppConnectionResolvers<ContextType>;
  AppDeleted?: AppDeletedResolvers<ContextType>;
  AppEdge?: AppEdgeResolvers<ContextType>;
  AppError?: AppErrorResolvers<ContextType>;
  AppExtension?: AppExtensionResolvers<ContextType>;
  AppExtensionConnection?: AppExtensionConnectionResolvers<ContextType>;
  AppExtensionEdge?: AppExtensionEdgeResolvers<ContextType>;
  AppInstallation?: AppInstallationResolvers<ContextType>;
  AppInstallationMutationResult?: AppInstallationMutationResultResolvers<ContextType>;
  AppInstalled?: AppInstalledResolvers<ContextType>;
  AppManifestExtension?: AppManifestExtensionResolvers<ContextType>;
  AppManifestWebhook?: AppManifestWebhookResolvers<ContextType>;
  AppMutationResult?: AppMutationResultResolvers<ContextType>;
  AppStatusChanged?: AppStatusChangedResolvers<ContextType>;
  AppToken?: AppTokenResolvers<ContextType>;
  AppTokenMutationResult?: AppTokenMutationResultResolvers<ContextType>;
  AppUpdated?: AppUpdatedResolvers<ContextType>;
  AppUser?: AppUserResolvers<ContextType>;
  AsyncWebhookEvent?: AsyncWebhookEventResolvers<ContextType>;
  Attribute?: AttributeResolvers<ContextType>;
  AttributeBase?: AttributeBaseResolvers<ContextType>;
  AttributeConnection?: AttributeConnectionResolvers<ContextType>;
  AttributeCreated?: AttributeCreatedResolvers<ContextType>;
  AttributeDeleted?: AttributeDeletedResolvers<ContextType>;
  AttributeEdge?: AttributeEdgeResolvers<ContextType>;
  AttributeMutationResult?: AttributeMutationResultResolvers<ContextType>;
  AttributeNodeConnection?: AttributeNodeConnectionResolvers<ContextType>;
  AttributeNodeEdge?: AttributeNodeEdgeResolvers<ContextType>;
  AttributeTranslation?: AttributeTranslationResolvers<ContextType>;
  AttributeUpdated?: AttributeUpdatedResolvers<ContextType>;
  AuthPluginMutationResult?: AuthPluginMutationResultResolvers<ContextType>;
  BaseMutationResult?: BaseMutationResultResolvers<ContextType>;
  BasePricingInfo?: BasePricingInfoResolvers<ContextType>;
  BaseTranslation?: BaseTranslationResolvers<ContextType>;
  BoolMutationResult?: BoolMutationResultResolvers<ContextType>;
  BulkProductError?: BulkProductErrorResolvers<ContextType>;
  BulkStockError?: BulkStockErrorResolvers<ContextType>;
  CalculateTaxes?: CalculateTaxesResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryBase?: CategoryBaseResolvers<ContextType>;
  CategoryConnection?: CategoryConnectionResolvers<ContextType>;
  CategoryCreated?: CategoryCreatedResolvers<ContextType>;
  CategoryDeleted?: CategoryDeletedResolvers<ContextType>;
  CategoryEdge?: CategoryEdgeResolvers<ContextType>;
  CategoryMutationResult?: CategoryMutationResultResolvers<ContextType>;
  CategoryNodeConnection?: CategoryNodeConnectionResolvers<ContextType>;
  CategoryNodeEdge?: CategoryNodeEdgeResolvers<ContextType>;
  CategoryTranslation?: CategoryTranslationResolvers<ContextType>;
  CategoryUpdated?: CategoryUpdatedResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  ChannelBase?: ChannelBaseResolvers<ContextType>;
  ChannelCreated?: ChannelCreatedResolvers<ContextType>;
  ChannelDeleted?: ChannelDeletedResolvers<ContextType>;
  ChannelError?: ChannelErrorResolvers<ContextType>;
  ChannelMutationResult?: ChannelMutationResultResolvers<ContextType>;
  ChannelReorderWarehousesMutationResult?: ChannelReorderWarehousesMutationResultResolvers<ContextType>;
  ChannelStatusChanged?: ChannelStatusChangedResolvers<ContextType>;
  ChannelUpdated?: ChannelUpdatedResolvers<ContextType>;
  Checkout?: CheckoutResolvers<ContextType>;
  CheckoutBase?: CheckoutBaseResolvers<ContextType>;
  CheckoutCompleteMutationResult?: CheckoutCompleteMutationResultResolvers<ContextType>;
  CheckoutConnection?: CheckoutConnectionResolvers<ContextType>;
  CheckoutCreated?: CheckoutCreatedResolvers<ContextType>;
  CheckoutEdge?: CheckoutEdgeResolvers<ContextType>;
  CheckoutError?: CheckoutErrorResolvers<ContextType>;
  CheckoutFilterShippingMethods?: CheckoutFilterShippingMethodsResolvers<ContextType>;
  CheckoutLine?: CheckoutLineResolvers<ContextType>;
  CheckoutLineConnection?: CheckoutLineConnectionResolvers<ContextType>;
  CheckoutLineEdge?: CheckoutLineEdgeResolvers<ContextType>;
  CheckoutMetadataUpdated?: CheckoutMetadataUpdatedResolvers<ContextType>;
  CheckoutMutationResult?: CheckoutMutationResultResolvers<ContextType>;
  CheckoutNodeConnection?: CheckoutNodeConnectionResolvers<ContextType>;
  CheckoutNodeEdge?: CheckoutNodeEdgeResolvers<ContextType>;
  CheckoutOptionalMutationResult?: CheckoutOptionalMutationResultResolvers<ContextType>;
  CheckoutPaymentMutationResult?: CheckoutPaymentMutationResultResolvers<ContextType>;
  CheckoutUpdated?: CheckoutUpdatedResolvers<ContextType>;
  ChoiceValue?: ChoiceValueResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CollectionBase?: CollectionBaseResolvers<ContextType>;
  CollectionChannelListing?: CollectionChannelListingResolvers<ContextType>;
  CollectionChannelListingError?: CollectionChannelListingErrorResolvers<ContextType>;
  CollectionChannelListingMutationResult?: CollectionChannelListingMutationResultResolvers<ContextType>;
  CollectionConnection?: CollectionConnectionResolvers<ContextType>;
  CollectionCreated?: CollectionCreatedResolvers<ContextType>;
  CollectionDeleted?: CollectionDeletedResolvers<ContextType>;
  CollectionEdge?: CollectionEdgeResolvers<ContextType>;
  CollectionMetadataUpdated?: CollectionMetadataUpdatedResolvers<ContextType>;
  CollectionMutationResult?: CollectionMutationResultResolvers<ContextType>;
  CollectionTranslation?: CollectionTranslationResolvers<ContextType>;
  CollectionUpdated?: CollectionUpdatedResolvers<ContextType>;
  ConcreteProduct?: ConcreteProductResolvers<ContextType>;
  ConfigurationItem?: ConfigurationItemResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  CreateOrderd?: CreateOrderdResolvers<ContextType>;
  CreditCard?: CreditCardResolvers<ContextType>;
  CustomerCreated?: CustomerCreatedResolvers<ContextType>;
  CustomerMetadataUpdated?: CustomerMetadataUpdatedResolvers<ContextType>;
  CustomerUpdated?: CustomerUpdatedResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DigitalContent?: DigitalContentResolvers<ContextType>;
  DigitalContentConnection?: DigitalContentConnectionResolvers<ContextType>;
  DigitalContentEdge?: DigitalContentEdgeResolvers<ContextType>;
  DigitalContentMutationResult?: DigitalContentMutationResultResolvers<ContextType>;
  DigitalContentUrl?: DigitalContentUrlResolvers<ContextType>;
  DiscountError?: DiscountErrorResolvers<ContextType>;
  DraftOrderCreated?: DraftOrderCreatedResolvers<ContextType>;
  DraftOrderDeleted?: DraftOrderDeletedResolvers<ContextType>;
  DraftOrderUpdated?: DraftOrderUpdatedResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  ErrorInterface?: ErrorInterfaceResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventDelivery?: EventDeliveryResolvers<ContextType>;
  EventDeliveryConnection?: EventDeliveryConnectionResolvers<ContextType>;
  EventDeliveryEdge?: EventDeliveryEdgeResolvers<ContextType>;
  EventDeliveryMutationResult?: EventDeliveryMutationResultResolvers<ContextType>;
  ExportEvent?: ExportEventResolvers<ContextType>;
  ExportFile?: ExportFileResolvers<ContextType>;
  ExportFileConnection?: ExportFileConnectionResolvers<ContextType>;
  ExportFileEdge?: ExportFileEdgeResolvers<ContextType>;
  ExportFileMutationResult?: ExportFileMutationResultResolvers<ContextType>;
  ExternalAuthentication?: ExternalAuthenticationResolvers<ContextType>;
  ExternalNotificationTriggerMutationResult?: ExternalNotificationTriggerMutationResultResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  FileMutationResult?: FileMutationResultResolvers<ContextType>;
  Fulfillment?: FulfillmentResolvers<ContextType>;
  FulfillmentApproved?: FulfillmentApprovedResolvers<ContextType>;
  FulfillmentBase?: FulfillmentBaseResolvers<ContextType>;
  FulfillmentCanceled?: FulfillmentCanceledResolvers<ContextType>;
  FulfillmentCreated?: FulfillmentCreatedResolvers<ContextType>;
  FulfillmentLine?: FulfillmentLineResolvers<ContextType>;
  FulfillmentMetadataUpdated?: FulfillmentMetadataUpdatedResolvers<ContextType>;
  FulfillmentMethod?: FulfillmentMethodResolvers<ContextType>;
  GatewayConfigLine?: GatewayConfigLineResolvers<ContextType>;
  GiftCard?: GiftCardResolvers<ContextType>;
  GiftCardBase?: GiftCardBaseResolvers<ContextType>;
  GiftCardBulkMutationResult?: GiftCardBulkMutationResultResolvers<ContextType>;
  GiftCardConnection?: GiftCardConnectionResolvers<ContextType>;
  GiftCardCreated?: GiftCardCreatedResolvers<ContextType>;
  GiftCardDeleted?: GiftCardDeletedResolvers<ContextType>;
  GiftCardEdge?: GiftCardEdgeResolvers<ContextType>;
  GiftCardError?: GiftCardErrorResolvers<ContextType>;
  GiftCardEvent?: GiftCardEventResolvers<ContextType>;
  GiftCardEventBalance?: GiftCardEventBalanceResolvers<ContextType>;
  GiftCardMetadataUpdated?: GiftCardMetadataUpdatedResolvers<ContextType>;
  GiftCardMutationResult?: GiftCardMutationResultResolvers<ContextType>;
  GiftCardNodeConnection?: GiftCardNodeConnectionResolvers<ContextType>;
  GiftCardNodeEdge?: GiftCardNodeEdgeResolvers<ContextType>;
  GiftCardSettings?: GiftCardSettingsResolvers<ContextType>;
  GiftCardSettingsMutationResult?: GiftCardSettingsMutationResultResolvers<ContextType>;
  GiftCardStatusChanged?: GiftCardStatusChangedResolvers<ContextType>;
  GiftCardTag?: GiftCardTagResolvers<ContextType>;
  GiftCardTagConnection?: GiftCardTagConnectionResolvers<ContextType>;
  GiftCardTagEdge?: GiftCardTagEdgeResolvers<ContextType>;
  GiftCardUpdated?: GiftCardUpdatedResolvers<ContextType>;
  Giftcardmutationresult?: GiftcardmutationresultResolvers<ContextType>;
  GlobalID?: GraphQLScalarType;
  GoogleAddressBase?: GoogleAddressBaseResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  GroupBase?: GroupBaseResolvers<ContextType>;
  GroupConnection?: GroupConnectionResolvers<ContextType>;
  GroupCreated?: GroupCreatedResolvers<ContextType>;
  GroupDeleted?: GroupDeletedResolvers<ContextType>;
  GroupEdge?: GroupEdgeResolvers<ContextType>;
  GroupError?: GroupErrorResolvers<ContextType>;
  GroupMutationResult?: GroupMutationResultResolvers<ContextType>;
  GroupUpdated?: GroupUpdatedResolvers<ContextType>;
  IDListMutationResult?: IdListMutationResultResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Invoice?: InvoiceResolvers<ContextType>;
  InvoiceBase?: InvoiceBaseResolvers<ContextType>;
  InvoiceDeleted?: InvoiceDeletedResolvers<ContextType>;
  InvoiceMutationResult?: InvoiceMutationResultResolvers<ContextType>;
  InvoiceRequested?: InvoiceRequestedResolvers<ContextType>;
  InvoiceSent?: InvoiceSentResolvers<ContextType>;
  JSONString?: GraphQLScalarType;
  JWT?: JwtResolvers<ContextType>;
  JWTMutationResult?: JwtMutationResultResolvers<ContextType>;
  Job?: JobResolvers<ContextType>;
  LanguageDisplay?: LanguageDisplayResolvers<ContextType>;
  LimitInfo?: LimitInfoResolvers<ContextType>;
  Limits?: LimitsResolvers<ContextType>;
  Manifest?: ManifestResolvers<ContextType>;
  ManifestMutationResult?: ManifestMutationResultResolvers<ContextType>;
  MediaBase?: MediaBaseResolvers<ContextType>;
  MediaCreated?: MediaCreatedResolvers<ContextType>;
  MediaDeleted?: MediaDeletedResolvers<ContextType>;
  MediaError?: MediaErrorResolvers<ContextType>;
  MediaItem?: MediaItemResolvers<ContextType>;
  MediaItemConnection?: MediaItemConnectionResolvers<ContextType>;
  MediaItemEdge?: MediaItemEdgeResolvers<ContextType>;
  MediaItemMutationResult?: MediaItemMutationResultResolvers<ContextType>;
  MediaUpdated?: MediaUpdatedResolvers<ContextType>;
  Menu?: MenuResolvers<ContextType>;
  MenuBase?: MenuBaseResolvers<ContextType>;
  MenuConnection?: MenuConnectionResolvers<ContextType>;
  MenuCreated?: MenuCreatedResolvers<ContextType>;
  MenuDeleted?: MenuDeletedResolvers<ContextType>;
  MenuEdge?: MenuEdgeResolvers<ContextType>;
  MenuItem?: MenuItemResolvers<ContextType>;
  MenuItemBase?: MenuItemBaseResolvers<ContextType>;
  MenuItemConnection?: MenuItemConnectionResolvers<ContextType>;
  MenuItemCreated?: MenuItemCreatedResolvers<ContextType>;
  MenuItemDeleted?: MenuItemDeletedResolvers<ContextType>;
  MenuItemEdge?: MenuItemEdgeResolvers<ContextType>;
  MenuItemMutationResult?: MenuItemMutationResultResolvers<ContextType>;
  MenuItemTranslation?: MenuItemTranslationResolvers<ContextType>;
  MenuItemUpdated?: MenuItemUpdatedResolvers<ContextType>;
  MenuMutationResult?: MenuMutationResultResolvers<ContextType>;
  MenuUpdated?: MenuUpdatedResolvers<ContextType>;
  Metadata?: GraphQLScalarType;
  MetadataItem?: MetadataItemResolvers<ContextType>;
  Money?: MoneyResolvers<ContextType>;
  MoneyRange?: MoneyRangeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  ObjectWithMetadata?: ObjectWithMetadataResolvers<ContextType>;
  ObjectWithMetadataMutationResult?: ObjectWithMetadataMutationResultResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderBase?: OrderBaseResolvers<ContextType>;
  OrderBulkMutationResult?: OrderBulkMutationResultResolvers<ContextType>;
  OrderCancelled?: OrderCancelledResolvers<ContextType>;
  OrderConfirmed?: OrderConfirmedResolvers<ContextType>;
  OrderConnection?: OrderConnectionResolvers<ContextType>;
  OrderDiscount?: OrderDiscountResolvers<ContextType>;
  OrderEdge?: OrderEdgeResolvers<ContextType>;
  OrderError?: OrderErrorResolvers<ContextType>;
  OrderEvent?: OrderEventResolvers<ContextType>;
  OrderEventConnection?: OrderEventConnectionResolvers<ContextType>;
  OrderEventEdge?: OrderEventEdgeResolvers<ContextType>;
  OrderEventOrderLineObject?: OrderEventOrderLineObjectResolvers<ContextType>;
  OrderFilterShippingMethods?: OrderFilterShippingMethodsResolvers<ContextType>;
  OrderFulfilled?: OrderFulfilledResolvers<ContextType>;
  OrderFulfillment?: OrderFulfillmentResolvers<ContextType>;
  OrderFulfillmentMutationResult?: OrderFulfillmentMutationResultResolvers<ContextType>;
  OrderFullyPaid?: OrderFullyPaidResolvers<ContextType>;
  OrderInvoiceMutationResult?: OrderInvoiceMutationResultResolvers<ContextType>;
  OrderLine?: OrderLineResolvers<ContextType>;
  OrderLineMutationResult?: OrderLineMutationResultResolvers<ContextType>;
  OrderLinesMutationResult?: OrderLinesMutationResultResolvers<ContextType>;
  OrderMetadataUpdated?: OrderMetadataUpdatedResolvers<ContextType>;
  OrderMutationResult?: OrderMutationResultResolvers<ContextType>;
  OrderNodeConnection?: OrderNodeConnectionResolvers<ContextType>;
  OrderNodeEdge?: OrderNodeEdgeResolvers<ContextType>;
  OrderSettings?: OrderSettingsResolvers<ContextType>;
  OrderSettingsMutationResult?: OrderSettingsMutationResultResolvers<ContextType>;
  OrderUpdated?: OrderUpdatedResolvers<ContextType>;
  Ordermutationresult?: OrdermutationresultResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  PageBase?: PageBaseResolvers<ContextType>;
  PageBulkMutationResult?: PageBulkMutationResultResolvers<ContextType>;
  PageConnection?: PageConnectionResolvers<ContextType>;
  PageCreated?: PageCreatedResolvers<ContextType>;
  PageDeleted?: PageDeletedResolvers<ContextType>;
  PageEdge?: PageEdgeResolvers<ContextType>;
  PageError?: PageErrorResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PageKlass?: PageKlassResolvers<ContextType>;
  PageKlassBase?: PageKlassBaseResolvers<ContextType>;
  PageKlassConnection?: PageKlassConnectionResolvers<ContextType>;
  PageKlassCreated?: PageKlassCreatedResolvers<ContextType>;
  PageKlassDeleted?: PageKlassDeletedResolvers<ContextType>;
  PageKlassEdge?: PageKlassEdgeResolvers<ContextType>;
  PageKlassMutationResult?: PageKlassMutationResultResolvers<ContextType>;
  PageKlassUpdated?: PageKlassUpdatedResolvers<ContextType>;
  PageMutationResult?: PageMutationResultResolvers<ContextType>;
  PageTranslation?: PageTranslationResolvers<ContextType>;
  PageUpdated?: PageUpdatedResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  PaymentAuthorize?: PaymentAuthorizeResolvers<ContextType>;
  PaymentBase?: PaymentBaseResolvers<ContextType>;
  PaymentCaptureEvent?: PaymentCaptureEventResolvers<ContextType>;
  PaymentCheckBalanceMutationResult?: PaymentCheckBalanceMutationResultResolvers<ContextType>;
  PaymentConfirmEvent?: PaymentConfirmEventResolvers<ContextType>;
  PaymentConnection?: PaymentConnectionResolvers<ContextType>;
  PaymentEdge?: PaymentEdgeResolvers<ContextType>;
  PaymentError?: PaymentErrorResolvers<ContextType>;
  PaymentGateway?: PaymentGatewayResolvers<ContextType>;
  PaymentInitializeMutationResult?: PaymentInitializeMutationResultResolvers<ContextType>;
  PaymentInitialized?: PaymentInitializedResolvers<ContextType>;
  PaymentListGateways?: PaymentListGatewaysResolvers<ContextType>;
  PaymentMutationResult?: PaymentMutationResultResolvers<ContextType>;
  PaymentProcessEvent?: PaymentProcessEventResolvers<ContextType>;
  PaymentRefundEvent?: PaymentRefundEventResolvers<ContextType>;
  PaymentSource?: PaymentSourceResolvers<ContextType>;
  PaymentVoidEvent?: PaymentVoidEventResolvers<ContextType>;
  Permission?: PermissionResolvers<ContextType>;
  Plugin?: PluginResolvers<ContextType>;
  PluginConfiguration?: PluginConfigurationResolvers<ContextType>;
  PluginConnection?: PluginConnectionResolvers<ContextType>;
  PluginEdge?: PluginEdgeResolvers<ContextType>;
  PluginMutationResult?: PluginMutationResultResolvers<ContextType>;
  PointOfContact?: PointOfContactResolvers<ContextType>;
  PositiveDecimal?: GraphQLScalarType;
  PreorderData?: PreorderDataResolvers<ContextType>;
  PreorderThreshold?: PreorderThresholdResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductAttributeAssignment?: ProductAttributeAssignmentResolvers<ContextType>;
  ProductAttributeAssignmentMutationResult?: ProductAttributeAssignmentMutationResultResolvers<ContextType>;
  ProductBackInStock?: ProductBackInStockResolvers<ContextType>;
  ProductBase?: ProductBaseResolvers<ContextType>;
  ProductBulkMutationResult?: ProductBulkMutationResultResolvers<ContextType>;
  ProductChannelListing?: ProductChannelListingResolvers<ContextType>;
  ProductChannelListingError?: ProductChannelListingErrorResolvers<ContextType>;
  ProductConnection?: ProductConnectionResolvers<ContextType>;
  ProductCreated?: ProductCreatedResolvers<ContextType>;
  ProductDeleted?: ProductDeletedResolvers<ContextType>;
  ProductEdge?: ProductEdgeResolvers<ContextType>;
  ProductError?: ProductErrorResolvers<ContextType>;
  ProductImage?: ProductImageResolvers<ContextType>;
  ProductKlass?: ProductKlassResolvers<ContextType>;
  ProductKlassConnection?: ProductKlassConnectionResolvers<ContextType>;
  ProductKlassEdge?: ProductKlassEdgeResolvers<ContextType>;
  ProductKlassMutationResult?: ProductKlassMutationResultResolvers<ContextType>;
  ProductKlassNodeConnection?: ProductKlassNodeConnectionResolvers<ContextType>;
  ProductKlassNodeEdge?: ProductKlassNodeEdgeResolvers<ContextType>;
  ProductMediaAssignmentMutationResult?: ProductMediaAssignmentMutationResultResolvers<ContextType>;
  ProductMediaItem?: ProductMediaItemResolvers<ContextType>;
  ProductMediaMutationResult?: ProductMediaMutationResultResolvers<ContextType>;
  ProductMediaUnassignmentMutationResult?: ProductMediaUnassignmentMutationResultResolvers<ContextType>;
  ProductMetadataUpdated?: ProductMetadataUpdatedResolvers<ContextType>;
  ProductMutationResult?: ProductMutationResultResolvers<ContextType>;
  ProductNodeConnection?: ProductNodeConnectionResolvers<ContextType>;
  ProductNodeEdge?: ProductNodeEdgeResolvers<ContextType>;
  ProductOutOfStock?: ProductOutOfStockResolvers<ContextType>;
  ProductPreorderDeactivationMutationResult?: ProductPreorderDeactivationMutationResultResolvers<ContextType>;
  ProductPricingInfo?: ProductPricingInfoResolvers<ContextType>;
  ProductTranslation?: ProductTranslationResolvers<ContextType>;
  ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation?: ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslationResolvers<ContextType>;
  ProductUpdated?: ProductUpdatedResolvers<ContextType>;
  ProductWithoutVariantError?: ProductWithoutVariantErrorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReducedRate?: ReducedRateResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  SaleBase?: SaleBaseResolvers<ContextType>;
  SaleChannelListing?: SaleChannelListingResolvers<ContextType>;
  SaleConnection?: SaleConnectionResolvers<ContextType>;
  SaleCreated?: SaleCreatedResolvers<ContextType>;
  SaleDeleted?: SaleDeletedResolvers<ContextType>;
  SaleEdge?: SaleEdgeResolvers<ContextType>;
  SaleMutationResult?: SaleMutationResultResolvers<ContextType>;
  SaleToggle?: SaleToggleResolvers<ContextType>;
  SaleTranslation?: SaleTranslationResolvers<ContextType>;
  SaleUpdated?: SaleUpdatedResolvers<ContextType>;
  ShippingError?: ShippingErrorResolvers<ContextType>;
  ShippingListMethodsForCheckout?: ShippingListMethodsForCheckoutResolvers<ContextType>;
  ShippingMethod?: ShippingMethodResolvers<ContextType>;
  ShippingMethodChannelListing?: ShippingMethodChannelListingResolvers<ContextType>;
  ShippingMethodChannelListingMutationResult?: ShippingMethodChannelListingMutationResultResolvers<ContextType>;
  ShippingMethodMutationResult?: ShippingMethodMutationResultResolvers<ContextType>;
  ShippingMethodPostalCodeRule?: ShippingMethodPostalCodeRuleResolvers<ContextType>;
  ShippingMethodTranslation?: ShippingMethodTranslationResolvers<ContextType>;
  ShippingPrice?: ShippingPriceResolvers<ContextType>;
  ShippingPriceBase?: ShippingPriceBaseResolvers<ContextType>;
  ShippingPriceCreated?: ShippingPriceCreatedResolvers<ContextType>;
  ShippingPriceDeleted?: ShippingPriceDeletedResolvers<ContextType>;
  ShippingPriceMutationResult?: ShippingPriceMutationResultResolvers<ContextType>;
  ShippingPriceRemoveProductFromExcludeMutationResult?: ShippingPriceRemoveProductFromExcludeMutationResultResolvers<ContextType>;
  ShippingPriceUpdated?: ShippingPriceUpdatedResolvers<ContextType>;
  ShippingZone?: ShippingZoneResolvers<ContextType>;
  ShippingZoneBase?: ShippingZoneBaseResolvers<ContextType>;
  ShippingZoneConnection?: ShippingZoneConnectionResolvers<ContextType>;
  ShippingZoneCreated?: ShippingZoneCreatedResolvers<ContextType>;
  ShippingZoneDeleted?: ShippingZoneDeletedResolvers<ContextType>;
  ShippingZoneEdge?: ShippingZoneEdgeResolvers<ContextType>;
  ShippingZoneMetadataUpdated?: ShippingZoneMetadataUpdatedResolvers<ContextType>;
  ShippingZoneMutationResult?: ShippingZoneMutationResultResolvers<ContextType>;
  ShippingZoneUpdated?: ShippingZoneUpdatedResolvers<ContextType>;
  Site?: SiteResolvers<ContextType>;
  SiteMutationResult?: SiteMutationResultResolvers<ContextType>;
  SiteTranslation?: SiteTranslationResolvers<ContextType>;
  SiteTranslationMutationResult?: SiteTranslationMutationResultResolvers<ContextType>;
  Size?: SizeResolvers<ContextType>;
  StaffCreated?: StaffCreatedResolvers<ContextType>;
  StaffDeleted?: StaffDeletedResolvers<ContextType>;
  StaffError?: StaffErrorResolvers<ContextType>;
  StaffNotificationRecipient?: StaffNotificationRecipientResolvers<ContextType>;
  StaffNotificationRecipientMutationResult?: StaffNotificationRecipientMutationResultResolvers<ContextType>;
  StaffUpdated?: StaffUpdatedResolvers<ContextType>;
  Stock?: StockResolvers<ContextType>;
  StockConnection?: StockConnectionResolvers<ContextType>;
  StockEdge?: StockEdgeResolvers<ContextType>;
  StockSettings?: StockSettingsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SyncWebhookEvent?: SyncWebhookEventResolvers<ContextType>;
  TaxClass?: TaxClassResolvers<ContextType>;
  TaxClassConnection?: TaxClassConnectionResolvers<ContextType>;
  TaxClassCountryRate?: TaxClassCountryRateResolvers<ContextType>;
  TaxClassCreateError?: TaxClassCreateErrorResolvers<ContextType>;
  TaxClassDeleteError?: TaxClassDeleteErrorResolvers<ContextType>;
  TaxClassEdge?: TaxClassEdgeResolvers<ContextType>;
  TaxClassMutationResult?: TaxClassMutationResultResolvers<ContextType>;
  TaxClassUpdateError?: TaxClassUpdateErrorResolvers<ContextType>;
  TaxConfiguration?: TaxConfigurationResolvers<ContextType>;
  TaxConfigurationConnection?: TaxConfigurationConnectionResolvers<ContextType>;
  TaxConfigurationEdge?: TaxConfigurationEdgeResolvers<ContextType>;
  TaxConfigurationMutationResult?: TaxConfigurationMutationResultResolvers<ContextType>;
  TaxConfigurationPerCountry?: TaxConfigurationPerCountryResolvers<ContextType>;
  TaxConfigurationUpdateError?: TaxConfigurationUpdateErrorResolvers<ContextType>;
  TaxCountryConfiguration?: TaxCountryConfigurationResolvers<ContextType>;
  TaxCountryConfigurationMutationResult?: TaxCountryConfigurationMutationResultResolvers<ContextType>;
  TaxCountryConfigurationUpdateError?: TaxCountryConfigurationUpdateErrorResolvers<ContextType>;
  TaxSourceLine?: TaxSourceLineResolvers<ContextType>;
  TaxSourceObject?: TaxSourceObjectResolvers<ContextType>;
  TaxSourceObjectMutationResult?: TaxSourceObjectMutationResultResolvers<ContextType>;
  TaxType?: TaxTypeResolvers<ContextType>;
  TaxableObject?: TaxableObjectResolvers<ContextType>;
  TaxableObjectDiscount?: TaxableObjectDiscountResolvers<ContextType>;
  TaxableObjectLine?: TaxableObjectLineResolvers<ContextType>;
  TaxedMoney?: TaxedMoneyResolvers<ContextType>;
  TaxedMoneyRange?: TaxedMoneyRangeResolvers<ContextType>;
  TempoNode?: TempoNodeResolvers<ContextType>;
  Thumbnail?: ThumbnailResolvers<ContextType>;
  TimePeriod?: TimePeriodResolvers<ContextType>;
  TokenVerificationMutationResult?: TokenVerificationMutationResultResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionAction?: TransactionActionResolvers<ContextType>;
  TransactionActionRequest?: TransactionActionRequestResolvers<ContextType>;
  TransactionEvent?: TransactionEventResolvers<ContextType>;
  TransactionItem?: TransactionItemResolvers<ContextType>;
  TransactionItemMetadataUpdated?: TransactionItemMetadataUpdatedResolvers<ContextType>;
  TransactionItemMutationResult?: TransactionItemMutationResultResolvers<ContextType>;
  TranslatableItem?: TranslatableItemResolvers<ContextType>;
  TranslatableItemConnection?: TranslatableItemConnectionResolvers<ContextType>;
  TranslatableItemEdge?: TranslatableItemEdgeResolvers<ContextType>;
  TranslationBase?: TranslationBaseResolvers<ContextType>;
  TranslationCreated?: TranslationCreatedResolvers<ContextType>;
  TranslationUpdated?: TranslationUpdatedResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserBase?: UserBaseResolvers<ContextType>;
  UserBulkMutationResult?: UserBulkMutationResultResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserCreationResult?: UserCreationResultResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserMutationResult?: UserMutationResultResolvers<ContextType>;
  UserPermission?: UserPermissionResolvers<ContextType>;
  VAT?: VatResolvers<ContextType>;
  Value?: ValueResolvers<ContextType>;
  ValueBase?: ValueBaseResolvers<ContextType>;
  ValueConnection?: ValueConnectionResolvers<ContextType>;
  ValueCreated?: ValueCreatedResolvers<ContextType>;
  ValueDeleted?: ValueDeletedResolvers<ContextType>;
  ValueEdge?: ValueEdgeResolvers<ContextType>;
  ValueMutationResult?: ValueMutationResultResolvers<ContextType>;
  ValueTranslation?: ValueTranslationResolvers<ContextType>;
  ValueUpdated?: ValueUpdatedResolvers<ContextType>;
  Void?: GraphQLScalarType;
  Voucher?: VoucherResolvers<ContextType>;
  VoucherBase?: VoucherBaseResolvers<ContextType>;
  VoucherChannelListing?: VoucherChannelListingResolvers<ContextType>;
  VoucherConnection?: VoucherConnectionResolvers<ContextType>;
  VoucherCreated?: VoucherCreatedResolvers<ContextType>;
  VoucherDeleted?: VoucherDeletedResolvers<ContextType>;
  VoucherEdge?: VoucherEdgeResolvers<ContextType>;
  VoucherMetadataUpdated?: VoucherMetadataUpdatedResolvers<ContextType>;
  VoucherMutationResult?: VoucherMutationResultResolvers<ContextType>;
  VoucherTranslation?: VoucherTranslationResolvers<ContextType>;
  VoucherUpdated?: VoucherUpdatedResolvers<ContextType>;
  Warehouse?: WarehouseResolvers<ContextType>;
  WarehouseBase?: WarehouseBaseResolvers<ContextType>;
  WarehouseConnection?: WarehouseConnectionResolvers<ContextType>;
  WarehouseCreated?: WarehouseCreatedResolvers<ContextType>;
  WarehouseDeleted?: WarehouseDeletedResolvers<ContextType>;
  WarehouseEdge?: WarehouseEdgeResolvers<ContextType>;
  WarehouseError?: WarehouseErrorResolvers<ContextType>;
  WarehouseMetadataUpdated?: WarehouseMetadataUpdatedResolvers<ContextType>;
  WarehouseMutationResult?: WarehouseMutationResultResolvers<ContextType>;
  WarehouseShippingZoneAssignmentMutationResult?: WarehouseShippingZoneAssignmentMutationResultResolvers<ContextType>;
  WarehouseShippingZoneUnassignmentMutationResult?: WarehouseShippingZoneUnassignmentMutationResultResolvers<ContextType>;
  WarehouseUpdated?: WarehouseUpdatedResolvers<ContextType>;
  Webhook?: WebhookResolvers<ContextType>;
  WebhookMutationResult?: WebhookMutationResultResolvers<ContextType>;
  Weight?: GraphQLScalarType;
};

