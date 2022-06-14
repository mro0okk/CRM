import React, { useState } from "react";
import { Modal, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import phoneStyle from "./PhoneModal.module.less";
import { useDispatch, useSelector } from "react-redux";
import { phoneStatus } from "../../../../constants/phoneStatus";
import classNames from "classnames";
import IncommingCall from "./IncommingCall";
import { HLog } from "../../../../helpers";
import DeepcarePhone from "../../../../components/DeepcarePhone/DeepcarePhone";

const PhoneModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.call);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

    HLog("PHONE_STATUS:",status)
  return (
    <div className={phoneStyle["btnTrigger"]}>
      <Button
        type="primary"
        onClick={showModal}
        className={classNames(phoneStyle['btn-call'], phoneStatus.ringing && phoneStyle['ringing']) }
      >
        <PhoneOutlined
          className={phoneStyle['icon-call']}
        />
      </Button>

      <Modal
        className={phoneStyle['container']}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <DeepcarePhone />
      </Modal>
    </div>
  );
};

export { PhoneModal };
