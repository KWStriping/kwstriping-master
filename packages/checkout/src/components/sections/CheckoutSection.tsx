import type { CheckoutFragment } from '@core/api';
import { useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSectionState } from '@core/checkout/hooks/state';
import type { CheckoutSectionKey } from '@core/checkout/types';

export const INCLUDE_SAVE_BUTTON = false;

export interface CommonCheckoutSectionProps {
  checkout: Maybe<CheckoutFragment>;
  disabled?: boolean;
  className?: string;
}

export interface CheckoutSectionProps extends Omit<CommonCheckoutSectionProps, 'checkout'> {
  sectionId: CheckoutSectionKey;
  header: ReactNode;
  children: ReactNode;
  validate: () => boolean;
  editable?: boolean;
}

export const CheckoutSection: FC<CheckoutSectionProps> = ({
  header,
  sectionId,
  validate,
  children,
  className,
  editable = true,
}) => {
  const { t } = useTranslation();
  const [{ editing, validating, hidden, available }, updateState] = useSectionState(sectionId);
  const [saving, setSaving] = useState(false);
  // const handleSave = () => {
  //   setSaving(true);
  //   onSave?.();
  //   setSaving(false);
  // };
  useEffect(() => {
    if (validating) {
      const valid = validate();
      updateState({ valid, validating: false });
    }
  }, [validate, validating, updateState]);
  return (
    <section className={clsx(className, 'transition', hidden && 'hidden')}>
      <div className={'flex gap-8 justify-between'}>
        <Typography variant={'h2'} className={'text-lg pb-2 font-semibold'}>
          {header}
        </Typography>
        {!editing && available && editable && (
          <IconButton
            title={t('checkout.changeButton', 'Change')}
            onClick={() => updateState({ editing: true })}
            className={'self-start'}
          >
            <EditIcon />
          </IconButton>
        )}
      </div>
      <div className={'flex gap-8'}>
        <div className={'grow'}>
          {children}
          {/* {displaySaveButton && (
            <Button disabled={saving} type="submit" className="w-full mt-4" onClick={handleSave}>
              {t('checkout.saveButton', 'Save')}
            </Button>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
