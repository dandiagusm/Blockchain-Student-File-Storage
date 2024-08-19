import Web3 from 'web3';
// import { ethers } from "ethers";
import { useState, useEffect } from 'react';

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import ThemeProvider from 'src/theme';

// import configurationAdmin from '../build/contracts/Administrator.json';
import configurationStudent from '../build/contracts/StudentDetail.json';
// import connectToMetamask from './Metamask';


// import WebService from './WebService'
// import {ipfsFile} from './WebService'
// import WebServiceErrorStatusesEnum from './WebServiceErrorStatusesEnum'

// ----------------------------------------------------------------------

const CONTRACT_ADDRESS_STUDENT = configurationStudent.networks['5777'].address;
const CONTRACT_ABI_STUDENT = configurationStudent.abi;

const web3 = new Web3(
  // 'http://127.0.0.1:9545'
  window.ethereum
);

const contract = new web3.eth.Contract(
  CONTRACT_ABI_STUDENT,
  CONTRACT_ADDRESS_STUDENT
);

function App() {
  const [account_eth , setAccount] = useState('');
  const [contract_std , setContractStd] = useState('');
  const [students , setStudents] = useState('');
  const [totalStudents, setTotalStudents] = useState('');
  // const [provider_eth, setProvider] = useState(''); 

  // setContract(contract);
  const getAccount = async () => {
    console.log("Connecting to metamask");
    // const accounts = await web3.eth.requestAccounts();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setContractStd(contract);
    setAccount(accounts[0]);
    console.log("Account is set ", account);
  }

  const getAllStudent = async () => {
    const resp = await contract.methods.getAllStudents().call();
    // console.log("STUDENT : ", resp);
    return resp;
  }

  const getNumberOfStudent = async () => {
    const resp = await contract.methods.getNumberOfStudent().call();
    // console.log("STUDENT : ", resp);
    return resp;
  }

  useEffect(()=>{
    if(window.ethereum){
      getAccount();
      setStudents(getAllStudent());
      setTotalStudents(getNumberOfStudent());
    } else{
        console.log("MetaMask is not installed")
    }
  
  },[] );

  // console.log('Account : ', account_eth);
  // console.log('Contract : ', contract_eth);
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router account = {account_eth} contract = {contract_std} students = {students} totalStudents = {totalStudents} />
    </ThemeProvider>
  );
}

export default App