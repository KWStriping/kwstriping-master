import { CurrentUserAddressesDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { AddressBookCard } from '@tempo/ui/components/AddressBookCard';
import { Spinner } from '@tempo/ui/components/Spinner';
import { useQuery } from '@tempo/api/hooks/useQuery';
import * as m from '@paraglide/messages';

function AddressBookPage() {
  const { authenticated } = useUser();
  const [{ fetching: loading, error, data }, refetch] = useQuery(CurrentUserAddressesDocument, {
    pause: !authenticated,
    requestPolicy: 'network-only',
  });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p>Error :{error.message}</p>;
  }

  const addresses = data?.me?.addresses || [];

  if (addresses.length === 0) {
    return <div>{m('noAddressDataMessage', 'No addresses information for this user')}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {addresses.map((address) => (
        <AddressBookCard key={address.id} address={address} onRefreshBook={() => refetch()} />
      ))}
    </div>
  );
}

export default AddressBookPage;

// AddressBookPage.getLayout = function getLayout(page: ReactElement) {
//   return <AccountLayout>{page}</AccountLayout>;
// };
