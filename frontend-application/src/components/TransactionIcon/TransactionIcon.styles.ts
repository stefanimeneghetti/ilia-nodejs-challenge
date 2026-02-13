import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

interface IconContainerProps {
  $type: "CREDIT" | "DEBIT";
}

export const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$type",
})<IconContainerProps>(({ theme, $type }) => {
  const colorKey = $type.toLowerCase() as "credit" | "debit";

  const getColors = () => {
    if (theme.palette.transaction?.[colorKey]) {
      return theme.palette.transaction[colorKey];
    }

    return $type === "CREDIT"
      ? { bg: "#e8f5e8", main: "#2e7d32" }
      : { bg: "#ffebee", main: "#d32f2f" };
  };

  const colors = getColors();

  return {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(2),
    backgroundColor: colors.bg,
    color: colors.main,

    "& .MuiSvgIcon-root": {
      fontSize: 24,
      fontWeight: 700,
    },

    "&:hover": {
      backgroundColor: colors.main,
      color: colors.bg,
      transform: "scale(1.05)",
    },

    transition: theme.transitions.create(
      ["background-color", "color", "transform"],
      { duration: theme.transitions.duration.shorter },
    ),
  };
});
