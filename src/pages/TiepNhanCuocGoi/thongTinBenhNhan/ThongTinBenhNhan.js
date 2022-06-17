import { Button, Input, Table, Form, Row, Col, Space, Divider } from "antd";
import Search from "antd/lib/transfer/search";
import React, { useCallback, useEffect, useState } from "react";
import style from "./ttbn.module.less";
import cn from "classnames";
import moment from "moment";
import Select from "../../../components/Select/Select";
import i18n, { languageKeys } from "../../../i18n";
import {
  HoSoKhamBenhIcon,
  Iconsth,
  LichSuKhamBenhIcon,
  lichSuTuVanIcon,
} from "../../../assets/imgs";
import {
  fieldThongTinBenhNhan,
  hoSoSucKhoeTabs,
  callHistory,
} from "./fieldThongTin";
import { common_post, convertDateToValue, HLog, rid } from "../../../helpers";
import { useSelector } from "react-redux";
import { throttle } from "lodash";
import apis from "../../../constants/apiOmicall/apiOmiCall";
import { Called, CallingPhone, HangUpPhone } from "../../../assets/svgs";
import { ThreeDot } from "../../../components";
import LichSuTuVan from "./LichSuTuVan";
import { keys, userProfile } from "../../../constants";

const { Item } = Form;

