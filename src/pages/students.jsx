import { Helmet } from 'react-helmet-async';

import { StudentsView } from 'src/sections/students/view';

// ----------------------------------------------------------------------

export default function StudentsPage() {
  return (
    <>
      <Helmet>
        <title> Students | Data Siswa </title>
      </Helmet>

      <StudentsView />
    </>
  );
}
