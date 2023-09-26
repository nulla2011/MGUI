import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { headers } from '@renderer/store/params';
import headerSuggestion from '@renderer/constants/headerSuggestion';

const defaultTheme = createTheme();
export default function Headers() {
  const [headersState, setHeadersState] = useRecoilState(headers);
  if (headersState.length === 0) {
    setHeadersState([[]]);
  }
  console.table(headersState);
  return (
    <Box sx={{ backgroundColor: defaultTheme.palette.grey[100] }}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2, pt: 2, pb: 2 }}>
        <Typography>请求头</Typography>
        {headersState.map((header, index) => {
          return (
            <Box key={index}>
              <Autocomplete
                freeSolo
                options={headerSuggestion}
                size="small"
                renderInput={(params) => <TextField {...params} />}
                inputValue={header[0]}
                onInputChange={(event, newValue) => {
                  setHeadersState(
                    headersState.map((h, i) => {
                      if (i === index) {
                        return [newValue, h[1]];
                      }
                      return h;
                    })
                  );
                }}
              />
            </Box>
          );
        })}
        <Button variant="contained">添加</Button>
      </Container>
    </Box>
  );
}
