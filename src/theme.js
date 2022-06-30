import { createTheme } from '@mui/material/styles';
import { red, blue, green, orange, grey } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: red[900],
    },
    default: {
      main: grey[900]
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: orange[900]
    },
    info: {
      main: green[900],
    },
    success: {
      main: blue[200]
    }
  },
});

export default theme;