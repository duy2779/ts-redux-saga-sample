import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Control, useController } from 'react-hook-form';

export interface RadioOptions {
  label?: string;
  value: number | string;
}

export interface RadioFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOptions[];
}

export function RadioField({ name, control, label, disabled, options }: RadioFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl disabled={disabled} margin="normal" error={invalid}>
      <FormLabel id="radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}