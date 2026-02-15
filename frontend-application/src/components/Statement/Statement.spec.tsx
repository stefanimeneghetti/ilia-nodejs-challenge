import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import Statement from "./Statement";
import api from "src/services/api";

vi.mock("src/services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockedApiGet = vi.mocked(api.get);
const mockedApiPost = vi.mocked(api.post);

vi.mock("../CreateTransactionModal/CreateTransactionModal", () => ({
  default: ({ open, onClose, onSave }: any) =>
    open ? (
      <div data-testid="transaction-modal">
        <h2>New Transaction</h2>
        <button
          onClick={() =>
            onSave({ user_id: "user1", type: "CREDIT", amount: 100 })
          }
        >
          Save
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
}));

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
        headerTitle: "Financial Transactions",
        createNewTransactionButton: "New Transaction",
        createNewTransactionButtonLoading: "Creating...",
        createNewTransactionSucceed: "Transaction created successfully!",
        createNewTransactionError: "Error creating transaction",
        createNewTransactionErrorNetwork: "Network error. Please try again.",
        createNewTransactionErrorMessage: "An error occurred",
        createNewTransactionErrorGeneric: "An unexpected error occurred",
        createTransactionError: "Error creating transaction",
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

  describe("list transactions", () => {
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

      expect(
        screen.queryByText("No transactions found"),
      ).not.toBeInTheDocument();
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

      expect(
        screen.queryByTestId("transaction-TRX-001"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("transaction-TRX-002"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("transaction-TRX-003"),
      ).not.toBeInTheDocument();

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
      expect(
        screen.queryByTestId("transaction-TRX-002"),
      ).not.toBeInTheDocument();
    });

    it("should show error message when request fails", async () => {
      mockedApiGet.mockRejectedValueOnce(new Error("Network error"));

      render(<Statement />);

      await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      });

      expect(
        screen.getByText("Failed to load transactions"),
      ).toBeInTheDocument();

      expect(screen.queryByTestId(/transaction-/)).not.toBeInTheDocument();
      expect(
        screen.queryByText("No transactions found"),
      ).not.toBeInTheDocument();

      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe("create transaction", () => {
    const mockOnTransactionCreated = vi.fn();

    it("should open modal when clicking New Transaction button", async () => {
      const user = userEvent.setup();
      render(<Statement />);

      const newTransactionButton = screen.getByText("New Transaction");
      await user.click(newTransactionButton);

      expect(screen.getByTestId("transaction-modal")).toBeInTheDocument();
    });

    it("should call onTransactionCreated when transaction is created successfully", async () => {
      const user = userEvent.setup();
      mockedApiPost.mockResolvedValueOnce({ data: { id: "123" } });

      render(<Statement onTransactionCreated={mockOnTransactionCreated} />);

      await user.click(screen.getByText("New Transaction"));

      await waitFor(() => {
        expect(screen.getByTestId("transaction-modal")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(mockedApiPost).toHaveBeenCalledWith("/api/transactions", {
          user_id: "user1",
          type: "CREDIT",
          amount: 100,
        });
      });

      await waitFor(() => {
        expect(mockOnTransactionCreated).toHaveBeenCalledTimes(1);
        expect(mockedApiGet).toHaveBeenCalledTimes(2);
      });

      await waitFor(() => {
        expect(
          screen.queryByTestId("transaction-modal"),
        ).not.toBeInTheDocument();
      });
    });

    it("should show success snackbar when transaction is created", async () => {
      const user = userEvent.setup();
      mockedApiPost.mockResolvedValueOnce({ data: { id: "123" } });

      render(<Statement />);

      await user.click(screen.getByText("New Transaction"));

      await waitFor(() => {
        expect(screen.getByTestId("transaction-modal")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(
          screen.getByText("Transaction created successfully!"),
        ).toBeInTheDocument();
      });

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("MuiAlert-filledSuccess");
    });

    it("should show error snackbar when transaction creation fails", async () => {
      const user = userEvent.setup();
      const error = new Error("Network Error");
      mockedApiPost.mockRejectedValueOnce(error);

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(<Statement />);

      await user.click(screen.getByText("New Transaction"));

      await waitFor(() => {
        expect(screen.getByTestId("transaction-modal")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(
          screen.getByText("Error creating transaction"),
        ).toBeInTheDocument();
      });

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("MuiAlert-filledError");

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
