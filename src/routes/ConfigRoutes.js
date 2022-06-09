import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { keys, paths } from "../constants";
import { authSuccess, doLogout } from "../ducks/slices/authSlice";
import { HLog, isEmptyObject, isJsonString, localGet } from "../helpers";

export const PublicRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.auth);

  let isAuth = localGet(keys.access_token) !== "";

  HLog("PublicRoute isAuth", isAuth, authReducer);

  if (isAuth) {
    //kiểm tra nếu store chưa lưu user thì thực hiện lấy user profile ra và đẩy xuống store
    let { user } = authReducer;

    HLog("PublicRoute user", user);

    if (!user || isEmptyObject(user)) {
      let strProfile = localStorage.getItem(keys.user_data);

      //kiểm tra user có được lưu trước đó hay không
      if (!!strProfile && strProfile !== "" && isJsonString(strProfile)) {
        let dataProfile = JSON.parse(strProfile);
        dispatch(authSuccess({ user: dataProfile }));
      } else dispatch(doLogout());
    }
  }

  // XOÁ DÒNG DƯỚI ĐI KHI TÍCH HỢP LOGIN
  isAuth = false; // né check auth khi truy cập đến route

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to={paths.main} /> : <Component {...props} />
      }
    />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.auth);

  let isAuth = localGet(keys.access_token) !== "";

  HLog("PrivateRoute isAuth", isAuth, authReducer);

  if (isAuth) {
    //kiểm tra nếu store chưa lưu user thì thực hiện lấy user profile ra và đẩy xuống store
    let { user } = authReducer;

    if (!user || isEmptyObject(user)) {
      let strProfile = localStorage.getItem(keys.user_data);

      //kiểm tra user có được lưu trước đó hay không
      if (!!strProfile && strProfile !== "" && isJsonString(strProfile)) {
        let dataProfile = JSON.parse(strProfile);
        dispatch(authSuccess({ user: dataProfile }));
      } else dispatch(doLogout());
    }
  }

  // XOÁ DÒNG DƯỚI ĐI KHI TÍCH HỢP LOGIN
  isAuth = true; // né check auth khi truy cập đến route

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to={paths.auth} />
      }
    />
  );
};
