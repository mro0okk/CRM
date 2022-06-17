import React, { useState } from "react";
import { Modal, Button, notification } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import phoneStyle from "./PhoneModal.module.less";
import { useDispatch, useSelector } from "react-redux";
import { phoneStatus } from "../../../../constants/phoneStatus";
import classNames from "classnames";
import { HLog } from "../../../../helpers";
import DeepcarePhone from "../../../../components/DeepcarePhone/DeepcarePhone";
import i18n, { languageKeys } from "../../../../i18n";

const PhoneModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.call);

  const showModal = () => {
    if(status === phoneStatus.offline){
      notification.warning({
        message:i18n.t(languageKeys.phone_chua_ket_noi_tong_dai),
      })
      return
    }  
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
