import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import React from "react";
import { WhiteCalling, WhiteDocument, WhiteSpeaker } from "../../assets/svgs";
import style from "./threeDot.module.less";

export const ThreeDot = (handleMenuClick) => {
  const content = (
    <div className={style["popOverContent"]}>
      <div onClick={() => handleMenuClick()}>
        <span>
          {" "}
          <WhiteCalling className={style["icon"]} />{" "}
        </span>{" "}
        Gọi lại
      </div>
      <div onClick={() => handleMenuClick()}>
        <span>
          {" "}
          <WhiteDocument className={style["icon"]} />
        </span>
        Xem tư vấn và ghi chú
      </div>
      <div onClick={() => handleMenuClick()}>
        <span>
          {" "}
          <WhiteSpeaker className={style["icon"]} />
        </span>
        File ghi âm
      </div>
    </div>
  );
  return (
    <div>
      <Popover
        className={style["popover"]}
        content={content}
        title="Thao tác"
        trigger="click"
      >
        <Button
          className={style["btn"]}
          type="link"
          icon={<EllipsisOutlined />}
        ></Button>
      </Popover>
    </div>
  );
};
