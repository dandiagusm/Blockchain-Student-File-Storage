import { Helmet } from 'react-helmet-async';

import { StudentDetailView } from 'src/sections/studentDetail/view';

// ----------------------------------------------------------------------

export default function StudentDetailPage(props) {
  return (
    <>
      <Helmet>
        <title> Student Detail | Data Siswa </title>
      </Helmet>

      <StudentDetailView props = {props}/>
    </>
  );
}
