import { useContext, createContext } from 'react';

export const DateContext = createContext<number>(undefined);

export const useDate = () => useContext(DateContext);

export default DateContext;
