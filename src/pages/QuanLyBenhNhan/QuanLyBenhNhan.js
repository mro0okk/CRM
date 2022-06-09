import { Button, Form } from "antd";
import Search from "antd/lib/transfer/search";
import { useRef, useState } from "react";
import { CallQlbn } from "../../assets/svgs";
import { DrawerQLBN } from "../../components";
import Table from "../../components/TableCustom/Table";
import Topbar from "../../components/Topbar/Topbar";
import i18n, { languageKeys } from "../../i18n";
import style from "./qlbn.module.less";

export const QuanLyBenhNhan = () => {
  const onSearch = (e) => {
    console.log(e);
  };
  const submitSearch = () => {
    // layDsCuocHenSapToi({ search_string: searchString });
  };
  const [searchString, setSearchString] = useState("");
  const dataSource = [
    {
      stt: "1",
      id: "1030240045677",
      dob: "22/02/2000",
      lan_kham_gan_nhat: "26/03/2022",
      time: "12:21 - 03/03/2022",
      sdt: "0928 999 2999",

      loai_cuoc_goi: "Cuộc gọi đến",
      status: "Cuộc gọi nhỡ",
      name: "Eleanor Pena",
    },
    {
      stt: "1",
      id: "1030240045677",
      dob: "22/02/2000",
      lan_kham_gan_nhat: "26/03/2022",
      time: "12:21 - 03/03/2022",
      sdt: "0928 999 2999",
      loai_cuoc_goi: "Cuộc gọi đến",
      status: "Cuộc gọi nhỡ",
      name: "Eleanor Pena",
    },
    {
      stt: "2",
      id: "1030240045677",
      dob: "22/02/2000",
      lan_kham_gan_nhat: "26/03/2022",
      time: "12:21 - 03/03/2022",
      sdt: "0928 999 2999",
      loai_cuoc_goi: "Cuộc gọi đến",
      status: "Cuộc gọi nhỡ",
      name: "Eleanor Pena",
    },
    {
      stt: "3",
      id: "1030240045677",
      dob: "22/02/2000",
      lan_kham_gan_nhat: "26/03/2022",
      time: "12:21 - 03/03/2022",
      sdt: "0928 999 2999",
      loai_cuoc_goi: "Cuộc gọi đến",
      status: "Cuộc gọi nhỡ",
      name: "Eleanor Pena",
    },
    {
      stt: "4",
      id: "1030240045677",
      dob: "22/02/2000",
      lan_kham_gan_nhat: "26/03/2022",
      time: "12:21 - 03/03/2022",
      sdt: "0928 999 2999",
      loai_cuoc_goi: "Cuộc gọi đến",
      status: "Cuộc gọi nhỡ",
      name: "Eleanor Pena",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "ID Bệnh nhân",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
      render: (text) => (
        <div className="blue-txt">
          {" "}
          <CallQlbn /> {text}
        </div>
      ),
    },
    {
      title: "Lần khám gần nhất",
      dataIndex: "lan_kham_gan_nhat",
      key: "lan_kham_gan_nhat",
    },
  ];
  const [visible, setVisible] = useState(false);

  // });
  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const showLargeDrawer = () => {
    setVisible(true);
  };

  const [form] = Form.useForm();

  return (
    <div className={style["container"]}>
      {/* <div className={style["topBar"]}>
        <div className={style["title"]}>
          {i18n.t(languageKeys.menu_Quan_ly_benh_nhan)}
        </div>
        <div className={style["rightSide"]}>
          <div className={style["BarSearch"]}>
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
          <div className={style["BarSearch"]}>
            <Button type="primary" onClick={showLargeDrawer}>
              Thêm bệnh nhân
            </Button>
            
          </div>
        </div>
      </div> */}
      <Topbar
        className={style["topbar"]}
        title={i18n.t(languageKeys.menu_Quan_ly_benh_nhan)}
        addBtnText="Thêm bệnh nhân"
        onAdd={showLargeDrawer}
        searchString={searchString}
        setSearchString={setSearchString}
        onSearch={submitSearch}
        showTotalNum={false}
        // addOnActions={}
      />
      <DrawerQLBN
        visible={visible}
        onChange={onChange}
        onClose={onClose}
        onFinish={onFinish}
        onSearch={onSearch}
        form={form}
      />

      <Table
        className={style["table"]}
        showPagination={true}
        columns={columns}
        dataSource={dataSource}
        // loading={loadingDsNcc}
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
