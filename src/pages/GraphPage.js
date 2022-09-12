import React, { useContext } from 'react';
import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography,
  Stack,
} from '@mui/material';

import { Context } from '../context/Context';

const GraphPage = () => {
  const ctx = useContext(Context);
  return (
    <>
      <Box
        sx={{
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
          background: 'rgb(255, 246, 241)',
        }}
      >
        <Container>
          <Box
            display="flex"
            justifycontent="center"
            alignItems="center"
            // minHeight="25vh"
            sx={{
              background: 'rgb(255, 246, 241)',
            }}
          >
            <Typography sx={{ m: 1 }} variant="h5">
              Historical Photos from {`${ctx.name}`} - Fotos Históricas de{' '}
              {`${ctx.name}`}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifycontent: 'center',
              pt: 5,
            }}
          >
            <Stack spacing={2}>
              <Typography>Page: page1</Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default GraphPage;
