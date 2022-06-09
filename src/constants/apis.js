import apiServices from "../config/apiServices";
import { getUrlApi } from "../helpers";

export default class apis {
  static lich_lam_viec_luu_lich_lam_viec = getUrlApi(
    apiServices.H247_BS_HIS + "api/partner/public/lichlamviec/luuLichLamViec"
  ); // lưu lịch làm việc
  static lich_lam_viec_lay_ds_bac_si_theo_phong = getUrlApi(
    apiServices.H247_BS_HIS + "api/partner/public/nhansu/layNhanSuTheoPhong"
  ); // lấy danh sách bác sĩ theo phòng
  static lich_lam_viec_lay_ds_lich_lam_viec = getUrlApi(
    apiServices.H247_BS_HIS +
      "api/partner/public/lichlamviec/layLichLamViecBenhVien"
  ); // lấy lịch làm việc
  static lich_lam_viec_luu_cai_dat_mac_dinh = getUrlApi(
    apiServices.H247_BS_HIS +
      "api/partner/public/lichlamviec/luuCaiDatGioMacDinh"
  ); // lưu cài đặt giờ mặc định
  static lich_lam_viec_lay_cai_dat_mac_dinh = getUrlApi(
    apiServices.H247_BS_HIS +
      "api/partner/public/lichlamviec/layCaiDatGioMacDinh"
  ); // lấy cài đặt giờ mặc định
}
