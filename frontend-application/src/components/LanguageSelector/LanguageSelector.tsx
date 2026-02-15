import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ReactWorldFlags from "react-world-flags";

const SimpleLanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguage = (
    _event: React.MouseEvent<HTMLElement>,
    newLanguage: string,
  ) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
    }
  };

  return (
    <ToggleButtonGroup
      value={i18n.language}
      exclusive
      onChange={handleLanguage}
      aria-label="language selector"
      size="small"
    >
      <ToggleButton value="pt" aria-label="portuguese">
        <ReactWorldFlags code="BR" style={{ width: 20, height: 15 }} />
      </ToggleButton>

      <ToggleButton value="en" aria-label="english">
        <ReactWorldFlags code="US" style={{ width: 20, height: 15 }} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default SimpleLanguageSelector;
