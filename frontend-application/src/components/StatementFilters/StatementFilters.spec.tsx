import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import StatementFilters from "./StatementFilters";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        transactionTypeAll: "All",
        transactionTypeCredit: "Credit",
        transactionTypeDebit: "Debit",
      };
      return translations[key];
    },
  }),
}));

describe("StatementFilters Component", () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it("should render all filter buttons", () => {
    render(<StatementFilters onFilterChange={mockOnFilterChange} />);

    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Credit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Debit" })).toBeInTheDocument();
  });

  it("should respect initialFilter prop", () => {
    render(
      <StatementFilters
        onFilterChange={mockOnFilterChange}
        initialFilter="CREDIT"
      />,
    );

    const allButton = screen.getByRole("button", { name: "All" });
    const creditButton = screen.getByRole("button", { name: "Credit" });
    const debitButton = screen.getByRole("button", { name: "Debit" });

    expect(creditButton.className).toContain("MuiButton-contained");
    expect(allButton.className).toContain("MuiButton-outlined");
    expect(debitButton.className).toContain("MuiButton-outlined");
  });

  it("should call onFilterChange with correct value when clicking Credit", async () => {
    const user = userEvent.setup();
    render(<StatementFilters onFilterChange={mockOnFilterChange} />);

    const creditButton = screen.getByRole("button", { name: "Credit" });
    await user.click(creditButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("CREDIT");
  });

  it("should call onFilterChange with correct value when clicking Debit", async () => {
    const user = userEvent.setup();
    render(<StatementFilters onFilterChange={mockOnFilterChange} />);

    const debitButton = screen.getByRole("button", { name: "Debit" });
    await user.click(debitButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("DEBIT");
  });

  it("should call onFilterChange with null when clicking All", async () => {
    const user = userEvent.setup();
    render(<StatementFilters onFilterChange={mockOnFilterChange} />);

    const allButton = screen.getByRole("button", { name: "All" });
    await user.click(allButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith(null);
  });

  it("should update selected style when clicking different filters", async () => {
    const user = userEvent.setup();
    render(<StatementFilters onFilterChange={mockOnFilterChange} />);

    const allButton = screen.getByRole("button", { name: "All" });
    const creditButton = screen.getByRole("button", { name: "Credit" });
    const debitButton = screen.getByRole("button", { name: "Debit" });

    expect(allButton.className).toContain("MuiButton-contained");
    expect(creditButton.className).toContain("MuiButton-outlined");
    expect(debitButton.className).toContain("MuiButton-outlined");

    await user.click(creditButton);

    await waitFor(() => {
      expect(creditButton.className).toContain("MuiButton-contained");
    });
    expect(allButton.className).toContain("MuiButton-outlined");
    expect(debitButton.className).toContain("MuiButton-outlined");

    await user.click(debitButton);

    await waitFor(() => {
      expect(debitButton.className).toContain("MuiButton-contained");
    });
    expect(creditButton.className).toContain("MuiButton-outlined");
    expect(allButton.className).toContain("MuiButton-outlined");

    await user.click(allButton);

    await waitFor(() => {
      expect(allButton.className).toContain("MuiButton-contained");
    });
    expect(creditButton.className).toContain("MuiButton-outlined");
    expect(debitButton.className).toContain("MuiButton-outlined");
  });

  it("should call onFilterChange multiple times when clicking different filters", async () => {
    const user = userEvent.setup();
    render(<StatementFilters onFilterChange={mockOnFilterChange} />);

    await user.click(screen.getByRole("button", { name: "Credit" }));
    await user.click(screen.getByRole("button", { name: "Debit" }));
    await user.click(screen.getByRole("button", { name: "All" }));

    expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
    expect(mockOnFilterChange).toHaveBeenNthCalledWith(1, "CREDIT");
    expect(mockOnFilterChange).toHaveBeenNthCalledWith(2, "DEBIT");
    expect(mockOnFilterChange).toHaveBeenNthCalledWith(3, null);
  });
});
