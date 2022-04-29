import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllPendingSirenUsers } from '../../firebase/queries';
import RoleChange from './RoleChange';

export default function SirenApprovalTable() {
  const [sirenUsers, setSirenUsers] = useState([]);

  const getPendingSirenUsers = async () => {
    const users = await getAllPendingSirenUsers();
    setSirenUsers(users);
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
              <TableCell component="th" scope="row"><ApproveDeny props={user}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}