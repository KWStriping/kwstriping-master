import type { LanguageCode } from '@tempo/api/generated/graphql';
import type { FormDataBase } from '@tempo/next/types';
import { useAlerts } from '@tempo/ui/hooks/useAlerts';
import { localeToLanguageCode } from '@tempo/utils';
import { useCallback } from 'react';
import { useLocale } from '@tempo/ui/hooks/useLocale';
import type { MutationFunction } from '@tempo/api/types';
import type { GraphQLErrors } from '@apollo/client/errors';
import type { SingleExecutionResult } from '@apollo/client';
import { useSectionState } from '@tempo/checkout/hooks/state';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import type { CheckoutSectionKey } from '@tempo/checkout/types';

const commonVars = ['languageCode', 'channel', 'checkoutId'] as const;

type CommonVar = (typeof commonVars)[number];

type CommonVars = Record<CommonVar, string> & { languageCode: LanguageCode };

export type SubmitReturnWithErrors<TData extends FormDataBase> = Promise<{
  hasErrors: boolean;
  errors: Maybe<GraphQLErrors>;
}>;

type MutationData = any; // TODO
type MutationVars = any; // TODO

interface UseSubmitProps<
  TData extends FormDataBase,
  TMutationFn extends MutationFunction<MutationData, MutationVars>,
> {
  scope: CheckoutSectionKey;
  onSubmit: (vars: any) => Promise<SingleExecutionResult<MutationData, MutationVars>>;
  formDataParse: (data: TData & CommonVars) => MutationVars;
  shouldAbort?: ((formData: TData) => Promise<boolean>) | ((formData: TData) => boolean);
  onAbort?: (FormData: TData) => void;
  onSuccess?: (formData: TData, result: MutationData) => void;
  onError?: (errors: Maybe<GraphQLErrors>, formData: TData) => void;
  onEnter?: (formData: TData) => void;
}

type SubmitFn<TData extends FormDataBase> = (formData: TData) => SubmitReturnWithErrors<TData>;

export const useSubmit = <
  TData extends FormDataBase,
  TMutationFn extends MutationFunction<any, any>,
>({
  onSuccess,
  onError,
  onEnter,
  onSubmit,
  onAbort,
  shouldAbort,
  formDataParse,
  scope,
}: UseSubmitProps<TData, TMutationFn>): SubmitFn<TData> => {
  const { checkout } = useCheckout();
  const [, updateState] = useSectionState(scope);
  const { showErrors } = useAlerts('updateCheckoutFulfillmentMethod');
  const locale = useLocale();
  return useCallback(
    async (formData: TData = {} as TData) => {
      if (!checkout) throw new Error('Checkout is not defined');
      if (typeof onEnter === 'function') {
        onEnter(formData);
      }
      const shouldAbortSubmit =
        typeof shouldAbort === 'function' ? await shouldAbort(formData) : false;
      if (shouldAbortSubmit) {
        if (typeof onAbort === 'function') {
          onAbort(formData);
        }
        return { hasErrors: false, errors: [] };
      }
      const commonData: CommonVars = {
        languageCode: localeToLanguageCode(locale.languageCode as any), // TODO
        channel: checkout.channel.slug,
        checkoutId: checkout.id,
      };
      const result = await onSubmit(formDataParse({ ...formData, ...commonData }));
      const errors = result.errors; // TODO
      const hasErrors = !!errors?.length;
      if (!hasErrors) {
        typeof onSuccess === 'function' && onSuccess(formData, await result);
        updateState({ validating: true }); // TODO: check if this is needed
        return { hasErrors, errors };
      }
      typeof onError === 'function' && onError(errors, formData);
      updateState({ valid: false });
      showErrors(errors);
      return { hasErrors, errors };
    },
    [
      checkout?.channel.slug,
      checkout?.id,
      formDataParse,
      onAbort,
      onEnter,
      onError,
      onSubmit,
      onSuccess,
      shouldAbort,
      showErrors,
    ]
  );
};
