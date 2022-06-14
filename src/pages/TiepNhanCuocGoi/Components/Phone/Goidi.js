import { useState } from "react";
import { Button, Typography } from "antd";
import {
  PhoneOutlined,
  AudioMutedOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import phoneStyle from "./PhoneModal.module.less";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, makeCall, resetState } from "../../../../ducks/slices/callSlice";
import { phoneStatus } from "../../../../constants/phoneStatus";
import { formatPhoneNumber, HLog } from "../../../../helpers";
import i18n, { languageKeys } from "../../../../i18n";
const { Text, Title } = Typography;
function Goidi() {
  const dispatch = useDispatch();
  const { reasonCall, status,phoneNumber,callee } = useSelector((s) => s.call);
  const [mute, setMute] = useState(false);
  const handleMuteCall = () => {
    setMute(!mute);
    window.omiSDK.toggleMute(!mute);
  };
  const handleCancelCall = () => {
    window.omiSDK.stopCall();
    dispatch(changeStatus(phoneStatus.end_call));
    dispatch(resetState())
  };
  const handleCall = () => {
    HLog("GOI_NHES")
    dispatch(makeCall(callee));
  };
  const handleCancel = () => {
    dispatch(resetState())
  };

  const OnCall = () => {
    return (
      <>
        <div className={phoneStyle["btnWrapper"]}
        >
          <Button
            type="primary"
            ghost
            className={`${phoneStyle["btn-calling"]} ${phoneStyle["call-btn"]}`}
            shape="circle"
            icon={<AudioMutedOutlined/>}
            size="large"
            onClick={handleMuteCall}
          />
          <Text>{i18n.t(languageKeys.common_tat_tieng)}</Text>
        </div>

        <div className={phoneStyle["btnWrapper"]}>
          <Button
            type="primary"
            className={`${phoneStyle.danger} ${phoneStyle["call-btn"]}`}
            shape="circle"
            icon={
              <PhoneOutlined
                className={phoneStyle["icon-callout"]}
              />
            }
            size="large"
            onClick={handleCancelCall}
          />
          <Text>{i18n.t(languageKeys.common_ket_thuc)}</Text>
        </div>
      </>
    );
  };
  const Onended = () => {
    return (
      <>
        <div className={phoneStyle["btnWrapper"]}>
          <Button
            type="primary"
            ghost
            className={`${phoneStyle["btn-calling"]} ${phoneStyle["call-btn"]}`}
            shape="circle"
            icon={<CloseOutlined/>}
            size="large"
            onClick={handleCancel}
          />
          <Text>{i18n.t(languageKeys.common_Huy)}</Text>
        </div>

        <div className={phoneStyle["btnWrapper"]}>
          <Button
            type="primary"
            className={phoneStyle["callAgain"]}
            shape="circle"
            icon={
              <PhoneOutlined
              className={phoneStyle['icon-callout']}
              />
            }
            onClick={() => handleCall(callee)}
            size="large"
          />
          <Text>{i18n.t(languageKeys.common_goi_lai)}</Text>
        </div>
      </>
    );
  };
  return (
    <>
      <div className={phoneStyle.display}>
        <Title style={{ fontWeight: "700" }}>{formatPhoneNumber(callee)}</Title>
        <h3 style={{ margin: 0 }}>
          {status === phoneStatus.end_call && reasonCall}
        </h3>
      </div>
      <div className={phoneStyle['numPad']}></div>
        <div className={phoneStyle['callout']}>
          {(status === phoneStatus.ringing ||
            status === phoneStatus.connecting ||
            status === phoneStatus.on_call) && <OnCall />}
          {status === phoneStatus.end_call && <Onended />}
        </div>
    </>
  );
}

export default Goidi;
