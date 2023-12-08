import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';


import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function FileCard({ file }) {
  const renderStatus = (
    <Label
      variant="filled"
      color={(file.status === 'Not Shared' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {file.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={file.name}
      src={file.cover}
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
        {file.status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {file.name}
        </Link>
      </Stack>
    </Card>
  );
}

FileCard.propTypes = {
  file: PropTypes.object,
};
