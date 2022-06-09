import { Table as TableAntd } from "antd";
import style from "./table.module.less";

export const Table = ({ dataSource, columns }) => {
  return (
    <div>
      <TableAntd
        className={style["container"]}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />

      {/* {showPagination && (
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
      )} */}
    </div>
  );
};

export default Table;
