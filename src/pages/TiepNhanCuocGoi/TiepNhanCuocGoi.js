import { useState } from "react";
import { Layout, Typography } from "antd";
import { useSelector } from "react-redux";
import i18n, { languageKeys } from "../../i18n";
import style from "./tncg.module.less";
import * as tncg from "./Components";
import { phoneStatus } from "../../constants/phoneStatus";
import { ThongTinBenhNhan } from "./thongTinBenhNhan/ThongTinBenhNhan";
const { Available, DamThoai, DatLichKham, CanLamSang, Phone } = tncg;
const { Header, Content } = Layout;
const { Title } = Typography;
const {InviteCall} = Phone

export const TiepNhanCuocGoi = () => {
  // mô phỏng nhận trạng thái cuộc gọi tại store
  const [patientService, setPatientService] = useState(null);
  const { status, client } = useSelector((state) => state.call);

  const patientOptions = () => {
    switch (patientService) {
      case i18n.t(languageKeys.feature_Thong_tin_benh_nhan):
        return <ThongTinBenhNhan />; // chi tiết thông tin bệnh nhân trong cuộc g
      case i18n.t(languageKeys.feature_Ghi_chu):
        return <Available />;
      case i18n.t(languageKeys.feature_Ke_don_va_dat_mua_thuoc):
        return <Available />;
      case i18n.t(languageKeys.feature_Dat_lich_kham):
        return <DatLichKham />; // đặt lịch khám
      case i18n.t(languageKeys.feature_Dat_dich_vu_can_lam_sang):
        return <CanLamSang />; // Cận lâm sàng

      default:
        return <Available />; // tiêu đề mặc định
    }
  };
  return (
    <div className={style["container"]}>
      <Layout className="layout">
        {window.omiSDK.getStatus() === "unregistered" && <Phone.PhoneModal />}
        {status === phoneStatus.invite && <Phone.InviteCall />}
        <Header className={style["tncgHeader"]}>
          <Title level={3} style={{ color: "#2C3782", lineHeight: "68px" }}>
            {i18n.t(languageKeys.menu_Tiep_nhan_cuoc_goi)}
          </Title>
        </Header>

        <div style={{ backgroundColor: "#ffffff80" }}>
          {status === phoneStatus.on_call || status === phoneStatus.end_call ? (
            <DamThoai page={patientService} onPage={setPatientService} />
          ) : (
            <></>
          )}
        </div>

        <Content style={{ padding: "2rem" }}>{patientOptions()}</Content>
        <tncg.CuocGoiDen />
      </Layout>
    </div>
  );
};
