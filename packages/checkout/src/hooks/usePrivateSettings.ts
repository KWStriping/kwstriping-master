import { PrivateSettingsContext } from '@core/checkout/components/PrivateSettingsProvider';
import { useContext } from 'react';

export const usePrivateSettings = () => useContext(PrivateSettingsContext);
