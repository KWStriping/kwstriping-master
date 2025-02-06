import { useRef, useEffect } from 'react';
import type { FC, ReactNode } from 'react';

import BackgroundTasksContext from './context';
import { checkExportFileStatus, checkOrderInvoicesStatus } from './queries';
import { handleTask, queueCustom, queueExport, queueInvoiceGenerate } from './tasks';
import type { QueuedTask, TaskData } from './types';
import { Task, TaskStatus } from './types';

export const backgroundTasksRefreshTime = 15 * 1000;

export function useBackgroundTasks() {
  const idCounter = useRef(0);
  const tasks = useRef<QueuedTask[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const queue = async () => {
        await Promise.all(
          tasks.current.map(async (task) => {
            if (task.status === TaskStatus.Pending) {
              let status: TaskStatus;

              try {
                status = await handleTask(task);
              } catch (error) {
                throw error;
              }
              if (status !== TaskStatus.Pending) {
                const taskIndex = tasks.current.findIndex((t) => t.id === task.id);
                tasks.current[taskIndex].status = status;
              }
            }
          })
        );
      };

      queue();
    }, backgroundTasksRefreshTime);

    return () => clearInterval(intervalId);
  });

  function cancel(id: number) {
    tasks.current = tasks.current.filter((task) => task.id !== id);
  }

  function queue(type: Task, data?: TaskData) {
    idCounter.current += 1;
    switch (type) {
      case Task.Custom:
        queueCustom(idCounter.current, tasks, data);
        break;
      case Task.InvoiceGenerate:
        queueInvoiceGenerate(
          idCounter.current,
          data?.generateInvoice,
          tasks,
          () =>
            apolloClient.query({
              fetchPolicy: 'network-only',
              query: checkOrderInvoicesStatus,
              variables: {
                id: data?.generateInvoice?.orderId,
              },
            }),
          notify,
          intl
        );
        break;
      case Task.Export:
        queueExport(
          idCounter.current,
          tasks,
          () =>
            apolloClient.query({
              fetchPolicy: 'network-only',
              query: checkExportFileStatus,
              variables: {
                id: data?.id,
              },
            }),
          notify,
          intl
        );
        break;
    }

    return idCounter.current;
  }

  return {
    cancel,
    queue,
  };
}

const BackgroundTasksProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { cancel, queue } = useBackgroundTasks();

  return (
    <BackgroundTasksContext.Provider
      value={{
        cancel,
        queue,
      }}
    >
      {children}
    </BackgroundTasksContext.Provider>
  );
};

BackgroundTasksProvider.displayName = 'BackgroundTasksProvider';
export default BackgroundTasksProvider;
