import { gql } from '@tempo/api';

export const updateShopSettings = gql(`
  mutation ShopSettingsUpdate(
    $shopSettingsInput: ShopSettingsUpdateInput!
    $addressInput: AddressUpdateInput!
  ) {
    updateShopSettings(data: $shopSettingsInput) {
      errors {
        ...Error
      }
      result {
        ...Shop
      }
    }
    updateShopAddress(data: $addressInput) {
      errors {
        ...Error
      }
      result {
        companyAddress {
          ...Address
        }
      }
    }
  }
`);
