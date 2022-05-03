import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  RouteProps,
  Navigate,
  useParams,
} from "react-router-dom";
import ExplorePage from "./explore/ExplorePage";
import ExploreFolderPage from "./explore/ExploreFolderPage";
import AuthCodeRoute from "./AuthCodeRoute";
import ErrorPage from "./common/ErrorPage";
import { useCurrentExperience } from "./common/services/hooks/api";
import LoadingPage from "./common/LoadingPage";
import { isAuthAvailable } from "./common/services/apiUtils";
import { useDebounce } from "./common/hooks";
import ControlsPage from "./controls/ControlsPage";
import { hasControls } from "./controls/util";
import {
  useControlsClient,
  useControlsClientStatus,
} from "@footron/controls-client";

const RequireApi = ({
  children,
}: {
  children?: JSX.Element;
} & RouteProps): JSX.Element => {
  // Based on https://reactrouter.com/web/example/auth-workflow

  // TODO: Decide if we want to create a route for authentication specifically
  //  instead of relying on 401 responses from the API. They're cached though,
  //  which is nice.
  const { status: apiStatus, error } = useDebounce(
    useCurrentExperience(["status", "error"]),
    100
  );

  const controlsClient = useControlsClient();
  const controlsClientStatus = useControlsClientStatus(controlsClient);

  if (apiStatus == "loading") {
    return <LoadingPage />;
  }

  // We don't handle loading state because ControlsView does,
  // but a "closed" state in the controls client is unrecoverable and
  // usually means we were deauthed--so we'll need to scan again anyway
  if (apiStatus == "error" || controlsClientStatus == "closed") {
    // TODO: Break out (and clean up) this logic
    let title = "An error occurred";
    let description: string | ReactNode = "And we don't know what to do :(";

    if (
      (error?.response?.status && [401, 403].includes(error.response.status)) ||
      controlsClientStatus == "closed"
    ) {
      const hadAuth = isAuthAvailable();
      title = hadAuth ? "Disconnected" : "Not connected";
      description = hadAuth
        ? "Scan again to reconnect."
        : "Scan the display to connect.";
    }

    return <ErrorPage title={title} description={description} />;
  }

  return children as JSX.Element;
};

const ControlsRoute = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  if (!hasControls(id as string)) {
    return <Navigate to="/" />;
  }

  return <ControlsPage />;
};

function FootronControlsRoutes(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/c/:code" element={<AuthCodeRoute />} />
        <Route
          path="/"
          element={
            <RequireApi>
              <ExplorePage />
            </RequireApi>
          }
        />
        <Route
          path="/explore/:id"
          element={
            <RequireApi>
              <ExploreFolderPage />
            </RequireApi>
          }
        />
        <Route
          path="/controls/:id"
          element={
            <RequireApi>
              <ControlsRoute />
            </RequireApi>
          }
        />
        <Route
          path="*"
          element={
            <ErrorPage
              title={"Error 404"}
              description={
                <span>
                  We couldn&lsquo;t find that page.
                  <br />
                  <Link to="/">Go back home?</Link>
                </span>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default FootronControlsRoutes;
