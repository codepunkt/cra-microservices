import React from "react";
import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { MicroFrontend } from "../MicroFrontend/MicroFrontend";

const RemoteA: React.FC<RouteComponentProps> = ({ history }) => (
  <MicroFrontend
    history={history}
    host={process.env.REACT_APP_REMOTEA_HOST!}
    name="RemoteA"
  />
);

const RemoteB: React.FC<RouteComponentProps> = ({ history }) => (
  <MicroFrontend
    history={history}
    host={process.env.REACT_APP_REMOTEB_HOST!}
    name="RemoteB"
  />
);

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <h1>
          <Link to="/">Host</Link>
        </h1>
        <nav>
          <div>
            <Link to="/a">Remote A</Link>
          </div>
          <div>
            <Link to="/b">Remote B</Link>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/a" />} />
          <Route path="/a" component={RemoteA} />
          <Route path="/b" component={RemoteB} />
          {/* <Route exact path="/details/:id" component={Details} /> */}
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
