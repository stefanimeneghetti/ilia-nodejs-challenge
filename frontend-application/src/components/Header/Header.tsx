import { Add } from "@mui/icons-material";
import {
  HeaderRoot,
  HeaderContainer,
  HeaderTitle,
  NewTransactionButton,
  ButtonText,
} from "./Header.styles";

function Header() {
  return (
    <HeaderRoot>
      <HeaderContainer className="container">
        <HeaderTitle variant="h6" as="h1">
          Transações
        </HeaderTitle>

        <NewTransactionButton variant="contained" startIcon={<Add />}>
          <ButtonText>Nova Transação</ButtonText>
        </NewTransactionButton>
      </HeaderContainer>
    </HeaderRoot>
  );
}

export default Header;
