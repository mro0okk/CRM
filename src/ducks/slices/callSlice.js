import { createSlice } from "@reduxjs/toolkit";
import { phoneStatus } from "../../constants/phoneStatus";
import { HLog } from "../../helpers";
const initState = {
  status: phoneStatus.offline,
  phoneNumber: "",
  callee:"",
  client:{},
  reasonCall: "",
  duration:"0:00",
};
const callSlice = createSlice({
  name: "call",
  initialState: initState,
  reducers: {
    changeStatus: (state, { payload }) => {
      HLog("PAYLOAD_STATUS",payload)
      state.status = payload.status;
      payload?.phone && (state.phoneNumber = payload.phone);
      state.reasonCall = payload?.reason;
      state.client = payload?.client;
    },
    addPhone: (state, { payload }) => {},
    makeCall: (state, action) => {
      HLog(action.payload);
      window.omiSDK.makeCall(action.payload);
      state.status = phoneStatus.connecting
      state.callee = action.payload
    },
    acceptCall: (state, {payload}) => {
      window.omiSDK.acceptCall();
      state.status = phoneStatus.on_call;
      state.client = payload
    },
    onCall: (state, { payload }) => {
      state.callInfo = { ...state.callInfo, duration: payload };
    },
    durationing: (state, { payload }) => {
      state.duration = payload.duration
    },
    rejectCall: (state,action) => {
      window.omiSDK.rejectCall()
      state.status = phoneStatus.rejected
      
    },
    // endCall:(state,action) => { 
    //     state.status = phoneStatus.end_call
    //  },
    resetState:(state,action) => {
      state.status = phoneStatus.available
      state.phoneNumber = ""
      state.clientName = ""
      state.reasonCall = ""
      state.duration = "0:00"
      state.callee = ""
    }
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
  resetState,
} = callSlice.actions;

export default callSlice.reducer;
