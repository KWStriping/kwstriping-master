import * as m from '@paraglide/messages';
import { toast } from 'react-toastify';
import type { ToastOptions, ToastContent } from 'react-toastify';

type NotifierOptions = ToastOptions & IMessage;

export function useNotifier() {
  return <TContent extends ToastContent<unknown>>(
    content: TContent,
    options: Partial<NotifierOptions>
  ) => {
    const timeout = options.type === 'error' ? false : options.autohide;
    toast(content, {
      type: options.type ?? 'info',
      position: toast.POSITION.BOTTOM_RIGHT,
      ...(timeout ? { autoClose: timeout } : {}),
    });
  };
}

export default useNotifier;

export interface IMessage {
  actionBtn?: {
    label: string;
    action: () => void;
  };
  autohide?: number;
  expandText?: string;
  title?: string;
  onUndo?: () => void;
  apiMessage?: string;
}

export interface INotification {
  id: number;
  message: IMessage;
  timeout: number;
  close: () => void;
}

export interface ITimer {
  id: number;
  notification: INotification;
  remaining: number;
  start: number;
  timeoutId: number;
}

export const types = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
};
export interface INotificationContext {
  show: (message: IMessage, timeout?: number | null) => void;
  remove: (notification: INotification) => void;
  clearErrorNotifications: () => void;
}

export type IMessageContext = (message: IMessage) => void;

export const messages = {
  seeError: {
    id: 'w9xgN9',
    defaultMessage: 'See error log',
    description: 'see error log label in notification',
  },
  hideError: {
    id: 's8FlDW',
    defaultMessage: 'Hide log',
    description: 'hide error log label in notification',
  },
};

export const useDefaultNotifierSuccessErrorData = (errors: unknown[]) => {
  return !errors?.length
    ? {
        type: 'success',
        text: m.dashboard_savedChanges() ?? 'Saved changes',
      }
    : {
        type: 'error',
        text: m.dashboard_unknownError() ?? 'Unknown error',
      };
};
