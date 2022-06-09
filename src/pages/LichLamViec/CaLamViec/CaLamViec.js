import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Button, Form, Row, Space, TimePicker } from "antd";
// import { HLog } from "../../../../helpers";
// import i18n, { languageKeys } from "../../../../i18n";
import { HLog } from "../../../helpers";
import i18n, { languageKeys } from "../../../i18n";
import { fieldNames } from "../CaiDatLLV/CaiDatLLV";
import style from "./caLamViec.module.less";

const CaLamViec = ({ listName = "", itemName = "" }) => {
  const ruleValidateTimeRange = ({ getFieldValue }) => ({
    validator(_, value) {
      try {
        const timeRanges = getFieldValue(listName);
        const isValid = !isTimeInRange(value, timeRanges);

        if (!value || isValid) return Promise.resolve();

        return Promise.reject(
          new Error(i18n.t(languageKeys.error_gia_tri_khong_hop_le))
        );
      } catch (error) {
        HLog(error);
      }
    },
  });

  function isTimeInRange(time = [], timeRanges = []) {
    if (!time || (!!time && time.length === 0)) return false;

    const fromTime = time[0];
    const toTime = time[1];

    const isFromTimeValid =
      timeRanges.filter((range) => {
        const fromTimeFormat = fromTime.format("HH:mm");
        const startTimeFormat =
          range[fieldNames.ca_lam_viec][0].format("HH:mm");
        const stopTimeFormat = range[fieldNames.ca_lam_viec][1].format("HH:mm");

        return (
          fromTimeFormat >= startTimeFormat && fromTimeFormat <= stopTimeFormat
        );
      }).length > 1;

    const isToTimeValid =
      timeRanges.filter((range) => {
        const toTimeFormat = toTime.format("HH:mm");
        const startTimeFormat =
          range[fieldNames.ca_lam_viec][0].format("HH:mm");
        const stopTimeFormat = range[fieldNames.ca_lam_viec][1].format("HH:mm");

        return (
          toTimeFormat >= startTimeFormat && toTimeFormat <= stopTimeFormat
        );
      }).length > 1;

    return isFromTimeValid || isToTimeValid;
  }

  return (
    <Form.List name={listName}>
      {(fields, { add, remove }) => (
        <Row align="middle">
          {fields.map(({ key, name, ...restField }, index) => (
            <Space
              key={key}
              style={{
                display: "inline-flex",
                position: "relative",
              }}
              align="center"
            >
              <Form.Item
                {...restField}
                label={i18n.t(languageKeys.field_Ca) + " " + (index + 1)}
                name={[name, itemName]}
                rules={[
                  {
                    required: true,
                    message: i18n.t(languageKeys.vui_long_nhap),
                  },
                  ruleValidateTimeRange,
                ]}
              >
                <TimePicker.RangePicker
                  format="HH:mm"
                  placeholder={[
                    i18n.t(languageKeys.field_Tu),
                    i18n.t(languageKeys.field_Den),
                  ]}
                  className={style["time-picker"]}
                  suffixIcon={null}
                  minuteStep={5}
                />
              </Form.Item>

              <DeleteOutlined
                onClick={() => remove(name)}
                className={style["delete-icon"]}
              />
            </Space>
          ))}

          <Form.Item style={{ display: "inline-block" }}>
            <Button
              onClick={() => add()}
              icon={<PlusCircleFilled />}
              type="text"
              className={style["add-btn"]}
            >
              {i18n.t(languageKeys.common_Them_moi)}
            </Button>
          </Form.Item>
        </Row>
      )}
    </Form.List>
  );
};

export default CaLamViec;
