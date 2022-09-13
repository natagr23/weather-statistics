import React, { useContext } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';

import { Context } from '../context/Context';
import InputGraph from '../components/InputGraph';

const GraphPage = () => {
  const ctx = useContext(Context);
  return (
    <>
      <Box
        sx={{
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
          background: '#ff00ff00',
        }}
      >
        <Container>
          <Box
            display="flex"
            justifycontent="center"
            alignItems="center"
            // minHeight="25vh"
          >
            <Typography sx={{ m: 1 }} variant="h5">
              Historical Photos from {`${ctx.nameParameter}`} - Fotos Históricas
              de {`${ctx.nameParameter}`}
            </Typography>
          </Box>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifycontent: 'center',
              pt: 5,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifycontent: 'center',
                pt: 5,
              }}
            >
              {' '}
              <Typography>Page: page1</Typography>
            </Box>
            <InputGraph />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default GraphPage;
