import DashBoard from "@/app/[locale]/page";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const muiTheme = createTheme({});

export function MainPage() {
  return (
    <ThemeProvider theme={muiTheme}>
      <DashBoard />
    </ThemeProvider>
  );
}