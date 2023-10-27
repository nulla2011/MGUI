import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { settings } from './store/params';
import CommandInput from './components/CommandInput';
import Header from './components/Header';
import Form from './components/Form';
import DL from './components/DownloadFab';
import Progress from './components/Progress';
declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    pink: true;
  }
}
const defaultTheme = createTheme();

function App() {
  const setSettings = useSetRecoilState(settings);
  useEffect(() => {
    window.api.getSettings().then((v) => setSettings(v));
  }, []);
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ backgroundColor: defaultTheme.palette.grey[100], overflow: 'auto' }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Stack spacing={2}>
            <Paper>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <CommandInput />
              </Container>
            </Paper>
            <Divider />
            <Paper>
              <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <Form />
              </Container>
            </Paper>
            <Divider />
            <Paper>
              <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <Progress />
              </Container>
            </Paper>
          </Stack>
        </Container>
      </Box>
      <DL />
    </>
  );
}

export default App;
