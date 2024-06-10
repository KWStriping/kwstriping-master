import { Box, OutlinedInput } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { FocusEventHandler, FC, ChangeEventHandler } from 'react';

interface ColorInputProps {
  name: string;
  label: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const ColorInput: FC<ColorInputProps> = ({ name, label, value, onChange, onBlur }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '80px',
      }}
    >
      <Typography variant="body2" sx={{ width: '100%' }}>
        {label}
      </Typography>
      <OutlinedInput
        name={name}
        sx={{
          padding: (theme) => theme.spacing(0.25, 0.5),
          cursor: 'pointer',
        }}
        type="color"
        value={value}
        inputProps={{
          sx: {
            width: '60px',
            height: '30px',
            padding: 0,
            cursor: 'pointer',
          },
        }}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Box>
  );
};
export default ColorInput;
