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
  const [controlsClient, setControlsClient] = useState<ControlsClient>();
  const { data: authCode } = useAuthCode();

  useEffect(() => {
    setControlsClient(
      new ControlsClient(
        process.env.REACT_APP_MESSAGING_BASE_URL ||
          "ws://localhost:8088/messaging/in/",
        authCode
      )
    );
  }, [authCode, setControlsClient]);

  // TODO(vinhowe): It feels kind of hacky to show a loading page here. A more
  //  granular pattern for handling the lack of a controls client would be
  //  better. It doesn't matter in practice because we just use no auth code
  //  assuming that we're in dev mode. This also feels the wrong way to do it.
  //  We'll be fine for now but this might be an easy issue to fix for someone
  //  new.
  return controlsClient ? (
    <ControlsClientProvider client={controlsClient}>
      {children}
    </ControlsClientProvider>
  ) : (
    <div />
  );
}

export default FootronControlsClientProvider;
