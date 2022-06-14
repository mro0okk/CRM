import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Input, Typography } from "antd";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { DeleteOutlined, PhoneOutlined } from "@ant-design/icons";
import { makeCall } from "../../../../ducks/slices/callSlice";
import phoneStyle from "./PhoneModal.module.less";
import { formatPhoneNumber, HLog } from "../../../../helpers";
const { Title, Text } = Typography;

function Quayso() {
  const [displayNumber, setDisplayNumber] = useState("");
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
  const handleCall = (phoneNumber) => {
    HLog("PHONE_NUMBER",phoneNumber)
    dispatch(makeCall(phoneNumber));
  };
  const handleClickNum = (e) => {
    const number = e.target.outerText;
    setDisplayNumber(displayNumber.concat(number));
  };
  const handleDel = () => {
    setDisplayNumber(displayNumber.slice(0, displayNumber.length - 1));
  };
  const handleChangeNumber = (number) => {
    setDisplayNumber(number);
  };
  return (
    <>
      <div className={phoneStyle.display}>
        <Input
          value={displayNumber}
          onChange={(e) => handleChangeNumber(e.target.value)}
          className={phoneStyle['call-input']}
          onPressEnter={(e) => handleCall(e.target.value)}
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
      </div>
        <div className={phoneStyle['action']}>
          <Button
            onClick={()=>handleCall(displayNumber)}
            className={phoneStyle["callBtn"]}
            shape="circle"
          >
            <PhoneOutlined className={phoneStyle['icon']} />
          </Button>
          <Button
            onClick={handleDel}
            ghost
            icon={<DeleteOutlined/>}
            className={cn(phoneStyle.num, phoneStyle["delBtn"])}
          >
          </Button>
        </div>
    </>
  );
}

export default Quayso;
