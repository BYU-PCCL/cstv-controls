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
import LoadingPage from "../common/LoadingPage";

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
    if (
      !currentExperience ||
      !controlsClient ||
      controlsClient.getClientAppId() == id
    ) {
      return;
    }

    controlsClient.setApp(id);

    if (id === currentExperience.id) {
      // If ID and currentExperience.id are the same, there's no need to request
      // a new app
      return;
    }

    mutateCurrentExperience(id);
  }, [id, controlsClient, currentExperience, mutateCurrentExperience]);

  useEffect(() => {
    controlsClient.unpause();
    return () => {
      controlsClient.pause();
    };
  }, [controlsClient]);

  const ControlsComponent = controls.get(id) as () => JSX.Element;

  return controlsClient ? (
    <StaticPrefixProvider prefix={`/static/${id}`}>
      <ThemeProvider theme={theme}>
        {status == "open" ? <ControlsComponent /> : <CenteredSpinner />}
      </ThemeProvider>
    </StaticPrefixProvider>
  ) : (
    <LoadingPage />
  );
};

export default ControlsView;
