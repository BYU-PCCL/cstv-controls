import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import FootronControlsRoutes from "./FootronControlsRoutes";
import FootronControlsClientProvider from "./FootronControlsClientProvider";

const queryClient = new QueryClient();

function FootronControlsApp(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <FootronControlsClientProvider>
        <FootronControlsRoutes />
      </FootronControlsClientProvider>
    </QueryClientProvider>
  );
}

export default FootronControlsApp;
