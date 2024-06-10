import * as m from '@paraglide/messages';
import type { UseFormResult } from '@tempo/dashboard/hooks/useForm';
import TextField from '@mui/material/TextField';
import Hue from '@uiw/react-color-hue';
import Saturation from '@uiw/react-color-saturation';
import convert from 'color-convert';
import type { RGB } from 'color-convert/conversions';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

export type ColorPickerProps<T = any> = Pick<
  UseFormResult<T>,
  'setError' | 'errors' | 'clearErrors' | 'data'
> & { onColorChange: (hex: string) => void };

export const ColorPicker: FC<ColorPickerProps> = ({
  clearErrors,
  setError,
  errors,
  onColorChange,
  data,
}) => {
  const [hex, setHex] = useState<string>(data?.value ? data?.value?.replace('#', '') : '000000');
  const [hue, setHue] = useState<number>(convert.hex.hsv(hex)[0]);

  const [, s, v] = convert.hex.hsv(hex);
  const [r, g, b] = convert.hex.rgb(hex);
  const isValidColor = hex.match(/^(?:[\da-fA-F]{3}){1,2}$/);

  const handleRGBChange = (rgbColor: RequireOnlyOne<{ r: string; g: string; b: string }>) => {
    const getValue = (val: string): number => {
      if (!val) {
        return 0;
      }
      const parsedVal = parseInt(val, 10);
      return parsedVal > 255 ? 255 : parsedVal;
    };

    setHex(
      convert.rgb.hex([getValue(rgbColor.r), getValue(rgbColor.g), getValue(rgbColor.b)] as RGB)
    );
  };

  const handleHEXChange = (hexColor: string) => setHex(hexColor.replace(/ |#/g, ''));

  useEffect(() => {
    if (isValidColor) {
      if ('value' in errors) {
        clearErrors('value');
      }

      onColorChange(`#${hex}`);
    } else {
      if (!('value' in errors)) {
        setError('value', m.dashboard_invalid() ?? 'Invalid value');
      }
    }
  }, [errors, hex]);

  return (
    <div className={styles.picker ?? ''}>
      <div>
        <Saturation
          hsva={{ h: hue, s, v, a: 1 }}
          onChange={({ h, s, v }) => setHex(convert.hsv.hex([h, s, v]))}
          className={styles.saturation ?? ''}
        />
      </div>
      <div>
        <Hue
          hue={hue}
          onChange={({ h }) => {
            setHue(h);
            setHex(convert.hsv.hex([h, s, v]));
          }}
          direction="vertical"
          height="220px"
          width="16px"
        />
      </div>
      <div>
        <TextField
          className={styles.colorInput ?? ''}
          InputProps={{ startAdornment: 'R' }}
          value={r}
          onChange={(event) => handleRGBChange({ r: event.target.value })}
        />
        <TextField
          className={styles.colorInput ?? ''}
          InputProps={{ startAdornment: 'G' }}
          value={g}
          onChange={(event) => handleRGBChange({ g: event.target.value })}
        />
        <TextField
          className={styles.colorInput ?? ''}
          InputProps={{ startAdornment: 'B' }}
          value={b}
          onChange={(event) => handleRGBChange({ b: event.target.value })}
        />
        <TextField
          error={!isValidColor}
          helperText={errors?.value}
          className={styles.colorInput ?? ''}
          InputProps={{ startAdornment: 'HEX' }}
          inputProps={{ pattern: '[A-Za-z0-9]{6}', maxLength: 7 }}
          value={`#${hex}`}
          onChange={(event) => handleHEXChange(event.target.value)}
        />
      </div>
    </div>
  );
};
