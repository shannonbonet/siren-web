import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {getAllQuestionsOfType, getAllClients} from '../firebase/queries';
import {Question} from '../types';

interface Column {
  id: 'id' | 'Name' | 'alienRegistrationNumber' | 'visitReason' | 'status' | 'telephone' | 'Email' | 'county';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Unique ID', minWidth: 170 },
  { id: 'Name', label: 'Name', minWidth: 100 },
  {
    id: 'alienRegistrationNumber',
    label: 'A. Number',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'visitReason',
    label: 'Case Type',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'telephone',
    label: 'Phone Number',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'Email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'county',
    label: 'County',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];


const MyTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [responses, setResponses] = useState<Array<Object>>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        async function loadClientResponses(){
            let clientAns: Array<Object> = new Array();

            //filter out clients w no answers
            const clients = (await getAllClients()).filter(c => c.answers !== undefined && Object.keys(c.answers).length >= 1);

            //add all client answer objects to array, then select 'general' responses
            for (const i in clients){
                clientAns.push(clients[i].answers);
            }
            const clientGenAns: Array<Object> = clientAns.map(c => c['general']);

            setResponses(clientGenAns);
        }
        loadClientResponses();

        async function loadQuestions(){
            const qList = await getAllQuestionsOfType('general');
            setQuestions(qList);
        }
        loadQuestions();

        // DEBUGGING 
        console.log('RESPONSES', 
          responses.map((res) => 
            { return (<div>{res['Name']}</div>)
          }));

    }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* EDIT THIS SECTION */}
            {responses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row['Name']}>
                    {columns.map((column) => { 
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={responses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default MyTable; 