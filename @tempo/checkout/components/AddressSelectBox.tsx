import * as m from '@paraglide/messages';
import type { AddressFragment } from '@tempo/api/generated/graphql';
// import { useTranslation } from '@tempo/next/i18n';
import type { AddressField } from '@tempo/next/types';
import { Address } from '@tempo/ui/components/Address';
import { Button } from '@tempo/ui/components/buttons/Button';
import { SelectBox } from '@tempo/ui/components/inputs/SelectBox';
import type { SelectBoxProps } from '@tempo/ui/components/inputs/SelectBox';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export const addressSelectBoxMessages = {
  cantShipToAddress: {
    defaultMessage: "Can't ship to this address",
    id: 'AddressSelectBox/messages/X3KwgL',
    description: "can't ship to address",
  },
  editAddress: {
    defaultMessage: 'edit',
    id: 'AddressSelectBox/messages/rHpDYH',
    description: 'edit address',
  },
};

export const addressSelectBoxLabels = {
  editAddress: {
    defaultMessage: 'edit address',
    id: 'AddressSelectBox/messages//II2Kl',
    description: 'edit address accessibility label',
  },
};

interface AddressSelectBoxProps extends Omit<SelectBoxProps, 'children'> {
  address: Partial<Record<AddressField, any>>;
  onEdit: () => void;
  unavailable: boolean;
}

export const AddressSelectBox: FC<AddressSelectBoxProps> = ({
  address,
  onEdit,
  unavailable,
  ...rest
}) => {
  return (
    <SelectBox {...rest} disabled={unavailable}>
      <div className="w-full flex flex-row justify-between">
        <Address
          address={address as AddressFragment}
          {...(unavailable
            ? {
                color: 'secondary',
              }
            : {})}
        >
          {unavailable && (
            <Typography fontSize="xs" className="my-1">
              {m.checkout_cantShipToAddress() ?? "Can't ship to this address"}
            </Typography>
          )}
        </Address>
        <div>
          <Button
            color="secondary"
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
            aria-label={m.checkout_editAddress() ?? 'edit address'}
            className="mr-2"
          >
            {m.checkout_editAddress() ?? 'edit address'}
          </Button>
        </div>
      </div>
    </SelectBox>
  );
};
