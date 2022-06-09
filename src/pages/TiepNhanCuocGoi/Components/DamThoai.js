import { useState } from "react";
import { Row, Col, Avatar, Dropdown, Button, Menu, Typography } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import cn from "classnames";
import i18n, { languageKeys } from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import style from "../tncg.module.less";
import { Oncall } from "./Phone/Oncall";
import { UserFill } from "../../../assets/svgs";
const { Title } = Typography;
function DamThoai({ onPage, page, disableBtn=true }) {
  const dispatch = useDispatch();

  const { client } = useSelector((s) => s.call);

  const handleMenuClick = () => {};

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );
  const arrBtn = [
    i18n.t(languageKeys.feature_Thong_tin_benh_nhan),
    i18n.t(languageKeys.feature_Ghi_chu),
    i18n.t(languageKeys.feature_Dat_lich_kham),
    i18n.t(languageKeys.feature_Dat_dich_vu_can_lam_sang),
    i18n.t(languageKeys.feature_Ke_don_va_dat_mua_thuoc),
  ];

  return (
    <Row className={style["DamThoai"]} gutter={10}>
      <Col span={6} style={{ padding: "12px 12px 12px 0" }}>
        <Oncall />
      </Col>

      <Col span={18} style={{ padding: "12px 0 12px 12px" }}>
        <Row className={style.info}>
          <Col span={21} style={{ display: "flex" }}>
            <Avatar
              size="large"
              src=""
              icon={
                <UserFill
                  style={{ transform: "scale(0.8)", margin: "4px 0 0 -1px" }}
                />
              }
              className={style["avatar"]}
            ></Avatar>
            <div className={style["detail"]}>
              {client && Object.keys(client).length !== 0 ? (
                <>
                  <h5>{i18n.t(languageKeys.common_ten)}</h5>
                  {i18n.t(languageKeys.field_gioi_tinh)}{" "}
                  {i18n.t(languageKeys.field_ngay_sinh)}
                </>
              ) : (
                <>
                  <Title level={3} style={{ color: "navy" }}>
                    {i18n.t(languageKeys.common_khong_xac_dinh)}
                  </Title>
                  <h5 style={{ color: "#2CB3A5" }}>
                    {i18n.t(languageKeys.common_khong_xac_dinh)}
                  </h5>
                </>
              )}
            </div>
          </Col>
          <Col span={3} style={{textAlign:"end"}}>
            <Dropdown overlay={menu} trigger="click" disabled={disableBtn}>
              <Button className={style["btn-file"]}>
                {i18n.t(languageKeys.txt_doi_ho_so)} <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <div className={style["btnGroup"]}>
          {arrBtn.map((btn, key) => (
            <div
              key={key}
              onClick={() => {
                onPage(btn);
              }}
              className={cn(style.btn, page === btn ? style.tabActive : null)}
            >
              {btn}
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default DamThoai;
