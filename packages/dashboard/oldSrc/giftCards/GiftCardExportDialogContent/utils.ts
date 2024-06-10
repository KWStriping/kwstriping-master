import type { ExportSettingsFormData } from '@dashboard/components/products/ProductExportDialog/types';
import { ExportScope } from '@core/api/graphql';

interface ExportGiftCardsInputProps {
  ids: string[] | null;
  data: ExportSettingsFormData;
}

export const getExportGiftCardsInput = ({ data, ids }: ExportGiftCardsInputProps) => {
  const { scope, fileType } = data;

  if (scope === ExportScope.Ids) {
    return {
      fileType,
      scope,
      ids,
    };
  }

  return {
    fileType,
    scope,
  };
};
