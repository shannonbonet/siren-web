import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSirenUsersWhere, setSirenUser } from '../../firebase/queries';
import ApproveDeny from './ApproveDeny';
import { SirenUser } from '../../../types';

export default function SirenApprovalTable() {
  const [sirenUsers, setSirenUsers] = useState([]);

  const getPendingSirenUsers = async () => {
    const queryParams = [
        {field: 'status', operator: '==', value: 'Pending'}
    ]
    const users = await getSirenUsersWhere(queryParams);
    setSirenUsers(users);
  }

  const handleStatusChange = async (user: SirenUser, status: string) => {
    const updatedUser = {...user};
    updatedUser.status = status;
    setSirenUser(updatedUser);
    setSirenUsers(sirenUsers.filter(u => u.uid != updatedUser.uid))
  }

  useEffect(() => {
    getPendingSirenUsers();
  }, []);
  return (
    <TableContainer sx={{border: 1, borderRadius: 2}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Staff Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Decision</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sirenUsers.map((user) => (
            <TableRow
              key={user.uid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{user.name}</TableCell>
              <TableCell component="th" scope="row">{user.email}</TableCell>
              <TableCell component="th" scope="row"><ApproveDeny user={user} handleStatusChange={handleStatusChange}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}