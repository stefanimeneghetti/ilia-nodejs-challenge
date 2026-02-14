import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material";
import TransactionModal from "./CreateTransactionModal";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        createNewTransactionButton: "Create New Transaction",
        userIdLabel: "User ID",
        userIdHint: "Only letters, numbers and underscore",
        userIdError: "Invalid user ID format",
        amountLabel: "Amount",
        amountPlaceholder: "Enter amount",
        amountError: "Amount must be a positive integer",
        typeLabel: "Type",
        transactionTypeCredit: "Credit",
        transactionTypeDebit: "Debit",
        cancelButtonText: "Cancel",
        saveButtonText: "Save",
      };
      return translations[key] || key;
    },
  }),
}));

const testTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#1565c0",
    },
  },
});

describe("TransactionModal Component", () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={testTheme}>{component}</ThemeProvider>);
  };

  it("should render when open is true", () => {
    renderWithTheme(
      <TransactionModal
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );

    expect(screen.getByText("Create New Transaction")).toBeInTheDocument();
    expect(screen.getByText("User ID")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", { name: /user id/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /amount/i }),
    ).toBeInTheDocument();
  });

  it("should update user_id field correctly", () => {
    renderWithTheme(
      <TransactionModal
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );

    const userIdInput = screen.getByRole("textbox", { name: /user id/i });
    fireEvent.change(userIdInput, { target: { value: "user123" } });

    expect(userIdInput).toHaveValue("user123");
  });

  it("should filter invalid characters from user_id", () => {
    renderWithTheme(
      <TransactionModal
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );

    const userIdInput = screen.getByRole("textbox", { name: /user id/i });
    fireEvent.change(userIdInput, { target: { value: "user@#$123" } });

    expect(userIdInput).toHaveValue("user123");
  });

  it("should show error for invalid amount", async () => {
    renderWithTheme(
      <TransactionModal
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );

    const amountInput = screen.getByRole("spinbutton", { name: /amount/i });
    fireEvent.change(amountInput, { target: { value: "10.5" } });

    expect(
      await screen.findByText("Amount must be a positive integer"),
    ).toBeInTheDocument();
  });

  it("should disable save button when form is invalid", () => {
    renderWithTheme(
      <TransactionModal
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  it("should enable save button when form is valid", () => {
    renderWithTheme(
      <TransactionModal
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );

    const userIdInput = screen.getByRole("textbox", { name: /user id/i });
    const amountInput = screen.getByRole("spinbutton", { name: /amount/i });
    const saveButton = screen.getByRole("button", { name: /save/i });

    fireEvent.change(userIdInput, { target: { value: "validUser123" } });
    fireEvent.change(amountInput, { target: { value: "100" } });

    expect(saveButton).not.toBeDisabled();
  });

  it("should reset form after successful submission", () => {
    renderWithTheme(
      <TransactionModal
        open={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />,
    );

    const userIdInput = screen.getByRole("textbox", { name: /user id/i });
    const amountInput = screen.getByRole("spinbutton", { name: /amount/i });
    const saveButton = screen.getByRole("button", { name: /save/i });

    fireEvent.change(userIdInput, { target: { value: "validUser123" } });
    fireEvent.change(amountInput, { target: { value: "100" } });
    fireEvent.click(saveButton);

    expect(userIdInput).toHaveValue("");
    expect(amountInput).toHaveValue(0);
  });
});
