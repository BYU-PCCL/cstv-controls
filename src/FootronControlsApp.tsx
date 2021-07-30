import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import FootronControlsRoutes from "./FootronControlsRoutes";
import {
  ControlsClient,
  ControlsClientProvider,
} from "@footron/controls-client";

const queryClient = new QueryClient();
const controlsClient = new ControlsClient(
  "ws://localhost:8088/messaging/in/",
  "dev"
);

function FootronControlsApp(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ControlsClientProvider client={controlsClient}>
        <FootronControlsRoutes />
      </ControlsClientProvider>
    </QueryClientProvider>
  );
}

export default FootronControlsApp;
