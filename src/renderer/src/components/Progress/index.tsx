import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Grid from './Grid';
import { getChunkIndex } from '@renderer/utils';
import { useRecoilState } from 'recoil';
import { isLoadingM3U8 } from '@renderer/store/states';
import CircularProgress from '@mui/material/CircularProgress';

export default function Progress() {
  const [chunkInfo, setChunkInfo] = useState<IchunkInfo>();
  const [loadingM3U8, setLoadingM3U8] = useRecoilState(isLoadingM3U8);
  useEffect(() => {
    window.api.getChunkInfo((_event, i) => setChunkInfo(i));
  }, []);
  if (chunkInfo?.finishedChunksCount === 1) {
    setLoadingM3U8(false);
  }
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
        chunkInfo && (
          // <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          //   <CircularProgress
          //     variant="determinate"
          //     size={50}
          //     value={(chunkInfo!.finishedChunksCount / chunkInfo!.totalChunksCount) * 100}
          //   />
          //   <Box
          //     sx={{
          //       top: 0,
          //       left: 0,
          //       bottom: 0,
          //       right: 0,
          //       position: 'absolute',
          //       display: 'flex',
          //       alignItems: 'center',
          //       justifyContent: 'center'
          //     }}
          //   >
          //     <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
          //       (chunkInfo!.finishedChunksCount / chunkInfo!.totalChunksCount) * 100
          //     )}%`}</Typography>
          //   </Box>
          // </Box>
          <>
            <Box display="flex" sx={{ mb: 2 }}>
              <Box width="8em">
                <Typography>已下载分块：</Typography>
                <Typography>传输速度：</Typography>
                <Typography>剩余时间：</Typography>
              </Box>
              <Box>
                <Typography>
                  {chunkInfo!.finishedChunksCount}/{chunkInfo!.totalChunksCount} (
                  {Math.round((chunkInfo!.finishedChunksCount / chunkInfo!.totalChunksCount) * 100)}
                  %)
                </Typography>
                <Typography>
                  {chunkInfo!.chunkSpeed} 块/秒 ({chunkInfo!.ratioSpeed}x)
                </Typography>
                <Typography>{chunkInfo!.eta}</Typography>
              </Box>
            </Box>
            <Box sx={{ width: '100%', my: 2 }}>
              <LinearProgress
                variant="determinate"
                sx={{
                  height: 7,
                  borderRadius: 4,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4
                  }
                }}
                value={(chunkInfo!.finishedChunksCount / chunkInfo!.totalChunksCount) * 100}
              />
            </Box>
            <Box sx={{ mt: 4, mb: 6, p: 1, border: 'thin solid #aaa', borderRadius: 1 }}>
              <Grid
                chunkIndex={getChunkIndex(chunkInfo!.taskname)}
                total={chunkInfo!.finishedChunksCount === 1 ? chunkInfo!.totalChunksCount : -1}
              />
            </Box>
          </>
        )
      )}
    </Box>
  );
}
