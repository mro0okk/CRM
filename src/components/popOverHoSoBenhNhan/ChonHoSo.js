import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ProfileIcon } from "../../assets/imgs";
import { BonusIcon } from "../../assets/svgs";
import apis from "../../constants/apis";
import { paths } from "../../constants/paths";
import { common_post, HLog, rid } from "../../helpers";

import style from "./popOver.module.less";

export const ChonHoSo = ({
  phoneNumber = "",
  onVisible = () => {},
  onFillInfo = () => {},
}) => {
  const history = useHistory();

  const [dsHoSo, setDsHoSo] = useState([{}]); // danh sách bệnh nhân đã đăng ký thông tin

  // const {client} = useSelector(state => state.call)

useEffect(() => {
  HLog("SADASDASDASDASD",phoneNumber)
  // handleGetDataSource()
  return () => {
    setDsHoSo([])
  }
},[phoneNumber])

  const handleGetDataSource = async () => {
    let body ={
      BENH_VIEN_ID: "H-b75521add5",
      partner_code: "tmedical",
      search_string:phoneNumber,
    }
    try {
      let res = common_post(apis.ds_benh_nhan,body,false)
      if(res && res.status === "OK"){
        HLog("Danh_sach_ho_so_benh_nhan",res)
      }
    } catch (error) {
      
    }
  }


  const handleThemMoiClick = () => {
    // history.push(paths.ho_so_chua_co_trong_he_thong);
  };

  function handleMenuClick(e) {
    onVisible(false)
    message.info("Click on menu item.");
    onFillInfo();
  }
  return (
    <div className={style["popUp"]}>
      <div className={style["popUpTitle"]}>Chọn hồ sơ bệnh nhân</div>

      {dsHoSo.map((info) => (
        <div key={rid()}
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
