import { useEffect, useRef, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialogue from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Log({ open, close }: { open: boolean; close: () => void }) {
  const [logList, setLogList] = useState<{ log: string; type: number }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.api.logInfo((_event, log) => setLogList((prev) => prev.concat({ log, type: 0 })));
    window.api.logWarn((_event, log) => setLogList((prev) => prev.concat({ log, type: 1 })));
    window.api.logErr((_event, log) => setLogList((prev) => prev.concat({ log, type: 2 })));
  }, []);
  useEffect(() => {
    contentRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [logList]);
  return (
    <Dialogue open={open} onClose={close} maxWidth="lg" fullWidth>
      <DialogTitle>日志</DialogTitle>
      <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={close}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {logList.length === 0 ? (
          <DialogContentText sx={{ mx: 20, my: 10 }}>空</DialogContentText>
        ) : (
          logList.map((e, i) => (
            <DialogContentText
              key={i}
              component="pre"
              sx={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}
              color={e.type === 1 ? '#663c00' : e.type === 2 ? '#5f2120' : 'text.primary'}
              bgcolor={e.type === 1 ? '#fff4e5' : e.type === 2 ? '#fdeded' : 'common.white'}
            >
              {e.log}
            </DialogContentText>
          ))
        )}
        <div ref={contentRef}></div>
      </DialogContent>
    </Dialogue>
  );
}
