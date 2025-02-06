import { gql } from '@tempo/api';

export const updateProductTranslations = gql(`
  mutation UpdateProductTranslations(
    $id: ID!
    $input: TranslationInput!
    $language: LanguageCode!
  ) {
    translateProduct(id: $id, data: $input, languageCode: $language) {
      errors {
        ...Error
      }
      result {
        id
        name
        description
        seoDescription
        seoTitle
        translation(languageCode: $language) {
          id
          description
          language {
            code
            language
          }
          name
          seoDescription
          seoTitle
        }
      }
    }
  }
`);

export const updateCategoryTranslations = gql(`
  mutation UpdateCategoryTranslations(
    $id: ID!
    $input: TranslationInput!
    $language: LanguageCode!
  ) {
    translateCategory(id: $id, data: $input, languageCode: $language) {
      errors {
        ...Error
      }
      result {
        id
        name
        description
        seoDescription
        seoTitle
        translation(languageCode: $language) {
          id
          description
          language {
            language
          }
          name
          seoDescription
          seoTitle
        }
      }
    }
  }
`);

export const updateCollectionTranslations = gql(`
  mutation UpdateCollectionTranslations(
    $id: ID!
    $input: TranslationInput!
    $language: LanguageCode!
  ) {
    translateCollection(id: $id, data: $input, languageCode: $language) {
      errors {
        ...Error
      }
      result {
        id
        name
        description
        seoDescription
        seoTitle
        translation(languageCode: $language) {
          id
          description
          language {
            language
          }
          name
          seoDescription
          seoTitle
        }
      }
    }
  }
`);

export const updatePageTranslations = gql(`
  mutation UpdatePageTranslations(
    $id: ID!
    $input: PageTranslationInput!
    $language: LanguageCode!
  ) {
    translatePage(id: $id, data: $input, languageCode: $language) {
      errors {
        ...Error
      }
      result {
        translation(languageCode: $language) {
          ...PageTranslation
        }
      }
    }
  }
`);

export const updateAttributeTranslations = gql(`
  mutation UpdateAttributeTranslations(
    $id: ID!
    $input: NameTranslationInput!
    $language: LanguageCode!
  ) {
    translateAttribute(id: $id, data: $input, languageCode: $language) {
      errors {
        ...Error
      }
      result {
        id
        name
        translation(languageCode: $language) {
          id
          name
        }
      }
    }
  }
`);

export const updateMethodItemTranslations = gql(`
  mutation UpdateMenuItemTranslations(
    $id: ID!
    $input: NameTranslationInput!
    $language: LanguageCode!
  ) {
    translateMenuItem(id: $id, data: $input, languageCode: $language) {
      errors {
        field
        message
      }
      result {
        id
        name
        translation(languageCode: $language) {
          id
          language {
            language
          }
          name
        }
      }
    }
  }
`);
