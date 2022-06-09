import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

import React from "react";
import { DrawerIcon } from "../../assets/imgs";
import drawer from "./drawer.module.less";

export const Drawers = ({
  visible,
  onClose,
  onSearch,
  onFinish,
  onChange,
  form, // của popover trang tiep don
}) => {
  return (
    <Drawer
      title={
        <div className={drawer["title"]}>
          {" "}
          <img src={DrawerIcon} alt="" /> Thêm mới bệnh nhân
        </div>
      }
      placement="right"
      width={800}
      onClose={onClose}
      visible={visible}
      closable={false}
      footer={
        <div className={drawer["footerWrap"]}>
          <Button onClick={onClose} className={drawer["huy"]}>
            Hủy
          </Button>

          <Button
            onClick={() => Form.submit()}
            type="primary"
            className={drawer["taoMoibtn"]}
          >
            Tạo mới
          </Button>
        </div>
      }
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <div className={drawer["formWrap1"]}>
          <Row align="middle" gutter={10}>
            <Col span={8}>
              <Form.Item
                label="Họ"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Tên"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Chức danh"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" gutter={10}>
            <Col span={8}>
              <Form.Item
                label="Giới tính"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Select placeholder="Chọn " showSearch>
                  <Select.Option value="nam">Nam</Select.Option>
                  <Select.Option value="nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Ngày sinh"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Độ tuổi"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" gutter={10}>
            <Col span={8}>
              <Form.Item
                label="Tỉnh/Thành phố"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Select placeholder="Chọn " showSearch>
                  <Select.Option value="nam">Nam</Select.Option>
                  <Select.Option value="nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Quận/Huyện"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Select placeholder="Chọn " showSearch>
                  <Select.Option value="nam">Nam</Select.Option>
                  <Select.Option value="nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Xã/Phường"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Select placeholder="Chọn " showSearch>
                  <Select.Option value="nam">Nam</Select.Option>
                  <Select.Option value="nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" gutter={10}>
            <Col span={24}>
              <Form.Item
                label="Địa chỉ chi tiết"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" gutter={10}>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Email"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" gutter={10}>
            <Col span={8}>
              <Form.Item
                label="Nghề nghiệp"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Select placeholder="Chọn " showSearch>
                  <Select.Option value="nam">Nam</Select.Option>
                  <Select.Option value="nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Dân tộc"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Select placeholder="Chọn " showSearch>
                  <Select.Option value="nam">Nam</Select.Option>
                  <Select.Option value="nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Quốc gia"
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Hãy điền tên ",
                  },
                ]}
              >
                <Select placeholder="Chọn " showSearch>
                  <Select.Option value="nam">Nam</Select.Option>
                  <Select.Option value="nữ">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Drawer>
  );
};
