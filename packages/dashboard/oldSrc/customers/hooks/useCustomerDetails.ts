import { CustomerDetailsContext } from '@dashboard/oldSrc/customers/providers/CustomerDetailsProvider';
import { useContext } from 'react';

export const useCustomerDetails = () => {
  return useContext(CustomerDetailsContext);
};
