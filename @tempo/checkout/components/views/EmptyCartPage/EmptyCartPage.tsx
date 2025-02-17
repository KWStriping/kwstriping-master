import * as m from '@paraglide/messages';
import { Title } from '@tempo/checkout/components/Title';
// import { useTranslation } from '@tempo/next/i18n';
import { Button } from '@tempo/ui/components/buttons/Button';
import Typography from '@mui/material/Typography';
import { emptyCartLabels, emptyCartMessages } from './messages';

export const EmptyCartPage = () => {
  const goBack = () => history.back();

  return (
    <div className="w-full flex flex-row justify-center lg:mt-10">
      <div className="flex flex-col justify-start border rounded-lg border-primary/[0.15] section">
        <Title>
          {m[emptyCartMessages.emptyCart.id] ?? emptyCartMessages.emptyCart.defaultMessage}
        </Title>
        <Typography>
          {m[emptyCartMessages.addToCardToContinue.id] ??
            emptyCartMessages.addToCardToContinue.defaultMessage}
        </Typography>
        <Button
          className="mt-3 md:self-end"
          aria-label={
            m[emptyCartLabels.goBackToStore.id] ?? emptyCartLabels.goBackToStore.defaultMessage
          }
          onClick={goBack}
          color="secondary"
        >
          {m[emptyCartMessages.goBackToStore.id] ??
            emptyCartMessages.goBackToStore.defaultMessage}
        </Button>
      </div>
    </div>
  );
};
