import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const HeaderRoot = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1100,
  backgroundColor: theme.palette.background.paper,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  width: "100%",
  left: 0,
  right: 0,
  marginBottom: theme.spacing(5),
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "64px",
  maxWidth: "1200px",
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  boxSizing: "border-box",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    minHeight: "70px",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },

  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1rem",
  color: theme.palette.common.black,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "120px",

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.25rem",
    maxWidth: "200px",
  },

  [theme.breakpoints.up("md")]: {
    maxWidth: "none",
  },
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
