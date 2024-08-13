/* eslint-disable */
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
// import Card from '@mui/material/Card';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';

// import { fShortenNumber } from 'src/utils/format-number';
// import { useForm, Controller } from "react-hook-form";

import { Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useDropzone} from 'react-dropzone';

// import Dropzone from 'react-dropzone-uploader';

// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// ----------------------------------------------------------------------


export default function AppUploadForm({sender}) {
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
    <Box
      component="form"
      sx={{ paddingTop: 1 }}
      // noValidate
      // autoComplete="off"
      bgcolor= "#FFFFFF"
      padding= "2"
      // onSubmit={handleSubmit(onSubmit)}
    > 
      <Typography variant="h4" sx={{ marginLeft: 5, mb: 5 }}>
        Upload File
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
        <TextField fullWidth  id="outlined-basic" label="Address" variant="outlined" size="small" />
        <Button sx={{marginTop: 2 }} type="submit" variant="contained">
          Submit
        </Button>
      </Box>   
      <Box
        sx={{
          padding: 2,
          textAlign: "left",
        }}
      >
        <p>Details of Transaction :</p>
        <ul>
          <li>Address : </li>
          <li>Hash File : </li>
          <li>Time : </li>
        </ul>
      </Box>  
    </Box>
  );
}

AppUploadForm.propTypes = {
  sender: PropTypes.string,
};
