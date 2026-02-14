import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import BalanceCard from "./BalanceCard";

import api from "src/services/api";

vi.mock("src/services/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedApiGet = vi.mocked(api.get);

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      const translations: Record<string, string> = {
        currentBalance: "Current Balance",
        balanceValue: options ? `$ ${options.value}` : "$ 0.00",
        unavailableBalance: "Balance Unavailable",
        unavailableBalanceDescription: "Unable to load balance",
        "format.decimal": "en-US",
      };
      return translations[key] || key;
    },
  }),
}));

describe("BalanceCard Component", () => {
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
    render(<BalanceCard />);
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("should load and display balance successfully", async () => {
    mockedApiGet.mockResolvedValueOnce({
      data: { amount: 1500.5 },
    });

    render(<BalanceCard />);

    await waitFor(() => {
      expect(screen.getByText("Current Balance")).toBeInTheDocument();
    });

    expect(screen.getByText(/\$/)).toBeInTheDocument();
    expect(mockedApiGet).toHaveBeenCalledWith("/api/balance");
  });

  it("should display zero balance when amount is not present", async () => {
    mockedApiGet.mockResolvedValueOnce({
      data: {},
    });

    render(<BalanceCard />);

    await waitFor(() => {
      expect(screen.getByText(/0.00/)).toBeInTheDocument();
    });
  });

  it("should show error message when request fails", async () => {
    mockedApiGet.mockRejectedValueOnce(new Error("Network error"));

    render(<BalanceCard />);

    await waitFor(() => {
      expect(screen.getByText("Balance Unavailable")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Unable to load balance")).toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error when loading balance");
  });

  it("should reload balance when refreshTrigger changes", async () => {
    mockedApiGet.mockResolvedValue({
      data: { amount: 1000 },
    });

    const { rerender } = render(<BalanceCard refreshTrigger={0} />);

    await waitFor(() => {
      expect(mockedApiGet).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText("Current Balance")).toBeInTheDocument();
    });

    rerender(<BalanceCard refreshTrigger={1} />);

    await waitFor(() => {
      expect(mockedApiGet).toHaveBeenCalledTimes(2);
    });
  });

  it("should correctly format negative values", async () => {
    mockedApiGet.mockResolvedValueOnce({
      data: { amount: -500.75 },
    });

    render(<BalanceCard />);

    await waitFor(() => {
      expect(screen.getByText(/-500.75/)).toBeInTheDocument();
    });
  });

  it("should reset error state before new request", async () => {
    mockedApiGet.mockRejectedValueOnce(new Error("Network error"));

    const { rerender } = render(<BalanceCard refreshTrigger={0} />);

    await waitFor(() => {
      expect(screen.getByText("Balance Unavailable")).toBeInTheDocument();
    });

    mockedApiGet.mockResolvedValueOnce({
      data: { amount: 2000 },
    });

    rerender(<BalanceCard refreshTrigger={1} />);

    await waitFor(() => {
      expect(screen.queryByText("Balance Unavailable")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/2,000.00/)).toBeInTheDocument();
    });
  });
});
