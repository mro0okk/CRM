import Topbar from "../../components/Topbar/Topbar";
import { rid } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";

import style from "./bdk.module.less";

export const BangDieuKhien = () => {
  const nhanVien = [
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },

    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: "Đang online",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
    {
      status: " offline",
      name: "Cameron Williamson",
      email: "jacojones@gmail.com",
    },
  ];

  return (
    <div className={style["container"]}>
      <Topbar
        className={style["topbar"]}
        title={i18n.t(languageKeys.trang_thai_nhan_vien)}
        // addBtnText={i18n.t(languageKeys.title_Tao_cuoc_hen)}
        // onAdd={() => configRef.current.open(null, actionCuocHen.THEM_MOI)}
        // searchString={searchString}
        // setSearchString={setSearchString}
        // onSearch={submitSearch}
        showTotalNum={false}
      />

      <div className={style["wrap"]}>
        {nhanVien.map((staff) => (
          <div 
            key={rid()}
          className={style["contentWrap"]}>
            {staff.status === "Đang online" ? (
              <div className={style["status1"]}>{staff.status}</div>
            ) : (
              <div className={style["status2"]}>{staff.status}</div>
            )}

            <div className={style["name"]}>{staff.name}</div>
            <div className={style["email"]}>{staff.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
