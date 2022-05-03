/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import {
  useControlsClient,
  StaticPrefixProvider,
  useControlsClientStatus,
} from "@footron/controls-client";
import {
  useCurrentExperience,
  useCurrentExperienceMutation,
} from "../common/services/hooks/api";
import controls from "./generated";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CenteredSpinner from "../common/CenteredSpinner";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#001E4C",
      light: "#092b87",
      dark: "#011221",
    },
  },
});

const controlsContainerStyle = css`
  // Height of more experiences button
  margin-bottom: 64px;
`;

const ControlsView = ({ id }: { id: string }): JSX.Element => {
  const { data: currentExperience } = useCurrentExperience();
  const { mutate: mutateCurrentExperience } = useCurrentExperienceMutation();
  const [attemptedInitialAppUpdate, setAttemptedInitialAppUpdate] =
    useState<boolean>(false);
  const controlsClient = useControlsClient();
  const status = useControlsClientStatus(controlsClient);
  const navigate = useNavigate();

  useEffect(() => {
    if (!controlsClient || attemptedInitialAppUpdate) {
      return;
    }

    if (controlsClient.getClientAppId() !== id) {
      controlsClient.setApp(id);
    }

    setAttemptedInitialAppUpdate(true);
  }, [controlsClient, attemptedInitialAppUpdate]);

  useEffect(() => {
    if (!controlsClient || !attemptedInitialAppUpdate) {
      return;
    }

    controlsClient.unpause();
    return () => {
      controlsClient.pause();
    };
  }, [controlsClient, attemptedInitialAppUpdate]);

  useEffect(() => {
    if (
      !currentExperience ||
      id === currentExperience.id ||
      !attemptedInitialAppUpdate
    ) {
      // If ID and currentExperience.id are the same, there's no need to request
      // a new app
      return;
    }

    // If controls client connection ID is current id, then we've already been
    // connected, which means that something else changed the ID. So we redirect
    // home.
    if (
      controlsClient &&
      (controlsClient.getClientAppId() !== id ||
        controlsClient.getConnectionAppId() === id)
    ) {
      navigate("/");
      return;
    }

    mutateCurrentExperience(id);
  }, [
    id,
    controlsClient,
    currentExperience,
    mutateCurrentExperience,
    attemptedInitialAppUpdate,
  ]);

  const ControlsComponent = controls.get(id) as () => JSX.Element;

  // TODO: Make ErrorBoundary fallback less annoying and vague--tell the user
  //  what's going on or jump ahead or something
  return (
    <div css={controlsContainerStyle}>
      <StaticPrefixProvider prefix={`/static/experiences/${id}`}>
        <ThemeProvider theme={theme}>
          {status == "open" && controlsClient ? (
            <ErrorBoundary fallback={<CenteredSpinner />}>
              <ControlsComponent />
            </ErrorBoundary>
          ) : (
            <CenteredSpinner />
          )}
        </ThemeProvider>
      </StaticPrefixProvider>
    </div>
  );
};

export default ControlsView;
