import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllApprovedSirenUsers } from '../../firebase/queries';
import RoleChange from './RoleChange';

export default function SirenUserTable() {
  const [sirenUsers, setSirenUsers] = useState([]);

  const getApprovedSirenUsers = async () => {
    const users = await getAllApprovedSirenUsers();
    setSirenUsers(users);
  }

  useEffect(() => {
    getApprovedSirenUsers();
  }, []);
  return (
    <TableContainer sx={{border: 1, borderRadius: 2}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Staff Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role/Permission</TableCell>
          </TableRow>
        </TableHead>
        {sirenUsers.length > 0 ? <TableBody>
          {sirenUsers.map((user) => (
            <TableRow
              key={user.uid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{user.name}</TableCell>
              <TableCell component="th" scope="row">{user.email}</TableCell>
              <TableCell component="th" scope="row"><RoleChange props={user}/></TableCell>
            </TableRow>
          ))}
        </TableBody> : null}

      </Table>
    </TableContainer>
  );
}