import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { acceptCall, changeStatus, durationing, endCall } from "../../../ducks/slices/callSlice";
import { phoneStatus } from "../../../constants/phoneStatus";
import { HLog } from "../../../helpers";
import { notification } from "antd";
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
    debug:true,
    callbacks: {
      register: async (data) => {
        (await omiSDK.getStatus()) === "registered" &&
          dispatch(changeStatus({ status: phoneStatus.available }));
      },
      connecting: (data) => {
        HLog("CONNECTING:::::", data);
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
            pickup:true,
          })
        );

      },
      incall: (data) => {
        dispatch(durationing({ duration: data?.durationTxt }));
      },

      acceptedByOther: (data) => {
        console.log("acceptByOther::::",data)
        notification.warn({
          message:"Cuộc gọi đã nhận bởi người khác",
        })
      },
      inviteRejected: (data) => {
        // Sự kiện xảy ra khi có cuộc gọi tới, nhưng bị tự động từ chối
        // trong khi đang diễn ra một cuộc gọi khác
        console.log("inviteRejected:", data);
      },
      ended: (data) => {
        console.log("on ended: ", data);
        dispatch(
          changeStatus({
            status: phoneStatus.end_call,
            reason: data?.endCause,
            phone: data.phone,
            pickup:false,
          })

        );
        // dispatch(
        //   endCall({...data})
        // )
        
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
