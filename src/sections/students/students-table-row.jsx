import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function StudentsTableRow({
  id,
  number,
  name,
  avatarUrl,
  nik,
  semester,
  files,
  status,
  handleClick
}) {
  const onHandleClick = (property) => (event) => {
    handleClick(event, property);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell align="center">
          {number}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="left" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Link color="inherit" underline="hover" variant="subtitle2" noWrap sx={{ paddingTop: '8px' }} onClick={onHandleClick({
                student_id: id, student_name: name
              })}>
              {name}
            </Link>
          </Stack>
        </TableCell>
        <TableCell >{nik}</TableCell>
      </TableRow>
    </>
  );
}

StudentsTableRow.propTypes = {
  id: PropTypes.any,
  avatarUrl: PropTypes.any,
  semester: PropTypes.any,
  name: PropTypes.any,
  files: PropTypes.any,
  number: PropTypes.any,
  status: PropTypes.string,
  handleClick: PropTypes.func,
};
