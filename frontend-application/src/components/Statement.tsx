import { Paper, Typography, Box } from "@mui/material";
import StatementFilters from "./StatementFilters";
import Transaction from "./Transaction";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface Transaction {
  id: string;
  user_id: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
}

export type FilterValue = null | "CREDIT" | "DEBIT";

function Statement() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState<FilterValue>(null);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/transactions", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        },
        params: {
          ...(activeFilter && { type: activeFilter }),
        },
      });

      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
      setError("Falha ao carregar transações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <Paper elevation={0} sx={{ p: 2, border: "1px solid #f1f5f9" }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Histórico
        </Typography>
        <StatementFilters onFilterChange={setActiveFilter} />
      </Box>

      <Box>
        {loading && <Typography>Carregando...</Typography>}

        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && transactions.length === 0 && (
          <Typography color="text.secondary">
            Nenhuma transação encontrada
          </Typography>
        )}

        {!loading &&
          !error &&
          transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
      </Box>
    </Paper>
  );
}

export default Statement;
