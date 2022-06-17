import { message, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { ProfileIcon } from "../../assets/imgs";
import { BonusIcon } from "../../assets/svgs";
import apis from "../../constants/apiOmicall/apiOmiCall";
import { paths } from "../../constants/paths";
import { common_post, HLog, rid } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";

import style from "./popOver.module.less";

export const ChonHoSo = ({
  onVisible = () => {},
  onFillInfo = () => {},
  dataSource=[], // danh sách bệnh nhân đã đăng ký thông tin
}) => {

  const handleThemMoiClick = () => {
    // history.push(paths.ho_so_chua_co_trong_he_thong);

  };

  function handleMenuClick(info) {
    onVisible(false)
    message.info("Click on menu item.");
    onFillInfo(info);
  }
  return (
    <div className={style["popUp"]}>
      <div className={style["popUpTitle"]}>Chọn hồ sơ bệnh nhân</div>

      {dataSource.map((info) => (
        <div key={rid()}
          className={style["popUpcontentWrap"]}
          onClick={() => handleMenuClick(info)}
        >
          <img src={ProfileIcon} alt="" />
          <div className={style["popUpRightContent"]}>
            <div className={style["titleP"]}>{info.TEN}</div>
            <div className={style["popUpRightContentBelow"]}>
              <div className={style["popUpRightContentGioiTinh"]}>
                {" "}
                {i18n.t(languageKeys.field_Gioi_tinh)}:{" "}
                <span className={style["greenFont"]}> {info.GIOI_TINH} </span>
              </div>
              <div className={style["popUpRightContentNgaySinh"]}>
              {i18n.t(languageKeys.field_Ngay_sinh)}:{" "}
                <span className={style["greenFont"]}> {moment(info.NGAY_SINH).format("DD/MM/YYYY")} </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className={style["buttonPopOver"]}>
        <div onClick={() => handleThemMoiClick()}>
          <span>
            <BonusIcon className={style["bonusIcon"]} />
          </span>{" "}
          {i18n.t(languageKeys.common_Them_moi)}
        </div>
      </div>
    </div>
  );
};
