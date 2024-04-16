import { useAuthorizedQuery } from '@core/urql/hooks';
import type { FC, ReactNode } from 'react';
import { createContext } from 'react';
import type { CustomerDetailsQuery } from '@core/api/graphql';
import { CustomerDetailsDocument } from '@core/api/graphql';

export interface CustomerDetailsProviderProps {
  id: string;
  children?: ReactNode;
}

interface CustomerDetailsConsumerProps {
  customer: CustomerDetailsQuery | null;
  loading: boolean | null;
}

export const CustomerDetailsContext = createContext<CustomerDetailsConsumerProps>(null);

export const CustomerDetailsProvider: FC<CustomerDetailsProviderProps> = ({ children, id }) => {
  const [{ data, fetching: loading }] = useAuthorizedQuery(CustomerDetailsDocument, {
    displayLoader: true,
    variables: {
      id,
    },
  });

  const providerValues: CustomerDetailsConsumerProps = {
    customer: data,
    loading,
  };

  return (
    <CustomerDetailsContext.Provider value={providerValues}>
      {children}
    </CustomerDetailsContext.Provider>
  );
};
