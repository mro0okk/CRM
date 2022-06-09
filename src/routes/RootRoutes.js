import { HashRouter, Switch, Route } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { MainRoutes } from "./MainRoutes";
import { paths } from "../constants";
import { NoMatch } from "../pages";
import { PrivateRoute, PublicRoute } from "./ConfigRoutes";

export const RootRoutes = () => {
  return (
    <HashRouter>
      <Switch>
        <PublicRoute path={paths.auth} component={AuthRoutes} />
        <PrivateRoute path={paths.main} component={MainRoutes} />
        <Route component={NoMatch} />
      </Switch>
    </HashRouter>
  );
};
