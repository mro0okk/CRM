import { Button } from "antd";
import React, { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { Pencil, PencilGreen } from "../../../assets/svgs";
import TextBox from "../../../components/textBox/TextBox";
import { phoneStatus } from "../../../constants/phoneStatus";
import style from "./ghiChu.module.less";

export const GhiChu = ({
  form,
}) => {

  const [advise, setAdvise] = useState("");
  const [note, setNote] = useState("");

  const { status } = useSelector(state => state.call)


  // useEffect(async () => {

  //   if(status === phoneStatus.end_call){
  //     form.setFields([
  //       {
  //         name: 'GHI_CHU_NGUOI_BENH',
  //         value:advise,
  //       },
  //    ])
  //   }
  // },[status])

  //lời khuyên bệnh nhân
  const handleSetAdvise = (value) => {
    let jsonValue = JSON.stringify(value)
    setAdvise(jsonValue)
  }
  // ghi chú tư vấn
  const handleSetNote = (value) => {
   let jsonValue = JSON.stringify(value)
    setNote(jsonValue)
  }

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
        <TextBox onText={handleSetAdvise} />
      </div>
      <div className={style["wrap"]}>
        <div className={style["textTitleWrap"]}>
          <div className={style["textTitleIcon2"]}>
            <PencilGreen />
          </div>
          <div className={style["textTitle"]}>Ghi chú tư vấn (nếu có) *</div>
        </div>
        <TextBox onText={handleSetNote} />
      </div>
    </div>
  );
};
