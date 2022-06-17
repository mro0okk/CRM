import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, notification, Typography } from "antd";
import cn from "classnames";
import {
  acceptCall,
  changeStatus,
  makeCall,
  resetState,
} from "../../ducks/slices/callSlice";
import phone from "./DeepcarePhone.module.less";
import { HLog, mobilevalidate } from "../../helpers";
import {
  AudioMutedOutlined,
  CloseOutlined,
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

  const { status, duration, phoneNumber, reasonCall } = useSelector(
    (state) => state.call
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setDisplay("");
    };
  }, []);

  // gọi đi
  const handleCall = (phoneNumber) => {
    if (mobilevalidate(phoneNumber)) {
      window.omiSDK.makeCall(phoneNumber);
      dispatch(makeCall(phoneNumber));
    } else {
      notification.warn({
        message: "Vui lòng nhập số điện thoại !",
      });
    }
  };

  // Dừng cuộc gọi lập tức
  const handleCancelCall = async () => {
    HLog("AN_ROi");
    await window.omiSDK.stopCall();
    dispatch(resetState());
    setDisplay("");
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
  const actionPhone = (status) => {
    switch (status) {
      case phoneStatus.connecting:
        return (
          <Calling
            onCancel={handleCancelCall}
            toggleMute={handleToggleMute}
            mute={mute}
            status={status}
          />
        );
      case phoneStatus.on_call:
        return (
          <Calling
            onCancel={handleCancelCall}
            toggleMute={handleToggleMute}
            mute={mute}
            status={status}
          />
        );
      case phoneStatus.invite:
        return (
          <Calling
            onCancel={handleCancelCall}
            toggleMute={handleToggleMute}
            mute={mute}
            status={status}
          />
        );
      case phoneStatus.ringing:
        return (
          <Calling
            onCancel={handleCancelCall}
            toggleMute={handleToggleMute}
            mute={mute}
            status={status}
          />
        );
      case phoneStatus.end_call:
        return (
          <EndCall
            onCancel={() => {
              setDisplay("");
              dispatch(resetState());
            }}
            onCallback={() => handleCall(display)}
            mute={mute}
          />
        );

      default:
        return (
          <Dialling
            onCall={() => handleCall(display)}
            setDisplay={handleSetDisplay}
            display={display}
            onDelete={handleDel}
          />
        );
    }
  };

  useEffect(() => {
    if (status === phoneStatus.invite || status === phoneStatus.end_call) {
      HLog("END_CALL", phoneNumber);
      setDisplay(phoneNumber);
    }
    HLog("STATUS_CUOC_GOI",status)
  }, [status]);
  // Số gọi đến
  const handleSetDisplay = (value) => {
    setDisplay(value);
  };
  return (
    <div className={phone["container"]}>
      <div className={phone["display"]}>
        <Input
          value={display}
          onChange={(e) => {
            let { value } = e.target;
            setDisplay(value);
          }}
          className={phone["call-input"]}
          onPressEnter={(e) => handleCall(e.target.value)}
          readOnly={status !== phoneStatus.available}
          autoFocus
        />
        <h2 className={phone["text-zone"]}>
          {status === phoneStatus.connecting &&
            i18n.t(languageKeys.phone_dang_goi)}
          {status === phoneStatus.ringing &&
            i18n.t(languageKeys.phone_dang_do_chuong)}
          {status === phoneStatus.on_call && <div>{duration}</div>}
          {status === phoneStatus.end_call && reasonCall}
        </h2>
      </div>

      <div className={phone["btn-wrapper"]}>{actionPhone(status)}</div>
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
    HLog("NUMBER", number);
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

const Dialling = ({
  onCall = () => {},
  onDelete = () => {},
  setDisplay = () => {},
  display = "",
}) => {
  return (
    <>
      <div className={phone["keypad"]}>
        <NumPad onDisplay={setDisplay} display={display} />
      </div>
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
    </>
  );
};

const Calling = ({
  onCancel = () => {},
  toggleMute = () => {},
  mute = false,
  status,
}) => {
  const dispatch = useDispatch();
  HLog("STATUS_CALLING", status);
  return (
    <>
      <div className={phone["keypad"]}></div>
      <div className={phone["calling"]}>
        {status !== phoneStatus.invite && (
          <Button
            onClick={() => toggleMute()}
            className={cn(phone["btn-size"], mute && phone["danger-btn"])}
            shape="circle"
            type="primary"
          >
            <AudioMutedOutlined className={phone["icon-phone"]} />
          </Button>
        )}
        {status === phoneStatus.invite && (
          <Button
            onClick={() => {
              if(window.omiSDK){
                window.omiSDK.acceptCall()
                dispatch(acceptCall())
              }
            }}
            className={phone["btn-size"]}
            style={{ backgroundColor: "#2db4a6" }}
            shape="circle"
            type="primary"
          >
            <PhoneOutlined />
          </Button>
        )}
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
    </>
  );
};
const EndCall = ({ onCancel = () => {}, onCallback = () => {} }) => {
  return (
    <>
      <div className={phone["keypad"]}></div>
      <div className={phone["calling"]}>
        <Button
          onClick={() => onCancel()}
          className={phone["btn-size"]}
          shape="circle"
          type="primary"
        >
          <CloseOutlined />
        </Button>
        <Button
          shape="circle"
          type="primary"
          className={phone["btn-call"]}
          onClick={() => onCallback()}
        >
          <PhoneOutlined
            className={cn(phone["icon-phone"], phone["call-hangout"])}
          />
        </Button>
      </div>
    </>
  );
};
