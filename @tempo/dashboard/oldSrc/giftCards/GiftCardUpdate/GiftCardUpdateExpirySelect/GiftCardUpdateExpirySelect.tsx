import * as m from '@paraglide/messages';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import type { FC } from 'react';

import { giftCardExpirySelectMessages as messages } from './messages';
import useGiftCardUpdateForm from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardUpdateFormProvider/hooks/useGiftCardUpdateForm';
import { getGiftCardErrorMessage } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/messages';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
// import { useGiftCardExpirySelectStyles as useStyles } from "./styles";

const GiftCardUpdateExpirySelect: FC = () => {
  const {
    change,
    data: { expiryDate },
    formErrors,
  } = useGiftCardUpdateForm();

  const [cardExpiresSelected, setCardExpiresSelected] = useStateFromProps(!!expiryDate);

  useEffect(() => {
    if (!cardExpiresSelected) {
      change({
        target: {
          name: 'expiryDate',
          value: null,
        },
      });
    }
  }, [cardExpiresSelected]);

  return (
    <>
      <Typography>
        {m.dashboard_expiryDateLabel() ?? messages.expiryDateLabel.defaultMessage}
      </Typography>
      <ControlledCheckbox
        name="cardExpires"
        label={
          m.dashboard_expiryDateCheckboxLabel() ?? messages.expiryDateCheckboxLabel.defaultMessage
        }
        checked={cardExpiresSelected}
        onChange={(event) => setCardExpiresSelected(event.target.value)}
      />

      {cardExpiresSelected && (
        <TextField
          error={!!formErrors?.expiryDate}
          helperText={getGiftCardErrorMessage(formErrors?.expiryDate, t)}
          onChange={change}
          name={'expiryDate'}
          fullWidth
          className={styles.dateField ?? ''}
          label={m.dashboard_expiryDateLabel() ?? messages.expiryDateLabel.defaultMessage}
          value={expiryDate}
          InputLabelProps={{
            shrink: true,
          }}
          type="date"
        />
      )}
    </>
  );
};

export default GiftCardUpdateExpirySelect;
