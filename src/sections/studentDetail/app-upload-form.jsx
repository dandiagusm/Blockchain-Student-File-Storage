/* eslint-disable */
import Web3 from 'web3';

import PropTypes from 'prop-types';
import React, {useState} from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import { Box, Button } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import {useDropzone} from 'react-dropzone';

import configuration from '../../../build/contracts/FileRecord.json';
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

// ----------------------------------------------------------------------
import {API_Key, API_Secret, JWT} from "../../utils/constants.js"

export default function AppUploadForm(props) {
  const nik = props.nik;

  const [new_file_season, setFileSeason] = useState('');
  const [new_file_nik, setFileNik] = useState('');
  const [new_file_timestamp, setFileTimestamp] = useState('N/A');
  const [new_file_hash, setFileHash] = useState('N/A');
  const [account_eth , setAccount] = useState('N/A');

  const [can_upload, setCanUpload] = useState(false);
  const [can_submit, setCanSubmit] = useState(false);

  const addFile = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    try {
      const response = await contract.methods.generateStdFile(accounts[0], nik,new_file_hash, new_file_season, new_file_timestamp).send({ from: accounts[0] });
      
      // console.log("resp", resp)
      console.log("FILE ADD ", response);
      alert("File Added to Ethereum");

      setFileSeason('');
      // setFileNik('');
      window.location.reload()

    } catch (error) {
      console.log(error);
      alert("Unable to add file");
    }
  };

  async function pinFileToIPFS(file) {
    try {
      const data = new FormData();
      data.append("file", file);

      const request = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          maxContentLength: Infinity,
          headers: {
            pinata_api_key: API_Key,
            pinata_secret_api_key: API_Secret
          },
          body: data,
        }
      );
      const response = await request.json();
      console.log(response);
      setFileHash(response.IpfsHash);
      setFileTimestamp(response.Timestamp);
      alert("File Uploaded to IPFS");

    } catch (error) {
      console.log(error);
    }
  }

  const onChangeSeason = event => {
    setFileSeason(event.target.value);
  };
  const onChangeNik = event => {
    setFileNik(event.target.value);
  };


  const onUploadHandler = async (event) => {
    event.preventDefault();
    
    if (!acceptedFiles || acceptedFiles.length === 0) {
      return alert("No files selected");
    }

    const file = acceptedFiles[0];

    await pinFileToIPFS(file);
  };

  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  return (
    <Box sx={{color: 'inherit'}}>
      <Box
        component="form"
        sx={{ paddingTop: 2 }}
        // noValidate
        // autoComplete="off"
        bgcolor= "#FFFFFF"
        padding= "2"
        // onSubmit={handleSubmit(onSubmit)}
      > 
        <Typography variant="h4" sx={{ marginLeft: 5, mb: 5 }}>
          Upload File To IPFS
        </Typography>
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            fontFamily: "Montserrat, sans-serif",
            border: '1px dashed grey',
            marginLeft: 5,
            marginRight: 5
          }}
        > 
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here</p>
            <button type="button" onClick={open}>
              Open File Dialog
            </button>
          </div>
          <aside>
            <h3>Files</h3>
            <h4>{files}</h4>
          </aside>
        </Box>
        <Box
          sx={{
            marginTop: 2,
            textAlign: "center",
            marginLeft: 5,
            marginRight: 5
          }}
        >
          <Button sx={{marginTop: 2 }} type="submit" variant="contained" onClick={onUploadHandler} disabled={files.length === 0}>
            Upload File
          </Button>
        </Box> 
        <Box
          sx={{
            marginTop: 2,
            textAlign: "center",
            marginLeft: 5,
            marginRight: 5
          }}
        >

        </Box> 
        <Box
          sx={{
            padding: 2,
            textAlign: "left",
            marginLeft: 5,
            marginRight: 5
          }}
        >
        </Box>
      </Box>
          
      <Box
        component="form"
        sx={{ paddingTop: 2, marginTop: 4 }}
        // noValidate
        // autoComplete="off"
        bgcolor= "#FFFFFF"
        padding= "2"
      >
        <Typography variant="h4" sx={{ marginLeft: 5, mb: 5 }}>
          Make Transaction To Blockchain
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            marginLeft: 5,
            marginRight: 5
          }}
        >
          {/* <TextField 
            fullWidth 
            sx={{marginTop: 2, marginBottom: 2 }} 
            id="outlined-basic" 
            label="Nomor Induk Siswa" 
            variant="outlined" 
            size="small" 
            value={new_file_nik}
            onChange={onChangeNik}
          /> */}
          <FormControl fullWidth>
            <InputLabel sx={{textAlign: "center"}}  id="select-label">Season</InputLabel>
            <Select
              fullWidth
              sx={{textAlign: "left"}}
              size="small" 
              labelId="select-label"
              id="season-select"
              value={new_file_season}
              label="Season"
              onChange={onChangeSeason}
            >
              <MenuItem value={1}>Semester 1</MenuItem>
              <MenuItem value={2}>Semester 2</MenuItem>
              <MenuItem value={3}>Semester 3</MenuItem>
              <MenuItem value={4}>Semester 4</MenuItem>
              <MenuItem value={5}>Semester 5</MenuItem>
            </Select>
          </FormControl>
        </Box> 
        <Box
          sx={{
            padding: 2,
            textAlign: "left",
            marginLeft: 5,
            marginRight: 5
          }}
        >
            <Typography sx={{ fontWeight: 'bold', marginBottom: '10px'  }}>Details of Transaction </Typography>
            <Typography sx={{ fontWeight: 'bold', marginBottom: '10px'  }}>Check Hash File </Typography>
            <Stack direction="row" useFlexGap flexWrap="wrap">
              <Box sx={{ border: '1px solid grey', width: "25%"}}>  
                <Typography sx={{ fontWeight: 'bold', border: '1px solid grey', padding: '5px', width: '100%'}}>Issuer </Typography>
                <Typography sx={{ fontWeight: 'bold', border: '1px solid grey', padding: '5px'}}>NIS </Typography>
                <Typography sx={{ fontWeight: 'bold', border: '1px solid grey', padding: '5px'}}>Hash File </Typography>
                <Typography sx={{ fontWeight: 'bold', border: '1px solid grey', padding: '5px'}}>Time Created</Typography>              
              </Box>
              <Box sx={{ border: '1px solid grey', borderLeft: '0', width: "75%"}}>
                <Typography sx={{ border: '1px solid grey', borderLeft: '0', padding: '5px', width: "100%"}}> {account_eth} </Typography>       
                <Typography sx={{ border: '1px solid grey', borderLeft: '0', padding: '5px'}}> {nik} </Typography>
                <Typography sx={{ border: '1px solid grey', borderLeft: '0', padding: '5px'}}> {new_file_hash} </Typography>
                <Typography sx={{ border: '1px solid grey', borderLeft: '0', padding: '5px'}}> {new_file_timestamp}  </Typography>                 
              </Box>
            </Stack>  
        </Box>
        <Box
          sx={{
            padding: 4,
            textAlign: "center",
          }}
        >
          <Button variant="contained" onClick={addFile} type="submit" 
            disabled={files.length === 0 || new_file_hash === 'N/A' || nik.length === 0 || new_file_season.length === 0} 
          >
              Submit to Ethereum
          </Button>
        </Box>  
      </Box>
    </Box>

  );
}

AppUploadForm.propTypes = {
  sender: PropTypes.string,
};
