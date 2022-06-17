import { memo, useEffect, useState } from "react";
import {
  Row,
  Col,
  Avatar,
  Dropdown,
  Button,
  Menu,
  Typography,
  Modal,
} from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import cn from "classnames";
import i18n, { languageKeys } from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import style from "../tncg.module.less";
import Oncall from "./Phone/Oncall";
import { UserFill } from "../../../assets/svgs";
import { HLog, rid } from "../../../helpers";
import { ChonHoSo } from "../../../components/popOverHoSoBenhNhan/ChonHoSo";
import { phoneStatus } from "../../../constants/phoneStatus";
const { Title } = Typography;
const ThongTinCuocGoi = ({
  onPage = () => {},
  onSetCurrClient = () => {},
  dataSource = [],
  page,
  disableBtn = false,
  patientInfo = {},
  isNewPatient = false,
  infoOnly = false,
}) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const { phoneNumber, dataAfterCall, status } = useSelector(
    (state) => state.call
  );

  useEffect(async () => {
    if (status === phoneStatus.end_call) {
      HLog("DATA_THONG_TIN_CUOCGOI::", dataAfterCall);
    }
  }, [status]);

  HLog("THONG_TIN_BENH_NHAN::", patientInfo);
  return (
    <Row className={style["DamThoai"]} gutter={10}>

      {!infoOnly && (
        <Col span={6} style={{ padding: "12px 12px 12px 0" }}>
          <Oncall onPage={onPage} />
        </Col>
      )}

      <Col span={18} style={{ padding: "12px 0 12px 12px" }}>
        {Object.keys(patientInfo).length !== 0 ? (
          <>
            <Row className={style.info}>
              <Col span={21} style={{ display: "flex" }}>
                <Avatar
                  size="large"
                  src=""
                  icon={
                    <UserFill
                      style={{
                        transform: "scale(0.8)",
                        margin: "4px 0 0 -1px",
                      }}
                    />
                  }
                  className={style["avatar"]}
                />
                <div className={style["detail"]}>
                  {isNewPatient ? (
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
              <Col span={3} style={{ textAlign: "end" }}>
                <Dropdown
                  overlay={
                    <ChonHoSo
                      onFillInfo={(info) => {
                        onSetCurrClient(info);
                        onPage(arrBtn[0].KEY);
                      }}
                      dataSource={dataSource}
                    />
                  }
                  trigger="click"
                  disabled={disableBtn}
                >
                  <Button className={style["btn-file"]}>
                    {i18n.t(languageKeys.txt_doi_ho_so)} <DownOutlined />
                  </Button>
                </Dropdown>
              </Col>
            </Row>

            <div className={style["buttonWrap"]}>
              {arrBtn.map((btn, index) => (
                <Button
                  key={rid()}
                  onClick={() => {
                    onPage(btn.KEY);
                  }}
                  type={page === btn.KEY ? "primary" : "default"}
                  className={style["btn"]}
                >
                  {btn.TEN}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </Col>
    </Row>
  );
};

export default memo(ThongTinCuocGoi);

export const arrBtn = [
  {
    TEN: i18n.t(languageKeys.feature_Thong_tin_benh_nhan),
    KEY: "THONG_TIN_BENH_NHAN",
  },
  {
    TEN: i18n.t(languageKeys.feature_Ghi_chu),
    KEY: "GHI_CHU",
  },
  {
    TEN: i18n.t(languageKeys.feature_Dat_lich_kham),
    KEY: "DAT_LICH_KHAM",
  },
  {
    TEN: i18n.t(languageKeys.feature_Dat_dich_vu_can_lam_sang),
    KEY: "CAN_LAM_SANG",
  },
  {
    TEN: i18n.t(languageKeys.feature_Ke_don_va_dat_mua_thuoc),
    KEY: "KE_DON_VA_DAT_MUA_THUOC",
  },
];
