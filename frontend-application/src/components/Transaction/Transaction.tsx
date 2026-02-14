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
  IconWrapper,
} from "./Transaction.styles";
import { useTranslation } from "react-i18next";

interface TransactionProps {
  transaction: {
    id: string;
    user_id: string;
    type: "CREDIT" | "DEBIT";
    amount: number;
  };
}

export default function Transaction({ transaction }: TransactionProps) {
  const { t } = useTranslation();

  const sign = transaction.type === "CREDIT" ? "+" : "-";

  const formattedAmount = t("balanceValue", {
    value: Intl.NumberFormat(t("format.decimal"), {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(transaction.amount),
  });

  return (
    <TransactionContainer>
      <TransactionContent>
        <IconWrapper>
          <TransactionIcon type={transaction.type} />
        </IconWrapper>

        <DetailsContainer>
          <HeaderRow>
            <TransactionId variant="body2">{transaction.id}</TransactionId>
            <Amount variant="body1" $type={transaction.type}>
              {sign} {formattedAmount}
            </Amount>
          </HeaderRow>
          <UserId variant="body2">{transaction.user_id}</UserId>
        </DetailsContainer>
      </TransactionContent>
      <StyledDivider />
    </TransactionContainer>
  );
}
