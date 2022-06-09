import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import cn from "classnames"
import { Button, Row, Typography } from "antd"
import moment from "moment"
import { AudioMutedOutlined } from "@ant-design/icons"
import { changeStatus } from "../../../../ducks/slices/callSlice"
import { MissedCall, Sound } from "../../../../assets/svgs"
import { phoneStatus } from "../../../../constants/phoneStatus"
import { formatPhoneNumber, HLog } from "../../../../helpers"
import style from "../../tncg.module.less"
import i18n, { languageKeys } from "../../../../i18n"
import StopWatch from "../../../../components/StopWatch"
const { Title, Text } = Typography
export const Oncall = (props) => {

    const watchRef = useRef()
    const [mute, setMute] = useState(false);
    const [count, setCount] = useState(14);
    const { status, phoneNumber,duration } = useSelector(s => s.call)
    const dispatch = useDispatch()
    const handleMuteCall = () => {
        if (status === phoneStatus.on_call) {
            // window.omiSDK.toggleMute(!mute)
            setMute(!mute)
        } else {
            setMute(!mute)
        }
    }
    HLog("MOMENT", moment().minute(0).millisecond(0))
    useEffect(() => {
    },[])
    const setTime = () => {
        return moment().minutes(0).milliseconds(0).format("mm:ss")

    }
    const handleHangoutCall = () => {
        if (status === phoneStatus.on_call) {
            // window.omiSDK.stopCall()
            dispatch(changeStatus(phoneStatus.end_call))
        } else if (status === phoneStatus.end_call) {
            dispatch(changeStatus(phoneStatus.available))
        } else return
    }
    HLog("RE_REDER")
    return (<>
        <div className={style.callBlock} >
            <Row style={{ height: "50%" }}>
                <div style={{ position: "relative", width: "100%" }}>
                    <Title className={style.remotePhone} level={4}>
                        {formatPhoneNumber(phoneNumber)}</Title>
                        <Text style={{color:"white"}}>
                            {duration}
                        </Text>
                    <div style={{
                        position: "absolute", right: "0", top: "0", color: "white",
                        fontSize: "12px"
                    }}>
                        {status === phoneStatus.on_call ? i18n.t(languageKeys.txt_cuoc_goi_den) : i18n.t(languageKeys.txt_cuoc_goi_da_ket_thuc)}
                    </div>
                </div>
            </Row>
            <Row style={{ width: "100%", height: "50%" }}>
                <div className={style.handleCall}>
                    <Button onClick={handleMuteCall} className={cn(style.squareBtn, mute && style.action)}
                        style={{ color: "white" }}
                        icon={<AudioMutedOutlined />} />
                    <Button className={style.squareBtn}
                        style={{ left: "3rem" }}
                        icon={<Sound />} />
                    <Button className={style.squareBtn}
                        onClick={handleHangoutCall}
                        style={{ right: "1rem", backgroundColor: "#FF5855" }}
                        icon={<MissedCall style={{ marginTop: "5px" }} />} />
                </div>
            </Row>

        </div></>)
}