import { Title } from '@core/checkout/components/Title';
import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Typography from '@mui/material/Typography';
import { emptyCartLabels, emptyCartMessages } from './messages';

export const EmptyCartPage = () => {
  const { t } = useTranslation();

  // eslint-disable-next-line no-restricted-globals
  const goBack = () => history.back();

  return (
    <div className="w-full flex flex-row justify-center lg:mt-10">
      <div className="flex flex-col justify-start border rounded-lg border-primary/[0.15] section">
        <Title>
          {t(emptyCartMessages.emptyCart.id, emptyCartMessages.emptyCart.defaultMessage)}
        </Title>
        <Typography>
          {t(
            emptyCartMessages.addToCardToContinue.id,
            emptyCartMessages.addToCardToContinue.defaultMessage
          )}
        </Typography>
        <Button
          className="mt-3 md:self-end"
          aria-label={t(
            emptyCartLabels.goBackToStore.id,
            emptyCartLabels.goBackToStore.defaultMessage
          )}
          onClick={goBack}
          color="secondary"
        >
          {t(emptyCartMessages.goBackToStore.id, emptyCartMessages.goBackToStore.defaultMessage)}
        </Button>
      </div>
    </div>
  );
};
