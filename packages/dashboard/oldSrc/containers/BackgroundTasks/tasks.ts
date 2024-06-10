import type { TFunction } from '@core/i18n';
import type { IMessageContext } from '@dashboard/components/messages';
import { JobStatus } from '@core/api/constants';
import type {
  CheckExportFileStatusQuery,
  CheckOrderInvoicesStatusQuery,
} from '@core/api/graphql';
import type { MutableRefObject } from 'react';
import type { OperationResult } from '@core/urql';

import messages from './messages';
import type { InvoiceGenerateParams, QueuedTask, TaskData } from './types';
import { TaskStatus } from './types';

function getTaskStatus(jobStatus: JobStatus): TaskStatus {
  switch (jobStatus) {
    case JobStatus.Success:
      return TaskStatus.Success;
    case JobStatus.Pending:
      return TaskStatus.Pending;
    default:
      return TaskStatus.Failure;
  }
}

export async function handleTask(task: QueuedTask): Promise<TaskStatus> {
  let status = TaskStatus.Pending;
  try {
    status = await task.handle();
    if (status !== TaskStatus.Pending) {
      task.onCompleted({
        status,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      task.onError(error);
    } else {
      console.error('Unknown error', error);
    }
  }

  return status;
}

export function handleError(error: Error) {
  throw error;
}

export function queueCustom(id: number, tasks: MutableRefObject<QueuedTask[]>, data: TaskData) {
  (['handle', 'onCompleted'] as Array<keyof TaskData>)
    .filter((field) => !data[field])
    .forEach((field) => {
      throw new Error(`${field} is required when creating custom task`);
    });
  tasks.current = [
    ...tasks.current,
    {
      handle: data?.handle,
      id,
      onCompleted: data?.onCompleted,
      onError: data?.onError || handleError,
      status: TaskStatus.Pending,
    },
  ];
}

export function queueInvoiceGenerate(
  id: number,
  generateInvoice: InvoiceGenerateParams,
  tasks: MutableRefObject<QueuedTask[]>,
  fetch: () => Promise<OperationResult<CheckOrderInvoicesStatusQuery>>,
  notify: IMessageContext,
  t: TFunction
) {
  if (!generateInvoice) {
    throw new Error('generateInvoice is required when creating custom task');
  }
  tasks.current = [
    ...tasks.current,
    {
      handle: async () => {
        const result = await fetch();
        const status = result.data?.order?.invoices?.find(
          (invoice) => invoice.id === generateInvoice.invoiceId
        ).status;

        return getTaskStatus(status);
      },
      id,
      onCompleted: (data) =>
        data?.status === TaskStatus.Success
          ? notify(
            t(
              'dashboard.invoiceGenerateFinishedText',
              messages.invoiceGenerateFinishedText.defaultMessage
            ),
            {
              type: 'success',

              title: t(
                'dashboard.invoiceGenerateFinishedTitle',
                messages.invoiceGenerateFinishedTitle.defaultMessage
              ),
            }
          )
          : notify(t('dashboard.somethingWentWrong', 'Something went wrong'), {
            type: 'error',

            title: t(
              'dashboard.invoiceGenerationFailedTitle',
              messages.invoiceGenerationFailedTitle.defaultMessage
            ),
          }),
      onError: handleError,
      status: TaskStatus.Pending,
    },
  ];
}

export function queueExport(
  id: number,
  tasks: MutableRefObject<QueuedTask[]>,
  fetch: () => Promise<ApolloOperationResult<CheckExportFileStatusQuery>>,
  notify: IMessageContext,
  t: TFunction
) {
  tasks.current = [
    ...tasks.current,
    {
      handle: async () => {
        const result = await fetch();
        const status = result.data?.exportFile?.status;

        return getTaskStatus(status);
      },
      id,
      onCompleted: (data) =>
        data?.status === TaskStatus.Success
          ? notify(
            t('dashboard.exportFinishedText', messages.exportFinishedText.defaultMessage),
            {
              type: 'success',

              title: t(
                'dashboard.exportFinishedTitle',
                messages.exportFinishedTitle.defaultMessage
              ),
            }
          )
          : notify(t('dashboard.somethingWentWrong', 'Something went wrong'), {
            type: 'error',

            title: t('dashboard.exportFailedTitle', messages.exportFailedTitle.defaultMessage),
          }),
      onError: handleError,
      status: TaskStatus.Pending,
    },
  ];
}
