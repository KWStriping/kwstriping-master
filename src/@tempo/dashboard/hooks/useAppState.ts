import { useContext } from 'react';

import { AppStateContext } from '../containers/AppState';

function useAppState() {
  return useContext(AppStateContext);
}

export default useAppState;
