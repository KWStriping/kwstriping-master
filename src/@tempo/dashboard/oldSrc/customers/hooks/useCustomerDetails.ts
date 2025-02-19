import { useContext } from 'react';
import { CustomerDetailsContext } from '@tempo/dashboard/oldSrc/customers/providers/CustomerDetailsProvider';

export const useCustomerDetails = () => {
  return useContext(CustomerDetailsContext);
};
