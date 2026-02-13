import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { IconContainer } from "./TransactionIcon.styles";

interface TransactionIconProps {
  type: "CREDIT" | "DEBIT";
}

export default function TransactionIcon({ type }: TransactionIconProps) {
  return (
    <IconContainer $type={type}>
      {type === "CREDIT" ? <ArrowUpward /> : <ArrowDownward />}
    </IconContainer>
  );
}
