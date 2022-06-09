import { Layout, Button, Row, Col } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import style from "./mainHeader.module.less";
import i18n, { languageKeys, languages } from "../../i18n";

export const MainHeader = ({
  siderCollapsed = false,
  toggleSider = () => { },
}) => {
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
          ></Button>
        </Col>

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
    </Layout.Header>
  );
};
