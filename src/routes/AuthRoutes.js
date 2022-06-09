import { Switch, Route, Redirect } from "react-router-dom";
import { paths } from "../constants";
import { Login, NoMatch } from "../pages";

export const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path={paths.dang_nhap} component={Login} />
      <Redirect exact from={paths.auth} to={paths.dang_nhap} />
      <Route component={NoMatch} />
    </Switch>
  );
};
