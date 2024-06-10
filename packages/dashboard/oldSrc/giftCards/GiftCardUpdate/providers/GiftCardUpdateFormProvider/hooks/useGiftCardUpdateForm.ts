import omit from 'lodash-es/omit';
import { useContext } from 'react';

import type {
  GiftCardUpdateFormData,
  GiftCardUpdateFormErrors,
} from '../GiftCardUpdateFormProvider';
import { GiftCardUpdateFormContext } from '../GiftCardUpdateFormProvider';
import type { UseFormResult } from '@dashboard/hooks/useForm';

type UseGiftCardUpdateFormProps = UseFormResult<GiftCardUpdateFormData> &
  GiftCardUpdateFormErrors;

const useGiftCardUpdate = (): UseGiftCardUpdateFormProps => {
  const updateGiftCardFormProviderProps = useContext(GiftCardUpdateFormContext);

  return omit(updateGiftCardFormProviderProps, ['opts']);
};

export default useGiftCardUpdate;
