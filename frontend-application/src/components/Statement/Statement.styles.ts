import { styled } from "@mui/material/styles";
import { Paper, Typography, Box } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: "1px solid #f1f5f9",
  boxShadow: "none",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  fontSize: "1.125rem",
  lineHeight: 1.6,
  color: theme.palette.text.primary,

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.25rem",
  },
}));

export const TransactionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  minHeight: "200px",
}));

export const LoadingTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

export const ErrorTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  color: theme.palette.error.main,
  backgroundColor: theme.palette.error.light + "20",
  borderRadius: theme.shape.borderRadius,
}));

export const EmptyStateTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  fontStyle: "italic",
}));
