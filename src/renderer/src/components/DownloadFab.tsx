import { useRecoilValue } from 'recoil';
import { omit, fromPairs } from 'lodash-es';
import Fab from '@mui/material/Fab';
import DownloadIcon from '@mui/icons-material/Download';
import { url, frontOptions, headers, settings, path } from '@renderer/store/params';

export default function DL() {
  const urlState = useRecoilValue(url);
  const optionState = useRecoilValue(frontOptions);
  const headerState = useRecoilValue(headers);
  const settingState = useRecoilValue(settings);
  const pathState = useRecoilValue(path);
  const handleClick = () => {
    window.api.downloadArchive(
      urlState,
      Object.assign(
        { ...optionState, output: pathState + '/' + optionState.output },
        {
          headers:
            headerState.length === 1 && !headerState[0][0] && !headerState[0][1]
              ? {}
              : fromPairs(headerState)
        },
        omit(settingState, ['enableProxy']),
        { proxy: settingState.enableProxy ? settingState.proxy : '' }
      )
    );
  };
  return (
    <Fab
      color="pink"
      variant="extended"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      onClick={handleClick}
    >
      <DownloadIcon sx={{ mr: 1 }} />
      下载
    </Fab>
  );
}
