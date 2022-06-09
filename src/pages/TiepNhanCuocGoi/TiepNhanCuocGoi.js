import { useState } from "react";
import { Layout, Typography } from "antd";
import { useSelector } from "react-redux";
import i18n, { languageKeys } from "../../i18n";
import moment from "moment";
import style from "./tncg.module.less";
import * as tncg from "./Components";
import { phoneStatus } from "../../constants/phoneStatus";
import { ThongTinBenhNhan } from "./thongTinBenhNhan/ThongTinBenhNhan";
import { HLog } from "../../helpers";
import { GhiChu } from "./ghiChu/GhiChu";
import DatLichKham from "./datLichKham/datLichKham";

const { Available, ThongTinCuocGoi, Phone } = tncg;
const { Header, Content } = Layout;
const { Title } = Typography;
const {PhoneModal} = Phone
const {CuocGoiDen} = tncg
export const TiepNhanCuocGoi = () => {
  // mô phỏng nhận trạng thái cuộc gọi tại store
  const [patientService, setPatientService] = useState(null);
  const { status, client } = useSelector((state) => state.call); // trạng thái cuộc gọi và thông tin khách hàng gọi đến
  let counter = 0

  HLog("TRANG THAI CUOC GOI:::",moment().hour(0).minute(0).second(counter++).format('HH : mm : ss'))
  const patientOptions = () => {
    switch (patientService) {
      case i18n.t(languageKeys.feature_Thong_tin_benh_nhan):
        return <ThongTinBenhNhan />; // chi tiết thông tin bệnh nhân trong cuộc gọi
      case i18n.t(languageKeys.feature_Ghi_chu):
        return <GhiChu />;
      case i18n.t(languageKeys.feature_Ke_don_va_dat_mua_thuoc):
        return <Available />;
      case i18n.t(languageKeys.feature_Dat_lich_kham):
        return <DatLichKham />; // đặt lịch khám
      case i18n.t(languageKeys.feature_Dat_dich_vu_can_lam_sang):
        return <Available />; // Cận lâm sàng

      default:
        return <Available />; // tiêu đề mặc định
    }
  };
  return (
    <div className={style["container"]}>
      <Layout className="layout">
        {/* {window.omiSDK.getStatus() === "unregistered" && <Phone.PhoneModal />} */}
        {status === phoneStatus.invite && <CuocGoiDen />}
        <Header className={style["tncgHeader"]}>
          <Title level={3} style={{ color: "#2C3782", lineHeight: "68px" }}>
            {i18n.t(languageKeys.menu_Tiep_nhan_cuoc_goi)}
          </Title>
        </Header>

        <div style={{ backgroundColor: "#ffffff80" }}>
          {status === phoneStatus.on_call || status === phoneStatus.end_call ? (
            <ThongTinCuocGoi page={patientService} onPage={setPatientService} />
          ) : (
            <></>
          )}
        </div>

        <Content style={{ padding: "2rem" }}>{patientOptions()}</Content>
        <CuocGoiDen />
        <PhoneModal/>
      </Layout>
    </div>
  );
};
