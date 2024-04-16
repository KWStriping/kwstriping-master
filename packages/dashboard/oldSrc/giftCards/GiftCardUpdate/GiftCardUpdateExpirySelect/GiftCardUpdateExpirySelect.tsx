import { useTranslation } from '@core/i18n';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import { getGiftCardErrorMessage } from '@dashboard/oldSrc/giftCards/GiftCardUpdate/messages';
import useGiftCardUpdateForm from '@dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardUpdateFormProvider/hooks/useGiftCardUpdateForm';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import type { FC } from 'react';

import { giftCardExpirySelectMessages as messages } from './messages';
// import { useGiftCardExpirySelectStyles as useStyles } from "./styles";

const GiftCardUpdateExpirySelect: FC = () => {
  const { t } = useTranslation();

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
        {t('dashboard.expiryDateLabel', messages.expiryDateLabel.defaultMessage)}
      </Typography>
      <ControlledCheckbox
        name="cardExpires"
        label={t(
          'dashboard.expiryDateCheckboxLabel',
          messages.expiryDateCheckboxLabel.defaultMessage
        )}
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
          label={t('dashboard.expiryDateLabel', messages.expiryDateLabel.defaultMessage)}
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
