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
import { useTranslation } from "react-i18next";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (transaction: FormData) => void;
}

interface FormData {
  user_id: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
}

function TransactionModal({ open, onClose, onSave }: TransactionModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    user_id: "",
    amount: 0,
    type: "CREDIT",
  });

  const [fieldErrors, setFieldErrors] = useState({
    user_id: "",
    amount: 0,
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
          user_id: t("userIdHint"),
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
      amount: Number(formData.amount),
      type: formData.type,
    };

    onSave(transactionToSave);
    setFormData({ user_id: "", amount: 0, type: "CREDIT" });
    setFieldErrors({ user_id: "", amount: 0 });
    onClose();
  };

  const isValidInteger = (value: number) => {
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
        user_id: t("userIdError"),
      }));
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>{t("createNewTransactionButton")}</StyledDialogTitle>
      <StyledDialogContent>
        <FormBox as="form">
          <StyledTextField
            required
            fullWidth
            label={t("userIdLabel")}
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            onBlur={handleUserIdBlur}
            autoFocus
            placeholder={t("userIdHint")}
            error={
              !!fieldErrors.user_id ||
              (formData.user_id !== "" && !isValidUserId(formData.user_id))
            }
            helperText={
              fieldErrors.user_id ||
              (formData.user_id !== "" && !isValidUserId(formData.user_id)
                ? t("userIdError")
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
            label={t("amountLabel")}
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder={t("amountPlaceholder")}
            slotProps={{
              htmlInput: {
                step: "1",
                min: "1",
                pattern: "[0-9]*",
              },
            }}
            error={formData.amount !== 0 && !isValidInteger(formData.amount)}
            helperText={
              formData.amount !== 0 && !isValidInteger(formData.amount)
                ? t("amountError")
                : ""
            }
          />

          <StyledFormControl fullWidth>
            <InputLabel>{t("typeLabel")}</InputLabel>
            <Select
              name="type"
              value={formData.type}
              label={t("typeLabel")}
              onChange={handleSelectChange}
            >
              <MenuItem value="CREDIT">{t("transactionTypeCredit")}</MenuItem>
              <MenuItem value="DEBIT">{t("transactionTypeDebit")}</MenuItem>
            </Select>
          </StyledFormControl>
        </FormBox>
      </StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={onClose} color="inherit">
          {t("cancelButtonText")}
        </CancelButton>
        <SaveButton
          onClick={handleSubmit}
          variant="contained"
          startIcon={<Save />}
          disabled={!isFormValid()}
        >
          {t("saveButtonText")}
        </SaveButton>
      </StyledDialogActions>
    </StyledDialog>
  );
}

export default TransactionModal;
