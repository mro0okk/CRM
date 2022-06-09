import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Select, Table, TimePicker } from "antd";
import React from "react";
import { DatLichKhamIcon, DocumentIconDatKham } from "../../../assets/svgs";
import { TextBox } from "../../../components";
import style from "./datLichKham.module.less";
import moment from "moment";
import Search from "antd/lib/transfer/search";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function DatLichKham() {
  const [form] = Form.useForm();
  const onSearch = (value) => console.log(value);
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Ngày khám bệnh",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Bệnh viện khám",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Phòng thực hiện",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Bác sĩ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Chẩn đoán bệnh chính",
      dataIndex: "address",
      key: "address",
    },
  ];
  function onChange(time, timeString) {
    console.log(time, timeString);
  }

  return (
    <div className={style["container"]}>
      <div className={style["wrap"]}>
        <div className={style["textTitleWrap2"]}>
          <div className={style["textTitleIcon2"]}>
            <DatLichKhamIcon />
          </div>

          <div className={style["textTitle"]}>Đặt lịch khám</div>
        </div>
        <div className={style["wrapForm"]}>
          <Form form={form} layout="vertical">
            <Row gutter={10}>
              <Col span={8}>
                <Form.Item label="Chọn bệnh viện" required tooltip="Chọn">
                  <Select placeholder="Select a option ">
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Chọn dịch vụ"
                  required
                  tooltip="This is a required field"
                >
                  <Select placeholder="Select a option ">
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Chọn phòng thực hiện"
                  required
                  tooltip="This is a required field"
                >
                  <Select placeholder="Select a option ">
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="Ngày khám"
                  required
                  tooltip="This is a required field"
                >
                  <TimePicker
                    onChange={onChange}
                    defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Thời gian khám"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <TimePicker
                    onChange={onChange}
                    defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={5}>
              <Col span={24}>
                <Form.Item
                  label="Lý do khám"
                  tooltip={{
                    title: "Tooltip with customize icon",
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <TextBox />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end">
              <Form.Item>
                <Button type="primary" className={style["button"]}>
                  Đặt cuộc khám
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </div>
      <div className={style["wrap"]}>
        <div className={style["textTitleWrap"]}>
          <div className={style["left"]}>
            <div className={style["textTitleIcon3"]}>
              <DocumentIconDatKham />
            </div>

            <div className={style["textTitle"]}>Cuộc khám đã đặt</div>
          </div>

          <div className={style["right"]}>
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
        </div>

        <div className={style["table"]}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      </div>
    </div>
  );
}
