import { useTranslation } from '@core/i18n';

import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import { assert } from 'tsafe/assert';
import type { AttributePageFormData } from '@dashboard/components/attributes/AttributePage';
import AttributePage from '@dashboard/components/attributes/AttributePage';
import ValueDeleteDialog from '@dashboard/components/attributes/ValueDeleteDialog';
import ValueEditDialog from '@dashboard/components/attributes/ValueEditDialog';
import { AttributeErrorCode } from '@core/api/constants';
import {
  UpdatePrivateMetadataDocument,
  UpdateMetadataDocument,
  AttributeCreateDocument,
} from '@core/api/graphql';
import type { AttributeErrorFragment } from '@core/api/graphql';
import useListSettings from '@dashboard/hooks/useListSettings';
import useLocalPageInfo, { getMaxPage } from '@dashboard/hooks/useLocalPageInfo';
import { attributeUrl } from '@dashboard/oldSrc/attributes/urls';
import type {
  AttributeAddUrlDialog,
  AttributeAddUrlQueryParams,
} from '@dashboard/oldSrc/attributes/urls';
import { getAttributeData } from '@dashboard/oldSrc/attributes/utils/data';
import type { ValueEditDialogFormData } from '@dashboard/oldSrc/attributes/utils/data';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import { ListViews } from '@dashboard/oldSrc/types';
import type { ReorderEvent } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import { add, isSelected, move, remove, updateAtIndex } from '@dashboard/oldSrc/utils/lists';

interface AttributeDetailsProps {
  params: AttributeAddUrlQueryParams;
}

const valueAlreadyExistsError: AttributeErrorFragment = {
  __typename: 'AttributeError',
  code: AttributeErrorCode.AlreadyExists,
  field: 'name',
  message: '',
};

function areValuesEqual(
  a: ValueEditDialogFormData,
  b: ValueEditDialogFormData
) {
  return a.name === b.name;
}

const AttributeDetails = () => {
  const router = useRouter();
  const params = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();

  const [values, setValues] = useState<ValueEditDialogFormData[]>([]);
  const [valueErrors, setValueErrors] = useState<AttributeErrorFragment[]>([]);

  const { updateListSettings, settings } = useListSettings(ListViews.ValueList);

  const { pageInfo, pageValues, loadNextPage, loadPreviousPage, loadPage } = useLocalPageInfo(
    values,
    settings?.rowNumber
  );

  const [createAttribute, attributeCreateOpts] = useMutation(AttributeCreateDocument, {
    onCompleted: (data) => {
      if (data?.createAttribute?.errors?.length === 0) {
        assert(data?.createAttribute?.attribute);
        notify(t('dashboard.Tifz+', 'Successfully created attribute'), {
          type: 'success',
        });
        void router.push(attributeUrl(data?.createAttribute?.attribute?.id));
      }
    },
  });
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const id = params.id ? parseInt(params.id, 10) + pageInfo.startCursor : undefined;

  const [openModal, closeModal] = useDialogActionHandlers<
    AttributeAddUrlDialog,
    AttributeAddUrlQueryParams
  >(
    router,
    (params) => ({
      pathname: '/attributes/add',
      query: params,
    }),
    params
  );

  useEffect(() => setValueErrors([]), [params.action]);

  const handleValueDelete = () => {
    const newValues = remove(values[id], values, areValuesEqual);
    setValues(newValues);
    closeModal();
  };

  const handleValueUpdate = (input: ValueEditDialogFormData) => {
    if (isSelected(input, values, areValuesEqual)) {
      setValueErrors([valueAlreadyExistsError]);
    } else {
      setValues(updateAtIndex(input, values, id));
      closeModal();
    }
  };

  const handleValueCreate = (input: ValueEditDialogFormData) => {
    if (isSelected(input, values, areValuesEqual)) {
      setValueErrors([valueAlreadyExistsError]);
    } else {
      const newValues = add(input, values);
      setValues(newValues);

      const addedToNotVisibleLastPage =
        newValues.length - pageInfo.startCursor > settings.rowNumber;

      if (addedToNotVisibleLastPage) {
        const maxPage = getMaxPage(newValues.length, settings.rowNumber);
        loadPage(maxPage);
      }

      closeModal();
    }
  };

  const handleValueReorder = ({ newIndex, oldIndex }: ReorderEvent) =>
    setValues(
      move(
        values[pageInfo.startCursor + oldIndex],
        values,
        areValuesEqual,
        pageInfo.startCursor + newIndex
      )
    );

  const handleCreate = async (data: AttributePageFormData) => {
    const result = await createAttribute({
      input: getAttributeData(data, values),
    });

    return {
      id: result.data?.createAttribute?.attribute?.id || null,
      errors: getMutationErrors(result),
    };
  };

  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );

  return (
    <AttributePage
      attribute={null}
      disabled={attributeCreateOpts.fetching}
      errors={attributeCreateOpts.data?.createAttribute?.errors || []}
      onDelete={undefined}
      onSubmit={handleSubmit}
      onValueAdd={() => openModal('add-value')}
      onValueDelete={(id) =>
        openModal('remove-value', {
          id,
        })
      }
      onValueReorder={handleValueReorder}
      onValueUpdate={(id) =>
        openModal('edit-value', {
          id,
        })
      }
      saveButtonBarState={attributeCreateOpts.status}
      values={{
        __typename: 'ValueConnection' as const,
        pageInfo: {
          __typename: 'PageInfo' as const,
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
        },
        edges: pageValues.map((value, valueIndex) => ({
          __typename: 'ValueCountableEdge' as const,
          cursor: '1',
          node: {
            __typename: 'Value' as const,
            file: value?.fileUrl
              ? {
                  url: value.fileUrl,
                  contentType: value.contentType,
                  __typename: 'File',
                }
              : null,
            id: valueIndex.toString(),
            reference: null,
            slug: slugify(value.name).toLowerCase(),
            sortOrder: valueIndex,
            value: null,
            plainText: null,
            richText: null,
            boolean: null,
            date: null,
            dateTime: null,
            ...value,
          },
        })),
      }}
      settings={settings}
      onUpdateListSettings={updateListSettings}
      pageInfo={pageInfo}
      onNextPage={loadNextPage}
      onPreviousPage={loadPreviousPage}
    >
      {(data) => (
        <>
          <ValueEditDialog
            value={null}
            confirmButtonState="default"
            disabled={false}
            errors={valueErrors}
            open={params.action === 'add-value'}
            onClose={closeModal}
            onSubmit={handleValueCreate}
            inputType={data?.inputType}
          />
          {!!values?.length && (
            <>
              <ValueDeleteDialog
                attributeName={undefined}
                open={params.action === 'remove-value'}
                name={getStringOrPlaceholder(values[id]?.name)}
                confirmButtonState="default"
                onClose={closeModal}
                onConfirm={handleValueDelete}
              />
              <ValueEditDialog
                inputType={data?.inputType}
                value={values[id]}
                confirmButtonState="default"
                disabled={false}
                errors={valueErrors}
                open={params.action === 'edit-value'}
                onClose={closeModal}
                onSubmit={handleValueUpdate}
              />
            </>
          )}
        </>
      )}
    </AttributePage>
  );
};

export default AttributeDetails;
