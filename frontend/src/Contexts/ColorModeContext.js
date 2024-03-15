import { useState, useMemo, createContext } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

export const ColorModeContext = createContext({
  toggleMode: () => { },
  mode: "dark"
})

export const ColorContextProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem('AdminMode') || "dark"
  )
  const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const toggleMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem('AdminMode', newMode)
  };

  const colorMode = useMemo(
    () => ({
      toggleMode,
      mode,
    }),
    [mode]
  );

  const MuiTheme = createTheme({
    palette: {
      mode: mode === 'system' ? systemMode : mode,
      primary: {
        main: orange[500],
      },
      primary1: {
        main: orange[300],
      },
    },
    typography: {
      htmlFontSize: 10, // Set the base font size to 10px equivalent to 1rem
    },
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={MuiTheme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}