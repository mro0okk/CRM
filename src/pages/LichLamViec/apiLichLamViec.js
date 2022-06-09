// import { apis } from "../../constants";
import apis from "../../constants/apis";
import { common_post, HLog } from "../../helpers";

export const apiLuuCaiDatLLV = async ({
  data = {},
  partner_code = "",
  BENH_VIEN_ID = "",
}) => {
  try {
    const req = {
      data,
      partner_code,
      BENH_VIEN_ID,
    };
    const res = await common_post(apis.lich_lam_viec_luu_cai_dat_mac_dinh, req);
    return res.status === "OK";
  } catch (error) {
    HLog("luu cai dat llv error", error);
  }
};

export const apiLayCaiDatLLV = async ({
  partner_code = "",
  BENH_VIEN_ID = "",
}) => {
  try {
    const req = {
      partner_code,
      BENH_VIEN_ID,
    };
    const res = await common_post(apis.lich_lam_viec_lay_cai_dat_mac_dinh, req);
    if (res.status === "OK") return res.result;
  } catch (error) {
    HLog("lay cai dat llv error", error);
  }
};

export const apiLayDsLLV = async ({
  partner_code = "",
  BENH_VIEN_ID = "",
  TU = "",
  DEN = "",
}) => {
  try {
    const req = {
      partner_code,
      BENH_VIEN_ID,
      TU,
      DEN,
    };
    const res = await common_post(apis.lich_lam_viec_lay_ds_lich_lam_viec, req);
    if (res.status === "OK") return res.result;
  } catch (error) {
    HLog("lay danh sach llv error", error);
  }
};

export const apiLuuLichKham = async ({
  data = {},
  partner_code = "",
  BENH_VIEN_ID = "",
}) => {
  try {
    const req = {
      ...data,
      partner_code,
      BENH_VIEN_ID,
    };
    return await common_post(apis.lich_lam_viec_luu_lich_lam_viec, req);
  } catch (error) {
    HLog("luu lich kham error", error);
  }
};

export const apiLayDsPhongThucHien = async ({
  partner_code = "",
  KHOA_ID = "",
  search_string = "",
}) => {
  try {
    const req = {
      partner_code,
      KHOA_ID,
      search_string,
    };
    const res = await common_post(apis.dm_lay_phong_theo_khoa, req);
    if (res.status === "OK") return res.result;
  } catch (error) {
    HLog("lay danh sach phong thuc hien error", error);
  }
};

export const apiLayDsBacSi = async ({
  partner_code = "",
  PHONG_ID = "",
  search_string = "",
}) => {
  try {
    const req = {
      partner_code,
      PHONG_ID,
      search_string,
    };
    const res = await common_post(
      apis.lich_lam_viec_lay_ds_bac_si_theo_phong,
      req
    );
    if (res.status === "OK") return res.result;
  } catch (error) {
    HLog("lay danh bac si theo phong error", error);
  }
};
