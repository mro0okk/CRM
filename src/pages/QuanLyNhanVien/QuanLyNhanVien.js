import i18n, { languageKeys } from "../../i18n";
import { Button, Form, Switch } from "antd";
import Search from "antd/lib/transfer/search";
import { useState } from "react";
import { CallQlbn } from "../../assets/svgs";
import { ThreeDot } from "../../components";
import style from "./qlnv.module.less";
import { DrawerQLNV } from "../../components/drawer/drawerQLNV";
import { PlusOutlined } from "@ant-design/icons";
import Topbar from "../../components/Topbar/Topbar";
import Table from "../../components/TableCustom/Table";

export const QuanLyNhanVien = () => {
  const handleMenuClick = () => {};
  const [btnSwitch, setBtnSwitch] = useState(true);
  function onChangeSwitch(checked) {
    console.log(`switch to ${checked}`);
    // setBtnSwitch(checked);
  }
  const submitSearch = () => {
    // layDsCuocHenSapToi({ search_string: searchString });
  };
  const [searchString, setSearchString] = useState("");

  const onSearch = (e) => {
    console.log(e);
  };

  const dataSource = [
    {
      stt: "1",
      id: "1030240045677",
      dob: "22/02/2000",
      lan_kham_gan_nhat: "26/03/2022",
      time: "12:21 - 03/03/2022",
      sdt: "0928 999 2999",
      email: "vietbach@gmail.com",
      vai_tro: "Trực cuộc gọi",
      loai_cuoc_goi: "Cuộc gọi đến",
      status: "Cuộc gọi nhỡ",
      name: "Eleanor Pena",
      trang_thai: "Hoạt động",
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
      email: "vietbach@gmail.com",
      vai_tro: "Trực cuộc gọi",
      trang_thai: "Hoạt động",
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
      email: "vietbach@gmail.com",
      vai_tro: "Trực cuộc gọi",
      trang_thai: "Hoạt động",
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
      email: "vietbach@gmail.com",
      name: "Eleanor Pena",
      vai_tro: "Trực cuộc gọi",
      trang_thai: "Hoạt động",
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
      email: "vietbach@gmail.com",
      name: "Eleanor Pena",
      vai_tro: "Trực cuộc gọi",
      trang_thai: "Hoạt động",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã Bệnh nhân",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Vai trò",
      dataIndex: "vai_tro",
      key: "vai_tro",
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (text) => (
        <div>
          {btnSwitch ? (
            <span className="blue-txt">
              {" "}
              {text}
              <span className={style["textSwitchbtn"]}></span>
            </span>
          ) : (
            <span className={style["textSwitchbtn"]}>Tạm ngưng</span>
          )}

          <Switch defaultChecked onChange={onChangeSwitch} />
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "btn",
      key: "btn",
      render: (text) => (
        <ThreeDot handleMenuClick={handleMenuClick}>{text}</ThreeDot>
      ),
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
      <DrawerQLNV
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
