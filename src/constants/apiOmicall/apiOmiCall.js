import apiServices from "../../config/apiServices";
import { getUrlApi } from "../../helpers";

//omicall server
const omiURL = "https://public-v1-stg.omicall.com";
// Lấy access_token cho 1 ngày làm việc
const bearerToken = "https://public-v1-stg.omicall.com/api/auth";

export default class apis {
  static tim_kiem_khach_hang = getUrlApi(omiURL + "/api/contacts/list"); // lấy ds khách hàng
  static ds_nhan_vien = getUrlApi(omiURL + "/api/agent/list"); // lấy danh sách nhân viên
  static ds_ho_so_benh_nhan = getUrlApi(
    apiServices.H247_BS_HIS +
      "api/partner/public/crm/benhNhan/layHoSoBenhNhanTheoSDT"
  ); // lấy ds hồ sơ bệnh nhân khi có cuộc gọi đến
    static chi_tiet_benh_nhan = getUrlApi(
    apiServices.H247_BS_HIS +
      "api/partner/public/crm/benhNhan/layThongTinBenhNhan"
  ); // lấy ds hồ sơ bệnh nhân khi có cuộc gọi đến
  static lich_su_kham = getUrlApi(
    apiServices.H247_BS_HIS +
      "api/partner/public/crm/lichkham/layLichSuKhamBenh"
  ); // lấy ds hồ sơ bệnh nhân khi có cuộc gọi đến
}

export const apiOmicall = { bearerToken, omiURL };
