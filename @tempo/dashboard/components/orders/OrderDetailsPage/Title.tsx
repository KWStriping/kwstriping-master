import * as m from '@paraglide/messages';
import { Pill } from '@tempo/ui/components/pill/Pill';
import type { OrderDetailsFragment } from '@tempo/api/generated/graphql';
import { transformOrderStatus } from '@tempo/dashboard/oldSrc/misc';
import type { FC } from 'react';

export interface TitleProps {
  order?: Maybe<OrderDetailsFragment>;
}

const Title: FC<TitleProps> = (props) => {
  const { order } = props;

  if (!order) return null;

  const { localized, status } = transformOrderStatus(order.status, t);

  return (
    <div className={'flex items-center'}>
      {m.dashboard_qXzM_({ orderNumber: order?.number }) ?? 'Order #{{orderNumber}}'}
      <div className={'ml-2'}>
        <Pill label={localized} color={status} />
      </div>
    </div>
  );
};

export default Title;
