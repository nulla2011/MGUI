import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import CommandInput from './components/CommandInput';
import Header from './components/Header';
import Controls from './components/Controls';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const defaultTheme = createTheme();
function App() {
  return (
    <>
      <Header></Header>
      <Box
        component="main"
        sx={{ backgroundColor: defaultTheme.palette.grey[100], overflow: 'auto' }}
      >
        {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> */}
        <Stack spacing={2}>
          <Paper>
            <CommandInput />
          </Paper>
          <Controls />
        </Stack>
        {/* </Container> */}
      </Box>
    </>
  );
}

export default App;
