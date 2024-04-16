import type { AddressFragment } from '@core/api';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import compact from 'lodash-es/compact';
import type { FC } from 'react';

interface AddressProps extends TypographyProps {
  address: Maybe<AddressFragment>;
}

export const Address: FC<AddressProps> = ({ address, children, ...textProps }) => {
  const name = `${address.firstName} ${address.lastName}`;

  const { phone, city, countryArea, postalCode, streetAddress1, country } = address;

  return (
    <div className="flex flex-col pointer-events-none">
      <Typography {...textProps} fontWeight="semibold">
        {name}
      </Typography>
      <Typography {...textProps}>{phone}</Typography>
      <Typography {...textProps}>
        {compact([streetAddress1, city, postalCode]).join(', ')}
      </Typography>
      <Typography {...textProps}>{compact([countryArea, country.name]).join(', ')}</Typography>
      {children}
    </div>
  );
};
