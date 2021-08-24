import React, { useEffect } from "react";
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

const theme = createTheme({
  palette: {
    primary: {
      main: "#001E4C",
      light: "#092b87",
      dark: "#011221",
    },
  },
});

const ControlsView = ({ id }: { id: string }): JSX.Element => {
  const { data: currentExperience } = useCurrentExperience();
  const { mutate: mutateCurrentExperience } = useCurrentExperienceMutation();
  const controlsClient = useControlsClient();
  const status = useControlsClientStatus(controlsClient);

  useEffect(() => {
    if (!currentExperience || id === currentExperience.id) {
      // If ID and currentExperience.id are the same, there's no need to request
      // a new app
      return;
    }

    mutateCurrentExperience(id);
  }, [id, controlsClient, currentExperience, mutateCurrentExperience]);

  useEffect(() => {
    if (!controlsClient) {
      return;
    }

    controlsClient.unpause();
    return () => {
      controlsClient.pause();
    };
  }, [controlsClient]);

  const ControlsComponent = controls.get(id) as () => JSX.Element;

  // TODO: Make ErrorBoundary fallback less annoying and vague--tell the user
  //  what's going on or jump ahead or something
  return (
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
  );
};

export default ControlsView;
