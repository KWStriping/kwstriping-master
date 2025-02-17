import { useContext } from 'react';
import BackgroundTasksContext from '@tempo/dashboard/oldSrc/containers/BackgroundTasks/context';

function useBackgroundTask() {
  return useContext(BackgroundTasksContext);
}

export default useBackgroundTask;
