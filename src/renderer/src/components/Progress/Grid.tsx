import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import css from './grid.module.css';

export default function Grid({ chunkIndex, total = -1 }: { chunkIndex: number; total?: number }) {
  const [totalState, setTotal] = useState(total);
  const refList: HTMLDivElement[] = [];
  useEffect(() => {
    if (total > 0) {
      refList.forEach((el) => el.classList.remove(css.complete));
      setTotal(total);
    }
  }, [total]);
  useEffect(() => {
    refList[chunkIndex].classList.add(css.complete);
  }, [chunkIndex]);
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} key={totalState}>
      {Array(totalState)
        .fill(0)
        .map((_, i) => (
          <div
            className={css.block}
            key={i}
            ref={(ref) => {
              refList[i] = ref!;
            }}
          ></div>
        ))}
    </Box>
  );
}
