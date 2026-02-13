import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const FiltersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",
}));

interface StyledFilterButtonProps {
  $isSelected: boolean;
}

export const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "$isSelected",
})<StyledFilterButtonProps>(({ theme, $isSelected }) => ({
  borderRadius: "20px",
  textTransform: "none",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  minWidth: "auto",
  borderColor: theme.palette.divider,
  backgroundColor: $isSelected ? theme.palette.primary.main : "transparent",
  color: $isSelected
    ? theme.palette.common.white
    : theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: "0.8125rem",
  lineHeight: 1.75,

  [theme.breakpoints.up("sm")]: {
    fontSize: "0.875rem",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },

  "&:hover": {
    backgroundColor: $isSelected
      ? theme.palette.primary.dark
      : theme.palette.action.hover,
    borderColor: $isSelected
      ? theme.palette.primary.dark
      : theme.palette.divider,
  },

  "&:hover .MuiTouchRipple-child": {
    backgroundColor: $isSelected ? theme.palette.common.white : undefined,
  },
}));
