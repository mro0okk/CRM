import { Button, Input, Select, Table, Form } from "antd";
import Search from "antd/lib/transfer/search";
import React, { useCallback, useEffect, useState } from "react";
import style from "./ttbn.module.less";
import { Called, CallingPhone, HangUpPhone } from "../../../assets/svgs";
import cn from "classnames";
import moment from "moment";
import { ThreeDot } from "../../../components/threeDotButton/ThreeDot";
import i18n, { languageKeys } from "../../../i18n";
import {
  HoSoKhamBenhIcon,
  Iconsth,
  LichSuKhamBenhIcon,
  lichSuTuVanIcon,
} from "../../../assets/imgs";
import {
  callHistory,
  fieldThongTinBenhNhan,
  hoSoSucKhoeTabs,
} from "./fieldThongTin";
import { common_post, HLog, rid } from "../../../helpers";
import { useSelector } from "react-redux";
import { throttle } from "lodash";
import apis from "../../../constants/apis";

const { Item } = Form;

export const ThongTinBenhNhan = ({ editable = false, form }) => {
  const [currentTab, setCurrentTab] = useState(hoSoSucKhoeTabs[0]);
  const [dataSource, setDataSource] = useState(data);
  const [searchString, setSearchString] = useState("");
  const userProfile = useSelector((state) => state.auth.user);

  useEffect(() => {
    return () => {
     form.resetFields()
     setSearchString("")
     setDataSource([])
    }
  },[])

  const handleGetDataSource = async (search_string = "", BENH_NHAN_ID) => {
    setSearchString(search_string);
    let body = {
      partner_code: userProfile.partner_code,
      BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
      BENH_NHAN_ID: BENH_NHAN_ID,
      search_string,
    };
    try {
      let response = await common_post(apis, body, false);
      if (response && response.status === "OK") {
        // setDataSource(response)
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
    <div className={style["navBarContent"]}>
      <div className={style["firstContentBar"]}>
        <div className={style["thongTinHanhChinh"]}>
          <div className={style["thongTinHanhChinhTitle"]}>
            <img src={Iconsth} alt="" />
            {i18n.t(languageKeys.field_Thong_tin_hanh_chinh)}
          </div>
          <div className={style["row-xyz"]}>
            <Item
              rules={[
                {
                  required: true,
                },
              ]}
              name={fieldThongTinBenhNhan.HO_TEN}
              className={style["col1"]}
            >
              <div>{i18n.t(languageKeys.ho_va_ten)}:</div>
              <div className={style["infoName"]}>
                <Input
                  readOnly={!editable}
                  bordered={!editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </div>
            </Item>
            <Item
              name={fieldThongTinBenhNhan.NGAY_SINH}
              className={style["col1"]}
            >
              <div>{i18n.t(languageKeys.field_Ngay_sinh)}:</div>
              <div className={style["infoText"]}>
                <Input
                  readOnly={!editable}
                  bordered={!editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </div>
            </Item>
            <Item
              name={fieldThongTinBenhNhan.GIOI_TINH}
              className={style["col1"]}
            >
              <div>{i18n.t(languageKeys.field_Gioi_tinh)}:</div>
              <Select placeholder={i18n.t(languageKeys.common_Chon)} />
            </Item>
            <Item name={fieldThongTinBenhNhan.CMND} className={style["col1"]}>
              <div>{i18n.t(languageKeys.field_CMND_CCCD)}:</div>
              <div className={style["infoText"]}>
                <Input
                  readOnly={!editable}
                  bordered={!editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </div>
            </Item>
            <Item name={fieldThongTinBenhNhan.SO_DT} className={style["col1"]}>
              <div>{i18n.t(languageKeys.field_So_dien_thoai)}:</div>
              <div className={style["infoText"]}>
                <Input
                  readOnly={!editable}
                  bordered={!editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </div>
            </Item>
            <Item name={fieldThongTinBenhNhan.EMAIL} className={style["col1"]}>
              <div>{i18n.t(languageKeys.field_Email)}:</div>
              <div className={style["infoText"]}>
                <Input
                  readOnly={!editable}
                  bordered={!editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />
              </div>
            </Item>
            <Item name={fieldThongTinBenhNhan.TINH} className={style["col1"]}>
              <div>{i18n.t(languageKeys.field_Tinh_thanh)}:</div>
              <Select placeholder={i18n.t(languageKeys.common_Chon)} />
            </Item>
            <Item
              name={fieldThongTinBenhNhan.QUAN_HUYEN}
              className={style["col1"]}
            >
              <div>{i18n.t(languageKeys.field_Quan_huyen)}:</div>
              <Select placeholder={i18n.t(languageKeys.common_Chon)} />
            </Item>
            <Item
              name={fieldThongTinBenhNhan.XA_PHUONG}
              className={style["col1"]}
            >
              <div>{i18n.t(languageKeys.field_Xa_phuong)}:</div>
              <Select placeholder={i18n.t(languageKeys.common_Chon)} />
            </Item>
            <Item
              name={fieldThongTinBenhNhan.DIA_CHI}
              className={cn(style["col1"], style["col-full"])}
            >
              <div>{i18n.t(languageKeys.field_Dia_chi_chi_tiet)}</div>
              <div className={style["infoText"]}>
                <Input
                  readOnly={!editable}
                  bordered={!editable}
                  placeholder={i18n.t(languageKeys.common_Nhap)}
                />{" "}
              </div>
            </Item>
            <Item
              name={fieldThongTinBenhNhan.NGHE_NGHIEP}
              className={style["col1"]}
            >
              <div>{i18n.t(languageKeys.field_Nghe_nghiep)}:</div>
              <div className={style["infoText"]}>
                <Select placeholder={i18n.t(languageKeys.common_Chon)} />
              </div>
            </Item>
            <Item
              name={fieldThongTinBenhNhan.DAN_TOC}
              className={style["col1"]}
            >
              <div>{i18n.t(languageKeys.field_Dan_toc)}:</div>
              <div className={style["infoText"]}>
                <Select placeholder={i18n.t(languageKeys.common_Chon)} />
              </div>
            </Item>
            <Item
              name={fieldThongTinBenhNhan.QUOC_GIA}
              className={style["col1"]}
            >
              <div>{i18n.t(languageKeys.field_Quoc_gia)}:</div>
              <div className={style["infoText"]}>
                <Select placeholder={i18n.t(languageKeys.common_Chon)} />
              </div>
            </Item>
          </div>
        </div>
        <div className={style["lichSuTuVan"]}>
          <div className={style["lichSuTuVanChild"]}>
            <div className={style["lichSuTuVanTitle"]}>
              <img src={lichSuTuVanIcon} alt="" />
              {i18n.t(languageKeys.lich_su_tu_van)}
            </div>
            <div className={style["lichSuTuVanContent"]}>
              {callHistory.map((content) => (
                <div key={rid()} className={style["lichSuTuVanPhone"]}>
                  <div>
                    {content.status === "called" ? (
                      <Called className={style["iconPhone"]} />
                    ) : content.status === "hangUp" ? (
                      <HangUpPhone className={style["iconPhone"]} />
                    ) : content.status === "hangUp" ? (
                      <HangUpPhone className={style["iconPhone"]} />
                    ) : content.status === "calling" ? (
                      <CallingPhone className={style["iconPhone"]} />
                    ) : (
                      ""
                    )}

                    <span>{i18n.t(languageKeys.ngay_goi)}: </span>
                    <span className={style["heavyBlue"]}>{content.date}</span>
                  </div>

                  <div className={style["lichSuTuVanRightWrap"]}>
                    <div>
                      <span className={style["blue"]}>{content.duration}</span>
                    </div>
                    <div>
                      <ThreeDot />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, ... Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style["thirdContentBar"]}>
        <div className={style["thirdContentBarFlexWrap"]}>
          <div>
            <img src={LichSuKhamBenhIcon} alt="" />
            {i18n.t(languageKeys.Lich_su_kham_benh)}:
          </div>
          <div>
            <Search
              className={style["thirdContentBarSearch"]}
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
        </div>
        <div className={style["thirdContentBarTable"]}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
      </div>
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
