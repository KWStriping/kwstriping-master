import { Title } from '@core/checkout/components/Title';
import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Typography from '@mui/material/Typography';
import type { FC, PropsWithChildren } from 'react';
import { contactLabels } from '@core/checkout/components/sections/~ContactInfoSection/messages';

export interface SignInFormContainerProps {
  title: string;
  redirectSubtitle?: string;
  redirectButtonLabel?: string;
  subtitle?: string;
  onSectionChange: () => void;
}

export const SignInFormContainer: FC<PropsWithChildren<SignInFormContainerProps>> = ({
  title,
  redirectButtonLabel,
  redirectSubtitle,
  subtitle,
  onSectionChange,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <div className="section">
      <div className="flex flex-col mb-2">
        <div className="flex flex-row justify-between items-baseline">
          <Title>{title}</Title>
          <div className="flex flex-row">
            {redirectSubtitle && (
              <Typography color="secondary" className="mr-2">
                {redirectSubtitle}
              </Typography>
            )}
            {redirectButtonLabel && (
              <Button
                aria-label={t(
                  contactLabels.changeSection.id,
                  contactLabels.changeSection.defaultMessage
                )}
                onClick={onSectionChange}
                color="secondary"
                size="small"
              >
                {redirectButtonLabel}
              </Button>
            )}
          </div>
        </div>
        {subtitle && (
          <Typography color="secondary" className="mt-3">
            {subtitle}
          </Typography>
        )}
      </div>
      {children}
    </div>
  );
};
