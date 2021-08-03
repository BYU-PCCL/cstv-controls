import React, { ReactNode, useEffect, useState } from "react";
import {
  ControlsClient,
  ControlsClientProvider,
} from "@footron/controls-client";
import { useAuthCode } from "./common/services/hooks/api";

function FootronControlsClientProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [controlsClient, setControlsClient] = useState<
    ControlsClient | undefined
  >();
  const { data: authCode } = useAuthCode();

  useEffect(() => {
    if (!authCode) {
      return;
    }

    setControlsClient(
      new ControlsClient(
        process.env.REACT_APP_MESSAGING_BASE_URL ||
          "ws://localhost:8088/messaging/in/",
        authCode
      )
    );
  }, [authCode, setControlsClient]);

  return (
    <ControlsClientProvider client={controlsClient}>
      {children}
    </ControlsClientProvider>
  );
}

export default FootronControlsClientProvider;
