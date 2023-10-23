import React, { useEffect, useState } from 'react';
import Dialogue from '@mui/material/Dialog';
import DialogueTitle from '@mui/material/DialogTitle';
import DialogueContent from '@mui/material/DialogContent';
import DialogueActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { settings } from '@renderer/store/params';
import { useRecoilState } from 'recoil';
import Switch from '@mui/material/Switch';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  List,
  ListItem
} from '@mui/material';
import FolderOpen from '@mui/icons-material/FolderOpen';
import Input from '@mui/material/Input';

interface props {
  open: boolean;
  close: () => void;
}
export default function Settings({ open, close }: props) {
  const [settingRecoilState, setSettingRecoilState] = useRecoilState(settings);
  const [settingState, setSettingState] = useState(settingRecoilState);
  useEffect(() => setSettingState(settingRecoilState), [settingRecoilState]);
  const handleApply = () => {
    setSettingRecoilState(settingState);
    close();
  };
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
                  checked={settingState.enableProxy}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSettingState({ ...settingState, enableProxy: event.target.checked })
                  }
                />
              }
              label="使用代理"
            />
          </ListItem>
          {settingState.enableProxy && (
            <ListItem>
              <Input placeholder="protocol://<host>:<port>" />
            </ListItem>
          )}
          <ListItem>
            <TextField
              variant="outlined"
              label="默认路径"
              value={settingState.defaultDownloadPath}
              onChange={(event) =>
                setSettingState({ ...settingState, defaultDownloadPath: event.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={async () => {
                        const p = await window.api.formSelectPath();
                        if (p.filePaths.length > 0) {
                          setSettingState({ ...settingState, defaultDownloadPath: p.filePaths[0] });
                        }
                      }}
                    >
                      <FolderOpen />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </ListItem>
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
            <TextField
              variant="outlined"
              label="临时文件夹路径"
              value={settingState.tempDir || ''}
              onChange={(event) =>
                setSettingState({ ...settingState, tempDir: event.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={async () => {
                        const p = await window.api.formSelectPath();
                        if (p.filePaths.length > 0) {
                          setSettingState({ ...settingState, tempDir: p.filePaths[0] });
                        }
                      }}
                    >
                      <FolderOpen />
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settingState.keepEncryptedChunks}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setSettingState({
                        ...settingState,
                        keepEncryptedChunks: event.target.checked
                      })
                    }
                  />
                }
                label="保留解密后的分块"
              />
            </FormGroup>
          </ListItem>
        </List>
      </DialogueContent>
      <DialogueActions>
        <Button autoFocus onClick={handleApply}>
          应用并保存
        </Button>
      </DialogueActions>
    </Dialogue>
  );
}
