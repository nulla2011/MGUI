import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { omit } from 'lodash-es';
import Fab from '@mui/material/Fab';
import DownloadIcon from '@mui/icons-material/Download';
import StopIcon from '@mui/icons-material/Stop';
import { url, frontOptions, headers, settings, path } from '@renderer/store/params';

export default function DL() {
  const urlState = useRecoilValue(url);
  const optionState = useRecoilValue(frontOptions);
  const headerState = useRecoilValue(headers);
  const settingState = useRecoilValue(settings);
  const pathState = useRecoilValue(path);
  const [isDownloading, setDownloading] = useState(false);
  useEffect(() => {
    window.api.downloadFinished(() => setDownloading(false));
  }, []);
  const handleClick = () => {
    if (!isDownloading) {
      setDownloading(true);
      window.api.downloadArchive(
        urlState,
        Object.assign(
          {},
          optionState,
          {
            headers:
              headerState.length === 1 && !headerState[0][0] && !headerState[0][1]
                ? []
                : headerState.map((h) => h[0] + ':' + h[1])
          },
          omit(settingState, ['enableProxy', 'proxy'])
        ),
        pathState
      );
    } else {
      setDownloading(false);
      window.api.stopDownload();
    }
  };
  return (
    <Fab
      color="pink"
      variant="extended"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      onClick={handleClick}
    >
      {isDownloading ? (
        <>
          <StopIcon sx={{ mr: 1 }} />
          停止
        </>
      ) : (
        <>
          <DownloadIcon sx={{ mr: 1 }} />
          下载
        </>
      )}
    </Fab>
  );
}
