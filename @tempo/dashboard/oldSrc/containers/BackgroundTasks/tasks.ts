import * as m from '@paraglide/messages';
import type { IMessageContext } from '@dashboard/components/messages';
import { JobStatus } from '@tempo/api/generated/constants';
import type {
  CheckExportFileStatusQuery,
  CheckOrderInvoicesStatusQuery,
} from '@tempo/api/generated/graphql';
import type { MutableRefObject } from 'react';
import type { OperationResult } from '@tempo/api';;

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
              'dashboard_invoiceGenerateFinishedText',
              messages.invoiceGenerateFinishedText.defaultMessage
            ),
            {
              type: 'success',

              title: t(
                'dashboard_invoiceGenerateFinishedTitle',
                messages.invoiceGenerateFinishedTitle.defaultMessage
              ),
            }
          )
          : notify((m.dashboard_somethingWentWrong() ?? 'Something went wrong'), {
            type: 'error',

            title: t(
              'dashboard_invoiceGenerationFailedTitle',
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
            (m.dashboard_exportFinishedText({
              type: 'success',
              title: t(
                'dashboard_exportFinishedTitle',
                messages.exportFinishedTitle.defaultMessage
              ),
            }) ?? messages.exportFinishedText.defaultMessage)
          )
          : notify((m.dashboard_somethingWentWrong() ?? 'Something went wrong'), {
            type: 'error',

            title: t('dashboard_exportFailedTitle', messages.exportFailedTitle.defaultMessage),
          }),
      onError: handleError,
      status: TaskStatus.Pending,
    },
  ];
}
