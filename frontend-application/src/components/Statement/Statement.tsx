import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  StyledPaper,
  HeaderBox,
  TitleTypography,
  TransactionsContainer,
  LoadingTypography,
  ErrorTypography,
  EmptyStateTypography,
} from "./Statement.styles";
import StatementFilters from "../StatementFilters/StatementFilters";
import Transaction from "../Transaction/Transaction";

interface Transaction {
  id: string;
  user_id: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
}

export type FilterValue = null | "CREDIT" | "DEBIT";

interface StatementProps {
  refreshTrigger?: number;
}

function Statement({ refreshTrigger = 0 }: StatementProps) {
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
  }, [activeFilter, refreshTrigger]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const renderContent = () => {
    if (loading) {
      return <LoadingTypography>Carregando...</LoadingTypography>;
    }

    if (error) {
      return <ErrorTypography color="error">{error}</ErrorTypography>;
    }

    if (transactions.length === 0) {
      return (
        <EmptyStateTypography color="text.secondary">
          Nenhuma transação encontrada
        </EmptyStateTypography>
      );
    }

    return transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  };

  return (
    <StyledPaper elevation={0}>
      <HeaderBox>
        <TitleTypography variant="h6">Histórico</TitleTypography>
        <StatementFilters onFilterChange={setActiveFilter} />
      </HeaderBox>

      <TransactionsContainer>{renderContent()}</TransactionsContainer>
    </StyledPaper>
  );
}

export default Statement;
