import * as m from '@paraglide/messages';
import type { CountryCode } from '@tempo/api/generated/graphql';
import { UpdateCheckoutFulfillmentMethodDocument } from '@tempo/api/generated/graphql';
// import { useTranslation } from '@tempo/next/i18n';
import DateTimeField from '@tempo/ui/components/inputs/DateTimeField';
import { SelectBox } from '@tempo/ui/components/inputs/SelectBox';
import { SelectBoxGroup } from '@tempo/ui/components/inputs/SelectBoxGroup';
import { useFormDebouncedSubmit } from '@tempo/ui/hooks';
import { useShopSettings } from '@tempo/ui/providers';
import { getFormattedMoney } from '@tempo/ui/utils';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { getById } from '@tempo/utils';
import { Intl, Temporal } from '@js-temporal/polyfill';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { CommonCheckoutSectionProps } from './CheckoutSection';
import CheckoutSection from './CheckoutSection';
import { useSubmit } from '@tempo/checkout/hooks/useSubmit';
import { useSectionState } from '@tempo/checkout/hooks/state';

interface FulfillmentSectionFormData {
  selectedMethodId: string | undefined;
  fulfillmentDeadline?: Maybe<string>;
  preview?: ReactNode;
}

export const FulfillmentSection: FC<CommonCheckoutSectionProps> = ({ checkout, className }) => {
  const { locale } = useRouter();
  const { enableFulfillmentDeadline, displayPrices } = useShopSettings();
  const { availableShippingMethods, shippingAddress, fulfillmentMethod, fulfillmentDeadline } =
    checkout || {};
  const previousShippingCountry = useRef<CountryCode | undefined | null>(
    shippingAddress?.country?.code as CountryCode | undefined
  );
  const [{ editing }, updateState] = useSectionState('fulfillmentMethod');
  const [updateFulfillmentMethod] = useMutation(UpdateCheckoutFulfillmentMethodDocument);

  const getAutoSetMethod = useCallback(
    (deadline?: Maybe<string>) => {
      if (!availableShippingMethods?.length) return;
      const timeUntilFulfillmentDeadline = deadline
        ? new Date(deadline).getTime() - new Date().getTime()
        : undefined;
      // console.log('>>>>> timeUntilFulfillmentDeadline', timeUntilFulfillmentDeadline);
      return availableShippingMethods.reduce((selectedMethod, thisMethod) => {
        if (thisMethod && !selectedMethod) return thisMethod;
        if (!selectedMethod) return;
        const thisPriceIsCheaper = thisMethod.price.amount < selectedMethod.price.amount;
        let thisMethodIsBetter = thisPriceIsCheaper;
        // console.log('>>>>> thisMethodIsBetter', thisMethodIsBetter);
        if (timeUntilFulfillmentDeadline) {
          let methodIsSafer = false;
          let methodIsEquallySafe = false;
          const selectedMethodDefinitelyMeetsDeadline = doesShippingMethodDefinitelyMeetDeadline(
            timeUntilFulfillmentDeadline,
            selectedMethod
          );
          const currentMethodDefinitelyMeetsDeadline = doesShippingMethodDefinitelyMeetDeadline(
            timeUntilFulfillmentDeadline,
            thisMethod
          );
          console.log(
            '>>>>> selectedMethodDefinitelyMeetsDeadline',
            selectedMethodDefinitelyMeetsDeadline
          );
          console.log(
            '>>>>> currentMethodDefinitelyMeetsDeadline',
            currentMethodDefinitelyMeetsDeadline
          );
          const selectedMethodPossiblyMeetsDeadline =
            selectedMethodDefinitelyMeetsDeadline ||
            doesShippingMethodPossiblyMeetDeadline(timeUntilFulfillmentDeadline, selectedMethod);
          const currentMethodPossiblyMeetsDeadline =
            currentMethodDefinitelyMeetsDeadline ||
            doesShippingMethodPossiblyMeetDeadline(timeUntilFulfillmentDeadline, thisMethod);
          if (
            (currentMethodDefinitelyMeetsDeadline && !selectedMethodDefinitelyMeetsDeadline) ||
            (currentMethodPossiblyMeetsDeadline && !selectedMethodPossiblyMeetsDeadline)
          ) {
            methodIsSafer = true;
          } else if (
            currentMethodDefinitelyMeetsDeadline ||
            (selectedMethodDefinitelyMeetsDeadline && currentMethodDefinitelyMeetsDeadline) ||
            (selectedMethodPossiblyMeetsDeadline && currentMethodPossiblyMeetsDeadline)
          ) {
            methodIsEquallySafe = true;
          }
          thisMethodIsBetter = timeUntilFulfillmentDeadline
            ? methodIsSafer || (methodIsEquallySafe && thisPriceIsCheaper)
            : thisPriceIsCheaper;
        }
        // console.log('>>>>> thisMethodIsBetter', thisMethodIsBetter, thisMethod);
        return thisMethodIsBetter ? thisMethod : selectedMethod;
      }, availableShippingMethods[0]);
    },
    [availableShippingMethods]
  );

  const defaultFormData: FulfillmentSectionFormData = {
    selectedMethodId: fulfillmentMethod?.id || getAutoSetMethod()?.id,
    fulfillmentDeadline,
  };

  const fulfillmentSchema = Yup.object().shape({
    selectedMethodId: Yup.string().required(),
    fulfillmentDeadline: Yup.string().required(),
  });
  const {
    control,
    watch,
    // handleSubmit,
    formState: { errors: addressErrors, isValid, isDirty },
    getValues,
    // setError,
    setValue,
  } = useForm<FulfillmentSectionFormData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(fulfillmentSchema),
    defaultValues: defaultFormData,
  });

  // const handleDebouncedChange = debounce((data: AddressFormData) => {
  //   _onFormChange?.(data);
  // }, 500);

  const selectedMethodId = watch('selectedMethodId');

  const selectedMethod = availableShippingMethods?.find(getById(selectedMethodId));

  useEffect(() => {
    console.log('>>>>>>> FulfillmentSection.useEffect...');
    const hasShippingCountryChanged =
      shippingAddress?.country?.code !== previousShippingCountry.current;
    const hasValidMethodSelected =
      selectedMethodId && availableShippingMethods?.some(getById(selectedMethodId));
    if (hasValidMethodSelected) return;
    console.log(">>>>> hasn't valid method selected");
    setValue('selectedMethodId', getAutoSetMethod(fulfillmentDeadline)?.id);
    if (hasShippingCountryChanged) {
      previousShippingCountry.current = shippingAddress?.country?.code as CountryCode;
    }
  }, [
    fulfillmentDeadline,
    shippingAddress,
    availableShippingMethods,
    getAutoSetMethod,
    selectedMethodId,
    setValue,
  ]);

  const handleSubmit = useSubmit<FulfillmentSectionFormData, typeof updateFulfillmentMethod>({
    scope: 'fulfillmentMethod',
    onSubmit: (data) => {
      const result = updateFulfillmentMethod(data);
      updateState({ validating: true });
      return result;
    },
    shouldAbort: ({ selectedMethodId }) => !selectedMethodId,
    formDataParse: ({ selectedMethodId, fulfillmentDeadline, languageCode, checkoutId }) => {
      const formattedFulfillmentDeadline =
        fulfillmentDeadline && new Date(fulfillmentDeadline).toISOString();

      console.log('>>>>> parsed fulfillmentDeadline', formattedFulfillmentDeadline);
      return {
        fulfillmentDeadline: formattedFulfillmentDeadline,
        fulfillmentMethodId: selectedMethodId as string,
        languageCode,
        id: checkoutId,
      };
    },
    onError: (_, { selectedMethodId }) => {
      setValue('selectedMethodId', selectedMethodId);
    },
  });

  const debouncedSave = useFormDebouncedSubmit<FulfillmentSectionFormData>({
    onSubmit: handleSubmit,
    onUnchanged: () => null,
    getValues,
    defaultFormData,
  });

  const getSubtitle = ({ min, max }: { min?: number | null; max?: number | null }) => {
    if (min && max) {
      return (
        m.checkout_businessDays({
          min: min?.toString(),
          max: max?.toString(),
        }) ?? '{{min}}-{{max}} business days'
      );
    }
    if (min) return m.checkout_minDays({ min: min.toString() }) ?? 'In {{min}}+ business days';
    if (max) return m.checkout_maxDays({ max: max.toString() }) ?? 'Within {{max}} business days';
    return '';
  };

  const minDate = Temporal.Now.plainDateISO().add({ days: 1 });
  const maxDate = Temporal.Now.plainDateISO().add({ days: 30 });

  // TODO
  const validate = () => {
    console.log("Validating 'fulfillmentMethod' section...");

    const hasValidMethodSelected =
      selectedMethodId && availableShippingMethods?.some(getById(selectedMethodId));
    console.log('>>>>> hasValidMethodSelected', hasValidMethodSelected);
    console.log('>>>>> checkout?.fulfillmentMethod', checkout?.fulfillmentMethod);
    console.log('>>>>> checkout', checkout);
    const fulfillmentMethodIsValid = !!checkout?.fulfillmentMethod && !!hasValidMethodSelected;
    console.log('>>>>> FulfillmentSectionIsValid', fulfillmentMethodIsValid);
    return fulfillmentMethodIsValid;
  };
  if (!checkout?.isShippingRequired) return null;
  // console.log('>>>>>> availableShippingMethods', availableShippingMethods);
  return (
    <CheckoutSection
      sectionId="fulfillmentMethod"
      header={m.checkout_fulfillmentMethods_header() ?? 'Delivery methods'}
      className={className}
      validate={validate}
    >
      {!shippingAddress ? (
        <Typography>
          {m.checkout_fulfillmentMethods_noShippingAddress() ??
            'Please input a valid shipping address to see available shipping methods'}
        </Typography>
      ) : editing ? (
        <form onChange={debouncedSave}>
          <div className={'grid grid-cols-12 gap-3 w-full'}>
            {enableFulfillmentDeadline && (
              <div className={'col-span-12'}>
                <Controller
                  control={control}
                  name="fulfillmentDeadline"
                  render={({ field: { onChange, value } }) => (
                    <DateTimeField
                      name="fulfillmentDeadline"
                      label={m.checkout_fulfillmentDeadline() ?? 'Fulfillment deadline'}
                      value={value ?? ''}
                      onChange={(newValue) => {
                        onChange(newValue);
                        try {
                          if (maxDate && Temporal.PlainDate.compare(newValue, maxDate) > 0) {
                            console.error("Date can't be after maxDate");
                            return;
                          }
                          if (minDate && Temporal.PlainDate.compare(newValue, minDate) < 0) {
                            console.error("Date can't be before minDate");
                            return;
                          }
                          const autoSetValue = getAutoSetMethod(newValue);
                          console.log('>>>>> autoSetValue', autoSetValue);
                          setValue('selectedMethodId', autoSetValue?.id);
                        } catch (e) {
                          console.error('e', e);
                        }
                      }}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  )}
                />
              </div>
            )}
            <div className={'col-span-12'}>
              <Controller
                control={control}
                name="selectedMethodId"
                render={({ field: { onChange } }) => (
                  <SelectBoxGroup
                    name="selectedMethodId"
                    value={selectedMethodId ?? ''}
                    onChange={onChange}
                    label={m.checkout_fulfillmentSection_methods() ?? ''}
                    hideRadioButtons={true}
                    readOnly={enableFulfillmentDeadline}
                  >
                    {availableShippingMethods?.map(
                      ({
                        id,
                        name,
                        price,
                        minimumDeliveryDays: min,
                        maximumDeliveryDays: max,
                      }) => (
                        <SelectBox
                          key={id}
                          value={id}
                          selected={id === selectedMethodId}
                          readOnly={enableFulfillmentDeadline}
                        >
                          <div className="min-h-12 grow flex flex-col justify-center pointer-events-none">
                            <Typography
                              component={'div'}
                              className={
                                'flex flex-row justify-between self-stretch items-center'
                              }
                            >
                              {name}
                            </Typography>
                            <Typography color="secondary" className={'text-sm'}>
                              {getSubtitle({ min, max })}
                            </Typography>
                          </div>
                          {getFormattedMoney(price)}
                        </SelectBox>
                      )
                    )}
                  </SelectBoxGroup>
                )}
              />
            </div>
          </div>
        </form>
      ) : (
        <div>
          {enableFulfillmentDeadline && (
            <div className="flex flex-wrap justify-between gap-8 mt-2">
              <Typography>
                {m.checkout_fulfillmentSection_fulfillmentDeadline() ?? 'Fulfillment deadline'}
              </Typography>
              <Typography className="mb-2">
                {fulfillmentDeadline
                  ? Intl.DateTimeFormat(locale).format(
                      Temporal.PlainDateTime.from(fulfillmentDeadline)
                    )
                  : 'No deadline'}
              </Typography>
            </div>
          )}
          <div className="flex flex-wrap justify-between gap-8 mt-2">
            <Typography>
              {m.checkout_fulfillmentSection_shippingMethod() ?? 'Fulfillment method'}
            </Typography>
            <div>
              <Typography className="font-bold">{selectedMethod?.name}</Typography>
              <Typography className={'text-sm'}>
                {getSubtitle({
                  min: selectedMethod?.minimumDeliveryDays,
                  max: selectedMethod?.maximumDeliveryDays,
                })}
              </Typography>
              {selectedMethod?.description && (
                <Typography className="text-sm">{selectedMethod?.description}</Typography>
              )}
            </div>
          </div>
          {!!selectedMethod?.price.amount && displayPrices && (
            <div className="flex justify-between">
              <Typography className="mb-2">
                {m.checkout_fulfillmentSection_price() ?? 'Price'}
              </Typography>
              <Typography className="mb-2">
                {selectedMethodId && getFormattedMoney(selectedMethod?.price)}
              </Typography>
            </div>
          )}
        </div>
      )}
    </CheckoutSection>
  );
};

