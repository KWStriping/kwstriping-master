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
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  AppUser: ( App ) | ( User );
  FulfillmentMethod: ( ShippingMethod ) | ( Warehouse );
  ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation: ( AttributeTranslation ) | ( CategoryTranslation ) | ( CollectionTranslation ) | ( MenuItemTranslation ) | ( PageTranslation ) | ( ProductTranslation ) | ( SaleTranslation ) | ( ShippingMethodTranslation ) | ( ValueTranslation ) | ( VoucherTranslation );
  TaxSourceLine: ( CheckoutLine ) | ( OrderLine );
  TaxSourceObject: ( Omit<Checkout, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } ) | ( Omit<Order, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } );
  TranslatableItem: ( AttributeTranslation ) | ( CategoryTranslation ) | ( CollectionTranslation ) | ( MenuItemTranslation ) | ( PageTranslation ) | ( ProductTranslation ) | ( SaleTranslation ) | ( ShippingMethodTranslation ) | ( ValueTranslation ) | ( VoucherTranslation );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  AbstractOrder: ( Omit<Checkout, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } ) | ( Omit<Order, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } );
  AddressBase: ( Address );
  AddressEvent: ( Omit<AddressCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AddressDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AddressUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  AppBase: ( Omit<AppDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AppInstalled, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AppStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AppUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  AttributeBase: ( Omit<AttributeCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AttributeDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AttributeUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  BaseMutationResult: ( AddressMutationResult ) | ( AppInstallationMutationResult ) | ( AppMutationResult ) | ( AppTokenMutationResult ) | ( AttributeMutationResult ) | ( AuthPluginMutationResult ) | ( BoolMutationResult ) | ( CategoryMutationResult ) | ( ChannelMutationResult ) | ( ChannelReorderWarehousesMutationResult ) | ( CheckoutCompleteMutationResult ) | ( CheckoutMutationResult ) | ( CheckoutOptionalMutationResult ) | ( CheckoutPaymentMutationResult ) | ( CollectionChannelListingMutationResult ) | ( CollectionMutationResult ) | ( DigitalContentMutationResult ) | ( EventDeliveryMutationResult ) | ( ExportFileMutationResult ) | ( ExternalNotificationTriggerMutationResult ) | ( FileMutationResult ) | ( GiftCardBulkMutationResult ) | ( GiftCardMutationResult ) | ( GiftCardSettingsMutationResult ) | ( Giftcardmutationresult ) | ( GroupMutationResult ) | ( IdListMutationResult ) | ( InvoiceMutationResult ) | ( JwtMutationResult ) | ( ManifestMutationResult ) | ( MediaItemMutationResult ) | ( MenuItemMutationResult ) | ( MenuMutationResult ) | ( ObjectWithMetadataMutationResult ) | ( OrderBulkMutationResult ) | ( OrderFulfillmentMutationResult ) | ( OrderInvoiceMutationResult ) | ( OrderLineMutationResult ) | ( OrderLinesMutationResult ) | ( OrderMutationResult ) | ( OrderSettingsMutationResult ) | ( Ordermutationresult ) | ( PageBulkMutationResult ) | ( PageKlassMutationResult ) | ( PageMutationResult ) | ( PaymentCheckBalanceMutationResult ) | ( PaymentInitializeMutationResult ) | ( PaymentMutationResult ) | ( PluginMutationResult ) | ( ProductAttributeAssignmentMutationResult ) | ( ProductBulkMutationResult ) | ( ProductKlassMutationResult ) | ( ProductMediaAssignmentMutationResult ) | ( ProductMediaMutationResult ) | ( ProductMediaUnassignmentMutationResult ) | ( ProductMutationResult ) | ( ProductPreorderDeactivationMutationResult ) | ( SaleMutationResult ) | ( ShippingMethodChannelListingMutationResult ) | ( ShippingMethodMutationResult ) | ( ShippingPriceMutationResult ) | ( ShippingPriceRemoveProductFromExcludeMutationResult ) | ( ShippingZoneMutationResult ) | ( SiteMutationResult ) | ( SiteTranslationMutationResult ) | ( StaffNotificationRecipientMutationResult ) | ( TaxClassMutationResult ) | ( TaxConfigurationMutationResult ) | ( TaxCountryConfigurationMutationResult ) | ( Omit<TaxSourceObjectMutationResult, 'result'> & { result: RefType['TaxSourceObject'] } ) | ( TokenVerificationMutationResult ) | ( TransactionItemMutationResult ) | ( UserBulkMutationResult ) | ( UserCreationResult ) | ( UserMutationResult ) | ( ValueMutationResult ) | ( VoucherMutationResult ) | ( WarehouseMutationResult ) | ( WarehouseShippingZoneAssignmentMutationResult ) | ( WarehouseShippingZoneUnassignmentMutationResult ) | ( WebhookMutationResult );
  BasePricingInfo: ( ProductPricingInfo );
  BaseTranslation: ( AttributeTranslation ) | ( CategoryTranslation ) | ( CollectionTranslation ) | ( MenuItemTranslation ) | ( PageTranslation ) | ( ProductTranslation ) | ( SaleTranslation ) | ( ShippingMethodTranslation ) | ( SiteTranslation ) | ( ValueTranslation ) | ( VoucherTranslation );
  CategoryBase: ( Omit<CategoryCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CategoryDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CategoryUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  ChannelBase: ( Omit<ChannelCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ChannelDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ChannelStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ChannelUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  CheckoutBase: ( Omit<CheckoutCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CheckoutFilterShippingMethods, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CheckoutMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CheckoutUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentListGateways, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingListMethodsForCheckout, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  CollectionBase: ( Omit<CollectionCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CollectionDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CollectionMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CollectionUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  ErrorInterface: ( AccountError ) | ( AppError ) | ( BulkProductError ) | ( BulkStockError ) | ( ChannelError ) | ( CheckoutError ) | ( CollectionChannelListingError ) | ( DiscountError ) | ( Error ) | ( GiftCardError ) | ( GroupError ) | ( MediaError ) | ( OrderError ) | ( PageError ) | ( PaymentError ) | ( ProductChannelListingError ) | ( ProductError ) | ( ProductWithoutVariantError ) | ( ShippingError ) | ( StaffError ) | ( TaxClassCreateError ) | ( TaxClassDeleteError ) | ( TaxClassUpdateError ) | ( TaxConfigurationUpdateError ) | ( TaxCountryConfigurationUpdateError ) | ( WarehouseError );
  Event: ( Omit<AddressCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AddressDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AddressUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AppDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AppInstalled, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AppStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AppUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AttributeCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AttributeDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<AttributeUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CalculateTaxes, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CategoryCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CategoryDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CategoryUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ChannelCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ChannelDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ChannelStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ChannelUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CheckoutCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CheckoutFilterShippingMethods, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CheckoutMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CheckoutUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CollectionCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CollectionDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CollectionMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CollectionUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CreateOrderd, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CustomerCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CustomerMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CustomerUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<DraftOrderCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<DraftOrderDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<DraftOrderUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<FulfillmentApproved, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<FulfillmentCanceled, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<FulfillmentCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<FulfillmentMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GiftCardCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GiftCardDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GiftCardMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GiftCardStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GiftCardUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GroupCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GroupDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GroupUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<InvoiceDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<InvoiceRequested, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<InvoiceSent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MediaCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MediaDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MediaUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuItemCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuItemDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuItemUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderCancelled, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderConfirmed, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderFilterShippingMethods, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderFulfilled, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderFullyPaid, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageKlassCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageKlassDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageKlassUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentAuthorize, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentCaptureEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentConfirmEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentListGateways, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentProcessEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentRefundEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentVoidEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductBackInStock, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductOutOfStock, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<SaleCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<SaleDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<SaleToggle, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<SaleUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingListMethodsForCheckout, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingPriceCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingPriceDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingPriceUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingZoneCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingZoneDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingZoneMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingZoneUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<StaffCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<StaffDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<StaffUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<Subscription, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<TransactionAction, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<TransactionActionRequest, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<TransactionItemMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<TranslationCreated, 'issuingPrincipal' | 'translation'> & { issuingPrincipal: RefType['AppUser'], translation: RefType['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] } ) | ( Omit<TranslationUpdated, 'issuingPrincipal' | 'translation'> & { issuingPrincipal: RefType['AppUser'], translation: RefType['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] } ) | ( Omit<ValueCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ValueDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ValueUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<VoucherCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<VoucherDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<VoucherMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<VoucherUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<WarehouseCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<WarehouseDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<WarehouseMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<WarehouseUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  FulfillmentBase: ( Omit<FulfillmentApproved, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<FulfillmentCanceled, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<FulfillmentCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<FulfillmentMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  GiftCardBase: ( Omit<GiftCardCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GiftCardDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GiftCardMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GiftCardStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GiftCardUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  GoogleAddressBase: ( Address );
  GroupBase: ( Omit<GroupCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GroupDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<GroupUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  InvoiceBase: ( Omit<InvoiceDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<InvoiceRequested, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<InvoiceSent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  Job: ( AppInstallation ) | ( ExportFile ) | ( Invoice );
  MediaBase: ( Omit<MediaCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MediaDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MediaUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  MenuBase: ( Omit<MenuCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  MenuItemBase: ( Omit<MenuItemCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuItemDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<MenuItemUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  Node: ( AbstractProduct ) | ( AccountEvent ) | ( Address ) | ( Allocation ) | ( App ) | ( AppExtension ) | ( AppInstallation ) | ( AppToken ) | ( AsyncWebhookEvent ) | ( Attribute ) | ( AttributeTranslation ) | ( Category ) | ( CategoryTranslation ) | ( Channel ) | ( Omit<Checkout, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } ) | ( CheckoutLine ) | ( Collection ) | ( CollectionChannelListing ) | ( CollectionTranslation ) | ( ConcreteProduct ) | ( DigitalContent ) | ( DigitalContentUrl ) | ( EventDelivery ) | ( ExportEvent ) | ( ExportFile ) | ( Fulfillment ) | ( FulfillmentLine ) | ( GiftCard ) | ( GiftCardEvent ) | ( GiftCardTag ) | ( Group ) | ( Invoice ) | ( MediaItem ) | ( Menu ) | ( MenuItem ) | ( MenuItemTranslation ) | ( Omit<Order, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } ) | ( OrderDiscount ) | ( OrderEvent ) | ( OrderLine ) | ( Page ) | ( PageKlass ) | ( PageTranslation ) | ( Payment ) | ( PointOfContact ) | ( ProductChannelListing ) | ( ProductImage ) | ( ProductKlass ) | ( ProductMediaItem ) | ( ProductTranslation ) | ( Sale ) | ( SaleChannelListing ) | ( SaleTranslation ) | ( ShippingMethod ) | ( ShippingMethodChannelListing ) | ( ShippingMethodPostalCodeRule ) | ( ShippingMethodTranslation ) | ( ShippingZone ) | ( Site ) | ( SiteTranslation ) | ( StaffNotificationRecipient ) | ( Stock ) | ( SyncWebhookEvent ) | ( TaxClass ) | ( TaxConfiguration ) | ( TaxConfigurationPerCountry ) | ( Transaction ) | ( TransactionEvent ) | ( TransactionItem ) | ( User ) | ( Value ) | ( ValueTranslation ) | ( Voucher ) | ( VoucherChannelListing ) | ( VoucherTranslation ) | ( Warehouse ) | ( Webhook );
  ObjectWithMetadata: ( AbstractProduct ) | ( App ) | ( Attribute ) | ( Category ) | ( Omit<Checkout, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } ) | ( CheckoutLine ) | ( Collection ) | ( ConcreteProduct ) | ( DigitalContent ) | ( Fulfillment ) | ( GiftCard ) | ( Invoice ) | ( MediaItem ) | ( Menu ) | ( MenuItem ) | ( Omit<Order, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } ) | ( OrderLine ) | ( Page ) | ( PageKlass ) | ( Payment ) | ( ProductKlass ) | ( Sale ) | ( ShippingMethod ) | ( ShippingZone ) | ( TaxClass ) | ( TaxConfiguration ) | ( TransactionItem ) | ( User ) | ( Voucher ) | ( Warehouse );
  OrderBase: ( Omit<CreateOrderd, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<DraftOrderCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<DraftOrderDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<DraftOrderUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderCancelled, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderConfirmed, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderFilterShippingMethods, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderFulfilled, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderFullyPaid, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<OrderUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  PageBase: ( Omit<PageCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  PageKlassBase: ( Omit<PageKlassCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageKlassDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PageKlassUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  PaymentBase: ( Omit<PaymentAuthorize, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentCaptureEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentConfirmEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentProcessEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentRefundEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<PaymentVoidEvent, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  Product: ( AbstractProduct ) | ( ConcreteProduct );
  ProductBase: ( Omit<ProductBackInStock, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductOutOfStock, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ProductUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  SaleBase: ( Omit<SaleCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<SaleDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<SaleToggle, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<SaleUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  ShippingPriceBase: ( Omit<ShippingPriceCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingPriceDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingPriceUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  ShippingZoneBase: ( Omit<ShippingZoneCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingZoneDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingZoneMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ShippingZoneUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  TempoNode: ( AbstractProduct ) | ( AccountEvent ) | ( Address ) | ( Allocation ) | ( App ) | ( AppExtension ) | ( AppInstallation ) | ( AsyncWebhookEvent ) | ( Attribute ) | ( AttributeTranslation ) | ( Category ) | ( CategoryTranslation ) | ( Channel ) | ( Omit<Checkout, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } ) | ( CheckoutLine ) | ( Collection ) | ( CollectionChannelListing ) | ( CollectionTranslation ) | ( ConcreteProduct ) | ( DigitalContent ) | ( DigitalContentUrl ) | ( EventDelivery ) | ( ExportEvent ) | ( ExportFile ) | ( Fulfillment ) | ( FulfillmentLine ) | ( GiftCard ) | ( GiftCardEvent ) | ( GiftCardTag ) | ( Group ) | ( Invoice ) | ( MediaItem ) | ( Menu ) | ( MenuItem ) | ( MenuItemTranslation ) | ( Omit<Order, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<RefType['FulfillmentMethod']> } ) | ( OrderDiscount ) | ( OrderEvent ) | ( OrderLine ) | ( Page ) | ( PageKlass ) | ( PageTranslation ) | ( Payment ) | ( PointOfContact ) | ( ProductChannelListing ) | ( ProductImage ) | ( ProductKlass ) | ( ProductMediaItem ) | ( ProductTranslation ) | ( Sale ) | ( SaleChannelListing ) | ( SaleTranslation ) | ( ShippingMethod ) | ( ShippingMethodChannelListing ) | ( ShippingMethodPostalCodeRule ) | ( ShippingMethodTranslation ) | ( ShippingZone ) | ( Site ) | ( SiteTranslation ) | ( StaffNotificationRecipient ) | ( Stock ) | ( SyncWebhookEvent ) | ( TaxClass ) | ( TaxConfiguration ) | ( TaxConfigurationPerCountry ) | ( Transaction ) | ( TransactionEvent ) | ( TransactionItem ) | ( User ) | ( Value ) | ( ValueTranslation ) | ( Voucher ) | ( VoucherChannelListing ) | ( VoucherTranslation ) | ( Warehouse ) | ( Webhook );
  TranslationBase: ( Omit<TranslationCreated, 'issuingPrincipal' | 'translation'> & { issuingPrincipal: RefType['AppUser'], translation: RefType['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] } ) | ( Omit<TranslationUpdated, 'issuingPrincipal' | 'translation'> & { issuingPrincipal: RefType['AppUser'], translation: RefType['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] } );
  UserBase: ( Omit<CustomerCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CustomerMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<CustomerUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<StaffCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<StaffDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<StaffUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  ValueBase: ( Omit<ValueCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ValueDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<ValueUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  VoucherBase: ( Omit<VoucherCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<VoucherDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<VoucherMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<VoucherUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
  WarehouseBase: ( Omit<WarehouseCreated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<WarehouseDeleted, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<WarehouseMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } ) | ( Omit<WarehouseUpdated, 'issuingPrincipal'> & { issuingPrincipal: RefType['AppUser'] } );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AbstractOrder: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AbstractOrder']>;
  AbstractProduct: ResolverTypeWrapper<AbstractProduct>;
  AccountError: ResolverTypeWrapper<AccountError>;
  AccountErrorCode: AccountErrorCode;
  AccountEvent: ResolverTypeWrapper<AccountEvent>;
  AccountEventType: AccountEventType;
  Address: ResolverTypeWrapper<Address>;
  AddressBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AddressBase']>;
  AddressCreated: ResolverTypeWrapper<Omit<AddressCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AddressDeleted: ResolverTypeWrapper<Omit<AddressDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AddressEvent: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AddressEvent']>;
  AddressMutationResult: ResolverTypeWrapper<AddressMutationResult>;
  AddressType: AddressType;
  AddressUpdateInput: AddressUpdateInput;
  AddressUpdated: ResolverTypeWrapper<Omit<AddressUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AddressValidationData: ResolverTypeWrapper<AddressValidationData>;
  Allocation: ResolverTypeWrapper<Allocation>;
  AllocationStrategy: AllocationStrategy;
  App: ResolverTypeWrapper<App>;
  AppBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AppBase']>;
  AppConnection: ResolverTypeWrapper<AppConnection>;
  AppDeleted: ResolverTypeWrapper<Omit<AppDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AppEdge: ResolverTypeWrapper<AppEdge>;
  AppError: ResolverTypeWrapper<AppError>;
  AppErrorCode: AppErrorCode;
  AppExtension: ResolverTypeWrapper<AppExtension>;
  AppExtensionConnection: ResolverTypeWrapper<AppExtensionConnection>;
  AppExtensionEdge: ResolverTypeWrapper<AppExtensionEdge>;
  AppExtensionFilter: AppExtensionFilter;
  AppExtensionMount: AppExtensionMount;
  AppExtensionTarget: AppExtensionTarget;
  AppFilter: AppFilter;
  AppInput: AppInput;
  AppInstallInput: AppInstallInput;
  AppInstallation: ResolverTypeWrapper<AppInstallation>;
  AppInstallationMutationResult: ResolverTypeWrapper<AppInstallationMutationResult>;
  AppInstalled: ResolverTypeWrapper<Omit<AppInstalled, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AppManifestExtension: ResolverTypeWrapper<AppManifestExtension>;
  AppManifestWebhook: ResolverTypeWrapper<AppManifestWebhook>;
  AppMutationResult: ResolverTypeWrapper<AppMutationResult>;
  AppOrdering: AppOrdering;
  AppStatusChanged: ResolverTypeWrapper<Omit<AppStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AppToken: ResolverTypeWrapper<AppToken>;
  AppTokenInput: AppTokenInput;
  AppTokenMutationResult: ResolverTypeWrapper<AppTokenMutationResult>;
  AppType: AppType;
  AppUpdated: ResolverTypeWrapper<Omit<AppUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AppUser: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AppUser']>;
  AreaUnit: AreaUnit;
  AsyncWebhookEvent: ResolverTypeWrapper<AsyncWebhookEvent>;
  AsyncWebhookEventType: AsyncWebhookEventType;
  Attribute: ResolverTypeWrapper<Attribute>;
  AttributeBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['AttributeBase']>;
  AttributeChoicesOrdering: AttributeChoicesOrdering;
  AttributeChoicesOrderingInput: AttributeChoicesOrderingInput;
  AttributeConnection: ResolverTypeWrapper<AttributeConnection>;
  AttributeCreated: ResolverTypeWrapper<Omit<AttributeCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AttributeCreationInput: AttributeCreationInput;
  AttributeDeleted: ResolverTypeWrapper<Omit<AttributeDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AttributeEdge: ResolverTypeWrapper<AttributeEdge>;
  AttributeEntityType: AttributeEntityType;
  AttributeErrorCode: AttributeErrorCode;
  AttributeFilter: AttributeFilter;
  AttributeInput: AttributeInput;
  AttributeInputType: AttributeInputType;
  AttributeMutationResult: ResolverTypeWrapper<AttributeMutationResult>;
  AttributeNodeConnection: ResolverTypeWrapper<AttributeNodeConnection>;
  AttributeNodeEdge: ResolverTypeWrapper<AttributeNodeEdge>;
  AttributeOrdering: AttributeOrdering;
  AttributeOrderingInput: AttributeOrderingInput;
  AttributeTranslation: ResolverTypeWrapper<AttributeTranslation>;
  AttributeType: AttributeType;
  AttributeUpdateInput: AttributeUpdateInput;
  AttributeUpdated: ResolverTypeWrapper<Omit<AttributeUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  AuthInput: AuthInput;
  AuthPluginInput: AuthPluginInput;
  AuthPluginMutationResult: ResolverTypeWrapper<AuthPluginMutationResult>;
  BaseMutationResult: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseMutationResult']>;
  BasePricingInfo: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BasePricingInfo']>;
  BaseTranslation: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['BaseTranslation']>;
  BoolMutationResult: ResolverTypeWrapper<BoolMutationResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BulkProductError: ResolverTypeWrapper<BulkProductError>;
  BulkStockError: ResolverTypeWrapper<BulkStockError>;
  BulkValueInput: BulkValueInput;
  CalculateTaxes: ResolverTypeWrapper<Omit<CalculateTaxes, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CardInput: CardInput;
  CatalogueInput: CatalogueInput;
  Category: ResolverTypeWrapper<Category>;
  CategoryBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CategoryBase']>;
  CategoryConnection: ResolverTypeWrapper<CategoryConnection>;
  CategoryCreated: ResolverTypeWrapper<Omit<CategoryCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CategoryDeleted: ResolverTypeWrapper<Omit<CategoryDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CategoryEdge: ResolverTypeWrapper<CategoryEdge>;
  CategoryFilter: CategoryFilter;
  CategoryInput: CategoryInput;
  CategoryMutationResult: ResolverTypeWrapper<CategoryMutationResult>;
  CategoryNodeConnection: ResolverTypeWrapper<CategoryNodeConnection>;
  CategoryNodeEdge: ResolverTypeWrapper<CategoryNodeEdge>;
  CategoryOrdering: CategoryOrdering;
  CategoryOrderingInput: CategoryOrderingInput;
  CategoryTranslation: ResolverTypeWrapper<CategoryTranslation>;
  CategoryUpdated: ResolverTypeWrapper<Omit<CategoryUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ChannelBase']>;
  ChannelCreated: ResolverTypeWrapper<Omit<ChannelCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ChannelCreationInput: ChannelCreationInput;
  ChannelDeleteInput: ChannelDeleteInput;
  ChannelDeleted: ResolverTypeWrapper<Omit<ChannelDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ChannelError: ResolverTypeWrapper<ChannelError>;
  ChannelErrorCode: ChannelErrorCode;
  ChannelMutationResult: ResolverTypeWrapper<ChannelMutationResult>;
  ChannelReorderWarehousesMutationResult: ResolverTypeWrapper<ChannelReorderWarehousesMutationResult>;
  ChannelStatusChanged: ResolverTypeWrapper<Omit<ChannelStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ChannelUpdateInput: ChannelUpdateInput;
  ChannelUpdated: ResolverTypeWrapper<Omit<ChannelUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ChargeStatus: ChargeStatus;
  Checkout: ResolverTypeWrapper<Omit<Checkout, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<ResolversTypes['FulfillmentMethod']> }>;
  CheckoutAddressValidationRules: CheckoutAddressValidationRules;
  CheckoutBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CheckoutBase']>;
  CheckoutCompleteMutationResult: ResolverTypeWrapper<CheckoutCompleteMutationResult>;
  CheckoutConnection: ResolverTypeWrapper<CheckoutConnection>;
  CheckoutContactInfoUpdateInput: CheckoutContactInfoUpdateInput;
  CheckoutCreated: ResolverTypeWrapper<Omit<CheckoutCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CheckoutCreationInput: CheckoutCreationInput;
  CheckoutEdge: ResolverTypeWrapper<CheckoutEdge>;
  CheckoutError: ResolverTypeWrapper<CheckoutError>;
  CheckoutErrorCode: CheckoutErrorCode;
  CheckoutFilter: CheckoutFilter;
  CheckoutFilterShippingMethods: ResolverTypeWrapper<Omit<CheckoutFilterShippingMethods, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CheckoutLine: ResolverTypeWrapper<CheckoutLine>;
  CheckoutLineConnection: ResolverTypeWrapper<CheckoutLineConnection>;
  CheckoutLineEdge: ResolverTypeWrapper<CheckoutLineEdge>;
  CheckoutLineInput: CheckoutLineInput;
  CheckoutLineUpdateInput: CheckoutLineUpdateInput;
  CheckoutMetadataUpdated: ResolverTypeWrapper<Omit<CheckoutMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CheckoutMutationResult: ResolverTypeWrapper<CheckoutMutationResult>;
  CheckoutNodeConnection: ResolverTypeWrapper<CheckoutNodeConnection>;
  CheckoutNodeEdge: ResolverTypeWrapper<CheckoutNodeEdge>;
  CheckoutOptionalMutationResult: ResolverTypeWrapper<CheckoutOptionalMutationResult>;
  CheckoutOrdering: CheckoutOrdering;
  CheckoutOrderingInput: CheckoutOrderingInput;
  CheckoutPaymentMutationResult: ResolverTypeWrapper<CheckoutPaymentMutationResult>;
  CheckoutPointOfContactInput: CheckoutPointOfContactInput;
  CheckoutUpdated: ResolverTypeWrapper<Omit<CheckoutUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CheckoutValidationRules: CheckoutValidationRules;
  ChoiceValue: ResolverTypeWrapper<ChoiceValue>;
  Collection: ResolverTypeWrapper<Collection>;
  CollectionBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['CollectionBase']>;
  CollectionChannelListing: ResolverTypeWrapper<CollectionChannelListing>;
  CollectionChannelListingError: ResolverTypeWrapper<CollectionChannelListingError>;
  CollectionChannelListingMutationResult: ResolverTypeWrapper<CollectionChannelListingMutationResult>;
  CollectionChannelListingUpdateInput: CollectionChannelListingUpdateInput;
  CollectionConnection: ResolverTypeWrapper<CollectionConnection>;
  CollectionCreated: ResolverTypeWrapper<Omit<CollectionCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CollectionCreationInput: CollectionCreationInput;
  CollectionDeleted: ResolverTypeWrapper<Omit<CollectionDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CollectionEdge: ResolverTypeWrapper<CollectionEdge>;
  CollectionErrorCode: CollectionErrorCode;
  CollectionFilter: CollectionFilter;
  CollectionInput: CollectionInput;
  CollectionMetadataUpdated: ResolverTypeWrapper<Omit<CollectionMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CollectionMutationResult: ResolverTypeWrapper<CollectionMutationResult>;
  CollectionOrdering: CollectionOrdering;
  CollectionOrderingInput: CollectionOrderingInput;
  CollectionPublished: CollectionPublished;
  CollectionTranslation: ResolverTypeWrapper<CollectionTranslation>;
  CollectionUpdated: ResolverTypeWrapper<Omit<CollectionUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ConcreteProduct: ResolverTypeWrapper<ConcreteProduct>;
  ConfigurationItem: ResolverTypeWrapper<ConfigurationItem>;
  ConfigurationItemInput: ConfigurationItemInput;
  ConfigurationTypeField: ConfigurationTypeField;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  Country: ResolverTypeWrapper<Country>;
  CountryCode: CountryCode;
  CountryFilter: CountryFilter;
  CountryRateInput: CountryRateInput;
  CountryRateUpdateInput: CountryRateUpdateInput;
  CreateOrderd: ResolverTypeWrapper<Omit<CreateOrderd, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CreditCard: ResolverTypeWrapper<CreditCard>;
  Currency: Currency;
  CustomerCreated: ResolverTypeWrapper<Omit<CustomerCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CustomerFilter: CustomerFilter;
  CustomerMetadataUpdated: ResolverTypeWrapper<Omit<CustomerMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  CustomerUpdated: ResolverTypeWrapper<Omit<CustomerUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateRangeInput: DateRangeInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DateTimeRangeInput: DateTimeRangeInput;
  DigitalContent: ResolverTypeWrapper<DigitalContent>;
  DigitalContentConnection: ResolverTypeWrapper<DigitalContentConnection>;
  DigitalContentEdge: ResolverTypeWrapper<DigitalContentEdge>;
  DigitalContentInput: DigitalContentInput;
  DigitalContentMutationResult: ResolverTypeWrapper<DigitalContentMutationResult>;
  DigitalContentUploadInput: DigitalContentUploadInput;
  DigitalContentUrl: ResolverTypeWrapper<DigitalContentUrl>;
  DigitalContentUrlCreationInput: DigitalContentUrlCreationInput;
  DiscountError: ResolverTypeWrapper<DiscountError>;
  DiscountErrorCode: DiscountErrorCode;
  DiscountStatus: DiscountStatus;
  DiscountValueType: DiscountValueType;
  DistanceUnit: DistanceUnit;
  DraftOrderCreated: ResolverTypeWrapper<Omit<DraftOrderCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  DraftOrderCreationInput: DraftOrderCreationInput;
  DraftOrderDeleted: ResolverTypeWrapper<Omit<DraftOrderDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  DraftOrderInput: DraftOrderInput;
  DraftOrderUpdated: ResolverTypeWrapper<Omit<DraftOrderUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  Error: ResolverTypeWrapper<Error>;
  ErrorInterface: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ErrorInterface']>;
  Event: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Event']>;
  EventDelivery: ResolverTypeWrapper<EventDelivery>;
  EventDeliveryConnection: ResolverTypeWrapper<EventDeliveryConnection>;
  EventDeliveryEdge: ResolverTypeWrapper<EventDeliveryEdge>;
  EventDeliveryFilter: EventDeliveryFilter;
  EventDeliveryMutationResult: ResolverTypeWrapper<EventDeliveryMutationResult>;
  EventDeliveryOrdering: EventDeliveryOrdering;
  EventDeliveryOrderingInput: EventDeliveryOrderingInput;
  EventDeliveryStatus: EventDeliveryStatus;
  ExportErrorCode: ExportErrorCode;
  ExportEvent: ResolverTypeWrapper<ExportEvent>;
  ExportEventType: ExportEventType;
  ExportFile: ResolverTypeWrapper<ExportFile>;
  ExportFileConnection: ResolverTypeWrapper<ExportFileConnection>;
  ExportFileEdge: ResolverTypeWrapper<ExportFileEdge>;
  ExportFileFilter: ExportFileFilter;
  ExportFileMutationResult: ResolverTypeWrapper<ExportFileMutationResult>;
  ExportFileOrdering: ExportFileOrdering;
  ExportFileOrderingInput: ExportFileOrderingInput;
  ExportGiftCardsInput: ExportGiftCardsInput;
  ExportInfoInput: ExportInfoInput;
  ExportProductsInput: ExportProductsInput;
  ExportScope: ExportScope;
  ExternalAuthentication: ResolverTypeWrapper<ExternalAuthentication>;
  ExternalNotificationTriggerInput: ExternalNotificationTriggerInput;
  ExternalNotificationTriggerMutationResult: ResolverTypeWrapper<ExternalNotificationTriggerMutationResult>;
  File: ResolverTypeWrapper<File>;
  FileMutationResult: ResolverTypeWrapper<FileMutationResult>;
  FileType: FileType;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Fulfillment: ResolverTypeWrapper<Fulfillment>;
  FulfillmentApproved: ResolverTypeWrapper<Omit<FulfillmentApproved, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  FulfillmentBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['FulfillmentBase']>;
  FulfillmentCancelInput: FulfillmentCancelInput;
  FulfillmentCanceled: ResolverTypeWrapper<Omit<FulfillmentCanceled, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  FulfillmentCreated: ResolverTypeWrapper<Omit<FulfillmentCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  FulfillmentLine: ResolverTypeWrapper<FulfillmentLine>;
  FulfillmentMetadataUpdated: ResolverTypeWrapper<Omit<FulfillmentMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  FulfillmentMethod: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['FulfillmentMethod']>;
  FulfillmentMethodType: FulfillmentMethodType;
  FulfillmentStatus: FulfillmentStatus;
  FulfillmentUpdateTrackingInput: FulfillmentUpdateTrackingInput;
  GatewayConfigLine: ResolverTypeWrapper<GatewayConfigLine>;
  GiftCard: ResolverTypeWrapper<GiftCard>;
  GiftCardAddNoteInput: GiftCardAddNoteInput;
  GiftCardBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GiftCardBase']>;
  GiftCardBulkCreationInput: GiftCardBulkCreationInput;
  GiftCardBulkMutationResult: ResolverTypeWrapper<GiftCardBulkMutationResult>;
  GiftCardConnection: ResolverTypeWrapper<GiftCardConnection>;
  GiftCardCreated: ResolverTypeWrapper<Omit<GiftCardCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  GiftCardCreationInput: GiftCardCreationInput;
  GiftCardDeleted: ResolverTypeWrapper<Omit<GiftCardDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  GiftCardEdge: ResolverTypeWrapper<GiftCardEdge>;
  GiftCardError: ResolverTypeWrapper<GiftCardError>;
  GiftCardErrorCode: GiftCardErrorCode;
  GiftCardEvent: ResolverTypeWrapper<GiftCardEvent>;
  GiftCardEventBalance: ResolverTypeWrapper<GiftCardEventBalance>;
  GiftCardEventFilter: GiftCardEventFilter;
  GiftCardEventType: GiftCardEventType;
  GiftCardFilter: GiftCardFilter;
  GiftCardMetadataUpdated: ResolverTypeWrapper<Omit<GiftCardMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  GiftCardMutationResult: ResolverTypeWrapper<GiftCardMutationResult>;
  GiftCardNodeConnection: ResolverTypeWrapper<GiftCardNodeConnection>;
  GiftCardNodeEdge: ResolverTypeWrapper<GiftCardNodeEdge>;
  GiftCardOrdering: GiftCardOrdering;
  GiftCardOrderingInput: GiftCardOrderingInput;
  GiftCardResendInput: GiftCardResendInput;
  GiftCardSettings: ResolverTypeWrapper<GiftCardSettings>;
  GiftCardSettingsErrorCode: GiftCardSettingsErrorCode;
  GiftCardSettingsExpiryType: GiftCardSettingsExpiryType;
  GiftCardSettingsMutationResult: ResolverTypeWrapper<GiftCardSettingsMutationResult>;
  GiftCardSettingsUpdateInput: GiftCardSettingsUpdateInput;
  GiftCardStatusChanged: ResolverTypeWrapper<Omit<GiftCardStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  GiftCardTag: ResolverTypeWrapper<GiftCardTag>;
  GiftCardTagConnection: ResolverTypeWrapper<GiftCardTagConnection>;
  GiftCardTagEdge: ResolverTypeWrapper<GiftCardTagEdge>;
  GiftCardTagFilter: GiftCardTagFilter;
  GiftCardUpdateInput: GiftCardUpdateInput;
  GiftCardUpdated: ResolverTypeWrapper<Omit<GiftCardUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  Giftcardmutationresult: ResolverTypeWrapper<Giftcardmutationresult>;
  GlobalID: ResolverTypeWrapper<Scalars['GlobalID']['output']>;
  GoogleAddressBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GoogleAddressBase']>;
  Group: ResolverTypeWrapper<Group>;
  GroupBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['GroupBase']>;
  GroupConnection: ResolverTypeWrapper<GroupConnection>;
  GroupCreated: ResolverTypeWrapper<Omit<GroupCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  GroupCreationInput: GroupCreationInput;
  GroupDeleted: ResolverTypeWrapper<Omit<GroupDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  GroupEdge: ResolverTypeWrapper<GroupEdge>;
  GroupError: ResolverTypeWrapper<GroupError>;
  GroupErrorCode: GroupErrorCode;
  GroupFilter: GroupFilter;
  GroupMutationResult: ResolverTypeWrapper<GroupMutationResult>;
  GroupOrdering: GroupOrdering;
  GroupOrderingInput: GroupOrderingInput;
  GroupUpdateInput: GroupUpdateInput;
  GroupUpdated: ResolverTypeWrapper<Omit<GroupUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IDListMutationResult: ResolverTypeWrapper<IdListMutationResult>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IntRangeInput: IntRangeInput;
  Invoice: ResolverTypeWrapper<Invoice>;
  InvoiceBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['InvoiceBase']>;
  InvoiceCreationInput: InvoiceCreationInput;
  InvoiceDeleted: ResolverTypeWrapper<Omit<InvoiceDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  InvoiceErrorCode: InvoiceErrorCode;
  InvoiceMutationResult: ResolverTypeWrapper<InvoiceMutationResult>;
  InvoiceRequested: ResolverTypeWrapper<Omit<InvoiceRequested, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  InvoiceSent: ResolverTypeWrapper<Omit<InvoiceSent, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  JSONString: ResolverTypeWrapper<Scalars['JSONString']['output']>;
  JWT: ResolverTypeWrapper<Jwt>;
  JWTMutationResult: ResolverTypeWrapper<JwtMutationResult>;
  Job: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Job']>;
  JobStatus: JobStatus;
  LanguageCode: LanguageCode;
  LanguageDisplay: ResolverTypeWrapper<LanguageDisplay>;
  LimitInfo: ResolverTypeWrapper<LimitInfo>;
  Limits: ResolverTypeWrapper<Limits>;
  Manifest: ResolverTypeWrapper<Manifest>;
  ManifestMutationResult: ResolverTypeWrapper<ManifestMutationResult>;
  MeasurementUnit: MeasurementUnit;
  MediaBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MediaBase']>;
  MediaCreated: ResolverTypeWrapper<Omit<MediaCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  MediaCreationInput: MediaCreationInput;
  MediaDeleted: ResolverTypeWrapper<Omit<MediaDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  MediaError: ResolverTypeWrapper<MediaError>;
  MediaErrorCode: MediaErrorCode;
  MediaFilter: MediaFilter;
  MediaInput: MediaInput;
  MediaItem: ResolverTypeWrapper<MediaItem>;
  MediaItemConnection: ResolverTypeWrapper<MediaItemConnection>;
  MediaItemEdge: ResolverTypeWrapper<MediaItemEdge>;
  MediaItemMutationResult: ResolverTypeWrapper<MediaItemMutationResult>;
  MediaOrdering: MediaOrdering;
  MediaOrderingInput: MediaOrderingInput;
  MediaType: MediaType;
  MediaUpdated: ResolverTypeWrapper<Omit<MediaUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  Menu: ResolverTypeWrapper<Menu>;
  MenuBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MenuBase']>;
  MenuConnection: ResolverTypeWrapper<MenuConnection>;
  MenuCreated: ResolverTypeWrapper<Omit<MenuCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  MenuCreationInput: MenuCreationInput;
  MenuDeleted: ResolverTypeWrapper<Omit<MenuDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  MenuEdge: ResolverTypeWrapper<MenuEdge>;
  MenuErrorCode: MenuErrorCode;
  MenuInput: MenuInput;
  MenuItem: ResolverTypeWrapper<MenuItem>;
  MenuItemBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MenuItemBase']>;
  MenuItemConnection: ResolverTypeWrapper<MenuItemConnection>;
  MenuItemCreated: ResolverTypeWrapper<Omit<MenuItemCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  MenuItemCreationInput: MenuItemCreationInput;
  MenuItemDeleted: ResolverTypeWrapper<Omit<MenuItemDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  MenuItemEdge: ResolverTypeWrapper<MenuItemEdge>;
  MenuItemFilter: MenuItemFilter;
  MenuItemInput: MenuItemInput;
  MenuItemMoveInput: MenuItemMoveInput;
  MenuItemMutationResult: ResolverTypeWrapper<MenuItemMutationResult>;
  MenuItemOrdering: MenuItemOrdering;
  MenuItemOrderingInput: MenuItemOrderingInput;
  MenuItemTranslation: ResolverTypeWrapper<MenuItemTranslation>;
  MenuItemUpdated: ResolverTypeWrapper<Omit<MenuItemUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  MenuMutationResult: ResolverTypeWrapper<MenuMutationResult>;
  MenuOrdering: MenuOrdering;
  MenuOrderingInput: MenuOrderingInput;
  MenuUpdated: ResolverTypeWrapper<Omit<MenuUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
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
  ObjectWithMetadataMutationResult: ResolverTypeWrapper<ObjectWithMetadataMutationResult>;
  Order: ResolverTypeWrapper<Omit<Order, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<ResolversTypes['FulfillmentMethod']> }>;
  OrderAction: OrderAction;
  OrderAddNoteInput: OrderAddNoteInput;
  OrderAuthorizeStatus: OrderAuthorizeStatus;
  OrderBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['OrderBase']>;
  OrderBulkMutationResult: ResolverTypeWrapper<OrderBulkMutationResult>;
  OrderCancelled: ResolverTypeWrapper<Omit<OrderCancelled, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  OrderChargeStatus: OrderChargeStatus;
  OrderConfirmed: ResolverTypeWrapper<Omit<OrderConfirmed, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  OrderConnection: ResolverTypeWrapper<OrderConnection>;
  OrderDiscount: ResolverTypeWrapper<OrderDiscount>;
  OrderDiscountCommonInput: OrderDiscountCommonInput;
  OrderDiscountType: OrderDiscountType;
  OrderDraftFilter: OrderDraftFilter;
  OrderEdge: ResolverTypeWrapper<OrderEdge>;
  OrderError: ResolverTypeWrapper<OrderError>;
  OrderErrorCode: OrderErrorCode;
  OrderEvent: ResolverTypeWrapper<OrderEvent>;
  OrderEventConnection: ResolverTypeWrapper<OrderEventConnection>;
  OrderEventEdge: ResolverTypeWrapper<OrderEventEdge>;
  OrderEventEmailType: OrderEventEmailType;
  OrderEventOrderLineObject: ResolverTypeWrapper<OrderEventOrderLineObject>;
  OrderEventType: OrderEventType;
  OrderFilter: OrderFilter;
  OrderFilterShippingMethods: ResolverTypeWrapper<Omit<OrderFilterShippingMethods, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  OrderFulfillInput: OrderFulfillInput;
  OrderFulfillStockInput: OrderFulfillStockInput;
  OrderFulfilled: ResolverTypeWrapper<Omit<OrderFulfilled, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  OrderFulfillment: ResolverTypeWrapper<OrderFulfillment>;
  OrderFulfillmentLineInput: OrderFulfillmentLineInput;
  OrderFulfillmentMutationResult: ResolverTypeWrapper<OrderFulfillmentMutationResult>;
  OrderFullyPaid: ResolverTypeWrapper<Omit<OrderFullyPaid, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  OrderInvoiceMutationResult: ResolverTypeWrapper<OrderInvoiceMutationResult>;
  OrderLine: ResolverTypeWrapper<OrderLine>;
  OrderLineCreationInput: OrderLineCreationInput;
  OrderLineInput: OrderLineInput;
  OrderLineMutationResult: ResolverTypeWrapper<OrderLineMutationResult>;
  OrderLinesMutationResult: ResolverTypeWrapper<OrderLinesMutationResult>;
  OrderMetadataUpdated: ResolverTypeWrapper<Omit<OrderMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  OrderMutationResult: ResolverTypeWrapper<OrderMutationResult>;
  OrderNodeConnection: ResolverTypeWrapper<OrderNodeConnection>;
  OrderNodeEdge: ResolverTypeWrapper<OrderNodeEdge>;
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
  OrderSettingsMutationResult: ResolverTypeWrapper<OrderSettingsMutationResult>;
  OrderSettingsUpdateInput: OrderSettingsUpdateInput;
  OrderStatus: OrderStatus;
  OrderStatusFilter: OrderStatusFilter;
  OrderUpdateInput: OrderUpdateInput;
  OrderUpdateShippingInput: OrderUpdateShippingInput;
  OrderUpdated: ResolverTypeWrapper<Omit<OrderUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  OrderingDirection: OrderingDirection;
  Ordermutationresult: ResolverTypeWrapper<Ordermutationresult>;
  Page: ResolverTypeWrapper<Page>;
  PageBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PageBase']>;
  PageBulkMutationResult: ResolverTypeWrapper<PageBulkMutationResult>;
  PageConnection: ResolverTypeWrapper<PageConnection>;
  PageCreated: ResolverTypeWrapper<Omit<PageCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PageCreationInput: PageCreationInput;
  PageDeleted: ResolverTypeWrapper<Omit<PageDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PageEdge: ResolverTypeWrapper<PageEdge>;
  PageError: ResolverTypeWrapper<PageError>;
  PageErrorCode: PageErrorCode;
  PageFilter: PageFilter;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PageInput: PageInput;
  PageKlass: ResolverTypeWrapper<PageKlass>;
  PageKlassBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PageKlassBase']>;
  PageKlassConnection: ResolverTypeWrapper<PageKlassConnection>;
  PageKlassCreated: ResolverTypeWrapper<Omit<PageKlassCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PageKlassCreationInput: PageKlassCreationInput;
  PageKlassDeleted: ResolverTypeWrapper<Omit<PageKlassDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PageKlassEdge: ResolverTypeWrapper<PageKlassEdge>;
  PageKlassFilter: PageKlassFilter;
  PageKlassMutationResult: ResolverTypeWrapper<PageKlassMutationResult>;
  PageKlassOrdering: PageKlassOrdering;
  PageKlassOrderingInput: PageKlassOrderingInput;
  PageKlassUpdateInput: PageKlassUpdateInput;
  PageKlassUpdated: ResolverTypeWrapper<Omit<PageKlassUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PageMutationResult: ResolverTypeWrapper<PageMutationResult>;
  PageOrdering: PageOrdering;
  PageOrderingInput: PageOrderingInput;
  PageTranslation: ResolverTypeWrapper<PageTranslation>;
  PageTranslationInput: PageTranslationInput;
  PageUpdated: ResolverTypeWrapper<Omit<PageUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  Payment: ResolverTypeWrapper<Payment>;
  PaymentAuthorize: ResolverTypeWrapper<Omit<PaymentAuthorize, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PaymentBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PaymentBase']>;
  PaymentCaptureEvent: ResolverTypeWrapper<Omit<PaymentCaptureEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PaymentCheckBalanceInput: PaymentCheckBalanceInput;
  PaymentCheckBalanceMutationResult: ResolverTypeWrapper<PaymentCheckBalanceMutationResult>;
  PaymentConfirmEvent: ResolverTypeWrapper<Omit<PaymentConfirmEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PaymentConnection: ResolverTypeWrapper<PaymentConnection>;
  PaymentEdge: ResolverTypeWrapper<PaymentEdge>;
  PaymentError: ResolverTypeWrapper<PaymentError>;
  PaymentErrorCode: PaymentErrorCode;
  PaymentFilter: PaymentFilter;
  PaymentGateway: ResolverTypeWrapper<PaymentGateway>;
  PaymentInitializeMutationResult: ResolverTypeWrapper<PaymentInitializeMutationResult>;
  PaymentInitialized: ResolverTypeWrapper<PaymentInitialized>;
  PaymentInput: PaymentInput;
  PaymentListGateways: ResolverTypeWrapper<Omit<PaymentListGateways, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PaymentMutationResult: ResolverTypeWrapper<PaymentMutationResult>;
  PaymentProcessEvent: ResolverTypeWrapper<Omit<PaymentProcessEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PaymentRefundEvent: ResolverTypeWrapper<Omit<PaymentRefundEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PaymentSource: ResolverTypeWrapper<PaymentSource>;
  PaymentVoidEvent: ResolverTypeWrapper<Omit<PaymentVoidEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  PermDefinition: PermDefinition;
  Permission: ResolverTypeWrapper<Permission>;
  PermissionCode: PermissionCode;
  Plugin: ResolverTypeWrapper<Plugin>;
  PluginConfiguration: ResolverTypeWrapper<PluginConfiguration>;
  PluginConfigurationType: PluginConfigurationType;
  PluginConnection: ResolverTypeWrapper<PluginConnection>;
  PluginEdge: ResolverTypeWrapper<PluginEdge>;
  PluginFilter: PluginFilter;
  PluginMutationResult: ResolverTypeWrapper<PluginMutationResult>;
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
  ProductAttributeAssignment: ResolverTypeWrapper<ProductAttributeAssignment>;
  ProductAttributeAssignmentMutationResult: ResolverTypeWrapper<ProductAttributeAssignmentMutationResult>;
  ProductAttributeAssignmentUpdateInput: ProductAttributeAssignmentUpdateInput;
  ProductAttributeScope: ProductAttributeScope;
  ProductAttributeType: ProductAttributeType;
  ProductBackInStock: ResolverTypeWrapper<Omit<ProductBackInStock, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ProductBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ProductBase']>;
  ProductBulkCreationInput: ProductBulkCreationInput;
  ProductBulkMutationResult: ResolverTypeWrapper<ProductBulkMutationResult>;
  ProductChannelListing: ResolverTypeWrapper<ProductChannelListing>;
  ProductChannelListingAddInput: ProductChannelListingAddInput;
  ProductChannelListingError: ResolverTypeWrapper<ProductChannelListingError>;
  ProductConnection: ResolverTypeWrapper<ProductConnection>;
  ProductCreated: ResolverTypeWrapper<Omit<ProductCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ProductCreationInput: ProductCreationInput;
  ProductDeleted: ResolverTypeWrapper<Omit<ProductDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ProductEdge: ResolverTypeWrapper<ProductEdge>;
  ProductError: ResolverTypeWrapper<ProductError>;
  ProductErrorCode: ProductErrorCode;
  ProductField: ProductField;
  ProductFilter: ProductFilter;
  ProductImage: ResolverTypeWrapper<ProductImage>;
  ProductInput: ProductInput;
  ProductKlass: ResolverTypeWrapper<ProductKlass>;
  ProductKlassConfigurable: ProductKlassConfigurable;
  ProductKlassConnection: ResolverTypeWrapper<ProductKlassConnection>;
  ProductKlassEdge: ResolverTypeWrapper<ProductKlassEdge>;
  ProductKlassFilter: ProductKlassFilter;
  ProductKlassInput: ProductKlassInput;
  ProductKlassKind: ProductKlassKind;
  ProductKlassMutationResult: ResolverTypeWrapper<ProductKlassMutationResult>;
  ProductKlassNodeConnection: ResolverTypeWrapper<ProductKlassNodeConnection>;
  ProductKlassNodeEdge: ResolverTypeWrapper<ProductKlassNodeEdge>;
  ProductKlassOrdering: ProductKlassOrdering;
  ProductKlassOrderingInput: ProductKlassOrderingInput;
  ProductMediaAssignmentMutationResult: ResolverTypeWrapper<ProductMediaAssignmentMutationResult>;
  ProductMediaCreationInput: ProductMediaCreationInput;
  ProductMediaItem: ResolverTypeWrapper<ProductMediaItem>;
  ProductMediaMutationResult: ResolverTypeWrapper<ProductMediaMutationResult>;
  ProductMediaUnassignmentMutationResult: ResolverTypeWrapper<ProductMediaUnassignmentMutationResult>;
  ProductMediaUpdateInput: ProductMediaUpdateInput;
  ProductMetadataUpdated: ResolverTypeWrapper<Omit<ProductMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ProductMutationResult: ResolverTypeWrapper<ProductMutationResult>;
  ProductNodeConnection: ResolverTypeWrapper<ProductNodeConnection>;
  ProductNodeEdge: ResolverTypeWrapper<ProductNodeEdge>;
  ProductOrdering: ProductOrdering;
  ProductOrderingInput: ProductOrderingInput;
  ProductOutOfStock: ResolverTypeWrapper<Omit<ProductOutOfStock, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ProductPreorderDeactivationMutationResult: ResolverTypeWrapper<ProductPreorderDeactivationMutationResult>;
  ProductPricingInfo: ResolverTypeWrapper<ProductPricingInfo>;
  ProductStockFilter: ProductStockFilter;
  ProductTranslation: ResolverTypeWrapper<ProductTranslation>;
  ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation']>;
  ProductUpdated: ResolverTypeWrapper<Omit<ProductUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ProductWithoutVariantError: ResolverTypeWrapper<ProductWithoutVariantError>;
  PublishableChannelListingInput: PublishableChannelListingInput;
  Query: ResolverTypeWrapper<{}>;
  ReducedRate: ResolverTypeWrapper<ReducedRate>;
  ReorderInput: ReorderInput;
  ReportingPeriod: ReportingPeriod;
  Sale: ResolverTypeWrapper<Sale>;
  SaleBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['SaleBase']>;
  SaleChannelListing: ResolverTypeWrapper<SaleChannelListing>;
  SaleChannelListingAddInput: SaleChannelListingAddInput;
  SaleChannelListingInput: SaleChannelListingInput;
  SaleConnection: ResolverTypeWrapper<SaleConnection>;
  SaleCreated: ResolverTypeWrapper<Omit<SaleCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  SaleDeleted: ResolverTypeWrapper<Omit<SaleDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  SaleEdge: ResolverTypeWrapper<SaleEdge>;
  SaleFilter: SaleFilter;
  SaleInput: SaleInput;
  SaleMutationResult: ResolverTypeWrapper<SaleMutationResult>;
  SaleOrdering: SaleOrdering;
  SaleOrderingInput: SaleOrderingInput;
  SaleToggle: ResolverTypeWrapper<Omit<SaleToggle, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  SaleTranslation: ResolverTypeWrapper<SaleTranslation>;
  SaleType: SaleType;
  SaleUpdated: ResolverTypeWrapper<Omit<SaleUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  SeoInput: SeoInput;
  ShippingError: ResolverTypeWrapper<ShippingError>;
  ShippingErrorCode: ShippingErrorCode;
  ShippingListMethodsForCheckout: ResolverTypeWrapper<Omit<ShippingListMethodsForCheckout, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ShippingMethod: ResolverTypeWrapper<ShippingMethod>;
  ShippingMethodChannelListing: ResolverTypeWrapper<ShippingMethodChannelListing>;
  ShippingMethodChannelListingAddInput: ShippingMethodChannelListingAddInput;
  ShippingMethodChannelListingInput: ShippingMethodChannelListingInput;
  ShippingMethodChannelListingMutationResult: ResolverTypeWrapper<ShippingMethodChannelListingMutationResult>;
  ShippingMethodMutationResult: ResolverTypeWrapper<ShippingMethodMutationResult>;
  ShippingMethodPostalCodeRule: ResolverTypeWrapper<ShippingMethodPostalCodeRule>;
  ShippingMethodTranslation: ResolverTypeWrapper<ShippingMethodTranslation>;
  ShippingPostalCodeRulesCreationInputRange: ShippingPostalCodeRulesCreationInputRange;
  ShippingPrice: ResolverTypeWrapper<ShippingPrice>;
  ShippingPriceBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ShippingPriceBase']>;
  ShippingPriceCreated: ResolverTypeWrapper<Omit<ShippingPriceCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ShippingPriceDeleted: ResolverTypeWrapper<Omit<ShippingPriceDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ShippingPriceExcludeProductsInput: ShippingPriceExcludeProductsInput;
  ShippingPriceInput: ShippingPriceInput;
  ShippingPriceMutationResult: ResolverTypeWrapper<ShippingPriceMutationResult>;
  ShippingPriceRemoveProductFromExcludeMutationResult: ResolverTypeWrapper<ShippingPriceRemoveProductFromExcludeMutationResult>;
  ShippingPriceTranslationInput: ShippingPriceTranslationInput;
  ShippingPriceUpdated: ResolverTypeWrapper<Omit<ShippingPriceUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ShippingZone: ResolverTypeWrapper<ShippingZone>;
  ShippingZoneBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ShippingZoneBase']>;
  ShippingZoneConnection: ResolverTypeWrapper<ShippingZoneConnection>;
  ShippingZoneCreated: ResolverTypeWrapper<Omit<ShippingZoneCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ShippingZoneCreationInput: ShippingZoneCreationInput;
  ShippingZoneDeleted: ResolverTypeWrapper<Omit<ShippingZoneDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ShippingZoneEdge: ResolverTypeWrapper<ShippingZoneEdge>;
  ShippingZoneFilter: ShippingZoneFilter;
  ShippingZoneMetadataUpdated: ResolverTypeWrapper<Omit<ShippingZoneMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ShippingZoneMutationResult: ResolverTypeWrapper<ShippingZoneMutationResult>;
  ShippingZoneUpdateInput: ShippingZoneUpdateInput;
  ShippingZoneUpdated: ResolverTypeWrapper<Omit<ShippingZoneUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ShopErrorCode: ShopErrorCode;
  ShopSettingsUpdateInput: ShopSettingsUpdateInput;
  Site: ResolverTypeWrapper<Site>;
  SiteDomainInput: SiteDomainInput;
  SiteMutationResult: ResolverTypeWrapper<SiteMutationResult>;
  SiteTranslation: ResolverTypeWrapper<SiteTranslation>;
  SiteTranslationInput: SiteTranslationInput;
  SiteTranslationMutationResult: ResolverTypeWrapper<SiteTranslationMutationResult>;
  Size: ResolverTypeWrapper<Size>;
  StaffCreated: ResolverTypeWrapper<Omit<StaffCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  StaffCreationInput: StaffCreationInput;
  StaffDeleted: ResolverTypeWrapper<Omit<StaffDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  StaffError: ResolverTypeWrapper<StaffError>;
  StaffMemberStatus: StaffMemberStatus;
  StaffNotificationRecipient: ResolverTypeWrapper<StaffNotificationRecipient>;
  StaffNotificationRecipientInput: StaffNotificationRecipientInput;
  StaffNotificationRecipientMutationResult: ResolverTypeWrapper<StaffNotificationRecipientMutationResult>;
  StaffUpdateInput: StaffUpdateInput;
  StaffUpdated: ResolverTypeWrapper<Omit<StaffUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  StaffUserFilter: StaffUserFilter;
  StateCode: StateCode;
  Stock: ResolverTypeWrapper<Stock>;
  StockAvailability: StockAvailability;
  StockConnection: ResolverTypeWrapper<StockConnection>;
  StockEdge: ResolverTypeWrapper<StockEdge>;
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
  TaxClass: ResolverTypeWrapper<TaxClass>;
  TaxClassConnection: ResolverTypeWrapper<TaxClassConnection>;
  TaxClassCountryRate: ResolverTypeWrapper<TaxClassCountryRate>;
  TaxClassCreateError: ResolverTypeWrapper<TaxClassCreateError>;
  TaxClassCreateErrorCode: TaxClassCreateErrorCode;
  TaxClassCreationInput: TaxClassCreationInput;
  TaxClassDeleteError: ResolverTypeWrapper<TaxClassDeleteError>;
  TaxClassDeleteErrorCode: TaxClassDeleteErrorCode;
  TaxClassEdge: ResolverTypeWrapper<TaxClassEdge>;
  TaxClassFilter: TaxClassFilter;
  TaxClassMutationResult: ResolverTypeWrapper<TaxClassMutationResult>;
  TaxClassOrdering: TaxClassOrdering;
  TaxClassOrderingInput: TaxClassOrderingInput;
  TaxClassRateInput: TaxClassRateInput;
  TaxClassUpdateError: ResolverTypeWrapper<TaxClassUpdateError>;
  TaxClassUpdateErrorCode: TaxClassUpdateErrorCode;
  TaxClassUpdateInput: TaxClassUpdateInput;
  TaxConfiguration: ResolverTypeWrapper<TaxConfiguration>;
  TaxConfigurationConnection: ResolverTypeWrapper<TaxConfigurationConnection>;
  TaxConfigurationEdge: ResolverTypeWrapper<TaxConfigurationEdge>;
  TaxConfigurationFilter: TaxConfigurationFilter;
  TaxConfigurationMutationResult: ResolverTypeWrapper<TaxConfigurationMutationResult>;
  TaxConfigurationPerCountry: ResolverTypeWrapper<TaxConfigurationPerCountry>;
  TaxConfigurationPerCountryInput: TaxConfigurationPerCountryInput;
  TaxConfigurationUpdateError: ResolverTypeWrapper<TaxConfigurationUpdateError>;
  TaxConfigurationUpdateErrorCode: TaxConfigurationUpdateErrorCode;
  TaxConfigurationUpdateInput: TaxConfigurationUpdateInput;
  TaxCountryConfiguration: ResolverTypeWrapper<TaxCountryConfiguration>;
  TaxCountryConfigurationDeleteErrorCode: TaxCountryConfigurationDeleteErrorCode;
  TaxCountryConfigurationMutationResult: ResolverTypeWrapper<TaxCountryConfigurationMutationResult>;
  TaxCountryConfigurationUpdateError: ResolverTypeWrapper<TaxCountryConfigurationUpdateError>;
  TaxCountryConfigurationUpdateErrorCode: TaxCountryConfigurationUpdateErrorCode;
  TaxExemptionManageErrorCode: TaxExemptionManageErrorCode;
  TaxSourceLine: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TaxSourceLine']>;
  TaxSourceObject: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TaxSourceObject']>;
  TaxSourceObjectMutationResult: ResolverTypeWrapper<Omit<TaxSourceObjectMutationResult, 'result'> & { result: ResolversTypes['TaxSourceObject'] }>;
  TaxType: ResolverTypeWrapper<TaxType>;
  TaxableObject: ResolverTypeWrapper<Omit<TaxableObject, 'sourceObject'> & { sourceObject: ResolversTypes['TaxSourceObject'] }>;
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
  TokenVerificationMutationResult: ResolverTypeWrapper<TokenVerificationMutationResult>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionAction: ResolverTypeWrapper<Omit<TransactionAction, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  TransactionActionRequest: ResolverTypeWrapper<Omit<TransactionActionRequest, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  TransactionActionType: TransactionActionType;
  TransactionCreationInput: TransactionCreationInput;
  TransactionCreationMutationErrorCode: TransactionCreationMutationErrorCode;
  TransactionEvent: ResolverTypeWrapper<TransactionEvent>;
  TransactionEventInput: TransactionEventInput;
  TransactionItem: ResolverTypeWrapper<TransactionItem>;
  TransactionItemMetadataUpdated: ResolverTypeWrapper<Omit<TransactionItemMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  TransactionItemMutationResult: ResolverTypeWrapper<TransactionItemMutationResult>;
  TransactionKind: TransactionKind;
  TransactionRequestActionErrorCode: TransactionRequestActionErrorCode;
  TransactionStatus: TransactionStatus;
  TransactionUpdateErrorCode: TransactionUpdateErrorCode;
  TransactionUpdateInput: TransactionUpdateInput;
  TranslatableItem: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TranslatableItem']>;
  TranslatableItemConnection: ResolverTypeWrapper<TranslatableItemConnection>;
  TranslatableItemEdge: ResolverTypeWrapper<Omit<TranslatableItemEdge, 'node'> & { node: ResolversTypes['TranslatableItem'] }>;
  TranslatableKinds: TranslatableKinds;
  TranslationBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['TranslationBase']>;
  TranslationCreated: ResolverTypeWrapper<Omit<TranslationCreated, 'issuingPrincipal' | 'translation'> & { issuingPrincipal: ResolversTypes['AppUser'], translation: ResolversTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] }>;
  TranslationErrorCode: TranslationErrorCode;
  TranslationInput: TranslationInput;
  TranslationUpdated: ResolverTypeWrapper<Omit<TranslationUpdated, 'issuingPrincipal' | 'translation'> & { issuingPrincipal: ResolversTypes['AppUser'], translation: ResolversTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] }>;
  UpdateInvoiceInput: UpdateInvoiceInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  UploadErrorCode: UploadErrorCode;
  User: ResolverTypeWrapper<User>;
  UserBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['UserBase']>;
  UserBulkMutationResult: ResolverTypeWrapper<UserBulkMutationResult>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserCreationInput: UserCreationInput;
  UserCreationResult: ResolverTypeWrapper<UserCreationResult>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  UserMutationResult: ResolverTypeWrapper<UserMutationResult>;
  UserOrdering: UserOrdering;
  UserOrderingInput: UserOrderingInput;
  UserPermission: ResolverTypeWrapper<UserPermission>;
  UserUpdateInput: UserUpdateInput;
  Usercreationinput: Usercreationinput;
  VAT: ResolverTypeWrapper<Vat>;
  Value: ResolverTypeWrapper<Value>;
  ValueBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ValueBase']>;
  ValueConnection: ResolverTypeWrapper<ValueConnection>;
  ValueCreated: ResolverTypeWrapper<Omit<ValueCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ValueCreationInput: ValueCreationInput;
  ValueDeleted: ResolverTypeWrapper<Omit<ValueDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  ValueEdge: ResolverTypeWrapper<ValueEdge>;
  ValueFilter: ValueFilter;
  ValueInput: ValueInput;
  ValueMutationResult: ResolverTypeWrapper<ValueMutationResult>;
  ValueSelectableTypeInput: ValueSelectableTypeInput;
  ValueTranslation: ResolverTypeWrapper<ValueTranslation>;
  ValueTranslationInput: ValueTranslationInput;
  ValueUpdateInput: ValueUpdateInput;
  ValueUpdated: ResolverTypeWrapper<Omit<ValueUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  Void: ResolverTypeWrapper<Scalars['Void']['output']>;
  VolumeUnit: VolumeUnit;
  Voucher: ResolverTypeWrapper<Voucher>;
  VoucherBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['VoucherBase']>;
  VoucherChannelListing: ResolverTypeWrapper<VoucherChannelListing>;
  VoucherChannelListingAddInput: VoucherChannelListingAddInput;
  VoucherChannelListingInput: VoucherChannelListingInput;
  VoucherConnection: ResolverTypeWrapper<VoucherConnection>;
  VoucherCreated: ResolverTypeWrapper<Omit<VoucherCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  VoucherDeleted: ResolverTypeWrapper<Omit<VoucherDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  VoucherDiscountType: VoucherDiscountType;
  VoucherEdge: ResolverTypeWrapper<VoucherEdge>;
  VoucherFilter: VoucherFilter;
  VoucherInput: VoucherInput;
  VoucherMetadataUpdated: ResolverTypeWrapper<Omit<VoucherMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  VoucherMutationResult: ResolverTypeWrapper<VoucherMutationResult>;
  VoucherOrdering: VoucherOrdering;
  VoucherOrderingInput: VoucherOrderingInput;
  VoucherTranslation: ResolverTypeWrapper<VoucherTranslation>;
  VoucherType: VoucherType;
  VoucherUpdated: ResolverTypeWrapper<Omit<VoucherUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  Warehouse: ResolverTypeWrapper<Warehouse>;
  WarehouseBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['WarehouseBase']>;
  WarehouseClickAndCollectOption: WarehouseClickAndCollectOption;
  WarehouseConnection: ResolverTypeWrapper<WarehouseConnection>;
  WarehouseCreated: ResolverTypeWrapper<Omit<WarehouseCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  WarehouseCreationInput: WarehouseCreationInput;
  WarehouseDeleted: ResolverTypeWrapper<Omit<WarehouseDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  WarehouseEdge: ResolverTypeWrapper<WarehouseEdge>;
  WarehouseError: ResolverTypeWrapper<WarehouseError>;
  WarehouseErrorCode: WarehouseErrorCode;
  WarehouseFilter: WarehouseFilter;
  WarehouseMetadataUpdated: ResolverTypeWrapper<Omit<WarehouseMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  WarehouseMutationResult: ResolverTypeWrapper<WarehouseMutationResult>;
  WarehouseOrdering: WarehouseOrdering;
  WarehouseOrderingInput: WarehouseOrderingInput;
  WarehouseShippingZoneAssignmentMutationResult: ResolverTypeWrapper<WarehouseShippingZoneAssignmentMutationResult>;
  WarehouseShippingZoneUnassignmentMutationResult: ResolverTypeWrapper<WarehouseShippingZoneUnassignmentMutationResult>;
  WarehouseUpdateInput: WarehouseUpdateInput;
  WarehouseUpdated: ResolverTypeWrapper<Omit<WarehouseUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversTypes['AppUser'] }>;
  Webhook: ResolverTypeWrapper<Webhook>;
  WebhookCreationInput: WebhookCreationInput;
  WebhookErrorCode: WebhookErrorCode;
  WebhookEventType: WebhookEventType;
  WebhookEventTypeSync: WebhookEventTypeSync;
  WebhookMutationResult: ResolverTypeWrapper<WebhookMutationResult>;
  WebhookSampleEventType: WebhookSampleEventType;
  WebhookUpdateInput: WebhookUpdateInput;
  Weight: ResolverTypeWrapper<Scalars['Weight']['output']>;
  WeightUnit: WeightUnit;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AbstractOrder: ResolversInterfaceTypes<ResolversParentTypes>['AbstractOrder'];
  AbstractProduct: AbstractProduct;
  AccountError: AccountError;
  AccountEvent: AccountEvent;
  Address: Address;
  AddressBase: ResolversInterfaceTypes<ResolversParentTypes>['AddressBase'];
  AddressCreated: Omit<AddressCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AddressDeleted: Omit<AddressDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AddressEvent: ResolversInterfaceTypes<ResolversParentTypes>['AddressEvent'];
  AddressMutationResult: AddressMutationResult;
  AddressUpdateInput: AddressUpdateInput;
  AddressUpdated: Omit<AddressUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AddressValidationData: AddressValidationData;
  Allocation: Allocation;
  App: App;
  AppBase: ResolversInterfaceTypes<ResolversParentTypes>['AppBase'];
  AppConnection: AppConnection;
  AppDeleted: Omit<AppDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AppEdge: AppEdge;
  AppError: AppError;
  AppExtension: AppExtension;
  AppExtensionConnection: AppExtensionConnection;
  AppExtensionEdge: AppExtensionEdge;
  AppExtensionFilter: AppExtensionFilter;
  AppFilter: AppFilter;
  AppInput: AppInput;
  AppInstallInput: AppInstallInput;
  AppInstallation: AppInstallation;
  AppInstallationMutationResult: AppInstallationMutationResult;
  AppInstalled: Omit<AppInstalled, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AppManifestExtension: AppManifestExtension;
  AppManifestWebhook: AppManifestWebhook;
  AppMutationResult: AppMutationResult;
  AppStatusChanged: Omit<AppStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AppToken: AppToken;
  AppTokenInput: AppTokenInput;
  AppTokenMutationResult: AppTokenMutationResult;
  AppUpdated: Omit<AppUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AppUser: ResolversUnionTypes<ResolversParentTypes>['AppUser'];
  AsyncWebhookEvent: AsyncWebhookEvent;
  Attribute: Attribute;
  AttributeBase: ResolversInterfaceTypes<ResolversParentTypes>['AttributeBase'];
  AttributeChoicesOrderingInput: AttributeChoicesOrderingInput;
  AttributeConnection: AttributeConnection;
  AttributeCreated: Omit<AttributeCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AttributeCreationInput: AttributeCreationInput;
  AttributeDeleted: Omit<AttributeDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AttributeEdge: AttributeEdge;
  AttributeFilter: AttributeFilter;
  AttributeInput: AttributeInput;
  AttributeMutationResult: AttributeMutationResult;
  AttributeNodeConnection: AttributeNodeConnection;
  AttributeNodeEdge: AttributeNodeEdge;
  AttributeOrderingInput: AttributeOrderingInput;
  AttributeTranslation: AttributeTranslation;
  AttributeUpdateInput: AttributeUpdateInput;
  AttributeUpdated: Omit<AttributeUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  AuthInput: AuthInput;
  AuthPluginInput: AuthPluginInput;
  AuthPluginMutationResult: AuthPluginMutationResult;
  BaseMutationResult: ResolversInterfaceTypes<ResolversParentTypes>['BaseMutationResult'];
  BasePricingInfo: ResolversInterfaceTypes<ResolversParentTypes>['BasePricingInfo'];
  BaseTranslation: ResolversInterfaceTypes<ResolversParentTypes>['BaseTranslation'];
  BoolMutationResult: BoolMutationResult;
  Boolean: Scalars['Boolean']['output'];
  BulkProductError: BulkProductError;
  BulkStockError: BulkStockError;
  BulkValueInput: BulkValueInput;
  CalculateTaxes: Omit<CalculateTaxes, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CardInput: CardInput;
  CatalogueInput: CatalogueInput;
  Category: Category;
  CategoryBase: ResolversInterfaceTypes<ResolversParentTypes>['CategoryBase'];
  CategoryConnection: CategoryConnection;
  CategoryCreated: Omit<CategoryCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CategoryDeleted: Omit<CategoryDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CategoryEdge: CategoryEdge;
  CategoryFilter: CategoryFilter;
  CategoryInput: CategoryInput;
  CategoryMutationResult: CategoryMutationResult;
  CategoryNodeConnection: CategoryNodeConnection;
  CategoryNodeEdge: CategoryNodeEdge;
  CategoryOrderingInput: CategoryOrderingInput;
  CategoryTranslation: CategoryTranslation;
  CategoryUpdated: Omit<CategoryUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Channel: Channel;
  ChannelBase: ResolversInterfaceTypes<ResolversParentTypes>['ChannelBase'];
  ChannelCreated: Omit<ChannelCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ChannelCreationInput: ChannelCreationInput;
  ChannelDeleteInput: ChannelDeleteInput;
  ChannelDeleted: Omit<ChannelDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ChannelError: ChannelError;
  ChannelMutationResult: ChannelMutationResult;
  ChannelReorderWarehousesMutationResult: ChannelReorderWarehousesMutationResult;
  ChannelStatusChanged: Omit<ChannelStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ChannelUpdateInput: ChannelUpdateInput;
  ChannelUpdated: Omit<ChannelUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Checkout: Omit<Checkout, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<ResolversParentTypes['FulfillmentMethod']> };
  CheckoutAddressValidationRules: CheckoutAddressValidationRules;
  CheckoutBase: ResolversInterfaceTypes<ResolversParentTypes>['CheckoutBase'];
  CheckoutCompleteMutationResult: CheckoutCompleteMutationResult;
  CheckoutConnection: CheckoutConnection;
  CheckoutContactInfoUpdateInput: CheckoutContactInfoUpdateInput;
  CheckoutCreated: Omit<CheckoutCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CheckoutCreationInput: CheckoutCreationInput;
  CheckoutEdge: CheckoutEdge;
  CheckoutError: CheckoutError;
  CheckoutFilter: CheckoutFilter;
  CheckoutFilterShippingMethods: Omit<CheckoutFilterShippingMethods, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CheckoutLine: CheckoutLine;
  CheckoutLineConnection: CheckoutLineConnection;
  CheckoutLineEdge: CheckoutLineEdge;
  CheckoutLineInput: CheckoutLineInput;
  CheckoutLineUpdateInput: CheckoutLineUpdateInput;
  CheckoutMetadataUpdated: Omit<CheckoutMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CheckoutMutationResult: CheckoutMutationResult;
  CheckoutNodeConnection: CheckoutNodeConnection;
  CheckoutNodeEdge: CheckoutNodeEdge;
  CheckoutOptionalMutationResult: CheckoutOptionalMutationResult;
  CheckoutOrderingInput: CheckoutOrderingInput;
  CheckoutPaymentMutationResult: CheckoutPaymentMutationResult;
  CheckoutPointOfContactInput: CheckoutPointOfContactInput;
  CheckoutUpdated: Omit<CheckoutUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CheckoutValidationRules: CheckoutValidationRules;
  ChoiceValue: ChoiceValue;
  Collection: Collection;
  CollectionBase: ResolversInterfaceTypes<ResolversParentTypes>['CollectionBase'];
  CollectionChannelListing: CollectionChannelListing;
  CollectionChannelListingError: CollectionChannelListingError;
  CollectionChannelListingMutationResult: CollectionChannelListingMutationResult;
  CollectionChannelListingUpdateInput: CollectionChannelListingUpdateInput;
  CollectionConnection: CollectionConnection;
  CollectionCreated: Omit<CollectionCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CollectionCreationInput: CollectionCreationInput;
  CollectionDeleted: Omit<CollectionDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CollectionEdge: CollectionEdge;
  CollectionFilter: CollectionFilter;
  CollectionInput: CollectionInput;
  CollectionMetadataUpdated: Omit<CollectionMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CollectionMutationResult: CollectionMutationResult;
  CollectionOrderingInput: CollectionOrderingInput;
  CollectionTranslation: CollectionTranslation;
  CollectionUpdated: Omit<CollectionUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ConcreteProduct: ConcreteProduct;
  ConfigurationItem: ConfigurationItem;
  ConfigurationItemInput: ConfigurationItemInput;
  Coordinates: Coordinates;
  Country: Country;
  CountryFilter: CountryFilter;
  CountryRateInput: CountryRateInput;
  CountryRateUpdateInput: CountryRateUpdateInput;
  CreateOrderd: Omit<CreateOrderd, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CreditCard: CreditCard;
  CustomerCreated: Omit<CustomerCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CustomerFilter: CustomerFilter;
  CustomerMetadataUpdated: Omit<CustomerMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  CustomerUpdated: Omit<CustomerUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Date: Scalars['Date']['output'];
  DateRangeInput: DateRangeInput;
  DateTime: Scalars['DateTime']['output'];
  DateTimeRangeInput: DateTimeRangeInput;
  DigitalContent: DigitalContent;
  DigitalContentConnection: DigitalContentConnection;
  DigitalContentEdge: DigitalContentEdge;
  DigitalContentInput: DigitalContentInput;
  DigitalContentMutationResult: DigitalContentMutationResult;
  DigitalContentUploadInput: DigitalContentUploadInput;
  DigitalContentUrl: DigitalContentUrl;
  DigitalContentUrlCreationInput: DigitalContentUrlCreationInput;
  DiscountError: DiscountError;
  DraftOrderCreated: Omit<DraftOrderCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  DraftOrderCreationInput: DraftOrderCreationInput;
  DraftOrderDeleted: Omit<DraftOrderDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  DraftOrderInput: DraftOrderInput;
  DraftOrderUpdated: Omit<DraftOrderUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Error: Error;
  ErrorInterface: ResolversInterfaceTypes<ResolversParentTypes>['ErrorInterface'];
  Event: ResolversInterfaceTypes<ResolversParentTypes>['Event'];
  EventDelivery: EventDelivery;
  EventDeliveryConnection: EventDeliveryConnection;
  EventDeliveryEdge: EventDeliveryEdge;
  EventDeliveryFilter: EventDeliveryFilter;
  EventDeliveryMutationResult: EventDeliveryMutationResult;
  EventDeliveryOrderingInput: EventDeliveryOrderingInput;
  ExportEvent: ExportEvent;
  ExportFile: ExportFile;
  ExportFileConnection: ExportFileConnection;
  ExportFileEdge: ExportFileEdge;
  ExportFileFilter: ExportFileFilter;
  ExportFileMutationResult: ExportFileMutationResult;
  ExportFileOrderingInput: ExportFileOrderingInput;
  ExportGiftCardsInput: ExportGiftCardsInput;
  ExportInfoInput: ExportInfoInput;
  ExportProductsInput: ExportProductsInput;
  ExternalAuthentication: ExternalAuthentication;
  ExternalNotificationTriggerInput: ExternalNotificationTriggerInput;
  ExternalNotificationTriggerMutationResult: ExternalNotificationTriggerMutationResult;
  File: File;
  FileMutationResult: FileMutationResult;
  Float: Scalars['Float']['output'];
  Fulfillment: Fulfillment;
  FulfillmentApproved: Omit<FulfillmentApproved, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  FulfillmentBase: ResolversInterfaceTypes<ResolversParentTypes>['FulfillmentBase'];
  FulfillmentCancelInput: FulfillmentCancelInput;
  FulfillmentCanceled: Omit<FulfillmentCanceled, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  FulfillmentCreated: Omit<FulfillmentCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  FulfillmentLine: FulfillmentLine;
  FulfillmentMetadataUpdated: Omit<FulfillmentMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  FulfillmentMethod: ResolversUnionTypes<ResolversParentTypes>['FulfillmentMethod'];
  FulfillmentUpdateTrackingInput: FulfillmentUpdateTrackingInput;
  GatewayConfigLine: GatewayConfigLine;
  GiftCard: GiftCard;
  GiftCardAddNoteInput: GiftCardAddNoteInput;
  GiftCardBase: ResolversInterfaceTypes<ResolversParentTypes>['GiftCardBase'];
  GiftCardBulkCreationInput: GiftCardBulkCreationInput;
  GiftCardBulkMutationResult: GiftCardBulkMutationResult;
  GiftCardConnection: GiftCardConnection;
  GiftCardCreated: Omit<GiftCardCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  GiftCardCreationInput: GiftCardCreationInput;
  GiftCardDeleted: Omit<GiftCardDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  GiftCardEdge: GiftCardEdge;
  GiftCardError: GiftCardError;
  GiftCardEvent: GiftCardEvent;
  GiftCardEventBalance: GiftCardEventBalance;
  GiftCardEventFilter: GiftCardEventFilter;
  GiftCardFilter: GiftCardFilter;
  GiftCardMetadataUpdated: Omit<GiftCardMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  GiftCardMutationResult: GiftCardMutationResult;
  GiftCardNodeConnection: GiftCardNodeConnection;
  GiftCardNodeEdge: GiftCardNodeEdge;
  GiftCardOrderingInput: GiftCardOrderingInput;
  GiftCardResendInput: GiftCardResendInput;
  GiftCardSettings: GiftCardSettings;
  GiftCardSettingsMutationResult: GiftCardSettingsMutationResult;
  GiftCardSettingsUpdateInput: GiftCardSettingsUpdateInput;
  GiftCardStatusChanged: Omit<GiftCardStatusChanged, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  GiftCardTag: GiftCardTag;
  GiftCardTagConnection: GiftCardTagConnection;
  GiftCardTagEdge: GiftCardTagEdge;
  GiftCardTagFilter: GiftCardTagFilter;
  GiftCardUpdateInput: GiftCardUpdateInput;
  GiftCardUpdated: Omit<GiftCardUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Giftcardmutationresult: Giftcardmutationresult;
  GlobalID: Scalars['GlobalID']['output'];
  GoogleAddressBase: ResolversInterfaceTypes<ResolversParentTypes>['GoogleAddressBase'];
  Group: Group;
  GroupBase: ResolversInterfaceTypes<ResolversParentTypes>['GroupBase'];
  GroupConnection: GroupConnection;
  GroupCreated: Omit<GroupCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  GroupCreationInput: GroupCreationInput;
  GroupDeleted: Omit<GroupDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  GroupEdge: GroupEdge;
  GroupError: GroupError;
  GroupFilter: GroupFilter;
  GroupMutationResult: GroupMutationResult;
  GroupOrderingInput: GroupOrderingInput;
  GroupUpdateInput: GroupUpdateInput;
  GroupUpdated: Omit<GroupUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ID: Scalars['ID']['output'];
  IDListMutationResult: IdListMutationResult;
  Image: Image;
  Int: Scalars['Int']['output'];
  IntRangeInput: IntRangeInput;
  Invoice: Invoice;
  InvoiceBase: ResolversInterfaceTypes<ResolversParentTypes>['InvoiceBase'];
  InvoiceCreationInput: InvoiceCreationInput;
  InvoiceDeleted: Omit<InvoiceDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  InvoiceMutationResult: InvoiceMutationResult;
  InvoiceRequested: Omit<InvoiceRequested, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  InvoiceSent: Omit<InvoiceSent, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  JSONString: Scalars['JSONString']['output'];
  JWT: Jwt;
  JWTMutationResult: JwtMutationResult;
  Job: ResolversInterfaceTypes<ResolversParentTypes>['Job'];
  LanguageDisplay: LanguageDisplay;
  LimitInfo: LimitInfo;
  Limits: Limits;
  Manifest: Manifest;
  ManifestMutationResult: ManifestMutationResult;
  MediaBase: ResolversInterfaceTypes<ResolversParentTypes>['MediaBase'];
  MediaCreated: Omit<MediaCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  MediaCreationInput: MediaCreationInput;
  MediaDeleted: Omit<MediaDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  MediaError: MediaError;
  MediaFilter: MediaFilter;
  MediaInput: MediaInput;
  MediaItem: MediaItem;
  MediaItemConnection: MediaItemConnection;
  MediaItemEdge: MediaItemEdge;
  MediaItemMutationResult: MediaItemMutationResult;
  MediaOrderingInput: MediaOrderingInput;
  MediaUpdated: Omit<MediaUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Menu: Menu;
  MenuBase: ResolversInterfaceTypes<ResolversParentTypes>['MenuBase'];
  MenuConnection: MenuConnection;
  MenuCreated: Omit<MenuCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  MenuCreationInput: MenuCreationInput;
  MenuDeleted: Omit<MenuDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  MenuEdge: MenuEdge;
  MenuInput: MenuInput;
  MenuItem: MenuItem;
  MenuItemBase: ResolversInterfaceTypes<ResolversParentTypes>['MenuItemBase'];
  MenuItemConnection: MenuItemConnection;
  MenuItemCreated: Omit<MenuItemCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  MenuItemCreationInput: MenuItemCreationInput;
  MenuItemDeleted: Omit<MenuItemDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  MenuItemEdge: MenuItemEdge;
  MenuItemFilter: MenuItemFilter;
  MenuItemInput: MenuItemInput;
  MenuItemMoveInput: MenuItemMoveInput;
  MenuItemMutationResult: MenuItemMutationResult;
  MenuItemOrderingInput: MenuItemOrderingInput;
  MenuItemTranslation: MenuItemTranslation;
  MenuItemUpdated: Omit<MenuItemUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  MenuMutationResult: MenuMutationResult;
  MenuOrderingInput: MenuOrderingInput;
  MenuUpdated: Omit<MenuUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
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
  ObjectWithMetadataMutationResult: ObjectWithMetadataMutationResult;
  Order: Omit<Order, 'fulfillmentMethod'> & { fulfillmentMethod?: Maybe<ResolversParentTypes['FulfillmentMethod']> };
  OrderAddNoteInput: OrderAddNoteInput;
  OrderBase: ResolversInterfaceTypes<ResolversParentTypes>['OrderBase'];
  OrderBulkMutationResult: OrderBulkMutationResult;
  OrderCancelled: Omit<OrderCancelled, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  OrderConfirmed: Omit<OrderConfirmed, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  OrderConnection: OrderConnection;
  OrderDiscount: OrderDiscount;
  OrderDiscountCommonInput: OrderDiscountCommonInput;
  OrderDraftFilter: OrderDraftFilter;
  OrderEdge: OrderEdge;
  OrderError: OrderError;
  OrderEvent: OrderEvent;
  OrderEventConnection: OrderEventConnection;
  OrderEventEdge: OrderEventEdge;
  OrderEventOrderLineObject: OrderEventOrderLineObject;
  OrderFilter: OrderFilter;
  OrderFilterShippingMethods: Omit<OrderFilterShippingMethods, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  OrderFulfillInput: OrderFulfillInput;
  OrderFulfillStockInput: OrderFulfillStockInput;
  OrderFulfilled: Omit<OrderFulfilled, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  OrderFulfillment: OrderFulfillment;
  OrderFulfillmentLineInput: OrderFulfillmentLineInput;
  OrderFulfillmentMutationResult: OrderFulfillmentMutationResult;
  OrderFullyPaid: Omit<OrderFullyPaid, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  OrderInvoiceMutationResult: OrderInvoiceMutationResult;
  OrderLine: OrderLine;
  OrderLineCreationInput: OrderLineCreationInput;
  OrderLineInput: OrderLineInput;
  OrderLineMutationResult: OrderLineMutationResult;
  OrderLinesMutationResult: OrderLinesMutationResult;
  OrderMetadataUpdated: Omit<OrderMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  OrderMutationResult: OrderMutationResult;
  OrderNodeConnection: OrderNodeConnection;
  OrderNodeEdge: OrderNodeEdge;
  OrderOrderingInput: OrderOrderingInput;
  OrderRefundFulfillmentLineInput: OrderRefundFulfillmentLineInput;
  OrderRefundLineInput: OrderRefundLineInput;
  OrderRefundProductsInput: OrderRefundProductsInput;
  OrderReturnFulfillmentLineInput: OrderReturnFulfillmentLineInput;
  OrderReturnLineInput: OrderReturnLineInput;
  OrderReturnProductsInput: OrderReturnProductsInput;
  OrderSettings: OrderSettings;
  OrderSettingsMutationResult: OrderSettingsMutationResult;
  OrderSettingsUpdateInput: OrderSettingsUpdateInput;
  OrderUpdateInput: OrderUpdateInput;
  OrderUpdateShippingInput: OrderUpdateShippingInput;
  OrderUpdated: Omit<OrderUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Ordermutationresult: Ordermutationresult;
  Page: Page;
  PageBase: ResolversInterfaceTypes<ResolversParentTypes>['PageBase'];
  PageBulkMutationResult: PageBulkMutationResult;
  PageConnection: PageConnection;
  PageCreated: Omit<PageCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PageCreationInput: PageCreationInput;
  PageDeleted: Omit<PageDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PageEdge: PageEdge;
  PageError: PageError;
  PageFilter: PageFilter;
  PageInfo: PageInfo;
  PageInput: PageInput;
  PageKlass: PageKlass;
  PageKlassBase: ResolversInterfaceTypes<ResolversParentTypes>['PageKlassBase'];
  PageKlassConnection: PageKlassConnection;
  PageKlassCreated: Omit<PageKlassCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PageKlassCreationInput: PageKlassCreationInput;
  PageKlassDeleted: Omit<PageKlassDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PageKlassEdge: PageKlassEdge;
  PageKlassFilter: PageKlassFilter;
  PageKlassMutationResult: PageKlassMutationResult;
  PageKlassOrderingInput: PageKlassOrderingInput;
  PageKlassUpdateInput: PageKlassUpdateInput;
  PageKlassUpdated: Omit<PageKlassUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PageMutationResult: PageMutationResult;
  PageOrderingInput: PageOrderingInput;
  PageTranslation: PageTranslation;
  PageTranslationInput: PageTranslationInput;
  PageUpdated: Omit<PageUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Payment: Payment;
  PaymentAuthorize: Omit<PaymentAuthorize, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PaymentBase: ResolversInterfaceTypes<ResolversParentTypes>['PaymentBase'];
  PaymentCaptureEvent: Omit<PaymentCaptureEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PaymentCheckBalanceInput: PaymentCheckBalanceInput;
  PaymentCheckBalanceMutationResult: PaymentCheckBalanceMutationResult;
  PaymentConfirmEvent: Omit<PaymentConfirmEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PaymentConnection: PaymentConnection;
  PaymentEdge: PaymentEdge;
  PaymentError: PaymentError;
  PaymentFilter: PaymentFilter;
  PaymentGateway: PaymentGateway;
  PaymentInitializeMutationResult: PaymentInitializeMutationResult;
  PaymentInitialized: PaymentInitialized;
  PaymentInput: PaymentInput;
  PaymentListGateways: Omit<PaymentListGateways, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PaymentMutationResult: PaymentMutationResult;
  PaymentProcessEvent: Omit<PaymentProcessEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PaymentRefundEvent: Omit<PaymentRefundEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PaymentSource: PaymentSource;
  PaymentVoidEvent: Omit<PaymentVoidEvent, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  PermDefinition: PermDefinition;
  Permission: Permission;
  Plugin: Plugin;
  PluginConfiguration: PluginConfiguration;
  PluginConnection: PluginConnection;
  PluginEdge: PluginEdge;
  PluginFilter: PluginFilter;
  PluginMutationResult: PluginMutationResult;
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
  ProductAttributeAssignment: ProductAttributeAssignment;
  ProductAttributeAssignmentMutationResult: ProductAttributeAssignmentMutationResult;
  ProductAttributeAssignmentUpdateInput: ProductAttributeAssignmentUpdateInput;
  ProductBackInStock: Omit<ProductBackInStock, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ProductBase: ResolversInterfaceTypes<ResolversParentTypes>['ProductBase'];
  ProductBulkCreationInput: ProductBulkCreationInput;
  ProductBulkMutationResult: ProductBulkMutationResult;
  ProductChannelListing: ProductChannelListing;
  ProductChannelListingAddInput: ProductChannelListingAddInput;
  ProductChannelListingError: ProductChannelListingError;
  ProductConnection: ProductConnection;
  ProductCreated: Omit<ProductCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ProductCreationInput: ProductCreationInput;
  ProductDeleted: Omit<ProductDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ProductEdge: ProductEdge;
  ProductError: ProductError;
  ProductFilter: ProductFilter;
  ProductImage: ProductImage;
  ProductInput: ProductInput;
  ProductKlass: ProductKlass;
  ProductKlassConnection: ProductKlassConnection;
  ProductKlassEdge: ProductKlassEdge;
  ProductKlassFilter: ProductKlassFilter;
  ProductKlassInput: ProductKlassInput;
  ProductKlassMutationResult: ProductKlassMutationResult;
  ProductKlassNodeConnection: ProductKlassNodeConnection;
  ProductKlassNodeEdge: ProductKlassNodeEdge;
  ProductKlassOrderingInput: ProductKlassOrderingInput;
  ProductMediaAssignmentMutationResult: ProductMediaAssignmentMutationResult;
  ProductMediaCreationInput: ProductMediaCreationInput;
  ProductMediaItem: ProductMediaItem;
  ProductMediaMutationResult: ProductMediaMutationResult;
  ProductMediaUnassignmentMutationResult: ProductMediaUnassignmentMutationResult;
  ProductMediaUpdateInput: ProductMediaUpdateInput;
  ProductMetadataUpdated: Omit<ProductMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ProductMutationResult: ProductMutationResult;
  ProductNodeConnection: ProductNodeConnection;
  ProductNodeEdge: ProductNodeEdge;
  ProductOrderingInput: ProductOrderingInput;
  ProductOutOfStock: Omit<ProductOutOfStock, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ProductPreorderDeactivationMutationResult: ProductPreorderDeactivationMutationResult;
  ProductPricingInfo: ProductPricingInfo;
  ProductStockFilter: ProductStockFilter;
  ProductTranslation: ProductTranslation;
  ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation: ResolversUnionTypes<ResolversParentTypes>['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'];
  ProductUpdated: Omit<ProductUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ProductWithoutVariantError: ProductWithoutVariantError;
  PublishableChannelListingInput: PublishableChannelListingInput;
  Query: {};
  ReducedRate: ReducedRate;
  ReorderInput: ReorderInput;
  Sale: Sale;
  SaleBase: ResolversInterfaceTypes<ResolversParentTypes>['SaleBase'];
  SaleChannelListing: SaleChannelListing;
  SaleChannelListingAddInput: SaleChannelListingAddInput;
  SaleChannelListingInput: SaleChannelListingInput;
  SaleConnection: SaleConnection;
  SaleCreated: Omit<SaleCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  SaleDeleted: Omit<SaleDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  SaleEdge: SaleEdge;
  SaleFilter: SaleFilter;
  SaleInput: SaleInput;
  SaleMutationResult: SaleMutationResult;
  SaleOrderingInput: SaleOrderingInput;
  SaleToggle: Omit<SaleToggle, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  SaleTranslation: SaleTranslation;
  SaleUpdated: Omit<SaleUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  SeoInput: SeoInput;
  ShippingError: ShippingError;
  ShippingListMethodsForCheckout: Omit<ShippingListMethodsForCheckout, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ShippingMethod: ShippingMethod;
  ShippingMethodChannelListing: ShippingMethodChannelListing;
  ShippingMethodChannelListingAddInput: ShippingMethodChannelListingAddInput;
  ShippingMethodChannelListingInput: ShippingMethodChannelListingInput;
  ShippingMethodChannelListingMutationResult: ShippingMethodChannelListingMutationResult;
  ShippingMethodMutationResult: ShippingMethodMutationResult;
  ShippingMethodPostalCodeRule: ShippingMethodPostalCodeRule;
  ShippingMethodTranslation: ShippingMethodTranslation;
  ShippingPostalCodeRulesCreationInputRange: ShippingPostalCodeRulesCreationInputRange;
  ShippingPrice: ShippingPrice;
  ShippingPriceBase: ResolversInterfaceTypes<ResolversParentTypes>['ShippingPriceBase'];
  ShippingPriceCreated: Omit<ShippingPriceCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ShippingPriceDeleted: Omit<ShippingPriceDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ShippingPriceExcludeProductsInput: ShippingPriceExcludeProductsInput;
  ShippingPriceInput: ShippingPriceInput;
  ShippingPriceMutationResult: ShippingPriceMutationResult;
  ShippingPriceRemoveProductFromExcludeMutationResult: ShippingPriceRemoveProductFromExcludeMutationResult;
  ShippingPriceTranslationInput: ShippingPriceTranslationInput;
  ShippingPriceUpdated: Omit<ShippingPriceUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ShippingZone: ShippingZone;
  ShippingZoneBase: ResolversInterfaceTypes<ResolversParentTypes>['ShippingZoneBase'];
  ShippingZoneConnection: ShippingZoneConnection;
  ShippingZoneCreated: Omit<ShippingZoneCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ShippingZoneCreationInput: ShippingZoneCreationInput;
  ShippingZoneDeleted: Omit<ShippingZoneDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ShippingZoneEdge: ShippingZoneEdge;
  ShippingZoneFilter: ShippingZoneFilter;
  ShippingZoneMetadataUpdated: Omit<ShippingZoneMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ShippingZoneMutationResult: ShippingZoneMutationResult;
  ShippingZoneUpdateInput: ShippingZoneUpdateInput;
  ShippingZoneUpdated: Omit<ShippingZoneUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ShopSettingsUpdateInput: ShopSettingsUpdateInput;
  Site: Site;
  SiteDomainInput: SiteDomainInput;
  SiteMutationResult: SiteMutationResult;
  SiteTranslation: SiteTranslation;
  SiteTranslationInput: SiteTranslationInput;
  SiteTranslationMutationResult: SiteTranslationMutationResult;
  Size: Size;
  StaffCreated: Omit<StaffCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  StaffCreationInput: StaffCreationInput;
  StaffDeleted: Omit<StaffDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  StaffError: StaffError;
  StaffNotificationRecipient: StaffNotificationRecipient;
  StaffNotificationRecipientInput: StaffNotificationRecipientInput;
  StaffNotificationRecipientMutationResult: StaffNotificationRecipientMutationResult;
  StaffUpdateInput: StaffUpdateInput;
  StaffUpdated: Omit<StaffUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  StaffUserFilter: StaffUserFilter;
  Stock: Stock;
  StockConnection: StockConnection;
  StockEdge: StockEdge;
  StockFilter: StockFilter;
  StockInput: StockInput;
  StockSettings: StockSettings;
  StockSettingsInput: StockSettingsInput;
  String: Scalars['String']['output'];
  Subscription: {};
  SyncWebhookEvent: SyncWebhookEvent;
  TaxClass: TaxClass;
  TaxClassConnection: TaxClassConnection;
  TaxClassCountryRate: TaxClassCountryRate;
  TaxClassCreateError: TaxClassCreateError;
  TaxClassCreationInput: TaxClassCreationInput;
  TaxClassDeleteError: TaxClassDeleteError;
  TaxClassEdge: TaxClassEdge;
  TaxClassFilter: TaxClassFilter;
  TaxClassMutationResult: TaxClassMutationResult;
  TaxClassOrderingInput: TaxClassOrderingInput;
  TaxClassRateInput: TaxClassRateInput;
  TaxClassUpdateError: TaxClassUpdateError;
  TaxClassUpdateInput: TaxClassUpdateInput;
  TaxConfiguration: TaxConfiguration;
  TaxConfigurationConnection: TaxConfigurationConnection;
  TaxConfigurationEdge: TaxConfigurationEdge;
  TaxConfigurationFilter: TaxConfigurationFilter;
  TaxConfigurationMutationResult: TaxConfigurationMutationResult;
  TaxConfigurationPerCountry: TaxConfigurationPerCountry;
  TaxConfigurationPerCountryInput: TaxConfigurationPerCountryInput;
  TaxConfigurationUpdateError: TaxConfigurationUpdateError;
  TaxConfigurationUpdateInput: TaxConfigurationUpdateInput;
  TaxCountryConfiguration: TaxCountryConfiguration;
  TaxCountryConfigurationMutationResult: TaxCountryConfigurationMutationResult;
  TaxCountryConfigurationUpdateError: TaxCountryConfigurationUpdateError;
  TaxSourceLine: ResolversUnionTypes<ResolversParentTypes>['TaxSourceLine'];
  TaxSourceObject: ResolversUnionTypes<ResolversParentTypes>['TaxSourceObject'];
  TaxSourceObjectMutationResult: Omit<TaxSourceObjectMutationResult, 'result'> & { result: ResolversParentTypes['TaxSourceObject'] };
  TaxType: TaxType;
  TaxableObject: Omit<TaxableObject, 'sourceObject'> & { sourceObject: ResolversParentTypes['TaxSourceObject'] };
  TaxableObjectDiscount: TaxableObjectDiscount;
  TaxableObjectLine: Omit<TaxableObjectLine, 'sourceLine'> & { sourceLine: ResolversParentTypes['TaxSourceLine'] };
  TaxedMoney: TaxedMoney;
  TaxedMoneyRange: TaxedMoneyRange;
  TempoNode: ResolversInterfaceTypes<ResolversParentTypes>['TempoNode'];
  Thumbnail: Thumbnail;
  TimePeriod: TimePeriod;
  TimePeriodInputType: TimePeriodInputType;
  TokenVerificationMutationResult: TokenVerificationMutationResult;
  Transaction: Transaction;
  TransactionAction: Omit<TransactionAction, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  TransactionActionRequest: Omit<TransactionActionRequest, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  TransactionCreationInput: TransactionCreationInput;
  TransactionEvent: TransactionEvent;
  TransactionEventInput: TransactionEventInput;
  TransactionItem: TransactionItem;
  TransactionItemMetadataUpdated: Omit<TransactionItemMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  TransactionItemMutationResult: TransactionItemMutationResult;
  TransactionUpdateInput: TransactionUpdateInput;
  TranslatableItem: ResolversUnionTypes<ResolversParentTypes>['TranslatableItem'];
  TranslatableItemConnection: TranslatableItemConnection;
  TranslatableItemEdge: Omit<TranslatableItemEdge, 'node'> & { node: ResolversParentTypes['TranslatableItem'] };
  TranslationBase: ResolversInterfaceTypes<ResolversParentTypes>['TranslationBase'];
  TranslationCreated: Omit<TranslationCreated, 'issuingPrincipal' | 'translation'> & { issuingPrincipal: ResolversParentTypes['AppUser'], translation: ResolversParentTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] };
  TranslationInput: TranslationInput;
  TranslationUpdated: Omit<TranslationUpdated, 'issuingPrincipal' | 'translation'> & { issuingPrincipal: ResolversParentTypes['AppUser'], translation: ResolversParentTypes['ProductTranslationCollectionTranslationCategoryTranslationAttributeTranslationValueTranslationPageTranslationShippingMethodTranslationSaleTranslationVoucherTranslationMenuItemTranslation'] };
  UpdateInvoiceInput: UpdateInvoiceInput;
  Upload: Scalars['Upload']['output'];
  User: User;
  UserBase: ResolversInterfaceTypes<ResolversParentTypes>['UserBase'];
  UserBulkMutationResult: UserBulkMutationResult;
  UserConnection: UserConnection;
  UserCreationInput: UserCreationInput;
  UserCreationResult: UserCreationResult;
  UserEdge: UserEdge;
  UserMutationResult: UserMutationResult;
  UserOrderingInput: UserOrderingInput;
  UserPermission: UserPermission;
  UserUpdateInput: UserUpdateInput;
  Usercreationinput: Usercreationinput;
  VAT: Vat;
  Value: Value;
  ValueBase: ResolversInterfaceTypes<ResolversParentTypes>['ValueBase'];
  ValueConnection: ValueConnection;
  ValueCreated: Omit<ValueCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ValueCreationInput: ValueCreationInput;
  ValueDeleted: Omit<ValueDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  ValueEdge: ValueEdge;
  ValueFilter: ValueFilter;
  ValueInput: ValueInput;
  ValueMutationResult: ValueMutationResult;
  ValueSelectableTypeInput: ValueSelectableTypeInput;
  ValueTranslation: ValueTranslation;
  ValueTranslationInput: ValueTranslationInput;
  ValueUpdateInput: ValueUpdateInput;
  ValueUpdated: Omit<ValueUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Void: Scalars['Void']['output'];
  Voucher: Voucher;
  VoucherBase: ResolversInterfaceTypes<ResolversParentTypes>['VoucherBase'];
  VoucherChannelListing: VoucherChannelListing;
  VoucherChannelListingAddInput: VoucherChannelListingAddInput;
  VoucherChannelListingInput: VoucherChannelListingInput;
  VoucherConnection: VoucherConnection;
  VoucherCreated: Omit<VoucherCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  VoucherDeleted: Omit<VoucherDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  VoucherEdge: VoucherEdge;
  VoucherFilter: VoucherFilter;
  VoucherInput: VoucherInput;
  VoucherMetadataUpdated: Omit<VoucherMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  VoucherMutationResult: VoucherMutationResult;
  VoucherOrderingInput: VoucherOrderingInput;
  VoucherTranslation: VoucherTranslation;
  VoucherUpdated: Omit<VoucherUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Warehouse: Warehouse;
  WarehouseBase: ResolversInterfaceTypes<ResolversParentTypes>['WarehouseBase'];
  WarehouseConnection: WarehouseConnection;
  WarehouseCreated: Omit<WarehouseCreated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  WarehouseCreationInput: WarehouseCreationInput;
  WarehouseDeleted: Omit<WarehouseDeleted, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  WarehouseEdge: WarehouseEdge;
  WarehouseError: WarehouseError;
  WarehouseFilter: WarehouseFilter;
  WarehouseMetadataUpdated: Omit<WarehouseMetadataUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  WarehouseMutationResult: WarehouseMutationResult;
  WarehouseOrderingInput: WarehouseOrderingInput;
  WarehouseShippingZoneAssignmentMutationResult: WarehouseShippingZoneAssignmentMutationResult;
  WarehouseShippingZoneUnassignmentMutationResult: WarehouseShippingZoneUnassignmentMutationResult;
  WarehouseUpdateInput: WarehouseUpdateInput;
  WarehouseUpdated: Omit<WarehouseUpdated, 'issuingPrincipal'> & { issuingPrincipal: ResolversParentTypes['AppUser'] };
  Webhook: Webhook;
  WebhookCreationInput: WebhookCreationInput;
  WebhookMutationResult: WebhookMutationResult;
  WebhookUpdateInput: WebhookUpdateInput;
  Weight: Scalars['Weight']['output'];
};

export type HasPermDirectiveArgs = {
  any?: Scalars['Boolean']['input'];
  permissions: Array<PermDefinition>;
};

export type HasPermDirectiveResolver<Result, Parent, ContextType = any, Args = HasPermDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasPermissionDirectiveArgs = {
  any?: Scalars['Boolean']['input'];
  permissions: Array<PermDefinition>;
};

export type HasPermissionDirectiveResolver<Result, Parent, ContextType = any, Args = HasPermissionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

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

export type DirectiveResolvers<ContextType = any> = {
  hasPerm?: HasPermDirectiveResolver<any, any, ContextType>;
  hasPermission?: HasPermissionDirectiveResolver<any, any, ContextType>;
};
