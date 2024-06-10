import type { SettingType } from '@tempo/types/settings';
import ColorInput from '@tempo/ui/components/inputs/ColorInput';
import FileInput from '@tempo/ui/components/inputs/FileInput';
import TextField from '@mui/material/TextField';
import type { FocusEvent, FocusEventHandler, DragEvent, FC, ChangeEvent } from 'react';

interface SettingProps {
  name: string;
  type: SettingType;
  label: string;
  value?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DragEvent<HTMLDivElement>
  ) => void;
  onFileChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  clearValue?: () => void;
  resetValue?: () => void;
  defaultValue?: string;
  encrypted?: boolean;
}

const Setting: FC<SettingProps> = ({
  name,
  type,
  label,
  value,
  onChange,
  onFileChange,
  onBlur,
  clearValue,
  resetValue,
  encrypted,
  defaultValue,
}) => {
  const handleFocus = () => {
    if (encrypted && value === defaultValue && clearValue) {
      clearValue();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (encrypted && value === '' && resetValue) {
      resetValue();
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DragEvent<HTMLDivElement>
  ) => {
    onChange(event);

    if (type === 'image') {
      onFileChange && onFileChange(event as ChangeEvent<HTMLInputElement>);
    }
  };

  const commonProps = {
    name,
    label,
    value,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  if (type === 'string') {
    return <TextField {...commonProps} fullWidth />;
  }
  if (type === 'color') {
    return <ColorInput {...commonProps} />;
  }
  if (type === 'image') {
    return <FileInput {...commonProps} alt={label} />;
  }
  return null;
};
export default Setting;
