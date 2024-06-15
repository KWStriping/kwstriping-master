import type { Exact, LanguageCode } from '@tempo/api/generated/graphql';
import type { FormDataBase } from '@tempo/next/types';
import { useAlerts } from '@tempo/ui/hooks/useAlerts';
import type { ApiErrors } from '@tempo/ui/hooks/useErrors';
import type { OperationResult } from '@tempo/api';
import { extractMutationErrors } from '@tempo/api/utils';
import { localeToLanguageCode } from '@tempo/utils';
import { useCallback } from 'react';
import { useLocale } from '@tempo/ui/hooks/useLocale';
import { useSectionState } from '@tempo/checkout/hooks/state';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import type { CheckoutSectionKey } from '@tempo/checkout/types';

type MutationVars<MutationFn> = MutationFn extends (vars: Exact<infer Vars>) => any
  ? Vars
  : never;

type MutationData<MutationFn> = MutationFn extends (vars: any) => Promise<infer Data>
  ? Data
  : never;

const commonVars = ['languageCode', 'channel', 'checkoutId'] as const;

type CommonVar = (typeof commonVars)[number];

type CommonVars = Record<CommonVar, string> & { languageCode: LanguageCode };

export type SubmitReturnWithErrors<TData extends FormDataBase> = Promise<{
  hasErrors: boolean;
  errors: ApiErrors<TData>;
}>;

interface UseSubmitProps<
  TData extends FormDataBase,
  TMutationFn extends (vars: any) => Promise<OperationResult<any, any>>,
> {
  scope: CheckoutSectionKey;
  onSubmit: (vars: MutationVars<TMutationFn>) => Promise<MutationData<TMutationFn>>;
  formDataParse: (data: TData & CommonVars) => MutationVars<TMutationFn>;
  shouldAbort?: ((formData: TData) => Promise<boolean>) | ((formData: TData) => boolean);
  onAbort?: (FormData: TData) => void;
  onSuccess?: (formData: TData, result: MutationData<TMutationFn>) => void;
  onError?: (errors: ApiErrors<TData>, formData: TData) => void;
  onEnter?: (formData: TData) => void;
}

type SubmitFn<TData extends FormDataBase> = (formData: TData) => SubmitReturnWithErrors<TData>;

export const useSubmit = <
  TData extends FormDataBase,
  TMutationFn extends (vars: any) => Promise<OperationResult<any, any>>,
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
      const result = onSubmit(formDataParse({ ...formData, ...commonData }));
      const errors = (await extractMutationErrors(result)) as unknown as ApiErrors<TData>; // TODO
      const hasErrors = errors?.length > 0;
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
