//NPM Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

//Local Imports
import RootStoreProvider from "./providers/RootStoreProvider";
import theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} cssVarsRoot={undefined}>
        <RootStoreProvider>
          <h1>Hello World!</h1>
          <p>My First App</p>
        </RootStoreProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.Fragment>
);
