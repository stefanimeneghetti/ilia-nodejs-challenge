import { ThemeProvider } from "@mui/material";
import Header from "./components/Header/Header";
import BalanceCard from "./components/BalanceCard/BalanceCard";
import Statement from "./components/Statement/Statement";
import "./index.css";
import { theme } from "./theme";
import { useState } from "react";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTransactionCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  return (
    <ThemeProvider theme={theme}>
      <Header onTransactionCreated={handleTransactionCreated} />
      <main className="container">
        <BalanceCard refreshTrigger={refreshTrigger} />
        <Statement refreshTrigger={refreshTrigger} />
      </main>
    </ThemeProvider>
  );
}

export default App;
