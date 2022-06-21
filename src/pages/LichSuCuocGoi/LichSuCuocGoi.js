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
import { useEffect, useRef, useState } from "react";
import { common_post, HLog, rid } from "../../helpers";
import Table from "../../components/TableCustom/Table";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { PhoneModal } from "../TiepNhanCuocGoi/Components/Phone/PhoneModal";
import apis from "../../constants/apis";
import { keys, userProfile } from "../../constants";
import SelectWeek from "../../components/SelectWeek/SelectWeek";

export const LichSuCuocGoi = () => {
  const [form] = useForm();
  const selectTimeRef = useRef();


  const [dataSource, setDataSource] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [currPage, setCurrPage] = useState(1);
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

  useEffect(async () => {
    await handleGetDataSource();
    return () => {
      setDataSource([]);
      setSearchString("");
      setCurrPage(1);
    };
  }, []);

  const handleMenuClick = () => {};

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Thời gian",
      dataIndex: "",
      key: "TIME",
      render: (_, record) => {
        return (
          <span>
            {record.GIO_GOI} - {moment(record.NGAY).format("DD/MM/YYYY")}
          </span>
        );
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "SO_DIEN_THOAI",
      key: "SO_DIEN_THOAI",
    },
    {
      title: "Loại cuộc gọi",
      dataIndex: "LOAI_CUOC_GOI",
      key: "LOAI_CUOC_GOI",
    },
    {
      title: "Trạng thái",
      dataIndex: "TRANG_THAI_CUOC_GOI",
      key: "TRANG_THAI_CUOC_GOI",

      render: (text) => {
        console.log("trang thai cuoc goi", text);
        switch (text) {
          case "GOI_NHO":
            return <div className="red-txt">{i18n.t(languageKeys.phone_goi_nho)}</div>;
          case "THANH_CONG":
            return <div className="green-txt">{i18n.t(languageKeys.phone_hoan_thanh)}</div>;
          case "KHONG_TRA_LOI":
            return <div className="orange-txt">{i18n.t(languageKeys.phone_khong_tra_loi)}</div>;

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

  // Lấy danh sách lịch sử cuộc gọi
  const handleGetDataSource = async (search_string = "", page = 1) => {
    setLoading(true);
    setSearchString(search_string);
    // setCurrPage(page);
    try {
      let body = {
        partner_code: userProfile.partner_code,
        limit: keys.limit,
        search_string,
        page,
      };
      let res = await common_post(apis.lich_su_cuoc_goi, body, false);
      if (res && res.status === "OK") {
        let { result } = res;
        setDataSource(
         () =>  result.map((item, index) => ({ ...item, key: rid(), STT: index + 1 }))
        );
      }
      setLoading(false);
    } catch (error) {
      HLog("Lấy danh sách lịch sử cuộc gọi lỗi :::", error);
    }
  };

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
                // onClick={() => {
                //   form.resetFields();
                //   setSearchString("");

                //   setFromDate(moment().format("YYYYMMDD"));
                //   setToDate(moment().format("YYYYMMDD"));
                // }}
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
      <PhoneModal />
      {/* <Table dataSource={dataSource} columns={columns}></Table> */}
      <Table
        className={style["table"]}
        showPagination={true}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        // onSelectRows={(rows) => setSelectedRowKeys(rows)}
        // selectedRows={selectedRowKeys}
        // onClickRow={(data) => onOpenEdit(data)}
        // totalResult={totalResult}
        // currentPage={currentPage}
        limit={keys.limit}
        scroll={{ y: "calc(100vh - 250px)" }}
        // onNext={() => handleGetDataSource(searchString, currPage + 1)}
        // onPrev={() => handleGetDataSource(searchString, currPage - 1)}
      />
    </div>
  );
};

// const dataSource = [
//   {
//     stt: "1",
//     time: "12:21 - 03/03/2022",
//     sdt: "0928 999 2999",
//     loai_cuoc_goi: "Cuộc gọi đến",
//     status: "Không trả lời",
//     bac_si_tu_van: "Eleanor Pena",
//   },
//   {
//     stt: "1",
//     time: "12:21 - 03/03/2022",
//     sdt: "0928 999 2999",
//     loai_cuoc_goi: "Cuộc gọi đến",
//     status: "Cuộc gọi nhỡ",
//     bac_si_tu_van: "Eleanor Pena",
//   },
//   {
//     stt: "2",
//     time: "12:21 - 03/03/2022",
//     sdt: "0928 999 2999",
//     loai_cuoc_goi: "Cuộc gọi đến",
//     status: "Cuộc gọi nhỡ",
//     bac_si_tu_van: "Eleanor Pena",
//   },
//   {
//     stt: "3",
//     time: "12:21 - 03/03/2022",
//     sdt: "0928 999 2999",
//     loai_cuoc_goi: "Cuộc gọi đến",
//     status: "Cuộc gọi nhỡ",
//     bac_si_tu_van: "Eleanor Pena",
//   },
//   {
//     stt: "4",
//     time: "12:21 - 03/03/2022",
//     sdt: "0928 999 2999",
//     loai_cuoc_goi: "Cuộc gọi đến",
//     status: "Hoàn thành",
//     bac_si_tu_van: "Eleanor Pena",
//   },
// ];
