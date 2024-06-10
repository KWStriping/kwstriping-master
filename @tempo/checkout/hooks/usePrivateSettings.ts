import { PrivateSettingsContext } from '@tempo/checkout/components/PrivateSettingsProvider';
import { useContext } from 'react';

export const usePrivateSettings = () => useContext(PrivateSettingsContext);
