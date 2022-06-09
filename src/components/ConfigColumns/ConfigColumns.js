import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Row, Col } from "antd";
import React, { useMemo, useState, useEffect } from "react";
import { HLog } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";
import style from "./configColumns.module.less";

export const ConfigColumns = ({ getColumns = [], setColumns = () => {} }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initColumns = useMemo(() => getColumns, []);
  const [unCheckedColumns, setUnCheckedColumns] = useState([]); // danh sách column ẩn đi
  const [daKiemTraUnViewer, setDaKiemTraUnViewer] = useState(false); //biến kiểm tra đã check các trường unviewer hay chưa

  //hàm xử lí bỏ check các cột không cần check khi vào lần đầu
  useEffect(() => {
    if(unCheckedColumns.length > 0 || daKiemTraUnViewer) { //nếu trước đó đã check điều kiện bên dưới rồi thì bỏ qua lần sau, vì initColumns sẽ set nhiều lần
      return;
    }
    let newUnCheckedColumns = [];
    for(let i = 0; i < getColumns.length; i++){
      if(getColumns[i] && getColumns[i].unViewer) {
        newUnCheckedColumns.push(getColumns[i].key);
      }
    }
    HLog("ConfigColumns useEffect newUnCheckedColumns: ", newUnCheckedColumns)
    setUnCheckedColumns(newUnCheckedColumns);
    setDaKiemTraUnViewer(true);
  }, [getColumns]);

  const handleChange = (e) => {
    let copyColumns = unCheckedColumns;
    if (e.target.checked) {
      copyColumns = copyColumns.filter((id) => {
        return id !== e.target.id;
      });
    } else if (!e.target.checked) {
      copyColumns.push(e.target.id);
    }

    let filtered = initColumns;
    filtered = filtered.filter(
      (column) => !copyColumns.some((id) => id === column.key)
    );

    setUnCheckedColumns(copyColumns);
    setColumns(filtered);
  };

  const handleClickReset = () => {
    setColumns(initColumns);
    setUnCheckedColumns([]);
  };

  return (
    <Dropdown
      trigger="click"
      overlay={
        <>
          <div className={style["popup-wrapper"]}>
            <div className={style["label"]}>Tùy chỉnh cột</div>

            <Row className={style["popup-checkbox"]}>
              {initColumns.map((column) => {
                const id = column.key;
                return (
                  <Col className={style["item"]} key={id} span={12}>
                    <Checkbox
                      checked={!unCheckedColumns.some((_id) => _id === id)}
                      id={id}
                      onChange={handleChange}
                    >
                      {column.title}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
            <Row align="middle" justify="start" className={style["button-row"]}>
              <Button
                type="primary"
                ghost
                className={style["button"]}
                onClick={handleClickReset}
              >
                {i18n.t(languageKeys.common_cai_dat_lai)}
              </Button>
            </Row>
          </div>
        </>
      }
      overlayClassName={style["popup"]}
    >
      <Button
        type="primary"
        icon={<UnorderedListOutlined style={{ color: "#fff" }} />}
      ></Button>
    </Dropdown>
  );
};
