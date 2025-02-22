import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { LanguageFragment } from '@tempo/api/generated/graphql';
import type { OutputData } from '@editorjs/editorjs';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';

export enum TranslationInputFieldName {
  description = 'description',
  name = 'name',
  seoDescription = 'seoDescription',
  seoTitle = 'seoTitle',
  richText = 'richText',
}

export enum PageTranslationInputFieldName {
  content = 'content',
  title = 'title',
  seoDescription = 'seoDescription',
  seoTitle = 'seoTitle',
  richText = 'richText',
}

export const TranslationFieldType = {
  SHORT: 'short',
  LONG: 'long',
  RICH: 'rich',
} as const;

export type TranslationFieldType =
  (typeof TranslationFieldType)[keyof typeof TranslationFieldType];

export interface TranslationField<T extends string = string> {
  id?: string;
  displayName: string;
  name: T;
  translation: string;
  type: TranslationFieldType;
  value: string;
}

export interface TranslationsEntitiesPageProps {
  translationId: string;
  activeField: string;
  disabled: boolean;
  languageCode: string;
  languages: LanguageFragment[];
  saveButtonState: ConfirmButtonTransitionState;
  onEdit: (field: string) => void;
  onDiscard: () => void;
  onSubmit: (field: TranslationField, data: string | OutputData) => SubmitPromise<any[]>;
}
