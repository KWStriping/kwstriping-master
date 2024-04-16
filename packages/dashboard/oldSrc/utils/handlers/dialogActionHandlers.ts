import type { UrlObject } from 'url';
import type { BulkAction, Dialog, SingleAction } from '@dashboard/oldSrc/types';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

type Url<T extends Dialog<any>> = (params: T) => string | UrlObject;
type CreateCloseModal<TAction extends string, TParams extends Dialog<TAction>> = [
  (action: TAction, newParams?: TParams) => void,
  () => void
];

function useDialogActionHandlers<
  TAction extends string,
  TParams extends Dialog<TAction> & BulkAction & SingleAction
>(url: Url<TParams> | UrlObject): CreateCloseModal<TAction, TParams> {
  const router = useRouter();
  const params = router.query as TParams; // TODO: validate
  const close = useCallback(() => {
    void router.replace(
      typeof url === 'function'
        ? url({
            ...params,
            action: undefined,
            id: undefined,
            ids: undefined,
          })
        : url
    );
  }, [params, router, url]);

  const open = useCallback(
    (action: TAction, newParams?: TParams) => {
      void router.push(
        typeof url === 'function'
          ? url({
              ...params,
              ...newParams,
              action,
            })
          : url
      );
    },
    [params, router, url]
  );

  return [open, close];
}

export default useDialogActionHandlers;
