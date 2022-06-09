import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Input, Typography } from "antd";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { PhoneOutlined } from "@ant-design/icons";
import { makeCall } from "../../../../ducks/slices/callSlice";
import phoneStyle from "./PhoneModal.module.less";
import { formatPhoneNumber } from "../../../../helpers";
const { Title, Text } = Typography;

function Quayso() {
  const [display, setDisplay] = useState("");
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
  const dispatch = useDispatch();
  const handleCall = () => {
    dispatch(makeCall(display));
  };
  const handleClickNum = (e) => {
    const number = e.target.outerText;
    setDisplay(display.concat(number));
  };
  const handleDel = () => {
    setDisplay(display.slice(0, display.length - 1));
  };
  const handleChangeNumber = (number) => {
    setDisplay(number);
  };
  return (
    <>
      <div className={phoneStyle.display}>
        <Input
          value={display}
          onChange={(e) => handleChangeNumber(e.target.value)}
          style={{
            outline: "none",
            border: "none",
            width: "100%",
            fontSize: "2.5rem",
            textAlign:'center',
          }}
          onPressEnter={() => {}}
        />
      </div>
      <div className={phoneStyle['numPad']}>
        {keypadKeys.map((key) => {
          return (
            <Button
              key={key}
              className={phoneStyle['num']}
              onClick={(e) => handleClickNum(e)}
            >
              <Title level={3}>{key}</Title>
            </Button>
          );
        })}
        <div className={phoneStyle['action']}>
          <Button
            onClick={handleCall}
            className={cn(phoneStyle.num, phoneStyle["callBtn"])}
          >
            <PhoneOutlined className={phoneStyle.icon} />
          </Button>
          <Button
            onClick={handleDel}
            className={cn(phoneStyle.num, phoneStyle["btnDel"])}
          >
            del
          </Button>
        </div>
      </div>
    </>
  );
}

export default Quayso;
