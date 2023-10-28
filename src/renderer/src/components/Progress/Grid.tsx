import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import c from './grid.module.css';

export default function Grid({ chunkIndex, total = -1 }: { chunkIndex: number; total?: number }) {
  const [totalState, setTotal] = useState(total);
  useEffect(() => {
    if (total > 0) {
      setTotal(total);
    }
  }, [total]);
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {Array(totalState)
        .fill(0)
        .map((_, i) => (
          <div className={`${c.block} ${c.uncomplete}`} key={i}></div>
        ))}
    </Box>
  );
}
