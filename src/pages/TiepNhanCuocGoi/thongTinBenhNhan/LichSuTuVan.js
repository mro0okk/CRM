import { Space } from "antd";
import { useEffect, useState } from "react";
import { lichSuTuVanIcon, NoDataHistory } from "../../../assets/imgs";
import { Called, CallingPhone, HangUpPhone } from "../../../assets/svgs";
import { ThreeDot } from "../../../components";
import apis from "../../../constants/apiOmicall/apiOmiCall";
import { common_post, HLog, rid } from "../../../helpers";
import i18n, { languageKeys } from "../../../i18n";
import { callHistory } from "./fieldThongTin";
import style from "./ttbn.module.less";
const LichSuTuVan = ({ patientId }) => {
  const [dsLichsu, setDsLichsu] = useState([]);
  useEffect(async () => {
    await initData(patientId)

    return () => {
      setDsLichsu([]);
    };
  }, [patientId]);
  const initData = async (BENH_NHAN_ID) => {
    try {
      let body = {
        partner_code: "HOSPITAL_ID",
        BENH_NHAN_ID,
        limit: 15,
        page: 1,
      };
      let res = await common_post(apis.lich_su_kham, body, false);

      if (res && res.status === "OK") {
        let { result } = res
        HLog("DANH_SACH_LICH_SU_KHAM::::", res);
        setDsLichsu(result)
      }
    } catch (error) {
      HLog("Lỗi lấy danh sách lịch sử khám : ", error);
    }
  };

  return (
    <>
      <div className={style["lichSuTuVanTitle"]}>
        <img src={lichSuTuVanIcon} alt="" />
        {i18n.t(languageKeys.lich_su_tu_van)}
      </div>
      {dsLichsu.length === 0 ? (
        <div className={style["wrapper-content"]}>
          <div className={style["top-50"]}>
            <img src={NoDataHistory} alt="" />
            <div>Chưa có lịch sử tư vấn</div>
          </div>
        </div>
      ) : (
        dsLichsu.map((content) => (
          <div className={style["lichSuTuVanContent"]}>
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
          </div>
        ))
      )}
    </>
  );
};

export default LichSuTuVan;
