import { createSlice } from "@reduxjs/toolkit";
import { handleLogin, handleLogout } from "../sagas/authSagas";
const initState = {
  isOk: undefined,
  message: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    doLogin: (state, action) => {
      handleLogin(action.payload)
    },
    doLogout: (state, action) => { handleLogout() },

    authSuccess(state, action) {
      return action.payload;
    },

    authFail(state, action) {
      console.log(action.payload)
      return action.payload;
    },

    resetAuthMessage(state) {
      return { ...state, isOk: undefined, message: undefined };
    },
  },
});

export const { doLogin, doLogout, authSuccess, authFail } = authSlice.actions;

export default authSlice.reducer;
