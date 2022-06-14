import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { changeStatus, durationing } from "../../../ducks/slices/callSlice";
import { phoneStatus } from "../../../constants/phoneStatus";
import { HLog } from "../../../helpers";
let omiSDK = window.omiSDK;

const usePhone = (register /*: object*/) => {
  const dispatch = useDispatch();

  const phoneConfig = {
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
        HLog("DATA_", data);
        dispatch(
          changeStatus({ status: phoneStatus.connecting, callee: data.phone })
        );
      },
      invite: (data) => {
        HLog("DATA_INVITE:::", data);
        dispatch(
          changeStatus({
            status: phoneStatus.invite,
            phone: data.phone,
            client: {
              remoteName: data.remoteName,
            },
          })
        );
      },
      ringing: (data) => {
        dispatch(changeStatus({ status: phoneStatus.ringing }));
      },
      accepted: (data) => {
        HLog("ACCEPT_CALL:::", data);
        dispatch(
          changeStatus({
            status: phoneStatus.on_call,
            client: {
              number: data.phone,
              direction: data.directionTxt,
              remoteName: data.remoteName,
            },
          })
        );
      },
      incall: (data) => {
        dispatch(durationing({ duration: data?.durationTxt }));
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
      HLog("phoneConfig", register);
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
