import { useCallback, useEffect, useState } from "react";
import { Form, Layout, Modal, notification, Typography } from "antd";
import { useSelector } from "react-redux";
import i18n, { languageKeys } from "../../i18n";
import moment from "moment";
import style from "./tncg.module.less";
import * as tncg from "./Components";
import { phoneStatus } from "../../constants/phoneStatus";
import { ThongTinBenhNhan } from "./thongTinBenhNhan/ThongTinBenhNhan";
import { common_post, HLog, rid } from "../../helpers";
import { GhiChu } from "./ghiChu/GhiChu";
import DatLichKham from "./datLichKham/datLichKham";
import { arrBtn } from "./Components/ThongTinCuocGoi";
import Topbar from "../../components/Topbar/Topbar";
import { PhoneModal } from "./Components/Phone/PhoneModal";
import { ChonHoSo } from "../../components";
import apis from "../../constants/apis";
import { keys, userProfile } from "../../constants";

const { Available, ThongTinCuocGoi } = tncg;
const { Header, Content } = Layout;
const { Title } = Typography;

export const TiepNhanCuocGoi = () => {
  // mô phỏng nhận trạng thái cuộc gọi tại store

  const { status, client, phoneNumber, pickup } = useSelector(
    (state) => state.call
  ); // trạng thái cuộc gọi và thông tin khách hàng gọi đến
  const [form] = Form.useForm();

  const [patientService, setPatientService] = useState(null); // tab dịch vụ
  const [currentClient, setCurrentClient] = useState({}); // khách hàng được chọn
  const [visibleDsHoSo, setVisibleDsHoSo] = useState(false); // hiển thị danh sách hồ sơ
  const [dsHoSoBenhNhan, setDsHoSoBenhNhan] = useState([]); // ds hồ sơ bệnh nhân cho màn chọn hồ sơ
  const [isNewPatient, setIsNewPatient] = useState(false); // Là bệnh nhân mới

  useEffect(() => {
    return () => {
      setPatientService(null);
      setCurrentClient({});
      setVisibleDsHoSo(false);
      setIsNewPatient(false);
    };
  }, []);
  HLog("RE_RENDER :::: TIEP_NHAN_CUOC_GOi");

  // Hàm lấy danh sách hồ sơ theo cuộc gọi ** nếu chưa có thì chuyển về thêm mới bệnh nhân
  const handleLayDsHoSo = async (SO_DIEN_THOAI) => {
    HLog(SO_DIEN_THOAI);
    try {
      let body = {
        partner_code: userProfile.partner_code,
        SO_DIEN_THOAI,
        limit: keys.limit,
        page: 1,
      };

      let res = await common_post(apis.ds_ho_so_benh_nhan, body, false);
      if (res && res.status === "OK") {
        let { result } = res;
        if (result.length === 0) {
          setIsNewPatient(true);
          setVisibleDsHoSo(false);
        } else {
          setVisibleDsHoSo(true);
          setDsHoSoBenhNhan(result.map((item) => ({ ...item, key: rid() })));
        }
      }
    } catch (error) {
      HLog("Lỗi lấy danh sách hồ sơ bệnh nhân: ", error);
    }
  };

  // Hàm lấy thông tin bệnh nhân mỗi với mỗi số
  const handleSetCurrentClient = useCallback((patientInfo) => {
    setCurrentClient(patientInfo);
  }, []);

  // Nếu chấp nhận cuộc gọi đến thì gọi api lấy danh sách hồ sơ bệnh nhân
  useEffect(async () => {
    if (pickup) {
      await handleLayDsHoSo(phoneNumber);
    }
  }, [pickup]);
  //=======================================================================================
  const patientOptions = () => {
    switch (patientService) {
      case arrBtn[0].KEY:
        return (
          <ThongTinBenhNhan editable form={form} patientID={currentClient.ID} />
        ); // chi tiết thông tin bệnh nhân trong cuộc gọi
      case arrBtn[1].KEY:
        return <GhiChu form={form} />;
      case arrBtn[2].KEY:
        return <DatLichKham form={form} patientID={currentClient.ID} />; // đặt lịch khám
      case arrBtn[3].KEY:
        return <Available />; // Cận lâm sàng
      case arrBtn[4].KEY:
        return <Available />; // Kê đơn và mua thuốc

      default:
        return <Available />; // tiêu đề mặc định
    }
  };

  // hàm lưu thông tin lịch sử cuộc gọi
  const handleDoAfterCall = async (value) => {
    HLog("FORM___VALUE:::", value);

    // try {
    //   let body = {
    //     partner_code: userProfile.partner_code,
    //     BENH_NHAN_ID:"",
    //     GHI_CHU_NGUOI_BENH:"",
    //     GHI_CHU_TU_VAN:"",
    //   };
    //   let res = await common_post(apis.luu_cuoc_goi, body, false);
    //   if (res && res.status === "OK") {
    //     // Hành động sau khi lưu cuộc gọi thành công
    //   }
    // } catch (error) {
    //   HLog("Lưu cuộc gọi không thành công:::", error);
    // }
  };

  return (
    <div className={style["container"]}>
      <Layout className="layout">
        <Topbar
          title={i18n.t(languageKeys.menu_Tiep_nhan_cuoc_goi)}
          showTotalNum={false}
          className={style["topbar"]}
        />

        <div style={{ backgroundColor: "#ffffff80" }}>
          {status === phoneStatus.on_call ? (
            <ThongTinCuocGoi
              page={patientService}
              onPage={setPatientService}
              patientInfo={currentClient}
              isNewPatient={isNewPatient}
              dataSource={dsHoSoBenhNhan}
              onSetCurrClient={handleSetCurrentClient}
              disableBtn={isNewPatient}
            />
          ) : (
            <></>
          )}
        </div>
        <Content style={{ padding: "2rem" }}>
          <Form form={form} layout="vertical" onFinish={handleDoAfterCall}>
            {patientOptions()}
          </Form>
        </Content>
        <PhoneModal />
      </Layout>

      <Modal
        visible={visibleDsHoSo}
        footer={null}
        onCancel={() => setVisibleDsHoSo(false)}
      >
        <ChonHoSo
          onVisible={setVisibleDsHoSo}
          onFillInfo={(info) => {
            setCurrentClient(info); // chọn hồ sơ bệnh nhân
            setPatientService(arrBtn[0].KEY); // chuyển về tab hồ sơ bệnh nhân
          }}
          dataSource={dsHoSoBenhNhan}
        />
      </Modal>
    </div>
  );
};
