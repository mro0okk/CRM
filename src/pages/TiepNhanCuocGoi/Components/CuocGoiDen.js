import { Avatar, Button, Modal, Typography } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { acceptCall, rejectCall, resetState } from "../../../ducks/slices/callSlice";
import i18n, { languageKeys } from "../../../i18n";
import style from "../tncg.module.less";
import { PhoneAlt, UserFill } from "../../../assets/svgs";
import { formatPhoneNumber, HLog } from "../../../helpers";
import { phoneStatus } from "../../../constants/phoneStatus";

const styleCuocGoi = {
  backgroundColor: "#2c3782",
  borderRadius: 10,
  width: 500,
  padding: 0,
};

const CuocGoiDen = forwardRef(({}, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const dispatch = useDispatch();
  
  const {status,phoneNumber} = useSelector(state => state.call)

  useEffect(() => {
    if(status === phoneStatus.invite){
      setIsModalVisible(true)
    }else{
      setIsModalVisible(false)
    }
  },[status])
  
  useEffect(() => {
    return () => {
      setCurrentNumber("");
    };
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(acceptCall());
  };

  const handleCancel = () => {
    dispatch(rejectCall());
    // window.omiSDK.stopCall();
    dispatch(resetState());
    setIsModalVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open: (phoneNumber) => {
      // setCurrentNumber(phoneNumber.toString());
      setIsModalVisible(true)
    },
    close: () => {
      // setCurrentNumber(phoneNumber.toString());
      setIsModalVisible(false)
    },
  }));

    return (
            <Modal
                className={style['toastCall']}
                bodyStyle={styleCuocGoi}
                footer={false}
                centered
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
            >
                <div className={cn(style.lineCall)}>
                    <h2 style={{color:"white"}}>{i18n.t(languageKeys.title_cuoc_goi_den)}</h2>
                </div>
                <div className={cn(style.lineCall)}>
                    <Avatar
                        style={{backgroundColor:"white"}}
                        size="large"
                        icon={<UserFill style={{marginTop:4}} />}
                    />
                    <span className={style['line_call--sdt']}>{formatPhoneNumber(phoneNumber)}</span>
                </div>
                <div className={cn(style.lineCall)}>
                <Button
                    className={style['btn-modal']}
                    type="primary"
                    ghost
                    onClick={handleCancel}>{i18n.t(languageKeys.common_t??_choi)}</Button>
                <Button
                    className={style['btn-modal']}
                    type="primary"
                    icon={<PhoneAlt 
                        className={style['icon-btn']}/>
                        }
                    style={{backgroundColor:"#6576ff"}}
                    onClick={handleOk}>
                        <span style={{marginLeft:12}}>
                            {i18n.t(languageKeys.common_chap_nhan)}
                        </span>
                </Button>
                </div>
            </Modal>
    )
})

export default CuocGoiDen;
