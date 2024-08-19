// import { faker } from '@faker-js/faker';
// import { useLocation } from 'react-router-dom';
import Web3 from 'web3';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

import AppUploadForm from '../app-upload-form';
import AppWidgetSummary from '../app-widget-summary';
import configurationFile from '../../../../build/contracts/StudentFile.json';
import configurationStudent from '../../../../build/contracts/StudentDetail.json';
// import configuration from '../../../../build/contracts/Tickets.json';
// ----------------------------------------------------------------------

const CONTRACT_ADDRESS_STUDENT = configurationStudent.networks['5777'].address;
const CONTRACT_ABI_STUDENT = configurationStudent.abi;

const CONTRACT_ADDRESS_FILE = configurationFile.networks['5777'].address;
const CONTRACT_ABI_FILE = configurationFile.abi;

const web3 = new Web3(
  // 'http://127.0.0.1:9545'
  window.ethereum
);
const contract_student = new web3.eth.Contract(
  CONTRACT_ABI_STUDENT,
  CONTRACT_ADDRESS_STUDENT
);

const contract_file = new web3.eth.Contract(
  CONTRACT_ABI_FILE,
  CONTRACT_ADDRESS_FILE
);
// ----------------------------------------------------------------------

export default function AppView() {
  const [numStudents , setNumStudents] = useState('');
  const [numFiles , setNumFiles] = useState('');

  const getNumberOfStudent = async (e) => {
    try {
      const resp = await contract_student.methods.getNumberOfStudent().call();
      setNumStudents(resp);
    } catch (e) {
      console.error("Failed to fetch student")
    }
  };

  const getNumberOfFiles = async (e) => {
    try {
      const resp = await contract_file.methods.getNumberOfFiles().call();
      setNumFiles(resp);
    } catch (e) {
      console.error("Failed to fetch student")
    }
  };

  useEffect(()=>{
    if(window.ethereum){
      getNumberOfFiles();
      getNumberOfStudent();
    } else{
        console.log("MetaMask is not installed")
    }
// eslint-disable-next-line 
  },[] );

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={6}>
          <AppWidgetSummary
            title="Total Student"
            total={Number(numStudents)}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={6}>
          <AppWidgetSummary
            title="Total Files"
            total={Number(numFiles)}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AppUploadForm
            sender="Current sender"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
