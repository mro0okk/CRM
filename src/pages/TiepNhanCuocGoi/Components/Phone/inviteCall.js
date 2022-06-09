import { useState } from "react"
import { Button, Modal } from "antd"
import { phoneStatus } from "../../../../constants/phoneStatus";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../../helpers";
const InviteCall = () => {
    const { status, phoneNumber } = useSelector(s => s.call)

    const [isModalVisible, setIsModalVisible] = useState(true);

    const handleOk = () => {
        window.omiSDK.acceptCall()
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        window.omiSDK.rejectCall()
        setIsModalVisible(false)
    }
    const handleRejectCall = () => {
        window.omiSDK.stopCall()
    }
    return (
            <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <h2>{formatPhoneNumber(phoneNumber)}</h2>
                <Button onClick={handleOk}>nghe máy</Button>
                <Button onClick={handleRejectCall}>Tắt máy</Button>
            </Modal>
    )

}

export default InviteCall