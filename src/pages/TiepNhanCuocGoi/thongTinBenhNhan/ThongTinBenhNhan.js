import { Button, Table } from "antd";
import Search from "antd/lib/transfer/search";
import React, { useState } from "react";
import style from "./ttbn.module.less";
import { Called, CallingPhone, HangUpPhone } from "../../../assets/svgs";
import cn from "classnames";
import { ThreeDot } from "../../../components/threeDotButton/ThreeDot";
import i18n, { languageKeys } from "../../../i18n";
import {
  HoSoKhamBenhIcon,
  Iconsth,
  LichSuKhamBenhIcon,
  lichSuTuVanIcon,
} from "../../../assets/imgs";

export const ThongTinBenhNhan = () => {
  const hoSoSucKhoeTabs = [
    "Tình trạng lúc sinh",
    "Yếu tố nguy cơ",
    "Tiền sử bệnh tật",
    "Khuyết tật",
    "Tiền sử phẫu thuật",
    "Tiền sử gia đình",
    "Sức khỏe sinh sản",
    "Vấn đề khác",
  ];
  const callHistory = [
    {
      status: "hangUp",
      date: " 22/02/2000",
      duration: "04:55 s",
    },

    {
      status: "hangUp",
      date: " 22/02/2000",
      duration: "04:55 s",
    },
    {
      status: "calling",
      date: " 22/02/2000",
      duration: "04:55 s",
    },
    {
      status: "called",
      date: " 22/02/2000",
      duration: "04:55 s",
    },
    {
      status: "called",
      date: "22/02/2000",
      duration: "04:55 s",
    },
    {
      status: "hangUp",
      date: " 22/02/2000",
      duration: "04:55 s",
    },
  ];
  const columns = [
    {
      title: "Ngày khám bệnh",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Bệnh viện khám",
      dataIndex: "hospital",
      key: "hospital",
    },
    {
      title: "Phòng thực hiện",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Bác sĩ",
      key: "doctor",
      dataIndex: "doctor",
    },
    {
      title: "Chẩn đoán bệnh chính",
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
  const [currentTab, setCurrentTab] = useState(hoSoSucKhoeTabs[0]);
  const onSearch = (value) => console.log(value);

  return (
    <div className={style["navBarContent"]}>
      <div className={style["firstContentBar"]}>
        <div className={style["thongTinHanhChinh"]}>
          <div className={style["thongTinHanhChinhTitle"]}>
            <img src={Iconsth} alt="" />
            {i18n.t(languageKeys.thong_tin_tai_chinh)}
          </div>
          <div className={style["row-xyz"]}>
            <div className={style["col1"]}>
              <div>Họ và tên</div>
              <div className={style["infoName"]}>Bessie Cooper</div>
            </div>
            <div className={style["col1"]}>
              <div>Ngày sinh</div>
              <div className={style["infoText"]}>22/02/2000</div>
            </div>
            <div className={style["col1"]}>
              <div>Giới tính</div>
              <div className={style["infoText"]}>Nam</div>
            </div>
            <div className={style["col1"]}>
              <div>CMND/CCCD</div>
              <div className={style["infoText"]}>32504070683500</div>
            </div>
            <div className={style["col1"]}>
              <div>Số điện thoại</div>
              <div className={style["infoText"]}>0983 899 990</div>
            </div>
            <div className={style["col1"]}>
              <div>Email</div>
              <div className={style["infoText"]}>bessiecooper@gmail.com</div>
            </div>
            <div className={style["col1"]}>
              <div>Tỉnh/thành phố</div>
              <div className={style["infoText"]}>Hà nội</div>
            </div>
            <div className={style["col1"]}>
              <div>Quận/huyện</div>
              <div className={style["infoText"]}>Thanh Xuân</div>
            </div>
            <div className={style["col1"]}>
              <div>Xã/phường</div>
              <div className={style["infoText"]}>Thanh Xuân Trung</div>
            </div>
            <div className={cn(style["col1"], style["col-full"])}>
              <div>Địa chỉ chi tiết</div>
              <div className={style["infoText"]}>
                Lô 22, số 35 Lê Văn Thiêm, Thanh Xuân Trung, Thanh Xuân, Hà Nội{" "}
              </div>
            </div>
            <div className={style["col1"]}>
              <div>Nghề nghiệp</div>
              <div className={style["infoText"]}>Sinh viên</div>
            </div>
            <div className={style["col1"]}>
              <div>Dân tộc</div>
              <div className={style["infoText"]}>Kinh</div>
            </div>
            <div className={style["col1"]}>
              <div>Quốc gia</div>
              <div className={style["infoText"]}>Việt Nam</div>
            </div>
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
                <div className={style["lichSuTuVanPhone"]}>
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
          Hồ sơ sức khỏe
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
                  Hình thức đẻ:
                </div>
                <div className={style["t-col"]}>Đẻ thường</div>
              </div>

              <div className={style["t-row"]}>
                <div className={cn(style["t-col"], style["left"])}>
                  Cân nặng lúc đẻ:
                </div>
                <div className={style["t-col"]}>3,5 kg</div>
              </div>

              <div className={style["t-row"]}>
                <div className={cn(style["t-col"], style["left"])}>
                  Chiều dài lúc đẻ:
                </div>
                <div className={style["t-col"]}>50 cm</div>
              </div>
              <div className={style["t-row"]}>
                <div className={cn(style["t-col"], style["left"])}>
                  Vấn đề khác:
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
            Lịch sử khám bệnh
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
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
    </div>
  );
};
