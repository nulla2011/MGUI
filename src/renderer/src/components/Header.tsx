import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Settings from './Settings';
import { useState } from 'react';

export default function Header() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
            <Tooltip title="日志">
              <IconButton size="large" color="inherit">
                <ArticleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="设置">
              <IconButton size="large" color="inherit" onClick={() => setSettingsOpen(true)}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
      <Settings open={isSettingsOpen} close={() => setSettingsOpen(false)} />
    </>
  );
}
