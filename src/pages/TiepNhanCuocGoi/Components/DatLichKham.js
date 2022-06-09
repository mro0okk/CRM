import { Form, Input, Row, Col } from "antd"
import style from "./DatLichKham.module.less"

function DatLichKham() {
    const [form] = Form.useForm();

    const formItemLayout =
    {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        },
    }
    const onFormLayoutChange = () => {

    }
    return (

        <div className={style.DatLichKham}>

            <Form
                form={form}
                layout="vertical"
                //   onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="url"
                    // label="URL"
                    rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                >
                    <Input placeholder="input placeholder" />
                </Form.Item>
            </Form>


            <Row>
                <Form
                    {...formItemLayout}
                    layout="inline"
                    form={form}

                    onValuesChange={onFormLayoutChange}
                >
                    <Col span={8}>
                        <div>
                            <Form.Item label="Chọn bệnh viện" name="BENH_VIEN" style={{ display: "block", width: "100%" }}>
                                <Input placeholder="input placeholder" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Chọn phòng dịch vụ" name="DICH_VU">
                            <Input placeholder="input placeholder" />
                        </Form.Item>         </Col>
                    <Col span={8}>
                        <Form.Item label="Chọn phòng thực hiện" name="PHONG">
                            <Input placeholder="input placeholder" />
                        </Form.Item>         </Col>
                </Form>
            </Row>

        </div>


    );
}

export default DatLichKham;