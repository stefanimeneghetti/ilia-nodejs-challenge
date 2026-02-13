import { styled } from "@mui/material/styles";
import { Box, Typography, Divider } from "@mui/material";

export const TransactionContainer = styled(Box)({
  width: "100%",
});

export const TransactionContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

export const DetailsContainer = styled(Box)({
  flex: 1,
});

export const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(0.5),
}));

export const TransactionId = styled(Typography)(({ theme }) => ({
  fontFamily: "monospace",
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  lineHeight: 1.5,

  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

interface AmountProps {
  $type: "CREDIT" | "DEBIT";
}

export const Amount = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$type",
})<AmountProps>(({ theme, $type }) => {
  const color =
    theme.palette.transaction?.[$type.toLowerCase() as "credit" | "debit"]
      ?.main ||
    ($type === "CREDIT"
      ? theme.palette.success.main
      : theme.palette.error.main);

  return {
    fontWeight: 600,
    color,
    fontSize: "1rem",
    lineHeight: 1.5,

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem",
    },
  };
});

export const UserId = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.875rem",
  lineHeight: 1.5,

  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

export const StyledDivider = styled(Divider)({
  width: "100%",
});
