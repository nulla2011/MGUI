import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import GithubLogo from '@renderer/assets/github-mark.svg';

export default function Menu({ open, close }: { open: boolean; close: () => void }) {
  return (
    <Drawer open={open} onClose={close}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Chrome 扩展下载" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={GithubLogo} style={{ width: '20px', height: '20px' }} />
            </ListItemIcon>
            <ListItemText primary="Minyami GitHub 地址" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
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
