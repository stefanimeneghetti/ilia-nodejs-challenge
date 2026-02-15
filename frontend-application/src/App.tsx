import { ThemeProvider } from "@mui/material";
import Header from "./components/Header/Header";
import BalanceCard from "./components/BalanceCard/BalanceCard";
import Statement from "./components/Statement/Statement";
import "./index.css";
import { theme } from "./theme";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { t } = useTranslation();

  const handleTransactionCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  return (
    <>
      <title>{t("headerTitle")}</title>
      <ThemeProvider theme={theme}>
        <Header />
        <main className="container">
          <BalanceCard refreshTrigger={refreshTrigger} />
          <Statement onTransactionCreated={handleTransactionCreated} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
