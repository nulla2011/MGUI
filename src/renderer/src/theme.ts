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
      main: '#1a73e8',
      dark: '#1967d2'
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
    },
    MuiCssBaseline: {
      styleOverrides: `
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #0003;
        border-radius: 10px;
        transition: all .2s ease-in-out;
      }
      ::-webkit-scrollbar-thumb:hover {
        cursor: pointer;
        background-color: #0000004d;
      }
      ::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #f1f1f1;
      }
      `
    }
  }

  // shape: {
  //   borderRadius: 5
  // }
});
