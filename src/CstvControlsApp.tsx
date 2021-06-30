import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import CstvControlsRoutes from "./CstvControlsRoutes";

const queryClient = new QueryClient();

function CstvControlsApp(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <CstvControlsRoutes />
    </QueryClientProvider>
  );
}

export default CstvControlsApp;
