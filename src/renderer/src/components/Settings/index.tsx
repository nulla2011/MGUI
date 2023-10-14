import Dialogue from '@mui/material/Dialog';
import DialogueTitle from '@mui/material/DialogTitle';
import DialogueContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { settings } from '../../store/params';
import { useRecoilState } from 'recoil';
import Switch from '@mui/material/Switch';
import { FormControlLabel, List, ListItem } from '@mui/material';
import React, { useState } from 'react';
import Input from '@mui/material/Input';

interface props {
  open: boolean;
  close: () => void;
}
export default function Settings({ open, close }: props) {
  const [settingState, setSettingState] = useRecoilState(settings);
  const [enableProxy, setEnableProxy] = useState(false);
  return (
    <Dialogue open={open} onClose={close}>
      <DialogueTitle>设置</DialogueTitle>
      <DialogueContent>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              label="线程数"
              type="number"
              value={settingState.threads}
              onChange={(event) =>
                setSettingState({ ...settingState, threads: parseInt(event.target.value) })
              }
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={
                <Switch
                  checked={enableProxy}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEnableProxy(event.target.checked)
                  }
                />
              }
              label="使用代理"
            />
          </ListItem>
          {enableProxy && (
            <ListItem>
              <Input placeholder="[protocol]HOST" />
            </ListItem>
          )}
        </List>
      </DialogueContent>
    </Dialogue>
  );
}
