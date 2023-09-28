import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InputIcon from '@mui/icons-material/Input';
import { createTheme } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { headers } from '@renderer/store/params';
import headerSuggestion from '@renderer/constants/headerSuggestion';

const defaultTheme = createTheme();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changeArray = (array: any[], newValue: any, index: number) => {
  return array.map((e, i) => {
    if (i === index) {
      return newValue;
    }
    return e;
  });
};
export default function Headers() {
  const [headersState, setHeadersState] = useRecoilState(headers);
  if (headersState.length === 0) {
    setHeadersState([['', '']]);
  }
  console.table(headersState);
  return (
    <>
      <Typography>请求头：</Typography>
      <Box sx={{ backgroundColor: defaultTheme.palette.grey[100] }}>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2, pt: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 0.5 }}>
            <Typography sx={{ width: 180 }}>Name</Typography>
            <Typography>Value</Typography>
          </Box>
          {headersState.map((header, index) => {
            return (
              <Box
                key={index}
                sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 1.5 }}
              >
                <Autocomplete
                  freeSolo
                  options={headerSuggestion}
                  size="small"
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: 180, backgroundColor: '#fff' }}
                  inputValue={header[0]}
                  value={header[0]}
                  onInputChange={(_event, newValue) => {
                    setHeadersState(
                      changeArray(headersState, [newValue, headersState[index][1]], index)
                    );
                  }}
                />
                <TextField
                  multiline
                  maxRows={3}
                  size="small"
                  sx={{ backgroundColor: '#fff', flex: 1 }}
                  value={header[1]}
                  onChange={(event) =>
                    setHeadersState(
                      changeArray(headersState, [headersState[index][0], event.target.value], index)
                    )
                  }
                />
                <IconButton
                  onClick={() => {
                    setHeadersState(headersState.toSpliced(index, 1));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            );
          })}
          <Button
            variant="contained"
            sx={{ mr: 3 }}
            onClick={() => setHeadersState(headersState.concat([['', '']]))}
          >
            <AddIcon sx={{ mr: 1 }} />
            添加
          </Button>
          <Button sx={{ textTransform: 'none' }}>
            <InputIcon sx={{ mr: 1 }} />从 cURL 命令导入
          </Button>
        </Container>
      </Box>
    </>
  );
}
