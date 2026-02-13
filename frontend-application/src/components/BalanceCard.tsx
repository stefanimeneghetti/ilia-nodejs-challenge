import { Paper, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function BalanceCard() {
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
      setBalance(response.data.amount);
    } catch (e) {
      console.error("Error when loading balance");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalance();
  }, []);

  const getBalanceColor = () => {
    if (error) return theme.palette.error.main;
    if (balance > 0) return theme.palette.transaction.credit.main;
    if (balance < 0) return theme.palette.transaction.debit.main;
    return theme.palette.text.primary;
  };

  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          border: "1px solid",
          borderColor: theme.palette.error.light,
          bgcolor: theme.palette.error.light + "20",
        }}
      >
        <Typography
          variant="subtitle2"
          className="text-uppercase"
          sx={{
            color: theme.palette.error.main,
            mb: 1,
          }}
        >
          SALDO INDISPONÍVEL
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.error.dark,
          }}
        >
          Não foi possível carregar seu saldo. Tente novamente mais tarde.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        border: "1px solid",
        borderColor: theme.palette.divider,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="subtitle2"
        className="text-uppercase"
        sx={{
          color: theme.palette.text.secondary,
          mb: 1,
        }}
      >
        SALDO TOTAL
      </Typography>

      <Typography
        variant="h4"
        component="p"
        className="color-transition"
        sx={{
          fontWeight: 500,
          color: getBalanceColor(),
          fontSize: { xs: "1.75rem", sm: "2rem" },
        }}
      >
        {loading ? "..." : `R$ ${balance.toFixed(2)}`}
      </Typography>
    </Paper>
  );
}

export default BalanceCard;
