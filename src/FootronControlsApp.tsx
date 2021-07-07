import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import FootronControlsRoutes from "./FootronControlsRoutes";

const queryClient = new QueryClient();

function FootronControlsApp(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <FootronControlsRoutes />
    </QueryClientProvider>
  );
}

export default FootronControlsApp;
