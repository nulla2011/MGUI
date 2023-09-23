import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import parser from 'yargs-parser';
import { pick } from 'lodash-es';
import { frontOptions, url } from '@renderer/store/params';

export default function CommandInput() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const setUrl = useSetRecoilState(url);
  const setOptions = useSetRecoilState(frontOptions);
  const handleClick = () => {
    const params = parser(inputValue);
    if ((params['_'][0] as string).toLowerCase() !== 'minyami' || (!params.d && !params.download)) {
      setError(true);
    } else {
      setUrl(params.download || params.d);
      const options = pick(params, ['output', 'o', 'cookies', 'key', 'headers', 'H', 'slice']);
      if (!options.output && options.o) {
        options.output = options.o;
        delete options.o;
      }
      if (options.headers && !Array.isArray(options.headers)) {
        options.headers = [options.headers];
      }
      if (options.H) {
        if (!Array.isArray(options.H)) {
          options.H = [options.H];
        }
        options.headers = options.headers.concat(options.H);
        delete options.H;
      }
      const list: unknown[] = [];
      for (const header of options.headers) {
        header.split('\\n').forEach((h) => {
          list.push(h);
        });
      }
      options.headers = list;
      setOptions(options as FrontOptions);
    }
  };
  return (
    <Box>
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="在此粘贴命令"
          fullWidth
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button variant="text" onClick={handleClick}>
          编辑
        </Button>
        {/* <Button variant="text">下载</Button> */}
        <Snackbar
          open={error}
          message="不是有效的命令"
          autoHideDuration={4000}
          onClose={() => setError(false)}
        ></Snackbar>
      </Paper>
    </Box>
  );
}
