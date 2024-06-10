import { useContext, createContext } from 'react';

export const TimezoneContext = createContext<string>(undefined);

export const useTimezone = () => useContext(TimezoneContext);

export default TimezoneContext;
