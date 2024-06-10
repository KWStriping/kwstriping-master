import { useTranslation } from '@core/i18n';
import useNotifier, { useDefaultNotifierSuccessErrorData } from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import type { MutationResultWithOpts } from '@core/urql/hooks/useMutation';
import type { GiftCardCreateFormData } from '@dashboard/oldSrc/GiftCardCreateDialog/GiftCardCreateDialogForm';
import { initialData as emptyFormData } from '@dashboard/oldSrc/GiftCardCreateDialog/GiftCardCreateDialogForm';
import difference from 'lodash-es/difference';
import { createContext } from 'react';
import type { FC, ReactNode } from 'react';
import useGiftCardDetails from '../GiftCardDetailsProvider/hooks/useGiftCardDetails';
import type { MetadataFormData } from '@dashboard/components/core/Metadata';
import {
  GiftCardUpdateDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
} from '@core/api/graphql';
import type { GiftCardErrorFragment, GiftCardUpdateMutation } from '@core/api/graphql';

import type { FormChange, UseFormResult } from '@dashboard/hooks/useForm';
import useForm from '@dashboard/hooks/useForm';
import useHandleFormSubmit from '@dashboard/hooks/useHandleFormSubmit';
import { updateGiftCardFormMessages } from '@dashboard/oldSrc/giftCards/GiftCardsList/messages';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { mapMetadataItemToInput } from '@dashboard/oldSrc/utils/maps';
import getMetadata from '@dashboard/oldSrc/utils/metadata/getMetadata';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';

interface GiftCardUpdateFormProviderProps {
  children: ReactNode;
}

export type GiftCardUpdateFormData = MetadataFormData &
  Pick<GiftCardCreateFormData, 'tags' | 'expiryDate'>;

export interface GiftCardUpdateFormConsumerData extends GiftCardUpdateFormErrors {
  opts: MutationResultWithOpts<GiftCardUpdateMutation>;
}

export interface GiftCardUpdateFormErrors {
  formErrors: Record<'tags' | 'expiryDate', GiftCardErrorFragment>;
  handlers: { changeMetadata: FormChange };
}

export type GiftCardUpdateFormConsumerProps = UseFormResult<GiftCardUpdateFormData> &
  GiftCardUpdateFormConsumerData;

export const GiftCardUpdateFormContext = createContext<GiftCardUpdateFormConsumerProps>(null);

const getGiftCardTagsAddRemoveData = (initTags: string[], changedTags: string[]) => {
  const removed = difference(initTags, changedTags);
  const added = difference(changedTags, initTags);

  return {
    addTags: added,
    removeTags: removed,
  };
};

const GiftCardUpdateFormProvider: FC<GiftCardUpdateFormProviderProps> = ({ children }) => {
  const notify = useNotifier();
  const { t } = useTranslation();
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const { loading: loadingGiftCard, giftCard } = useGiftCardDetails();

  const getInitialData = (): GiftCardUpdateFormData => {
    if (loadingGiftCard || !giftCard) {
      return { ...emptyFormData, metadata: [], privateMetadata: [] };
    }

    const { tags, expiryDate, privateMetadata, metadata } = giftCard;

    return {
      tags: tags.map(({ name }) => name),
      expiryDate,
      privateMetadata: privateMetadata?.map(mapMetadataItemToInput),
      metadata: metadata?.map(mapMetadataItemToInput),
    };
  };

  const [updateGiftCard, updateGiftCardOpts] = useMutation(GiftCardUpdateDocument, {
    onCompleted: (data) => {
      const errors = data?.updateGiftCard?.errors;
      const hasExpiryError = errors.some((error) => error.field === 'expiryDate');

      notify(
        hasExpiryError
          ? {
              title: t(
                'dashboard.giftCardInvalidExpiryDateHeader',
                updateGiftCardFormMessages.giftCardInvalidExpiryDateHeader.defaultMessage
              ),
              text: t(
                'dashboard.giftCardInvalidExpiryDateContent',
                updateGiftCardFormMessages.giftCardInvalidExpiryDateContent.defaultMessage
              ),
              type: 'error',
            }
          : useDefaultNotifierSuccessErrorData(errors, t)
      );
    },
  });

  const submit = async ({ tags, expiryDate }: GiftCardUpdateFormData) => {
    const result = await updateGiftCard({
      id: giftCard?.id,
      input: {
        expiryDate,
        ...getGiftCardTagsAddRemoveData(
          giftCard.tags.map((el) => el.name),
          tags
        ),
      },
    });

    return result?.data?.updateGiftCard?.errors;
  };

  const formProps = useForm(getInitialData());

  const { data, change, formId } = formProps;

  const handleSubmit = createMetadataUpdateHandler(
    giftCard,
    submit,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit: handleSubmit,
  });

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler,
  } = useMetadataChangeTrigger();

  const changeMetadata = makeMetadataChangeHandler(change);

  const submitData: GiftCardUpdateFormData = {
    ...data,
    ...getMetadata(data, isMetadataModified, isPrivateMetadataModified),
  };

  const formSubmit = () => handleFormSubmit(submitData);

  const formErrors = getFormErrors(
    ['tags', 'expiryDate'],
    updateGiftCardOpts?.data?.updateGiftCard?.errors
  );

  const providerValues = {
    ...formProps,
    opts: updateGiftCardOpts,
    formErrors,
    submit: formSubmit,
    handlers: {
      changeMetadata,
    },
  };

  return (
    <GiftCardUpdateFormContext.Provider value={providerValues}>
      {children}
    </GiftCardUpdateFormContext.Provider>
  );
};

export default GiftCardUpdateFormProvider;
