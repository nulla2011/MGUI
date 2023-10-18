import { createTheme } from '@mui/material/styles';
import CommandInput from './components/CommandInput';
import Header from './components/Header';
import Form from './components/Form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import DownloadIcon from '@mui/icons-material/Download';
import { useRecoilValue } from 'recoil';
import { frontOptions } from './store/params';

const defaultTheme = createTheme();
function DL() {
  const optionState = useRecoilValue(frontOptions);
  return (
    <Fab
      variant="extended"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      onClick={() => console.log(optionState)}
    >
      <DownloadIcon sx={{ mr: 1 }} />
      下载
    </Fab>
  );
}
function App() {
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
          </Stack>
        </Container>
      </Box>
      <DL />
    </>
  );
}

export default App;
