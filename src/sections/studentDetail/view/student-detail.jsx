import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {Box, Stack} from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { files } from 'src/_mock/files';

import FileCard from '../file-card';
import FileSort from '../file-sort';
import AppUploadForm from '../app-upload-form';
import configuration from '../../../../build/contracts/FileRecord.json';

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

export default function StudentDetailView() {
  const [file_list, setFiles] = useState([]);

  const state = useLocation();
  const {name, nik} = state.state;

  const getAccount = async () => {
    // setAccount(account);
  }

  const renderHeaderListFile = () => {
    if (file_list.length !== 0){
      return(
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3}}>List Files </Typography>
      )
    } 
      
    return (<Typography sx={{ fontWeight: 'bold', color:'red' }}>Belum Ada File </Typography>)
  }

  const getStudentFiles = async (e) => {
    try {
      const files_temp = await contract.methods.getFilesByNik(nik).call();
      setFiles(files_temp);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(window.ethereum){
      getAccount();
      getStudentFiles();
    } else{
        console.log("MetaMask is not installed")
    }
// eslint-disable-next-line 
  },[] );

  return (
    <Container>
      <Stack sx={{ border: '1px solid grey', bgcolor: '#FFFFFF', padding: '20px', borderRadius: '25px'}} direction="row" useFlexGap flexWrap="wrap" >
        <Box sx={{ width: "10%"}}>  
          <Typography sx={{ fontWeight: 'bold', padding: '5px'}}>NAME </Typography>
          <Typography sx={{ fontWeight: 'bold', padding: '5px'}}>NIS </Typography>
          <Typography sx={{ fontWeight: 'bold', padding: '5px'}}>FILES</Typography>              
        </Box>
        <Box sx={{ width: "90%"}}>
          <Typography sx={{ padding: '5px', width: "100%"}}> {name} </Typography>       
          <Typography sx={{ padding: '5px'}}> {nik} </Typography>
          <Typography sx={{ padding: '5px'}}> {file_list.length}  </Typography>                 
        </Box>
      </Stack>  
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <FileSort />
        </Stack>
      </Stack>
      <Stack sx={{ gcolor: '#FFFFFF', marginBottom: 5}}  >
        {renderHeaderListFile()}
        <Grid container spacing={3}>
          {file_list.map((file) => (
            <Grid key={file.ipfs_hash} xs={12} sm={6} md={3}>
              <FileCard file={file} />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Grid xs={12} md={6} lg={12}>
          <AppUploadForm
            nik={nik}
          />
        </Grid>
    </Container>
  );
}
