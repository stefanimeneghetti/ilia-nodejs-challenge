import { useState } from "react";
import { FiltersContainer, FilterButton } from "./StatementFilters.styles";
import type { FilterValue } from "../Statement/Statement";
import { useTranslation } from "react-i18next";

interface Filter {
  label: string;
  value: FilterValue;
}

interface StatementFiltersProps {
  onFilterChange: (filter: FilterValue) => void;
  initialFilter?: FilterValue;
}

export default function StatementFilters({
  onFilterChange,
  initialFilter = null,
}: StatementFiltersProps) {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] =
    useState<FilterValue>(initialFilter);

  const filters: Filter[] = [
    { label: t("transactionTypeAll"), value: null },
    { label: t("transactionTypeCredit"), value: "CREDIT" },
    { label: t("transactionTypeDebit"), value: "DEBIT" },
  ];

  const handleFilterClick = (filter: FilterValue) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <FiltersContainer>
      {filters.map((filter) => (
        <FilterButton
          key={filter.label}
          variant={selectedFilter === filter.value ? "contained" : "outlined"}
          size="small"
          onClick={() => handleFilterClick(filter.value)}
          $isSelected={selectedFilter === filter.value}
        >
          {filter.label}
        </FilterButton>
      ))}
    </FiltersContainer>
  );
}
