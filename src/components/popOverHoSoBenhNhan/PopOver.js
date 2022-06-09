import { message } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { ProfileIcon } from "../../assets/imgs";
import { BonusIcon } from "../../assets/svgs";
import { paths } from "../../constants/paths";

import style from "./popOver.module.less";

export const PopOver = () => {
  const history = useHistory();
  const hoSoBenhNhan = [
    {
      status: false,
      name: "Jerome Bell",
      gender: "Nam",
      dob: "22311/03/2000",
    },
    {
      name: "Wade Warren",
      status: false,
      gender: "Nam",
      dob: "2231/03/2000",
    },
    {
      name: "Albert Flores",
      status: false,
      gender: "Nữ",
      dob: "21/03/2000213",
    },
    {
      name: "Jerome Bell",
      status: false,
      gender: "Nam",
      dob: " 21/033/2000",
    },
  ];
  const handleThemMoiClick = () => {
    history.push(paths.ho_so_chua_co_trong_he_thong);
  };

  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log(e);
    history.push(paths.tiep_nhan_ho_so);
  }
  return (
    <div className={style["popUp"]}>
      <div className={style["popUpTitle"]}>Chọn hồ sơ bệnh nhân</div>

      {hoSoBenhNhan.map((info) => (
        <div
          className={style["popUpcontentWrap"]}
          onClick={() => handleMenuClick(info)}
        >
          <img src={ProfileIcon} alt="" />
          <div className={style["popUpRightContent"]}>
            <div className={style["titleP"]}>{info.name}</div>
            <div className={style["popUpRightContentBelow"]}>
              <div className={style["popUpRightContentGioiTinh"]}>
                {" "}
                Giới tính:{" "}
                <span className={style["greenFont"]}> {info.gender} </span>
              </div>
              <div className={style["popUpRightContentNgaySinh"]}>
                Ngày sinh:{" "}
                <span className={style["greenFont"]}> {info.dob} </span>
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
          Thêm mới
        </div>
      </div>
    </div>
  );
};
