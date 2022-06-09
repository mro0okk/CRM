export * from "./apis";
export * from "./paths";

export const keys = {
  // local storage
  access_token: "access_token",
  expire_in: "expire_in",
  user_data: "user_data",
  role: "role",
  enable_app_log: "enable",
  bearer_token: "bearer_token",
  token_type: "token_type",
  // feature keys (đề phòng trường hợp phân quyền)
  feature_Quan_ly_cuoc_goi: "quan_ly_cuoc_goi",
  feater_bang_dieu_khien: "bang_dieu_khien",
  feature_Quan_ly_benh_nhan: "quan_ly_benh_nhan",
  feature_Quan_ly_nhan_vien: "quan_ly_nhan_vien",
  feature_Quan_ly_thong_ke: "quan_ly_thong_ke",
  feature_Lich_Lam_viec: "Lich_Lam_viec",
  feature_Thong_ke: "Thong_ke",
  feature_lich_lam_viec: "quan_ly_lich_lam_viec",
};
