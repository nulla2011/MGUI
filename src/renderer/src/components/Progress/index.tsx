import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

export default function Progress() {
  const [chunkInfo, setChunkInfo] = useState<IchunkInfo>();
  useEffect(() => {
    window.api.getChunkInfo((_event, i) => setChunkInfo(i));
  }, []);
  return (
    <Box>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={(chunkInfo!.finishedChunksCount / chunkInfo!.totalChunksCount) * 100}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
            (chunkInfo!.finishedChunksCount / chunkInfo!.totalChunksCount) * 100
          )}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
