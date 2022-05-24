import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Student } from 'models';
import * as React from 'react';

interface StudentRankingListProps {
  studentList: Student[];
}

export default function StudentRankingList({ studentList }: StudentRankingListProps) {
  return (
    <TableContainer>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((std, idx) => (
            <TableRow key={std.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{idx + 1}</TableCell>
              <TableCell align="left">{std.name}</TableCell>
              <TableCell align="right">{std.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
