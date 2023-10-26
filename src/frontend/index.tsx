//NPM Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
//Local Imports
import "./index.css";
import RootStoreProvider from "./providers/RootStoreProvider";
import App from "./components/App";
import "primereact/resources/themes/saga-blue/theme.css";

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
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
          </HashRouter>
        </RootStoreProvider>
      </QueryClientProvider>
    </PrimeReactProvider>
  </React.Fragment>
);
