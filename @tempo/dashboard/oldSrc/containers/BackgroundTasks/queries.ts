import { gql } from '@tempo/api/gql';

export const checkExportFileStatus = gql(`
  query CheckExportFileStatus($id: ID!) {
    exportFile(id: $id) {
      id
      status
    }
  }
`);

export const checkOrderInvoicesStatus = gql(`
  query CheckOrderInvoicesStatus($id: ID!) {
    order(id: $id) {
      id
      invoices {
        ...Invoice
      }
    }
  }
`);
