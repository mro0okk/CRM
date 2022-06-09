import { DownOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Form, Input, Checkbox } from "antd";
import { useMemo } from "react";
import { LoginPic, CallPicIcon } from "../../assets/imgs";
import i18n, { languageKeys, languages } from "../../i18n";
import style from "./login.module.less";

export const Login = () => {
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
  // const [lang, setLang] = useState(langItems[0]);

  const handleChangeLang = (val, object) => {
    // setLang(object);
    i18n.changeLanguage(val);
    window.location.reload();
  };

  const menu = (
    <Menu>
      {langItems.map((item, index) => (
        <Col key={item.key}>
          <Menu.Item
            key={index}
            onClick={() => handleChangeLang(item.lang, item)}
          >
            {item.title}
          </Menu.Item>
        </Col>
      ))}
    </Menu>
  );

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const currentLang = useMemo(() => {
    const filterArr = langItems.filter((item) => item.key === i18n.language);

    if (filterArr.length === 1) {
      return filterArr[0].title;
    }

    localStorage.setItem("i18nextLng", languages.tieng_viet);
    return langItems[0].title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style["container"]}>
      <div className={style["langButton"]}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            {currentLang}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <div className={style["leftContent"]}>
        <div className={style["stone"]}>
          <img src={LoginPic} alt="" className={style["callCenterPic"]} />
        </div>

        <div className={style["titleLeftContent"]}>
          {i18n.t(languageKeys.calling_center)}
        </div>

        <div className={style["infoLeftContent"]}>
          {i18n.t(languageKeys.login_info)}
        </div>
      </div>

      <div className={style["rightContent"]}>
        <div className={style["rightInner"]}>
          <div className={style["iconCallWrap"]}>
            <div className={style["iconCall"]}>
              <img src={CallPicIcon} alt="" />
            </div>

            <div>
              <div>CRM</div>
              <div>{i18n.t(languageKeys.calling_center)}</div>
            </div>
          </div>

          <h1 className={style["bigestTitle"]}>
            {i18n.t(languageKeys.dang_nhap)}
          </h1>

          <div className={style["TextBelowbigestTitle"]}>
            {i18n.t(languageKeys.dang_nhap_text)}
          </div>

          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label={i18n.t(languageKeys.ten_dang_nhap)}
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Nhập" className={style["input"]} />
            </Form.Item>

            <Form.Item
              label={i18n.t(languageKeys.mat_khau)}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Nhập" className={style["input"]} />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>{i18n.t(languageKeys.ghi_nho)}</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={style["submitButton"]}
              >
                {i18n.t(languageKeys.dang_nhap)}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
