import { useContext } from 'react';

import type { GiftCardDetailsConsumerProps } from '../GiftCardDetailsProvider';
import { GiftCardDetailsContext } from '../GiftCardDetailsProvider';

const useGiftCardDetails = (): GiftCardDetailsConsumerProps => {
  return useContext(GiftCardDetailsContext);
};

export default useGiftCardDetails;
