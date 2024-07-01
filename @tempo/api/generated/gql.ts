/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation login($email: String!, $password: String!) {\n    obtainToken(authInput: { email: $email, password: $password }) {\n      result {\n        accessToken\n        refreshToken\n        csrfToken\n        user {\n          ...UserDetails\n        }\n      }\n      errors {\n        message\n        field\n        code\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query AvailableExternalAuthentications {\n    shop {\n      id\n      availableExternalAuthentications {\n        id\n        name\n      }\n    }\n  }\n": types.AvailableExternalAuthenticationsDocument,
    "mutation FileUpload($file: Upload!) {\n  uploadFile(file: $file) {\n    result {\n      ...File\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.FileUploadDocument,
    "query PublicMetafields($id: ID!, $keys: [String!]!) {\n  app(id: $id) {\n    id\n    metafields(keys: $keys)\n  }\n}\n\nquery PrivateMetafields($id: ID!, $keys: [String!]!) {\n  app(id: $id) {\n    id\n    privateMetafields(keys: $keys)\n  }\n}\n\nquery PublicMetafieldsInferred($keys: [String!]!) {\n  app {\n    id\n    metafields(keys: $keys)\n  }\n}\n\nquery PrivateMetafieldsInferred($keys: [String!]!) {\n  app {\n    id\n    privateMetafields(keys: $keys)\n  }\n}\n\nmutation UpdatePublicMetadata($id: ID!, $input: [MetadataInput!]!, $keys: [String!]!) {\n  updateMetadata(id: $id, data: $input) {\n    result {\n      metafields(keys: $keys)\n    }\n    errors {\n      ...Error\n    }\n  }\n}\n\nmutation UpdatePrivateMetadata($id: ID!, $input: [MetadataInput!]!, $keys: [String!]!) {\n  updatePrivateMetadata(id: $id, data: $input) {\n    result {\n      privateMetafields(keys: $keys)\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.PublicMetafieldsDocument,
    "query TransactionProcessedEvents($id: ID!) {\n  transaction(id: $id) {\n    processedEvents: metafield(key: \"processedEvents\")\n  }\n}\n\nmutation TransactionUpdateProcessedEvents($id: ID!, $input: String!) {\n  updateMetadata(id: $id, data: {key: \"processedEvents\", value: $input}) {\n    __typename\n    errors {\n      field\n      message\n    }\n  }\n}": types.TransactionProcessedEventsDocument,
    "subscription TransactionActionRequestSubscription {\n  event {\n    ... on TransactionActionRequest {\n      transaction {\n        id\n        reference\n        type\n        amountAuthorized {\n          amount\n          currency\n        }\n        amountCharged {\n          amount\n        }\n        amountVoided {\n          amount\n        }\n        amountRefunded {\n          amount\n        }\n      }\n      action {\n        actionType\n        amount\n      }\n    }\n  }\n}\n\nfragment TransactionActionPayload on TransactionActionRequest {\n  transaction {\n    id\n    reference\n    type\n    amountAuthorized {\n      amount\n      currency\n    }\n    amountCharged {\n      amount\n    }\n    amountVoided {\n      amount\n    }\n    amountRefunded {\n      amount\n    }\n  }\n  action {\n    actionType\n    amount\n  }\n}": types.TransactionActionRequestSubscriptionDocument,
    "mutation CreateWebhooks($targetUrl: String!, $query: String) {\n  createWebhook(\n    data: {name: \"Checkout app payment notifications\", targetUrl: $targetUrl, events: [TRANSACTION_ACTION_REQUEST], isActive: true, query: $query}\n  ) {\n    __typename\n    errors {\n      ...Error\n    }\n  }\n}\n\nquery CheckWebhooks {\n  app {\n    webhooks {\n      id\n      targetUrl\n    }\n  }\n}": types.CreateWebhooksDocument,
    "fragment Address on Address {\n  id\n  phone\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  cityArea\n  postalCode\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  countryArea\n  country {\n    code\n    name\n  }\n  coordinates {\n    latitude\n    longitude\n  }\n}": types.AddressFragmentDoc,
    "fragment Attribute on Attribute {\n  id\n  name\n  slug\n  type\n  visibleInStorefront\n  filterableInDashboard\n  filterableInStorefront\n  unit\n  inputType\n}": types.AttributeFragmentDoc,
    "fragment AttributeDetails on Attribute {\n  ...Attribute\n  ...Metadata\n  availableInGrid\n  inputType\n  entityType\n  unit\n  storefrontSearchPosition\n  valueRequired\n}": types.AttributeDetailsFragmentDoc,
    "fragment AttributeFilterChoice on Value {\n  id\n  name\n  slug\n  translation {\n    name\n  }\n}": types.AttributeFilterChoiceFragmentDoc,
    "fragment AttributeFilter on Attribute {\n  id\n  inputType\n  name\n  translation {\n    id\n    name\n  }\n  slug\n  withChoices\n  values(first: 20) {\n    edges {\n      node {\n        ...AttributeFilterChoice\n      }\n      cursor\n    }\n  }\n}": types.AttributeFilterFragmentDoc,
    "fragment CategoryBasic on Category {\n  id\n  name\n  slug\n  translation {\n    id\n    name\n  }\n}": types.CategoryBasicFragmentDoc,
    "fragment CategoryDetails on Category {\n  id\n  ...CategoryBasic\n  seoTitle\n  seoDescription\n  description\n  translation {\n    id\n    description\n  }\n  backgroundImage {\n    ...Image\n  }\n  ancestors(first: 5) {\n    edges {\n      node {\n        ...CategoryBasic\n      }\n    }\n  }\n  ...Metadata\n}": types.CategoryDetailsFragmentDoc,
    "fragment Channel on Channel {\n  id\n  name\n  slug\n  countries {\n    code\n  }\n  isActive\n  currencyCode\n  defaultCountry {\n    code\n    name\n  }\n  stockSettings {\n    allocationStrategy\n  }\n}": types.ChannelFragmentDoc,
    "fragment CheckoutError on CheckoutError {\n  message\n  field\n  code\n}": types.CheckoutErrorFragmentDoc,
    "fragment Checkout on Checkout {\n  id\n  customerEmail\n  customerFirstName\n  customerLastName\n  customerPhone\n  voucherCode\n  billingAddress {\n    ...Address\n  }\n  shippingAddress {\n    ...Address\n  }\n  fulfillmentMethod {\n    ...FulfillmentMethod\n  }\n  isShippingRequired\n  availableShippingMethods {\n    ...FulfillmentMethod\n  }\n  availablePaymentGateways {\n    id\n    name\n    config {\n      field\n      value\n    }\n  }\n  lines {\n    ...CheckoutLine\n  }\n  discount {\n    ...Money\n  }\n  discountName\n  translatedDiscountName\n  giftCards {\n    ...GiftCard\n  }\n  subtotalPrice {\n    gross {\n      ...Money\n    }\n    net {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  shippingPrice {\n    gross {\n      ...Money\n    }\n  }\n  totalPrice {\n    gross {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  channel {\n    id\n    slug\n  }\n  user {\n    id\n    email\n    firstName\n    lastName\n  }\n  fulfillmentDeadline\n  pointsOfContact {\n    ...PointOfContact\n  }\n  validationErrors {\n    field\n    message\n  }\n}": types.CheckoutFragmentDoc,
    "fragment CheckoutLine on CheckoutLine {\n  id\n  totalPrice {\n    gross {\n      ...Money\n    }\n  }\n  unitPrice {\n    gross {\n      ...Money\n    }\n  }\n  undiscountedUnitPrice {\n    ...Money\n  }\n  product {\n    id\n    name\n    parent {\n      id\n      name\n      translation {\n        id\n        name\n      }\n      slug\n      thumbnail {\n        ...Image\n      }\n      media {\n        alt\n        type\n        url(size: 72)\n      }\n    }\n    attributes(variantSelection: ALL) {\n      values {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n    }\n    pricing {\n      price {\n        gross {\n          ...Money\n        }\n      }\n    }\n    translation {\n      id\n      name\n    }\n    media {\n      alt\n      type\n      url(size: 72)\n    }\n  }\n  quantity\n}": types.CheckoutLineFragmentDoc,
    "fragment CollectionBasic on Collection {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  slug\n}": types.CollectionBasicFragmentDoc,
    "fragment CollectionDetails on Collection {\n  id\n  ...CollectionBasic\n  seoTitle\n  seoDescription\n  description\n  translation {\n    id\n    description\n  }\n  backgroundImage {\n    ...Image\n  }\n  ...Metadata\n  channelListings {\n    id\n    isPublished\n    publishedAt\n    channel {\n      id\n      name\n    }\n  }\n}": types.CollectionDetailsFragmentDoc,
    "fragment FulfillmentMethod on FulfillmentMethod {\n  ... on ShippingMethod {\n    id\n    name\n    description\n    translation {\n      id\n      name\n      description\n    }\n    price {\n      ...Money\n    }\n    minimumDeliveryDays\n    maximumDeliveryDays\n  }\n  ... on Warehouse {\n    id\n  }\n}": types.FulfillmentMethodFragmentDoc,
    "fragment ErrorDetails on CheckoutError {\n  field\n  message\n  code\n}": types.ErrorDetailsFragmentDoc,
    "fragment Error on ErrorInterface {\n  message\n  field\n  code\n}": types.ErrorFragmentDoc,
    "fragment File on File {\n  url\n  contentType\n}": types.FileFragmentDoc,
    "fragment GiftCard on GiftCard {\n  displayCode\n  id\n  currentBalance {\n    ...Money\n  }\n}": types.GiftCardFragmentDoc,
    "fragment HomepageBlock on MenuItem {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  page {\n    id\n    content\n    title\n    translation {\n      content\n      title\n    }\n  }\n}": types.HomepageBlockFragmentDoc,
    "fragment Image on Image {\n  url\n  alt\n}": types.ImageFragmentDoc,
    "fragment MenuItem on MenuItem {\n  id\n  name\n  level\n  translation {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  url\n}": types.MenuItemFragmentDoc,
    "fragment MenuItemWithChildren on MenuItem {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  children {\n    ...MenuItem\n    children {\n      ...MenuItem\n    }\n  }\n  url\n}": types.MenuItemWithChildrenFragmentDoc,
    "fragment MetadataItem on MetadataItem {\n  key\n  value\n}\n\nfragment Metadata on ObjectWithMetadata {\n  metadata {\n    ...MetadataItem\n  }\n  privateMetadata {\n    ...MetadataItem\n  }\n}": types.MetadataItemFragmentDoc,
    "fragment Money on Money {\n  currency\n  amount\n}": types.MoneyFragmentDoc,
    "fragment Order on Order {\n  id\n  createdAt\n  number\n  status\n  userEmail\n  isPaid\n  shippingTaxRate\n  shippingMethodName\n  privateMetafield(key: \"payment\")\n  discounts {\n    type\n    name\n    amount {\n      ...Money\n    }\n  }\n  shippingAddress {\n    ...Address\n  }\n  billingAddress {\n    ...Address\n  }\n  fulfillmentMethod {\n    ...ShippingMethod\n  }\n  total {\n    currency\n    gross {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  voucher {\n    code\n  }\n  shippingPrice {\n    gross {\n      ...Money\n    }\n    net {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  subtotal {\n    gross {\n      ...Money\n    }\n    net {\n      ...Money\n    }\n  }\n  lines {\n    ...OrderLine\n  }\n  totalBalance {\n    ...Money\n  }\n  totalCaptured {\n    ...Money\n  }\n}": types.OrderFragmentDoc,
    "fragment OrderLine on OrderLine {\n  id\n  isShippingRequired\n  productName\n  quantity\n  taxRate\n  quantity\n  quantityFulfilled\n  quantityToFulfill\n  allocations {\n    id\n    quantity\n    warehouse {\n      id\n      name\n    }\n  }\n  product {\n    id\n    name\n    sku\n    preorder {\n      endDate\n    }\n    category {\n      name\n    }\n    productKlass {\n      isDigital\n      kind\n    }\n    trackInventory\n    stocks {\n      ...Stock\n    }\n  }\n  unitPrice {\n    gross {\n      ...Money\n    }\n  }\n  undiscountedUnitPrice {\n    gross {\n      ...Money\n    }\n  }\n  totalPrice {\n    gross {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n}": types.OrderLineFragmentDoc,
    "fragment PageInfo on PageInfo {\n  hasNextPage\n  hasPreviousPage\n  startCursor\n  endCursor\n}": types.PageInfoFragmentDoc,
    "fragment PointOfContact on PointOfContact {\n  id\n  firstName\n  lastName\n  email\n  phone\n  notes\n}": types.PointOfContactFragmentDoc,
    "fragment ProductCard on Product {\n  id\n  slug\n  name\n  translation {\n    id\n    name\n  }\n  thumbnail {\n    ...Image\n  }\n  category {\n    id\n    name\n    translation {\n      id\n      name\n    }\n  }\n  media {\n    url\n    alt\n    type\n  }\n  attributes {\n    slug\n    values {\n      edges {\n        node {\n          name\n        }\n      }\n    }\n  }\n}": types.ProductCardFragmentDoc,
    "fragment ProductVariant on Product {\n  id\n  name\n  slug\n}\n\nfragment ProductAncestor on AbstractProduct {\n  id\n  name\n  slug\n  variants {\n    ...ProductVariant\n  }\n}\n\nfragment BaseProductDetails on Product {\n  id\n  name\n  slug\n  description\n  seoDescription\n  seoTitle\n  isAvailableForPurchase\n  translation {\n    id\n    description\n    name\n  }\n  attributes {\n    ...AttributeDetails\n  }\n  category {\n    ...CategoryBasic\n  }\n  media {\n    ...ProductMediaItem\n  }\n  thumbnail {\n    ...Image\n  }\n  category {\n    name\n  }\n}\n\nfragment AbstractProductDetails on AbstractProduct {\n  ...BaseProductDetails\n  pricing {\n    priceRange {\n      start {\n        gross {\n          ...Money\n        }\n      }\n    }\n  }\n  ancestors {\n    ...ProductAncestor\n  }\n  variants {\n    ...ProductVariant\n  }\n}\n\nfragment ConcreteProductDetails on ConcreteProduct {\n  ...BaseProductDetails\n  quantityAvailable\n  ancestors {\n    ...ProductAncestor\n  }\n  pricing {\n    price {\n      gross {\n        ...Money\n      }\n    }\n  }\n}\n\nfragment ProductDetails on Product {\n  ... on ConcreteProduct {\n    ...ConcreteProductDetails\n  }\n  ... on AbstractProduct {\n    ...AbstractProductDetails\n  }\n}": types.ProductVariantFragmentDoc,
    "fragment ProductMediaItem on ProductMediaItem {\n  id\n  alt\n  sortOrder\n  url\n  type\n  oembedData\n}": types.ProductMediaItemFragmentDoc,
    "fragment SelectedAttributeDetails on Attribute {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  type\n  unit\n  values {\n    edges {\n      node {\n        id\n        name\n        translation {\n          id\n          name\n          richText\n        }\n        value\n      }\n    }\n  }\n}": types.SelectedAttributeDetailsFragmentDoc,
    "fragment ShippingMethod on ShippingMethod {\n  name\n  minimumDeliveryDays\n  maximumDeliveryDays\n}": types.ShippingMethodFragmentDoc,
    "fragment Stock on Stock {\n  id\n  quantity\n  quantityAllocated\n  warehouse {\n    ...Warehouse\n  }\n}": types.StockFragmentDoc,
    "fragment TransactionEvent on TransactionEvent {\n  name\n  reference\n}": types.TransactionEventFragmentDoc,
    "fragment TransactionItem on TransactionItem {\n  id\n  reference\n  amountVoided {\n    ...Money\n  }\n  amountRefunded {\n    ...Money\n  }\n  amountCharged {\n    ...Money\n  }\n  amountAuthorized {\n    ...Money\n  }\n  events {\n    ...TransactionEvent\n  }\n}": types.TransactionItemFragmentDoc,
    "fragment UserBase on User {\n  id\n  email\n  firstName\n  lastName\n  isStaff\n  userPermissions {\n    ...UserPermission\n  }\n  avatar {\n    url\n  }\n}": types.UserBaseFragmentDoc,
    "fragment UserDetails on User {\n  ...UserBase\n  metadata {\n    key\n    value\n  }\n  defaultShippingAddress {\n    ...Address\n  }\n  defaultBillingAddress {\n    ...Address\n  }\n  addresses {\n    ...Address\n  }\n}": types.UserDetailsFragmentDoc,
    "fragment UserPermission on UserPermission {\n  code\n  name\n}": types.UserPermissionFragmentDoc,
    "fragment ValidationRules on AddressValidationData {\n  addressFormat\n  allowedFields\n  requiredFields\n  countryAreaType\n  postalCodeType\n  cityType\n  countryAreaChoices {\n    raw\n    verbose\n  }\n}": types.ValidationRulesFragmentDoc,
    "fragment Warehouse on Warehouse {\n  id\n  name\n}": types.WarehouseFragmentDoc,
    "mutation AddressDelete($id: ID!) {\n  deleteAddress(id: $id) {\n    user {\n      addresses {\n        ...Address\n      }\n    }\n  }\n}": types.AddressDeleteDocument,
    "mutation AddressSetDefault($addressID: ID!, $userID: ID!, $addressType: AddressType!) {\n  setDefaultAddress(addressId: $addressID, type: $addressType, userId: $userID) {\n    __typename\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": types.AddressSetDefaultDocument,
    "mutation CheckoutAddProductLine($checkoutId: ID!, $productId: ID!) {\n  addCheckoutLines(id: $checkoutId, lines: [{quantity: 1, productId: $productId}]) {\n    result {\n      ...Checkout\n    }\n    errors {\n      message\n      ... on CheckoutError {\n        code\n        field\n      }\n    }\n  }\n}": types.CheckoutAddProductLineDocument,
    "mutation CheckoutAddPromoCode($id: ID!, $promoCode: String!) {\n  addPromoCodeToCheckout(id: $id, promoCode: $promoCode) {\n    result {\n      ...Checkout\n    }\n    errors {\n      message\n      field\n    }\n  }\n}": types.CheckoutAddPromoCodeDocument,
    "mutation CheckoutBillingAddressUpdate($id: ID!, $address: AddressUpdateInput!) {\n  updateCheckoutBillingAddress(data: $address, id: $id) {\n    result {\n      ...Checkout\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.CheckoutBillingAddressUpdateDocument,
    "mutation completeCheckout($checkoutId: ID!, $paymentData: JSONString) {\n  completeCheckout(id: $checkoutId, paymentData: $paymentData) {\n    order {\n      id\n      status\n      billingAddress {\n        id\n        ...Address\n      }\n      shippingAddress {\n        id\n        ...Address\n      }\n    }\n    confirmationNeeded\n    confirmationData\n    errors {\n      field\n      message\n    }\n  }\n}": types.CompleteCheckoutDocument,
    "mutation CheckoutContactInfoUpdate($id: ID!, $input: CheckoutContactInfoUpdateInput!) {\n  updateCheckoutContactInfo(data: $input, id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.CheckoutContactInfoUpdateDocument,
    "mutation createCheckoutPayment($checkoutId: ID!, $paymentInput: PaymentInput!) {\n  createCheckoutPayment(id: $checkoutId, data: $paymentInput) {\n    payment {\n      id\n      total {\n        ...Money\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": types.CreateCheckoutPaymentDocument,
    "mutation attachCustomerToCheckout($id: ID!) {\n  attachCustomerToCheckout(id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.AttachCustomerToCheckoutDocument,
    "mutation detachCustomerFromCheckout($id: ID!) {\n  detachCustomerFromCheckout(id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.DetachCustomerFromCheckoutDocument,
    "mutation updateCheckoutFulfillmentMethod($id: ID!, $fulfillmentMethodId: ID!, $fulfillmentDeadline: DateTime) {\n  updateCheckoutFulfillmentMethod(\n    id: $id\n    fulfillmentMethodId: $fulfillmentMethodId\n    fulfillmentDeadline: $fulfillmentDeadline\n  ) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.UpdateCheckoutFulfillmentMethodDocument,
    "mutation CheckoutLineDelete($checkoutId: ID!, $lineId: ID!) {\n  deleteCheckoutLine(id: $checkoutId, lineId: $lineId) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.CheckoutLineDeleteDocument,
    "mutation CheckoutLineUpdate($id: ID!, $lines: [CheckoutLineUpdateInput!]!) {\n  updateCheckoutLines(id: $id, lines: $lines) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.CheckoutLineUpdateDocument,
    "mutation updateCheckoutLines($checkoutId: ID!, $lines: [CheckoutLineUpdateInput!]!) {\n  updateCheckoutLines(id: $checkoutId, lines: $lines) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.UpdateCheckoutLinesDocument,
    "mutation removePromoCodeFromCheckout($id: ID!, $promoCode: String, $promoCodeId: ID) {\n  removePromoCodeFromCheckout(\n    id: $id\n    promoCode: $promoCode\n    promoCodeId: $promoCodeId\n  ) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.RemovePromoCodeFromCheckoutDocument,
    "mutation CheckoutShippingAddressUpdate($id: ID!, $address: AddressUpdateInput!) {\n  updateCheckoutShippingAddress(data: $address, id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.CheckoutShippingAddressUpdateDocument,
    "mutation CheckoutShippingMethodUpdate($id: ID!, $shippingMethodId: ID!) {\n  updateCheckoutShippingMethod(shippingMethodId: $shippingMethodId, id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}": types.CheckoutShippingMethodUpdateDocument,
    "mutation accountConfirm($email: String!, $token: String!) {\n  confirmAccount(email: $email, token: $token) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.AccountConfirmDocument,
    "mutation confirmEmailChange($token: String!, $channel: String!) {\n  confirmEmailChange(token: $token, channel: $channel) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.ConfirmEmailChangeDocument,
    "mutation createAccountAddress($input: AddressUpdateInput!) {\n  addAddress(data: $input) {\n    address {\n      ...Address\n    }\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.CreateAccountAddressDocument,
    "mutation CreateOrder($id: ID!) {\n  createOrderFromCheckout(id: $id) {\n    result {\n      ...Order\n    }\n  }\n}": types.CreateOrderDocument,
    "mutation SetAddressDefault($id: ID!, $type: AddressType!) {\n  setDefaultAddress(addressId: $id, type: $type) {\n    result {\n      addresses {\n        ...Address\n      }\n    }\n    errors {\n      code\n      message\n    }\n  }\n}": types.SetAddressDefaultDocument,
    "mutation deleteAccount($token: String!) {\n  deleteAccount(token: $token) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.DeleteAccountDocument,
    "mutation deleteAddress($addressId: ID!) {\n  deleteAddress(id: $addressId) {\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.DeleteAddressDocument,
    "mutation externalAuthenticationUrl($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  externalAuthenticationUrl(pluginInput: {pluginId: $pluginId, data: $input}) {\n    data\n    errors {\n      ...Error\n    }\n  }\n}": types.ExternalAuthenticationUrlDocument,
    "mutation refreshExternalToken($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  refreshToken(pluginInput: {pluginId: $pluginId, data: $input}) {\n    errors {\n      ...Error\n    }\n    result {\n      accessToken\n      csrfToken\n    }\n  }\n}": types.RefreshExternalTokenDocument,
    "mutation externalRefreshWithUser($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  refreshToken(pluginInput: {pluginId: $pluginId, data: $input}) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.ExternalRefreshWithUserDocument,
    "mutation verifyExternalToken($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  verifyToken(token: \"\", pluginInput: {pluginId: $pluginId, data: $input}) {\n    isValid\n    payload {\n      __typename\n    }\n    user {\n      ...UserDetails\n      userPermissions {\n        code\n        name\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.VerifyExternalTokenDocument,
    "mutation loginWithoutDetails($email: String!, $password: String!) {\n  obtainToken(authInput: {email: $email, password: $password}) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserBase\n      }\n    }\n    errors {\n      message\n      field\n      code\n    }\n  }\n}": types.LoginWithoutDetailsDocument,
    "mutation logout($input: AuthPluginInput) {\n  logout(pluginInput: $input) {\n    data\n    errors {\n      ...Error\n    }\n  }\n}": types.LogoutDocument,
    "mutation ObtainExternalAccessTokens($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  obtainToken(pluginInput: {pluginId: $pluginId, data: $input}) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      message\n      field\n      code\n    }\n  }\n}": types.ObtainExternalAccessTokensDocument,
    "mutation OrderUpdatePaymentMetafield($orderId: ID!, $data: String!) {\n  updatePrivateMetadata(id: $orderId, data: {key: \"payment\", value: $data}) {\n    __typename\n  }\n}": types.OrderUpdatePaymentMetafieldDocument,
    "mutation PasswordChange($newPassword: String!, $oldPassword: String!) {\n  changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {\n    __typename\n    errors {\n      field\n      message\n    }\n  }\n}": types.PasswordChangeDocument,
    "mutation refreshToken($csrfToken: String!, $refreshToken: String, $pluginInput: AuthPluginInput) {\n  refreshToken(\n    csrfToken: $csrfToken\n    refreshToken: $refreshToken\n    pluginInput: $pluginInput\n  ) {\n    result {\n      accessToken\n      csrfToken\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.RefreshTokenDocument,
    "mutation refreshTokenWithUser($csrfToken: String!) {\n  refreshToken(csrfToken: $csrfToken) {\n    result {\n      accessToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.RefreshTokenWithUserDocument,
    "mutation register($input: UserCreationInput!) {\n  createUser(data: $input) {\n    errors {\n      ...Error\n    }\n    requiresConfirmation\n  }\n}": types.RegisterDocument,
    "mutation requestAccountDeletion($channel: String!) {\n  requestAccountDeletion(channel: $channel) {\n    __typename\n  }\n}": types.RequestAccountDeletionDocument,
    "mutation RequestEmailChange($newEmail: String!, $password: String!, $channel: String) {\n  requestEmailChange(newEmail: $newEmail, password: $password, channel: $channel) {\n    result {\n      email\n    }\n    errors {\n      code\n      field\n      message\n    }\n  }\n}": types.RequestEmailChangeDocument,
    "mutation requestPasswordReset($email: String!, $channel: String!) {\n  requestPasswordReset(email: $email, channel: $channel)\n}": types.RequestPasswordResetDocument,
    "mutation setAccountDefaultAddress($id: ID!, $type: AddressType!) {\n  setDefaultAddress(addressId: $id, type: $type) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.SetAccountDefaultAddressDocument,
    "mutation setPassword($token: String!, $email: String!, $password: String!) {\n  setPassword(token: $token, email: $email, password: $password) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.SetPasswordDocument,
    "mutation TransactionCreate($id: ID!, $transaction: TransactionCreationInput!, $transactionEvent: TransactionEventInput) {\n  createTransaction(\n    id: $id\n    transaction: $transaction\n    transactionEvent: $transactionEvent\n  ) {\n    result {\n      id\n    }\n  }\n}": types.TransactionCreateDocument,
    "mutation TransactionUpdate($id: ID!, $transaction: TransactionUpdateInput!, $transactionEvent: TransactionEventInput) {\n  updateTransaction(\n    id: $id\n    transaction: $transaction\n    transactionEvent: $transactionEvent\n  ) {\n    result {\n      id\n    }\n  }\n}": types.TransactionUpdateDocument,
    "mutation updateUser($input: UserUpdateInput!) {\n  updateUser(data: $input) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.UpdateUserDocument,
    "mutation updateUserAddress($input: AddressUpdateInput!, $id: ID!) {\n  updateAddress(data: $input, id: $id) {\n    address {\n      ...Address\n    }\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.UpdateUserAddressDocument,
    "mutation userAddressCreate($address: AddressUpdateInput!, $type: AddressType) {\n  addAddress(type: $type, data: $address) {\n    address {\n      ...Address\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.UserAddressCreateDocument,
    "mutation userAddressDelete($id: ID!) {\n  deleteAddress(id: $id) {\n    address {\n      ...Address\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.UserAddressDeleteDocument,
    "mutation userAddressUpdate($id: ID!, $address: AddressUpdateInput!) {\n  updateAddress(id: $id, data: $address) {\n    address {\n      ...Address\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.UserAddressUpdateDocument,
    "mutation verifyToken($token: String!) {\n  verifyToken(token: $token) {\n    isValid\n    payload {\n      accessToken\n      refreshToken\n    }\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}": types.VerifyTokenDocument,
    "query addressValidationRules($countryCode: CountryCode!) {\n  addressValidationRules(countryCode: $countryCode) {\n    ...ValidationRules\n  }\n}": types.AddressValidationRulesDocument,
    "query App {\n  app {\n    id\n    name\n  }\n}": types.AppDocument,
    "query AvailableShippingMethods($channel: String!) {\n  shop {\n    id\n    availableShippingMethods(channelSlug: $channel) {\n      id\n      translation {\n        id\n        name\n      }\n      price {\n        ...Money\n      }\n    }\n  }\n}": types.AvailableShippingMethodsDocument,
    "query CategoryBySlug($slug: String!) {\n  category(slug: $slug) {\n    ...CategoryDetails\n  }\n}": types.CategoryBySlugDocument,
    "query CategoryPaths($after: String) {\n  categories(first: 100, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}": types.CategoryPathsDocument,
    "query Channel($id: ID!) {\n  channel(id: $id) {\n    ...Channel\n  }\n}": types.ChannelDocument,
    "query ChannelBySlug($slug: String!) {\n  channel(slug: $slug) {\n    ...Channel\n  }\n}": types.ChannelBySlugDocument,
    "query Channels {\n  channels {\n    ...Channel\n  }\n}": types.ChannelsDocument,
    "query Checkout($id: ID!) {\n  checkout(id: $id) {\n    ...Checkout\n  }\n}": types.CheckoutDocument,
    "query CollectionBySlug($slug: String!, $channel: String!) {\n  collection(slug: $slug, channel: $channel) {\n    id\n    ...CollectionDetails\n    backgroundImage {\n      ...Image\n    }\n  }\n}": types.CollectionBySlugDocument,
    "query CollectionPaths($after: String, $channel: String) {\n  collections(first: 20, channel: $channel, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}": types.CollectionPathsDocument,
    "query CurrentUserDetails {\n  me {\n    id\n    lastLogin\n    dateJoined\n    email\n    firstName\n    lastName\n    avatar {\n      ...Image\n    }\n    orders {\n      totalCount\n    }\n  }\n}": types.CurrentUserDetailsDocument,
    "query FilteringAttributes($filter: AttributeFilter!, $channel: String!) {\n  attributes(filters: $filter, first: 100, channel: $channel) {\n    totalCount\n    edges {\n      node {\n        ...AttributeFilter\n      }\n    }\n  }\n}": types.FilteringAttributesDocument,
    "query FooterMenu($channel: String!) {\n  menu(slug: \"footer\", channel: $channel) {\n    id\n    items {\n      children {\n        ...MenuItem\n      }\n      ...MenuItem\n    }\n  }\n}": types.FooterMenuDocument,
    "query HomepageBlocks($slug: String!, $channel: String!) {\n  menu(channel: $channel, slug: $slug) {\n    id\n    name\n    slug\n    items {\n      ...HomepageBlock\n    }\n  }\n}": types.HomepageBlocksDocument,
    "query MainMenu($channel: String!) {\n  menu(slug: \"navbar\", channel: $channel) {\n    id\n    items {\n      ...MenuItemWithChildren\n    }\n  }\n}": types.MainMenuDocument,
    "query Order($id: ID!) {\n  order(id: $id) {\n    ...Order\n  }\n}": types.OrderDocument,
    "query OrderPaymentDetails($id: ID!) {\n  order(id: $id) {\n    authorizeStatus\n    chargeStatus\n    isPaid\n    status\n    privateMetafield(key: \"payment\")\n  }\n}": types.OrderPaymentDetailsDocument,
    "query OrderTransactions($id: ID!) {\n  order(id: $id) {\n    transactions {\n      ...TransactionItem\n    }\n  }\n}": types.OrderTransactionsDocument,
    "query Orders($before: String, $after: String) {\n  me {\n    orders(first: 10, before: $before, after: $after) {\n      edges {\n        cursor\n        node {\n          ...Order\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n}": types.OrdersDocument,
    "query Page($slug: String!) {\n  page(slug: $slug) {\n    id\n    title\n    translation {\n      id\n      title\n      content\n    }\n    seoTitle\n    seoDescription\n    slug\n    createdAt\n    content\n  }\n}": types.PageDocument,
    "query PagePaths($after: String) {\n  pages(first: 100, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}": types.PagePathsDocument,
    "query ProductById($id: ID!, $channel: String!) {\n  product(id: $id, channel: $channel) {\n    ...ProductDetails\n  }\n}": types.ProductByIdDocument,
    "query ProductCollection($before: String, $after: String, $first: Int = 4, $filter: ProductFilter, $sortBy: ProductOrderingInput, $channel: String!) {\n  products(\n    first: $first\n    channel: $channel\n    after: $after\n    before: $before\n    filters: $filter\n    sortBy: $sortBy\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...ProductCard\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": types.ProductCollectionDocument,
    "query ProductPaths($after: String, $channel: String) {\n  products(first: 100, channel: $channel, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}": types.ProductPathsDocument,
    "query User {\n  me {\n    ...UserDetails\n    checkout {\n      ...Checkout\n    }\n  }\n}\n\nquery UserWithoutDetails {\n  me {\n    ...UserBase\n  }\n}": types.UserDocument,
    "query CurrentUserAddresses {\n  me {\n    id\n    addresses {\n      ...Address\n    }\n  }\n}": types.CurrentUserAddressesDocument,
    "\n  fragment Country on Country {\n    name\n    code\n  }\n": types.CountryFragmentDoc,
    "\n  fragment Language on LanguageDisplay {\n    code\n    language\n  }\n": types.LanguageFragmentDoc,
    "\n  fragment ShopSettings on Site {\n    countries {\n      ...Country\n    }\n    allowedStates\n    defaultCountry {\n      ...Country\n    }\n    defaultWeightUnit\n    domain\n    languages {\n      ...Language\n    }\n    logo {\n      url\n      alt\n      height\n      width\n    }\n    name\n    trackInventoryByDefault\n    maxItemCountPerCheckout\n  }\n": types.ShopSettingsFragmentDoc,
    "\n  query ShopInfo {\n    shop {\n      id\n      ...ShopSettings\n      permissions {\n        code\n        name\n      }\n    }\n  }\n": types.ShopInfoDocument,
    "\n  query ShopCountries($filter: CountryFilter) {\n    shop {\n      id\n      countries(filters: $filter) {\n        code\n        name\n      }\n    }\n  }\n": types.ShopCountriesDocument,
    "\n  query MainMenu($channel: String!) {\n    menu(slug: \"navbar\", channel: $channel) {\n      id\n      items {\n        ...MenuItemWithChildren\n      }\n    }\n  }\n": types.MainMenuDocument,
    "\n  query GalleryMedia($first: Int) {\n    media(first: $first) {\n      edges {\n        node {\n          id\n          type\n          title\n          alt\n          file {\n            url\n            contentType\n          }\n          width\n          height\n          aspectRatio\n          placeholder\n        }\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n": types.GalleryMediaDocument,
    "\n  mutation CreateCheckout($email: String, $lines: [CheckoutLineInput!]!, $channel: String!) {\n    createCheckout(data: { channel: $channel, email: $email, lines: $lines }) {\n      result {\n        id\n      }\n      errors {\n        field\n        message\n        code\n      }\n    }\n  }\n": types.CreateCheckoutDocument,
    "\n  query ProductBySlug($slug: String!, $channel: String!) {\n    product(slug: $slug, channel: $channel) {\n      ...ProductDetails\n    }\n  }\n": types.ProductBySlugDocument,
    "\n  fragment App on App {\n    id\n    name\n    createdAt\n    isActive\n    type\n    homepageUrl\n    appUrl\n    manifestUrl\n    configurationUrl\n    supportUrl\n    version\n    accessToken\n    privateMetadata {\n      key\n      value\n    }\n    metadata {\n      key\n      value\n    }\n    tokens {\n      authToken\n      id\n      name\n    }\n    webhooks {\n      ...Webhook\n    }\n  }\n": types.AppFragmentDoc,
    "\n  fragment AppListItem on App {\n    id\n    name\n    isActive\n    type\n    appUrl\n    manifestUrl\n    permissions {\n      ...AppPermission\n    }\n  }\n": types.AppListItemFragmentDoc,
    "\n  fragment AppPermission on Permission {\n    name\n    code\n  }\n": types.AppPermissionFragmentDoc,
    "\n  fragment Value on Value {\n    id\n    name\n    slug\n    file {\n      ...File\n    }\n    reference\n    boolean\n    date\n    dateTime\n    value\n  }\n": types.ValueFragmentDoc,
    "\n  fragment ValueDetails on Value {\n    ...Value\n    plainText\n    richText\n  }\n": types.ValueDetailsFragmentDoc,
    "\n  fragment ValueList on ValueConnection {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      cursor\n      node {\n        ...ValueDetails\n      }\n    }\n  }\n": types.ValueListFragmentDoc,
    "\n  fragment AvailableAttribute on Attribute {\n    id\n    name\n    slug\n  }\n": types.AvailableAttributeFragmentDoc,
    "\n  fragment UserPermission on UserPermission {\n    code\n    name\n  }\n": types.UserPermissionFragmentDoc,
    "\n  fragment User on User {\n    id\n    email\n    firstName\n    lastName\n    isStaff\n    userPermissions {\n      ...UserPermission\n    }\n    avatar {\n      url\n    }\n  }\n": types.UserFragmentDoc,
    "\n  fragment Category on Category {\n    id\n    name\n    children {\n      totalCount\n    }\n    products {\n      totalCount\n    }\n  }\n": types.CategoryFragmentDoc,
    "\n  fragment ChannelError on ChannelError {\n    code\n    field\n    message\n  }\n": types.ChannelErrorFragmentDoc,
    "\n  fragment ChannelDetails on Channel {\n    ...Channel\n    hasOrders\n    warehouses {\n      ...Warehouse\n    }\n  }\n": types.ChannelDetailsFragmentDoc,
    "\n  fragment Collection on Collection {\n    id\n    name\n    channelListings {\n      id\n      isPublished\n      publishedAt\n      channel {\n        id\n        name\n      }\n    }\n  }\n": types.CollectionFragmentDoc,
    "\n  fragment CollectionProduct on Product {\n    id\n    name\n    productKlass {\n      id\n      name\n    }\n    thumbnail {\n      url\n    }\n    channelListings {\n      ...ChannelListingProductWithoutPricing\n    }\n  }\n": types.CollectionProductFragmentDoc,
    "\n  fragment Customer on User {\n    id\n    email\n    firstName\n    lastName\n  }\n": types.CustomerFragmentDoc,
    "\n  fragment CustomerDetails on User {\n    ...Customer\n    ...Metadata\n    dateJoined\n    lastLogin\n    defaultShippingAddress {\n      ...Address\n    }\n    defaultBillingAddress {\n      ...Address\n    }\n    note\n    isActive\n  }\n": types.CustomerDetailsFragmentDoc,
    "\n  fragment CustomerAddresses on User {\n    ...Customer\n    addresses {\n      ...Address\n    }\n    defaultBillingAddress {\n      id\n    }\n    defaultShippingAddress {\n      id\n    }\n  }\n": types.CustomerAddressesFragmentDoc,
    "\n  fragment Sale on Sale {\n    ...Metadata\n    id\n    name\n    type\n    startDate\n    endDate\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n      discountValue\n      currency\n    }\n  }\n": types.SaleFragmentDoc,
    "\n  fragment SaleDetails on Sale {\n    ...Sale\n    productsCount: products {\n      totalCount\n    }\n    collectionsCount: collections {\n      totalCount\n    }\n    categoriesCount: categories {\n      totalCount\n    }\n    products(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeProducts) {\n      edges {\n        node {\n          id\n          name\n          productKlass {\n            id\n            name\n          }\n          thumbnail {\n            url\n          }\n          channelListings {\n            ...ChannelListingProductWithoutPricing\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    categories(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCategories) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    collections(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCollections) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n  }\n": types.SaleDetailsFragmentDoc,
    "\n  fragment Voucher on Voucher {\n    ...Metadata\n    id\n    code\n    startDate\n    endDate\n    usageLimit\n    type\n    discountValueType\n    countries {\n      code\n      name\n    }\n    minCheckoutItemsQuantity\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n      discountValue\n      currency\n      minSpent {\n        amount\n        currency\n      }\n    }\n  }\n": types.VoucherFragmentDoc,
    "\n  fragment VoucherDetails on Voucher {\n    ...Voucher\n    code\n    usageLimit\n    used\n    applyOncePerOrder\n    applyOncePerCustomer\n    onlyForStaff\n    productsCount: products {\n      totalCount\n    }\n    collectionsCount: collections {\n      totalCount\n    }\n    categoriesCount: categories {\n      totalCount\n    }\n    products(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeProducts) {\n      edges {\n        node {\n          id\n          name\n          productKlass {\n            id\n            name\n          }\n          thumbnail {\n            url\n          }\n          channelListings {\n            ...ChannelListingProductWithoutPricing\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    collections(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCollections) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    categories(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCategories) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n  }\n": types.VoucherDetailsFragmentDoc,
    "\n  fragment ProductErrorWithAttributes on ProductError {\n    ...Error\n    attributes\n  }\n": types.ProductErrorWithAttributesFragmentDoc,
    "\n  fragment ProductChannelListingError on ProductChannelListingError {\n    ...Error\n    channels\n  }\n": types.ProductChannelListingErrorFragmentDoc,
    "\n  fragment CollectionChannelListingError on CollectionChannelListingError {\n    ...Error\n    channels\n  }\n": types.CollectionChannelListingErrorFragmentDoc,
    "\n  fragment AccountError on AccountError {\n    ...Error\n    addressType\n  }\n": types.AccountErrorFragmentDoc,
    "\n  fragment DiscountError on DiscountError {\n    ...Error\n    channels\n  }\n": types.DiscountErrorFragmentDoc,
    "\n  fragment OrderError on OrderError {\n    ...Error\n    addressType\n    orderLines\n  }\n": types.OrderErrorFragmentDoc,
    "\n  fragment PageErrorWithAttributes on PageError {\n    ...Error\n    attributes\n  }\n": types.PageErrorWithAttributesFragmentDoc,
    "\n  fragment BulkProductError on BulkProductError {\n    ...Error\n    index\n    channels\n  }\n": types.BulkProductErrorFragmentDoc,
    "\n  fragment BulkStockError on BulkStockError {\n    ...Error\n    index\n  }\n": types.BulkStockErrorFragmentDoc,
    "\n  fragment ShippingChannelsError on ShippingError {\n    ...Error\n    channels\n  }\n": types.ShippingChannelsErrorFragmentDoc,
    "\n  fragment AppError on AppError {\n    ...Error\n    permissions\n  }\n": types.AppErrorFragmentDoc,
    "\n  fragment ProductAttributeAssignmentUpdateError on ProductError {\n    ...Error\n    attributes\n  }\n": types.ProductAttributeAssignmentUpdateErrorFragmentDoc,
    "\n  fragment GiftCardsSettings on GiftCardSettings {\n    expiryType\n    expiryPeriod {\n      type\n      amount\n    }\n  }\n": types.GiftCardsSettingsFragmentDoc,
    "\n  fragment GiftCardEvent on GiftCardEvent {\n    expiryDate\n    oldExpiryDate\n    id\n    date\n    type\n    user {\n      ...UserBase\n      email\n    }\n    app {\n      id\n      name\n    }\n    message\n    email\n    orderId\n    orderNumber\n    tags\n    oldTags\n    balance {\n      initialBalance {\n        ...Money\n      }\n      currentBalance {\n        ...Money\n      }\n      oldInitialBalance {\n        ...Money\n      }\n      oldCurrentBalance {\n        ...Money\n      }\n    }\n  }\n": types.GiftCardEventFragmentDoc,
    "\n  fragment GiftCardData on GiftCard {\n    ...Metadata\n    last4CodeChars\n    boughtInChannel\n    createdBy {\n      ...UserBase\n    }\n    product {\n      id\n      name\n    }\n    createdBy {\n      ...UserBase\n    }\n    usedBy {\n      ...UserBase\n    }\n    usedByEmail\n    createdByEmail\n    app {\n      id\n      name\n    }\n    createdAt\n    expiryDate\n    lastUsedOn\n    isActive\n    initialBalance {\n      ...Money\n    }\n    currentBalance {\n      ...Money\n    }\n\n    id\n    tags {\n      name\n    }\n  }\n": types.GiftCardDataFragmentDoc,
    "\n  fragment CustomerGiftCard on GiftCard {\n    id\n    last4CodeChars\n    expiryDate\n    isActive\n    currentBalance {\n      ...Money\n    }\n  }\n": types.CustomerGiftCardFragmentDoc,
    "\n  fragment Group on Group {\n    id\n    name\n    userCanManage\n    users {\n      id\n      firstName\n      lastName\n    }\n  }\n": types.GroupFragmentDoc,
    "\n  fragment Permission on Permission {\n    code\n    name\n  }\n": types.PermissionFragmentDoc,
    "\n  fragment GroupMember on User {\n    ...StaffMember\n    avatar(size: 48) {\n      url\n    }\n  }\n": types.GroupMemberFragmentDoc,
    "\n  fragment GroupDetails on Group {\n    ...Group\n    permissions {\n      ...Permission\n    }\n    users {\n      ...GroupMember\n    }\n  }\n": types.GroupDetailsFragmentDoc,
    "\n  fragment MediaItem on MediaItem {\n    id\n    title\n    alt\n    # sortOrder\n    file {\n      url\n    }\n    placeholder\n    isPublished\n    type\n  }\n": types.MediaItemFragmentDoc,
    "\n  fragment MediaItemDetails on MediaItem {\n    ...MediaItem\n    ...Metadata\n    file {\n      __typename\n      url\n      contentType\n    }\n    description\n    publishedAt\n  }\n": types.MediaItemDetailsFragmentDoc,
    "\n  fragment Menu on Menu {\n    id\n    name\n    items {\n      id\n    }\n  }\n": types.MenuFragmentDoc,
    "\n  fragment MenuItemNested on MenuItem {\n    ...MenuItem\n    children {\n      ...MenuItem\n      children {\n        ...MenuItem\n        children {\n          ...MenuItem\n          children {\n            ...MenuItem\n            children {\n              ...MenuItem\n              children {\n                ...MenuItem\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.MenuItemNestedFragmentDoc,
    "\n  fragment MenuDetails on Menu {\n    id\n    items {\n      ...MenuItemNested\n    }\n    name\n  }\n": types.MenuDetailsFragmentDoc,
    "\n  fragment OrderEvent on OrderEvent {\n    id\n    amount\n    shippingCostsIncluded\n    date\n    email\n    emailType\n    invoiceNumber\n    discount {\n      valueType\n      value\n      reason\n      amount {\n        amount\n        currency\n      }\n      # oldValueType\n      # oldValue\n      # oldAmount {\n      #   amount\n      #   currency\n      # }\n    }\n    relatedOrder {\n      id\n      number\n    }\n    message\n    quantity\n    transactionReference\n    type\n    user {\n      id\n      email\n      firstName\n      lastName\n    }\n    app {\n      id\n      name\n      appUrl\n    }\n    lines {\n      quantity\n      itemName\n      discount {\n        valueType\n        value\n        reason\n        amount {\n          amount\n          currency\n        }\n        # oldValueType\n        # oldValue\n        # oldAmount {\n        #   amount\n        #   currency\n        # }\n      }\n      orderLine {\n        id\n        productName\n        # productName\n      }\n    }\n  }\n": types.OrderEventFragmentDoc,
    "\n  fragment OrderLine_ on OrderLine {\n    id\n    isShippingRequired\n    allocations {\n      id\n      quantity\n      warehouse {\n        id\n        name\n      }\n    }\n    product {\n      id\n      quantityAvailable\n      preorder {\n        endDate\n      }\n      stocks {\n        ...Stock\n      }\n      parent {\n        id\n        isAvailableForPurchase\n      }\n    }\n    productName\n    productSku\n    quantity\n    quantityFulfilled\n    quantityToFulfill\n    unitDiscount {\n      amount\n      currency\n    }\n    unitDiscountValue\n    unitDiscountReason\n    unitDiscountType\n    undiscountedUnitPrice {\n      currency\n      gross {\n        amount\n        currency\n      }\n      net {\n        amount\n        currency\n      }\n    }\n    unitPrice {\n      gross {\n        amount\n        currency\n      }\n      net {\n        amount\n        currency\n      }\n    }\n    thumbnail(size: 64) {\n      url\n    }\n  }\n": types.OrderLine_FragmentDoc,
    "\n  fragment RefundOrderLine on OrderLine {\n    id\n    productName\n    quantity\n    unitPrice {\n      gross {\n        ...Money\n      }\n    }\n    thumbnail(size: 64) {\n      url\n    }\n  }\n": types.RefundOrderLineFragmentDoc,
    "\n  fragment Fulfillment on Fulfillment {\n    id\n    lines {\n      id\n      quantity\n      orderLine {\n        ...OrderLine\n      }\n    }\n    fulfillmentOrder\n    status\n    trackingNumber\n    warehouse {\n      id\n      name\n    }\n  }\n": types.FulfillmentFragmentDoc,
    "\n  fragment Invoice on Invoice {\n    id\n    number\n    createdAt\n    url\n    status\n  }\n": types.InvoiceFragmentDoc,
    "\n  fragment OrderDetails on Order {\n    id\n    ...Metadata\n    billingAddress {\n      ...Address\n    }\n    giftCards {\n      events {\n        id\n        type\n        orderId\n        balance {\n          initialBalance {\n            ...Money\n          }\n          currentBalance {\n            ...Money\n          }\n          oldInitialBalance {\n            ...Money\n          }\n          oldCurrentBalance {\n            ...Money\n          }\n        }\n      }\n    }\n    isShippingRequired\n    canFinalize\n    createdAt\n    customerNote\n    discounts {\n      id\n      type\n      calculationMode: valueType\n      value\n      reason\n      amount {\n        ...Money\n      }\n    }\n    events {\n      ...OrderEvent\n    }\n    fulfillments {\n      ...Fulfillment\n    }\n    lines {\n      ...OrderLine\n      ...OrderFulfillmentLine\n    }\n    number\n    isPaid\n    paymentStatus\n    shippingAddress {\n      ...Address\n    }\n    fulfillmentMethod {\n      __typename\n      ... on ShippingMethod {\n        id\n      }\n      ... on Warehouse {\n        id\n        clickAndCollectOption\n      }\n    }\n    shippingMethod {\n      id\n    }\n    shippingMethodName\n    collectionPointName\n    shippingPrice {\n      gross {\n        amount\n        currency\n      }\n    }\n    status\n    subtotal {\n      gross {\n        ...Money\n      }\n      net {\n        ...Money\n      }\n    }\n    total {\n      gross {\n        ...Money\n      }\n      net {\n        ...Money\n      }\n      tax {\n        ...Money\n      }\n    }\n    actions\n    totalAuthorized {\n      ...Money\n    }\n    totalCaptured {\n      ...Money\n    }\n    totalBalance {\n      ...Money\n    }\n    undiscountedTotal {\n      net {\n        ...Money\n      }\n      gross {\n        ...Money\n      }\n    }\n    user {\n      id\n      email\n    }\n    userEmail\n    shippingMethods {\n      id\n      name\n      price {\n        ...Money\n      }\n      active\n      message\n    }\n    invoices {\n      ...Invoice\n    }\n    channel {\n      isActive\n      id\n      name\n      currencyCode\n      slug\n      defaultCountry {\n        code\n      }\n    }\n    isPaid\n  }\n": types.OrderDetailsFragmentDoc,
    "\n  fragment OrderSettings on OrderSettings {\n    autoConfirmAllNewOrders\n    autoFulfillNonShippableGiftCard\n  }\n": types.OrderSettingsFragmentDoc,
    "\n  fragment ShopOrderSettings on Site {\n    autoApproveFulfillment\n    fulfillmentAllowUnpaid\n  }\n": types.ShopOrderSettingsFragmentDoc,
    "\n  fragment OrderFulfillmentLine on OrderLine {\n    id\n    isShippingRequired\n    productName\n    quantity\n    allocations {\n      id\n      quantity\n      warehouse {\n        id\n        name\n      }\n    }\n    quantityFulfilled\n    quantityToFulfill\n    product {\n      id\n      name\n      sku\n      preorder {\n        endDate\n      }\n      attributes {\n        values {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n      }\n      stocks {\n        ...Stock\n      }\n      trackInventory\n    }\n    thumbnail(size: 64) {\n      url\n    }\n  }\n": types.OrderFulfillmentLineFragmentDoc,
    "\n  fragment OrderLineStockData on OrderLine {\n    id\n    allocations {\n      quantity\n      warehouse {\n        id\n      }\n    }\n    quantity\n    quantityToFulfill\n    product {\n      stocks {\n        ...Stock\n      }\n    }\n  }\n": types.OrderLineStockDataFragmentDoc,
    "\n  fragment PageKlass on PageKlass {\n    id\n    name\n    hasPages\n  }\n": types.PageKlassFragmentDoc,
    "\n  fragment PageKlassDetails on PageKlass {\n    ...PageKlass\n    ...Metadata\n    attributes {\n      ...Attribute\n    }\n  }\n": types.PageKlassDetailsFragmentDoc,
    "\n  fragment Page on Page {\n    id\n    title\n    slug\n    isPublished\n    content\n  }\n": types.PageFragmentDoc,
    "\n  fragment PageSelectedAttribute on Attribute {\n    id\n    slug\n    name\n    inputType\n    entityType\n    valueRequired\n    unit\n    values(\n      first: $firstValues\n      after: $afterValues\n      last: $lastValues\n      before: $beforeValues\n    ) {\n      ...ValueList\n    }\n    # values {\n    #   edges {\n    #     node {\n    #       ...ValueDetails\n    #     }\n    #   }\n    # }\n  }\n": types.PageSelectedAttributeFragmentDoc,
    "\n  fragment PageAttributes on Page {\n    attributes {\n      ...PageSelectedAttribute\n    }\n    pageKlass {\n      id\n      name\n      attributes {\n        id\n        name\n        inputType\n        entityType\n        valueRequired\n        values(\n          first: $firstValues\n          after: $afterValues\n          last: $lastValues\n          before: $beforeValues\n        ) {\n          ...ValueList\n        }\n      }\n    }\n  }\n": types.PageAttributesFragmentDoc,
    "\n  fragment PageDetails on Page {\n    ...Page\n    ...PageAttributes\n    ...Metadata\n    content\n    seoTitle\n    seoDescription\n    publishedAt\n  }\n": types.PageDetailsFragmentDoc,
    "\n  fragment ConfigurationItem on ConfigurationItem {\n    name\n    value\n    type\n    helpText\n    label\n  }\n": types.ConfigurationItemFragmentDoc,
    "\n  fragment PluginConfigurationBase on PluginConfiguration {\n    active\n    channel {\n      id\n      name\n      slug\n    }\n  }\n": types.PluginConfigurationBaseFragmentDoc,
    "\n  fragment PluginConfigurationExtended on PluginConfiguration {\n    ...PluginConfigurationBase\n    configuration {\n      ...ConfigurationItem\n    }\n  }\n": types.PluginConfigurationExtendedFragmentDoc,
    "\n  fragment PluginBase on Plugin {\n    id\n    name\n    description\n    channelConfigurations {\n      ...PluginConfigurationBase\n    }\n    globalConfiguration {\n      ...PluginConfigurationBase\n    }\n  }\n": types.PluginBaseFragmentDoc,
    "\n  fragment PluginsDetails on Plugin {\n    id\n    name\n    description\n    globalConfiguration {\n      ...PluginConfigurationExtended\n    }\n    channelConfigurations {\n      ...PluginConfigurationExtended\n    }\n  }\n": types.PluginsDetailsFragmentDoc,
    "\n  fragment ProductKlass on ProductKlass {\n    id\n    name\n    kind\n    hasVariants\n    isShippingRequired\n    taxClass {\n      id\n      name\n    }\n  }\n": types.ProductKlassFragmentDoc,
    "\n  fragment ProductKlassDetails on ProductKlass {\n    ...ProductKlass\n    ...Metadata\n    productAttributes {\n      ...Attribute\n    }\n    variantAttributes {\n      ...Attribute\n    }\n    productVariantAttributeAssignments {\n      attribute {\n        ...Attribute\n      }\n      variantSelection\n    }\n    weight\n    # {\n    #   unit\n    #   value\n    # }\n  }\n": types.ProductKlassDetailsFragmentDoc,
    "\n  fragment Stock on Stock {\n    id\n    quantity\n    quantityAllocated\n    warehouse {\n      ...Warehouse\n    }\n  }\n": types.StockFragmentDoc,
    "\n  fragment Preorder on PreorderData {\n    globalThreshold\n    globalSoldUnits\n    endDate\n  }\n": types.PreorderFragmentDoc,
    "\n  fragment PriceRange on TaxedMoneyRange {\n    start {\n      net {\n        ...Money\n      }\n    }\n    stop {\n      net {\n        ...Money\n      }\n    }\n  }\n": types.PriceRangeFragmentDoc,
    "\n  fragment ChannelListingProductWithoutPricing on ProductChannelListing {\n    id\n    isPublished\n    publishedAt\n    isAvailableForPurchase\n    visibleInListings\n    channel {\n      id\n      name\n      currencyCode\n    }\n  }\n": types.ChannelListingProductWithoutPricingFragmentDoc,
    "\n  fragment ChannelListingProduct on ProductChannelListing {\n    ...ChannelListingProductWithoutPricing\n    pricing {\n      priceRange {\n        ...PriceRange\n      }\n    }\n  }\n": types.ChannelListingProductFragmentDoc,
    "\n  fragment ProductWithChannelListings on Product {\n    id\n    name\n    thumbnail {\n      url\n    }\n    productKlass {\n      id\n      name\n      hasVariants\n    }\n    channelListings {\n      ...ChannelListingProductWithoutPricing\n      pricing @include(if: $hasChannel) {\n        priceRange {\n          ...PriceRange\n        }\n      }\n    }\n  }\n": types.ProductWithChannelListingsFragmentDoc,
    "\n  fragment ProductAttributes on Product {\n    id\n    attributes {\n      id\n      slug\n      name\n      inputType\n      entityType\n      valueRequired\n      unit\n      values(\n        first: $firstValues\n        after: $afterValues\n        last: $lastValues\n        before: $beforeValues\n      ) {\n        ...ValueList\n      }\n      # values {\n      #   ...ValueDetails\n      # }\n    }\n    productKlass {\n      id\n      variantAttributes {\n        id\n        name\n        inputType\n        valueRequired\n        unit\n        values(\n          first: $firstValues\n          after: $afterValues\n          last: $lastValues\n          before: $beforeValues\n        ) {\n          ...ValueList\n        }\n      }\n    }\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n    }\n  }\n": types.ProductAttributesFragmentDoc,
    "\n  fragment ProductDetailsVariant on Product {\n    id\n    ... on ConcreteProduct {\n      sku\n      trackInventory\n      quantityLimitPerCustomer\n    }\n    name\n    attributes {\n      id\n      name\n      values {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n    media {\n      url(size: 200)\n    }\n    stocks {\n      ...Stock\n    }\n    preorder {\n      ...Preorder\n    }\n    channelListings {\n      ...ChannelListingProduct\n    }\n  }\n": types.ProductDetailsVariantFragmentDoc,
    "\n  fragment Product on Product {\n    id\n    ...ProductAttributes\n    ...Metadata\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n    rating\n    defaultVariant {\n      id\n    }\n    category {\n      id\n      name\n    }\n    collections {\n      id\n      name\n    }\n    channelListings {\n      ...ChannelListingProductWithoutPricing\n    }\n    media {\n      ...ProductMediaItem\n    }\n    isAvailableForPurchase\n    variants {\n      ...ProductDetailsVariant\n    }\n    productKlass {\n      id\n      name\n      hasVariants\n    }\n    weight\n    taxClass {\n      id\n      name\n    }\n    name\n    parent {\n      id\n      defaultVariant {\n        id\n      }\n      media {\n        ...ProductMediaItem\n      }\n      name\n      thumbnail {\n        url\n      }\n      channelListings {\n        id\n        publishedAt\n        isPublished\n        channel {\n          id\n          name\n          currencyCode\n        }\n      }\n      variants {\n        id\n        name\n        ... on ConcreteProduct {\n            sku\n        }\n        media {\n          id\n          url\n          type\n          oembedData\n        }\n      }\n      defaultVariant {\n        id\n      }\n    }\n    selectionAttributes: attributes(variantSelection: VARIANT_SELECTION) {\n      ...Attribute\n    }\n    nonSelectionAttributes: attributes(variantSelection: NOT_VARIANT_SELECTION) {\n      ...Attribute\n    }\n    media {\n      id\n      url\n      type\n      # oembedData\n    }\n    channelListings {\n      ...ChannelListingProduct\n    }\n    ... on ConcreteProduct {\n      trackInventory\n      sku\n      quantityLimitPerCustomer\n    }\n    stocks {\n      ...Stock\n    }\n    preorder {\n      ...Preorder\n    }\n  }\n": types.ProductFragmentDoc,
    "\n  fragment ProductAttribute on Attribute {\n    id\n    name\n    slug\n    inputType\n    entityType\n    valueRequired\n    unit\n    values(\n      first: $firstValues\n      after: $afterValues\n      last: $lastValues\n      before: $beforeValues\n    ) {\n      ...ValueList\n    }\n  }\n": types.ProductAttributeFragmentDoc,
    "\n  fragment ExportFile on ExportFile {\n    id\n    status\n    url\n  }\n": types.ExportFileFragmentDoc,
    "\n  fragment ProductListAttribute on Attribute {\n    id\n    values {\n      edges {\n        node {\n          ...Value\n        }\n      }\n    }\n  }\n": types.ProductListAttributeFragmentDoc,
    "\n  fragment ShippingZone on ShippingZone {\n    ...Metadata\n    id\n    countries {\n      code\n      name\n    }\n    name\n    description\n  }\n": types.ShippingZoneFragmentDoc,
    "\n  fragment ShippingMethodWithPostalCodes on ShippingMethod {\n    id\n    postalCodeRules {\n      id\n      inclusionType\n      start\n      end\n    }\n  }\n": types.ShippingMethodWithPostalCodesFragmentDoc,
    "\n  fragment ShippingMethod_ on ShippingMethod {\n    ...ShippingMethodWithPostalCodes\n    ...Metadata\n    taxClass {\n      name\n      id\n    }\n    minimumOrderWeight\n    # {\n    #   unit\n    #   value\n    # }\n    maximumOrderWeight\n    # {\n    #   unit\n    #   value\n    # }\n    minimumDeliveryDays\n    maximumDeliveryDays\n    name\n    description\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n      price {\n        ...Money\n      }\n      minimumOrderPrice {\n        ...Money\n      }\n      maximumOrderPrice {\n        ...Money\n      }\n    }\n  }\n": types.ShippingMethod_FragmentDoc,
    "\n  fragment ShippingMethodWithExcludedProducts on ShippingMethod {\n    ...ShippingMethod\n    excludedProducts(before: $before, after: $after, first: $first, last: $last) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n      edges {\n        node {\n          id\n          name\n          thumbnail {\n            url\n          }\n        }\n      }\n    }\n  }\n": types.ShippingMethodWithExcludedProductsFragmentDoc,
    "\n  fragment ShippingZoneDetails on ShippingZone {\n    ...ShippingZone\n    shippingMethods {\n      ...ShippingMethod\n    }\n    warehouses {\n      id\n      name\n    }\n  }\n": types.ShippingZoneDetailsFragmentDoc,
    "\n  fragment CountryWithCode on Country {\n    name\n    code\n  }\n": types.CountryWithCodeFragmentDoc,
    "\n  fragment LimitInfo on Limits {\n    channels @include(if: $channels)\n    orders @include(if: $orders)\n    productVariants @include(if: $productVariants)\n    staffUsers @include(if: $staffUsers)\n    warehouses @include(if: $warehouses)\n  }\n\n  fragment ShopLimit on Site {\n    limits {\n      currentUsage {\n        ...LimitInfo\n      }\n      allowedUsage {\n        ...LimitInfo\n      }\n    }\n  }\n": types.LimitInfoFragmentDoc,
    "\n  fragment Shop on Site {\n    companyAddress {\n      ...Address\n    }\n    countries {\n      code\n      name\n    }\n    customerSetPasswordUrl\n    defaultMailSenderAddress\n    defaultMailSenderName\n    description\n    domain\n    name\n    reserveStockDurationAnonymousUser\n    reserveStockDurationAuthenticatedUser\n    maxItemCountPerCheckout\n  }\n": types.ShopFragmentDoc,
    "\n  fragment StaffMember on User {\n    id\n    email\n    firstName\n    isActive\n    lastName\n  }\n": types.StaffMemberFragmentDoc,
    "\n  fragment StaffMemberDetails on User {\n    ...StaffMember\n    groups {\n      id\n      name\n      userCanManage\n    }\n    userPermissions {\n      code\n      name\n    }\n    avatar(size: 120) {\n      url\n    }\n  }\n": types.StaffMemberDetailsFragmentDoc,
    "\n  fragment TaxedMoney on TaxedMoney {\n    net {\n      ...Money\n    }\n    gross {\n      ...Money\n    }\n  }\n": types.TaxedMoneyFragmentDoc,
    "\n  fragment TaxConfigurationPerCountry on TaxConfigurationPerCountry {\n    country {\n      ...CountryWithCode\n    }\n    chargeTaxes\n    taxCalculationStrategy\n    displayGrossPrices\n  }\n": types.TaxConfigurationPerCountryFragmentDoc,
    "\n  fragment TaxConfiguration on TaxConfiguration {\n    id\n    channel {\n      id\n      name\n    }\n    displayGrossPrices\n    pricesEnteredWithTax\n    chargeTaxes\n    taxCalculationStrategy\n    countries {\n      ...TaxConfigurationPerCountry\n    }\n  }\n": types.TaxConfigurationFragmentDoc,
    "\n  fragment TaxCountryConfiguration on TaxCountryConfiguration {\n    country {\n      ...CountryWithCode\n    }\n    taxClassCountryRates {\n      rate\n      taxClass {\n        id\n        name\n      }\n    }\n  }\n": types.TaxCountryConfigurationFragmentDoc,
    "\n  fragment TaxRate on TaxClassCountryRate {\n    country {\n      ...CountryWithCode\n    }\n    rate\n  }\n": types.TaxRateFragmentDoc,
    "\n  fragment TaxClassBase on TaxClass {\n    id\n    name\n  }\n": types.TaxClassBaseFragmentDoc,
    "\n  fragment TaxClass on TaxClass {\n    ...TaxClassBase\n    countries {\n      ...TaxRate\n    }\n    ...Metadata\n  }\n": types.TaxClassFragmentDoc,
    "\n  fragment TimePeriod on TimePeriod {\n    amount\n    type\n  }\n": types.TimePeriodFragmentDoc,
    "\n  fragment ValueTranslatable on ValueTranslation {\n    id\n    name\n    plainText\n    richText\n    value {\n      id\n      name\n    }\n    attribute {\n      id\n      name\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    #   plainText\n    #   richText\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n": types.ValueTranslatableFragmentDoc,
    "\n  fragment CategoryTranslation on CategoryTranslation {\n    id\n    description\n    language {\n      language\n    }\n    name\n    seoDescription\n    seoTitle\n    # translation(languageCode: $language) {\n    #   id\n    #   description\n    #   language {\n    #     language\n    #   }\n    #   name\n    #   seoDescription\n    #   seoTitle\n    # }\n    category {\n      id\n      name\n      description\n      seoDescription\n      seoTitle\n    }\n  }\n": types.CategoryTranslationFragmentDoc,
    "\n  fragment CollectionTranslation on CollectionTranslation {\n    collection {\n      id\n      name\n      description\n      seoDescription\n      seoTitle\n    }\n    id\n    description\n    language {\n      language\n    }\n    name\n    seoDescription\n    seoTitle\n    # translation(languageCode: $language) {\n    #   id\n    #   description\n    #   language {\n    #     language\n    #   }\n    #   name\n    #   seoDescription\n    #   seoTitle\n    # }\n  }\n": types.CollectionTranslationFragmentDoc,
    "\n  fragment ProductTranslation on ProductTranslation {\n    product {\n      id\n      name\n      description\n      seoDescription\n      seoTitle\n    }\n    # values {\n    #   ...ValueTranslatable\n    # }\n    id\n    seoTitle\n    seoDescription\n    name\n    description\n    language {\n      code\n      language\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   seoTitle\n    #   seoDescription\n    #   name\n    #   description\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n": types.ProductTranslationFragmentDoc,
    "\n  fragment ProductVariantTranslation on ProductTranslation {\n    id\n    name\n    language {\n      code\n      language\n    }\n    product {\n      id\n      name\n    }\n    # values {\n    #   ...ValueTranslatable\n    # }\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n": types.ProductVariantTranslationFragmentDoc,
    "\n  fragment SaleTranslation on SaleTranslation {\n    id\n    name\n    language {\n      code\n      language\n    }\n    sale {\n      id\n      name\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     code\n    #     language\n    #   }\n    #   name\n    # }\n  }\n": types.SaleTranslationFragmentDoc,
    "\n  fragment VoucherTranslation on VoucherTranslation {\n    id\n    language {\n      code\n      language\n    }\n    name\n    voucher {\n      id\n      name\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     code\n    #     language\n    #   }\n    #   name\n    # }\n  }\n": types.VoucherTranslationFragmentDoc,
    "\n  fragment ShippingMethodTranslation on ShippingMethodTranslation {\n    id\n    language {\n      code\n      language\n    }\n    name\n    description\n    shippingMethod {\n      id\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     code\n    #     language\n    #   }\n    #   name\n    #   description\n    # }\n  }\n": types.ShippingMethodTranslationFragmentDoc,
    "\n  fragment PageTranslation on PageTranslation {\n    id\n    content\n    seoDescription\n    seoTitle\n    title\n    language {\n      code\n      language\n    }\n    page {\n      id\n      content\n      seoDescription\n      seoTitle\n      title\n    }\n    # values {\n    #   ...ValueTranslatable\n    # }\n  }\n": types.PageTranslationFragmentDoc,
    "\n  fragment PageTranslatable on PageTranslation {\n    id\n    content\n    seoDescription\n    seoTitle\n    title\n    language {\n      code\n      language\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   content\n    #   seoDescription\n    #   seoTitle\n    #   title\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n": types.PageTranslatableFragmentDoc,
    "\n  fragment AttributeChoicesTranslation on ValueConnection {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      cursor\n      node {\n        id\n        name\n        plainText\n        richText\n        inputType\n        translation(languageCode: $language) {\n          id\n          name\n          plainText\n          richText\n        }\n      }\n    }\n  }\n": types.AttributeChoicesTranslationFragmentDoc,
    "\n  fragment AttributeTranslation on AttributeTranslation {\n    id\n    name\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    # }\n    attribute {\n      id\n      name\n      inputType\n    }\n  }\n": types.AttributeTranslationFragmentDoc,
    "\n  fragment AttributeTranslationDetails on AttributeTranslation {\n    id\n    name\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    # }\n    attribute {\n      id\n      name\n      inputType\n      withChoices\n      values(\n        first: $firstValues\n        after: $afterValues\n        last: $lastValues\n        before: $beforeValues\n      ) {\n        ...AttributeChoicesTranslation\n      }\n    }\n  }\n": types.AttributeTranslationDetailsFragmentDoc,
    "\n  fragment MenuItemTranslation on MenuItemTranslation {\n    id\n    language {\n      language\n    }\n    name\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     language\n    #   }\n    #   name\n    # }\n    menuItem {\n      id\n      name\n    }\n  }\n": types.MenuItemTranslationFragmentDoc,
    "\n  fragment Warehouse on Warehouse {\n    id\n    name\n  }\n": types.WarehouseFragmentDoc,
    "\n  fragment WarehouseWithShipping on Warehouse {\n    ...Warehouse\n    shippingZones(first: 100) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.WarehouseWithShippingFragmentDoc,
    "\n  fragment WarehouseDetails on Warehouse {\n    isPrivate\n    clickAndCollectOption\n    ...WarehouseWithShipping\n    address {\n      ...Address\n    }\n  }\n": types.WarehouseDetailsFragmentDoc,
    "\n  fragment Webhook on Webhook {\n    id\n    name\n    isActive\n    app {\n      id\n      name\n    }\n  }\n": types.WebhookFragmentDoc,
    "\n  fragment WebhookDetails on Webhook {\n    ...Webhook\n    syncEvents {\n      eventType\n    }\n    asyncEvents {\n      eventType\n    }\n    secretKey\n    targetUrl\n  }\n": types.WebhookDetailsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($email: String!, $password: String!) {\n    obtainToken(authInput: { email: $email, password: $password }) {\n      result {\n        accessToken\n        refreshToken\n        csrfToken\n        user {\n          ...UserDetails\n        }\n      }\n      errors {\n        message\n        field\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation login($email: String!, $password: String!) {\n    obtainToken(authInput: { email: $email, password: $password }) {\n      result {\n        accessToken\n        refreshToken\n        csrfToken\n        user {\n          ...UserDetails\n        }\n      }\n      errors {\n        message\n        field\n        code\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AvailableExternalAuthentications {\n    shop {\n      id\n      availableExternalAuthentications {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query AvailableExternalAuthentications {\n    shop {\n      id\n      availableExternalAuthentications {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation FileUpload($file: Upload!) {\n  uploadFile(file: $file) {\n    result {\n      ...File\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation FileUpload($file: Upload!) {\n  uploadFile(file: $file) {\n    result {\n      ...File\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PublicMetafields($id: ID!, $keys: [String!]!) {\n  app(id: $id) {\n    id\n    metafields(keys: $keys)\n  }\n}\n\nquery PrivateMetafields($id: ID!, $keys: [String!]!) {\n  app(id: $id) {\n    id\n    privateMetafields(keys: $keys)\n  }\n}\n\nquery PublicMetafieldsInferred($keys: [String!]!) {\n  app {\n    id\n    metafields(keys: $keys)\n  }\n}\n\nquery PrivateMetafieldsInferred($keys: [String!]!) {\n  app {\n    id\n    privateMetafields(keys: $keys)\n  }\n}\n\nmutation UpdatePublicMetadata($id: ID!, $input: [MetadataInput!]!, $keys: [String!]!) {\n  updateMetadata(id: $id, data: $input) {\n    result {\n      metafields(keys: $keys)\n    }\n    errors {\n      ...Error\n    }\n  }\n}\n\nmutation UpdatePrivateMetadata($id: ID!, $input: [MetadataInput!]!, $keys: [String!]!) {\n  updatePrivateMetadata(id: $id, data: $input) {\n    result {\n      privateMetafields(keys: $keys)\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["query PublicMetafields($id: ID!, $keys: [String!]!) {\n  app(id: $id) {\n    id\n    metafields(keys: $keys)\n  }\n}\n\nquery PrivateMetafields($id: ID!, $keys: [String!]!) {\n  app(id: $id) {\n    id\n    privateMetafields(keys: $keys)\n  }\n}\n\nquery PublicMetafieldsInferred($keys: [String!]!) {\n  app {\n    id\n    metafields(keys: $keys)\n  }\n}\n\nquery PrivateMetafieldsInferred($keys: [String!]!) {\n  app {\n    id\n    privateMetafields(keys: $keys)\n  }\n}\n\nmutation UpdatePublicMetadata($id: ID!, $input: [MetadataInput!]!, $keys: [String!]!) {\n  updateMetadata(id: $id, data: $input) {\n    result {\n      metafields(keys: $keys)\n    }\n    errors {\n      ...Error\n    }\n  }\n}\n\nmutation UpdatePrivateMetadata($id: ID!, $input: [MetadataInput!]!, $keys: [String!]!) {\n  updatePrivateMetadata(id: $id, data: $input) {\n    result {\n      privateMetafields(keys: $keys)\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query TransactionProcessedEvents($id: ID!) {\n  transaction(id: $id) {\n    processedEvents: metafield(key: \"processedEvents\")\n  }\n}\n\nmutation TransactionUpdateProcessedEvents($id: ID!, $input: String!) {\n  updateMetadata(id: $id, data: {key: \"processedEvents\", value: $input}) {\n    __typename\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["query TransactionProcessedEvents($id: ID!) {\n  transaction(id: $id) {\n    processedEvents: metafield(key: \"processedEvents\")\n  }\n}\n\nmutation TransactionUpdateProcessedEvents($id: ID!, $input: String!) {\n  updateMetadata(id: $id, data: {key: \"processedEvents\", value: $input}) {\n    __typename\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription TransactionActionRequestSubscription {\n  event {\n    ... on TransactionActionRequest {\n      transaction {\n        id\n        reference\n        type\n        amountAuthorized {\n          amount\n          currency\n        }\n        amountCharged {\n          amount\n        }\n        amountVoided {\n          amount\n        }\n        amountRefunded {\n          amount\n        }\n      }\n      action {\n        actionType\n        amount\n      }\n    }\n  }\n}\n\nfragment TransactionActionPayload on TransactionActionRequest {\n  transaction {\n    id\n    reference\n    type\n    amountAuthorized {\n      amount\n      currency\n    }\n    amountCharged {\n      amount\n    }\n    amountVoided {\n      amount\n    }\n    amountRefunded {\n      amount\n    }\n  }\n  action {\n    actionType\n    amount\n  }\n}"): (typeof documents)["subscription TransactionActionRequestSubscription {\n  event {\n    ... on TransactionActionRequest {\n      transaction {\n        id\n        reference\n        type\n        amountAuthorized {\n          amount\n          currency\n        }\n        amountCharged {\n          amount\n        }\n        amountVoided {\n          amount\n        }\n        amountRefunded {\n          amount\n        }\n      }\n      action {\n        actionType\n        amount\n      }\n    }\n  }\n}\n\nfragment TransactionActionPayload on TransactionActionRequest {\n  transaction {\n    id\n    reference\n    type\n    amountAuthorized {\n      amount\n      currency\n    }\n    amountCharged {\n      amount\n    }\n    amountVoided {\n      amount\n    }\n    amountRefunded {\n      amount\n    }\n  }\n  action {\n    actionType\n    amount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateWebhooks($targetUrl: String!, $query: String) {\n  createWebhook(\n    data: {name: \"Checkout app payment notifications\", targetUrl: $targetUrl, events: [TRANSACTION_ACTION_REQUEST], isActive: true, query: $query}\n  ) {\n    __typename\n    errors {\n      ...Error\n    }\n  }\n}\n\nquery CheckWebhooks {\n  app {\n    webhooks {\n      id\n      targetUrl\n    }\n  }\n}"): (typeof documents)["mutation CreateWebhooks($targetUrl: String!, $query: String) {\n  createWebhook(\n    data: {name: \"Checkout app payment notifications\", targetUrl: $targetUrl, events: [TRANSACTION_ACTION_REQUEST], isActive: true, query: $query}\n  ) {\n    __typename\n    errors {\n      ...Error\n    }\n  }\n}\n\nquery CheckWebhooks {\n  app {\n    webhooks {\n      id\n      targetUrl\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Address on Address {\n  id\n  phone\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  cityArea\n  postalCode\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  countryArea\n  country {\n    code\n    name\n  }\n  coordinates {\n    latitude\n    longitude\n  }\n}"): (typeof documents)["fragment Address on Address {\n  id\n  phone\n  firstName\n  lastName\n  companyName\n  streetAddress1\n  streetAddress2\n  city\n  cityArea\n  postalCode\n  isDefaultBillingAddress\n  isDefaultShippingAddress\n  countryArea\n  country {\n    code\n    name\n  }\n  coordinates {\n    latitude\n    longitude\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Attribute on Attribute {\n  id\n  name\n  slug\n  type\n  visibleInStorefront\n  filterableInDashboard\n  filterableInStorefront\n  unit\n  inputType\n}"): (typeof documents)["fragment Attribute on Attribute {\n  id\n  name\n  slug\n  type\n  visibleInStorefront\n  filterableInDashboard\n  filterableInStorefront\n  unit\n  inputType\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AttributeDetails on Attribute {\n  ...Attribute\n  ...Metadata\n  availableInGrid\n  inputType\n  entityType\n  unit\n  storefrontSearchPosition\n  valueRequired\n}"): (typeof documents)["fragment AttributeDetails on Attribute {\n  ...Attribute\n  ...Metadata\n  availableInGrid\n  inputType\n  entityType\n  unit\n  storefrontSearchPosition\n  valueRequired\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AttributeFilterChoice on Value {\n  id\n  name\n  slug\n  translation {\n    name\n  }\n}"): (typeof documents)["fragment AttributeFilterChoice on Value {\n  id\n  name\n  slug\n  translation {\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AttributeFilter on Attribute {\n  id\n  inputType\n  name\n  translation {\n    id\n    name\n  }\n  slug\n  withChoices\n  values(first: 20) {\n    edges {\n      node {\n        ...AttributeFilterChoice\n      }\n      cursor\n    }\n  }\n}"): (typeof documents)["fragment AttributeFilter on Attribute {\n  id\n  inputType\n  name\n  translation {\n    id\n    name\n  }\n  slug\n  withChoices\n  values(first: 20) {\n    edges {\n      node {\n        ...AttributeFilterChoice\n      }\n      cursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CategoryBasic on Category {\n  id\n  name\n  slug\n  translation {\n    id\n    name\n  }\n}"): (typeof documents)["fragment CategoryBasic on Category {\n  id\n  name\n  slug\n  translation {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CategoryDetails on Category {\n  id\n  ...CategoryBasic\n  seoTitle\n  seoDescription\n  description\n  translation {\n    id\n    description\n  }\n  backgroundImage {\n    ...Image\n  }\n  ancestors(first: 5) {\n    edges {\n      node {\n        ...CategoryBasic\n      }\n    }\n  }\n  ...Metadata\n}"): (typeof documents)["fragment CategoryDetails on Category {\n  id\n  ...CategoryBasic\n  seoTitle\n  seoDescription\n  description\n  translation {\n    id\n    description\n  }\n  backgroundImage {\n    ...Image\n  }\n  ancestors(first: 5) {\n    edges {\n      node {\n        ...CategoryBasic\n      }\n    }\n  }\n  ...Metadata\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Channel on Channel {\n  id\n  name\n  slug\n  countries {\n    code\n  }\n  isActive\n  currencyCode\n  defaultCountry {\n    code\n    name\n  }\n  stockSettings {\n    allocationStrategy\n  }\n}"): (typeof documents)["fragment Channel on Channel {\n  id\n  name\n  slug\n  countries {\n    code\n  }\n  isActive\n  currencyCode\n  defaultCountry {\n    code\n    name\n  }\n  stockSettings {\n    allocationStrategy\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CheckoutError on CheckoutError {\n  message\n  field\n  code\n}"): (typeof documents)["fragment CheckoutError on CheckoutError {\n  message\n  field\n  code\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Checkout on Checkout {\n  id\n  customerEmail\n  customerFirstName\n  customerLastName\n  customerPhone\n  voucherCode\n  billingAddress {\n    ...Address\n  }\n  shippingAddress {\n    ...Address\n  }\n  fulfillmentMethod {\n    ...FulfillmentMethod\n  }\n  isShippingRequired\n  availableShippingMethods {\n    ...FulfillmentMethod\n  }\n  availablePaymentGateways {\n    id\n    name\n    config {\n      field\n      value\n    }\n  }\n  lines {\n    ...CheckoutLine\n  }\n  discount {\n    ...Money\n  }\n  discountName\n  translatedDiscountName\n  giftCards {\n    ...GiftCard\n  }\n  subtotalPrice {\n    gross {\n      ...Money\n    }\n    net {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  shippingPrice {\n    gross {\n      ...Money\n    }\n  }\n  totalPrice {\n    gross {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  channel {\n    id\n    slug\n  }\n  user {\n    id\n    email\n    firstName\n    lastName\n  }\n  fulfillmentDeadline\n  pointsOfContact {\n    ...PointOfContact\n  }\n  validationErrors {\n    field\n    message\n  }\n}"): (typeof documents)["fragment Checkout on Checkout {\n  id\n  customerEmail\n  customerFirstName\n  customerLastName\n  customerPhone\n  voucherCode\n  billingAddress {\n    ...Address\n  }\n  shippingAddress {\n    ...Address\n  }\n  fulfillmentMethod {\n    ...FulfillmentMethod\n  }\n  isShippingRequired\n  availableShippingMethods {\n    ...FulfillmentMethod\n  }\n  availablePaymentGateways {\n    id\n    name\n    config {\n      field\n      value\n    }\n  }\n  lines {\n    ...CheckoutLine\n  }\n  discount {\n    ...Money\n  }\n  discountName\n  translatedDiscountName\n  giftCards {\n    ...GiftCard\n  }\n  subtotalPrice {\n    gross {\n      ...Money\n    }\n    net {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  shippingPrice {\n    gross {\n      ...Money\n    }\n  }\n  totalPrice {\n    gross {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  channel {\n    id\n    slug\n  }\n  user {\n    id\n    email\n    firstName\n    lastName\n  }\n  fulfillmentDeadline\n  pointsOfContact {\n    ...PointOfContact\n  }\n  validationErrors {\n    field\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CheckoutLine on CheckoutLine {\n  id\n  totalPrice {\n    gross {\n      ...Money\n    }\n  }\n  unitPrice {\n    gross {\n      ...Money\n    }\n  }\n  undiscountedUnitPrice {\n    ...Money\n  }\n  product {\n    id\n    name\n    parent {\n      id\n      name\n      translation {\n        id\n        name\n      }\n      slug\n      thumbnail {\n        ...Image\n      }\n      media {\n        alt\n        type\n        url(size: 72)\n      }\n    }\n    attributes(variantSelection: ALL) {\n      values {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n    }\n    pricing {\n      price {\n        gross {\n          ...Money\n        }\n      }\n    }\n    translation {\n      id\n      name\n    }\n    media {\n      alt\n      type\n      url(size: 72)\n    }\n  }\n  quantity\n}"): (typeof documents)["fragment CheckoutLine on CheckoutLine {\n  id\n  totalPrice {\n    gross {\n      ...Money\n    }\n  }\n  unitPrice {\n    gross {\n      ...Money\n    }\n  }\n  undiscountedUnitPrice {\n    ...Money\n  }\n  product {\n    id\n    name\n    parent {\n      id\n      name\n      translation {\n        id\n        name\n      }\n      slug\n      thumbnail {\n        ...Image\n      }\n      media {\n        alt\n        type\n        url(size: 72)\n      }\n    }\n    attributes(variantSelection: ALL) {\n      values {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n    }\n    pricing {\n      price {\n        gross {\n          ...Money\n        }\n      }\n    }\n    translation {\n      id\n      name\n    }\n    media {\n      alt\n      type\n      url(size: 72)\n    }\n  }\n  quantity\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionBasic on Collection {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  slug\n}"): (typeof documents)["fragment CollectionBasic on Collection {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  slug\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionDetails on Collection {\n  id\n  ...CollectionBasic\n  seoTitle\n  seoDescription\n  description\n  translation {\n    id\n    description\n  }\n  backgroundImage {\n    ...Image\n  }\n  ...Metadata\n  channelListings {\n    id\n    isPublished\n    publishedAt\n    channel {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["fragment CollectionDetails on Collection {\n  id\n  ...CollectionBasic\n  seoTitle\n  seoDescription\n  description\n  translation {\n    id\n    description\n  }\n  backgroundImage {\n    ...Image\n  }\n  ...Metadata\n  channelListings {\n    id\n    isPublished\n    publishedAt\n    channel {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FulfillmentMethod on FulfillmentMethod {\n  ... on ShippingMethod {\n    id\n    name\n    description\n    translation {\n      id\n      name\n      description\n    }\n    price {\n      ...Money\n    }\n    minimumDeliveryDays\n    maximumDeliveryDays\n  }\n  ... on Warehouse {\n    id\n  }\n}"): (typeof documents)["fragment FulfillmentMethod on FulfillmentMethod {\n  ... on ShippingMethod {\n    id\n    name\n    description\n    translation {\n      id\n      name\n      description\n    }\n    price {\n      ...Money\n    }\n    minimumDeliveryDays\n    maximumDeliveryDays\n  }\n  ... on Warehouse {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ErrorDetails on CheckoutError {\n  field\n  message\n  code\n}"): (typeof documents)["fragment ErrorDetails on CheckoutError {\n  field\n  message\n  code\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Error on ErrorInterface {\n  message\n  field\n  code\n}"): (typeof documents)["fragment Error on ErrorInterface {\n  message\n  field\n  code\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment File on File {\n  url\n  contentType\n}"): (typeof documents)["fragment File on File {\n  url\n  contentType\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment GiftCard on GiftCard {\n  displayCode\n  id\n  currentBalance {\n    ...Money\n  }\n}"): (typeof documents)["fragment GiftCard on GiftCard {\n  displayCode\n  id\n  currentBalance {\n    ...Money\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment HomepageBlock on MenuItem {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  page {\n    id\n    content\n    title\n    translation {\n      content\n      title\n    }\n  }\n}"): (typeof documents)["fragment HomepageBlock on MenuItem {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  page {\n    id\n    content\n    title\n    translation {\n      content\n      title\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Image on Image {\n  url\n  alt\n}"): (typeof documents)["fragment Image on Image {\n  url\n  alt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MenuItem on MenuItem {\n  id\n  name\n  level\n  translation {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  url\n}"): (typeof documents)["fragment MenuItem on MenuItem {\n  id\n  name\n  level\n  translation {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  url\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MenuItemWithChildren on MenuItem {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  children {\n    ...MenuItem\n    children {\n      ...MenuItem\n    }\n  }\n  url\n}"): (typeof documents)["fragment MenuItemWithChildren on MenuItem {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  children {\n    ...MenuItem\n    children {\n      ...MenuItem\n    }\n  }\n  url\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MetadataItem on MetadataItem {\n  key\n  value\n}\n\nfragment Metadata on ObjectWithMetadata {\n  metadata {\n    ...MetadataItem\n  }\n  privateMetadata {\n    ...MetadataItem\n  }\n}"): (typeof documents)["fragment MetadataItem on MetadataItem {\n  key\n  value\n}\n\nfragment Metadata on ObjectWithMetadata {\n  metadata {\n    ...MetadataItem\n  }\n  privateMetadata {\n    ...MetadataItem\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Money on Money {\n  currency\n  amount\n}"): (typeof documents)["fragment Money on Money {\n  currency\n  amount\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Order on Order {\n  id\n  createdAt\n  number\n  status\n  userEmail\n  isPaid\n  shippingTaxRate\n  shippingMethodName\n  privateMetafield(key: \"payment\")\n  discounts {\n    type\n    name\n    amount {\n      ...Money\n    }\n  }\n  shippingAddress {\n    ...Address\n  }\n  billingAddress {\n    ...Address\n  }\n  fulfillmentMethod {\n    ...ShippingMethod\n  }\n  total {\n    currency\n    gross {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  voucher {\n    code\n  }\n  shippingPrice {\n    gross {\n      ...Money\n    }\n    net {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  subtotal {\n    gross {\n      ...Money\n    }\n    net {\n      ...Money\n    }\n  }\n  lines {\n    ...OrderLine\n  }\n  totalBalance {\n    ...Money\n  }\n  totalCaptured {\n    ...Money\n  }\n}"): (typeof documents)["fragment Order on Order {\n  id\n  createdAt\n  number\n  status\n  userEmail\n  isPaid\n  shippingTaxRate\n  shippingMethodName\n  privateMetafield(key: \"payment\")\n  discounts {\n    type\n    name\n    amount {\n      ...Money\n    }\n  }\n  shippingAddress {\n    ...Address\n  }\n  billingAddress {\n    ...Address\n  }\n  fulfillmentMethod {\n    ...ShippingMethod\n  }\n  total {\n    currency\n    gross {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  voucher {\n    code\n  }\n  shippingPrice {\n    gross {\n      ...Money\n    }\n    net {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n  subtotal {\n    gross {\n      ...Money\n    }\n    net {\n      ...Money\n    }\n  }\n  lines {\n    ...OrderLine\n  }\n  totalBalance {\n    ...Money\n  }\n  totalCaptured {\n    ...Money\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment OrderLine on OrderLine {\n  id\n  isShippingRequired\n  productName\n  quantity\n  taxRate\n  quantity\n  quantityFulfilled\n  quantityToFulfill\n  allocations {\n    id\n    quantity\n    warehouse {\n      id\n      name\n    }\n  }\n  product {\n    id\n    name\n    sku\n    preorder {\n      endDate\n    }\n    category {\n      name\n    }\n    productKlass {\n      isDigital\n      kind\n    }\n    trackInventory\n    stocks {\n      ...Stock\n    }\n  }\n  unitPrice {\n    gross {\n      ...Money\n    }\n  }\n  undiscountedUnitPrice {\n    gross {\n      ...Money\n    }\n  }\n  totalPrice {\n    gross {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n}"): (typeof documents)["fragment OrderLine on OrderLine {\n  id\n  isShippingRequired\n  productName\n  quantity\n  taxRate\n  quantity\n  quantityFulfilled\n  quantityToFulfill\n  allocations {\n    id\n    quantity\n    warehouse {\n      id\n      name\n    }\n  }\n  product {\n    id\n    name\n    sku\n    preorder {\n      endDate\n    }\n    category {\n      name\n    }\n    productKlass {\n      isDigital\n      kind\n    }\n    trackInventory\n    stocks {\n      ...Stock\n    }\n  }\n  unitPrice {\n    gross {\n      ...Money\n    }\n  }\n  undiscountedUnitPrice {\n    gross {\n      ...Money\n    }\n  }\n  totalPrice {\n    gross {\n      ...Money\n    }\n    tax {\n      ...Money\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PageInfo on PageInfo {\n  hasNextPage\n  hasPreviousPage\n  startCursor\n  endCursor\n}"): (typeof documents)["fragment PageInfo on PageInfo {\n  hasNextPage\n  hasPreviousPage\n  startCursor\n  endCursor\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PointOfContact on PointOfContact {\n  id\n  firstName\n  lastName\n  email\n  phone\n  notes\n}"): (typeof documents)["fragment PointOfContact on PointOfContact {\n  id\n  firstName\n  lastName\n  email\n  phone\n  notes\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductCard on Product {\n  id\n  slug\n  name\n  translation {\n    id\n    name\n  }\n  thumbnail {\n    ...Image\n  }\n  category {\n    id\n    name\n    translation {\n      id\n      name\n    }\n  }\n  media {\n    url\n    alt\n    type\n  }\n  attributes {\n    slug\n    values {\n      edges {\n        node {\n          name\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment ProductCard on Product {\n  id\n  slug\n  name\n  translation {\n    id\n    name\n  }\n  thumbnail {\n    ...Image\n  }\n  category {\n    id\n    name\n    translation {\n      id\n      name\n    }\n  }\n  media {\n    url\n    alt\n    type\n  }\n  attributes {\n    slug\n    values {\n      edges {\n        node {\n          name\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductVariant on Product {\n  id\n  name\n  slug\n}\n\nfragment ProductAncestor on AbstractProduct {\n  id\n  name\n  slug\n  variants {\n    ...ProductVariant\n  }\n}\n\nfragment BaseProductDetails on Product {\n  id\n  name\n  slug\n  description\n  seoDescription\n  seoTitle\n  isAvailableForPurchase\n  translation {\n    id\n    description\n    name\n  }\n  attributes {\n    ...AttributeDetails\n  }\n  category {\n    ...CategoryBasic\n  }\n  media {\n    ...ProductMediaItem\n  }\n  thumbnail {\n    ...Image\n  }\n  category {\n    name\n  }\n}\n\nfragment AbstractProductDetails on AbstractProduct {\n  ...BaseProductDetails\n  pricing {\n    priceRange {\n      start {\n        gross {\n          ...Money\n        }\n      }\n    }\n  }\n  ancestors {\n    ...ProductAncestor\n  }\n  variants {\n    ...ProductVariant\n  }\n}\n\nfragment ConcreteProductDetails on ConcreteProduct {\n  ...BaseProductDetails\n  quantityAvailable\n  ancestors {\n    ...ProductAncestor\n  }\n  pricing {\n    price {\n      gross {\n        ...Money\n      }\n    }\n  }\n}\n\nfragment ProductDetails on Product {\n  ... on ConcreteProduct {\n    ...ConcreteProductDetails\n  }\n  ... on AbstractProduct {\n    ...AbstractProductDetails\n  }\n}"): (typeof documents)["fragment ProductVariant on Product {\n  id\n  name\n  slug\n}\n\nfragment ProductAncestor on AbstractProduct {\n  id\n  name\n  slug\n  variants {\n    ...ProductVariant\n  }\n}\n\nfragment BaseProductDetails on Product {\n  id\n  name\n  slug\n  description\n  seoDescription\n  seoTitle\n  isAvailableForPurchase\n  translation {\n    id\n    description\n    name\n  }\n  attributes {\n    ...AttributeDetails\n  }\n  category {\n    ...CategoryBasic\n  }\n  media {\n    ...ProductMediaItem\n  }\n  thumbnail {\n    ...Image\n  }\n  category {\n    name\n  }\n}\n\nfragment AbstractProductDetails on AbstractProduct {\n  ...BaseProductDetails\n  pricing {\n    priceRange {\n      start {\n        gross {\n          ...Money\n        }\n      }\n    }\n  }\n  ancestors {\n    ...ProductAncestor\n  }\n  variants {\n    ...ProductVariant\n  }\n}\n\nfragment ConcreteProductDetails on ConcreteProduct {\n  ...BaseProductDetails\n  quantityAvailable\n  ancestors {\n    ...ProductAncestor\n  }\n  pricing {\n    price {\n      gross {\n        ...Money\n      }\n    }\n  }\n}\n\nfragment ProductDetails on Product {\n  ... on ConcreteProduct {\n    ...ConcreteProductDetails\n  }\n  ... on AbstractProduct {\n    ...AbstractProductDetails\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductMediaItem on ProductMediaItem {\n  id\n  alt\n  sortOrder\n  url\n  type\n  oembedData\n}"): (typeof documents)["fragment ProductMediaItem on ProductMediaItem {\n  id\n  alt\n  sortOrder\n  url\n  type\n  oembedData\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SelectedAttributeDetails on Attribute {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  type\n  unit\n  values {\n    edges {\n      node {\n        id\n        name\n        translation {\n          id\n          name\n          richText\n        }\n        value\n      }\n    }\n  }\n}"): (typeof documents)["fragment SelectedAttributeDetails on Attribute {\n  id\n  name\n  translation {\n    id\n    name\n  }\n  type\n  unit\n  values {\n    edges {\n      node {\n        id\n        name\n        translation {\n          id\n          name\n          richText\n        }\n        value\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ShippingMethod on ShippingMethod {\n  name\n  minimumDeliveryDays\n  maximumDeliveryDays\n}"): (typeof documents)["fragment ShippingMethod on ShippingMethod {\n  name\n  minimumDeliveryDays\n  maximumDeliveryDays\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Stock on Stock {\n  id\n  quantity\n  quantityAllocated\n  warehouse {\n    ...Warehouse\n  }\n}"): (typeof documents)["fragment Stock on Stock {\n  id\n  quantity\n  quantityAllocated\n  warehouse {\n    ...Warehouse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TransactionEvent on TransactionEvent {\n  name\n  reference\n}"): (typeof documents)["fragment TransactionEvent on TransactionEvent {\n  name\n  reference\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TransactionItem on TransactionItem {\n  id\n  reference\n  amountVoided {\n    ...Money\n  }\n  amountRefunded {\n    ...Money\n  }\n  amountCharged {\n    ...Money\n  }\n  amountAuthorized {\n    ...Money\n  }\n  events {\n    ...TransactionEvent\n  }\n}"): (typeof documents)["fragment TransactionItem on TransactionItem {\n  id\n  reference\n  amountVoided {\n    ...Money\n  }\n  amountRefunded {\n    ...Money\n  }\n  amountCharged {\n    ...Money\n  }\n  amountAuthorized {\n    ...Money\n  }\n  events {\n    ...TransactionEvent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserBase on User {\n  id\n  email\n  firstName\n  lastName\n  isStaff\n  userPermissions {\n    ...UserPermission\n  }\n  avatar {\n    url\n  }\n}"): (typeof documents)["fragment UserBase on User {\n  id\n  email\n  firstName\n  lastName\n  isStaff\n  userPermissions {\n    ...UserPermission\n  }\n  avatar {\n    url\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserDetails on User {\n  ...UserBase\n  metadata {\n    key\n    value\n  }\n  defaultShippingAddress {\n    ...Address\n  }\n  defaultBillingAddress {\n    ...Address\n  }\n  addresses {\n    ...Address\n  }\n}"): (typeof documents)["fragment UserDetails on User {\n  ...UserBase\n  metadata {\n    key\n    value\n  }\n  defaultShippingAddress {\n    ...Address\n  }\n  defaultBillingAddress {\n    ...Address\n  }\n  addresses {\n    ...Address\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserPermission on UserPermission {\n  code\n  name\n}"): (typeof documents)["fragment UserPermission on UserPermission {\n  code\n  name\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ValidationRules on AddressValidationData {\n  addressFormat\n  allowedFields\n  requiredFields\n  countryAreaType\n  postalCodeType\n  cityType\n  countryAreaChoices {\n    raw\n    verbose\n  }\n}"): (typeof documents)["fragment ValidationRules on AddressValidationData {\n  addressFormat\n  allowedFields\n  requiredFields\n  countryAreaType\n  postalCodeType\n  cityType\n  countryAreaChoices {\n    raw\n    verbose\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Warehouse on Warehouse {\n  id\n  name\n}"): (typeof documents)["fragment Warehouse on Warehouse {\n  id\n  name\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddressDelete($id: ID!) {\n  deleteAddress(id: $id) {\n    user {\n      addresses {\n        ...Address\n      }\n    }\n  }\n}"): (typeof documents)["mutation AddressDelete($id: ID!) {\n  deleteAddress(id: $id) {\n    user {\n      addresses {\n        ...Address\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddressSetDefault($addressID: ID!, $userID: ID!, $addressType: AddressType!) {\n  setDefaultAddress(addressId: $addressID, type: $addressType, userId: $userID) {\n    __typename\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"): (typeof documents)["mutation AddressSetDefault($addressID: ID!, $userID: ID!, $addressType: AddressType!) {\n  setDefaultAddress(addressId: $addressID, type: $addressType, userId: $userID) {\n    __typename\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutAddProductLine($checkoutId: ID!, $productId: ID!) {\n  addCheckoutLines(id: $checkoutId, lines: [{quantity: 1, productId: $productId}]) {\n    result {\n      ...Checkout\n    }\n    errors {\n      message\n      ... on CheckoutError {\n        code\n        field\n      }\n    }\n  }\n}"): (typeof documents)["mutation CheckoutAddProductLine($checkoutId: ID!, $productId: ID!) {\n  addCheckoutLines(id: $checkoutId, lines: [{quantity: 1, productId: $productId}]) {\n    result {\n      ...Checkout\n    }\n    errors {\n      message\n      ... on CheckoutError {\n        code\n        field\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutAddPromoCode($id: ID!, $promoCode: String!) {\n  addPromoCodeToCheckout(id: $id, promoCode: $promoCode) {\n    result {\n      ...Checkout\n    }\n    errors {\n      message\n      field\n    }\n  }\n}"): (typeof documents)["mutation CheckoutAddPromoCode($id: ID!, $promoCode: String!) {\n  addPromoCodeToCheckout(id: $id, promoCode: $promoCode) {\n    result {\n      ...Checkout\n    }\n    errors {\n      message\n      field\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutBillingAddressUpdate($id: ID!, $address: AddressUpdateInput!) {\n  updateCheckoutBillingAddress(data: $address, id: $id) {\n    result {\n      ...Checkout\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation CheckoutBillingAddressUpdate($id: ID!, $address: AddressUpdateInput!) {\n  updateCheckoutBillingAddress(data: $address, id: $id) {\n    result {\n      ...Checkout\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation completeCheckout($checkoutId: ID!, $paymentData: JSONString) {\n  completeCheckout(id: $checkoutId, paymentData: $paymentData) {\n    order {\n      id\n      status\n      billingAddress {\n        id\n        ...Address\n      }\n      shippingAddress {\n        id\n        ...Address\n      }\n    }\n    confirmationNeeded\n    confirmationData\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation completeCheckout($checkoutId: ID!, $paymentData: JSONString) {\n  completeCheckout(id: $checkoutId, paymentData: $paymentData) {\n    order {\n      id\n      status\n      billingAddress {\n        id\n        ...Address\n      }\n      shippingAddress {\n        id\n        ...Address\n      }\n    }\n    confirmationNeeded\n    confirmationData\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutContactInfoUpdate($id: ID!, $input: CheckoutContactInfoUpdateInput!) {\n  updateCheckoutContactInfo(data: $input, id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation CheckoutContactInfoUpdate($id: ID!, $input: CheckoutContactInfoUpdateInput!) {\n  updateCheckoutContactInfo(data: $input, id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createCheckoutPayment($checkoutId: ID!, $paymentInput: PaymentInput!) {\n  createCheckoutPayment(id: $checkoutId, data: $paymentInput) {\n    payment {\n      id\n      total {\n        ...Money\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"): (typeof documents)["mutation createCheckoutPayment($checkoutId: ID!, $paymentInput: PaymentInput!) {\n  createCheckoutPayment(id: $checkoutId, data: $paymentInput) {\n    payment {\n      id\n      total {\n        ...Money\n      }\n    }\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation attachCustomerToCheckout($id: ID!) {\n  attachCustomerToCheckout(id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation attachCustomerToCheckout($id: ID!) {\n  attachCustomerToCheckout(id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation detachCustomerFromCheckout($id: ID!) {\n  detachCustomerFromCheckout(id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation detachCustomerFromCheckout($id: ID!) {\n  detachCustomerFromCheckout(id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateCheckoutFulfillmentMethod($id: ID!, $fulfillmentMethodId: ID!, $fulfillmentDeadline: DateTime) {\n  updateCheckoutFulfillmentMethod(\n    id: $id\n    fulfillmentMethodId: $fulfillmentMethodId\n    fulfillmentDeadline: $fulfillmentDeadline\n  ) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation updateCheckoutFulfillmentMethod($id: ID!, $fulfillmentMethodId: ID!, $fulfillmentDeadline: DateTime) {\n  updateCheckoutFulfillmentMethod(\n    id: $id\n    fulfillmentMethodId: $fulfillmentMethodId\n    fulfillmentDeadline: $fulfillmentDeadline\n  ) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutLineDelete($checkoutId: ID!, $lineId: ID!) {\n  deleteCheckoutLine(id: $checkoutId, lineId: $lineId) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation CheckoutLineDelete($checkoutId: ID!, $lineId: ID!) {\n  deleteCheckoutLine(id: $checkoutId, lineId: $lineId) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutLineUpdate($id: ID!, $lines: [CheckoutLineUpdateInput!]!) {\n  updateCheckoutLines(id: $id, lines: $lines) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation CheckoutLineUpdate($id: ID!, $lines: [CheckoutLineUpdateInput!]!) {\n  updateCheckoutLines(id: $id, lines: $lines) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateCheckoutLines($checkoutId: ID!, $lines: [CheckoutLineUpdateInput!]!) {\n  updateCheckoutLines(id: $checkoutId, lines: $lines) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation updateCheckoutLines($checkoutId: ID!, $lines: [CheckoutLineUpdateInput!]!) {\n  updateCheckoutLines(id: $checkoutId, lines: $lines) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation removePromoCodeFromCheckout($id: ID!, $promoCode: String, $promoCodeId: ID) {\n  removePromoCodeFromCheckout(\n    id: $id\n    promoCode: $promoCode\n    promoCodeId: $promoCodeId\n  ) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation removePromoCodeFromCheckout($id: ID!, $promoCode: String, $promoCodeId: ID) {\n  removePromoCodeFromCheckout(\n    id: $id\n    promoCode: $promoCode\n    promoCodeId: $promoCodeId\n  ) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutShippingAddressUpdate($id: ID!, $address: AddressUpdateInput!) {\n  updateCheckoutShippingAddress(data: $address, id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation CheckoutShippingAddressUpdate($id: ID!, $address: AddressUpdateInput!) {\n  updateCheckoutShippingAddress(data: $address, id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutShippingMethodUpdate($id: ID!, $shippingMethodId: ID!) {\n  updateCheckoutShippingMethod(shippingMethodId: $shippingMethodId, id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"): (typeof documents)["mutation CheckoutShippingMethodUpdate($id: ID!, $shippingMethodId: ID!) {\n  updateCheckoutShippingMethod(shippingMethodId: $shippingMethodId, id: $id) {\n    result {\n      ...Checkout\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation accountConfirm($email: String!, $token: String!) {\n  confirmAccount(email: $email, token: $token) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation accountConfirm($email: String!, $token: String!) {\n  confirmAccount(email: $email, token: $token) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation confirmEmailChange($token: String!, $channel: String!) {\n  confirmEmailChange(token: $token, channel: $channel) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation confirmEmailChange($token: String!, $channel: String!) {\n  confirmEmailChange(token: $token, channel: $channel) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createAccountAddress($input: AddressUpdateInput!) {\n  addAddress(data: $input) {\n    address {\n      ...Address\n    }\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation createAccountAddress($input: AddressUpdateInput!) {\n  addAddress(data: $input) {\n    address {\n      ...Address\n    }\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateOrder($id: ID!) {\n  createOrderFromCheckout(id: $id) {\n    result {\n      ...Order\n    }\n  }\n}"): (typeof documents)["mutation CreateOrder($id: ID!) {\n  createOrderFromCheckout(id: $id) {\n    result {\n      ...Order\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SetAddressDefault($id: ID!, $type: AddressType!) {\n  setDefaultAddress(addressId: $id, type: $type) {\n    result {\n      addresses {\n        ...Address\n      }\n    }\n    errors {\n      code\n      message\n    }\n  }\n}"): (typeof documents)["mutation SetAddressDefault($id: ID!, $type: AddressType!) {\n  setDefaultAddress(addressId: $id, type: $type) {\n    result {\n      addresses {\n        ...Address\n      }\n    }\n    errors {\n      code\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteAccount($token: String!) {\n  deleteAccount(token: $token) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation deleteAccount($token: String!) {\n  deleteAccount(token: $token) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteAddress($addressId: ID!) {\n  deleteAddress(id: $addressId) {\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation deleteAddress($addressId: ID!) {\n  deleteAddress(id: $addressId) {\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation externalAuthenticationUrl($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  externalAuthenticationUrl(pluginInput: {pluginId: $pluginId, data: $input}) {\n    data\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation externalAuthenticationUrl($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  externalAuthenticationUrl(pluginInput: {pluginId: $pluginId, data: $input}) {\n    data\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation refreshExternalToken($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  refreshToken(pluginInput: {pluginId: $pluginId, data: $input}) {\n    errors {\n      ...Error\n    }\n    result {\n      accessToken\n      csrfToken\n    }\n  }\n}"): (typeof documents)["mutation refreshExternalToken($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  refreshToken(pluginInput: {pluginId: $pluginId, data: $input}) {\n    errors {\n      ...Error\n    }\n    result {\n      accessToken\n      csrfToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation externalRefreshWithUser($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  refreshToken(pluginInput: {pluginId: $pluginId, data: $input}) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation externalRefreshWithUser($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  refreshToken(pluginInput: {pluginId: $pluginId, data: $input}) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation verifyExternalToken($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  verifyToken(token: \"\", pluginInput: {pluginId: $pluginId, data: $input}) {\n    isValid\n    payload {\n      __typename\n    }\n    user {\n      ...UserDetails\n      userPermissions {\n        code\n        name\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation verifyExternalToken($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  verifyToken(token: \"\", pluginInput: {pluginId: $pluginId, data: $input}) {\n    isValid\n    payload {\n      __typename\n    }\n    user {\n      ...UserDetails\n      userPermissions {\n        code\n        name\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation loginWithoutDetails($email: String!, $password: String!) {\n  obtainToken(authInput: {email: $email, password: $password}) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserBase\n      }\n    }\n    errors {\n      message\n      field\n      code\n    }\n  }\n}"): (typeof documents)["mutation loginWithoutDetails($email: String!, $password: String!) {\n  obtainToken(authInput: {email: $email, password: $password}) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserBase\n      }\n    }\n    errors {\n      message\n      field\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation logout($input: AuthPluginInput) {\n  logout(pluginInput: $input) {\n    data\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation logout($input: AuthPluginInput) {\n  logout(pluginInput: $input) {\n    data\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ObtainExternalAccessTokens($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  obtainToken(pluginInput: {pluginId: $pluginId, data: $input}) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      message\n      field\n      code\n    }\n  }\n}"): (typeof documents)["mutation ObtainExternalAccessTokens($pluginId: String = \"mirumee.authentication.openidconnect\", $input: JSONString!) {\n  obtainToken(pluginInput: {pluginId: $pluginId, data: $input}) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      message\n      field\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation OrderUpdatePaymentMetafield($orderId: ID!, $data: String!) {\n  updatePrivateMetadata(id: $orderId, data: {key: \"payment\", value: $data}) {\n    __typename\n  }\n}"): (typeof documents)["mutation OrderUpdatePaymentMetafield($orderId: ID!, $data: String!) {\n  updatePrivateMetadata(id: $orderId, data: {key: \"payment\", value: $data}) {\n    __typename\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation PasswordChange($newPassword: String!, $oldPassword: String!) {\n  changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {\n    __typename\n    errors {\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation PasswordChange($newPassword: String!, $oldPassword: String!) {\n  changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {\n    __typename\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation refreshToken($csrfToken: String!, $refreshToken: String, $pluginInput: AuthPluginInput) {\n  refreshToken(\n    csrfToken: $csrfToken\n    refreshToken: $refreshToken\n    pluginInput: $pluginInput\n  ) {\n    result {\n      accessToken\n      csrfToken\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation refreshToken($csrfToken: String!, $refreshToken: String, $pluginInput: AuthPluginInput) {\n  refreshToken(\n    csrfToken: $csrfToken\n    refreshToken: $refreshToken\n    pluginInput: $pluginInput\n  ) {\n    result {\n      accessToken\n      csrfToken\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation refreshTokenWithUser($csrfToken: String!) {\n  refreshToken(csrfToken: $csrfToken) {\n    result {\n      accessToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation refreshTokenWithUser($csrfToken: String!) {\n  refreshToken(csrfToken: $csrfToken) {\n    result {\n      accessToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation register($input: UserCreationInput!) {\n  createUser(data: $input) {\n    errors {\n      ...Error\n    }\n    requiresConfirmation\n  }\n}"): (typeof documents)["mutation register($input: UserCreationInput!) {\n  createUser(data: $input) {\n    errors {\n      ...Error\n    }\n    requiresConfirmation\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation requestAccountDeletion($channel: String!) {\n  requestAccountDeletion(channel: $channel) {\n    __typename\n  }\n}"): (typeof documents)["mutation requestAccountDeletion($channel: String!) {\n  requestAccountDeletion(channel: $channel) {\n    __typename\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RequestEmailChange($newEmail: String!, $password: String!, $channel: String) {\n  requestEmailChange(newEmail: $newEmail, password: $password, channel: $channel) {\n    result {\n      email\n    }\n    errors {\n      code\n      field\n      message\n    }\n  }\n}"): (typeof documents)["mutation RequestEmailChange($newEmail: String!, $password: String!, $channel: String) {\n  requestEmailChange(newEmail: $newEmail, password: $password, channel: $channel) {\n    result {\n      email\n    }\n    errors {\n      code\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation requestPasswordReset($email: String!, $channel: String!) {\n  requestPasswordReset(email: $email, channel: $channel)\n}"): (typeof documents)["mutation requestPasswordReset($email: String!, $channel: String!) {\n  requestPasswordReset(email: $email, channel: $channel)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation setAccountDefaultAddress($id: ID!, $type: AddressType!) {\n  setDefaultAddress(addressId: $id, type: $type) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation setAccountDefaultAddress($id: ID!, $type: AddressType!) {\n  setDefaultAddress(addressId: $id, type: $type) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation setPassword($token: String!, $email: String!, $password: String!) {\n  setPassword(token: $token, email: $email, password: $password) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation setPassword($token: String!, $email: String!, $password: String!) {\n  setPassword(token: $token, email: $email, password: $password) {\n    result {\n      accessToken\n      csrfToken\n      user {\n        ...UserDetails\n      }\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation TransactionCreate($id: ID!, $transaction: TransactionCreationInput!, $transactionEvent: TransactionEventInput) {\n  createTransaction(\n    id: $id\n    transaction: $transaction\n    transactionEvent: $transactionEvent\n  ) {\n    result {\n      id\n    }\n  }\n}"): (typeof documents)["mutation TransactionCreate($id: ID!, $transaction: TransactionCreationInput!, $transactionEvent: TransactionEventInput) {\n  createTransaction(\n    id: $id\n    transaction: $transaction\n    transactionEvent: $transactionEvent\n  ) {\n    result {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation TransactionUpdate($id: ID!, $transaction: TransactionUpdateInput!, $transactionEvent: TransactionEventInput) {\n  updateTransaction(\n    id: $id\n    transaction: $transaction\n    transactionEvent: $transactionEvent\n  ) {\n    result {\n      id\n    }\n  }\n}"): (typeof documents)["mutation TransactionUpdate($id: ID!, $transaction: TransactionUpdateInput!, $transactionEvent: TransactionEventInput) {\n  updateTransaction(\n    id: $id\n    transaction: $transaction\n    transactionEvent: $transactionEvent\n  ) {\n    result {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateUser($input: UserUpdateInput!) {\n  updateUser(data: $input) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation updateUser($input: UserUpdateInput!) {\n  updateUser(data: $input) {\n    result {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateUserAddress($input: AddressUpdateInput!, $id: ID!) {\n  updateAddress(data: $input, id: $id) {\n    address {\n      ...Address\n    }\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation updateUserAddress($input: AddressUpdateInput!, $id: ID!) {\n  updateAddress(data: $input, id: $id) {\n    address {\n      ...Address\n    }\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation userAddressCreate($address: AddressUpdateInput!, $type: AddressType) {\n  addAddress(type: $type, data: $address) {\n    address {\n      ...Address\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation userAddressCreate($address: AddressUpdateInput!, $type: AddressType) {\n  addAddress(type: $type, data: $address) {\n    address {\n      ...Address\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation userAddressDelete($id: ID!) {\n  deleteAddress(id: $id) {\n    address {\n      ...Address\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation userAddressDelete($id: ID!) {\n  deleteAddress(id: $id) {\n    address {\n      ...Address\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation userAddressUpdate($id: ID!, $address: AddressUpdateInput!) {\n  updateAddress(id: $id, data: $address) {\n    address {\n      ...Address\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation userAddressUpdate($id: ID!, $address: AddressUpdateInput!) {\n  updateAddress(id: $id, data: $address) {\n    address {\n      ...Address\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation verifyToken($token: String!) {\n  verifyToken(token: $token) {\n    isValid\n    payload {\n      accessToken\n      refreshToken\n    }\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"): (typeof documents)["mutation verifyToken($token: String!) {\n  verifyToken(token: $token) {\n    isValid\n    payload {\n      accessToken\n      refreshToken\n    }\n    user {\n      ...UserDetails\n    }\n    errors {\n      ...Error\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query addressValidationRules($countryCode: CountryCode!) {\n  addressValidationRules(countryCode: $countryCode) {\n    ...ValidationRules\n  }\n}"): (typeof documents)["query addressValidationRules($countryCode: CountryCode!) {\n  addressValidationRules(countryCode: $countryCode) {\n    ...ValidationRules\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query App {\n  app {\n    id\n    name\n  }\n}"): (typeof documents)["query App {\n  app {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AvailableShippingMethods($channel: String!) {\n  shop {\n    id\n    availableShippingMethods(channelSlug: $channel) {\n      id\n      translation {\n        id\n        name\n      }\n      price {\n        ...Money\n      }\n    }\n  }\n}"): (typeof documents)["query AvailableShippingMethods($channel: String!) {\n  shop {\n    id\n    availableShippingMethods(channelSlug: $channel) {\n      id\n      translation {\n        id\n        name\n      }\n      price {\n        ...Money\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryBySlug($slug: String!) {\n  category(slug: $slug) {\n    ...CategoryDetails\n  }\n}"): (typeof documents)["query CategoryBySlug($slug: String!) {\n  category(slug: $slug) {\n    ...CategoryDetails\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryPaths($after: String) {\n  categories(first: 100, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}"): (typeof documents)["query CategoryPaths($after: String) {\n  categories(first: 100, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Channel($id: ID!) {\n  channel(id: $id) {\n    ...Channel\n  }\n}"): (typeof documents)["query Channel($id: ID!) {\n  channel(id: $id) {\n    ...Channel\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ChannelBySlug($slug: String!) {\n  channel(slug: $slug) {\n    ...Channel\n  }\n}"): (typeof documents)["query ChannelBySlug($slug: String!) {\n  channel(slug: $slug) {\n    ...Channel\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Channels {\n  channels {\n    ...Channel\n  }\n}"): (typeof documents)["query Channels {\n  channels {\n    ...Channel\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Checkout($id: ID!) {\n  checkout(id: $id) {\n    ...Checkout\n  }\n}"): (typeof documents)["query Checkout($id: ID!) {\n  checkout(id: $id) {\n    ...Checkout\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionBySlug($slug: String!, $channel: String!) {\n  collection(slug: $slug, channel: $channel) {\n    id\n    ...CollectionDetails\n    backgroundImage {\n      ...Image\n    }\n  }\n}"): (typeof documents)["query CollectionBySlug($slug: String!, $channel: String!) {\n  collection(slug: $slug, channel: $channel) {\n    id\n    ...CollectionDetails\n    backgroundImage {\n      ...Image\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionPaths($after: String, $channel: String) {\n  collections(first: 20, channel: $channel, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}"): (typeof documents)["query CollectionPaths($after: String, $channel: String) {\n  collections(first: 20, channel: $channel, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CurrentUserDetails {\n  me {\n    id\n    lastLogin\n    dateJoined\n    email\n    firstName\n    lastName\n    avatar {\n      ...Image\n    }\n    orders {\n      totalCount\n    }\n  }\n}"): (typeof documents)["query CurrentUserDetails {\n  me {\n    id\n    lastLogin\n    dateJoined\n    email\n    firstName\n    lastName\n    avatar {\n      ...Image\n    }\n    orders {\n      totalCount\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FilteringAttributes($filter: AttributeFilter!, $channel: String!) {\n  attributes(filters: $filter, first: 100, channel: $channel) {\n    totalCount\n    edges {\n      node {\n        ...AttributeFilter\n      }\n    }\n  }\n}"): (typeof documents)["query FilteringAttributes($filter: AttributeFilter!, $channel: String!) {\n  attributes(filters: $filter, first: 100, channel: $channel) {\n    totalCount\n    edges {\n      node {\n        ...AttributeFilter\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FooterMenu($channel: String!) {\n  menu(slug: \"footer\", channel: $channel) {\n    id\n    items {\n      children {\n        ...MenuItem\n      }\n      ...MenuItem\n    }\n  }\n}"): (typeof documents)["query FooterMenu($channel: String!) {\n  menu(slug: \"footer\", channel: $channel) {\n    id\n    items {\n      children {\n        ...MenuItem\n      }\n      ...MenuItem\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query HomepageBlocks($slug: String!, $channel: String!) {\n  menu(channel: $channel, slug: $slug) {\n    id\n    name\n    slug\n    items {\n      ...HomepageBlock\n    }\n  }\n}"): (typeof documents)["query HomepageBlocks($slug: String!, $channel: String!) {\n  menu(channel: $channel, slug: $slug) {\n    id\n    name\n    slug\n    items {\n      ...HomepageBlock\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MainMenu($channel: String!) {\n  menu(slug: \"navbar\", channel: $channel) {\n    id\n    items {\n      ...MenuItemWithChildren\n    }\n  }\n}"): (typeof documents)["query MainMenu($channel: String!) {\n  menu(slug: \"navbar\", channel: $channel) {\n    id\n    items {\n      ...MenuItemWithChildren\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Order($id: ID!) {\n  order(id: $id) {\n    ...Order\n  }\n}"): (typeof documents)["query Order($id: ID!) {\n  order(id: $id) {\n    ...Order\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrderPaymentDetails($id: ID!) {\n  order(id: $id) {\n    authorizeStatus\n    chargeStatus\n    isPaid\n    status\n    privateMetafield(key: \"payment\")\n  }\n}"): (typeof documents)["query OrderPaymentDetails($id: ID!) {\n  order(id: $id) {\n    authorizeStatus\n    chargeStatus\n    isPaid\n    status\n    privateMetafield(key: \"payment\")\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrderTransactions($id: ID!) {\n  order(id: $id) {\n    transactions {\n      ...TransactionItem\n    }\n  }\n}"): (typeof documents)["query OrderTransactions($id: ID!) {\n  order(id: $id) {\n    transactions {\n      ...TransactionItem\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Orders($before: String, $after: String) {\n  me {\n    orders(first: 10, before: $before, after: $after) {\n      edges {\n        cursor\n        node {\n          ...Order\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n}"): (typeof documents)["query Orders($before: String, $after: String) {\n  me {\n    orders(first: 10, before: $before, after: $after) {\n      edges {\n        cursor\n        node {\n          ...Order\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Page($slug: String!) {\n  page(slug: $slug) {\n    id\n    title\n    translation {\n      id\n      title\n      content\n    }\n    seoTitle\n    seoDescription\n    slug\n    createdAt\n    content\n  }\n}"): (typeof documents)["query Page($slug: String!) {\n  page(slug: $slug) {\n    id\n    title\n    translation {\n      id\n      title\n      content\n    }\n    seoTitle\n    seoDescription\n    slug\n    createdAt\n    content\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PagePaths($after: String) {\n  pages(first: 100, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}"): (typeof documents)["query PagePaths($after: String) {\n  pages(first: 100, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductById($id: ID!, $channel: String!) {\n  product(id: $id, channel: $channel) {\n    ...ProductDetails\n  }\n}"): (typeof documents)["query ProductById($id: ID!, $channel: String!) {\n  product(id: $id, channel: $channel) {\n    ...ProductDetails\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductCollection($before: String, $after: String, $first: Int = 4, $filter: ProductFilter, $sortBy: ProductOrderingInput, $channel: String!) {\n  products(\n    first: $first\n    channel: $channel\n    after: $after\n    before: $before\n    filters: $filter\n    sortBy: $sortBy\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...ProductCard\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"): (typeof documents)["query ProductCollection($before: String, $after: String, $first: Int = 4, $filter: ProductFilter, $sortBy: ProductOrderingInput, $channel: String!) {\n  products(\n    first: $first\n    channel: $channel\n    after: $after\n    before: $before\n    filters: $filter\n    sortBy: $sortBy\n  ) {\n    totalCount\n    edges {\n      cursor\n      node {\n        ...ProductCard\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductPaths($after: String, $channel: String) {\n  products(first: 100, channel: $channel, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}"): (typeof documents)["query ProductPaths($after: String, $channel: String) {\n  products(first: 100, channel: $channel, after: $after) {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      node {\n        slug\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query User {\n  me {\n    ...UserDetails\n    checkout {\n      ...Checkout\n    }\n  }\n}\n\nquery UserWithoutDetails {\n  me {\n    ...UserBase\n  }\n}"): (typeof documents)["query User {\n  me {\n    ...UserDetails\n    checkout {\n      ...Checkout\n    }\n  }\n}\n\nquery UserWithoutDetails {\n  me {\n    ...UserBase\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CurrentUserAddresses {\n  me {\n    id\n    addresses {\n      ...Address\n    }\n  }\n}"): (typeof documents)["query CurrentUserAddresses {\n  me {\n    id\n    addresses {\n      ...Address\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Country on Country {\n    name\n    code\n  }\n"): (typeof documents)["\n  fragment Country on Country {\n    name\n    code\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Language on LanguageDisplay {\n    code\n    language\n  }\n"): (typeof documents)["\n  fragment Language on LanguageDisplay {\n    code\n    language\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShopSettings on Site {\n    countries {\n      ...Country\n    }\n    allowedStates\n    defaultCountry {\n      ...Country\n    }\n    defaultWeightUnit\n    domain\n    languages {\n      ...Language\n    }\n    logo {\n      url\n      alt\n      height\n      width\n    }\n    name\n    trackInventoryByDefault\n    maxItemCountPerCheckout\n  }\n"): (typeof documents)["\n  fragment ShopSettings on Site {\n    countries {\n      ...Country\n    }\n    allowedStates\n    defaultCountry {\n      ...Country\n    }\n    defaultWeightUnit\n    domain\n    languages {\n      ...Language\n    }\n    logo {\n      url\n      alt\n      height\n      width\n    }\n    name\n    trackInventoryByDefault\n    maxItemCountPerCheckout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ShopInfo {\n    shop {\n      id\n      ...ShopSettings\n      permissions {\n        code\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query ShopInfo {\n    shop {\n      id\n      ...ShopSettings\n      permissions {\n        code\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ShopCountries($filter: CountryFilter) {\n    shop {\n      id\n      countries(filters: $filter) {\n        code\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query ShopCountries($filter: CountryFilter) {\n    shop {\n      id\n      countries(filters: $filter) {\n        code\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MainMenu($channel: String!) {\n    menu(slug: \"navbar\", channel: $channel) {\n      id\n      items {\n        ...MenuItemWithChildren\n      }\n    }\n  }\n"): (typeof documents)["\n  query MainMenu($channel: String!) {\n    menu(slug: \"navbar\", channel: $channel) {\n      id\n      items {\n        ...MenuItemWithChildren\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GalleryMedia($first: Int) {\n    media(first: $first) {\n      edges {\n        node {\n          id\n          type\n          title\n          alt\n          file {\n            url\n            contentType\n          }\n          width\n          height\n          aspectRatio\n          placeholder\n        }\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GalleryMedia($first: Int) {\n    media(first: $first) {\n      edges {\n        node {\n          id\n          type\n          title\n          alt\n          file {\n            url\n            contentType\n          }\n          width\n          height\n          aspectRatio\n          placeholder\n        }\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCheckout($email: String, $lines: [CheckoutLineInput!]!, $channel: String!) {\n    createCheckout(data: { channel: $channel, email: $email, lines: $lines }) {\n      result {\n        id\n      }\n      errors {\n        field\n        message\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCheckout($email: String, $lines: [CheckoutLineInput!]!, $channel: String!) {\n    createCheckout(data: { channel: $channel, email: $email, lines: $lines }) {\n      result {\n        id\n      }\n      errors {\n        field\n        message\n        code\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductBySlug($slug: String!, $channel: String!) {\n    product(slug: $slug, channel: $channel) {\n      ...ProductDetails\n    }\n  }\n"): (typeof documents)["\n  query ProductBySlug($slug: String!, $channel: String!) {\n    product(slug: $slug, channel: $channel) {\n      ...ProductDetails\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment App on App {\n    id\n    name\n    createdAt\n    isActive\n    type\n    homepageUrl\n    appUrl\n    manifestUrl\n    configurationUrl\n    supportUrl\n    version\n    accessToken\n    privateMetadata {\n      key\n      value\n    }\n    metadata {\n      key\n      value\n    }\n    tokens {\n      authToken\n      id\n      name\n    }\n    webhooks {\n      ...Webhook\n    }\n  }\n"): (typeof documents)["\n  fragment App on App {\n    id\n    name\n    createdAt\n    isActive\n    type\n    homepageUrl\n    appUrl\n    manifestUrl\n    configurationUrl\n    supportUrl\n    version\n    accessToken\n    privateMetadata {\n      key\n      value\n    }\n    metadata {\n      key\n      value\n    }\n    tokens {\n      authToken\n      id\n      name\n    }\n    webhooks {\n      ...Webhook\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AppListItem on App {\n    id\n    name\n    isActive\n    type\n    appUrl\n    manifestUrl\n    permissions {\n      ...AppPermission\n    }\n  }\n"): (typeof documents)["\n  fragment AppListItem on App {\n    id\n    name\n    isActive\n    type\n    appUrl\n    manifestUrl\n    permissions {\n      ...AppPermission\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AppPermission on Permission {\n    name\n    code\n  }\n"): (typeof documents)["\n  fragment AppPermission on Permission {\n    name\n    code\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Value on Value {\n    id\n    name\n    slug\n    file {\n      ...File\n    }\n    reference\n    boolean\n    date\n    dateTime\n    value\n  }\n"): (typeof documents)["\n  fragment Value on Value {\n    id\n    name\n    slug\n    file {\n      ...File\n    }\n    reference\n    boolean\n    date\n    dateTime\n    value\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ValueDetails on Value {\n    ...Value\n    plainText\n    richText\n  }\n"): (typeof documents)["\n  fragment ValueDetails on Value {\n    ...Value\n    plainText\n    richText\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ValueList on ValueConnection {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      cursor\n      node {\n        ...ValueDetails\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ValueList on ValueConnection {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      cursor\n      node {\n        ...ValueDetails\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AvailableAttribute on Attribute {\n    id\n    name\n    slug\n  }\n"): (typeof documents)["\n  fragment AvailableAttribute on Attribute {\n    id\n    name\n    slug\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserPermission on UserPermission {\n    code\n    name\n  }\n"): (typeof documents)["\n  fragment UserPermission on UserPermission {\n    code\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment User on User {\n    id\n    email\n    firstName\n    lastName\n    isStaff\n    userPermissions {\n      ...UserPermission\n    }\n    avatar {\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment User on User {\n    id\n    email\n    firstName\n    lastName\n    isStaff\n    userPermissions {\n      ...UserPermission\n    }\n    avatar {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Category on Category {\n    id\n    name\n    children {\n      totalCount\n    }\n    products {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  fragment Category on Category {\n    id\n    name\n    children {\n      totalCount\n    }\n    products {\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChannelError on ChannelError {\n    code\n    field\n    message\n  }\n"): (typeof documents)["\n  fragment ChannelError on ChannelError {\n    code\n    field\n    message\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChannelDetails on Channel {\n    ...Channel\n    hasOrders\n    warehouses {\n      ...Warehouse\n    }\n  }\n"): (typeof documents)["\n  fragment ChannelDetails on Channel {\n    ...Channel\n    hasOrders\n    warehouses {\n      ...Warehouse\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Collection on Collection {\n    id\n    name\n    channelListings {\n      id\n      isPublished\n      publishedAt\n      channel {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Collection on Collection {\n    id\n    name\n    channelListings {\n      id\n      isPublished\n      publishedAt\n      channel {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CollectionProduct on Product {\n    id\n    name\n    productKlass {\n      id\n      name\n    }\n    thumbnail {\n      url\n    }\n    channelListings {\n      ...ChannelListingProductWithoutPricing\n    }\n  }\n"): (typeof documents)["\n  fragment CollectionProduct on Product {\n    id\n    name\n    productKlass {\n      id\n      name\n    }\n    thumbnail {\n      url\n    }\n    channelListings {\n      ...ChannelListingProductWithoutPricing\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Customer on User {\n    id\n    email\n    firstName\n    lastName\n  }\n"): (typeof documents)["\n  fragment Customer on User {\n    id\n    email\n    firstName\n    lastName\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CustomerDetails on User {\n    ...Customer\n    ...Metadata\n    dateJoined\n    lastLogin\n    defaultShippingAddress {\n      ...Address\n    }\n    defaultBillingAddress {\n      ...Address\n    }\n    note\n    isActive\n  }\n"): (typeof documents)["\n  fragment CustomerDetails on User {\n    ...Customer\n    ...Metadata\n    dateJoined\n    lastLogin\n    defaultShippingAddress {\n      ...Address\n    }\n    defaultBillingAddress {\n      ...Address\n    }\n    note\n    isActive\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CustomerAddresses on User {\n    ...Customer\n    addresses {\n      ...Address\n    }\n    defaultBillingAddress {\n      id\n    }\n    defaultShippingAddress {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment CustomerAddresses on User {\n    ...Customer\n    addresses {\n      ...Address\n    }\n    defaultBillingAddress {\n      id\n    }\n    defaultShippingAddress {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Sale on Sale {\n    ...Metadata\n    id\n    name\n    type\n    startDate\n    endDate\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n      discountValue\n      currency\n    }\n  }\n"): (typeof documents)["\n  fragment Sale on Sale {\n    ...Metadata\n    id\n    name\n    type\n    startDate\n    endDate\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n      discountValue\n      currency\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SaleDetails on Sale {\n    ...Sale\n    productsCount: products {\n      totalCount\n    }\n    collectionsCount: collections {\n      totalCount\n    }\n    categoriesCount: categories {\n      totalCount\n    }\n    products(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeProducts) {\n      edges {\n        node {\n          id\n          name\n          productKlass {\n            id\n            name\n          }\n          thumbnail {\n            url\n          }\n          channelListings {\n            ...ChannelListingProductWithoutPricing\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    categories(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCategories) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    collections(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCollections) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment SaleDetails on Sale {\n    ...Sale\n    productsCount: products {\n      totalCount\n    }\n    collectionsCount: collections {\n      totalCount\n    }\n    categoriesCount: categories {\n      totalCount\n    }\n    products(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeProducts) {\n      edges {\n        node {\n          id\n          name\n          productKlass {\n            id\n            name\n          }\n          thumbnail {\n            url\n          }\n          channelListings {\n            ...ChannelListingProductWithoutPricing\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    categories(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCategories) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    collections(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCollections) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Voucher on Voucher {\n    ...Metadata\n    id\n    code\n    startDate\n    endDate\n    usageLimit\n    type\n    discountValueType\n    countries {\n      code\n      name\n    }\n    minCheckoutItemsQuantity\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n      discountValue\n      currency\n      minSpent {\n        amount\n        currency\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Voucher on Voucher {\n    ...Metadata\n    id\n    code\n    startDate\n    endDate\n    usageLimit\n    type\n    discountValueType\n    countries {\n      code\n      name\n    }\n    minCheckoutItemsQuantity\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n      discountValue\n      currency\n      minSpent {\n        amount\n        currency\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment VoucherDetails on Voucher {\n    ...Voucher\n    code\n    usageLimit\n    used\n    applyOncePerOrder\n    applyOncePerCustomer\n    onlyForStaff\n    productsCount: products {\n      totalCount\n    }\n    collectionsCount: collections {\n      totalCount\n    }\n    categoriesCount: categories {\n      totalCount\n    }\n    products(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeProducts) {\n      edges {\n        node {\n          id\n          name\n          productKlass {\n            id\n            name\n          }\n          thumbnail {\n            url\n          }\n          channelListings {\n            ...ChannelListingProductWithoutPricing\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    collections(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCollections) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    categories(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCategories) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment VoucherDetails on Voucher {\n    ...Voucher\n    code\n    usageLimit\n    used\n    applyOncePerOrder\n    applyOncePerCustomer\n    onlyForStaff\n    productsCount: products {\n      totalCount\n    }\n    collectionsCount: collections {\n      totalCount\n    }\n    categoriesCount: categories {\n      totalCount\n    }\n    products(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeProducts) {\n      edges {\n        node {\n          id\n          name\n          productKlass {\n            id\n            name\n          }\n          thumbnail {\n            url\n          }\n          channelListings {\n            ...ChannelListingProductWithoutPricing\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    collections(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCollections) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n    categories(after: $after, before: $before, first: $first, last: $last)\n      @include(if: $includeCategories) {\n      edges {\n        node {\n          id\n          name\n          products {\n            totalCount\n          }\n        }\n      }\n      pageInfo {\n        ...PageInfo\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductErrorWithAttributes on ProductError {\n    ...Error\n    attributes\n  }\n"): (typeof documents)["\n  fragment ProductErrorWithAttributes on ProductError {\n    ...Error\n    attributes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductChannelListingError on ProductChannelListingError {\n    ...Error\n    channels\n  }\n"): (typeof documents)["\n  fragment ProductChannelListingError on ProductChannelListingError {\n    ...Error\n    channels\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CollectionChannelListingError on CollectionChannelListingError {\n    ...Error\n    channels\n  }\n"): (typeof documents)["\n  fragment CollectionChannelListingError on CollectionChannelListingError {\n    ...Error\n    channels\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AccountError on AccountError {\n    ...Error\n    addressType\n  }\n"): (typeof documents)["\n  fragment AccountError on AccountError {\n    ...Error\n    addressType\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DiscountError on DiscountError {\n    ...Error\n    channels\n  }\n"): (typeof documents)["\n  fragment DiscountError on DiscountError {\n    ...Error\n    channels\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderError on OrderError {\n    ...Error\n    addressType\n    orderLines\n  }\n"): (typeof documents)["\n  fragment OrderError on OrderError {\n    ...Error\n    addressType\n    orderLines\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageErrorWithAttributes on PageError {\n    ...Error\n    attributes\n  }\n"): (typeof documents)["\n  fragment PageErrorWithAttributes on PageError {\n    ...Error\n    attributes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BulkProductError on BulkProductError {\n    ...Error\n    index\n    channels\n  }\n"): (typeof documents)["\n  fragment BulkProductError on BulkProductError {\n    ...Error\n    index\n    channels\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BulkStockError on BulkStockError {\n    ...Error\n    index\n  }\n"): (typeof documents)["\n  fragment BulkStockError on BulkStockError {\n    ...Error\n    index\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShippingChannelsError on ShippingError {\n    ...Error\n    channels\n  }\n"): (typeof documents)["\n  fragment ShippingChannelsError on ShippingError {\n    ...Error\n    channels\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AppError on AppError {\n    ...Error\n    permissions\n  }\n"): (typeof documents)["\n  fragment AppError on AppError {\n    ...Error\n    permissions\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductAttributeAssignmentUpdateError on ProductError {\n    ...Error\n    attributes\n  }\n"): (typeof documents)["\n  fragment ProductAttributeAssignmentUpdateError on ProductError {\n    ...Error\n    attributes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GiftCardsSettings on GiftCardSettings {\n    expiryType\n    expiryPeriod {\n      type\n      amount\n    }\n  }\n"): (typeof documents)["\n  fragment GiftCardsSettings on GiftCardSettings {\n    expiryType\n    expiryPeriod {\n      type\n      amount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GiftCardEvent on GiftCardEvent {\n    expiryDate\n    oldExpiryDate\n    id\n    date\n    type\n    user {\n      ...UserBase\n      email\n    }\n    app {\n      id\n      name\n    }\n    message\n    email\n    orderId\n    orderNumber\n    tags\n    oldTags\n    balance {\n      initialBalance {\n        ...Money\n      }\n      currentBalance {\n        ...Money\n      }\n      oldInitialBalance {\n        ...Money\n      }\n      oldCurrentBalance {\n        ...Money\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment GiftCardEvent on GiftCardEvent {\n    expiryDate\n    oldExpiryDate\n    id\n    date\n    type\n    user {\n      ...UserBase\n      email\n    }\n    app {\n      id\n      name\n    }\n    message\n    email\n    orderId\n    orderNumber\n    tags\n    oldTags\n    balance {\n      initialBalance {\n        ...Money\n      }\n      currentBalance {\n        ...Money\n      }\n      oldInitialBalance {\n        ...Money\n      }\n      oldCurrentBalance {\n        ...Money\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GiftCardData on GiftCard {\n    ...Metadata\n    last4CodeChars\n    boughtInChannel\n    createdBy {\n      ...UserBase\n    }\n    product {\n      id\n      name\n    }\n    createdBy {\n      ...UserBase\n    }\n    usedBy {\n      ...UserBase\n    }\n    usedByEmail\n    createdByEmail\n    app {\n      id\n      name\n    }\n    createdAt\n    expiryDate\n    lastUsedOn\n    isActive\n    initialBalance {\n      ...Money\n    }\n    currentBalance {\n      ...Money\n    }\n\n    id\n    tags {\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment GiftCardData on GiftCard {\n    ...Metadata\n    last4CodeChars\n    boughtInChannel\n    createdBy {\n      ...UserBase\n    }\n    product {\n      id\n      name\n    }\n    createdBy {\n      ...UserBase\n    }\n    usedBy {\n      ...UserBase\n    }\n    usedByEmail\n    createdByEmail\n    app {\n      id\n      name\n    }\n    createdAt\n    expiryDate\n    lastUsedOn\n    isActive\n    initialBalance {\n      ...Money\n    }\n    currentBalance {\n      ...Money\n    }\n\n    id\n    tags {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CustomerGiftCard on GiftCard {\n    id\n    last4CodeChars\n    expiryDate\n    isActive\n    currentBalance {\n      ...Money\n    }\n  }\n"): (typeof documents)["\n  fragment CustomerGiftCard on GiftCard {\n    id\n    last4CodeChars\n    expiryDate\n    isActive\n    currentBalance {\n      ...Money\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Group on Group {\n    id\n    name\n    userCanManage\n    users {\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  fragment Group on Group {\n    id\n    name\n    userCanManage\n    users {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Permission on Permission {\n    code\n    name\n  }\n"): (typeof documents)["\n  fragment Permission on Permission {\n    code\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GroupMember on User {\n    ...StaffMember\n    avatar(size: 48) {\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment GroupMember on User {\n    ...StaffMember\n    avatar(size: 48) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment GroupDetails on Group {\n    ...Group\n    permissions {\n      ...Permission\n    }\n    users {\n      ...GroupMember\n    }\n  }\n"): (typeof documents)["\n  fragment GroupDetails on Group {\n    ...Group\n    permissions {\n      ...Permission\n    }\n    users {\n      ...GroupMember\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MediaItem on MediaItem {\n    id\n    title\n    alt\n    # sortOrder\n    file {\n      url\n    }\n    placeholder\n    isPublished\n    type\n  }\n"): (typeof documents)["\n  fragment MediaItem on MediaItem {\n    id\n    title\n    alt\n    # sortOrder\n    file {\n      url\n    }\n    placeholder\n    isPublished\n    type\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MediaItemDetails on MediaItem {\n    ...MediaItem\n    ...Metadata\n    file {\n      __typename\n      url\n      contentType\n    }\n    description\n    publishedAt\n  }\n"): (typeof documents)["\n  fragment MediaItemDetails on MediaItem {\n    ...MediaItem\n    ...Metadata\n    file {\n      __typename\n      url\n      contentType\n    }\n    description\n    publishedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Menu on Menu {\n    id\n    name\n    items {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment Menu on Menu {\n    id\n    name\n    items {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MenuItemNested on MenuItem {\n    ...MenuItem\n    children {\n      ...MenuItem\n      children {\n        ...MenuItem\n        children {\n          ...MenuItem\n          children {\n            ...MenuItem\n            children {\n              ...MenuItem\n              children {\n                ...MenuItem\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment MenuItemNested on MenuItem {\n    ...MenuItem\n    children {\n      ...MenuItem\n      children {\n        ...MenuItem\n        children {\n          ...MenuItem\n          children {\n            ...MenuItem\n            children {\n              ...MenuItem\n              children {\n                ...MenuItem\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MenuDetails on Menu {\n    id\n    items {\n      ...MenuItemNested\n    }\n    name\n  }\n"): (typeof documents)["\n  fragment MenuDetails on Menu {\n    id\n    items {\n      ...MenuItemNested\n    }\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderEvent on OrderEvent {\n    id\n    amount\n    shippingCostsIncluded\n    date\n    email\n    emailType\n    invoiceNumber\n    discount {\n      valueType\n      value\n      reason\n      amount {\n        amount\n        currency\n      }\n      # oldValueType\n      # oldValue\n      # oldAmount {\n      #   amount\n      #   currency\n      # }\n    }\n    relatedOrder {\n      id\n      number\n    }\n    message\n    quantity\n    transactionReference\n    type\n    user {\n      id\n      email\n      firstName\n      lastName\n    }\n    app {\n      id\n      name\n      appUrl\n    }\n    lines {\n      quantity\n      itemName\n      discount {\n        valueType\n        value\n        reason\n        amount {\n          amount\n          currency\n        }\n        # oldValueType\n        # oldValue\n        # oldAmount {\n        #   amount\n        #   currency\n        # }\n      }\n      orderLine {\n        id\n        productName\n        # productName\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment OrderEvent on OrderEvent {\n    id\n    amount\n    shippingCostsIncluded\n    date\n    email\n    emailType\n    invoiceNumber\n    discount {\n      valueType\n      value\n      reason\n      amount {\n        amount\n        currency\n      }\n      # oldValueType\n      # oldValue\n      # oldAmount {\n      #   amount\n      #   currency\n      # }\n    }\n    relatedOrder {\n      id\n      number\n    }\n    message\n    quantity\n    transactionReference\n    type\n    user {\n      id\n      email\n      firstName\n      lastName\n    }\n    app {\n      id\n      name\n      appUrl\n    }\n    lines {\n      quantity\n      itemName\n      discount {\n        valueType\n        value\n        reason\n        amount {\n          amount\n          currency\n        }\n        # oldValueType\n        # oldValue\n        # oldAmount {\n        #   amount\n        #   currency\n        # }\n      }\n      orderLine {\n        id\n        productName\n        # productName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderLine_ on OrderLine {\n    id\n    isShippingRequired\n    allocations {\n      id\n      quantity\n      warehouse {\n        id\n        name\n      }\n    }\n    product {\n      id\n      quantityAvailable\n      preorder {\n        endDate\n      }\n      stocks {\n        ...Stock\n      }\n      parent {\n        id\n        isAvailableForPurchase\n      }\n    }\n    productName\n    productSku\n    quantity\n    quantityFulfilled\n    quantityToFulfill\n    unitDiscount {\n      amount\n      currency\n    }\n    unitDiscountValue\n    unitDiscountReason\n    unitDiscountType\n    undiscountedUnitPrice {\n      currency\n      gross {\n        amount\n        currency\n      }\n      net {\n        amount\n        currency\n      }\n    }\n    unitPrice {\n      gross {\n        amount\n        currency\n      }\n      net {\n        amount\n        currency\n      }\n    }\n    thumbnail(size: 64) {\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment OrderLine_ on OrderLine {\n    id\n    isShippingRequired\n    allocations {\n      id\n      quantity\n      warehouse {\n        id\n        name\n      }\n    }\n    product {\n      id\n      quantityAvailable\n      preorder {\n        endDate\n      }\n      stocks {\n        ...Stock\n      }\n      parent {\n        id\n        isAvailableForPurchase\n      }\n    }\n    productName\n    productSku\n    quantity\n    quantityFulfilled\n    quantityToFulfill\n    unitDiscount {\n      amount\n      currency\n    }\n    unitDiscountValue\n    unitDiscountReason\n    unitDiscountType\n    undiscountedUnitPrice {\n      currency\n      gross {\n        amount\n        currency\n      }\n      net {\n        amount\n        currency\n      }\n    }\n    unitPrice {\n      gross {\n        amount\n        currency\n      }\n      net {\n        amount\n        currency\n      }\n    }\n    thumbnail(size: 64) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RefundOrderLine on OrderLine {\n    id\n    productName\n    quantity\n    unitPrice {\n      gross {\n        ...Money\n      }\n    }\n    thumbnail(size: 64) {\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment RefundOrderLine on OrderLine {\n    id\n    productName\n    quantity\n    unitPrice {\n      gross {\n        ...Money\n      }\n    }\n    thumbnail(size: 64) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Fulfillment on Fulfillment {\n    id\n    lines {\n      id\n      quantity\n      orderLine {\n        ...OrderLine\n      }\n    }\n    fulfillmentOrder\n    status\n    trackingNumber\n    warehouse {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment Fulfillment on Fulfillment {\n    id\n    lines {\n      id\n      quantity\n      orderLine {\n        ...OrderLine\n      }\n    }\n    fulfillmentOrder\n    status\n    trackingNumber\n    warehouse {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Invoice on Invoice {\n    id\n    number\n    createdAt\n    url\n    status\n  }\n"): (typeof documents)["\n  fragment Invoice on Invoice {\n    id\n    number\n    createdAt\n    url\n    status\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderDetails on Order {\n    id\n    ...Metadata\n    billingAddress {\n      ...Address\n    }\n    giftCards {\n      events {\n        id\n        type\n        orderId\n        balance {\n          initialBalance {\n            ...Money\n          }\n          currentBalance {\n            ...Money\n          }\n          oldInitialBalance {\n            ...Money\n          }\n          oldCurrentBalance {\n            ...Money\n          }\n        }\n      }\n    }\n    isShippingRequired\n    canFinalize\n    createdAt\n    customerNote\n    discounts {\n      id\n      type\n      calculationMode: valueType\n      value\n      reason\n      amount {\n        ...Money\n      }\n    }\n    events {\n      ...OrderEvent\n    }\n    fulfillments {\n      ...Fulfillment\n    }\n    lines {\n      ...OrderLine\n      ...OrderFulfillmentLine\n    }\n    number\n    isPaid\n    paymentStatus\n    shippingAddress {\n      ...Address\n    }\n    fulfillmentMethod {\n      __typename\n      ... on ShippingMethod {\n        id\n      }\n      ... on Warehouse {\n        id\n        clickAndCollectOption\n      }\n    }\n    shippingMethod {\n      id\n    }\n    shippingMethodName\n    collectionPointName\n    shippingPrice {\n      gross {\n        amount\n        currency\n      }\n    }\n    status\n    subtotal {\n      gross {\n        ...Money\n      }\n      net {\n        ...Money\n      }\n    }\n    total {\n      gross {\n        ...Money\n      }\n      net {\n        ...Money\n      }\n      tax {\n        ...Money\n      }\n    }\n    actions\n    totalAuthorized {\n      ...Money\n    }\n    totalCaptured {\n      ...Money\n    }\n    totalBalance {\n      ...Money\n    }\n    undiscountedTotal {\n      net {\n        ...Money\n      }\n      gross {\n        ...Money\n      }\n    }\n    user {\n      id\n      email\n    }\n    userEmail\n    shippingMethods {\n      id\n      name\n      price {\n        ...Money\n      }\n      active\n      message\n    }\n    invoices {\n      ...Invoice\n    }\n    channel {\n      isActive\n      id\n      name\n      currencyCode\n      slug\n      defaultCountry {\n        code\n      }\n    }\n    isPaid\n  }\n"): (typeof documents)["\n  fragment OrderDetails on Order {\n    id\n    ...Metadata\n    billingAddress {\n      ...Address\n    }\n    giftCards {\n      events {\n        id\n        type\n        orderId\n        balance {\n          initialBalance {\n            ...Money\n          }\n          currentBalance {\n            ...Money\n          }\n          oldInitialBalance {\n            ...Money\n          }\n          oldCurrentBalance {\n            ...Money\n          }\n        }\n      }\n    }\n    isShippingRequired\n    canFinalize\n    createdAt\n    customerNote\n    discounts {\n      id\n      type\n      calculationMode: valueType\n      value\n      reason\n      amount {\n        ...Money\n      }\n    }\n    events {\n      ...OrderEvent\n    }\n    fulfillments {\n      ...Fulfillment\n    }\n    lines {\n      ...OrderLine\n      ...OrderFulfillmentLine\n    }\n    number\n    isPaid\n    paymentStatus\n    shippingAddress {\n      ...Address\n    }\n    fulfillmentMethod {\n      __typename\n      ... on ShippingMethod {\n        id\n      }\n      ... on Warehouse {\n        id\n        clickAndCollectOption\n      }\n    }\n    shippingMethod {\n      id\n    }\n    shippingMethodName\n    collectionPointName\n    shippingPrice {\n      gross {\n        amount\n        currency\n      }\n    }\n    status\n    subtotal {\n      gross {\n        ...Money\n      }\n      net {\n        ...Money\n      }\n    }\n    total {\n      gross {\n        ...Money\n      }\n      net {\n        ...Money\n      }\n      tax {\n        ...Money\n      }\n    }\n    actions\n    totalAuthorized {\n      ...Money\n    }\n    totalCaptured {\n      ...Money\n    }\n    totalBalance {\n      ...Money\n    }\n    undiscountedTotal {\n      net {\n        ...Money\n      }\n      gross {\n        ...Money\n      }\n    }\n    user {\n      id\n      email\n    }\n    userEmail\n    shippingMethods {\n      id\n      name\n      price {\n        ...Money\n      }\n      active\n      message\n    }\n    invoices {\n      ...Invoice\n    }\n    channel {\n      isActive\n      id\n      name\n      currencyCode\n      slug\n      defaultCountry {\n        code\n      }\n    }\n    isPaid\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderSettings on OrderSettings {\n    autoConfirmAllNewOrders\n    autoFulfillNonShippableGiftCard\n  }\n"): (typeof documents)["\n  fragment OrderSettings on OrderSettings {\n    autoConfirmAllNewOrders\n    autoFulfillNonShippableGiftCard\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShopOrderSettings on Site {\n    autoApproveFulfillment\n    fulfillmentAllowUnpaid\n  }\n"): (typeof documents)["\n  fragment ShopOrderSettings on Site {\n    autoApproveFulfillment\n    fulfillmentAllowUnpaid\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderFulfillmentLine on OrderLine {\n    id\n    isShippingRequired\n    productName\n    quantity\n    allocations {\n      id\n      quantity\n      warehouse {\n        id\n        name\n      }\n    }\n    quantityFulfilled\n    quantityToFulfill\n    product {\n      id\n      name\n      sku\n      preorder {\n        endDate\n      }\n      attributes {\n        values {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n      }\n      stocks {\n        ...Stock\n      }\n      trackInventory\n    }\n    thumbnail(size: 64) {\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment OrderFulfillmentLine on OrderLine {\n    id\n    isShippingRequired\n    productName\n    quantity\n    allocations {\n      id\n      quantity\n      warehouse {\n        id\n        name\n      }\n    }\n    quantityFulfilled\n    quantityToFulfill\n    product {\n      id\n      name\n      sku\n      preorder {\n        endDate\n      }\n      attributes {\n        values {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n      }\n      stocks {\n        ...Stock\n      }\n      trackInventory\n    }\n    thumbnail(size: 64) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderLineStockData on OrderLine {\n    id\n    allocations {\n      quantity\n      warehouse {\n        id\n      }\n    }\n    quantity\n    quantityToFulfill\n    product {\n      stocks {\n        ...Stock\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment OrderLineStockData on OrderLine {\n    id\n    allocations {\n      quantity\n      warehouse {\n        id\n      }\n    }\n    quantity\n    quantityToFulfill\n    product {\n      stocks {\n        ...Stock\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageKlass on PageKlass {\n    id\n    name\n    hasPages\n  }\n"): (typeof documents)["\n  fragment PageKlass on PageKlass {\n    id\n    name\n    hasPages\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageKlassDetails on PageKlass {\n    ...PageKlass\n    ...Metadata\n    attributes {\n      ...Attribute\n    }\n  }\n"): (typeof documents)["\n  fragment PageKlassDetails on PageKlass {\n    ...PageKlass\n    ...Metadata\n    attributes {\n      ...Attribute\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Page on Page {\n    id\n    title\n    slug\n    isPublished\n    content\n  }\n"): (typeof documents)["\n  fragment Page on Page {\n    id\n    title\n    slug\n    isPublished\n    content\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageSelectedAttribute on Attribute {\n    id\n    slug\n    name\n    inputType\n    entityType\n    valueRequired\n    unit\n    values(\n      first: $firstValues\n      after: $afterValues\n      last: $lastValues\n      before: $beforeValues\n    ) {\n      ...ValueList\n    }\n    # values {\n    #   edges {\n    #     node {\n    #       ...ValueDetails\n    #     }\n    #   }\n    # }\n  }\n"): (typeof documents)["\n  fragment PageSelectedAttribute on Attribute {\n    id\n    slug\n    name\n    inputType\n    entityType\n    valueRequired\n    unit\n    values(\n      first: $firstValues\n      after: $afterValues\n      last: $lastValues\n      before: $beforeValues\n    ) {\n      ...ValueList\n    }\n    # values {\n    #   edges {\n    #     node {\n    #       ...ValueDetails\n    #     }\n    #   }\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageAttributes on Page {\n    attributes {\n      ...PageSelectedAttribute\n    }\n    pageKlass {\n      id\n      name\n      attributes {\n        id\n        name\n        inputType\n        entityType\n        valueRequired\n        values(\n          first: $firstValues\n          after: $afterValues\n          last: $lastValues\n          before: $beforeValues\n        ) {\n          ...ValueList\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PageAttributes on Page {\n    attributes {\n      ...PageSelectedAttribute\n    }\n    pageKlass {\n      id\n      name\n      attributes {\n        id\n        name\n        inputType\n        entityType\n        valueRequired\n        values(\n          first: $firstValues\n          after: $afterValues\n          last: $lastValues\n          before: $beforeValues\n        ) {\n          ...ValueList\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageDetails on Page {\n    ...Page\n    ...PageAttributes\n    ...Metadata\n    content\n    seoTitle\n    seoDescription\n    publishedAt\n  }\n"): (typeof documents)["\n  fragment PageDetails on Page {\n    ...Page\n    ...PageAttributes\n    ...Metadata\n    content\n    seoTitle\n    seoDescription\n    publishedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ConfigurationItem on ConfigurationItem {\n    name\n    value\n    type\n    helpText\n    label\n  }\n"): (typeof documents)["\n  fragment ConfigurationItem on ConfigurationItem {\n    name\n    value\n    type\n    helpText\n    label\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PluginConfigurationBase on PluginConfiguration {\n    active\n    channel {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment PluginConfigurationBase on PluginConfiguration {\n    active\n    channel {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PluginConfigurationExtended on PluginConfiguration {\n    ...PluginConfigurationBase\n    configuration {\n      ...ConfigurationItem\n    }\n  }\n"): (typeof documents)["\n  fragment PluginConfigurationExtended on PluginConfiguration {\n    ...PluginConfigurationBase\n    configuration {\n      ...ConfigurationItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PluginBase on Plugin {\n    id\n    name\n    description\n    channelConfigurations {\n      ...PluginConfigurationBase\n    }\n    globalConfiguration {\n      ...PluginConfigurationBase\n    }\n  }\n"): (typeof documents)["\n  fragment PluginBase on Plugin {\n    id\n    name\n    description\n    channelConfigurations {\n      ...PluginConfigurationBase\n    }\n    globalConfiguration {\n      ...PluginConfigurationBase\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PluginsDetails on Plugin {\n    id\n    name\n    description\n    globalConfiguration {\n      ...PluginConfigurationExtended\n    }\n    channelConfigurations {\n      ...PluginConfigurationExtended\n    }\n  }\n"): (typeof documents)["\n  fragment PluginsDetails on Plugin {\n    id\n    name\n    description\n    globalConfiguration {\n      ...PluginConfigurationExtended\n    }\n    channelConfigurations {\n      ...PluginConfigurationExtended\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductKlass on ProductKlass {\n    id\n    name\n    kind\n    hasVariants\n    isShippingRequired\n    taxClass {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment ProductKlass on ProductKlass {\n    id\n    name\n    kind\n    hasVariants\n    isShippingRequired\n    taxClass {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductKlassDetails on ProductKlass {\n    ...ProductKlass\n    ...Metadata\n    productAttributes {\n      ...Attribute\n    }\n    variantAttributes {\n      ...Attribute\n    }\n    productVariantAttributeAssignments {\n      attribute {\n        ...Attribute\n      }\n      variantSelection\n    }\n    weight\n    # {\n    #   unit\n    #   value\n    # }\n  }\n"): (typeof documents)["\n  fragment ProductKlassDetails on ProductKlass {\n    ...ProductKlass\n    ...Metadata\n    productAttributes {\n      ...Attribute\n    }\n    variantAttributes {\n      ...Attribute\n    }\n    productVariantAttributeAssignments {\n      attribute {\n        ...Attribute\n      }\n      variantSelection\n    }\n    weight\n    # {\n    #   unit\n    #   value\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Stock on Stock {\n    id\n    quantity\n    quantityAllocated\n    warehouse {\n      ...Warehouse\n    }\n  }\n"): (typeof documents)["\n  fragment Stock on Stock {\n    id\n    quantity\n    quantityAllocated\n    warehouse {\n      ...Warehouse\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Preorder on PreorderData {\n    globalThreshold\n    globalSoldUnits\n    endDate\n  }\n"): (typeof documents)["\n  fragment Preorder on PreorderData {\n    globalThreshold\n    globalSoldUnits\n    endDate\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PriceRange on TaxedMoneyRange {\n    start {\n      net {\n        ...Money\n      }\n    }\n    stop {\n      net {\n        ...Money\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PriceRange on TaxedMoneyRange {\n    start {\n      net {\n        ...Money\n      }\n    }\n    stop {\n      net {\n        ...Money\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChannelListingProductWithoutPricing on ProductChannelListing {\n    id\n    isPublished\n    publishedAt\n    isAvailableForPurchase\n    visibleInListings\n    channel {\n      id\n      name\n      currencyCode\n    }\n  }\n"): (typeof documents)["\n  fragment ChannelListingProductWithoutPricing on ProductChannelListing {\n    id\n    isPublished\n    publishedAt\n    isAvailableForPurchase\n    visibleInListings\n    channel {\n      id\n      name\n      currencyCode\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ChannelListingProduct on ProductChannelListing {\n    ...ChannelListingProductWithoutPricing\n    pricing {\n      priceRange {\n        ...PriceRange\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ChannelListingProduct on ProductChannelListing {\n    ...ChannelListingProductWithoutPricing\n    pricing {\n      priceRange {\n        ...PriceRange\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductWithChannelListings on Product {\n    id\n    name\n    thumbnail {\n      url\n    }\n    productKlass {\n      id\n      name\n      hasVariants\n    }\n    channelListings {\n      ...ChannelListingProductWithoutPricing\n      pricing @include(if: $hasChannel) {\n        priceRange {\n          ...PriceRange\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProductWithChannelListings on Product {\n    id\n    name\n    thumbnail {\n      url\n    }\n    productKlass {\n      id\n      name\n      hasVariants\n    }\n    channelListings {\n      ...ChannelListingProductWithoutPricing\n      pricing @include(if: $hasChannel) {\n        priceRange {\n          ...PriceRange\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductAttributes on Product {\n    id\n    attributes {\n      id\n      slug\n      name\n      inputType\n      entityType\n      valueRequired\n      unit\n      values(\n        first: $firstValues\n        after: $afterValues\n        last: $lastValues\n        before: $beforeValues\n      ) {\n        ...ValueList\n      }\n      # values {\n      #   ...ValueDetails\n      # }\n    }\n    productKlass {\n      id\n      variantAttributes {\n        id\n        name\n        inputType\n        valueRequired\n        unit\n        values(\n          first: $firstValues\n          after: $afterValues\n          last: $lastValues\n          before: $beforeValues\n        ) {\n          ...ValueList\n        }\n      }\n    }\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProductAttributes on Product {\n    id\n    attributes {\n      id\n      slug\n      name\n      inputType\n      entityType\n      valueRequired\n      unit\n      values(\n        first: $firstValues\n        after: $afterValues\n        last: $lastValues\n        before: $beforeValues\n      ) {\n        ...ValueList\n      }\n      # values {\n      #   ...ValueDetails\n      # }\n    }\n    productKlass {\n      id\n      variantAttributes {\n        id\n        name\n        inputType\n        valueRequired\n        unit\n        values(\n          first: $firstValues\n          after: $afterValues\n          last: $lastValues\n          before: $beforeValues\n        ) {\n          ...ValueList\n        }\n      }\n    }\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductDetailsVariant on Product {\n    id\n    ... on ConcreteProduct {\n      sku\n      trackInventory\n      quantityLimitPerCustomer\n    }\n    name\n    attributes {\n      id\n      name\n      values {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n    media {\n      url(size: 200)\n    }\n    stocks {\n      ...Stock\n    }\n    preorder {\n      ...Preorder\n    }\n    channelListings {\n      ...ChannelListingProduct\n    }\n  }\n"): (typeof documents)["\n  fragment ProductDetailsVariant on Product {\n    id\n    ... on ConcreteProduct {\n      sku\n      trackInventory\n      quantityLimitPerCustomer\n    }\n    name\n    attributes {\n      id\n      name\n      values {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n    media {\n      url(size: 200)\n    }\n    stocks {\n      ...Stock\n    }\n    preorder {\n      ...Preorder\n    }\n    channelListings {\n      ...ChannelListingProduct\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Product on Product {\n    id\n    ...ProductAttributes\n    ...Metadata\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n    rating\n    defaultVariant {\n      id\n    }\n    category {\n      id\n      name\n    }\n    collections {\n      id\n      name\n    }\n    channelListings {\n      ...ChannelListingProductWithoutPricing\n    }\n    media {\n      ...ProductMediaItem\n    }\n    isAvailableForPurchase\n    variants {\n      ...ProductDetailsVariant\n    }\n    productKlass {\n      id\n      name\n      hasVariants\n    }\n    weight\n    taxClass {\n      id\n      name\n    }\n    name\n    parent {\n      id\n      defaultVariant {\n        id\n      }\n      media {\n        ...ProductMediaItem\n      }\n      name\n      thumbnail {\n        url\n      }\n      channelListings {\n        id\n        publishedAt\n        isPublished\n        channel {\n          id\n          name\n          currencyCode\n        }\n      }\n      variants {\n        id\n        name\n        ... on ConcreteProduct {\n            sku\n        }\n        media {\n          id\n          url\n          type\n          oembedData\n        }\n      }\n      defaultVariant {\n        id\n      }\n    }\n    selectionAttributes: attributes(variantSelection: VARIANT_SELECTION) {\n      ...Attribute\n    }\n    nonSelectionAttributes: attributes(variantSelection: NOT_VARIANT_SELECTION) {\n      ...Attribute\n    }\n    media {\n      id\n      url\n      type\n      # oembedData\n    }\n    channelListings {\n      ...ChannelListingProduct\n    }\n    ... on ConcreteProduct {\n      trackInventory\n      sku\n      quantityLimitPerCustomer\n    }\n    stocks {\n      ...Stock\n    }\n    preorder {\n      ...Preorder\n    }\n  }\n"): (typeof documents)["\n  fragment Product on Product {\n    id\n    ...ProductAttributes\n    ...Metadata\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n    rating\n    defaultVariant {\n      id\n    }\n    category {\n      id\n      name\n    }\n    collections {\n      id\n      name\n    }\n    channelListings {\n      ...ChannelListingProductWithoutPricing\n    }\n    media {\n      ...ProductMediaItem\n    }\n    isAvailableForPurchase\n    variants {\n      ...ProductDetailsVariant\n    }\n    productKlass {\n      id\n      name\n      hasVariants\n    }\n    weight\n    taxClass {\n      id\n      name\n    }\n    name\n    parent {\n      id\n      defaultVariant {\n        id\n      }\n      media {\n        ...ProductMediaItem\n      }\n      name\n      thumbnail {\n        url\n      }\n      channelListings {\n        id\n        publishedAt\n        isPublished\n        channel {\n          id\n          name\n          currencyCode\n        }\n      }\n      variants {\n        id\n        name\n        ... on ConcreteProduct {\n            sku\n        }\n        media {\n          id\n          url\n          type\n          oembedData\n        }\n      }\n      defaultVariant {\n        id\n      }\n    }\n    selectionAttributes: attributes(variantSelection: VARIANT_SELECTION) {\n      ...Attribute\n    }\n    nonSelectionAttributes: attributes(variantSelection: NOT_VARIANT_SELECTION) {\n      ...Attribute\n    }\n    media {\n      id\n      url\n      type\n      # oembedData\n    }\n    channelListings {\n      ...ChannelListingProduct\n    }\n    ... on ConcreteProduct {\n      trackInventory\n      sku\n      quantityLimitPerCustomer\n    }\n    stocks {\n      ...Stock\n    }\n    preorder {\n      ...Preorder\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductAttribute on Attribute {\n    id\n    name\n    slug\n    inputType\n    entityType\n    valueRequired\n    unit\n    values(\n      first: $firstValues\n      after: $afterValues\n      last: $lastValues\n      before: $beforeValues\n    ) {\n      ...ValueList\n    }\n  }\n"): (typeof documents)["\n  fragment ProductAttribute on Attribute {\n    id\n    name\n    slug\n    inputType\n    entityType\n    valueRequired\n    unit\n    values(\n      first: $firstValues\n      after: $afterValues\n      last: $lastValues\n      before: $beforeValues\n    ) {\n      ...ValueList\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ExportFile on ExportFile {\n    id\n    status\n    url\n  }\n"): (typeof documents)["\n  fragment ExportFile on ExportFile {\n    id\n    status\n    url\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductListAttribute on Attribute {\n    id\n    values {\n      edges {\n        node {\n          ...Value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProductListAttribute on Attribute {\n    id\n    values {\n      edges {\n        node {\n          ...Value\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShippingZone on ShippingZone {\n    ...Metadata\n    id\n    countries {\n      code\n      name\n    }\n    name\n    description\n  }\n"): (typeof documents)["\n  fragment ShippingZone on ShippingZone {\n    ...Metadata\n    id\n    countries {\n      code\n      name\n    }\n    name\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShippingMethodWithPostalCodes on ShippingMethod {\n    id\n    postalCodeRules {\n      id\n      inclusionType\n      start\n      end\n    }\n  }\n"): (typeof documents)["\n  fragment ShippingMethodWithPostalCodes on ShippingMethod {\n    id\n    postalCodeRules {\n      id\n      inclusionType\n      start\n      end\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShippingMethod_ on ShippingMethod {\n    ...ShippingMethodWithPostalCodes\n    ...Metadata\n    taxClass {\n      name\n      id\n    }\n    minimumOrderWeight\n    # {\n    #   unit\n    #   value\n    # }\n    maximumOrderWeight\n    # {\n    #   unit\n    #   value\n    # }\n    minimumDeliveryDays\n    maximumDeliveryDays\n    name\n    description\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n      price {\n        ...Money\n      }\n      minimumOrderPrice {\n        ...Money\n      }\n      maximumOrderPrice {\n        ...Money\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ShippingMethod_ on ShippingMethod {\n    ...ShippingMethodWithPostalCodes\n    ...Metadata\n    taxClass {\n      name\n      id\n    }\n    minimumOrderWeight\n    # {\n    #   unit\n    #   value\n    # }\n    maximumOrderWeight\n    # {\n    #   unit\n    #   value\n    # }\n    minimumDeliveryDays\n    maximumDeliveryDays\n    name\n    description\n    channelListings {\n      id\n      channel {\n        id\n        name\n        currencyCode\n      }\n      price {\n        ...Money\n      }\n      minimumOrderPrice {\n        ...Money\n      }\n      maximumOrderPrice {\n        ...Money\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShippingMethodWithExcludedProducts on ShippingMethod {\n    ...ShippingMethod\n    excludedProducts(before: $before, after: $after, first: $first, last: $last) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n      edges {\n        node {\n          id\n          name\n          thumbnail {\n            url\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ShippingMethodWithExcludedProducts on ShippingMethod {\n    ...ShippingMethod\n    excludedProducts(before: $before, after: $after, first: $first, last: $last) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n      edges {\n        node {\n          id\n          name\n          thumbnail {\n            url\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShippingZoneDetails on ShippingZone {\n    ...ShippingZone\n    shippingMethods {\n      ...ShippingMethod\n    }\n    warehouses {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment ShippingZoneDetails on ShippingZone {\n    ...ShippingZone\n    shippingMethods {\n      ...ShippingMethod\n    }\n    warehouses {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CountryWithCode on Country {\n    name\n    code\n  }\n"): (typeof documents)["\n  fragment CountryWithCode on Country {\n    name\n    code\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment LimitInfo on Limits {\n    channels @include(if: $channels)\n    orders @include(if: $orders)\n    productVariants @include(if: $productVariants)\n    staffUsers @include(if: $staffUsers)\n    warehouses @include(if: $warehouses)\n  }\n\n  fragment ShopLimit on Site {\n    limits {\n      currentUsage {\n        ...LimitInfo\n      }\n      allowedUsage {\n        ...LimitInfo\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment LimitInfo on Limits {\n    channels @include(if: $channels)\n    orders @include(if: $orders)\n    productVariants @include(if: $productVariants)\n    staffUsers @include(if: $staffUsers)\n    warehouses @include(if: $warehouses)\n  }\n\n  fragment ShopLimit on Site {\n    limits {\n      currentUsage {\n        ...LimitInfo\n      }\n      allowedUsage {\n        ...LimitInfo\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Shop on Site {\n    companyAddress {\n      ...Address\n    }\n    countries {\n      code\n      name\n    }\n    customerSetPasswordUrl\n    defaultMailSenderAddress\n    defaultMailSenderName\n    description\n    domain\n    name\n    reserveStockDurationAnonymousUser\n    reserveStockDurationAuthenticatedUser\n    maxItemCountPerCheckout\n  }\n"): (typeof documents)["\n  fragment Shop on Site {\n    companyAddress {\n      ...Address\n    }\n    countries {\n      code\n      name\n    }\n    customerSetPasswordUrl\n    defaultMailSenderAddress\n    defaultMailSenderName\n    description\n    domain\n    name\n    reserveStockDurationAnonymousUser\n    reserveStockDurationAuthenticatedUser\n    maxItemCountPerCheckout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StaffMember on User {\n    id\n    email\n    firstName\n    isActive\n    lastName\n  }\n"): (typeof documents)["\n  fragment StaffMember on User {\n    id\n    email\n    firstName\n    isActive\n    lastName\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StaffMemberDetails on User {\n    ...StaffMember\n    groups {\n      id\n      name\n      userCanManage\n    }\n    userPermissions {\n      code\n      name\n    }\n    avatar(size: 120) {\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment StaffMemberDetails on User {\n    ...StaffMember\n    groups {\n      id\n      name\n      userCanManage\n    }\n    userPermissions {\n      code\n      name\n    }\n    avatar(size: 120) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaxedMoney on TaxedMoney {\n    net {\n      ...Money\n    }\n    gross {\n      ...Money\n    }\n  }\n"): (typeof documents)["\n  fragment TaxedMoney on TaxedMoney {\n    net {\n      ...Money\n    }\n    gross {\n      ...Money\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaxConfigurationPerCountry on TaxConfigurationPerCountry {\n    country {\n      ...CountryWithCode\n    }\n    chargeTaxes\n    taxCalculationStrategy\n    displayGrossPrices\n  }\n"): (typeof documents)["\n  fragment TaxConfigurationPerCountry on TaxConfigurationPerCountry {\n    country {\n      ...CountryWithCode\n    }\n    chargeTaxes\n    taxCalculationStrategy\n    displayGrossPrices\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaxConfiguration on TaxConfiguration {\n    id\n    channel {\n      id\n      name\n    }\n    displayGrossPrices\n    pricesEnteredWithTax\n    chargeTaxes\n    taxCalculationStrategy\n    countries {\n      ...TaxConfigurationPerCountry\n    }\n  }\n"): (typeof documents)["\n  fragment TaxConfiguration on TaxConfiguration {\n    id\n    channel {\n      id\n      name\n    }\n    displayGrossPrices\n    pricesEnteredWithTax\n    chargeTaxes\n    taxCalculationStrategy\n    countries {\n      ...TaxConfigurationPerCountry\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaxCountryConfiguration on TaxCountryConfiguration {\n    country {\n      ...CountryWithCode\n    }\n    taxClassCountryRates {\n      rate\n      taxClass {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment TaxCountryConfiguration on TaxCountryConfiguration {\n    country {\n      ...CountryWithCode\n    }\n    taxClassCountryRates {\n      rate\n      taxClass {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaxRate on TaxClassCountryRate {\n    country {\n      ...CountryWithCode\n    }\n    rate\n  }\n"): (typeof documents)["\n  fragment TaxRate on TaxClassCountryRate {\n    country {\n      ...CountryWithCode\n    }\n    rate\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaxClassBase on TaxClass {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment TaxClassBase on TaxClass {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaxClass on TaxClass {\n    ...TaxClassBase\n    countries {\n      ...TaxRate\n    }\n    ...Metadata\n  }\n"): (typeof documents)["\n  fragment TaxClass on TaxClass {\n    ...TaxClassBase\n    countries {\n      ...TaxRate\n    }\n    ...Metadata\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TimePeriod on TimePeriod {\n    amount\n    type\n  }\n"): (typeof documents)["\n  fragment TimePeriod on TimePeriod {\n    amount\n    type\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ValueTranslatable on ValueTranslation {\n    id\n    name\n    plainText\n    richText\n    value {\n      id\n      name\n    }\n    attribute {\n      id\n      name\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    #   plainText\n    #   richText\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n"): (typeof documents)["\n  fragment ValueTranslatable on ValueTranslation {\n    id\n    name\n    plainText\n    richText\n    value {\n      id\n      name\n    }\n    attribute {\n      id\n      name\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    #   plainText\n    #   richText\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryTranslation on CategoryTranslation {\n    id\n    description\n    language {\n      language\n    }\n    name\n    seoDescription\n    seoTitle\n    # translation(languageCode: $language) {\n    #   id\n    #   description\n    #   language {\n    #     language\n    #   }\n    #   name\n    #   seoDescription\n    #   seoTitle\n    # }\n    category {\n      id\n      name\n      description\n      seoDescription\n      seoTitle\n    }\n  }\n"): (typeof documents)["\n  fragment CategoryTranslation on CategoryTranslation {\n    id\n    description\n    language {\n      language\n    }\n    name\n    seoDescription\n    seoTitle\n    # translation(languageCode: $language) {\n    #   id\n    #   description\n    #   language {\n    #     language\n    #   }\n    #   name\n    #   seoDescription\n    #   seoTitle\n    # }\n    category {\n      id\n      name\n      description\n      seoDescription\n      seoTitle\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CollectionTranslation on CollectionTranslation {\n    collection {\n      id\n      name\n      description\n      seoDescription\n      seoTitle\n    }\n    id\n    description\n    language {\n      language\n    }\n    name\n    seoDescription\n    seoTitle\n    # translation(languageCode: $language) {\n    #   id\n    #   description\n    #   language {\n    #     language\n    #   }\n    #   name\n    #   seoDescription\n    #   seoTitle\n    # }\n  }\n"): (typeof documents)["\n  fragment CollectionTranslation on CollectionTranslation {\n    collection {\n      id\n      name\n      description\n      seoDescription\n      seoTitle\n    }\n    id\n    description\n    language {\n      language\n    }\n    name\n    seoDescription\n    seoTitle\n    # translation(languageCode: $language) {\n    #   id\n    #   description\n    #   language {\n    #     language\n    #   }\n    #   name\n    #   seoDescription\n    #   seoTitle\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductTranslation on ProductTranslation {\n    product {\n      id\n      name\n      description\n      seoDescription\n      seoTitle\n    }\n    # values {\n    #   ...ValueTranslatable\n    # }\n    id\n    seoTitle\n    seoDescription\n    name\n    description\n    language {\n      code\n      language\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   seoTitle\n    #   seoDescription\n    #   name\n    #   description\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n"): (typeof documents)["\n  fragment ProductTranslation on ProductTranslation {\n    product {\n      id\n      name\n      description\n      seoDescription\n      seoTitle\n    }\n    # values {\n    #   ...ValueTranslatable\n    # }\n    id\n    seoTitle\n    seoDescription\n    name\n    description\n    language {\n      code\n      language\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   seoTitle\n    #   seoDescription\n    #   name\n    #   description\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductVariantTranslation on ProductTranslation {\n    id\n    name\n    language {\n      code\n      language\n    }\n    product {\n      id\n      name\n    }\n    # values {\n    #   ...ValueTranslatable\n    # }\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n"): (typeof documents)["\n  fragment ProductVariantTranslation on ProductTranslation {\n    id\n    name\n    language {\n      code\n      language\n    }\n    product {\n      id\n      name\n    }\n    # values {\n    #   ...ValueTranslatable\n    # }\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SaleTranslation on SaleTranslation {\n    id\n    name\n    language {\n      code\n      language\n    }\n    sale {\n      id\n      name\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     code\n    #     language\n    #   }\n    #   name\n    # }\n  }\n"): (typeof documents)["\n  fragment SaleTranslation on SaleTranslation {\n    id\n    name\n    language {\n      code\n      language\n    }\n    sale {\n      id\n      name\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     code\n    #     language\n    #   }\n    #   name\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment VoucherTranslation on VoucherTranslation {\n    id\n    language {\n      code\n      language\n    }\n    name\n    voucher {\n      id\n      name\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     code\n    #     language\n    #   }\n    #   name\n    # }\n  }\n"): (typeof documents)["\n  fragment VoucherTranslation on VoucherTranslation {\n    id\n    language {\n      code\n      language\n    }\n    name\n    voucher {\n      id\n      name\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     code\n    #     language\n    #   }\n    #   name\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ShippingMethodTranslation on ShippingMethodTranslation {\n    id\n    language {\n      code\n      language\n    }\n    name\n    description\n    shippingMethod {\n      id\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     code\n    #     language\n    #   }\n    #   name\n    #   description\n    # }\n  }\n"): (typeof documents)["\n  fragment ShippingMethodTranslation on ShippingMethodTranslation {\n    id\n    language {\n      code\n      language\n    }\n    name\n    description\n    shippingMethod {\n      id\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     code\n    #     language\n    #   }\n    #   name\n    #   description\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageTranslation on PageTranslation {\n    id\n    content\n    seoDescription\n    seoTitle\n    title\n    language {\n      code\n      language\n    }\n    page {\n      id\n      content\n      seoDescription\n      seoTitle\n      title\n    }\n    # values {\n    #   ...ValueTranslatable\n    # }\n  }\n"): (typeof documents)["\n  fragment PageTranslation on PageTranslation {\n    id\n    content\n    seoDescription\n    seoTitle\n    title\n    language {\n      code\n      language\n    }\n    page {\n      id\n      content\n      seoDescription\n      seoTitle\n      title\n    }\n    # values {\n    #   ...ValueTranslatable\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageTranslatable on PageTranslation {\n    id\n    content\n    seoDescription\n    seoTitle\n    title\n    language {\n      code\n      language\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   content\n    #   seoDescription\n    #   seoTitle\n    #   title\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n"): (typeof documents)["\n  fragment PageTranslatable on PageTranslation {\n    id\n    content\n    seoDescription\n    seoTitle\n    title\n    language {\n      code\n      language\n    }\n    # translation(languageCode: $language) {\n    #   id\n    #   content\n    #   seoDescription\n    #   seoTitle\n    #   title\n    #   language {\n    #     code\n    #     language\n    #   }\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AttributeChoicesTranslation on ValueConnection {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      cursor\n      node {\n        id\n        name\n        plainText\n        richText\n        inputType\n        translation(languageCode: $language) {\n          id\n          name\n          plainText\n          richText\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment AttributeChoicesTranslation on ValueConnection {\n    pageInfo {\n      ...PageInfo\n    }\n    edges {\n      cursor\n      node {\n        id\n        name\n        plainText\n        richText\n        inputType\n        translation(languageCode: $language) {\n          id\n          name\n          plainText\n          richText\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AttributeTranslation on AttributeTranslation {\n    id\n    name\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    # }\n    attribute {\n      id\n      name\n      inputType\n    }\n  }\n"): (typeof documents)["\n  fragment AttributeTranslation on AttributeTranslation {\n    id\n    name\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    # }\n    attribute {\n      id\n      name\n      inputType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AttributeTranslationDetails on AttributeTranslation {\n    id\n    name\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    # }\n    attribute {\n      id\n      name\n      inputType\n      withChoices\n      values(\n        first: $firstValues\n        after: $afterValues\n        last: $lastValues\n        before: $beforeValues\n      ) {\n        ...AttributeChoicesTranslation\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment AttributeTranslationDetails on AttributeTranslation {\n    id\n    name\n    # translation(languageCode: $language) {\n    #   id\n    #   name\n    # }\n    attribute {\n      id\n      name\n      inputType\n      withChoices\n      values(\n        first: $firstValues\n        after: $afterValues\n        last: $lastValues\n        before: $beforeValues\n      ) {\n        ...AttributeChoicesTranslation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MenuItemTranslation on MenuItemTranslation {\n    id\n    language {\n      language\n    }\n    name\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     language\n    #   }\n    #   name\n    # }\n    menuItem {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment MenuItemTranslation on MenuItemTranslation {\n    id\n    language {\n      language\n    }\n    name\n    # translation(languageCode: $language) {\n    #   id\n    #   language {\n    #     language\n    #   }\n    #   name\n    # }\n    menuItem {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Warehouse on Warehouse {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment Warehouse on Warehouse {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WarehouseWithShipping on Warehouse {\n    ...Warehouse\n    shippingZones(first: 100) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment WarehouseWithShipping on Warehouse {\n    ...Warehouse\n    shippingZones(first: 100) {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WarehouseDetails on Warehouse {\n    isPrivate\n    clickAndCollectOption\n    ...WarehouseWithShipping\n    address {\n      ...Address\n    }\n  }\n"): (typeof documents)["\n  fragment WarehouseDetails on Warehouse {\n    isPrivate\n    clickAndCollectOption\n    ...WarehouseWithShipping\n    address {\n      ...Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Webhook on Webhook {\n    id\n    name\n    isActive\n    app {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment Webhook on Webhook {\n    id\n    name\n    isActive\n    app {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WebhookDetails on Webhook {\n    ...Webhook\n    syncEvents {\n      eventType\n    }\n    asyncEvents {\n      eventType\n    }\n    secretKey\n    targetUrl\n  }\n"): (typeof documents)["\n  fragment WebhookDetails on Webhook {\n    ...Webhook\n    syncEvents {\n      eventType\n    }\n    asyncEvents {\n      eventType\n    }\n    secretKey\n    targetUrl\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;