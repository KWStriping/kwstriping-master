import { useTranslation } from '@core/i18n';
import { Pill } from '@core/ui/components/pill/Pill';
import type { OrderDetailsFragment } from '@core/api/graphql';
import { transformOrderStatus } from '@dashboard/oldSrc/misc';
import type { FC } from 'react';

export interface TitleProps {
  order?: Maybe<OrderDetailsFragment>;
}

const Title: FC<TitleProps> = (props) => {
  const { t } = useTranslation();
  const { order } = props;

  if (!order) return null;

  const { localized, status } = transformOrderStatus(order.status, t);

  return (
    <div className={'flex items-center'}>
      {t('dashboard.qXzM2', 'Order #{{orderNumber}}', { orderNumber: order?.number })}
      <div className={'ml-2'}>
        <Pill label={localized} color={status} />
      </div>
    </div>
  );
};

export default Title;
