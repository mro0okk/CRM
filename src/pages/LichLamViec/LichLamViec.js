// import i18n, { languageKeys, languages } from "../../../i18n";
import { Button, Col, Popover, Row, Spin } from "antd";
import {
  FilterOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import cn from "classnames";
// import { getDayName, rid } from "../../../helpers";
import CaiDatLLV from "./CaiDatLLV/CaiDatLLV";
import { apiLayDsLLV } from "./apiLichLamViec";
import { useSelector } from "react-redux";
import CaiDatLichKham from "./CaiDatLichKham/CaiDatLichKham";
import { Edit } from "../../assets/svgs";
import { getDayName, rid } from "../../helpers";
import i18n, { languageKeys, languages } from "../../i18n";
import Topbar from "../../components/Topbar/Topbar";
import SelectWeek from "../../components/SelectWeek/SelectWeek";
import style from "./lichLamviec.module.less";
// import { Edit } from "../../../assets/svg";

export const LichLamViec = () => {
  const userProfile = useSelector((state) => state.auth.user);
  const settingRef = useRef();
  const selectTimeRef = useRef();
  const configRef = useRef();
  const [loading, setLoading] = useState(false);
  const [currentTimeRange, setCurrentTimeRange] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null); //thời gian bắt đầu, kết thúc của tuần hiện tại, phục vụ cho nút tuần này
  const [dataSource, setDataSource] = useState([
    {
      KHOA_ID: "K1",
      TEN_KHOA: "Khoa 1",
      arr_phong: [
        {
          PHONG_ID: "P1",
          TEN_PHONG: "Phong 1",
          arr_ngay: [
            {
              arr_bac_si: [],
              NGAY: "20221206",
            },
            {
              arr_bac_si: [],
              NGAY: "20221207",
            },
            {
              arr_bac_si: [],
              NGAY: "20221208",
            },
            {
              arr_bac_si: [],
              NGAY: "20221209",
            },
            {
              arr_bac_si: [],
              NGAY: "20221210",
            },
            {
              arr_bac_si: [],
              NGAY: "20221211",
            },
            {
              arr_bac_si: [],
              NGAY: "20221212",
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    getDataSource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimeRange, currentWeek]);

  // Hàm xử lý lấy dữ liệu lịch làm việc
  const getDataSource = async () => {
    if (!!currentTimeRange && !!currentWeek) {
      setLoading(true);

      const result = await apiLayDsLLV({
        BENH_VIEN_ID: "H-b75521add5",
        partner_code: "tmedical",
        TU: moment(currentTimeRange[0]).format("YYYYMMDD"),
        DEN: moment(currentTimeRange[1]).format("YYYYMMDD"),
      });

      if (!!result) setDataSource(result);

      setLoading(false);
    } else if (!!currentTimeRange && !currentWeek)
      setCurrentWeek(currentTimeRange);
  };

  const daysOfWeek = useMemo(() => {
    const ngay_dau_tuan = !!currentTimeRange ? currentTimeRange[0] : 0;

    return Array.apply(null, Array(7)).map((_, i) =>
      moment(ngay_dau_tuan).day(i + 1)
    );
  }, [currentTimeRange]);

  const handleConfig = (data, ngay, bac_si) => {
    const ngay_dau_tuan = !!currentTimeRange ? currentTimeRange[0] : 0;
    configRef.current.open({ initData: data, ngay, ngay_dau_tuan, bac_si });
  };

  //trả về tuần hiện tại
  const onPressCurrentWeek = () => {
    selectTimeRef.current.setSelectTime(currentWeek);
  };

  const monthAndYear = useMemo(() => {
    if (!!currentTimeRange && currentTimeRange.length === 2) {
      const fromDate = moment(currentTimeRange[0]);
      const toDate = moment(currentTimeRange[1]);

      if (fromDate.isSame(toDate, "month")) {
        return i18n.language === languages.tieng_viet
          ? i18n.t(languageKeys.data_Thang) + " " + fromDate.format("M / YYYY")
          : fromDate.format("MMMM YYYY");
      } else {
        return i18n.language === languages.tieng_viet
          ? i18n.t(languageKeys.data_Thang) +
              " " +
              fromDate.format("M") +
              " - " +
              i18n.t(languageKeys.data_Thang) +
              " " +
              toDate.format("M / YYYY")
          : fromDate.format("MMMM") +
              " - " +
              toDate.format("MMMM") +
              " " +
              fromDate.format("YYYY");
      }
    }

    return "";
  }, [currentTimeRange]);

  return (
    <div>
      <Topbar
        className={style["topbar"]}
        title={
          <Row gutter={10} align="middle">
            <Col>
              <h1 style={{ marginBottom: 0, marginRight: 10 }}>
                {i18n.t(languageKeys.menu_Lich_lam_viec)}
              </h1>
            </Col>

            <Col>
              <Button
                icon={<LeftOutlined style={{ color: "#999" }} />}
                disabled={
                  !!currentTimeRange &&
                  moment().isSame(moment(currentTimeRange[0]), "week")
                }
                onClick={() =>
                  selectTimeRef.current.setSelectTime([
                    moment(currentTimeRange[0]).day(-6),
                    moment(currentTimeRange[0]).day(0),
                  ])
                }
              ></Button>
            </Col>

            <Col>
              <Button
                icon={<RightOutlined style={{ color: "#999" }} />}
                onClick={() =>
                  selectTimeRef.current.setSelectTime([
                    moment(currentTimeRange[1]).day(1),
                    moment(currentTimeRange[1]).day(7),
                  ])
                }
              ></Button>
            </Col>

            <Col className={style["month-year"]}>{monthAndYear}</Col>
          </Row>
        }
        addOnActions={
          <Row gutter={10}>
            <Col>
              <Button type="primary" ghost onClick={onPressCurrentWeek}>
                {i18n.t(languageKeys.Tuan_nay)}
              </Button>
            </Col>

            <Col>
              <SelectWeek
                ref={selectTimeRef}
                isDisableSwitch
                isFullWeek
                disablePass
                onSelectTime={(time) => setCurrentTimeRange(time)}
              >
                <Button
                  icon={<FilterOutlined style={{ color: "#999" }} />}
                ></Button>
              </SelectWeek>
            </Col>

            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => settingRef.current.open()}
              >
                {i18n.t(languageKeys.Cai_dat_llv)}
              </Button>
            </Col>
          </Row>
        }
      />

      <Spin spinning={loading}>
        <Row className={style["header"]}>
          <div className={cn(style["item"], style["null"])}></div>

          {daysOfWeek.map((item) => (
            <div className={style["item"]} key={rid()}>
              <div>{getDayName(Number(item.format("d")))}</div>
              <div
                className={cn(
                  style["day"],
                  !!currentTimeRange &&
                    moment().isSame(item, "date") &&
                    style["active"]
                )}
              >
                {item.format("DD")}
              </div>
            </div>
          ))}
        </Row>

        <div className={style["body"]}>
          {dataSource.map((khoa) => (
            <div key={khoa.KHOA_ID}>
              <Row className={style["speciality"]} align="middle">
                <Col>{i18n.t(languageKeys.field_Khoa)}:</Col>
                <Col className={style["name"]}>{khoa.TEN_KHOA}</Col>
              </Row>

              {khoa.arr_phong.map((phong) => (
                <div className={style["room"]} key={phong.PHONG_ID}>
                  <div className={style["name"]}>{phong.TEN_PHONG}</div>

                  {phong.arr_ngay.map((ngay, index) => {
                    if (ngay.arr_bac_si.length > 0) {
                      return (
                        <div className={style["doctor-list"]} key={index}>
                          {ngay.arr_bac_si.map((bac_si) => (
                            <DoctorComponent
                              key={bac_si.NHANSU_ID}
                              bac_si={bac_si}
                              onEdit={() => handleConfig(phong, ngay, bac_si)}
                              editable={moment(ngay.NGAY, "YYYYMMDD").isAfter(
                                moment(),
                                "day"
                              )}
                            />
                          ))}
                        </div>
                      );
                    }

                    return (
                      <div
                        className={style["add-item"]}
                        key={index}
                        onClick={() => {
                          if (
                            moment(ngay.NGAY, "YYYYMMDD").isAfter(
                              moment(),
                              "day"
                            )
                          ) {
                            handleConfig(phong, ngay);
                          }
                        }}
                        style={{
                          cursor: moment(ngay.NGAY, "YYYYMMDD").isAfter(
                            moment(),
                            "day"
                          )
                            ? "pointer"
                            : "default",
                        }}
                      >
                        {moment(ngay.NGAY, "YYYYMMDD").isAfter(
                          moment(),
                          "day"
                        ) && <PlusOutlined />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Spin>

      <CaiDatLLV ref={settingRef} />
      <CaiDatLichKham ref={configRef} onSuccess={getDataSource} />
    </div>
  );
};

const DoctorComponent = memo(
  ({ bac_si = {}, onEdit = () => {}, editable = true }) => {
    const [visible, setVisible] = useState(false);

    return (
      <Popover
        key={bac_si.NHANSU_ID}
        placement="rightTop"
        trigger="click"
        title={
          <Row align="middle" justify="space-between" gutter={20} wrap={false}>
            <Col className={style["pop-name"]}>
              {bac_si.HO + " " + bac_si.TEN}
            </Col>

            {editable && (
              <Col>
                <Row>
                  {/* <Delete className={style["pop-icon"]} /> */}
                  <Edit
                    className={style["pop-icon"]}
                    onClick={() => {
                      onEdit();
                      setVisible(false);
                    }}
                  />
                </Row>
              </Col>
            )}
          </Row>
        }
        content={
          <>
            {bac_si.arr_ca.map((ca, index) => (
              <div key={index} className={style["pop-shift"]}>
                {i18n.t(languageKeys.field_Ca)} {index + 1}:{" "}
                <span>
                  {ca.GIO_BAT_DAU} - {ca.GIO_KET_THUC}
                </span>
              </div>
            ))}
          </>
        }
        onVisibleChange={(bool) => !bool && setVisible(false)}
        visible={visible}
        zIndex={0}
      >
        <div
          className={cn(style["doctor-name"], visible && style["active"])}
          onClick={() => setVisible(true)}
        >
          {bac_si.HO + " " + bac_si.TEN}
        </div>
      </Popover>
    );
  }
);
