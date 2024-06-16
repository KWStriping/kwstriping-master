import type { FileUploadMutation } from '@tempo/api/generated/graphql';
import type { OperationResult } from '@tempo/api';
import { merge, reduce } from 'lodash-es';
import type {
  CustomizationSettingsFiles,
  CustomizationSettingsValues,
} from '@tempo/checkout/types/api';

type UploadFileFunction = (variables?: {
  file: any;
}) => Promise<OperationResult<FileUploadMutation>>;

type FileSetting = {
  [x: string]: File;
};

const uploadSettingFile = async (setting: FileSetting, uploadFile: UploadFileFunction) => {
  const settingIdx = Object.keys(setting)[0];
  if (!settingIdx) return {};
  const uploadFileResult = await uploadFile({
    file: setting[settingIdx],
  });
  if (uploadFileResult.data?.uploadFile) {
    return {
      [settingIdx]: uploadFileResult.data?.uploadFile?.result?.url,
    };
  }
  return {
    [settingIdx]: undefined,
  };
};

const mapSettingsObjectToArray = (
  settingList?: Partial<CustomizationSettingsFiles[keyof CustomizationSettingsFiles]>
) =>
  reduce(
    settingList,
    (settingsUrls, settingFile, settingIdx) => {
      if (settingFile) {
        return [
          ...settingsUrls,
          {
            [settingIdx]: settingFile,
          },
        ];
      }
      return settingsUrls;
    },
    [] as FileSetting[]
  );

export const uploadSettingsFiles = async ({
  data,
  dataFiles,
  uploadFile,
}: {
  data: CustomizationSettingsValues;
  dataFiles?: CustomizationSettingsFiles;
  uploadFile: UploadFileFunction;
}) => {
  if (!dataFiles) {
    return data;
  }

  return reduce(
    dataFiles,
    async (settings, subSettings, idx) => {
      const uploadedSettings = await settings;
      const uploadedSubSettings = await Promise.all(
        mapSettingsObjectToArray(subSettings).map((setting) =>
          uploadSettingFile(setting, uploadFile)
        )
      );

      return {
        ...uploadedSettings,
        [idx]: merge({}, ...uploadedSubSettings),
      };
    },
    Promise.resolve(data)
  );
};
