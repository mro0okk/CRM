import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Col, Drawer, Row } from "antd";
import { BackCircle } from "../../assets/svgs";
import i18n, { languageKeys } from "../../i18n";
import formDrawer from "./formDrawer.module.less";
import { DeleteWhite } from "../../assets/svgs";
import cn from "classnames";

const FormDrawer = ({
  children,
  back,
  onClickBack = () => {},
  width = 800, // Chiều rộng của Drawer
  title = "Form Drawer", // Tiêu đề của Drawer, có thể là string hoặc Component
  onOk = () => {}, // Hàm xử lý khi bấm OK
  onCancel = () => {}, // Hàm xử lý khi bấm Cancel
  okText = i18n.t(languageKeys.common_Luu), // Text của nút OK
  cancelText = i18n.t(languageKeys.common_Huy), // Text của nút Cancel
  deleteText = i18n.t(languageKeys.common_Xoa), // Text của nút Xoá
  showPlusIcon = true, // Hiển thị icon dấu cộng trước tiêu đề (VD là trường hợp tạo mới)
  visible = false, // Hiển thị modal
  loading = false, // Loading nút submit
  addOnActions,
  footer,
  hiddenTopAction = false,
  deleteTopAction = false,
  buttonsAtBottomOfContent = false,
  className = "",
  headerClass = "",
  ...props
}) => {
  return (
    <Drawer
      visible={visible}
      width={width}
      closable={false}
      onClose={onCancel}
      className={className}
      title={
        typeof title === "string" ? (
          <Row
            justify="space-between"
            align="middle"
            className={cn(formDrawer["header"], headerClass)}
            wrap={false}
          >
            {/* =================== Tiêu đề Drawer =================== */}
            <Row align="middle" gutter={10}>
              {showPlusIcon && (
                <Col>
                  <PlusCircleFilled className={formDrawer["icon"]} />
                </Col>
              )}
              {back && (
                <Col>
                  <BackCircle
                    className={formDrawer["icon"]}
                    onClick={onClickBack}
                  />
                </Col>
              )}

              <Col>
                <h1 style={{ marginBottom: 0 }}>{title}</h1>
              </Col>
            </Row>

            <Row gutter={10} align="middle">
              {!!addOnActions && <Col>{addOnActions}</Col>}

              {!hiddenTopAction && deleteTopAction && (
                <Col className={formDrawer["button-row"]}>
                  {/* =================== Nút Cancel =================== */}
                  <Button
                    type="primary"
                    ghost
                    onClick={onCancel}
                    style={{
                      backgroundColor: "#ED6B69",
                      color: "#FFF",
                      border: "0",
                    }}
                    icon={<DeleteWhite style={{ marginRight: "8px" }} />}
                    className={formDrawer["button"]}
                  >
                    {deleteText}
                  </Button>
                </Col>
              )}

              {!buttonsAtBottomOfContent && !hiddenTopAction && (
                <Col>
                  {/* =================== Nút Cancel =================== */}
                  <Button
                    type="primary"
                    ghost
                    onClick={onCancel}
                    className={formDrawer["button"]}
                  >
                    {cancelText}
                  </Button>
                </Col>
              )}

              {!buttonsAtBottomOfContent && !hiddenTopAction && (
                <Col>
                  {/* =================== Nút OK =================== */}
                  <Button
                    type="primary"
                    loading={loading}
                    onClick={onOk}
                    className={formDrawer["button"]}
                  >
                    {okText}
                  </Button>
                </Col>
              )}
            </Row>
          </Row>
        ) : (
          title
        )
      }
      footer={footer}
    >
      <div className={formDrawer["container"]}>{children}</div>

      {buttonsAtBottomOfContent && (
        <Row
          gutter={10}
          align="middle"
          justify="end"
          style={{ padding: "15px 25px" }}
        >
          {/* {!!addOnActions && <Col>{addOnActions}</Col>} */}

          {!hiddenTopAction && (
            <Col>
              {/* =================== Nút Cancel =================== */}
              <Button
                type="primary"
                ghost
                onClick={onCancel}
                className={formDrawer["button"]}
              >
                {cancelText}
              </Button>
            </Col>
          )}

          {!hiddenTopAction && (
            <Col>
              {/* =================== Nút OK =================== */}
              <Button
                type="primary"
                loading={loading}
                onClick={onOk}
                className={formDrawer["button"]}
              >
                {okText}
              </Button>
            </Col>
          )}
        </Row>
      )}
    </Drawer>
  );
};

export default FormDrawer;
