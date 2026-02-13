import { ThemeProvider } from "@mui/material";
import Header from "./components/Header/Header";
import BalanceCard from "./components/BalanceCard/BalanceCard";
import Statement from "./components/Statement/Statement";
import "./index.css";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main className="container">
        <BalanceCard />
        <Statement />
      </main>
    </ThemeProvider>
  );
}

export default App;
