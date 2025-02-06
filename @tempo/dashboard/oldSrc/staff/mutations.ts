import { gql } from '@tempo/api';

export const staffMemberAddMutation = gql(`
  mutation StaffMemberAdd($input: StaffCreationInput!) {
    createStaffMember(data: $input) {
      errors {
        ...Error
      }
      result {
        ...StaffMemberDetails
      }
    }
  }
`);

export const staffMemberUpdateMutation = gql(`
  mutation StaffMemberUpdate($id: ID!, $input: StaffUpdateInput!) {
    updateStaffMember(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...StaffMemberDetails
      }
    }
  }
`);

export const staffMemberDeleteMutation = gql(`
  mutation StaffMemberDelete($id: ID!) {
    deleteStaffMember(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const staffAvatarUpdateMutation = gql(`
  mutation StaffAvatarUpdate($image: Upload!) {
    updateUserAvatar(image: $image) {
      errors {
        ...Error
      }
      result {
        id
        avatar {
          url
        }
      }
    }
  }
`);

export const staffAvatarDeleteMutation = gql(`
  mutation StaffAvatarDelete {
    deleteUserAvatar {
      errors {
        ...Error
      }
      result {
        id
        avatar {
          url
        }
      }
    }
  }
`);

export const changeStaffPassword = gql(`
  mutation ChangeStaffPassword($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword) {
      errors {
        ...Error
      }
    }
  }
`);
