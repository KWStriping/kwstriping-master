import { ExportScope, FileType } from '@tempo/api/generated/constants';

export interface ExportSettingsInput {
  scope: ExportScope;
  fileType: FileType;
}

export interface ExportSettingsFormData {
  fileType: FileType;
  scope: ExportScope;
}

export const exportSettingsInitialFormData = {
  fileType: FileType.Csv,
  scope: ExportScope.All,
};

export const exportSettingsInitialFormDataWithIds = {
  fileType: FileType.Csv,
  scope: ExportScope.Ids,
};
