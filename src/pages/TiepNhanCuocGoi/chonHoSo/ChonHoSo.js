import i18n, { languageKeys } from "../../../i18n";
import style from "./chs.module.less";

import React, { 
  
} from "react";

import { CallingPhoneNavBar, MuteMic, Speaker } from "../../../assets/svgs";
import { Modal} from "antd";
import { PopOver } from "../../../components";

export const ChonHoSo = () => {
  return (
    <div className={style["container"]}>
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
      </div>
      <div>
        <div className={style["dontDOit"]}>
          <Modal visible={true} closable={false} footer={null}>
            <PopOver />
          </Modal>
        </div>
      </div>
    </div>
  );
};