export const ThongTinBenhNhan = ({
  // editable = false,
  form,
  patientID,
}) => {
  const [currentTab, setCurrentTab] = useState(hoSoSucKhoeTabs[0]);
  const [dataSource, setDataSource] = useState(data);
  const [searchString, setSearchString] = useState("");
  const [editable, setEditable] = useState(false);

  // const userProfile = useSelector((state) => state.auth.user);

  useEffect(async () => {
    if (!!patientID) {
      setEditable(false);
      await handleGetDataSource(searchString, patientID);
    } else {
      setEditable(true);
    }
    return () => {
      form.resetFields();
      setSearchString("");
      setEditable(false);
      setDataSource([]);
    };
  }, []);

  const handleGetDataSource = async (search_string = "", BENH_NHAN_ID) => {
    setSearchString(search_string);
    let body = {
      partner_code: "HOSPITAL_ID",
      BENH_NHAN_ID,
      search_string,
    };
    try {
      let response = await common_post(apis.chi_tiet_benh_nhan, body, false);
      if (response && response.status === "OK") {

        let { result } = response;

        let fieldData = Object.values(fieldThongTinBenhNhan).map((key) => {
          if (key === fieldThongTinBenhNhan.TEN_TINH_THANH) {
            const value = result[fieldThongTinBenhNhan.TEN_TINH_THANH];
            return {
              name: key,
              value,
            };
          }
          if (key === fieldThongTinBenhNhan.TEN) {
            const value = result[fieldThongTinBenhNhan.TEN];
            return {
              name: key,
              value,
            };
          }
          if (key === fieldThongTinBenhNhan.GIOI_TINH) {
            const value = result[fieldThongTinBenhNhan.GIOI_TINH];
            return {
              name: key,
              value,
            };
          }
          if (key === fieldThongTinBenhNhan.CCCD) {
            const value = result[fieldThongTinBenhNhan.CCCD];
            return {
              name: key,
              value,
            };
          }
          if (key === fieldThongTinBenhNhan.SO_DIEN_THOAI) {
            const value = result[fieldThongTinBenhNhan.SO_DIEN_THOAI];
            return {
              name: key,
              value,
            };
          }
          if (key === fieldThongTinBenhNhan.QUAN_HUYEN) {
            const value = result[fieldThongTinBenhNhan.QUAN_HUYEN];
            return {
              name: key,
              value,
            };
          }
          if (key === fieldThongTinBenhNhan.XA_PHUONG) {
            const value = result[fieldThongTinBenhNhan.XA_PHUONG];
            return {
              name: key,
              value,
            };
          }
          if (key === fieldThongTinBenhNhan.NGAY_SINH) {
            return {
              name: key,
              value: convertDateToValue(
                result[fieldThongTinBenhNhan.NGAY_SINH]
              ),
            };
          }
          if (key === fieldThongTinBenhNhan.EMAIL) {
            return {
              name: key,
              value: convertDateToValue(result[fieldThongTinBenhNhan.EMAIL]),
            };
          }

          return {
            name: key,
            value: result[key],
          };
        });
        form.setFields(fieldData);
      }
    } catch (error) {
      HLog("Lỗi lấy danh sách lịch sử khám bệnh::", error);
    }
  };

  const onSearch = useCallback(
    throttle((search_string) => {
      handleGetDataSource(search_string);
    }, 1000),
    []
  );

  return (
    <div className={style["container"]}>
      <Row gutter={20}>
        <Col span={12} className={style["left-col"]}>
          <div className={style["wrapper-col"]}>
            <div className={style["thongTinHanhChinhTitle"]}>
              <img src={Iconsth} alt="" />
              {i18n.t(languageKeys.field_Thong_tin_hanh_chinh)}
            </div>
            <div className={style["row-xyz"]}>
              <Item
                // rules={[
                //   {
                //     required: true,
                //   },
                // ]}
                name={fieldThongTinBenhNhan.TEN}
                className={style["col1"]}
                label={i18n.t(languageKeys.ho_va_ten)}
              >
                <Input
                  readOnly={!editable}
                  bordered={editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </Item>
              <Item
                name={fieldThongTinBenhNhan.NGAY_SINH}
                className={style["col1"]}
                label={i18n.t(languageKeys.field_Ngay_sinh)}
              >
                <Input
                  readOnly={!editable}
                  bordered={editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </Item>
              <Item
                name={fieldThongTinBenhNhan.GIOI_TINH}
                className={style["col1"]}
                label={i18n.t(languageKeys.field_Gioi_tinh)}
              >
                <Select
                  placeholder={i18n.t(languageKeys.common_Chon)}
                  disabled={!editable}
                />
              </Item>
              <Item
                label={i18n.t(languageKeys.field_CMND_CCCD)}
                name={fieldThongTinBenhNhan.CCCD}
                className={style["col1"]}
              >
                <Input
                  readOnly={!editable}
                  bordered={editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </Item>
              <Item
                label={i18n.t(languageKeys.field_So_dien_thoai)}
                name={fieldThongTinBenhNhan.SO_DIEN_THOAI}
                className={style["col1"]}
              >
                <Input
                  readOnly={!editable}
                  bordered={editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </Item>
              <Item
                label={i18n.t(languageKeys.field_Email)}
                name={fieldThongTinBenhNhan.EMAIL}
                className={style["col1"]}
              >
                <Input
                  readOnly={!editable}
                  bordered={editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </Item>
              <Item
                label={i18n.t(languageKeys.field_Tinh_thanh)}
                name={fieldThongTinBenhNhan.TEN_TINH_THANH}
                className={style["col1"]}
              >
                <Select
                  placeholder={i18n.t(languageKeys.common_Chon)}
                  disabled={!editable}
                />
              </Item>
              <Item
                label={i18n.t(languageKeys.field_Quan_huyen)}
                name={fieldThongTinBenhNhan.QUAN_HUYEN}
                className={style["col1"]}
              >
                <Select
                  placeholder={i18n.t(languageKeys.common_Chon)}
                  disabled={!editable}
                />
              </Item>
              <Item
                label={i18n.t(languageKeys.field_Xa_phuong)}
                name={fieldThongTinBenhNhan.XA_PHUONG}
                className={style["col1"]}
              >
                <Select
                  placeholder={i18n.t(languageKeys.common_Chon)}
                  disabled={!editable}
                />
              </Item>
              <Item
                label={i18n.t(languageKeys.field_Dia_chi_chi_tiet)}
                name={fieldThongTinBenhNhan.DIA_CHI}
                className={cn(style["col1"], style["col-full"])}
              >
                <Input
                  readOnly={!editable}
                  bordered={editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </Item>
              <Item
                label={i18n.t(languageKeys.field_Nghe_nghiep)}
                name={fieldThongTinBenhNhan.NGHE_NGHIEP}
                className={style["col1"]}
              >
                <Select
                  placeholder={i18n.t(languageKeys.common_Chon)}
                  disabled={!editable}
                />
              </Item>
              <Item
                name={fieldThongTinBenhNhan.DAN_TOC}
                label={i18n.t(languageKeys.field_Dan_toc)}
                className={style["col1"]}
              >
                <Select
                  placeholder={i18n.t(languageKeys.common_Chon)}
                  disabled={!editable}
                />
              </Item>
              <Item
                name={fieldThongTinBenhNhan.QUOC_GIA}
                className={style["col1"]}
                label={i18n.t(languageKeys.field_Quoc_gia)}
              >
                <Select
                  placeholder={i18n.t(languageKeys.common_Chon)}
                  disabled={!editable}
                />
              </Item>
              {editable && (
                <Button type="primary" className={style[""]}>
                  {i18n.t(languageKeys.luu)}
                </Button>
              )}
            </div>
          </div>
        </Col>

        <Col span={12} className={style["right-col"]}>
          <div className={style["wrapper-col"]}>
            <LichSuTuVan patientId={patientID} />
          </div>
        </Col>
      </Row>
      <Divider />
      {/* <HoSoSucKhoe currentTab={currentTab} setCurrentTab={setCurrentTab} /> */}
      <Divider />

      <LichSuKham patientID={patientID}/>
    </div>
  );
};  

const columns = [
  {
    title: i18n.t(languageKeys.field_Ngay_kham),
    dataIndex: "date",
    key: "date",
    render: (record) => {
      return <span>{moment(record.NGAY).format("DD/MM/YYYY")}</span>;
    },
  },
  {
    title: i18n.t(languageKeys.field_benh_vien_kham),
    dataIndex: "hospital",
    key: "hospital",
  },
  {
    title: i18n.t(languageKeys.field_Phong_thuc_hien),
    dataIndex: "department",
    key: "department",
  },
  {
    title: i18n.t(languageKeys.field_Bac_si),
    key: "doctor",
    dataIndex: "doctor",
    render: (record) => {
      return <span>{record?.doctor}</span>;
    },
  },
  {
    title: i18n.t(languageKeys.field_chuan_doan_benh_chinh),
    key: "diagnose",
    dataIndex: "diagnose",
  },
];

const data = [
  {
    key: "1",
    date: "02/03/2021",
    hospital: "Bệnh viện Hữu Nghị",
    department: "Phòng nội tổng hợp",
    doctor: ["Jacob, Jones"],
    diagnose: "Viêm đại tràng mãn tính",
  },
  {
    key: "2",
    date: "02/03/2021",
    hospital: "Bệnh viện Hữu Nghị",
    department: "Phòng nội tổng hợp",
    doctor: ["Jacob, Jones"],
    diagnose: "Viêm đại tràng mãn tính",
  },
  {
    key: "3",
    date: "02/03/2021",
    hospital: "Bệnh viện Hữu Nghị",
    department: "Phòng nội tổng hợp",
    doctor: ["Jacob, Jones"],
    diagnose: "Viêm đại tràng mãn tính",
  },
];

const HoSoSucKhoe = ({ currentTab, setCurrentTab }) => {
  return (
    <div className={style["secondContentBar"]}>
      <div className={style["secondContentBarTitle"]}>
        <img src={HoSoKhamBenhIcon} alt="" />
        {i18n.t(languageKeys.txt_ho_so_suc_khoe)}
      </div>

      <div className={style["secondContentBarWrapInside"]}>
        <div className={style["secondContentBarLeftSide"]}>
          {hoSoSucKhoeTabs.map((tab) => (
            <Button
              className={style["btn"]}
              key={tab}
              type={currentTab === tab ? "primary" : "default"}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className={style["secondContentBarRightSide"]}>
          <div className={style["secondContentBarRightSideTitle"]}>
            {i18n.t(languageKeys.thong_tin_tinh_trang_luc_sinh)}
          </div>
          <div className={style["secondContentBarRightSideFlex"]}>
            <div className={style["t-row"]}>
              <div className={cn(style["t-col"], style["left"])}>
                {i18n.t(languageKeys.txt_hinh_thuc_de)}:
              </div>
              <div className={style["t-col"]}>Đẻ thường</div>
            </div>

            <div className={style["t-row"]}>
              <div className={cn(style["t-col"], style["left"])}>
                {i18n.t(languageKeys.txt_hinh_thuc_de)}:
              </div>
              <div className={style["t-col"]}>3,5 kg</div>
            </div>

            <div className={style["t-row"]}>
              <div className={cn(style["t-col"], style["left"])}>
                {i18n.t(languageKeys.txt_chieu_dai_luc_de)}:
              </div>
              <div className={style["t-col"]}>50 cm</div>
            </div>
            <div className={style["t-row"]}>
              <div className={cn(style["t-col"], style["left"])}>
                {i18n.t(languageKeys.txt_van_de_khac)}:
              </div>
              <div className={style["t-col"]}>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                consectetur, ... Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LichSuKham = ({
  patientID,
}) => {
  const [dataSource, setDataSource] = useState([]); // danh sách lịch sử khám bệnh
  const [searchString, setSearchString] = useState("");
  useEffect(() => {



    return () => {
      setDataSource([])
      setSearchString("")
    }
  },[])
  // Lấy danh sách lịch sử khám bệnh
  const handleSetDataSource = async (search_string="") => {
    setSearchString(search_string)
    try {
      let body = {
        partner_code:userProfile.partner_code,
        BENH_NHAN_ID:patientID,
        limit:keys.limit,
        search_string:search_string,
        page:1,
      }
      let res = await common_post(apis.lich_su_kham,body,false)
      if(res && res.status === "OK"){
        let{result} = res
        setDataSource(result)
      }
    } catch (error) {
      HLog("Lỗi lấy danh sách Lịch sử khám bệnh: ",error)
    }

  }
  const handleSearch = (value) => throttle(value => handleSetDataSource(value) ,1000)
  return(
    <>
          <div className={style["thirdContentBar"]}>
        <div className={style["thirdContentBarFlexWrap"]}>
          <div>
            <img src={LichSuKhamBenhIcon} alt="" />
            <h3 style={{ display: "inline", fontWeight: 600 }}>
              {i18n.t(languageKeys.Lich_su_kham_benh)}:
            </h3>
          </div>
          {/* <div>
            <Search
              className={style["thirdContentBarSearch"]}
              placeholder="input search text"
              allowClear
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
          </div> */}
        </div>
        <div className={style["thirdContentBarTable"]}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
      </div>
    </>
  )
}