import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "./Header";
import api from "src/services/api";

vi.mock("src/services/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

const mockedApiPost = vi.mocked(api.post);

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
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

describe("Header Component", () => {
  const mockOnTransactionCreated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the header title and button", () => {
    render(<Header />);

    expect(screen.getByText("Financial Transactions")).toBeInTheDocument();
    expect(screen.getByText("New Transaction")).toBeInTheDocument();
  });

  it("should open modal when clicking New Transaction button", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const newTransactionButton = screen.getByText("New Transaction");
    await user.click(newTransactionButton);

    expect(screen.getByTestId("transaction-modal")).toBeInTheDocument();
  });

  it("should call onTransactionCreated when transaction is created successfully", async () => {
    const user = userEvent.setup();
    mockedApiPost.mockResolvedValueOnce({ data: { id: "123" } });

    render(<Header onTransactionCreated={mockOnTransactionCreated} />);

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
    });

    await waitFor(() => {
      expect(screen.queryByTestId("transaction-modal")).not.toBeInTheDocument();
    });
  });

  it("should show success snackbar when transaction is created", async () => {
    const user = userEvent.setup();
    mockedApiPost.mockResolvedValueOnce({ data: { id: "123" } });

    render(<Header />);

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

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<Header />);

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

  it("should handle multiple transaction creations", async () => {
    const user = userEvent.setup();
    mockedApiPost.mockResolvedValue({ data: { id: "123" } });

    render(<Header onTransactionCreated={mockOnTransactionCreated} />);

    await user.click(screen.getByText("New Transaction"));

    await waitFor(() => {
      expect(screen.getByTestId("transaction-modal")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockOnTransactionCreated).toHaveBeenCalledTimes(1);
    });

    await user.click(screen.getByText("New Transaction"));

    await waitFor(() => {
      expect(screen.getByTestId("transaction-modal")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockOnTransactionCreated).toHaveBeenCalledTimes(2);
    });

    expect(mockedApiPost).toHaveBeenCalledTimes(2);
  });
});
