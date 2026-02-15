import { styled } from "@mui/material/styles";
import { Paper, Typography, Box, Button } from "@mui/material";

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
  marginTop: 5,
}));

export const EmptyStateTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  fontStyle: "italic",
}));

export const NewTransactionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: "50%",
  textTransform: "none",
  padding: theme.spacing(1),
  fontSize: "0.7rem",
  fontWeight: 500,
  boxShadow: "none",
  whiteSpace: "nowrap",
  minWidth: "40px",
  width: "40px",
  height: "40px",

  [theme.breakpoints.up("sm")]: {
    borderRadius: "24px",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: "0.8rem",
    minWidth: "auto",
    width: "auto",
    height: "auto",
  },

  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    fontSize: "0.9rem",
  },

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: "none",
  },

  "& .MuiButton-startIcon": {
    margin: 0,

    [theme.breakpoints.up("sm")]: {
      margin: "0 8px 0 -4px",
    },
  },
}));

export const ButtonText = styled("span")(({ theme }) => ({
  display: "none",

  [theme.breakpoints.up("sm")]: {
    display: "inline",
  },
}));
