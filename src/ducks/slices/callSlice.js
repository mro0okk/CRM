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
  isAccepted:false,
  dataAfterCall:{},
  pickup:false,
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
      state.pickup = payload.pickup;

    },
    addPhone: (state, { payload }) => {},
    makeCall: (state, action) => {
      // window.omiSDK.makeCall(action.payload);
      state.status = phoneStatus.connecting
      state.phoneNumber = action.payload
    },
    acceptCall: (state, {payload}) => {
      state.status = phoneStatus.on_call;
      // state.client = payload
      state.pickup = true
    },
    // onCall: (state, { payload }) => {
    //   state.callInfo = { ...state.callInfo, duration: payload };
    // },
    durationing: (state, { payload }) => {
      state.duration = payload.duration
    },
    rejectCall: (state,action) => {
      // window.omiSDK.rejectCall()
      state.status = phoneStatus.rejected
      
    },
    endCall:(state,action) => { 
      HLog("ENDCALL_ACTION",action.payload)
        state.dataAfterCall = action.payload
        state.pickup = false
     },
    resetState:(state,action) => {
      HLog("REDUX_RESET_STATE")
      state.status = phoneStatus.available
      state.phoneNumber = ""
      state.clientName = ""
      state.reasonCall = ""
      state.duration = "0:00"
      state.callee = ""
      state.dataAfterCall={}
      state.pickup = false
    }
  },
});

export const {
  changeStatus,
  makeCall,
  rejectCall,
  acceptCall,
  dataAfterCall,
  addPhone,
  // onCall,
  durationing,
  resetState,
  endCall,
} = callSlice.actions;

export default callSlice.reducer;
