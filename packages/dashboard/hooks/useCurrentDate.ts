import { useContext } from 'react';
import { DateContext } from '@dashboard/components/core/Date/DateContext';

function useCurrentDate(): number {
  return useContext(DateContext);
}

export default useCurrentDate;
