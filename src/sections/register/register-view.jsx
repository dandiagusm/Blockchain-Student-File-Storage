import Web3 from 'web3';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';

// import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

// import Iconify from 'src/components/iconify';

import configuration from '../../../build/contracts/Administrator.json';

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

export default function RegisterView() {
  const theme = useTheme();

  // const router = useRouter();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onChangeName = event => {
    setName(event.target.value);
  };

  const onChangeEmail = event => {
    setEmail(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  // const handleClick = () => {
  //   router.push('/dashboard');
  // };

  const onRegisterHandle = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.requestAccounts();
    
    try {
      const resp = await contract.methods.generateAdmin(email,name, password).send({ from: accounts[0] });
      // setAddressIssuer(files_temp.issuer);
      // setNik(files_temp.nik);
      // setSeason(files_temp.season);
      // setTime(files_temp.created_time);
      console.log("REGISTERED", resp);

    } catch (error) {
      console.log(error);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Name" value={name} onChange={onChangeName}/>
        <TextField name="email" label="Email" value={email} onChange={onChangeEmail}/>
        <TextField name="password" label="Password" value={password} onChange={onChangePassword}/>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link href="/login" variant="subtitle2" underline="hover">
          Login
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        sx={{ marginTop: 4}}
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={onRegisterHandle}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography sx={{ marginBottom: 4}} variant="h4">Register to Data Siswa</Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
