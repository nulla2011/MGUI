import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Palette {
    pink: Palette['primary'];
  }

  interface PaletteOptions {
    pink?: PaletteOptions['primary'];
  }
}

export default createTheme({
  typography: {
    fontFamily:
      "'Monospaced Number', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif"
  },
  palette: {
    pink: {
      main: '#FF6798',
      dark: '#FD4580'
    }
  }
  // shape: {
  //   borderRadius: 5
  // }
});
