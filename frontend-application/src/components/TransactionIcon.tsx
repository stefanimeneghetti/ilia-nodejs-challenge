import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";

interface TransactionIconProps {
  type: "CREDIT" | "DEBIT";
}

export default function TransactionIcon({ type }: TransactionIconProps) {
  const theme = useTheme();
  const colors =
    theme.palette.transaction[type.toLowerCase() as "credit" | "debit"];

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mr: 2,
        bgcolor: colors.bg,
        color: colors.main,
      }}
    >
      {type === "CREDIT" ? (
        <ArrowUpward sx={{ fontSize: 24, fontWeight: 700 }} />
      ) : (
        <ArrowDownward sx={{ fontSize: 24, fontWeight: 700 }} />
      )}
    </Box>
  );
}
