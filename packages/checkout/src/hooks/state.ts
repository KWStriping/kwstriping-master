import isEqual from 'lodash-es/isEqual';
import pick from 'lodash-es/pick';
import { objectEntries, objectFromEntries } from 'tsafe';
import { createWithEqualityFn } from 'zustand/traditional';
import { persist, createJSONStorage } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { CHECKOUT_SECTIONS } from '@core/checkout/constants';
import type { CheckoutSectionKey } from '@core/checkout/types';
import type { PaymentMethodID, PaymentProviderID } from '@core/checkout/types/payments';

const LOCAL_STORAGE_NAMESPACE = process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAMESPACE;
if (!LOCAL_STORAGE_NAMESPACE) {
  throw new Error('NEXT_PUBLIC_LOCAL_STORAGE_NAMESPACE must be defined');
}

const PERSISTED_KEYS = ['checkoutId'];

export interface SelectedPaymentData {
  paymentProvider?: Maybe<PaymentProviderID>;
  paymentMethod?: Maybe<PaymentMethodID>;
}

export interface CheckoutSectionState {
  available: boolean;
  hidden: boolean;
  editing: boolean;
  valid: boolean;
  validating: boolean;
}

interface CheckoutState extends Record<CheckoutSectionKey, CheckoutSectionState> {
  checkoutId: string | null;
  paymentMethod: Maybe<PaymentMethodID>;
  paymentProvider: Maybe<PaymentProviderID>;
  actions: {
    setCheckoutId: (checkoutId: string | null) => void;
    setEditing: (scope: CheckoutSectionKey, editing: boolean) => void;
    setValidating: (scope: CheckoutSectionKey, validating: boolean) => void;
    updateSectionState: (scope: CheckoutSectionKey, state: Partial<CheckoutSectionState>) => void;
    setSelectedPaymentMethod: ({ paymentMethod, paymentProvider }: SelectedPaymentData) => void;
  };
}

const DEFAULT_INITIALLY_VALID = false;
const DEFAULT_INITIALLY_VALIDATING = true;
const DEFAULT_INITIALLY_EDITING = false;

const DEFAULT_PAYMENT_METHOD = null as Maybe<PaymentMethodID>;
const DEFAULT_PAYMENT_PROVIDER = null as Maybe<PaymentProviderID>;

const DEFAULT_SECTION_STATE: CheckoutSectionState = {
  available: true,
  hidden: false,
  editing: DEFAULT_INITIALLY_EDITING,
  valid: DEFAULT_INITIALLY_VALID,
  validating: DEFAULT_INITIALLY_VALIDATING,
};

const useCheckoutState = createWithEqualityFn<CheckoutState>()(
  persist(
    (set, get) => ({
      checkoutId:
        typeof localStorage !== 'undefined' ? localStorage?.getItem('checkoutId') : null,
      contactInfo: { ...DEFAULT_SECTION_STATE, editing: true },
      shippingAddress: { ...DEFAULT_SECTION_STATE, editing: true },
      fulfillmentMethod: { ...DEFAULT_SECTION_STATE, editing: true },
      billingAddress: { ...DEFAULT_SECTION_STATE, editing: true },
      payment: { ...DEFAULT_SECTION_STATE, editing: true },
      paymentMethod: DEFAULT_PAYMENT_METHOD,
      paymentProvider: DEFAULT_PAYMENT_PROVIDER,
      actions: {
        setCheckoutId: (checkoutId: string | null) => set({ checkoutId }),
        setEditing: (scope: CheckoutSectionKey, editing: boolean) => {
          set({ [scope]: { ...get()[scope], editing, validating: false } });
        },
        setValidating: (scope: CheckoutSectionKey, validating: boolean) => {
          set({ [scope]: { ...get()[scope], validating } });
        },
        updateSectionState: (scope: CheckoutSectionKey, state: Partial<CheckoutSectionState>) => {
          const extantState = get()[scope];
          set({ [scope]: { ...extantState, ...state } });
        },
        setSelectedPaymentMethod: ({ paymentMethod, paymentProvider }: SelectedPaymentData) => {
          set({ paymentMethod, paymentProvider });
        },
      },
    }),
    {
      name: LOCAL_STORAGE_NAMESPACE, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        objectFromEntries(objectEntries(state).filter(([key]) => PERSISTED_KEYS.includes(key))),
    }
  ),
  isEqual
);

export const useCheckoutId = (): [string | null, (id: string | null) => void] =>
  useCheckoutState((state) => [state.checkoutId, state.actions.setCheckoutId], shallow);

export const useCheckoutSections = () =>
  useCheckoutState((state) => pick(state, CHECKOUT_SECTIONS));

export const useSectionState = (
  section: CheckoutSectionKey
): [CheckoutSectionState, (state: Partial<CheckoutSectionState>) => void] => {
  const { updateSectionState } = useCheckoutActions();
  return useCheckoutState(
    (state) => [
      state[section],
      (state: Partial<CheckoutSectionState>) => updateSectionState(section, state),
    ],
    (oldState, newState) => isEqual(oldState[0], newState[0])
  );
};

export const useCheckoutActions = () => useCheckoutState((state) => state.actions);

export const useCheckoutValidationState = () => {
  return useCheckoutState((state) => {
    const sections = pick(state, CHECKOUT_SECTIONS);
    const sectionEntries = objectEntries(sections);
    const sectionStates = Object.values(sections);
    const nowValidating = sectionStates.some(({ validating }) => validating);
    const nowValid = sectionStates.every(({ valid }) => valid);
    for (const entry of sectionEntries) {
      const [sectionName, { validating, valid }] = entry;
      if (!valid) {
        console.log('invalid', sectionName);
      }
    }
    return { validating: nowValidating, valid: nowValid };
  }, shallow);
};

export const useSelectedPaymentMethod = () => {
  return useCheckoutState(({ paymentMethod, paymentProvider }) => ({
    paymentMethod,
    paymentProvider,
  }));
};
