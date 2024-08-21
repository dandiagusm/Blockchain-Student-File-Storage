/* eslint-disable */
import Web3 from 'web3';

import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import { Box, Button, Container } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
// import DialogActions from '@mui/material/DialogActions';

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
// import {API_Key, API_Secret, JWT} from "../../utils/constants.js"

export default function AppSearchIpfs({}) {
  const [ipfs_hash, setIpfsHash] = useState('');
  const [address_issuer, setAddressIssuer] = useState('');
  const [nik, setNik] = useState('');
  const [season, setSeason] = useState('');
  const [time, setTime] = useState('');
  const [check_render, setRender] = useState(false);
  const [check_click, setClick] = useState(false);

  const onChangeIpfs = event => {
    setIpfsHash(event.target.value);
  };

  const onSearchHandle = async (event) => {
    event.preventDefault();
    
    try {
      const files_temp = await contract.methods.getStdFile(ipfs_hash).call();
      setAddressIssuer(files_temp.issuer);
      setNik(files_temp.nik);
      setSeason(files_temp.season);
      setTime(files_temp.created_time);
      setClick(true);
      // console.log(files_temp);

      if (files_temp.nik.length != 0){
        setRender(true);
      } else {
        setRender(false);
      }

    } catch (error) {
      console.log(error);
    }
  };


const renderFileDetail = () => {
  if (check_render){
    return(
      <Stack disabled={true} sx={{ border: '1px solid grey', bgcolor: '#FFFFFF', padding: '20px', borderRadius: '25px'}} direction="row" useFlexGap flexWrap="wrap" >
      <Box sx={{ width: "10%"}}>  
        <Typography sx={{ fontWeight: 'bold' }}>Issuer </Typography>
        <Typography sx={{ fontWeight: 'bold' }}>Hash </Typography>
        <Typography sx={{ fontWeight: 'bold' }}>NIS </Typography>
        <Typography sx={{ fontWeight: 'bold' }}>Time Created</Typography>            
      </Box>
      <Box sx={{ width: "90%"}}>
        <Typography>{address_issuer}</Typography>
        <Typography>{ipfs_hash}</Typography>
        <Typography>{nik}</Typography>
        <Typography>{time}</Typography>                  
      </Box>
    </Stack>       
    )
  } else if (ipfs_hash.length != 0 && check_click){
    return (
      <Typography sx={{ fontWeight: 'bold', color:'red' }}>File Tidak Ditemukan </Typography>
    )
  } else {
    return (<p></p>)
  }
}

  return (
    <Box sx={{color: 'inherit'}}>
      <Box
        component="form"
        sx={{ paddingTop: 2, marginTop: 4 }}
        // noValidate
        // autoComplete="off"
        bgcolor= "#FFFFFF"
        padding= "2"
      >
        <Typography variant="h4" sx={{ margin: 3 }}>
          Search File According IPFS Hash
        </Typography>
        <Stack direction="row" useFlexGap flexWrap="wrap"
          sx={{
            textAlign: "center",
            margin: 3
          }}
        >
          <TextField 
            fullWidth 
            sx={{marginTop: 2, marginBottom: 2, marginRight: 2 }} 
            id="outlined-basic" 
            label="IPFS Hash" 
            variant="outlined" 
            size="small" 
            value={ipfs_hash}
            onChange={onChangeIpfs}
          />
            <Button sx={{marginBottom: 5}}  variant="contained" onClick={onSearchHandle} type="submit" >
              Search File
            </Button>
        </Stack>  
      </Box>
          {renderFileDetail()}
    </Box>

  );
}

AppSearchIpfs.propTypes = {
  sender: PropTypes.string,
};
