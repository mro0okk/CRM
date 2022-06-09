import { Button } from "antd";
import React from "react";

import "react-quill/dist/quill.snow.css";
import { Pencil, PencilGreen } from "../../../assets/svgs";
import { TextBox } from "../../../components";
import style from "./ghiChu.module.less";

export const GhiChu = () => {
  return (
    <div className={style["containerWrap"]}>
      <div className={style["wrap"]}>
        <div className={style["textTitleWrap"]}>
          <div className={style["textTitleIcon"]}>
            <Pencil />
          </div>
          <div className={style["textTitle"]}>
            Lời khuyên và ghi chú cho người bệnh *
          </div>
        </div>
        <TextBox />
      </div>
      <div className={style["wrap"]}>
        <div className={style["textTitleWrap"]}>
          <div className={style["textTitleIcon2"]}>
            <PencilGreen />
          </div>
          <div className={style["textTitle"]}>Ghi chú tư vấn (nếu có) *</div>
        </div>
        <TextBox />
      </div>

      <Button type="primary" className={style["button"]}>
        Lưu
      </Button>
    </div>
  );
};
