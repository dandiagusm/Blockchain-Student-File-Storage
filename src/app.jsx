/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import connectToMetamask from './Metamask';
import { useEffect, useState } from 'react';

// import WebService from './WebService'
// import {ipfsFile} from './WebService'
// import WebServiceErrorStatusesEnum from './WebServiceErrorStatusesEnum'

// ----------------------------------------------------------------------

// export default function App() {
//   useScrollToTop();

  // return (
  //   <ThemeProvider>
  //     <Router />
  //   </ThemeProvider>
  // );
// }

function App() {
  const [account, setAccount] = useState('');

  useEffect(() => {

    // Get the user's account
    async function getAccount() {
      console.log("Connecting to metamask");
      await connectToMetamask();
      const accounts = await window.web3.eth.getAccounts();
      setAccount(accounts[0]);
      console.log("Account is set ", account);
    }
    getAccount();
  }, []);

  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App