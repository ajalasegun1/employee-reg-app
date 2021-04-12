import SideMenu from "../components/SideMenu";
import "./App.css";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import Header from "../components/Header";


import Employees from "../pages/employees/Employees";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3344b126",
    },
    secondary: {
      main: "#fa3245",
      light: "#fa324526",
    },
  },
});
const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});
function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
