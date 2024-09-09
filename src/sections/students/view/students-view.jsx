import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import DialogContentText from '@mui/material/DialogContentText';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import StudentsTableRow from '../students-table-row';
import StudentsTableHead from '../students-table-head';
import StudentsTableToolbar from '../students-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import configuration from '../../../../build/contracts/StudentRecord.json';
// ----------------------------------------------------------------------

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  // 'http://127.0.0.1:9545'
  window.ethereum
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

export default function StudentsPage() {
  const [students_list , setStudents] = useState([]);


  const getAccount = async () => {
    // const accounts = await web3.eth.requestAccounts();

  }

  const [new_student_name, setNewName] = useState('');
  const [new_student_nik, setNewNik] = useState('');

  const onChangeName = event => {
    setNewName(event.target.value);
  };
  const onChangeNik = event => {
   setNewNik(event.target.value);
  };

  const addStudent = async (e) => {
    const accounts = await web3.eth.requestAccounts();

    e.preventDefault();
    try {
      const resp2 = await contract.methods.generateStudent(new_student_nik,new_student_name).send({ from: accounts[0] });
      console.log("ADD Student ", resp2);
      alert("Student Added");

    } catch (e) {
      alert("Unable to add student");
    }
  };
  
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: students_list,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  
  function handleClickStudent(event, row){
    navigate("/student-detail", { state: row } );  
  }

  const notFound = !dataFiltered.length && !!filterName;

  const getAllStudent = async (e) => {
    try {
      const resp = await contract.methods.getAllStudents().call();
      const filtered = applyFilter({
        inputData: resp,
        comparator: getComparator(order, orderBy),
        filterName,
      });

      setStudents(filtered);
    } catch (e) {
      console.error("Failed to fetch student")
    }
  };

  useEffect(()=>{
    if(window.ethereum){
      getAccount();
      getAllStudent();
    } else{
        console.log("MetaMask is not installed")
    }
// eslint-disable-next-line 
  },[] );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">List Students</Typography>

        <Button variant="contained"  startIcon={<Iconify icon="eva:plus-fill"/>} onClick={handleClickOpen}>
          New Student
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the forms
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="student_nisn"
            name="student_nisn"
            label="Nomor Induk Siswa"
            fullWidth
            variant="standard"
            value={new_student_nik}
            onChange={onChangeNik}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="student_name"
            name="student_name"
            label="Name"
            fullWidth
            variant="standard"
            value={new_student_name}
            onChange={onChangeName}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit"  onClick={handleClose}>Cancel</Button>
          <Button variant="contained"  onClick={addStudent} type="submit">Add Student</Button>
        </DialogActions>
      </Dialog>
      </Stack>

      <Card>
        <StudentsTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <StudentsTableHead
                order={order}
                orderBy={orderBy}
                rowCount={students_list.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'No', label: 'No', width: '5px' },
                  { id: 'nikname', label: 'Name' },
                  { id: 'nik', label: 'Nomor Induk Siswa' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StudentsTableRow
                      key={row.nik}
                      id={row.nik}
                      number={(page) * rowsPerPage + index+1}
                      name={row.name}
                      nik={row.nik}
                      // status={row.status}
                      // files={row.files}
                      // avatarUrl={row.avatarUrl}
                      handleClick={(event) => handleClickStudent(event, row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, students_list.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={students_list.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
