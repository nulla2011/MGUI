import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import GithubLogo from '@renderer/assets/github-mark.svg';

const openExternal = (url: string) => {
  window.api.openExternal(url);
};
export default function Menu({ open, close }: { open: boolean; close: () => void }) {
  return (
    <Drawer open={open} onClose={close}>
      <List>
        <ListSubheader>Minyami GUI</ListSubheader>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() =>
              openExternal(
                'https://chromewebstore.google.com/detail/minyami/cgejkofhdaffiifhcohjdbbheldkiaed'
              )
            }
          >
            <ListItemText primary="Chrome 扩展下载" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => openExternal('https://github.com/Last-Order/Minyami')}>
            <ListItemIcon>
              <img src={GithubLogo} style={{ width: '20px', height: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Minyami GitHub 地址" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => openExternal('https://github.com/nulla2011/mg')}>
            <ListItemIcon>
              <img src={GithubLogo} style={{ width: '20px', height: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="本项目 GitHub 地址" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
