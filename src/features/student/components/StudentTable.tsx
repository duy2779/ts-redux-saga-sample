import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Student, City } from 'models';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { capitalizeString, getMarkColor } from 'utils';

interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onRemove?: (student: Student) => void;
}

export default function StudentTable({ studentList, cityMap, onRemove }: StudentTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    if (!onRemove) return;
    onRemove(student);
    setOpen(false);
  };

  return (
    <>
      <TableContainer sx={{ mt: '20px' }}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((std, idx) => (
              <TableRow key={std.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{idx + 1}</TableCell>
                <TableCell>{std.name}</TableCell>
                <TableCell>{capitalizeString(std.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(std.mark)} fontWeight="bold">
                    {std.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[std.city]?.name}</TableCell>
                <TableCell align="right">
                  <Link to={`/admin/students/${std.id}`} style={{ textDecoration: 'none' }}>
                    <Button sx={{ mr: '10px' }} variant="contained" color="primary">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outlined" color="error" onClick={() => handleRemoveClick(std)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student <strong>{selectedStudent?.name}</strong>. <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            autoFocus
            color="error"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
