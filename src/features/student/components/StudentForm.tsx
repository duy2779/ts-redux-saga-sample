import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioField, SelectField } from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValue: Student) => void;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter name.')
      .test('two-words', 'Please enter at least two words', (value) => {
        if (!value) return true;
        const parts = value.split(' ') || [];
        return parts.filter((x) => !!x).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .integer('Please enter an interger number.')
      .required('Please enter age.')
      .min(18, 'Min is 18')
      .max(100, 'Max is 100')
      .typeError('Please enter a valid number.'),
    mark: yup
      .number()
      .positive('Please enter a positive number.')
      .min(0, 'Min is 0.')
      .max(10, 'Max is 10.')
      .required('Please enter mark.')
      .typeError('Please enter a valid number.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please selecte either male or female.')
      .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
  })
  .required();

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const cityOptions = useAppSelector(selectCityOptions);

  const [error, setError] = useState<string>('');

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unexpected error');
      }
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <InputField name="age" control={control} label="Age" />
        <RadioField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="mark" control={control} label="Mark" type="number" />
        {cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          {isSubmitting && <CircularProgress size={16} color="primary" />}Save
        </Button>
      </form>
    </Box>
  );
}
