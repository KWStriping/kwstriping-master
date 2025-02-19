export const baseMessages = {
  title: {
    id: 'x3leH4',
    defaultMessage: 'Delete product {selectedTypesCount,plural,one{{type}} other{{types}}',
    description: 'ProductKlassDeleteWarningDialog title',
  },
  viewAssignedItemsButtonLabel: {
    id: 'GCPzKf',
    defaultMessage: 'View products',
    description: 'ProductKlassDeleteWarningDialog single assigned items button label',
  },
};

export const singleWithItemsMessages = {
  description: {
    id: 'ZFfG4L',
    defaultMessage:
      'You are about to delete product type <b>{{typeName}}</b>. It is assigned to {{assignedItemsCount}} {assignedItemsCount,plural,one{{product}} other{{products}}. Deleting this product type will also delete those products. Are you sure you want to do this?',
    description: 'ProductKlassDeleteWarningDialog single assigned items description',
  },
  consentLabel: {
    id: 'bk9KUX',
    defaultMessage: 'Yes, I want to delete this product type and assigned products',
    description: 'ProductKlassDeleteWarningDialog single consent label',
  },
};

export const multipleWithItemsMessages = {
  description: {
    id: '3dVKNR',
    defaultMessage:
      'You are about to delete multiple product types. Some of them are assigned to products. Deleting those product types will also delete those products',
    description: 'ProductKlassDeleteWarningDialog with items multiple description',
  },
  consentLabel: {
    id: '0em8tI',
    defaultMessage: 'Yes, I want to delete those products types and assigned products',
    description: 'ProductKlassDeleteWarningDialog multiple consent label',
  },
};

export const singleWithoutItemsMessages = {
  description: {
    id: 'HivFnX',
    defaultMessage:
      'Are you sure you want to delete <b>{{typeName}}</b>? If you remove it you won’t be able to assign it to created products.',
    description: 'ProductKlassDeleteWarningDialog single no assigned items description',
  },
};

export const multipleWithoutItemsMessages = {
  description: {
    id: 'aPqizA',
    defaultMessage:
      'Are you sure you want to delete selected product types? If you remove them you won’t be able to assign them to created products.',
    description: 'ProductKlassDeleteWarningDialog multiple assigned items description',
  },
};
