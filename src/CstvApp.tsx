import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ExplorePage from "./explore/ExplorePage";
import AuthCodeRoute from "./AuthCodeRoute";

const queryClient = new QueryClient();

function CstvApp(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <ExplorePage />
          </Route>
          <Route exact path="/c/:code">
            <AuthCodeRoute />
          </Route>
          <Route path="*">404 nothing here :(</Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default CstvApp;
