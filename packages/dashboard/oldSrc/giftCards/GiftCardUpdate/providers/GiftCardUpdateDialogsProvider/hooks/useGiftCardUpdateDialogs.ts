import { useContext } from 'react';

import type { GiftCardUpdateDialogsConsumerProps } from '../GiftCardUpdateDialogsProvider';
import { GiftCardUpdateDialogsContext } from '../GiftCardUpdateDialogsProvider';

const useGiftCardUpdateDialogs = (): GiftCardUpdateDialogsConsumerProps => {
  return useContext(GiftCardUpdateDialogsContext);
};

export default useGiftCardUpdateDialogs;
