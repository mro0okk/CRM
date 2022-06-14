import { useCallback, useEffect, useState } from "react";
import { Form, Layout, Typography } from "antd";
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
import { arrBtn } from "./Components/ThongTinCuocGoi";
import Topbar from "../../components/Topbar/Topbar";

const { Available, ThongTinCuocGoi, Phone } = tncg;
const { Header, Content } = Layout;
const { Title } = Typography;
const { PhoneModal } = Phone;
export const TiepNhanCuocGoi = () => {
  // mô phỏng nhận trạng thái cuộc gọi tại store

  const { status, client } = useSelector((state) => state.call); // trạng thái cuộc gọi và thông tin khách hàng gọi đến
  const [form] = Form.useForm();

  const [patientService, setPatientService] = useState();
  
  let counter = 0;

  useEffect(() => {
    if(status === phoneStatus.end_call){
      console.log("KET_THUC_CUOC_GOI")
    }

  },[status])


  const patientOptions = () => {
    switch (patientService) {
      case arrBtn[0].KEY:
        return <ThongTinBenhNhan form={form} />; // chi tiết thông tin bệnh nhân trong cuộc gọi
      case arrBtn[0].KEY:
        return <GhiChu form={form} />;
      case arrBtn[0].KEY:
        return <Available form={form} />;
      case arrBtn[0].KEY:
        return <DatLichKham form={form} />; // đặt lịch khám
      case arrBtn[0].KEY:
        return <Available />; // Cận lâm sàng

      default:
        return <Available />; // tiêu đề mặc định
    }
  };
  return (
    <div className={style["container"]}>
      <Layout className="layout">
        {/* {window.omiSDK.getStatus() === "unregistered" && <Phone.PhoneModal />} */}
        <Topbar
          title={i18n.t(languageKeys.menu_Tiep_nhan_cuoc_goi)}
          showTotalNum={false}
        />

        <div style={{ backgroundColor: "#ffffff80" }}>
          {status === phoneStatus.on_call || status === phoneStatus.end_call ? (
            <ThongTinCuocGoi
              page={patientService}
              onPage={setPatientService}
            />
          ) : (
            <></>
          )}
        </div>
              {/* <audio src="https://drive.google.com/uc?id=1t5N9aL8FhH0MvCM9VGls2G8pRM2TL4qx&export=download"
              type="audio/ogg" autoPlay>
              </audio> */}
        <Content style={{ padding: "2rem" }}>
          <Form form={form}>{patientOptions()}</Form>
        </Content>
        <PhoneModal />
      </Layout>
    </div>
  );
};
