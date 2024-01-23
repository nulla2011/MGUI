import { useEffect, useRef, useState } from 'react';
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
  const [showProgress, setShowProgress] = useState(false);
  const progressRef = useRef<HTMLHRElement>(null);
  const inputRef = useRef<{ handleClick: () => void }>(null);
  useEffect(() => {
    window.api.getSettings().then((v) => setSettings(v));
  }, []);
  const parseParams = () => {
    inputRef.current!.handleClick();
  };
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
                <CommandInput ref={inputRef} />
              </Container>
            </Paper>
            <Divider />
            <Paper>
              <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <Form />
              </Container>
            </Paper>
            <Divider ref={progressRef} />
            {showProgress && (
              <Box sx={{ minHeight: '100vh' }}>
                <Paper sx={{ py: '1px' }}>
                  <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                    <Progress />
                  </Container>
                </Paper>
              </Box>
            )}
          </Stack>
        </Container>
      </Box>
      <DL
        show={() => {
          setShowProgress(true);
          setTimeout(
            () => progressRef.current!.scrollIntoView({ block: 'start', behavior: 'smooth' }),
            0
          );
        }}
        parse={parseParams}
      />
    </>
  );
}

export default App;
