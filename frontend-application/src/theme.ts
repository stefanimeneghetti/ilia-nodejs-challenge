import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    transaction: {
      credit: {
        main: string;
        light: string;
        dark: string;
        bg: string;
      };
      debit: {
        main: string;
        light: string;
        dark: string;
        bg: string;
      };
    };
  }
  interface PaletteOptions {
    transaction?: {
      credit?: {
        main?: string;
        light?: string;
        dark?: string;
        bg?: string;
      };
      debit?: {
        main?: string;
        light?: string;
        dark?: string;
        bg?: string;
      };
    };
  }
}

export const theme = createTheme({
  palette: {
    transaction: {
      credit: {
        main: "#2e7d32",
        light: "#4caf50",
        dark: "#1b5e20",
        bg: "#e6f7e6",
      },
      debit: {
        main: "#c62828",
        light: "#ef5350",
        dark: "#b71c1c",
        bg: "#ffebee",
      },
    },
  },
});
