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
    primary: {
      main: '#007FFF',
      dark: '#0072e5'
    },
    pink: {
      main: '#FF3478',
      dark: '#FD4580',
      contrastText: '#FFF'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px'
        }
      }
    }
  }
  // shape: {
  //   borderRadius: 5
  // }
});
