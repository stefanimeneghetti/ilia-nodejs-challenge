import { Add } from "@mui/icons-material";
import {
  HeaderRoot,
  HeaderContainer,
  HeaderTitle,
  NewTransactionButton,
  ButtonText,
} from "./Header.styles";
import { useState } from "react";
import TransactionModal from "../CreateTransactionModal/CreateTransactionModal";
import axios from "axios";
import { Snackbar, Alert, type AlertColor } from "@mui/material";
import getErrorMessage from "../../utils/getErrorMessage";

interface Transaction {
  user_id: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
}

interface HeaderProps {
  onTransactionCreated?: () => void;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

function Header({ onTransactionCreated }: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

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

  const createTransaction = async (transaction: Transaction) => {
    setLoading(true);

    try {
      await axios.post("/api/transactions", transaction, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        },
      });

      showSnackbar("Transação criada com sucesso!", "success");
      onTransactionCreated?.();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao criar uma nova transação:", error);

      const errorMessage = getErrorMessage(error);

      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTransaction = (transaction: Transaction) => {
    createTransaction(transaction);
  };

  return (
    <>
      <HeaderRoot>
        <HeaderContainer className="container">
          <HeaderTitle variant="h6" as="h1">
            Transações
          </HeaderTitle>

          <NewTransactionButton
            onClick={handleOpenModal}
            variant="contained"
            startIcon={<Add />}
            disabled={loading}
          >
            <ButtonText>{loading ? "Criando..." : "Nova Transação"}</ButtonText>
          </NewTransactionButton>
        </HeaderContainer>
      </HeaderRoot>

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

export default Header;
