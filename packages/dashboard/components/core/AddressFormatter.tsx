import type { AddressType } from '@dashboard/oldSrc/customers/types';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface AddressFormatterProps {
  address?: Maybe<AddressType>;
}

const AddressFormatter: FC<AddressFormatterProps> = ({ address }) => {
  if (!address) return <Skeleton />;
  return (
    <address style={{ fontStyle: 'inherit' }}>
      <Typography component="p">
        {address.firstName} {address.lastName}
      </Typography>
      <Typography component="p">{address.phone}</Typography>
      {address.companyName && <Typography component="p">{address.companyName}</Typography>}
      <Typography component="p">
        {address.streetAddress1}
        <br />
        {address.streetAddress2}
      </Typography>
      <Typography component="p">
        {address.city}
        {address.cityArea ? ', ' + address.cityArea : ''}
        {address.countryArea
          ? `, ${address.countryArea} ${address.postalCode}`
          : address.postalCode}
      </Typography>
      <Typography component="p">{address.country.name}</Typography>
    </address>
  );
};
AddressFormatter.displayName = 'AddressFormatter';
export default AddressFormatter;
