import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Image } from "antd";
import React, { useState } from "react";
import { CallingPhoneNavBar, MuteMic, Speaker } from "../../../assets/svgs";
import { PopOver } from "../../../components";
import i18n, { languageKeys } from "../../../i18n";
import DatLichKham from "../datLichKham/datLichKham";
import { GhiChu } from "../ghiChu/GhiChu";
import style from "./hskctht.module.less";
// import { ThongTinBenhNhanUnknown } from "../thongTinBenhNhan";
import { UnknownAva } from "../../../assets/imgs";
import { ThongTinBenhNhanUnknown } from "../thongTinBenhNhan";

export default function HoSoChuaCoTrongHeThong() {
  const navBarMenu = [
    "Thông tin bệnh nhân",
    "Ghi chú",
    "Đặt lịch khám",
    "Đặt dịch vụ lâm sàng ",
    "Kê đơn và đặt mua thuốc",
  ];

  const menu = <PopOver />;
  const [currentMenu, setCurrentMenu] = useState(navBarMenu[0]);
  return (
    <div className={style["container"]}>
      <div className={style["title"]}>
        {" "}
        <p>{i18n.t(languageKeys.menu_Tiep_nhan_cuoc_goi)}</p>
      </div>

      <div>
        <div className={style["callingSessionContent"]}>
          <div className={style["calling"]}>
            <div className={style["callingWrapFirstRow"]}>
              <div>
                <div className={style["callingTitle"]}>093 0000 000</div>
                <div className={style["callingTitleTimer"]}>2:40</div>
              </div>
              <div className={style["callingTitleRight"]}>Cuộc gọi đến</div>
            </div>
            <div className={style["callingWrapSecondRow"]}>
              <div className={style["iconNavBarLeft"]}>
                <div>
                  <MuteMic />
                </div>
                <div>
                  <Speaker />
                </div>
              </div>
              <div className={style["iconNavBarRight"]}>
                <div>
                  <CallingPhoneNavBar />
                </div>
              </div>
            </div>
          </div>

          <div className={style["info"]}>
            <div className={style["infoWrap"]}>
              <div className={style["infoLeft"]}>
                <div>
                  <Image src={UnknownAva} />
                </div>
                <div className={style["infoLeftNTName"]}>
                  <div>Unknown</div>
                  <div>
                    <div>
                      <span className={style["greenFont"]}>
                        {" "}
                        Không xác định
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Dropdown overlay={menu} disabled>
                  <Button className={style["dropDownButton"]}>
                    Đổi hồ sơ <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>

            <div gutter={10} className={style["buttonWrap"]}>
              {navBarMenu.map((tab) => (
                <Button
                  className={style["btn"]}
                  key={tab}
                  type={currentMenu === tab ? "primary" : "default"}
                  onClick={() => setCurrentMenu(tab)}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
        </div>
        {
          <div>
            {currentMenu === "Thông tin bệnh nhân" ? (
              <ThongTinBenhNhanUnknown />
            ) : (
              ""
            )}
          </div>
        }

        {
          <div className={style["contentSwapWrap"]}>
            {currentMenu === "Ghi chú" ? <GhiChu /> : ""}
            {currentMenu === "Đặt lịch khám" ? <DatLichKham /> : ""}
          </div>
        }
      </div>
    </div>
  );
}
