import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {getAllQuestionsOfType, getAllClients, getIdentifiers} from '../../firebase/queries';
import {Question} from '../../../types';
import {camelize} from '../../firebase/helpers';

interface Column {
  id: 'identifier' | 'Name' | 'alienRegistrationNumber' | 'visitReason' | 'status' | 'telephone' | 'Email' | 'county';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

const caseTypes = {
  'dacaRenewal': 10,
  'adjustmentOfStatus': 11,
  'i90': 12,
}

const columns: readonly Column[] = [
  { id: 'identifier', label: 'Unique ID', minWidth: 170 },
  { id: 'Name', label: 'Name', minWidth: 100 },
  {
    id: 'alienRegistrationNumber',
    label: 'A. Number',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'visitReason',
    label: 'Case Type',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'telephone',
    label: 'Phone Number',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'Email',
    label: 'Email',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'county',
    label: 'County',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toFixed(2),
  },
];


const IntakeTable = () => {
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
  const [identifiers, setIdentifiers] = useState<Array<Object[]>>([]);

    useEffect(() => {
      let clientAns: Array<Object> = new Array();
      let caseIdentifiers: Array<Object[]> = new Array();
        
      async function loadClientResponses(){
            //filter out clients w no answers
            const clients = (await getAllClients()).filter(c => c.answers !== undefined && Object.keys(c.answers).length >= 1);

            //add all client answer objects to array, then select 'general' responses
            for (const i in clients){
                clientAns.push(clients[i].answers);
            }
            const clientGenAns: Array<Object> = clientAns.map(c => c['general']);

            //set identifiers
            const ids = clients.map(c => getIdentifiers(c.id)); 
            await Promise.all(ids).then(ids => setIdentifiers(ids))

            setResponses(clientGenAns);
        }
        loadClientResponses();

        async function loadQuestions(){
            const qList = await getAllQuestionsOfType('general');
            setQuestions(qList);
        }
        loadQuestions();

    }, []);
    
    //BUG: useState doesnt always set identifiers -- actually just takes a minute to set identifiers
    console.log(identifiers);
    console.log(responses);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{borderRadius: '10px'}}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#CFD3D7', borderColor: '#0F2536', maxHeight: '36px'}}
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
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row['Name']}>
                    {columns.map((column) => {
                        let value;
                        if (column.id == 'identifier'){
                          // using first case as default for now, should eventually take in caseType and update value accordingly
                          const caseType = camelize(row['visitReason']);
                          for (const o of identifiers[i]){
                            if (o['caseType'] == caseType){
                              value = o['identifier'];
                              break;
                            }
                          }
                        } else {
                          value = row[column.id];
                        } 
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

export default IntakeTable; 