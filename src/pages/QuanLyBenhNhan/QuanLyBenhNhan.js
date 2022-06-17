import { Button, Form, notification } from "antd";
import Search from "antd/lib/transfer/search";
import { useRef, useState } from "react";
import { CallQlbn } from "../../assets/svgs";
import { DrawerQLBN } from "../../components";
import Table from "../../components/TableCustom/Table";
import Topbar from "../../components/Topbar/Topbar";
import { userProfile } from "../../constants";
import apis from "../../constants/apis";
import { common_post, HLog, rid } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";
import style from "./qlbn.module.less";

export const QuanLyBenhNhan = () => {
  const onSearch = (e) => {

  };
  const submitSearch = () => {
  };
  const [searchString, setSearchString] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  
  const handleGetDataSource = async (search_string="",page=1) => {
    setSearchString(search_string)
    try {
      let body = {
        partner_code:userProfile.partner_code,
        page,
        search_string,
      }
      let res = await common_post(apis.ds_benh_nhan,body,false)

        if(res && res.status ==="OK"){
          let {result} = res 
          setDataSource(() => result.map(item => ({...item, key:rid()})))
        }else{
          notification.error({
            message:"Lấy danh sách bệnh nhân thất bại",
            placement:"bottomLeft",
          })
        }
    } catch (error) {
      HLog("Lấy danh sách bệnh nhân::",error)
    }

  }


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
