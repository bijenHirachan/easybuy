import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      light: "#B49CFF",
      dark: "#8D72E1",
    },
    secondary: {
      light: "#805EE6",
      dark: "#523D94",
    },
    tertiary: {
      light: "#E0D772",
      dark: "#948B2E",
    },
    bright: "#F8F7FA",
    black100: "rgba(83, 78, 97, 1)",
    black75: "rgba(83, 78, 97, 0.75)",
    black50: "rgba(83, 78, 97, 0.5)",
    black25: "rgba(83, 78, 97, 0.25)",
    black10: "rgba(83, 78, 97, 0.10)",
    error: "#E04F4F",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
