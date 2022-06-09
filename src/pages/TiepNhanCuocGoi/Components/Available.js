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
            <div className={style["noCallDivTitle"]}>CRM - Call Center</div>
            <div className={style["noCallDivText"]}>
              Bạn chưa có cuộc gọi nào đang diễn ra. Vui lòng thực hiện cuộc
              gọi!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Avalaible;
