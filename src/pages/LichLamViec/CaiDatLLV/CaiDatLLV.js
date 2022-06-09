import { Col, Form, InputNumber, notification, Row, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";

// import i18n, { languageKeys } from "../../../../i18n";
import { apiLayCaiDatLLV, apiLuuCaiDatLLV } from "../apiLichLamViec";
import CaLamViec from "../CaLamViec/CaLamViec";
import style from "./caiDatLLV.module.less";
import moment from "moment";
import FormDrawer from "../../../components/FormDrawer/FormDrawer";
import { HLog } from "../../../helpers";
import i18n, { languageKeys } from "../../../i18n";

const DO_DAI_LO = 60; // Độ dài lô

export const fieldNames = {
  thoi_gian: "thoi_gian",
  gio_bat_dau: "GIO_BAT_DAU",
  gio_ket_thuc: "GIO_KET_THUC",
  hieu_suat: "hieu_suat",
  do_dai_lo: "DO_DAI_LO",
  gioi_han_dat: "GIOI_HAN_DAT",
  ca_lam_viec: "shift",
};

const CaiDatLLV = forwardRef(({ onSuccess = () => {} }, ref) => {
  const userProfile = useSelector((state) => state.auth.user);
  const [amenityList, setAmenityList] = useState(["Thành"]);
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uiLoading, setUiLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    async open() {
      setVisible(true);
      setUiLoading(true);

      const result = await apiLayCaiDatLLV({
        // BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
        // partner_code: userProfile.partner_code,
        BENH_VIEN_ID: "H-b75521add5",
        partner_code: "tmedical",
      });

      if (!!result) {
        let fieldData = [];

        fieldData.push({
          name: fieldNames.gioi_han_dat,
          value: result[fieldNames.hieu_suat][fieldNames.gioi_han_dat],
        });

        result[fieldNames.thoi_gian].forEach((item, index) => {
          const fromTime = moment(item[fieldNames.gio_bat_dau], "HH:mm");
          const toTime = moment(item[fieldNames.gio_ket_thuc], "HH:mm");

          fieldData.push({
            name: [fieldNames.thoi_gian, index, fieldNames.ca_lam_viec],
            value: [fromTime, toTime],
          });
        });

        form.setFields(fieldData);
      }

      setUiLoading(false);
    },
    close() {
      onClose();
    },
  }));

  const onClose = async () => {
    form.resetFields();
    setUiLoading(false);
    setLoading(false);
    setVisible(false);
  };

  const onFinish = async (values) => {
    if (!values[fieldNames.gioi_han_dat]) {
      return form.setFields([
        {
          name: fieldNames.gioi_han_dat,
          errors: [i18n.t(languageKeys.vui_long_nhap)],
        },
      ]);
    }

    setLoading(true);

    const hieu_suat = {
      [fieldNames.do_dai_lo]: DO_DAI_LO,
      [fieldNames.gioi_han_dat]: values[fieldNames.gioi_han_dat],
    };

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

    const data = {
      [fieldNames.thoi_gian]: thoi_gian,
      [fieldNames.hieu_suat]: hieu_suat,
    };

    HLog("submit form cai dat llv", data);

    const isOk = await apiLuuCaiDatLLV({
      data,
      // partner_code: userProfile.partner_code,
      // BENH_VIEN_ID: userProfile.BENH_VIEN_ID,
      BENH_VIEN_ID: "H-b75521add5",
      partner_code: "tmedical",
    });

    if (isOk) {
      notification.success({
        placement: "bottomLeft",
        message: i18n.t(languageKeys.cap_nhat_thanh_cong),
      });
      onClose();
      return onSuccess();
    }

    setLoading(false);
    notification.error({
      placement: "bottomLeft",
      message: i18n.t(languageKeys.cap_nhat_that_bai),
    });
  };

  return (
    <FormDrawer
      visible={visible}
      title={i18n.t(languageKeys.Cai_dat_llv)}
      onCancel={onClose}
      onOk={() => form.submit()}
      showPlusIcon={false}
      buttonsAtBottomOfContent
      width={850}
      loading={loading}
    >
      <Spin spinning={uiLoading}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className={style["wrapper"]}>
            <h4>Thông tin cơ bản</h4>

            <div className={style["inner"]}>
              <Row gutter={10} align="middle" style={{ marginTop: 10 }}>
                <Col span={24}>
                  <Form.Item
                    name={"amenity"}
                    label="Chọn nhân viên"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn"
                      showSearch
                      mode="multiple"
                      maxTagCount={3}
                    >
                      {amenityList.map((item) => (
                        <Select.Option
                          key={item.id}
                          value={JSON.stringify(item)}
                        >
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
          <div className={style["wrapper"]}>
            <h4>{i18n.t(languageKeys.field_Thoi_gian_lam_viec_mac_dinh)}</h4>

            <div className={style["inner"]}>
              <CaLamViec
                listName={fieldNames.thoi_gian}
                itemName={fieldNames.ca_lam_viec}
              />
            </div>
          </div>
        </Form>
      </Spin>
    </FormDrawer>
  );
});

export default CaiDatLLV;
