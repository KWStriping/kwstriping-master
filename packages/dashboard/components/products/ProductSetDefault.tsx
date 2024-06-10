import { useTranslation } from '@core/i18n';
import type { FC } from 'react';
import CardMenu from '@dashboard/components/core/CardMenu';

interface ProductSetDefaultProps {
  onSetDefaultVariant: () => void;
}

const ProductSetDefault: FC<ProductSetDefaultProps> = ({ onSetDefaultVariant }) => {
  const { t } = useTranslation();

  return (
    <CardMenu
      menuItems={[
        {
          label: t(
            'dashboard.ZH0fw',
            'Set as default'
            // set variant as default, button
          ),
          onSelect: onSetDefaultVariant,
          testId: 'setDefault',
        },
      ]}
      data-test-id="menu"
    />
  );
};

ProductSetDefault.displayName = 'ProductSetDefault';
export default ProductSetDefault;
