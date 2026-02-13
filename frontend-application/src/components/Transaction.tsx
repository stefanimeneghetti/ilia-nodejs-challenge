import { Box, Divider, Typography, useTheme } from "@mui/material";
import TransactionIcon from "./TransactionIcon";

interface TransactionProps {
  transaction: {
    id: string;
    user_id: string;
    type: "CREDIT" | "DEBIT";
    amount: number;
  };
}

export default function Transaction({ transaction }: TransactionProps) {
  const theme = useTheme();
  const colors =
    theme.palette.transaction[
      transaction.type.toLowerCase() as "credit" | "debit"
    ];

  return (
    <Box key={transaction.id}>
      <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
        <TransactionIcon type={transaction.type} />

        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "monospace",
                color: theme.palette.text.secondary,
              }}
            >
              {transaction.id}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: colors.main,
              }}
            >
              {transaction.type === "CREDIT" ? "+" : "-"} R${" "}
              {transaction.amount.toFixed(2)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {transaction.user_id}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
