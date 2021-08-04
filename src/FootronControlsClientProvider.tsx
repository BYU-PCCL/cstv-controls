import React, { ReactNode, useEffect, useState } from "react";
import {
  ControlsClient,
  ControlsClientProvider,
} from "@footron/controls-client";
import { useAuthCode, useCurrentExperience } from "./common/services/hooks/api";
import controls from "./controls/generated";
import { hasControls } from "./controls/util";

function FootronControlsClientProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [controlsClient, setControlsClient] = useState<
    ControlsClient | undefined
  >();
  const [lastApp, setLastApp] = useState<string | undefined>();
  const { data: authCode } = useAuthCode();
  const { data: currentExperience } = useCurrentExperience();

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

  useEffect(() => {
    if (
      !controlsClient ||
      !currentExperience ||
      currentExperience.id === lastApp
    ) {
      return;
    }

    controlsClient.setApp(
      hasControls(currentExperience.id) ? currentExperience.id : null
    );
    setLastApp(currentExperience.id);
  }, [currentExperience, controlsClient]);

  return (
    <ControlsClientProvider client={controlsClient}>
      {children}
    </ControlsClientProvider>
  );
}

export default FootronControlsClientProvider;
