import { useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  FormBox,
  StyledTextField,
  StyledFormControl,
  CancelButton,
  SaveButton,
} from "./CreateTransactionModal.styles";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (transaction: any) => void;
}

interface FormData {
  user_id: string;
  amount: string;
  type: "CREDIT" | "DEBIT";
}

function TransactionModal({ open, onClose, onSave }: TransactionModalProps) {
  const [formData, setFormData] = useState<FormData>({
    user_id: "",
    amount: "",
    type: "CREDIT",
  });

  const [fieldErrors, setFieldErrors] = useState({
    user_id: "",
    amount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    const name = e.target.name as keyof FormData;
    let value = e.target.value as string;

    if (name === "user_id") {
      value = value.replace(/[^a-zA-Z0-9_]/g, "");

      if (value.length > 0 && !/^[a-zA-Z0-9_]+$/.test(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          user_id: "Use apenas letras, números e underscore (_)",
        }));
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          user_id: "",
        }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      type: e.target.value as "CREDIT" | "DEBIT",
    }));
  };

  const handleSubmit = () => {
    const transactionToSave = {
      user_id: formData.user_id,
      amount: parseInt(formData.amount, 10),
      type: formData.type,
    };

    onSave(transactionToSave);
    setFormData({ user_id: "", amount: "", type: "CREDIT" });
    setFieldErrors({ user_id: "", amount: "" });
    onClose();
  };

  const isValidInteger = (value: string) => {
    if (!value) return false;
    const num = Number(value);
    return Number.isInteger(num) && num > 0;
  };

  const isValidUserId = (value: string) => {
    if (!value) return false;
    return /^[a-zA-Z0-9_]+$/.test(value);
  };

  const isFormValid = () => {
    const isUserIdValid =
      formData.user_id.trim() !== "" && isValidUserId(formData.user_id);
    const isAmountValid = isValidInteger(formData.amount);

    return isUserIdValid && isAmountValid;
  };

  const handleUserIdBlur = () => {
    if (formData.user_id && !isValidUserId(formData.user_id)) {
      setFieldErrors((prev) => ({
        ...prev,
        user_id:
          "ID do usuário não pode conter espaços ou caracteres especiais",
      }));
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>Nova Transação</StyledDialogTitle>
      <StyledDialogContent>
        <FormBox as="form">
          <StyledTextField
            required
            fullWidth
            label="ID do Usuário"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            onBlur={handleUserIdBlur}
            autoFocus
            placeholder="Digite o ID do usuário (letras, números e _)"
            error={
              !!fieldErrors.user_id ||
              (formData.user_id !== "" && !isValidUserId(formData.user_id))
            }
            helperText={
              fieldErrors.user_id ||
              (formData.user_id !== "" && !isValidUserId(formData.user_id)
                ? "Use apenas letras, números e underscore (_)"
                : "")
            }
            slotProps={{
              htmlInput: {
                maxLength: 25,
              },
            }}
          />

          <StyledTextField
            required
            fullWidth
            label="Valor"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Digite o valor (apenas números inteiros)"
            slotProps={{
              htmlInput: {
                step: "1",
                min: "1",
                pattern: "[0-9]*",
              },
            }}
            error={formData.amount !== "" && !isValidInteger(formData.amount)}
            helperText={
              formData.amount !== "" && !isValidInteger(formData.amount)
                ? "Digite um número inteiro válido"
                : ""
            }
          />

          <StyledFormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              name="type"
              value={formData.type}
              label="Tipo"
              onChange={handleSelectChange}
            >
              <MenuItem value="CREDIT">Crédito</MenuItem>
              <MenuItem value="DEBIT">Débito</MenuItem>
            </Select>
          </StyledFormControl>
        </FormBox>
      </StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={onClose} color="inherit">
          Cancelar
        </CancelButton>
        <SaveButton
          onClick={handleSubmit}
          variant="contained"
          startIcon={<Save />}
          disabled={!isFormValid()}
        >
          Salvar
        </SaveButton>
      </StyledDialogActions>
    </StyledDialog>
  );
}

export default TransactionModal;
