import { ThreeDot } from "../../components";
import Table from "../../components/table/table";
import i18n, { languageKeys } from "../../i18n";

import style from "./lscg.module.less";
export const LichSuCuocGoi = () => {
  const handleMenuClick = () => {};
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
            return <div className={style["red"]}>{text}</div>;
          case "Hoàn thành":
            return <div className={style["green"]}>{text}</div>;
          case "Không trả lời":
            return <div className={style["yellow"]}>{text}</div>;

          default:
            <div></div>;
            break;
        }
        // text === "Cuộc gọi nhỡ" ? (
        //   <div className={style["red"]}>{text}</div>
        // ) : text === "Hoàn thành" ? (
        //   <div className={style["green"]}>{text}</div>
        // ) : (
        //   <div className={style["yellow"]}>{text}</div>
        // );
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
        <ThreeDot handleMenuClick={handleMenuClick}>{text}</ThreeDot>
      ),
    },
  ];

  return (
    <div className={style["container"]}>
      <div className={style["title"]}>
        {" "}
        <p>{i18n.t(languageKeys.menu_Lich_su_cuoc_goi)}</p>
      </div>

      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  )
}
