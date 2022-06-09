import { takeLatest, call, put } from "redux-saga/effects";
import { keys } from "../../constants";
import apis from "../../constants/apis";
// import apis from "../../constants/apis";
// import { apis, keys } from "../../constants";
// import { keys, apis } from "../../constants";
import { common_post, HLog, localRemove, localSet } from "../../helpers";
import { authFail, authSuccess, doLogin, doLogout } from "../slices/authSlice";

export function* watchDoAuth() {
  yield takeLatest(doLogin.type, handleLogin);
  yield takeLatest(doLogout.type, handleLogout);
}

export function* handleLogin(action) {
  HLog("Call handle login", action);

  try {
    const response = yield call(() =>
      common_post(apis.login, action.payload, false)
    );

    HLog("Login response", response);

    if (!!response && response.status === "OK") {
      const { token, user, partner_code, expires } = response;

      localSet(keys.access_token, token);
      localSet(keys.user_data, {
        ...user,
        partner_code,
      });
      localSet(keys.expire_in, expires);

      yield put(
        authSuccess({
          isOk: true,
          user: { ...user, partner_code },
        })
      );
    } else {
      yield put(
        authFail({
          isOk: false,
          message: "Login Fail",
          user: undefined,
        })
      );
    }
  } catch (error) {
    HLog("Login Error", error);

    yield put(
      authFail({
        isOk: false,
        message: "Login Error",
        user: undefined,
      })
    );
  }
}

export function* handleLogout() {
  yield localRemove(keys.access_token);
  yield localRemove(keys.user_data);
  yield localRemove(keys.expire_in);

  window.location.reload();
}
