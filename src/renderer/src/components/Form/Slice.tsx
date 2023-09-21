import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IMaskInput } from 'react-imask';
import c from './Slice.module.css';

export default function Slice() {
  return (
    <Box sx={{ display: 'flex' }}>
      <span className={c.half}>
        从:
        <TextField size="small" sx={{ mx: 1.5 }} />
      </span>
      <span className={c.half}>
        到:
        <TextField size="small" sx={{ mx: 1.5 }} />
      </span>
    </Box>
  );
}
