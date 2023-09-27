import { useState, memo } from 'react';
import { useRecoilState } from 'recoil';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { frontOptions, url } from '@renderer/store/params';
import Slice from './Slice';
import Headers from './Headers';

const UrlInput = memo(function UrlInput() {
  const [urlState, setUrlState] = useRecoilState(url);
  return (
    <TextField
      variant="outlined"
      label="M3U8 地址"
      fullWidth
      multiline
      maxRows={3}
      size="small"
      margin="normal"
      value={urlState}
      onChange={(event) => setUrlState(event.target.value)}
    />
  );
});
function Options({ isLive }: { isLive: boolean }) {
  const [optionState, setOptionState] = useRecoilState(frontOptions);
  const [sliceSwitch, setSliceSwitch] = useState(false);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <TextField
          variant="outlined"
          label="存储路径"
          fullWidth
          multiline
          maxRows={3}
          size="small"
          margin="normal"
          sx={{ flex: '1' }}
          value={optionState.output || ''}
          onChange={(event) => setOptionState({ ...optionState, output: event.target.value })}
        />
        <Button
          variant="contained"
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
        maxRows={3}
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
        maxRows={3}
        size="small"
        margin="normal"
        value={optionState.key || ''}
        onChange={(event) => {
          setOptionState({ ...optionState, key: event.target.value });
        }}
      />
      <Box sx={{ display: 'flex', mt: 2, mb: 1 }}>
        <FormGroup row sx={{ height: 40, mr: 4 }}>
          <FormControlLabel
            sx={{ userSelect: 'none' }}
            disabled={isLive}
            control={
              <Switch
                checked={sliceSwitch}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSliceSwitch(event.target.checked)
                }
              />
            }
            label="裁剪"
          />
        </FormGroup>
        {sliceSwitch && !isLive && (
          <Slice onUpdate={(value: string) => setOptionState({ ...optionState, slice: value })} />
        )}
      </Box>
    </>
  );
}

export default function Controls() {
  // const defaultTheme = createTheme();
  // const buttonTheme = createTheme({
  //   palette: {
  //     primary: {
  //       main: defaultTheme.palette.primary.light
  //     }
  //   }
  // });
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
      <UrlInput />
      <Options isLive={liveState} />
      <Divider />
      <Headers />
    </Box>
  );
}
