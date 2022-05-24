import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import studentAPI from 'api/studentAPI';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = !!studentId;
  const [student, setStudent] = useState<Student>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const data: Student = await studentAPI.getById(studentId as string);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch student', error);
      }
    })();
  }, [studentId]);

  const handleFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentAPI.update(formValues);
    } else {
      await studentAPI.add(formValues);
    }
    navigate('/admin/students');
  };

  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <Box>
      <Link to="/admin/students" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" startIcon={<ChevronLeft />} sx={{ mb: 2 }}>
          Back to student list
        </Button>
      </Link>
      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

      {(!isEdit || !!student) && (
        <Box mt={3}>
          <StudentForm initialValue={initialValue} onSubmit={handleFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
