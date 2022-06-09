import { Button, Col, Row } from "antd"
import style from "./Record.module.less"
import WaveForm from "./WaveForm"
export const Record = (props) => {

    return (
        <div className={style.container}>
            <div className={style.header}><h1>File ghi âm</h1></div>
            <div className={style.detail}><Col span={12} style={{ borderRight: "1px solid #ccc" }}>số điện thoại</Col><Col span={12}>thời gian</Col></div>
            <Row>
                <Col span={6} className={style.action}>
                    <Button>Play</Button>
                    <div>duration</div>
                </Col>
                <Col span={18} style={{ position: "relative" }}>
                    <WaveForm percent={"40%"} />
                </Col>
            </Row>
        </div>
    )
}