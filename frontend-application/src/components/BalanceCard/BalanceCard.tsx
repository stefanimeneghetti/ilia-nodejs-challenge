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
import { useTranslation } from "react-i18next";

interface BalanceCardProps {
  refreshTrigger?: number;
}

function BalanceCard({ refreshTrigger }: BalanceCardProps) {
  const { t } = useTranslation();
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
          {t("unavailableBalance")}
        </StyledErrorSubtitle>

        <StyledErrorMessage variant="body1">
          {t("unavailableBalanceDescription")}
        </StyledErrorMessage>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper>
      <StyledSubtitle variant="subtitle2">{t("currentBalance")}</StyledSubtitle>

      <StyledBalanceValue variant="h4" as="p" balanceColor={getBalanceColor()}>
        {loading
          ? "..."
          : t("balanceValue", {
              value: Intl.NumberFormat(t("format.decimal"), {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(balance),
            })}
      </StyledBalanceValue>
    </StyledPaper>
  );
}

export default BalanceCard;
