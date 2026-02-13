import TransactionIcon from "../TransactionIcon/TransactionIcon";
import {
  TransactionContainer,
  TransactionContent,
  DetailsContainer,
  HeaderRow,
  TransactionId,
  Amount,
  UserId,
  StyledDivider,
} from "./Transaction.styles";

interface TransactionProps {
  transaction: {
    id: string;
    user_id: string;
    type: "CREDIT" | "DEBIT";
    amount: number;
  };
}

export default function Transaction({ transaction }: TransactionProps) {
  const formattedAmount = transaction.amount.toFixed(2);
  const sign = transaction.type === "CREDIT" ? "+" : "-";

  return (
    <TransactionContainer>
      <TransactionContent>
        <TransactionIcon type={transaction.type} />

        <DetailsContainer>
          <HeaderRow>
            <TransactionId variant="body2">{transaction.id}</TransactionId>
            <Amount variant="body1" $type={transaction.type}>
              {sign} R$ {formattedAmount}
            </Amount>
          </HeaderRow>
          <UserId variant="body2">{transaction.user_id}</UserId>
        </DetailsContainer>
      </TransactionContent>
      <StyledDivider />
    </TransactionContainer>
  );
}