export const FulfillmentSectionSkeleton = () => {
  return (
    <div>
      <Skeleton variant="text" className="w-1/3" />
      <div className="skeleton-box">
        <Skeleton className="w-2/3" />
        <Skeleton className="w-1/3" />
      </div>
      <Skeleton className="mt-6 w-3/4" />
    </div>
  );
};

function doesShippingMethodDefinitelyMeetDeadline(
  timeUntilFulfillmentDeadline: Maybe<number>,
  method: {
    name: string;
    minimumDeliveryDays?: Maybe<number>;
    maximumDeliveryDays?: Maybe<number>;
  }
): boolean {
  if (!timeUntilFulfillmentDeadline) return true;
  const { minimumDeliveryDays, maximumDeliveryDays } = method;
  if (minimumDeliveryDays && !maximumDeliveryDays) {
    const minDeliveryTime = minimumDeliveryDays * 24 * 60 * 60 * 1000;
    return minDeliveryTime < timeUntilFulfillmentDeadline;
  }
  if (!maximumDeliveryDays) return false;
  const maximumDeliveryTime = maximumDeliveryDays * 24 * 60 * 60 * 1000;
  console.log('>>>>> maximumDeliveryTime', maximumDeliveryTime);
  return maximumDeliveryTime < timeUntilFulfillmentDeadline;
}

function doesShippingMethodPossiblyMeetDeadline(
  timeUntilFulfillmentDeadline: Maybe<number>,
  method: {
    name: string;
    minimumDeliveryDays?: Maybe<number>;
    maximumDeliveryDays?: Maybe<number>;
  }
): boolean {
  if (!timeUntilFulfillmentDeadline) return true;
  // TODO: fix this hack
  if (!method.maximumDeliveryDays && !method.minimumDeliveryDays) return false;
  const minimumDeliveryDays = method.minimumDeliveryDays;
  if (!minimumDeliveryDays) return true;
  const minimumDeliveryTime = minimumDeliveryDays * 24 * 60 * 60 * 1000;
  return minimumDeliveryTime < timeUntilFulfillmentDeadline;
}
