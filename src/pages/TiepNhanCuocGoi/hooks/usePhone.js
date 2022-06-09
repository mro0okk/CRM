import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../../ducks/slices/callSlice";
import { phoneStatus } from "../../../constants/phoneStatus";
import { HLog } from "../../../helpers";
let omiSDK = window.omiSDK;

const usePhone = (register /*: object*/) => {
  const dispatch = useDispatch();

  const phoneConfig ={
      theme: "",
      ringtoneVolume: 1,
      busy: false,
      language: "vi",
      options: {
        hideCallButton: false,
        showContactLoading: false,
      },
      callbacks: {
        register: async (data) => {
          (await omiSDK.getStatus()) === "registered" &&
            dispatch(changeStatus({ status: phoneStatus.available }));
        },
        connecting: (data) => {
          dispatch(changeStatus({ status: phoneStatus.connecting }));
        },
        invite: (data) => {
          dispatch(
            changeStatus({ status: phoneStatus.invite, phone: data?.phone })
          );
        },
        ringing: (data) => {
          dispatch(changeStatus({ status: phoneStatus.ringing }));
        },
        accepted: (data) => {
          dispatch(changeStatus({ status: phoneStatus.on_call }));
        },
        incall: (data) => {
          // dispatch(durationing({duration:data.duration}))
        },
        acceptedByOther: (data) => {},
        ended: (data) => {
          console.log("on ended: ", data);
          dispatch(
            changeStatus({
              status: phoneStatus.end_call,
              reason: data?.endCause,
            })
          );
        },
        holdChanged: (status) => {},
      },
    };

  useEffect(() => {
    omiSDK.init(phoneConfig, (e) => {
      omiSDK.register({
        domain: register.domain,
        username: register.username,
        password: register.password,
      });
    });
    return () => {
      omiSDK.unregister();
      dispatch(changeStatus(phoneStatus.offline));
      HLog("logout phone!");
    };
  }, []);
};

export default usePhone;
