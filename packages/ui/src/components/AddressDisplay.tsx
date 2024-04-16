import type { AddressFragment } from '@core/api';
import Typography from '@mui/material/Typography';

export interface AddressDisplayProps {
  address: Maybe<AddressFragment>;
  excludeCountry?: boolean;
}

export function AddressDisplay({ address, excludeCountry = false }: AddressDisplayProps) {
  if (!address) return null;
  return (
    <div className="text-base">
      <address className="not-italic mb-2">
        {(address.firstName || address.lastName) && (
          <Typography>
            {address.firstName} {address.lastName}
          </Typography>
        )}
        {address.companyName && <Typography>{address.companyName}</Typography>}
        <Typography>{address.streetAddress1}</Typography>
        {address.streetAddress2 && <p>{address.streetAddress2}</p>}
        <Typography>
          {address.city}
          {address.countryArea && `, ${address.countryArea}`} {address.postalCode}
        </Typography>
        {!excludeCountry && <Typography>{address.country.name}</Typography>}
      </address>
      {address.phone && <Typography>{address.phone}</Typography>}
    </div>
  );
}

export default AddressDisplay;
