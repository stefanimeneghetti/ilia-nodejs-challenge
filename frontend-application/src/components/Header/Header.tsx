import SimpleLanguageSelector from "../LanguageSelector/LanguageSelector";
import { HeaderRoot, HeaderContainer, HeaderTitle } from "./Header.styles";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  return (
    <>
      <HeaderRoot>
        <HeaderContainer className="container">
          <HeaderTitle variant="h6" as="h1">
            {t("headerTitle")}
          </HeaderTitle>
          <SimpleLanguageSelector />
        </HeaderContainer>
      </HeaderRoot>
    </>
  );
}

export default Header;
