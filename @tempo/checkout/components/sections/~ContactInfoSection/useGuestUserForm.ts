import * as m from '@paraglide/messages';
import { CheckoutContactInfoUpdateDocument, RegisterDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { useCheckoutFormValidationTrigger } from '@tempo/checkout/hooks/useCheckoutFormValidationTrigger';
import { useErrorMessages } from '@tempo/ui/hooks';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { useValidationResolver } from '@tempo/utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useSubmit } from '@tempo/checkout/hooks/useSubmit';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

export interface GuestUserFormData {
  email: string;
  password: string;
}

export const useGuestUserForm = ({ createAccount }: { createAccount: boolean }) => {
  const { checkout } = useCheckout();
  const { user } = useUser();
  const shouldUserRegister = useUserRegisterState();
  const { setShouldRegisterUser } = useCheckoutUpdateStateActions();
  const { errorMessages } = useErrorMessages();
  const { setCheckoutUpdateState: setRegisterState } =
    useCheckoutUpdateStateChange('userRegister');
  const [updateEmail] = useMutation(CheckoutContactInfoUpdateDocument);
  const [userRegister] = useMutation(RegisterDocument);
  const [userRegisterDisabled, setUserRegistrationDisabled] = useState(false);

  const schema = object({
    email: string().email(errorMessages.invalid).required(errorMessages.required),
    password: string(),
    // add when we add formik and can validate only part of the form
    // .min(8, (m[passwordErrorMessages.passwordAtLeastCharacters))] ?? });
  });

  const resolver = useValidationResolver(schema);

  const defaultValues = {
    email: checkout?.customerEmail || '',
    password: '',
    createAccount: false,
  };

  const formProps = useForm<GuestUserFormData>({
    resolver,
    mode: 'onChange',
    defaultValues,
  });

  const { getValues, watch, trigger } = formProps;

  useCheckoutFormValidationTrigger({
    scope: 'guestUser',
    formProps,
  });

  const email = watch('email');

  useEffect(() => {
    setUserRegistrationDisabled(false);
  }, [email]);

  const handleUserRegister = useSubmit<GuestUserFormData, typeof userRegister>({
    scope: 'userRegister',
    onSubmit: userRegister,
    onEnter: () => setShouldRegisterUser(false),
    shouldAbort: async () => {
      const isValid = await trigger();
      return !isValid;
    },
    formDataParse: ({ email, password, channel }) => ({
      input: {
        email,
        password,
        channel,
        redirectUrl: getCurrentHref(),
      },
    }),
    onError: (errors) => {
      const hasAccountForCurrentEmail = errors.some(({ code }) => code === 'UNIQUE');

      if (hasAccountForCurrentEmail) {
        setUserRegistrationDisabled(true);
        // this logic will be removed once new register flow is implemented
        setTimeout(() => setRegisterState('success'), 100);
      }
    },
    onSuccess: () => setUserRegistrationDisabled(true),
  });

  useEffect(() => {
    if (!shouldUserRegister || user || !createAccount || userRegisterDisabled) {
      return;
    }

    void handleUserRegister(getValues());
  }, [
    createAccount,
    getValues,
    handleUserRegister,
    shouldUserRegister,
    user,
    userRegisterDisabled,
  ]);

  const handleCheckoutContactInfoUpdate = useSubmit<GuestUserFormData, typeof updateEmail>({
    scope: 'updateCheckoutContactInfo',
    onSubmit: updateEmail,
    formDataParse: ({ languageCode, checkoutId, email }) => ({
      languageCode,
      id: checkoutId,
      email,
    }),
  });

  return {
    formProps,
    onCheckoutContactInfoUpdate: handleCheckoutContactInfoUpdate,
    defaultFormData: defaultValues,
  };
};
