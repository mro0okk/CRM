import { Button, Col, Row, Table as TableAntd } from "antd";
import table from "./table.module.less";
import cn from "classnames";
import { HLog } from "../../helpers";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import i18n, { languageKeys } from "../../i18n";

const Table = ({
  columns = [], // Danh sách cột
  dataSource = [], // Danh sách bản ghi (đã add key)
  loading = false, // Loading khi cập nhật danh sách dữ liệu
  onClickRow, // Hàm xử lý khi bấm vào dòng bản ghi
  onSelectRows, // Hàm xử lý khi tích chọn (nhiều) dòng
  selectedRows = [], // Danh sách các dòng đã được tích chọn
  className,
  showPagination = false,
  currentPage = 0,
  totalResult = 0,
  limit = 0,
  onNext = () => {},
  onPrev = () => {},
  rowPropsConfig = () => {},
  ...props
}) => {
  const onRow = (record) => ({
    onClick: () => {
      HLog("Click table row", record);
      !!onClickRow && onClickRow(record);
    },
  });

  return (
    <div className={className}>
      <TableAntd
        {...props}
        className={cn(
          table["container"],
          dataSource.length === 1 && table["only-one"]
        )}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={loading}
        onRow={onRow}
        rowClassName={!!onClickRow && table["clickable"]}
        rowSelection={
          !!onSelectRows && {
            onChange: (_, rows) => {
              HLog("Select rows", rows);
              onSelectRows(rows);
            },
            selectedRowKeys: selectedRows.map((row) => row.key),
            getCheckboxProps: rowPropsConfig,
          }
        }
      />

      {showPagination && (
        <Row align="middle" className={table["pagination"]}>
          <Col className={table["text"]}>
            {totalResult > limit
              ? `${1 + (currentPage - 1) * limit} ${
                  1 + (currentPage - 1) * limit !==
                  (currentPage * limit < totalResult
                    ? currentPage * limit
                    : totalResult)
                    ? `- ${
                        currentPage * limit < totalResult
                          ? currentPage * limit
                          : totalResult
                      }`
                    : ""
                } ${i18n.t(languageKeys.common_trong)} ${totalResult}`
              : `${totalResult} ${i18n.t(languageKeys.field_Ket_qua)}`}
          </Col>

          <Col style={{ marginRight: 5 }}>
            <Button
              icon={<LeftOutlined />}
              onClick={onPrev}
              disabled={totalResult > 0 ? currentPage <= 1 : true}
              className={table["button"]}
            ></Button>
          </Col>

          <Col>
            <Button
              icon={<RightOutlined />}
              onClick={onNext}
              disabled={
                totalResult > 0 ? currentPage * limit >= totalResult : true
              }
              className={table["button"]}
            ></Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Table;
