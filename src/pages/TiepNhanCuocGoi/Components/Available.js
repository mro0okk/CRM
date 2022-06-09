import { Col, Typography, Row } from "antd";
import style from "../tncg.module.less";
import { avaliable, PicInTiepNhan } from "../../../assets/imgs";
import i18n, { languageKeys } from "../../../i18n";
function Avalaible() {
  return (
    <>
      <div className="site-layout-content">
        <div className={style["noCallDiv"]}>
          <div className={style["picNoCall"]}>
            <img src={PicInTiepNhan} alt="" />
          </div>
          <div className={style["noCallDivTextwrap"]}>
            <div className={`${style["noCallDivTitle"]} navy-txt`}>CRM - Call Center</div>
            <div className="navy-txt">
              {i18n.t(languageKeys.txt_chua_co_cuoc_goi)}.<br/>
               {i18n.t(languageKeys.txt_thuc_hien_cuoc_goi)}!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Avalaible;
