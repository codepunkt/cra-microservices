import React from "react";
import { createBrowserHistory, History } from "history";
import { Router } from "react-router-dom";

type AppProps = {
  history?: History;
};

export const App: React.FC<AppProps> = ({
  history = createBrowserHistory(),
}) => {
  return (
    <Router history={history}>
      <h2>Remote A</h2>
    </Router>
  );
};
