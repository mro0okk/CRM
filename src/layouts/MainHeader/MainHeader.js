import { useEffect, useRef } from "react";
import { Layout, Button, Row, Col, Space } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import style from "./mainHeader.module.less";
import i18n, { languageKeys, languages } from "../../i18n";
import { phoneStatus } from "../../constants/phoneStatus";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { paths } from "../../constants";
import { CuocGoiDen } from "../../pages/TiepNhanCuocGoi/Components";
import { formatPhoneNumber, HLog } from "../../helpers";

export const MainHeader = ({
  siderCollapsed = false,
  toggleSider = () => {},
}) => {
  const callRef = useRef();
  const { status, phoneNumber, client } = useSelector((state) => state.call);

  const toggleCuocGoi = () => {
    callRef.current.open();
  };
  const langItems = [
    {
      key: "vi",
      icon: <></>,
      title: i18n.t(languageKeys.lang_tieng_viet),
      lang: languages.tieng_viet,
    },
    {
      key: "en",
      icon: <></>,
      title: i18n.t(languageKeys.lang_tieng_anh),
      lang: languages.tieng_anh,
    },
  ];

  const handleChangeLang = (val) => {
    i18n.changeLanguage(val);
    window.location.reload();
  };
  return (
    <Layout.Header className={style["container"]}>
      <Row align="middle" justify="space-between">
        <Col>
          <Button
            onClick={toggleSider}
            icon={
              siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
            className={style["btn-toggle"]}
          ></Button>
        </Col>

        {status === phoneStatus.on_call && (
          <Redirect to={paths.tiep_nhan_cuoc_goi} />
        )}
        {status === phoneStatus.invite && (
          <Space onClick={toggleCuocGoi} className={style["coming-call"]}>
            <span style={{ color: "navy" }}>{formatPhoneNumber(phoneNumber)}</span>
            <span style={{ color: "navy" }}>{client?.remoteName}</span>
          </Space>
        )}

        <Col>
          <Row align="middle" gutter={10}>
            {langItems.map((item) => (
              <Col key={item.key}>
                <Button
                  type={i18n.language === item.lang ? "primary" : "default"}
                  onClick={() => handleChangeLang(item.lang)}
                >
                  {i18n.t(item.title)}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <CuocGoiDen ref={callRef} />
    </Layout.Header>
  );
};
