import { useEffect, useRef } from "react";
import { Layout, Button, Row, Col, Space, Avatar } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import style from "./mainHeader.module.less";
import i18n, { languageKeys, languages } from "../../i18n";
import { phoneStatus } from "../../constants/phoneStatus";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { keys, paths } from "../../constants";
import { CuocGoiDen } from "../../pages/TiepNhanCuocGoi/Components";
import { formatPhoneNumber, HLog } from "../../helpers";
import Popup from "../../components/Popup/Popup";
import cn from "classnames";
import { doLogout } from "../../ducks/slices/authSlice";

export const MainHeader = ({
  siderCollapsed = false,
  toggleSider = () => {},
}) => {
  const dispatch = useDispatch();
  const callRef = useRef();
  const { status, phoneNumber, client } = useSelector((state) => state.call);
  const handleLogout = () => dispatch(doLogout());
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
      <div className={cn(style["wrapper"])}>
        <Avatar
          size={36}
          className={style["avatar"]}
          shape="square"
          // src={getImageFromSever(userProfile.benh_vien.ANH_DAI_DIEN)}
        >
          {/* {userProfile.benh_vien.TEN_CSKCB} */}
        </Avatar>

        {/* <h4 className={style["name"]}>{userProfile.benh_vien.TEN_CSKCB}</h4> */}
      </div>

      <div className={cn(style["wrapper"], style["grow"])}></div>
      <Popup
        content={
          <div className={style["menu"]}>
            <Row align="middle" className={style["user"]} wrap={false}>
              <Col>
                <Avatar
                  size={30}
                  className={style["avatar"]}
                  // src={getImageFromSever(userProfile.ANH_DAI_DIEN)}
                >
                  {/* {getAbbreviations(userProfile)} */}
                </Avatar>
              </Col>

              <Col>
                <div className={style["name"]}>
                  {/* {userProfile.HO + " " + userProfile.TEN} */}
                </div>
              </Col>
            </Row>

            <Row className={cn(style["menu-item"])} onClick={handleLogout}>
              <Col></Col>
              <Col>{i18n.t(languageKeys.common_Dang_xuat)}</Col>
            </Row>

            <Popup
              popupClassName={style["sub-popup"]}
              content={
                <div className={style["menu"]}>
                  <Row
                    className={cn(
                      style["menu-item"]
                      // currentLang === languages.tieng_viet && header["active"]
                    )}
                    onClick={() => handleChangeLang(languages.tieng_viet)}
                  >
                    <Col></Col>
                    <Col>{i18n.t(languageKeys.ngon_ngu_tieng_viet)}</Col>
                  </Row>

                  <Row
                    className={cn(
                      style["menu-item"]
                      // currentLang === languages.tieng_anh && header["active"]
                    )}
                    onClick={() => handleChangeLang(languages.tieng_anh)}
                  >
                    <Col></Col>
                    <Col>{i18n.t(languageKeys.ngon_ngu_tieng_anh)}</Col>
                  </Row>
                </div>
              }
            >
              <Row className={cn(style["menu-item"])}>
                <Col></Col>
                <Col>{i18n.t(languageKeys.common_Doi_ngon_ngu)}</Col>
              </Row>
            </Popup>

            {/* <div className={style["version"]}>Version: {keys.VERSION}</div> */}
          </div>
        }
      >
        <div className={cn(style["wrapper"])}>
          <Avatar
            size={30}
            className={style["avatar"]}
            // src={getImageFromSever(userProfile.ANH_DAI_DIEN)}
          >
            {/* {getAbbreviations(userProfile)} */}
          </Avatar>
        </div>
      </Popup>

      <CuocGoiDen ref={callRef} />
    </Layout.Header>
  );
};
