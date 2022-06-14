import {
  FilterOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Row } from "antd";
import { ThreeDot } from "../../components";
import Topbar from "../../components/Topbar/Topbar";
import moment from "moment";
import i18n, { languageKeys, languages } from "../../i18n";

import style from "./lscg.module.less";
import { useForm } from "antd/lib/form/Form";
import { useRef, useState } from "react";
import SelectWeek from "../../components/SelectWeek/SelectWeek";
import { rid } from "../../helpers";
import Table from "../../components/TableCustom/Table";
import { ActionButton } from "../../components/ActionButton/ActionButton";


export const LichSuCuocGoi = () => {
  const selectTimeRef = useRef();
  const [form] = useForm();
  const [searchString, setSearchString] = useState("");

  const [fromDate, setFromDate] = useState(moment().format("YYYYMMDD"));
  const [toDate, setToDate] = useState(moment().format("YYYYMMDD"));
  const [currentTimeRange, setCurrentTimeRange] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitSearch = () => {
    // layDsCuocHenSapToi({ search_string: searchString });
  };
  const customFormat = (value) =>
    i18n.language === languages.tieng_viet
      ? `Ngày ${value.format("DD/MM/YYYY")}`
      : value.format("LL");

  const onChangeSelectTime = (data) => {
    if (!data) return;
    let from = moment(data[0]).format("YYYYMMDD");
    let to = moment(data[1]).format("YYYYMMDD");
    setFromDate(from);
    setToDate(to);
    // layDsCuocHenSapToi({
    //   search_string: searchString,
    //   TU: from,
    //   DEN: to,
    //   NGAY: "",
    // });
  };

  // const handleGetDataSource

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Loại cuộc gọi",
      dataIndex: "loai_cuoc_goi",
      key: "loai_cuoc_goi",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
  
      render: (text) => {
        switch (text) {
          case "Cuộc gọi nhỡ":
            return <div className="red-txt">{text}</div>;
          case "Hoàn thành":
            return <div className="green-txt">{text}</div>;
          case "Không trả lời":
            return <div className="orange-txt">{text}</div>;
  
          default:
            <div></div>;
            break;
        }
      },
    },
    {
      title: "Bác sĩ tư vấn",
      dataIndex: "bac_si_tu_van",
      key: "bac_si_tu_van",
    },
    {
      title: "",
      dataIndex: "btn",
      key: "btn",
      render: (text) => (
        <ActionButton handleMenuClick={handleMenuClick}>{text}</ActionButton>
      ),
    },
  ];

  const handleMenuClick = () => {}

  return (
    <div className={style["container"]}>
      <Topbar
        className={style["topbar"]}
        title={i18n.t(languageKeys.menu_Lich_su_cuoc_goi)}
        searchString={searchString}
        setSearchString={setSearchString}
        onSearch={submitSearch}
        showTotalNum={false}
        addOnActions={
          <Row gutter={10} align="middle">
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  form.resetFields();
                  setSearchString("");

                  setFromDate(moment().format("YYYYMMDD"));
                  setToDate(moment().format("YYYYMMDD"));
                }}
                ghost
              >
                {i18n.t(languageKeys.common_Hom_nay)}
              </Button>
            </Col>

            <Col>
              <SelectWeek
                ref={selectTimeRef}
                isDisableSwitch
                isFullWeek
                disablePass
                onSelectTime={(time) => setCurrentTimeRange(time)}
              >
                <Button
                  icon={<FilterOutlined style={{ color: "#999" }} />}
                ></Button>
              </SelectWeek>
            </Col>
          </Row>
        }
      />

      {/* <Table dataSource={dataSource} columns={columns}></Table> */}
      <Table
        className={style["table"]}
        showPagination={true}
        columns={columns}
        dataSource={dataSource.map(item => ({...item,key:rid()}))}
        // loading={}
        // onSelectRows={(rows) => setSelectedRowKeys(rows)}
        // selectedRows={selectedRowKeys}
        // onClickRow={(data) => onOpenEdit(data)}
        // totalResult={totalResult}
        // currentPage={currentPage}
        // limit={keys.limit}
        scroll={{ y: "calc(100vh - 250px)" }}
        // onNext={() => apiLayDsNcc({ page: currentPage + 1 })}
        // onPrev={() => apiLayDsNcc({ page: currentPage - 1 })}
      />
    </div>
  );
};

const dataSource = [
  {
    stt: "1",
    time: "12:21 - 03/03/2022",
    sdt: "0928 999 2999",
    loai_cuoc_goi: "Cuộc gọi đến",
    status: "Không trả lời",
    bac_si_tu_van: "Eleanor Pena",
  },
  {
    stt: "1",
    time: "12:21 - 03/03/2022",
    sdt: "0928 999 2999",
    loai_cuoc_goi: "Cuộc gọi đến",
    status: "Cuộc gọi nhỡ",
    bac_si_tu_van: "Eleanor Pena",
  },
  {
    stt: "2",
    time: "12:21 - 03/03/2022",
    sdt: "0928 999 2999",
    loai_cuoc_goi: "Cuộc gọi đến",
    status: "Cuộc gọi nhỡ",
    bac_si_tu_van: "Eleanor Pena",
  },
  {
    stt: "3",
    time: "12:21 - 03/03/2022",
    sdt: "0928 999 2999",
    loai_cuoc_goi: "Cuộc gọi đến",
    status: "Cuộc gọi nhỡ",
    bac_si_tu_van: "Eleanor Pena",
  },
  {
    stt: "4",
    time: "12:21 - 03/03/2022",
    sdt: "0928 999 2999",
    loai_cuoc_goi: "Cuộc gọi đến",
    status: "Hoàn thành",
    bac_si_tu_van: "Eleanor Pena",
  },
];

