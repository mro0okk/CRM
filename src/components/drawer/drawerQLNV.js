import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";

import React, { useState } from "react";
import { DrawerIcon } from "../../assets/imgs";
import drawer from "./drawer.module.less";
import ImgCrop from "antd-img-crop";

export const DrawerQLNV = ({
  visible,
  onClose,
  onSearch,
  onFinish,
  onChange,
  form, // của popover trang tiep don
}) => {
  const [fileList, setFileList] = useState([]);

  const onChange2 = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <Drawer
      title={
        <div className={drawer["title"]}>
          {" "}
          <img src={DrawerIcon} alt="" /> Thêm mới nhân sự
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
        <div className={drawer["avaContent"]}>
          <div>
            <ImgCrop>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange2}
                onPreview={onPreview}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
          <div className={drawer["nameAndPs"]}>
            <div className={drawer["avaTitle"]}>Thông tin tài khoản</div>
            <div>
              <Row align="middle" gutter={10}>
                <Col span={12}>
                  <Form.Item
                    label="Tên đăng nhập"
                    name={"bhyt"}
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
                    name={"Họ"}
                    label="Mật khẩu"
                    rules={[
                      {
                        required: true,
                        message: "Điền mã",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập mã" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className={drawer["contentTitle"]}>Thông tin cá nhân</div>

        <div className={drawer["formWrap1"]}>
          <Row align="middle" gutter={10}>
            <Col span={6}>
              <Form.Item
                label="Mã nhân viên"
                name={"bhyt"}
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

            <Col span={6}>
              <Form.Item
                name={"Họ"}
                label="Họ"
                rules={[
                  {
                    required: true,
                    message: "Điền mã",
                  },
                ]}
              >
                <Input placeholder="Nhập mã" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name={"ten"}
                label="Tên"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: "Hãy điền ngày sinh",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name={"Gioitinh"}
                label="Giới tính"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn giới tính",
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
            <Col span={8}>
              <Form.Item
                name={"dob"}
                label="Ngày sinh"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền ngày sinh ",
                  },
                ]}
              >
                <DatePicker
                  className={drawer["datepicker"]}
                  placeholder="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name={"sdt"}
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Nhập số điện thoại",
                  },
                ]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name={"deadline5nam"}
                label="Email :"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền ngày sinh",
                  },
                ]}
              >
                <Input placeholder="Nhập mã" />
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" gutter={10}>
            <Col span={8}>
              <Form.Item
                name={"tinh"}
                label="Tỉnh/Thành phố *"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn  ",
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
                name={"diachi"}
                label="Quận/Huyện *"
                rules={[
                  {
                    required: true,
                    message: "Chọn giới tính",
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
                name={"xa_phuong"}
                label="Xã/Phường *"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền ngày sinh",
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
        </div>

        <div className={drawer["contentTitle"]}>Vai trò , chức năng</div>

        <div className={drawer["formWrap2"]}>
          <Row align="middle" gutter={10}>
            <Col span={12}>
              <Form.Item
                name={"diachi"}
                label="Vai trò"
                rules={[
                  {
                    required: true,
                    message: "Chọn giới tính",
                  },
                ]}
              >
                <Input placeholder="Nhập mã" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name={"deadline5nam"}
                label="Chức năng"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền ngày sinh",
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
