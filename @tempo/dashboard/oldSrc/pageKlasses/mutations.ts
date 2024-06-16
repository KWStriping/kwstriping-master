import { gql } from '@tempo/api';

export const updatePageKlassMutation = gql(`
  mutation PageKlassUpdate($id: ID!, $input: PageKlassUpdateInput!) {
    updatePageKlass(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...PageKlassDetails
      }
    }
  }
`);

export const createPageKlassMutation = gql(`
  mutation PageKlassCreate($input: PageKlassCreationInput!) {
    createPageKlass(data: $input) {
      errors {
        ...Error
      }
      result {
        ...PageKlassDetails
      }
    }
  }
`);

export const assignPageAttributeMutation = gql(`
  mutation AssignPageAttribute($id: ID!, $ids: [ID!]!) {
    assignPageAttribute(pageKlassId: $id, attributeIds: $ids) {
      errors {
        ...Error
      }
      result {
        ...PageKlassDetails
      }
    }
  }
`);

export const unassignPageAttributeMutation = gql(`
  mutation UnassignPageAttribute($id: ID!, $ids: [ID!]!) {
    unassignPageAttribute(pageKlassId: $id, attributeIds: $ids) {
      errors {
        ...Error
      }
      result {
        ...PageKlassDetails
      }
    }
  }
`);

export const deletePageKlassMutation = gql(`
  mutation PageKlassDelete($id: ID!) {
    deletePageKlass(id: $id) {
      errors {
        ...Error
      }
      result {
        id
      }
    }
  }
`);

export const deletePageKlassesMutation = gql(`
  mutation PageKlassBulkDelete($ids: [ID!]!) {
    deletePageKlasses(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

export const pageKlassesAttributeReorder = gql(`
  mutation PageKlassAttributeReorder($move: ReorderInput!, $pageKlassId: ID!) {
    reorderPageKlassAttributes(moves: [$move], pageKlassId: $pageKlassId) {
      errors {
        ...Error
      }
      result {
        ...PageKlassDetails
      }
    }
  }
`);
