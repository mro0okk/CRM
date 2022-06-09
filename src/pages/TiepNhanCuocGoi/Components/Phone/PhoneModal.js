import React, { useState } from "react";
import { Modal, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import phoneStyle from "./PhoneModal.module.less";
import { useDispatch, useSelector } from "react-redux";
import { phoneStatus } from "../../../../constants/phoneStatus";
import Quayso from "./Quayso";
import Goidi from "./Goidi";

const PhoneModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { status, client } = useSelector((state) => state.call);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showAction = () => {
    switch (status) {
      case phoneStatus.available:
        return <Quayso />;
      case phoneStatus.connecting:
        return <Goidi />;
      case phoneStatus.ringing:
        return <Goidi />;
      case phoneStatus.on_call:
        return <Goidi />;
      case phoneStatus.end_call:
        return <Goidi />;
      default:
        return <Quayso />;
    }
  };

  return (
    <div className={phoneStyle["btnTrigger"]}>
      <Button
        type="primary"
        onClick={showModal}
        style={{ borderRadius: "8px", width: "48px", height: "48px" }}
      >
        <PhoneOutlined
          style={{
            color: "white",
            fontSize: "larger",
            transform: "rotateY(180deg)",
          }}
        />
      </Button>

      <Modal
        className={phoneStyle['container']}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        {showAction()}
      </Modal>
    </div>
  );
};

export { PhoneModal };
