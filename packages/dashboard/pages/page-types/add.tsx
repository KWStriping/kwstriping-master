import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getMutationErrors } from '@core/urql/utils';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import type { PageKlassForm } from '@dashboard/components/pageKlasses/PageKlassCreatePage';
import PageKlassCreatePage from '@dashboard/components/pageKlasses/PageKlassCreatePage';
import {
  PageKlassCreateDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
} from '@core/api/graphql';

import { pageKlassUrl } from '@dashboard/oldSrc/pageKlasses/urls';
import createMetadataCreateHandler from '@dashboard/oldSrc/utils/handlers/metadataCreateHandler';
import { useRouter } from 'next/router';

export const PageKlassCreate = () => {
  const router = useRouter();
  const notify = useNotifier();
  const { t } = useTranslation();
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [createPageKlass, createPageKlassOpts] = useMutation(PageKlassCreateDocument, {
    onCompleted: (updateData) => {
      if (updateData?.createPageKlass?.errors?.length === 0) {
        notify(t('dashboard.bJ26s', 'Successfully created page type'), {
          type: 'success',
        });
        void router.push(pageKlassUrl(updateData?.createPageKlass?.pageKlass?.id));
      }
    },
  });

  const handleCreate = async (formData: PageKlassForm) => {
    const result = await createPageKlass({
      input: {
        name: formData.name,
      },
    });

    return {
      id: result.data?.createPageKlass?.result?.id || null,
      errors: getMutationErrors(result),
    };
  };

  const handleSubmit = createMetadataCreateHandler(
    handleCreate,
    updateMetadata,
    updatePrivateMetadata
  );

  return (
    <>
      <WindowTitle
        title={t(
          'dashboard.ftZHy',
          'Create Page Type'
          // window title
        )}
      />
      <PageKlassCreatePage
        disabled={createPageKlassOpts.fetching}
        errors={createPageKlassOpts.data?.createPageKlass?.errors || []}
        saveButtonBarState={createPageKlassOpts.status}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default PageKlassCreate;
