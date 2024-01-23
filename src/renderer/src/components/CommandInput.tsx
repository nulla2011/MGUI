import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import minimist from 'minimist';
import stringArgv from 'string-argv';
import { pick } from 'lodash-es';
import { frontOptions, headers, url } from '@renderer/store/params';
import { isEditing } from '@renderer/store/states';

export default forwardRef(function CommandInput(_props, ref) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const setUrl = useSetRecoilState(url);
  const setOptions = useSetRecoilState(frontOptions);
  const setHeaders = useSetRecoilState(headers);
  const setEditing = useSetRecoilState(isEditing);
  useImperativeHandle(ref, () => {
    return { handleClick };
  });
  const handleClick = () => {
    setEditing(true);
    const params = minimist(stringArgv(inputValue));
    if ((params['_'][0] as string).toLowerCase() !== 'minyami' || (!params.d && !params.download)) {
      setError(true);
    } else {
      setUrl(params.download || params.d);
      const options = pick(params, ['output', 'o', 'cookies', 'key', 'slice']);
      if (!options.output && options.o) {
        options.output = options.o;
        delete options.o;
      }
      let headerArray: string[] = [];
      if (params.headers) {
        headerArray = headerArray.concat(params.headers);
      }
      if (params.H) {
        headerArray = headerArray.concat(params.H);
      }
      setHeaders(
        headerArray.reduce((p: string[][], c) => {
          c.split('\\n').forEach((h) => {
            p.push(h.split(':').map((t) => t.trim()));
          });
          return p;
        }, [])
      );
      setOptions(options as IFrontOptions);
    }
  };
  return (
    <Box>
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="在此粘贴从扩展复制来的命令"
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
});
