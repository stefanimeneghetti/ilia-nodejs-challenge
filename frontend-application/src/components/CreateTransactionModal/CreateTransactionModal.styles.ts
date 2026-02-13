import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  Box,
  styled,
} from "@mui/material";

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 12px;
    padding: ${({ theme }) => theme.spacing?.(1) || "8px"};
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-weight: 600;
  padding-bottom: 8px;
`;

export const StyledDialogContent = styled(DialogContent)`
  padding-top: 8px !important;
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 16px 24px;
`;

export const FormBox = styled(Box)`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;

    &:hover fieldset {
      border-color: ${({ theme }) => theme.palette?.primary?.main || "#1976d2"};
    }
  }
`;

export const StyledFormControl = styled(FormControl)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

export const CancelButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
`;

export const SaveButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette?.primary?.main || "#1976d2"};

  &:hover {
    background-color: ${({ theme }) =>
      theme.palette?.primary?.dark || "#1565c0"};
  }

  &:disabled {
    background-color: #e0e0e0;
  }
`;
