import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

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
