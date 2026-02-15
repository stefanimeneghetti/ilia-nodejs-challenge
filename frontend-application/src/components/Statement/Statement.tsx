import { useEffect, useState, useCallback } from "react";
import api from "src/services/api";
import {
  StyledPaper,
  HeaderBox,
  TitleTypography,
  TransactionsContainer,
  LoadingTypography,
  ErrorTypography,
  EmptyStateTypography,
  NewTransactionButton,
  ButtonText,
} from "./Statement.styles";
import StatementFilters from "../StatementFilters/StatementFilters";
import Transaction from "../Transaction/Transaction";
import { useTranslation } from "react-i18next";
import getErrorMessage from "src/utils/getErrorMessage";
import TransactionModal from "../CreateTransactionModal/CreateTransactionModal";
import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import { Add } from "@mui/icons-material";

interface Transaction {
  id: string;
  user_id: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
}

export type FilterValue = null | "CREDIT" | "DEBIT";

interface StatementProps {
  onTransactionCreated?: () => void;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

function Statement({ onTransactionCreated }: StatementProps) {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterValue>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [loadingButton, setLoadingButton] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const createTransaction = async (transaction: Omit<Transaction, "id">) => {
    setLoadingButton(true);

    try {
      await api.post("/api/transactions", transaction);

      showSnackbar(t("createNewTransactionSucceed"), "success");
      onTransactionCreated?.();
      loadTransactions();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao criar uma nova transação:", error);

      const errorMessage = getErrorMessage(error, t);

      showSnackbar(errorMessage, "error");
    } finally {
      setLoadingButton(false);
    }
  };

  const handleSaveTransaction = (transaction: Omit<Transaction, "id">) => {
    createTransaction(transaction);
  };

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/api/transactions", {
        params: {
          ...(activeFilter && { type: activeFilter }),
        },
      });

      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
      setError("loadTransactionsFail");
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const renderContent = () => {
    if (loading) {
      return <LoadingTypography>{t("loadingLabel")}</LoadingTypography>;
    }

    if (error) {
      return <ErrorTypography color="error">{t(error)}</ErrorTypography>;
    }

    if (transactions.length === 0) {
      return (
        <EmptyStateTypography color="text.secondary">
          {t("noTransactions")}
        </EmptyStateTypography>
      );
    }

    return transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  };

  return (
    <>
      <StyledPaper elevation={0}>
        <HeaderBox>
          <Box display="flex" justifyContent="space-between">
            <TitleTypography variant="h6">
              {t("statementTitle")}
            </TitleTypography>
            <NewTransactionButton
              onClick={handleOpenModal}
              variant="contained"
              startIcon={<Add />}
              disabled={loadingButton}
            >
              <ButtonText>
                {loadingButton
                  ? t("createNewTransactionButtonLoading")
                  : t("createNewTransactionButton")}
              </ButtonText>
            </NewTransactionButton>
          </Box>
          <StatementFilters onFilterChange={setActiveFilter} />
        </HeaderBox>

        <TransactionsContainer>{renderContent()}</TransactionsContainer>
      </StyledPaper>
      <TransactionModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTransaction}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Statement;
