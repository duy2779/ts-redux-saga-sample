import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface SelectOptions {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOptions[];
}

export function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth size="small" margin="normal" disabled={disabled} error={invalid}>
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
