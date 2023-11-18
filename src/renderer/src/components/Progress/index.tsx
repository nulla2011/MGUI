import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Grid from './Grid';
import { getChunkIndex } from '@renderer/utils';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { chunkStatus, isLoadingM3U8 } from '@renderer/store/states';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme } from '@mui/material';

export default function Progress() {
  const [chunkInfo, setChunkInfo] = useState<IchunkInfo>();
  const [loadingM3U8, setLoadingM3U8] = useRecoilState(isLoadingM3U8);
  // const [total, setTotal] = useState(0);
  const setChunkStatus = useSetRecoilState(chunkStatus);
  const theme = createTheme();
  useEffect(() => {
    window.api.getChunkInfo((_event, info) => {
      setChunkInfo((_prev) => info);
      setChunkStatus((prev) => prev.map((e, i) => (i === getChunkIndex(info.taskname) ? 1 : e)));
    });
    window.api.m3u8Finished((_event, _n) => {
      setLoadingM3U8(false);
    });
  }, []);
  useEffect(() => {
    if (chunkInfo?.finishedChunksCount === 1) {
      const a = Array(chunkInfo.totalChunksCount).fill(0);
      a[getChunkIndex(chunkInfo.taskname)] = 1;
      setChunkStatus(a);
    }
  }, [chunkInfo]);
  return (
    <Box>
      {loadingM3U8 ? (
        <Box display="flex" sx={{ flexDirection: 'column', alignItems: 'center', pt: 2 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }} color="text.secondary">
            正在加载 M3U8。。。
          </Typography>
        </Box>
      ) : (
        <>
          <Box display="flex" sx={{ mb: 2 }}>
            <Box width="8em">
              <Typography>已下载分块：</Typography>
              <Typography>传输速度：</Typography>
              <Typography>剩余时间：</Typography>
            </Box>
            <Box>
              {chunkInfo && (
                <>
                  <Typography>
                    {chunkInfo.finishedChunksCount}/{chunkInfo.totalChunksCount} (
                    {Math.round((chunkInfo.finishedChunksCount / chunkInfo.totalChunksCount) * 100)}
                    %)
                  </Typography>
                  <Typography>
                    {chunkInfo.chunkSpeed} 块/秒 ({chunkInfo.ratioSpeed}x)
                  </Typography>
                  <Typography>{chunkInfo.eta}</Typography>
                </>
              )}
            </Box>
          </Box>
          <Box sx={{ width: '100%', my: 2 }}>
            <LinearProgress
              variant="determinate"
              sx={{
                height: 7,
                borderRadius: 4,
                backgroundColor: theme.palette.grey[300],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4
                }
              }}
              value={
                chunkInfo ? (chunkInfo.finishedChunksCount / chunkInfo.totalChunksCount) * 100 : 0
              }
            />
          </Box>
          <Box sx={{ mt: 4, mb: 6, p: 1, border: 'thin solid #aaa', borderRadius: 1 }}>
            <Grid />
          </Box>
        </>
      )}
    </Box>
  );
}
