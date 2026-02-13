import { Box, Button, useTheme } from "@mui/material";
import { useState } from "react";
import type { FilterValue } from "./Statement";

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
  const theme = useTheme();
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

  const buttonStyles = (isSelected: boolean) => ({
    borderRadius: "20px",
    textTransform: "none",
    px: 2,
    borderColor: theme.palette.divider,
    bgcolor: isSelected ? theme.palette.primary.main : "transparent",
    color: isSelected
      ? theme.palette.common.white
      : theme.palette.text.secondary,
    "&:hover": {
      bgcolor: isSelected
        ? theme.palette.primary.dark
        : theme.palette.action.hover,
    },
  });

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {filters.map((filter) => (
        <Button
          key={filter.label}
          variant={selectedFilter === filter.value ? "contained" : "outlined"}
          size="small"
          onClick={() => handleFilterClick(filter.value)}
          sx={buttonStyles(selectedFilter === filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </Box>
  );
}
