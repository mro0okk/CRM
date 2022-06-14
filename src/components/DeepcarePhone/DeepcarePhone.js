import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Typography } from "antd";
import cn from "classnames";
import {
  changeStatus,
  makeCall,
  resetState,
} from "../../ducks/slices/callSlice";
import phone from "./DeepcarePhone.module.less";
import { HLog } from "../../helpers";
import {
  AudioMutedOutlined,
  DeleteFilled,
  PhoneOutlined,
} from "@ant-design/icons";
import { phoneStatus } from "../../constants/phoneStatus";
import i18n, { languageKeys } from "../../i18n";
import { DeleteNumber } from "../../assets/svgs";

const { Title, Text } = Typography;

const DeepcarePhone = () => {

  const [display, setDisplay] = useState("");
  const [mute, setMute] = useState(false);

  const {status,duration} = useSelector(state => state.call)

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setDisplay("");
    };
  }, []);

  // gọi đi
  const handleCall = (phoneNumber) => {
    HLog("PHONE_NUMBER", phoneNumber);
    dispatch(makeCall(phoneNumber));
  };

  // Dừng cuộc gọi lập tức
  const handleCancelCall = () => {
    window.omiSDK.stopCall();
    dispatch(resetState())
    setDisplay("")
  };
  // bật tắt mic trong cuộc gọi
  const handleToggleMute = () => {
    window.omiSDK.toggleMute(!mute);
    setMute(!mute);
  };

  // Xóa số trên màn hình
  const handleDel = () => {
    setDisplay(display.slice(0, display.length - 1));
  };
  HLog("TRANG_THAI_CUOC_GOI", status);
  const actionPhoneBtn = (status) => {
    switch (status) {
      case phoneStatus.connecting:
        return (
          <Calling
            onCancel={handleCancelCall}
            toggleMute={handleToggleMute}
            mute={mute}
          />
        );
      case phoneStatus.on_call:
        return (
          <Calling
            onCancel={handleCancelCall}
            toggleMute={handleToggleMute}
            mute={mute}
          />
        );
      case phoneStatus.ringing:
        return (
          <Calling
            onCancel={handleCancelCall}
            toggleMute={handleToggleMute}
            mute={mute}
          />
        );
      case phoneStatus.end_call:
        return (
          <EndCall
            onCancel={handleCancelCall}
            onCallback={handleCall(display)}
            mute={mute}
          />
        );

      default:
        return <></>;
    }
  };
useEffect(() => {
  HLog("WINDOWSDK",window.omiSDK.getStatus())
})
  return (
    <div className={phone["container"]}>
      <div className={phone["display"]}>
        <Input
          value={display}
          onChange={(e) => setDisplay(e.target.value)}
          className={phone["call-input"]}
          onPressEnter={(e) => handleCall(e.target.value)}
          readOnly={status !== phoneStatus.available}
          pattern={new RegExp(/[^\d]/g)}
        />
        <h2 className={phone["text-zone"]}>
          {status === phoneStatus.connecting &&
            i18n.t(languageKeys.phone_dang_goi)}
          {status === phoneStatus.ringing &&
            i18n.t(languageKeys.phone_dang_do_chuong)}
            {
              status === phoneStatus.on_call && (
                <div>{duration}</div>
              )
            }
        </h2>
      </div>
      <div className={phone["keypad"]}>
        {status === phoneStatus.available && (
          <NumPad onDisplay={setDisplay} display={display} />
        )}
      </div>
      <div className={phone["btn-wrapper"]}>
        {status === phoneStatus.available && (
          <Dialling
            onCall={() => handleCall(display)}
            onDelete={() => handleDel()}
          />
        )}
        {actionPhoneBtn(status)}
      </div>
    </div>
  );
};

export default DeepcarePhone;

const NumPad = ({ onDisplay = () => {}, display }) => {
  const keypadKeys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "0",
    "#",
  ];

  const handleClickNum = (number) => {
    onDisplay(display.concat(number));
  };

  return (
    <div className={phone["numpad"]}>
      {keypadKeys.map((key) => {
        return (
          <Button
            key={key}
            className={phone["num"]}
            onClick={(e) => handleClickNum(key)}
          >
            <Title level={3}>{key}</Title>
          </Button>
        );
      })}
    </div>
  );
};

const Dialling = ({ onCall, onDelete = () => {} }) => {
  return (
    <div
      style={{
        marginLeft: 34,
      }}
    >
      <Button
        type="primary"
        shape="circle"
        className={phone["btn-call"]}
        onClick={() => onCall()}
      >
        <PhoneOutlined className={phone["icon-call"]} />
      </Button>
      <Button className={phone["btn-del"]} onClick={() => onDelete()}>
        <DeleteNumber />
      </Button>
    </div>
  );
};

const Calling = ({
  onCancel = () => {},
  toggleMute = () => {},
  mute = false,
}) => {
  return (
    <div className={phone["calling"]}>
      <Button
        onClick={() => toggleMute()}
        className={cn(phone["btn-size"], mute && phone["danger-btn"])}
        shape="circle"
        type="primary"
      >
        <AudioMutedOutlined className={phone["icon-phone"]} />
      </Button>
      <Button
        shape="circle"
        type="primary"
        className={phone["danger-btn"]}
        onClick={() => onCancel()}
      >
        <PhoneOutlined
          className={cn(phone["icon-phone"], phone["call-hangout"])}
        />
      </Button>
    </div>
  );
};
const EndCall = ({ onCancel = () => {}, onCallback = () => {} }) => {
  return (
    <div className={phone["calling"]}>
      <Button
        onClick={() => onCancel()}
        className={phone["btn-size"]}
        shape="circle"
        type="primary"
      >
        CANCEL
      </Button>
      <Button shape="circle" type="primary" onClick={() => onCallback()}>
        <PhoneOutlined
          className={cn(phone["icon-phone"], phone["call-hangout"])}
        />
      </Button>
    </div>
  );
};
