import topbar from "./topbar.module.less";
import cn from "classnames";
import { Button, Input, Layout, Popover } from "antd";
import i18n, { languageKeys } from "../../i18n";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Export, FileDownload, Import } from "../../assets/svgs";
import { ConfigColumns } from "../ConfigColumns/ConfigColumns";

const Topbar = ({
  title, // tiêu đề của topbar
  onSearch, // hàm tìm kiếm
  onAdd, // hàm thêm mới
  totalNum, // độ lớn tập dữ liệu
  searchString = "", // Text tìm kiếm
  setSearchString = () => {}, // Hàm set Text tìm kiếm
  onImport, // Hàm xử lý import
  onExport, // Hàm xử lý export
  addOnActions, // component add thêm vào phần sau của topbar
  className,
  showImportExport = true,
  onSetting, // hàm chỉnh sửa cài đặt
  textSetting,
  addBtnText,
  showTotalNum = true,
  activeResponsive = true,
  onDownloadTemplate,
  showColumns = false,
  getColumns = [],
  setColumns = () => {},
  onAddStyle = {},
  disabled = false,
  defaultColumns = [],
  ...props
}) => {
  return (
    <Layout.Header
      {...props}
      className={cn(
        topbar["container"],
        disabled && topbar["visible"],
        className
      )}
    >
      {/* ====== Tiêu đề Topbar + Tổng số dữ liệu + Component(s) Add-on ====== */}
      {typeof title === "string" ? (
        <div className={topbar["title"]}>
          <h3>{title}</h3>

          {showTotalNum && (
            <div className={topbar["total-num"]}>{totalNum}</div>
          )}
        </div>
      ) : (
        title
      )}

      {/* =================== Thanh tìm kiếm =================== */}
      <div className={topbar["actions"]} style={onAddStyle}>
        {!!addOnActions && addOnActions}

        {!!onSearch && (
          <>
            <Input
              className={cn(
                topbar["search"],
                activeResponsive && topbar["search-responsive"]
              )}
              placeholder={i18n.t(languageKeys.common_Tim_kiem)}
              prefix={<SearchOutlined className={topbar["icon"]} />}
              onChange={(e) => setSearchString(e.target.value)}
              onPressEnter={() => onSearch()}
              value={searchString}
            />

            {activeResponsive && (
              <div className={topbar["searchbar-responsive"]}>
                <Popover
                  content={
                    <Input
                      prefix={
                        <SearchOutlined className={topbar["blue-icon"]} />
                      }
                      value={searchString}
                      onChange={(e) => setSearchString(e.target.value)}
                      onPressEnter={() => onSearch()}
                      placeholder={i18n.t(languageKeys.common_Tim_kiem)}
                    />
                  }
                  placement="bottomRight"
                >
                  <Button
                    type="primary"
                    ghost
                    icon={<SearchOutlined className={topbar["blue-icon"]} />}
                  ></Button>
                </Popover>
              </div>
            )}
          </>
        )}

        {/* =================== Nút thêm mới =================== */}
        {!!onSetting && (
          <Button
            className={topbar["add-btn"]}
            type="primary"
            onClick={onSetting}
          >
            {textSetting}
          </Button>
        )}

        {!!onAdd && (
          <Button
            className={topbar["add-btn"]}
            icon={<PlusOutlined className={topbar["icon"]} />}
            type="primary"
            onClick={() => onAdd()}
          >
            {!!addBtnText ? addBtnText : i18n.t(languageKeys.common_Them_moi)}
          </Button>
        )}

        {showImportExport && !!onImport && (
          <Button
            icon={<Export style={{ width: 16, height: 16, marginTop: 5 }} />}
            onClick={() => onImport()}
          ></Button>
        )}

        {showImportExport && !!onExport && (
          <Button
            icon={<Import style={{ width: 15, height: 15, marginTop: 5 }} />}
            onClick={() => onExport()}
          ></Button>
        )}

        {!!onDownloadTemplate && (
          <Button
            icon={
              <FileDownload style={{ width: 18, height: 18, marginTop: 4 }} />
            }
            onClick={() => onDownloadTemplate()}
          ></Button>
        )}

        {!!showColumns && (
          <ConfigColumns getColumns={getColumns} setColumns={setColumns} />
        )}
      </div>
    </Layout.Header>
  );
};

export default Topbar;
