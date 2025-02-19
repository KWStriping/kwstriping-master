export type MessageDescriptor = {
  id: string;
  defaultMessage?: string;
  description?: string | object;
};

export type CommonTypeDeleteWarningMessages = Record<
  'title' | 'viewAssignedItemsButtonLabel',
  MessageDescriptor
>;

export type TypeDeleteWarningMessages = Partial<
  Record<'description' | 'consentLabel', MessageDescriptor>
>;
