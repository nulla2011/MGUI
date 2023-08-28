import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import CommandInput from './components/CommandInput';
import Header from './components/Header';
import Controls from './components/Controls';
import Divider from '@mui/material/Divider';

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
          <CommandInput />
        </Container>
        <Divider />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Controls />
        </Container>
      </Box>
    </>
  );
}

export default App;
