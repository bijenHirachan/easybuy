import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import store from "./redux/store";
import { Provider } from "react-redux";

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
    <Provider store={store}>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: {
            duration: 3000,
            position: "top",
            isClosable: true,
            variant: "left-accent",
          },
        }}
      >
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
