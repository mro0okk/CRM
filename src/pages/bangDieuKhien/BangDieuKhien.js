import { Spin } from "antd";
import { useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import apis from "../../constants/apiOmicall/apiOmiCall";
import { getPhoneService, HLog, localGet, rid } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";

import style from "./bdk.module.less";

export const BangDieuKhien = () => {
  const [currPage, setCurrPage] = useState(1);
  const [dsNhanVien, setDsNhanVien] = useState([]);

  useEffect(async () => {
    await handleGetDataSource();
    return () => {
      setCurrPage(1);
    };
  }, []);

  const handleGetDataSource = async (search_string = "") => {
    try {
      let params = {
        page: currPage,
        size: 15,
        keyword: search_string,
      };
      let res = await getPhoneService(apis.ds_nhan_vien, params);
      HLog("DS_NHAN_VIEN", res);
      if (res) {
        let { next_page, page_number, total_items,items } = res;
        
        setDsNhanVien(items.map(item => ({...item,key:rid()})));
      }
    } catch (error) {
      HLog("Lỗi lấy danh sách nhân viên:", error);
    }
  };

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
        {dsNhanVien.length === 0 ? (
          <>              
            <Spin/>
          </>
        ): (
          <>
            {
              dsNhanVien.map((staff) => (
                <div key={rid()} className={style["contentWrap"]}>
                  {staff.is_active ? (
                    <div className={style["status1"]}>Online</div>
                  ) : (
                    <div className={style["status2"]}>Offline</div>
                  )}
      
                  <div className={style["name"]}>{staff.create_by.name}</div>
                  <div className={style["email"]}>{staff.identify_info}</div>
                </div>
              ))
            }
          </>
        )}
      </div>
    </div>
  );
};
