import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { FileUploadDocument } from '@tempo/api/generated/graphql';
import type { FC } from 'react';
import { useState } from 'react';
import FileUploadField from '@tempo/dashboard/components/fields/FileUploadField';
import { RadioGroupField } from '@tempo/dashboard/components/fields/RadioGroupField';
import { ColorPicker } from '@tempo/dashboard/components/widgets/ColorPicker';
import type { UseFormResult } from '@tempo/dashboard/hooks/useForm';
import type { ValueEditDialogFormData } from '@tempo/dashboard/oldSrc/attributes/utils/data';

type AttributeSwatchFieldProps<T> = Pick<
  UseFormResult<T>,
  'setError' | 'set' | 'errors' | 'clearErrors' | 'data'
>;

type SwatchType = 'picker' | 'image';

const AttributeSwatchField: FC<AttributeSwatchFieldProps<ValueEditDialogFormData>> = ({
  set,
  ...props
}) => {
  const { data } = props;
  const notify = useNotifier();
  const [processing, setProcessing] = useState(false);
  const [uploadFile] = useMutation(FileUploadDocument, {});
  const [type, setType] = useState<SwatchType>(data?.fileUrl ? 'image' : 'picker');

  const handleColorChange = (hex: string) =>
    set({ value: hex, fileUrl: undefined, contentType: undefined });

  const handleFileUpload = async (file: File) => {
    setProcessing(true);

    const {
      data: { fileUpload },
    } = await uploadFile({ file });

    if (fileUpload.errors?.length) {
      notify(
        t(
          'dashboard_imageUploadErrorText',
          "There was a problem with the file you uploaded as an image and it couldn't be used. Please try a different file."
        ),
        {
          type: 'error',
          title: m.dashboard_imageUploadErrorTitle() ?? "Couldn't process image",
        }
      );
    } else {
      set({
        fileUrl: fileUpload.uploadedFile.url,
        contentType: fileUpload.uploadedFile.contentType,
        value: undefined,
      });
    }

    setProcessing(false);
  };

  const handleFileDelete = () =>
    set({
      fileUrl: undefined,
      contentType: undefined,
      value: undefined,
    });

  return (
    <>
      <RadioGroupField
        choices={[
          {
            label: m.dashboard_icker() ?? 'Picker',
            value: 'picker',
          },
          {
            label: m.dashboard_image() ?? 'Image',
            value: 'image',
          },
        ]}
        variant="inline"
        label={m.dashboard_watch() ?? 'Swatch'}
        name="swatch"
        value={type}
        onChange={(event) => setType(event.target.value)}
        data-test-id="swatch-radio"
      />
      {type === 'image' ? (
        <>
          <FileUploadField
            disabled={processing}
            loading={processing}
            file={{ label: null, value: null, file: null }}
            onFileUpload={handleFileUpload}
            onFileDelete={handleFileDelete}
            inputProps={{
              accept: 'image/*',
            }}
          />

          {data?.fileUrl && (
            <div
              className={styles.filePreview ?? ''}
              style={{ backgroundImage: `url(${data?.fileUrl})` }}
            />
          )}
        </>
      ) : (
        <ColorPicker {...props} onColorChange={handleColorChange} />
      )}
    </>
  );
};

AttributeSwatchField.displayName = 'AttributeSwatchField';
export default AttributeSwatchField;
