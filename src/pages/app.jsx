import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage(props) {
  return (
    <>
      <Helmet>
        <title> Dashboard | Data Siswa </title>
      </Helmet>

      <AppView props = {props}/>
    </>
  );
}
