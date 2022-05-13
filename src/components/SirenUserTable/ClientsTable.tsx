import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllClients } from '../../firebase/queries';


export default function ClientsTable() {

  const [clientUsers, setClientUsers] = useState([]);

  const getClientUsers = async () => {
    const users = await getAllClients();
    setClientUsers(users);
  }

  useEffect(() => {
    getClientUsers();
  }, []);
  console.log(clientUsers);
  return (
    <TableContainer sx={{border: 1, borderRadius: 2}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Account Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientUsers.map((user) => (
            <TableRow
              key={user.uid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{user.fullName}</TableCell>
              <TableCell component="th" scope="row">{user.email}</TableCell>
              <TableCell component="th" scope="row">{user.id}</TableCell>
              <TableCell component="th" scope="row">{new Date(user.createdAt.seconds * 1000).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}