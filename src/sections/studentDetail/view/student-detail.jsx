// import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { files } from 'src/_mock/files';

import FileCard from '../file-card';
import FileSort from '../file-sort';

// ----------------------------------------------------------------------

export default function StudentDetailView() {
  // const { itemId, otherParam } = route.params;
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <FileSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {files.map((file) => (
          <Grid key={file.id} xs={12} sm={6} md={3}>
            <FileCard file={file} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
