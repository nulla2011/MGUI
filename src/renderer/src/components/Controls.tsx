import { useState } from 'react';
import { useRecoilState } from 'recoil';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { frontOptions, url } from '@renderer/store/params';

export default function Controls() {
  // const defaultTheme = createTheme();
  // const buttonTheme = createTheme({
  //   palette: {
  //     primary: {
  //       main: defaultTheme.palette.primary.light
  //     }
  //   }
  // });
  const [urlState, setUrlState] = useRecoilState(url);
  const [optionState, setOptionState] = useRecoilState(frontOptions);
  const [liveState, setLiveState] = useState(false);
  return (
    <Box>
      <Typography component="h2" gutterBottom>
        或者直接填写：
      </Typography>
      <FormGroup row>
        <FormControlLabel
          sx={{ userSelect: 'none' }}
          control={
            <Switch
              checked={liveState}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setLiveState(event.target.checked)
              }
            />
          }
          label="直播模式"
        />
      </FormGroup>
      <TextField
        variant="outlined"
        label="URL"
        fullWidth
        multiline
        size="small"
        margin="normal"
        value={urlState}
        onChange={(event) => setUrlState(event.target.value)}
      />
      <div style={{ display: 'flex' }}>
        <TextField
          variant="outlined"
          label="Name"
          fullWidth
          multiline
          size="small"
          margin="normal"
          sx={{ flex: '1' }}
          value={optionState.output || ''}
          onChange={(event) => setOptionState({ ...optionState, output: event.target.value })}
        />
        <Button
          variant="outlined"
          sx={{
            mt: '16px',
            mb: '8px',
            height: '40px'
          }}
        >
          选择目录
        </Button>
      </div>
      <TextField
        variant="outlined"
        label="Cookies"
        fullWidth
        multiline
        size="small"
        margin="normal"
        value={optionState.cookies || ''}
        onChange={(event) => setOptionState({ ...optionState, cookies: event.target.value })}
      />
      <TextField
        variant="outlined"
        label="KEY"
        fullWidth
        multiline
        size="small"
        margin="normal"
        value={optionState.key || ''}
        onChange={(event) => setOptionState({ ...optionState, key: event.target.value })}
      />
      {/* <Button variant="contained" sx={{ mt: '16px', mb: '8px' }}>
        开始下载
      </Button> */}
    </Box>
  );
}
