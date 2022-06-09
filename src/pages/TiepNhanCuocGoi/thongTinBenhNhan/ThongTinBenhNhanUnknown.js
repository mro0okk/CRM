import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import Search from "antd/lib/transfer/search";
import React, { useState } from "react";
import style from "./ttbn.module.less";

import i18n, { languageKeys } from "../../../i18n";
import {
  HoSoKhamBenhIcon,
  Iconsth,
  LichSuKhamBenhIcon,
  lichSuTuVanIcon,
  NoDataHistory,
} from "../../../assets/imgs";

export const ThongTinBenhNhanUnknown = () => {
  const hoSoSucKhoeTabs = [
    "Tình trạng lúc sinh",
    "Yếu tố nguy cơ",
    "Tiền sử bệnh tật",
    "Khuyết tật",
    "Tiền sử phẫu thuật",
    "Tiền sử gia đình",
    "Sức khỏe sinh sản",
    "Vấn đề khác",
  ];

  const [currentTab, setCurrentTab] = useState(hoSoSucKhoeTabs[0]);
  const onSearch = (value) => console.log(value);
  const onFinish = (value) => console.log(value);
  const [form] = Form.useForm();

  return (
    <div className={style["navBarContent"]}>
      <div className={style["firstContentBar"]}>
        <div className={style["thongTinHanhChinh"]}>
          <div className={style["thongTinHanhChinhTitle"]}>
            <img src={Iconsth} alt="" />
            {i18n.t(languageKeys.thong_tin_tai_chinh)}
          </div>
          <div className={style["thongTinHanhChinhForm"]}>
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <div className={style["formWrap1"]}>
                <Row align="middle" gutter={10}>
                  <Col span={8}>
                    <Form.Item
                      label="Họ và tên"
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
                      label="Giới tính"
                      name={"gioitinh"}
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
                  <Col span={8}>
                    <Form.Item
                      label="CMND/CCCD"
                      name={"name"}
                      rules={[
                        {
                          required: true,
                          message: "Hãy điền tên ",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập " />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
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

                  <Col span={8}>
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
                <Button className={style["btnForm"]} type="primary">
                  Lưu
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className={style["lichSuTuVan"]}>
          <div className={style["lichSuTuVanChild"]}>
            <div className={style["lichSuTuVanTitle"]}>
              <img src={lichSuTuVanIcon} alt="" />
              {i18n.t(languageKeys.lich_su_tu_van)}
            </div>
            <div className={style["lichSuTuVanContent2"]}>
              <div>
                <img src={NoDataHistory} alt="" />
                <div>Chưa có lịch sử tư vấn</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style["secondContentBar"]}>
        <div className={style["secondContentBarTitle"]}>
          <img src={HoSoKhamBenhIcon} alt="" />
          Hồ sơ sức khỏe
        </div>

        <div className={style["secondContentBarWrapInside"]}>
          <div className={style["secondContentBarLeftSide"]}>
            {hoSoSucKhoeTabs.map((tab) => (
              <Button
                className={style["btn"]}
                key={tab}
                type={currentTab === tab ? "primary" : "default"}
                onClick={() => setCurrentTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className={style["secondContentBarRightSide"]}>
            <div className={style["secondContentBarRightSideTitle"]}>
              {i18n.t(languageKeys.thong_tin_tinh_trang_luc_sinh)}
            </div>
            <div className={style["secondContentBarRightSideFlex2"]}>
              <div>
                <img src={NoDataHistory} alt="" />
                <div>Chưa có thông tin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style["thirdContentBar"]}>
        <div className={style["thirdContentBarFlexWrap"]}>
          <div>
            <img src={LichSuKhamBenhIcon} alt="" />
            Lịch sử khám bệnh
          </div>
          <div>
            <Search
              className={style["thirdContentBarSearch"]}
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
        </div>
        <div className={style["thirdContentBarTable"]}></div>
      </div>
    </div>
  );
};
