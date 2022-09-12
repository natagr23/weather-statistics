import { Box, Container, Grid } from '@mui/material';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import EmailIcon from '@mui/icons-material/Email';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Link,
} from '@mui/material';

const Index = () => (
  <>
    <Box
      // position="fixed"
      sx={{
        width: { sm: `calc(100% - ${30}px)` },
        ml: { sm: `${30}px` },
        background: '#ff00ff00',
      }}
    >
      <Container maxWidth="md">
        <Grid item spacing={2}>
          <Grid display="flex" justifyContent="center" alignItems="center">
            <Box>
              <Card sx={{ maxwidth: 300 }}>
                <CardMedia />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    I am an engineer passionate about web programming and
                    constantly learning new technologies and tools. I have
                    worked with React.js, CSS, Carbon Design, MUI,Bootstrap,
                    Tailwind, Git/GitHub and Firebase. During my master's
                    studies I used meteorological data to evaluate a
                    hydrological model using R.
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="small">Share</Button>
                <Button size="small">Learn More</Button> */}
                </CardActions>
                <Grid
                  container
                  className="grid"
                  sx={{
                    // flexGrow: 1,
                    background: '#001a5b',
                  }}
                >
                  <Grid item xs={50}>
                    <Grid container justifyContent="center">
                      <Link href={'https://github.com/natagr23'}>
                        <GitHubIcon />
                      </Link>
                      <Link
                        href={'https://www.linkedin.com/in/nataliagarciarosas/'}
                      >
                        <LinkedInIcon />
                      </Link>
                      <Link
                        href={
                          'mailto:nata_garcia23@hotmail.com?body=My custom mail body'
                        }
                      >
                        <EmailIcon />
                      </Link>
                      <Link href={'https://garcia-dev.es/'}>
                        <WebIcon />
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Index;
