import { createSlice } from "@reduxjs/toolkit";
import { phoneStatus } from "../../constants/phoneStatus";
import { HLog } from "../../helpers";
const initState = {
  status: phoneStatus.offline,
  phoneNumber: "",
  client: {},
  reasonCall: "",
};
const callSlice = createSlice({
  name: "call",
  initialState: initState,
  reducers: {
    changeStatus: (state, { payload }) => {
      HLog("New Status: ", payload);
      state.status = payload.status;
      payload?.phone && (state.phoneNumber = payload.phone);
      state.reasonCall = payload?.reason;
    },
    addPhone: (state, { payload }) => {},
    makeCall: (state, action) => {
      HLog(action.payload);
      window.omiSDK.makeCall(action.payload);
      state.status = phoneStatus.connecting;
    },
    acceptCall: (state, action) => {
      HLog(action.payload);
      window.omiSDK.acceptCall();
      state.status = phoneStatus.on_call;
    },
    onCall: (state, { payload }) => {
      console.log("on call:::::", payload);
      state.callInfo = { ...state.callInfo, duration: payload };
    },
    durationing: (state, { payload }) => {
      console.log("duration: ", payload);
    },
  },
});

export const {
  changeStatus,
  makeCall,
  rejectCall,
  acceptCall,
  stopCall,
  addPhone,
  onCall,
  durationing,
} = callSlice.actions;

export default callSlice.reducer;
