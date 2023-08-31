import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import CommandInput from './components/CommandInput';
import Header from './components/Header';
import Controls from './components/Controls';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { RecoilRoot } from 'recoil';

const defaultTheme = createTheme();
function App() {
  return (
    <>
      <Header></Header>
      <Box
        component="main"
        sx={{ backgroundColor: defaultTheme.palette.grey[100], overflow: 'auto' }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <RecoilRoot>
            <Stack spacing={2}>
              <Paper>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <CommandInput />
                </Container>
              </Paper>
              <Divider />
              <Paper>
                <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                  <Controls />
                </Container>
              </Paper>
            </Stack>
          </RecoilRoot>
        </Container>
      </Box>
    </>
  );
}

export default App;
