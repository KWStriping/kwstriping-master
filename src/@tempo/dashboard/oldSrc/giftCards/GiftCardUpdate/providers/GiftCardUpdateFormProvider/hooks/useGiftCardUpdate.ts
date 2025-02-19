import { useContext } from 'react';

import type { GiftCardUpdateFormConsumerData } from '../GiftCardUpdateFormProvider';
import { GiftCardUpdateFormContext } from '../GiftCardUpdateFormProvider';

const useGiftCardUpdate = (): Pick<GiftCardUpdateFormConsumerData, 'opts'> => {
  const { opts } = useContext(GiftCardUpdateFormContext);

  return { opts };
};

export default useGiftCardUpdate;
