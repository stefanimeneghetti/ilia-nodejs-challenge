import { useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  StyledPaper,
  StyledSubtitle,
  StyledErrorSubtitle,
  StyledErrorMessage,
  StyledBalanceValue,
} from "./BalanceCard.styles";

interface BalanceCardProps {
  refreshTrigger?: number;
}

function BalanceCard({ refreshTrigger }: BalanceCardProps) {
  const theme = useTheme();
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadBalance = async () => {
    try {
      setError(false);
      const response = await axios.get("/api/balance", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        },
      });
      setBalance(response.data.amount ?? 0);
    } catch (e) {
      console.error("Error when loading balance");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
  }, [refreshTrigger]);

  const getBalanceColor = () => {
    if (error) return theme.palette.error.main;
    if (balance > 0)
      return (
        theme.palette.transaction?.credit?.main || theme.palette.success.main
      );
    if (balance < 0)
      return theme.palette.transaction?.debit?.main || theme.palette.error.main;
    return theme.palette.text.primary;
  };

  if (error) {
    return (
      <StyledPaper error errorColor={theme.palette.error.light}>
        <StyledErrorSubtitle errorColor={theme.palette.error.main}>
          SALDO INDISPONÍVEL
        </StyledErrorSubtitle>

        <StyledErrorMessage variant="body1">
          Não foi possível carregar seu saldo. Tente novamente mais tarde.
        </StyledErrorMessage>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper>
      <StyledSubtitle variant="subtitle2">SALDO TOTAL</StyledSubtitle>

      <StyledBalanceValue variant="h4" as="p" balanceColor={getBalanceColor()}>
        {loading ? "..." : `R$ ${balance.toFixed(2)}`}
      </StyledBalanceValue>
    </StyledPaper>
  );
}

export default BalanceCard;
