import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import Statement from "./Statement";
import api from "src/services/api";

vi.mock("src/services/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedApiGet = vi.mocked(api.get);

vi.mock("../StatementFilters/StatementFilters", () => ({
  default: ({ onFilterChange }: { onFilterChange: (filter: any) => void }) => (
    <div data-testid="mock-statement-filters">
      <button onClick={() => onFilterChange("CREDIT")}>Credit</button>
      <button onClick={() => onFilterChange("DEBIT")}>Debit</button>
      <button onClick={() => onFilterChange(null)}>All</button>
    </div>
  ),
}));

vi.mock("../Transaction/Transaction", () => ({
  default: ({ transaction }: { transaction: any }) => {
    if (!transaction) return null;

    return (
      <div data-testid={`transaction-${transaction.id}`}>
        <span>{transaction.id}</span>
        <span>{transaction.type}</span>
        <span>{transaction.amount}</span>
      </div>
    );
  },
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        statementTitle: "Statement",
        loadingLabel: "Loading...",
        loadTransactionsFail: "Failed to load transactions",
        noTransactions: "No transactions found",
        transactionTypeAll: "All",
        transactionTypeCredit: "Credit",
        transactionTypeDebit: "Debit",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Statement Component", () => {
  const mockTransactions = [
    { id: "TRX-001", user_id: "user_123", type: "CREDIT", amount: 1000 },
    { id: "TRX-002", user_id: "user_123", type: "DEBIT", amount: 500.5 },
    { id: "TRX-003", user_id: "user_456", type: "CREDIT", amount: 200.75 },
  ];

  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  it("should show loading state initially", () => {
    render(<Statement />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should load and display transactions successfully", async () => {
    mockedApiGet.mockResolvedValueOnce({
      data: mockTransactions,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    });

    render(<Statement />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Statement")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("transaction-TRX-001")).toBeInTheDocument();
      expect(screen.getByTestId("transaction-TRX-002")).toBeInTheDocument();
      expect(screen.getByTestId("transaction-TRX-003")).toBeInTheDocument();
    });

    expect(screen.queryByText("No transactions found")).not.toBeInTheDocument();
  });

  it("should display empty state when no transactions", async () => {
    mockedApiGet.mockResolvedValueOnce({
      data: [],
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    });

    render(<Statement />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("No transactions found")).toBeInTheDocument();

    expect(screen.queryByTestId("transaction-TRX-001")).not.toBeInTheDocument();
    expect(screen.queryByTestId("transaction-TRX-002")).not.toBeInTheDocument();
    expect(screen.queryByTestId("transaction-TRX-003")).not.toBeInTheDocument();

    const transactionElements = screen.queryAllByTestId(/transaction-/);
    expect(transactionElements).toHaveLength(0);
  });

  it("should filter transactions by type when clicking Credit button", async () => {
    const user = userEvent.setup();

    mockedApiGet.mockResolvedValueOnce({
      data: mockTransactions,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    });

    render(<Statement />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const creditTransactions = mockTransactions.filter(
      (t) => t.type === "CREDIT",
    );
    mockedApiGet.mockResolvedValueOnce({
      data: creditTransactions,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    });

    const creditButton = screen.getByRole("button", { name: "Credit" });
    await user.click(creditButton);

    await waitFor(() => {
      expect(mockedApiGet).toHaveBeenCalledWith("/api/transactions", {
        params: { type: "CREDIT" },
      });
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("transaction-TRX-001")).toBeInTheDocument();
    expect(screen.getByTestId("transaction-TRX-003")).toBeInTheDocument();
    expect(screen.queryByTestId("transaction-TRX-002")).not.toBeInTheDocument();
  });

  it("should show error message when request fails", async () => {
    mockedApiGet.mockRejectedValueOnce(new Error("Network error"));

    render(<Statement />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Failed to load transactions")).toBeInTheDocument();

    expect(screen.queryByTestId(/transaction-/)).not.toBeInTheDocument();
    expect(screen.queryByText("No transactions found")).not.toBeInTheDocument();

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should reload transactions when refreshTrigger changes", async () => {
    mockedApiGet.mockResolvedValue({
      data: mockTransactions,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    });

    const { rerender } = render(<Statement refreshTrigger={0} />);

    await waitFor(() => {
      expect(mockedApiGet).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    rerender(<Statement refreshTrigger={1} />);

    await waitFor(() => {
      expect(mockedApiGet).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
