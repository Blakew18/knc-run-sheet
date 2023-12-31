//NPM Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

//CSS Imports
import "./index.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primereact/resources/themes/saga-blue/theme.css";

//Local Imports
import RootStoreProvider from "./providers/RootStoreProvider";
import App from "./components/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
  <React.Fragment>
    <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
      <QueryClientProvider client={queryClient}>
        <RootStoreProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </RootStoreProvider>
      </QueryClientProvider>
    </PrimeReactProvider>
  </React.Fragment>
);
