import Dialogue from '@mui/material/Dialog';
import DialogueTitle from '@mui/material/DialogTitle';
import DialogueContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { isProxy, settings } from '../../store/params';
import { useRecoilState } from 'recoil';
import Switch from '@mui/material/Switch';
import { Checkbox, FormControlLabel, FormGroup, List, ListItem } from '@mui/material';
import React from 'react';
import Input from '@mui/material/Input';

interface props {
  open: boolean;
  close: () => void;
}
export default function Settings({ open, close }: props) {
  const [settingState, setSettingState] = useRecoilState(settings);
  const [enableProxy, setEnableProxy] = useRecoilState(isProxy);
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
              <Input placeholder="protocol://<host>:<port>" />
            </ListItem>
          )}
          <ListItem>
            <TextField
              variant="outlined"
              label="重试次数"
              type="number"
              value={settingState.retries}
              onChange={(event) =>
                setSettingState({ ...settingState, retries: parseInt(event.target.value) })
              }
            />
          </ListItem>
          <ListItem>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settingState.noMerge}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setSettingState({ ...settingState, noMerge: event.target.checked })
                    }
                  />
                }
                label="不合并分块"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settingState.keep}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setSettingState({ ...settingState, keep: event.target.checked })
                    }
                  />
                }
                label="合并后保留分块"
              />
            </FormGroup>
          </ListItem>
        </List>
      </DialogueContent>
    </Dialogue>
  );
}
