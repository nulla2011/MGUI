import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

export default function Controls() {
  return (
    <Box>
      <Paper>
        <TextField variant="outlined" label="URL" fullWidth size="small" />
      </Paper>
    </Box>
  );
}
