import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "error" && prop !== "errorColor",
})<{ error?: boolean; errorColor?: string }>(
  ({ theme, error, errorColor }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    borderRadius: Number(theme.shape.borderRadius) * 2,
    border: "1px solid",
    borderColor: error ? errorColor : theme.palette.divider,
    backgroundColor: error ? `${errorColor}20` : theme.palette.background.paper,
  }),
);

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  textTransform: "uppercase",
}));

export const StyledErrorSubtitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "errorColor",
})<{ errorColor?: string }>(({ theme, errorColor }) => ({
  color: errorColor || theme.palette.error.main,
  marginBottom: theme.spacing(1),
  textTransform: "uppercase",
}));

export const StyledErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.dark,
}));

export const StyledBalanceValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "balanceColor",
})<{ balanceColor: string }>(({ theme, balanceColor }) => ({
  fontWeight: 500,
  color: balanceColor,
  fontSize: "clamp(1.75rem, 5vw, 2rem)",
  transition: theme.transitions.create("color"),
}));
