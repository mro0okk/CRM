import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  memo,
  useCallback,
} from "react";
import cn from "classnames";
import { Col, Row, Button } from "antd";
import style from "./selectWeek.module.less";
// import { Popup } from "../Popup/Popup";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import moment from "moment";
import i18n, { languageKeys } from "../../i18n";
import Popup from "../Popup/Popup";

const TUAN = "TUAN";
const THANG = "THANG";
const NAM = "NAM";

var currentTime = 0;

const SelectWeek = forwardRef(
  (
    {
      children,
      onSelectTime = () => {},
      isDisableSwitch,
      isFullWeek = false,
      disablePass = false,
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      setSelectTime(time) {
        onClickSelectTime(time);
      },
    }));

    const [typeDate, setTypeDate] = useState(TUAN);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [currentYear, setCurrentYear] = useState(0);
    const [year, setYear] = useState(0);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [listDataTime, setListDataTime] = useState([]);

    useEffect(() => {
      let date = new Date();
      let thang = date.getMonth() + 1;
      let nam = date.getFullYear();
      setCurrentMonth(thang);
      setCurrentYear(nam);
      setYear(nam);
      currentTime = new Date().getTime();
    }, []);

    // khi click chọn
    const onClickSelectTime = useCallback(
      (time, index) => {
        setSelectedWeek(time);
        onSelectTime(time);
      },
      [onSelectTime]
    );

    const initDataTime = useCallback(
      (
        currentMonth = moment().get("month"),
        currentYear = moment().get("year")
      ) => {
        let outputData = [];

        //khởi tạo moment
        let thisMoment = moment();
        thisMoment.set("month", currentMonth);
        thisMoment.set("year", currentYear);
        thisMoment.set("date", 1);

        // HLog("toISOString", thisMoment.toDate());

        let offsetWeek = 0;

        let startOfWeek = thisMoment.day(1).startOf("isoWeek");

        let startDate = moment(startOfWeek).day(1).toDate();
        if (!isFullWeek) {
          let i = 1;
          while (true) {
            startDate = moment(startOfWeek).day(i).toDate();
            if (new Date(startDate).getDate() === 1) {
              break;
            }
            i++;
          }
        }

        let endDate = moment(startOfWeek).day(7).toDate();

        if (
          !selectedWeek &&
          currentTime > new Date(startDate).getTime() &&
          currentTime < new Date(endDate).getTime() + 86400000
        ) {
          onClickSelectTime([getTimeStamp(startDate), getTimeStamp(endDate)]);
        }

        outputData.push([getTimeStamp(startDate), getTimeStamp(endDate)]);

        // HLog(
        //   "start date",
        //   offsetWeek * 7 + 1,
        //   "\n",
        //   startOfWeek.toDate(),
        //   "\n",
        //   getTimeStamp(startDate),
        //   "\n",
        //   getTimeStamp(endDate)
        // );

        while (offsetWeek < 6) {
          let startOfWeek = thisMoment.day(8).startOf("isoWeek");

          let startDate = moment(startOfWeek).day(1).toDate();
          let endDate = moment(startOfWeek).day(7).toDate();
          outputData.push([getTimeStamp(startDate), getTimeStamp(endDate)]);

          if (
            !selectedWeek &&
            currentTime > new Date(startDate).getTime() &&
            currentTime < new Date(endDate).getTime() + 86400000
          ) {
            onClickSelectTime([getTimeStamp(startDate), getTimeStamp(endDate)]);
          }

          //   HLog(
          //     "start date",
          //     offsetWeek * 7 + 1,
          //     "\n",
          //     startOfWeek.toDate(),
          //     "\n",
          //     getTimeStamp(startDate),
          //     "\n",
          //     getTimeStamp(endDate)
          //   );

          if (new Date(endDate).getMonth() !== currentMonth) {
            break;
          }
          offsetWeek = offsetWeek + 1;
        }

        setListDataTime(outputData);
      },
      [isFullWeek, onClickSelectTime, selectedWeek]
    );

    useEffect(() => {
      initDataTime(currentMonth - 1, currentYear);
    }, [currentMonth, currentYear, initDataTime]);

    function getTimeStamp(time) {
      return new Date(time).getTime();
    }

    function getDateRange(time) {
      let start = time[0];
      let end = time[1];

      if (new Date(start).getMonth() !== new Date(end).getMonth()) {
        return (
          new Date(start).getDate() +
          "/" +
          (new Date(start).getMonth() + 1) +
          " - " +
          new Date(end).getDate() +
          "/" +
          (new Date(end).getMonth() + 1)
        );
      } else {
        return new Date(start).getDate() + " - " + new Date(end).getDate();
      }
    }

    const prevTime = () => {
      if (typeDate === TUAN) {
        if (currentMonth === 1) {
          setCurrentMonth(12);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
      }
      if (typeDate === THANG) {
        setYear(year - 1);
      }
    };
    const nextTime = () => {
      if (typeDate === TUAN) {
        if (currentMonth === 12) {
          setCurrentMonth(1);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
      }
      if (typeDate === THANG) {
        setYear(year + 1);
      }
    };

    const renderTitle = () => {
      if (typeDate === TUAN) {
        return "Tháng " + currentMonth + "/" + currentYear;
      }
      if (typeDate === THANG) {
        return "Năm " + year;
      }
      if (typeDate === NAM) {
        return "Năm " + 2014 + "-" + 2022;
      }
    };

    const renderContent = () => {
      let listMoth = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ];
      let listYear = [
        2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
      ];
      return (
        <div className={style["container"]}>
          <Row>
            {!isDisableSwitch && (
              <Col style={{ display: "flex", flexDirection: "column" }}>
                <span
                  className={
                    typeDate === TUAN ? style["lable-active"] : style["lable"]
                  }
                  onClick={() => setTypeDate(TUAN)}
                >
                  {i18n.t(languageKeys.data_Tuan)}
                </span>
                <span
                  className={
                    typeDate === THANG ? style["lable-active"] : style["lable"]
                  }
                  onClick={() => setTypeDate(THANG)}
                >
                  {i18n.t(languageKeys.data_Thang)}
                </span>
                <span
                  className={
                    typeDate === NAM ? style["lable-active"] : style["lable"]
                  }
                  onClick={() => setTypeDate(NAM)}
                >
                  {i18n.t(languageKeys.data_Nam)}
                </span>
              </Col>
            )}

            <Col style={{ height: "100%" }}>
              <Row
                align="middle"
                justify="space-around"
                style={{ width: "100%" }}
                className={style["topbar"]}
              >
                <Col>
                  <Button
                    type="text"
                    icon={<LeftOutlined style={{ color: "#AEAEAE" }} />}
                    onClick={prevTime}
                  ></Button>
                </Col>

                <Col>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CalendarOutlined />

                    <span
                      style={{
                        color: "#2CB2A5",
                        fontSize: "16px",
                        marginLeft: "15px",
                      }}
                    >
                      {renderTitle()}
                    </span>
                  </div>
                </Col>

                <Col>
                  <Button
                    type="text"
                    icon={<RightOutlined style={{ color: "#AEAEAE" }} />}
                    onClick={nextTime}
                  ></Button>
                </Col>
              </Row>

              <div className={style["body"]}>
                {typeDate === TUAN && (
                  <Row gutter={[15, 15]} style={{ width: "350px" }}>
                    {listDataTime.map((item, index) => {
                      return (
                        <Col
                          span={12}
                          onClick={() => {
                            if (item[1] > currentTime && disablePass)
                              onClickSelectTime(item, index);
                          }}
                          key={index}
                        >
                          <div
                            style={{}}
                            className={cn([
                              style["item_time"],
                              item[1] < currentTime &&
                                disablePass &&
                                style["disabled"],
                              !!selectedWeek &&
                                item[1] === selectedWeek[1] &&
                                style["selected"],
                            ])}
                          >
                            {`Tuần ${index + 1} : ${getDateRange(item)} `}
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                )}

                {typeDate === THANG && (
                  <Row gutter={[15, 15]} style={{ width: "350px" }}>
                    {listMoth.map((item, index) => {
                      return (
                        <Col
                          span={8}
                          onClick={() => onClickSelectTime(item, index)}
                          key={index}
                        >
                          <div
                            className={style["item_time"]}
                          >{`Tháng ${item}`}</div>
                        </Col>
                      );
                    })}
                  </Row>
                )}

                {typeDate === NAM && (
                  <Row gutter={[15, 15]} style={{ width: "350px" }}>
                    {listYear.map((item, index) => {
                      return (
                        <Col
                          span={6}
                          onClick={() => onClickSelectTime(item, index)}
                          key={index}
                        >
                          <div className={style["item_time"]}>{item}</div>
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </div>
      );
    };

    return (
      <Popup
        trigger="click"
        placement="bottom"
        content={renderContent()}
        popupClassName={style["popup"]}
      >
        {children}
      </Popup>
    );
  }
);

export default memo(SelectWeek);
