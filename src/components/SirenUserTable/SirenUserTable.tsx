import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSirenUsersWhere } from '../../firebase/queries';
import RoleChange from './RoleChange';

export default function SirenUserTable(props) {
  const [sirenUsers, setSirenUsers] = useState([]);
  const getSirenUsers = async () => {
    var rolesToDisplay = ['Viewer', 'Editor'];
    if (props.currentUser.role == 'Super') {
      rolesToDisplay.push('Admin');
    }
    const queryParams = [
      {field: 'status', operator: '==', value: 'Approved'},
      {field: 'role', operator: 'in', value: rolesToDisplay},
    ]
    const users = await getSirenUsersWhere(queryParams);
    setSirenUsers(users.filter(u => u.uid != props.currentUser.uid));
  }

  useEffect(() => {
    getSirenUsers();
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
              <TableCell component="th" scope="row"><RoleChange user={user}/></TableCell>
            </TableRow>
          ))}
        </TableBody> : null}

      </Table>
    </TableContainer>
  );
}