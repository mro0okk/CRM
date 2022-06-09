import { Checkbox, Col, Form, notification, Row, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
// import { FormDrawer, Select } from "../../../../components";
// import { getErrorMessage, HLog } from "../../../../helpers";
// import i18n, { languageKeys } from "../../../../i18n";
import {
  apiLayCaiDatLLV,
  apiLayDsBacSi,
  apiLayDsPhongThucHien,
  apiLuuLichKham,
} from "../apiLichLamViec";
import CaLamViec from "../CaLamViec/CaLamViec";
import style from "./caiDatLichKham.module.less";
import moment from "moment";
import { throttle } from "lodash";
import Select from "../../../components/Select/Select";
import FormDrawer from "../../../components/FormDrawer/FormDrawer";
import { getErrorMessage, HLog } from "../../../helpers";
import i18n, { languageKeys } from "../../../i18n";

export const fieldNames = {
  thoi_gian: "config_time",
  gio_bat_dau: "GIO_BAT_DAU",
  gio_ket_thuc: "GIO_KET_THUC",
  ca_lam_viec: "shift",
  ngay_dau_tuan: "NGAY_DAU_TUAN",
  ngay_ap_dung: "NGAY_AP_DUNG",
  nhan_su: "NHAN_SU_ID",
  phong: "PHONG_ID",
  khoa: "KHOA_ID",
};

const CaiDatLichKham = forwardRef(({ onSuccess = () => {} }, ref) => {
  const userProfile = useSelector((state) => state.auth.user);
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uiLoading, setUiLoading] = useState(false);
  const [isCreateNew, setisCreateNew] = useState(true);
  const [dsPhong, setDsPhong] = useState([]);
  const [dsBacSi, setDsBacSi] = useState([]);
  const [currentSpecialityId, setCurrentSpecialityId] = useState("");
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState("");
  const [disabledDays, setDisabledDays] = useState([]);

  useImperativeHandle(ref, () => ({
    async open({ initData, ngay, ngay_dau_tuan, bac_si }) {
      HLog(initData, ngay, ngay_dau_tuan, bac_si);

      setVisible(true);
      setUiLoading(true);

      let fieldData = [];

      // trường hợp sửa lịch khám
      if (!!bac_si) {
        setisCreateNew(false);

        const data_bac_si = {
          id: bac_si.NHANSU_ID,
          name: bac_si.HO + " " + bac_si.TEN,
        };

        fieldData.push({
          name: fieldNames.nhan_su,
          value: JSON.stringify(data_bac_si),
        });

        setDsBacSi([data_bac_si]);

        bac_si.arr_ca.forEach((item, index) => {
          const fromTime = moment(item[fieldNames.gio_bat_dau], "HH:mm");
          const toTime = moment(item[fieldNames.gio_ket_thuc], "HH:mm");

          fieldData.push({
            name: [fieldNames.thoi_gian, index, fieldNames.ca_lam_viec],
            value: [fromTime, toTime],
          });
        });

        if (!!initData) {
          setCurrentSpecialityId(initData.KHOA_ID);
          setCurrentRoomId(initData.PHONG_ID);

          const data_phong = {
            id: initData.PHONG_ID,
            name: initData.TEN_PHONG,
          };

          fieldData.push({
            name: fieldNames.phong,
            value: JSON.stringify(data_phong),
          });

          setDsPhong([data_phong]);
        }
      }

      if (!!ngay_dau_tuan) {
        const dateFormatted = moment(ngay_dau_tuan).format("YYYYMMDD");
        setFirstDayOfWeek(dateFormatted);
      }

      if (!!ngay) {
        fieldData.push({
          name: fieldNames.ngay_ap_dung,
          value: [Number(moment(ngay.NGAY, "YYYYMMDD").format("d"))],
        });
      }

      // trường hợp thêm mới lịch khám
      if (!!initData && !bac_si) {
        setCurrentSpecialityId(initData.KHOA_ID);
        setCurrentRoomId(initData.PHONG_ID);

        fieldData.push({
          name: fieldNames.phong,
          value: JSON.stringify({
            id: initData.PHONG_ID,
            name: initData.TEN_PHONG,
          }),
        });

        layDsPhongThucHien({
          KHOA_ID: initData.KHOA_ID,
          search_string: initData.TEN_PHONG,
        });

        const default_config = await apiLayCaiDatLLV({
          // BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
          // partner_code: userProfile.partner_code,
          BENH_VIEN_ID: "H-b75521add5",
          partner_code: "tmedical",
        });

        if (!!default_config) {
          default_config.thoi_gian.forEach((item, index) => {
            const fromTime = moment(item[fieldNames.gio_bat_dau], "HH:mm");
            const toTime = moment(item[fieldNames.gio_ket_thuc], "HH:mm");
            fieldData.push({
              name: [fieldNames.thoi_gian, index, fieldNames.ca_lam_viec],
              value: [fromTime, toTime],
            });
          });
        }

        initData.arr_ngay.forEach((ngay) => {
          if (
            ngay.arr_bac_si.length > 0 ||
            moment().isSame(moment(ngay.NGAY, "YYYYMMDD"), "days")
          ) {
            setDisabledDays((currentArr) => [
              ...currentArr,
              Number(moment(ngay.NGAY, "YYYYMMDD").format("d")),
            ]);
          }
        });
      } else {
        initData.arr_ngay.forEach((_ngay) => {
          if (
            (_ngay.arr_bac_si.length > 0 && ngay.NGAY !== _ngay.NGAY) ||
            moment().isSame(moment(_ngay.NGAY, "YYYYMMDD"), "days")
          ) {
            setDisabledDays((currentArr) => [
              ...currentArr,
              Number(moment(_ngay.NGAY, "YYYYMMDD").format("d")),
            ]);
          }
        });
      }

      form.setFields(fieldData);

      setUiLoading(false);
    },
    close() {
      onClose();
    },
  }));

  const onClose = async () => {
    form.resetFields();
    setDisabledDays([]);
    setisCreateNew(true);
    setUiLoading(false);
    setLoading(false);
    setVisible(false);
    setDsPhong([]);
    setDsBacSi([]);
    setCurrentSpecialityId("");
    setCurrentRoomId("");
    setFirstDayOfWeek("");
  };

  const layDsPhongThucHien = async ({ KHOA_ID = "", search_string = "" }) => {
    const result = await apiLayDsPhongThucHien({
      // partner_code: userProfile.partner_code,

      partner_code: "tmedical",
      KHOA_ID,
      search_string,
    });

    if (!!result) {
      const data = result.map((item) => ({
        id: item.ID,
        name: item.TEN_KHOA_PHONG,
      }));
      setDsPhong(data);
    }
  };

  const layDsBacSi = async ({ PHONG_ID = "", search_string = "" }) => {
    const result = await apiLayDsBacSi({
      // partner_code: userProfile.partner_code,

      partner_code: "tmedical",
      PHONG_ID,
      search_string,
    });

    if (!!result) {
      const data = result.map((item) => ({
        id: item.NHANSU_ID,
        name: item.HO + " " + item.TEN,
      }));
      setDsBacSi(data);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchPhong = useCallback(
    throttle(
      (value) =>
        layDsPhongThucHien({
          KHOA_ID: currentSpecialityId,
          search_string: value,
        }),
      1000
    ),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchBacSi = useCallback(
    throttle(
      (value, PHONG_ID) =>
        layDsBacSi({
          PHONG_ID: PHONG_ID,
          search_string: value,
        }),
      1000
    ),
    []
  );

  const onFinish = async (values) => {
    setLoading(true);

    let thoi_gian = [];

    if (!!values[fieldNames.thoi_gian]) {
      thoi_gian = values[fieldNames.thoi_gian].map((shift) => {
        const caLamViec = shift[fieldNames.ca_lam_viec];

        return {
          [fieldNames.gio_bat_dau]: caLamViec[0].format("HH:mm"),
          [fieldNames.gio_ket_thuc]: caLamViec[1].format("HH:mm"),
        };
      });
    }

    if (!thoi_gian || (!!thoi_gian && thoi_gian.length === 0)) {
      setLoading(false);
      return notification.error({
        placement: "bottomLeft",
        message: i18n.t(languageKeys.error_Chua_co_ca_lam_viec),
      });
    }

    values[fieldNames.khoa] = currentSpecialityId;
    values[fieldNames.phong] = JSON.parse(values[fieldNames.phong]).id;
    values[fieldNames.nhan_su] = [JSON.parse(values[fieldNames.nhan_su]).id];

    const data = {
      ...values,
      [fieldNames.thoi_gian]: thoi_gian,
      [fieldNames.ngay_dau_tuan]: firstDayOfWeek,
    };

    HLog("submit form cai dat lich kham", data);

    const res = await apiLuuLichKham({
      data,
      BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
      partner_code: userProfile.partner_code,
    });

    if (res.status === "OK") {
      notification.success({
        placement: "bottomLeft",
        message: isCreateNew
          ? i18n.t(languageKeys.them_moi_thanh_cong)
          : i18n.t(languageKeys.cap_nhat_thanh_cong),
      });
      onClose();
      return onSuccess();
    }

    setLoading(false);
    notification.error({
      placement: "bottomLeft",
      message: isCreateNew
        ? getErrorMessage(
            res.error_code,
            i18n.t(languageKeys.them_moi_that_bai)
          )
        : getErrorMessage(
            res.error_code,
            i18n.t(languageKeys.cap_nhat_that_bai)
          ),
    });
  };

  return (
    <FormDrawer
      visible={visible}
      title={
        (isCreateNew
          ? i18n.t(languageKeys.common_Them_moi)
          : i18n.t(languageKeys.common_Chinh_sua)) +
        " " +
        i18n.t(languageKeys.field_lich_lam_viec)
      }
      onCancel={onClose}
      onOk={() => form.submit()}
      showPlusIcon={isCreateNew}
      buttonsAtBottomOfContent
      width={850}
      loading={loading}
    >
      <Spin spinning={uiLoading}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className={style["wrapper"]}>
            <h4>{i18n.t(languageKeys.field_Thong_tin_co_ban)}</h4>

            <div className={style["inner"]}>
              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item
                    label={i18n.t(languageKeys.field_Phong_thuc_hien)}
                    name={fieldNames.phong}
                    rules={[
                      {
                        required: true,
                        message: i18n.t(languageKeys.vui_long_nhap),
                      },
                    ]}
                  >
                    <Select
                      dataSource={dsPhong}
                      titleKey="name"
                      disabled={!isCreateNew}
                      showSearch
                      onSearch={searchPhong}
                      onDropdownVisibleChange={(bool) =>
                        bool &&
                        layDsPhongThucHien({
                          KHOA_ID: currentSpecialityId,
                        })
                      }
                      onSelect={(value) => {
                        const parseValue = JSON.parse(value);
                        setCurrentRoomId(parseValue.id);
                        form.resetFields([fieldNames.nhan_su]);
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={i18n.t(languageKeys.field_Bac_si)}
                    name={fieldNames.nhan_su}
                    rules={[
                      {
                        required: true,
                        message: i18n.t(languageKeys.vui_long_nhap),
                      },
                    ]}
                  >
                    <Select
                      dataSource={dsBacSi}
                      disabled={!isCreateNew}
                      showSearch
                      titleKey="name"
                      onSearch={(value) => searchBacSi(value, currentRoomId)}
                      onDropdownVisibleChange={(bool) =>
                        bool &&
                        layDsBacSi({
                          PHONG_ID: currentRoomId,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>

          <div className={style["wrapper"]}>
            <h4>{i18n.t(languageKeys.field_Thoi_gian_lam_viec)}</h4>

            <div className={style["inner"]}>
              <CaLamViec
                listName={fieldNames.thoi_gian}
                itemName={fieldNames.ca_lam_viec}
              />
            </div>
          </div>

          <div className={style["wrapper"]}>
            <h4>{i18n.t(languageKeys.field_Ngay_ap_dung)}</h4>

            <div className={style["inner"]}>
              <Form.Item
                name={fieldNames.ngay_ap_dung}
                initialValue={[]}
                className={style["body"]}
                rules={[
                  {
                    type: "array",
                    min: 1,
                    message: i18n.t(languageKeys.error_Chon_toi_thieu_1_ngay),
                  },
                ]}
              >
                <Checkbox.Group>
                  <Row>
                    {dayNames.map((day) => (
                      <Checkbox
                        key={day.key}
                        value={day.key}
                        disabled={
                          moment(firstDayOfWeek).isSame(moment(), "week") &&
                          moment().format("d") === "0" &&
                          day.key !== 0
                            ? true
                            : moment(firstDayOfWeek).isSame(moment(), "week") &&
                              day.key < Number(moment().format("d")) &&
                              day.key !== 0
                            ? true
                            : disabledDays.some((item) => item === day.key)
                            ? true
                            : false
                        }
                      >
                        {day.name}
                      </Checkbox>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Spin>
    </FormDrawer>
  );
});

export default CaiDatLichKham;

const dayNames = [
  {
    key: 1,
    name: i18n.t(languageKeys.data_Thu_2),
  },
  {
    key: 2,
    name: i18n.t(languageKeys.data_Thu_3),
  },
  {
    key: 3,
    name: i18n.t(languageKeys.data_Thu_4),
  },
  {
    key: 4,
    name: i18n.t(languageKeys.data_Thu_5),
  },
  {
    key: 5,
    name: i18n.t(languageKeys.data_Thu_6),
  },
  {
    key: 6,
    name: i18n.t(languageKeys.data_Thu_7),
  },
  {
    key: 0,
    name: i18n.t(languageKeys.data_Chu_nhat),
  },
];
