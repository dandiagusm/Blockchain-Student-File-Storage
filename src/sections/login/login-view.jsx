import Web3 from 'web3';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

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

export default function LoginView() {
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onChangeEmail = event => {
    setEmail(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();

    // const accounts = await web3.eth.requestAccounts();
    
    try {
      const resp = await contract.methods.getAdmin(email, password).call();
      console.log("LOGIN", resp);
      sessionStorage.setItem("email", resp._email);
      sessionStorage.setItem("name", resp._name);
      sessionStorage.setItem("password", resp._password);
      // console.log("session", sessionStorage.getItem("email"))
      router.push('/');

    } catch (error) {
      console.log(error);
    }
  };

  // const handleClick = () => {
  //   router.push('/');
  // };

  // const handleRegister = () => {
  //   router.push('/register');
  // };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email" value={email} onChange={onChangeEmail}/>

        <TextField
          sx={{ marginTop: 4}}
          name="password"
          label="Password"
          value={password} onChange={onChangePassword}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" href="/register" underline="hover">
          Register?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        sx={{ marginTop: 4}}
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
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
          <Typography sx={{ marginBottom: 4}} variant="h4">Sign in to Data Siswa</Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
