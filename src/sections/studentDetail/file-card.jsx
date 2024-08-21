import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import { Box, Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';


import Label from 'src/components/label';

// eslint-disable-next-line 
import {PINATA_PATH} from "../../utils/constants.js";
// ----------------------------------------------------------------------

export default function FileCard({ file }) {
  const seasonProps = file.season.toString();
  const [open, setOpen] = useState(false);

  const [addressIssuer, setAddressIssuer] = useState('');
  const [nik, setNik] = useState('');
  const [season, setSeason] = useState('');
  const [cid, setCid] = useState('');
  const [time, setTime] = useState('');

  const fullwidth = true;

  const handleClickOpen = () => {
    setAddressIssuer(file.issuer);
    setNik(file.nik);
    setSeason(file.season.toString());
    setCid(file.ipfs_hash);
    setTime(file.created_time);

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onHandleClick = async (event) => {
    event.preventDefault();
    const img_link = PINATA_PATH.concat(cid);
    window.open(
      img_link,
      '_blank' // <- This is what makes it open in a new window.
    );
  };

  const renderStatus = (
    <Label
      variant="filled"
      color={("SHARED" === 'Not Shared' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {/* {file.status} */}
      SHARED
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={file.ipfs_hash}
      src="/assets/images/rapor/rapor.png"
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {"SHARED" && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={1} sx={{ p: 1 }}>
        {/* <Link color="inherit" underline="hover" variant="subtitle2" noWrap onClick={onHandleClick()} >
          Rapor Semester {file.season}
        </Link> */}
        <Box
          sx={{
            textAlign: "center",
            padding: "2px"
          }}
        >
          <h4>Rapor Semester {seasonProps}</h4>
          <Button sx={{marginBottom:"5px"}} variant="contained" onClick={handleClickOpen} type="submit">View File</Button>
        </Box>
        <Dialog
          open={open}
          maxWidth="md"
          onClose={handleClose}
          fullWidth={fullwidth}
        >
        <DialogTitle>File Detail</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ paddingLeft: '10px', paddingRight: '10px'}}>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            <Box sx={{ marginRight: '20px' }}>  
              <Typography sx={{ fontWeight: 'bold' }}>Issuer </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>NIS </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>Season </Typography>     
              <Typography sx={{ fontWeight: 'bold' }}>Hash File </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>Time Created</Typography>              
            </Box>
            <Box>              
              <Typography>{addressIssuer} </Typography>
              <Typography>{nik}  </Typography>
              <Typography>{season} </Typography>       
              <Typography>{cid} </Typography>
              <Typography>{time} </Typography>                 
            </Box>
          </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ marginRight: '5px', marginBottom: '5px' }} variant="contained" color="inherit" onClick={handleClose}>Close</Button>
          <Button sx={{ marginRight: '5px', marginBottom: '5px' }} variant="contained"  onClick={onHandleClick}>Go To Link</Button>
        </DialogActions>
      </Dialog>
      </Stack>
    </Card>
  );
}

FileCard.propTypes = {
  file: PropTypes.object,
};
