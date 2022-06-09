import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Row,
  Select as SelectAntd,
  Space,
  Spin,
  Tag,
  TreeSelect,
} from "antd";
import select from "./select.module.less";
import cn from "classnames";
import { rid } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";
import { useRef } from "react";

/* Nếu muốn hiển thị thanh tìm kiếm thì hàm onSearch() phải được truyền giá trị vào, tương tự với thanh thêm mới cùng hàm onAdd() */

const Select = ({
  dataSource = [], // mảng danh sách các lựa chọn (dữ liệu trong mảng chưa được JSON.stringify)
  titleKey, // prop của option (là 1 object) dùng để hiển thị trên giao diện màn hình
  valueKey, // prop của option (là 1 object) dùng để lưu thành value của Select.Option
  onSearch, // hàm xử lý search data
  onAdd, // hàm xử lý add data mới
  loading = false, // spin quay vòng khi load data vừa search
  multiple = false, // trường hợp lựa chọn nhiều
  className,
  customTitle,
  showSearch = false,
  disabled = false,
  onSelect,
  selectedList = [],
  setSelectedList = () => {},
  showTable = false,
  columnsTable = [],
  isOnlyValue = false,
  placeholder = i18n.t(languageKeys.common_Chon),
  filterOption = false,
  iconAdd,
  textAdd,
  onPressEnter = () => {},
  disabledOption = () => false,
  ...props
}) => {
  const ref = useRef();

  /* =====Custom component Dropdown khi bấm vào Select hoặc TreeSelect===== */
  const dropdownRender = (menu) => {
    return (
      <>
        {showTable && (
          <Row className={select["table-head"]}>
            {columnsTable.map((item) => (
              <Col key={rid()} span={8}>
                {item.title}
              </Col>
            ))}
          </Row>
        )}

        {/* =====Danh sách các options===== */}
        {/* Note: Với mỗi loại Select hoặc TreeSelect, menu sẽ được hiển thị ra khác nhau */}
        <Spin spinning={loading}>{menu}</Spin>

        {/* =====Nếu có hàm onAdd() thì mới hiển thị nút thêm mới===== */}
        {!!onAdd && (
          <>
            <Divider style={{ margin: "4px 0 0 0" }} />

            {/* =====Nút thêm mới===== */}
            <div className={select["add"]} onClick={onAdd}>
              {iconAdd ? (
                iconAdd
              ) : (
                <PlusCircleOutlined className={select["icon"]} />
              )}
              {textAdd ? textAdd : "Add item"}
              {/* <PlusCircleOutlined className={select["icon"]} />
              {i18n.t(languageKeys.common_Them_moi)} */}
            </div>
          </>
        )}
      </>
    );
  };

  const TableRow = ({ item = {} }) => (
    <Row>
      {columnsTable.map((col) => (
        <Col key={rid()} span={8}>
          {item[col.dataIndex]}
        </Col>
      ))}
    </Row>
  );

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      onPressEnter(e.target.value);
      ref.current.blur();
    }
  };

  return !multiple ? (
    <SelectAntd
      {...props}
      ref={ref}
      className={cn(
        select["container"],
        showTable && select["select-dropdown-table"],
        className
      )}
      defaultValue={props.defaultValue}
      dropdownClassName={select["dropdown"]}
      dropdownRender={dropdownRender}
      showSearch={showSearch}
      //mode={multiple ? "multiple" : ""}
      // allowClear={multiple}
      // maxTagCount={0}
      // loading={loading}
      onSearch={onSearch}
      onSelect={onSelect}
      disabled={disabled}
      placeholder={placeholder}
      filterOption={filterOption}
    >
      {/* =====Render danh sách các options===== */}
      {dataSource.map((item) => (
        <SelectAntd.Option
          key={rid()}
          value={
            isOnlyValue
              ? item
              : !!valueKey
              ? item[valueKey]
              : typeof item === "object"
              ? JSON.stringify(item)
              : item
          }
          disabled={disabledOption(item)}
        >
          {showTable ? (
            <TableRow item={item} />
          ) : isOnlyValue ? (
            item
          ) : !!customTitle ? (
            customTitle(item)
          ) : !!titleKey ? (
            item[titleKey]
          ) : (
            item
          )}
        </SelectAntd.Option>
      ))}
    </SelectAntd>
  ) : (
    <>
      <TreeSelect
        {...props}
        ref={ref}
        treeCheckable="true"
        className={select["container-mul"]}
        dropdownClassName={select["dropdown"]}
        allowClear
        showArrow
        dropdownRender={dropdownRender}
        maxTagCount={0}
        disabled={disabled}
        showSearch={showSearch}
        onSearch={onSearch}
        placeholder={placeholder}
        onInputKeyDown={handleEnter}
        // loading={loading}
      >
        {/* =====Render danh sách các options===== */}
        {!!dataSource &&
          dataSource.map((item) => (
            <TreeSelect.TreeNode
              key={
                !!valueKey
                  ? item[valueKey]
                  : typeof item === "object"
                  ? JSON.stringify(item)
                  : item
              }
              value={
                !!valueKey
                  ? item[valueKey]
                  : typeof item === "object"
                  ? JSON.stringify(item)
                  : item
              }
              title={
                !!customTitle
                  ? customTitle(item)
                  : !!titleKey
                  ? item[titleKey]
                  : item
              }
            />
          ))}
      </TreeSelect>

      {selectedList.length > 0 && (
        <Row style={{ marginTop: 10 }} gutter={[0, 8]}>
          {selectedList.map((item) => {
            return (
              <Col key={rid()}>
                <Tag className={select["tag"]}>
                  <Space>
                    {!!customTitle
                      ? customTitle(JSON.parse(item))
                      : !!titleKey && !!item
                      ? JSON.parse(item)[titleKey]
                      : item}

                    {!disabled && (
                      <CloseOutlined
                        style={{ marginRight: -3, cursor: "pointer" }}
                        onClick={() => {
                          // data và item chắc chắn ở dạng JSON.stringify
                          const filterArr = selectedList.filter(
                            (data) => data !== item
                          );
                          setSelectedList(filterArr);
                        }}
                      />
                    )}
                  </Space>
                </Tag>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default Select;
