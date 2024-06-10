import type { FC } from 'react';
import CardMenu from '@tempo/dashboard/components/core/CardMenu';

interface ProductSetDefaultProps {
  onSetDefaultVariant: () => void;
}

const ProductSetDefault: FC<ProductSetDefaultProps> = ({ onSetDefaultVariant }) => {
  return (
    <CardMenu
      menuItems={[
        {
          label: t(
            'dashboard_ZH0fw',
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
