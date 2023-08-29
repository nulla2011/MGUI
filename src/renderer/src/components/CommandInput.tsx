import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function CommandInput() {
  return (
    <Box>
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <InputBase error sx={{ ml: 1, flex: 1 }} placeholder="在此粘贴命令" fullWidth />
        <Button variant="text">下一步</Button>
      </Paper>
    </Box>
  );
}
