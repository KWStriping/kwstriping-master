import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import DateContext from './DateContext';

export const DateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => setDate(Date.now()), 10000);
    return () => window.clearInterval(intervalId);
  }, []);

  return <DateContext.Provider value={date}>{children}</DateContext.Provider>;
};
