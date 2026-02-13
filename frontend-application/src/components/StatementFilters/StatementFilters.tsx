import { useState } from "react";
import { FiltersContainer, FilterButton } from "./StatementFilters.styles";
import type { FilterValue } from "../Statement/Statement";

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
  const [selectedFilter, setSelectedFilter] =
    useState<FilterValue>(initialFilter);

  const filters: Filter[] = [
    { label: "Todas", value: null },
    { label: "Crédito", value: "CREDIT" },
    { label: "Débito", value: "DEBIT" },
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
