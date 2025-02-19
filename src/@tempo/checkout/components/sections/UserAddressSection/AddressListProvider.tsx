import type { AddressFragment, AddressUpdateInput } from '@tempo/api/generated/graphql';
import {
  UserAddressCreateDocument,
  UserAddressDeleteDocument,
  UserAddressUpdateDocument,
} from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import type { AddressFormData } from '@tempo/next/types/addresses';
import { useAlerts } from '@tempo/ui/hooks/useAlerts';
import { useMutation } from '@tempo/api/hooks/useMutation';
import {
  getById,
  getByUnmatchingId,
  getAddressInputData,
  getMatchingAddressFromList,
  getAddressFormDataFromAddress,
  isMatchingAddress,
} from '@tempo/utils';
import debounce from 'lodash-es/debounce';
import type { FC, ReactNode, Context } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAddressAvailability } from '@tempo/checkout/hooks/useAddressAvailability';

interface AddressListProviderProps {
  onCheckoutAddressUpdate: (address: AddressFormData) => void;
  checkoutAddress: AddressFragment | null | undefined;
  defaultAddress: AddressFragment | null | undefined;
  checkAddressAvailability: boolean;
  children: ReactNode;
}

interface ContextConsumerProps {
  addressList: AddressFragment[];
  selectedAddressId: string | undefined;
  setSelectedAddressId: (id: string) => void;
  updateAddress: (formData: AddressFormData) => void;
  addAddress: (formData: AddressFormData) => void;
  deleteAddress: (id: string) => void;
  updating: boolean;
  deleting: boolean;
  creating: boolean;
}

export const AddressListContext: Context<ContextConsumerProps> =
  createContext<ContextConsumerProps>({} as ContextConsumerProps);

export const useAddressList = () => useContext(AddressListContext);

// export const [useAddressList, Provider] = createContext<ContextConsumerProps>();

export const AddressListProvider: FC<AddressListProviderProps> = ({
  children,
  defaultAddress,
  checkoutAddress,
  onCheckoutAddressUpdate,
  checkAddressAvailability,
}) => {
  const { user } = useUser();

  const { isAvailable } = useAddressAvailability({
    pause: !checkAddressAvailability,
  });

  const { showErrors } = useAlerts();

  const addresses = user?.addresses || [];

  const [userAddressUpdate, { loading: updating }] = useMutation(UserAddressUpdateDocument);
  const [userAddressDelete, { loading: deleting }] = useMutation(UserAddressDeleteDocument);
  const [userAddressCreate, { loading: creating }] = useMutation(UserAddressCreateDocument);

  const [addressList, setAddressList] = useState(addresses);

  const getMatchingAddress = getMatchingAddressFromList(addressList);

  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(
    checkoutAddress ? getMatchingAddress(checkoutAddress)?.id || defaultAddress?.id : undefined
  );

  const checkoutAddressRef = useRef<AddressFragment | null>(null);

  const handleCheckoutAddressUpdate = useCallback(
    (address: AddressFragment) => onCheckoutAddressUpdate(getAddressFormDataFromAddress(address)),
    [onCheckoutAddressUpdate]
  );

  const getSelectedAddress = useCallback(
    (id: string | undefined = selectedAddressId) => addressList.find(getById(id)),
    [addressList, selectedAddressId]
  );

  const updateAddress = useCallback(
    async (formData: AddressFormData) => {
      if (!formData.id) return;
      const result = await userAddressUpdate({
        address: getAddressInputData({
          ...formData,
        }) as AddressUpdateInput, // TODO
        id: formData.id,
      });

      const updatedAddress = result?.data?.updateAddress?.address as AddressFragment;

      const updatedList = addressList.map((existingAddress) =>
        existingAddress.id === updatedAddress.id ? updatedAddress : existingAddress
      );

      setAddressList(updatedList);

      if (isAvailable(updatedAddress)) {
        setSelectedAddressId(updatedAddress.id);

        handleCheckoutAddressUpdate(updatedAddress);
      }

      return { hasErrors: false, errors: [] };
    },
    [addressList, handleCheckoutAddressUpdate, isAvailable, showErrors, userAddressUpdate]
  );

  const deleteAddress = useCallback(
    async (id: string) => {
      await userAddressDelete({ id });
      setAddressList(addressList.filter(getByUnmatchingId(id)));

      if (selectedAddressId === id && addressList[0]) {
        const newAddress = addressList[0];
        setSelectedAddressId(newAddress.id);
        handleCheckoutAddressUpdate(newAddress);
      }
    },
    [addressList, handleCheckoutAddressUpdate, showErrors, userAddressDelete, selectedAddressId]
  );

  const addAddress = useCallback(
    async (formData: AddressFormData) => {
      const result = await userAddressCreate({
        address: getAddressInputData({
          ...formData,
        }) as AddressUpdateInput, // TODO
      });

      const address = result?.data?.addAddress?.address as AddressFragment;

      setAddressList([...addressList, address]);

      if (isAvailable(address)) {
        setSelectedAddressId(address.id);
        handleCheckoutAddressUpdate(address);
      }
    },
    [addressList, handleCheckoutAddressUpdate, showErrors, isAvailable, userAddressCreate]
  );

  // because eslint is unable to read deps inside of debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((address: AddressFragment) => {
      handleCheckoutAddressUpdate(address);
    }, 2000),
    [handleCheckoutAddressUpdate]
  );

  const handleAddressSelect = useCallback(
    (addressId: string) => {
      setSelectedAddressId(addressId);
      debouncedUpdate(getSelectedAddress(addressId) as AddressFragment);
    },
    [getSelectedAddress, debouncedUpdate]
  );

  const handleDefaultAddressSet = () => {
    const isSelectedAddressSameAsCheckout =
      !!getSelectedAddress() && isMatchingAddress(checkoutAddress, getSelectedAddress());

    const hasCheckoutAddressChanged = !isMatchingAddress(
      checkoutAddress,
      checkoutAddressRef.current
    );

    // currently selected address is the same as checkout or
    // address hasn't changed at all -> do nothing
    if (isSelectedAddressSameAsCheckout || (checkoutAddress && !hasCheckoutAddressChanged)) {
      return;
    }

    // in case some address needs to be set prefer to select
    // user default address
    if (defaultAddress) {
      checkoutAddressRef.current = defaultAddress;
      handleAddressSelect(defaultAddress.id);
      return;
    }

    const firstAvailableAddress = addressList.find(isAvailable);

    // otherwise just choose any available
    if (firstAvailableAddress) {
      checkoutAddressRef.current = firstAvailableAddress;
      handleAddressSelect(firstAvailableAddress?.id);
    }
  };

  // otherwise it gets way overcomplicated to get this to run only when needed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleDefaultAddressSet, [
    defaultAddress?.id,
    checkoutAddress?.id,
    addressList.length,
  ]);

  const providerValues = useMemo(() => {
    return {
      addressList,
      setSelectedAddressId: handleAddressSelect,
      selectedAddressId,
      addAddress,
      updateAddress,
      deleteAddress,
      deleting,
      updating,
      creating,
    };
  }, [
    addressList,
    deleting,
    updating,
    creating,
    selectedAddressId,
    addAddress,
    deleteAddress,
    updateAddress,
    handleAddressSelect,
  ]);

  return (
    <AddressListContext.Provider value={providerValues}>{children}</AddressListContext.Provider>
  );
};
