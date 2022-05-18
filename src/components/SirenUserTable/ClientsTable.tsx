import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getAllClients } from "../../firebase/queries";

interface Column {
  id:
    | "Name"
    | "Email"
    | "ID"
    | "Account Created Date"
  label: string;
  minWidth?: number;
  align?: "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "Name", label: "Name", minWidth: 100 },
  {
    id: "Email",
    label: "Email",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "ID",
    label: "ID",
    minWidth: 200,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "Account Created Date",
    label: "Account Created Date",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
];

const ClientsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [identifiers, setIdentifiers] = useState<Array<Object[]>>([]);
  const [clientsPass, setClientsPass] = useState<Array<Object>>([]);

  useEffect(() => {
    async function loadClients() {
      //filter out clients w no answers
      const clients = await getAllClients();
      setClientsPass(clients);
    }
    loadClients();
  }, []);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ borderRadius: "10px" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#CFD3D7",
                    borderColor: "#0F2536",
                    maxHeight: "36px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
           {clientsPass.slice((page*rowsPerPage),(page*rowsPerPage+rowsPerPage)).map((user) => (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={clientsPass.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ClientsTable;
