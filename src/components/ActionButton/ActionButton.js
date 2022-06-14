import { memo } from "react";
import { EllipsisOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Popover, Row } from "antd";
import { Delete, Edit } from "../../assets/svgs";
import i18n, { languageKeys } from "../../i18n";
import actionButton from "./actionButton.module.less";

export const ActionButton = memo(
  ({
    record = {}, // Bản ghi
    onDelete = () => {}, // Hàm xóa bản ghi
    onEdit = () => {}, // Hàm sửa bản ghi
    showEdit = true,
    showPrint = false,
    onPrint = () => {}, // Hàm in bản ghi
    showDelete = true,
  }) => {
    return (
      <Popover
        content={
          <>
            <div className={actionButton["wrapper"]}>
              <div className={actionButton["label"]}>
                {i18n.t(languageKeys.field_Thao_tac)}
              </div>

              {/* ================= Xóa bản ghi ================== */}
              {showDelete && (
                <Row
                  className={actionButton["item"]}
                  onClick={() => onDelete(record)}
                >
                  <Delete />{" "}
                  <div className={actionButton["txt"]}>
                    {i18n.t(languageKeys.common_Xoa)}
                  </div>
                </Row>
              )}

              {/* ================= Sửa bản ghi ================== */}
              {showEdit && (
                <Row
                  className={actionButton["item"]}
                  onClick={() => onEdit(record)}
                >
                  <Edit />{" "}
                  <div className={actionButton["txt"]}>
                    {i18n.t(languageKeys.common_Chinh_sua)}
                  </div>
                </Row>
              )}
              {showPrint && (
                <Row
                  className={actionButton["item"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrint(record);
                  }}
                >
                  <PrinterOutlined style={{ fontSize: "22px" }} />{" "}
                  <div className={actionButton["txt"]}>
                    {i18n.t(languageKeys.field_In_phieu)}
                  </div>
                </Row>
              )}
            </div>
          </>
        }
        trigger="click"
        zIndex={1}
        placement="bottomRight"
        overlayClassName={actionButton["popup"]}
      >
        {/* ================= Nút \dấu 3 chấm dọc\ ================== */}
        <Button
          icon={<EllipsisOutlined />}
          type="link"
          className={actionButton["action-btn"]}
          onClick={(e) => e.stopPropagation()}
        ></Button>
      </Popover>
    );
  }
);
