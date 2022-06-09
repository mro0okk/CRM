import { useState } from "react";
import { Button, Typography } from "antd";
import {
  PhoneOutlined,
  AudioMutedOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import phoneStyle from "./PhoneModal.module.less";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, makeCall } from "../../../../ducks/slices/callSlice";
import { phoneStatus } from "../../../../constants/phoneStatus";
import { formatPhoneNumber } from "../../../../helpers";
import i18n, { languageKeys } from "../../../../i18n";
const { Text, Title } = Typography;
function Goidi() {
  const [callee, setCallee] = useState("0338305136");
  const dispatch = useDispatch();
  const { reasonCall, status } = useSelector((s) => s.call);
  const [mute, setMute] = useState(false);
  const handleMuteCall = () => {
    setMute(!mute);
    window.omiSDK.toggleMute(!mute);
  };
  const handleCancelCall = () => {
    window.omiSDK.stopCall();
    dispatch(changeStatus(phoneStatus.end_call));
  };
  const handleCall = (callee) => {
    dispatch(makeCall(callee));
  };
  const handleCancel = () => {
    dispatch(changeStatus(phoneStatus.available));
  };
  const OnCall = () => {
    return (
      <div className={phoneStyle['callout']}>
        <div className={phoneStyle['btnWrapper']} style={{ left: "2rem" }}>
          <Button
            type="primary"
            ghost
            style={{ width: "62px", height: "62px" }}
            shape="circle"
            icon={<AudioMutedOutlined style={{ fontSize: "1.6rem" }} />}
            size="large"
            onClick={handleMuteCall}
          />
          <Text>{i18n.t(languageKeys.common_tat_tieng)}</Text>
        </div>

        <div className={phoneStyle['btnWrapper']} style={{ right: "2rem" }}>
          <Button
            type="primary"
            className={phoneStyle.danger}
            style={{ width: "62px", height: "62px" }}
            shape="circle"
            icon={
              <PhoneOutlined
                style={{ transform: " rotate(227deg)", fontSize: "1.6rem" }}
              />
            }
            size="large"
            onClick={handleCancelCall}
          />
          <Text>{i18n.t(languageKeys.common_ket_thuc)}</Text>
        </div>
      </div>
    );
  };
  const Onended = () => {
    return (
      <div className={phoneStyle['callout']}>
        <div className={phoneStyle['btnWrapper']} style={{ left: "2rem" }}>
          <Button
            type="primary"
            ghost
            style={{
              width: "62px",
              height: "62px",
              color: "white",
              background: "#f34946",
              border: "none",
            }}
            shape="circle"
            icon={<CloseOutlined style={{ fontSize: "1.6rem" }} />}
            size="large"
            onClick={handleCancel}
          />
          <Text>Hủy</Text>
        </div>

        <div className={phoneStyle['btnWrapper']} style={{ right: "2rem" }}>
          <Button
            type="primary"
            className={phoneStyle['callAgain']}
            style={{ width: "62px", height: "62px" }}
            shape="circle"
            icon={
              <PhoneOutlined
                style={{ transform: " rotate(227deg)", fontSize: "1.6rem" }}
              />
            }
            onClick={() => handleCall(callee)}
            size="large"
          />
          <Text>Gọi lại</Text>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={phoneStyle.display}>
        <Title style={{ fontWeight: "700" }}>{formatPhoneNumber(callee)}</Title>
        <h3 style={{ margin: 0 }}>
          {status === phoneStatus.end_call && reasonCall}
        </h3>
        <div>
          {(status === phoneStatus.ringing ||
            status === phoneStatus.connecting ||
            status === phoneStatus.on_call) && <OnCall />}
          {status === phoneStatus.end_call && <Onended />}
        </div>
      </div>
    </>
  );
}

export default Goidi;
