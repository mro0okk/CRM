// import { apis, keys } from "./constants";
import cryptoRandomString from "crypto-random-string";
import axios from "axios";
import sha256 from "sha256";
import moment from "moment";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { notification } from "antd";
import i18n, { languageKeys } from "./i18n";
import { keys } from "./constants";
import apis from "./constants/apis";

export function getUrlApi(stringUrl) {
  let pathName = window.location.pathname;
  let hostName = window.location.host;
  //HLog("Utils getUrlApi partname: " + pathName + " hostName: " + hostName)
  if (pathName !== "") {
    //nếu partner khác rỗng, thì xoá bỏ các kí tự / đi
    pathName = pathName.replace("/", "");
  }

  //nếu tồn tại text partner= thì xoá đi
  if (pathName.includes("partner=")) {
    pathName = pathName.replace("partner=", "");
  }

  if (!pathName || pathName === "") {
    //nếu là localhost và pathName = rỗng, tức url mặc định ở localhost
    if (hostName === "tmedical.h247.vn") {
      pathName = "tmedical";
    }
  }

  let urlApi = stringUrl + "?partner_code=" + pathName;

  //HLog("Utils getUrlApi urlApi: " + urlApi + " pathName: " + pathName)
  return urlApi;
}
export const localGet = (key, fallback = "") => {
  const val = localStorage.getItem(key);
  if (!val || val === "undefined" || val === "") return fallback;
  return JSON.parse(val);
};

export const localSet = (key, val) => {
  HLog("Auth Saga setLocal key:", key, "with data", val);
  return localStorage.setItem(key, JSON.stringify(val));
};

export const localRemove = (key) => {
  return localStorage.removeItem(key);
};

// random id (default: 5 chữ cái)
export const rid = (length = 5) => cryptoRandomString({ length: length });

export function HLog() {
  if (keys.enable_app_log) {
    console.log.apply(this, arguments);
  }
}

// lấy url ảnh để Preview
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Hàm POST
export const common_post = async (url, body, useToken = true) => {
  try {
    let token = localGet(keys.access_token);
    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      timeout: 5000,
    };
    // if (!useToken) config = { timeout: 5000 };
    HLog("Common_post REQUEST url", url, "body", body, "config", config);
    let dataResponse = await axios.post(url, body, config);
    let result = dataResponse.data;
    HLog("Common_post RESPONSE url", url, "result", result);
    return result;
  } catch (error) {
    HLog("post error", error);
    return null;
  }
};

//đổi millisecond sang date DD/mm/yyy
export function convertMillisecondToDate(
  duration,
  separator = "/",
  dateOnly = false
) {
  if (duration == null || duration === "") {
    return "";
  }
  let outPut = "";
  duration = Number(duration);
  var isoFormat = new Date(duration);
  let year = isoFormat.getFullYear();
  let month = isoFormat.getUTCMonth() + 1;
  let date = isoFormat.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (dateOnly) {
    outPut = date + separator + month;
  } else {
    outPut = date + separator + month + separator + year;
  }
  return outPut;
}

// đổi milisecond sang giờ
export function convertTimeUTCToTime(time) {
  let date = new Date();
  date.setUTCHours(Number(time.split(":")[0]));
  date.setUTCMinutes(Number(time.split(":")[1]));
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let result = hours + ":" + minutes;
  return result;
}

//đổi millisecond dạng UTC sang thời gian
export function convertMilliUTCToTime(duration) {
  if (duration == null || duration === "") return "";
  var minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = hours + ":" + minutes;
  let result = convertTimeUTCToTime(time);
  return result;
}

// chuyển từ DD//MM/YYY sang MMMMYYDD
export const convertDateToValue = (dateString) => {
  if (dateString && dateString !== "") {
    let year = dateString.slice(0, 4);
    let moth = dateString.slice(4, 6);
    let date = dateString.slice(6, 8);
    return date + "/" + moth + "/" + year;
  }
  return "";
};

// chuyển từ MMMMYYDD sang DD//MM/YYY
export const convertValueToDate = (string) => {
  if (string && string !== "") {
    let arr = string.split("/");
    return arr[2] + arr[1] + arr[0];
  }
};

// chuyển từ MMMMYYDD sang DD//MM/YYY
export const convertValueToMilisecond = (string) => {
  let milisecond;
  if (string && string !== "") {
    let year = string.slice(0, 4);
    let moth = string.slice(4, 6);
    let date = string.slice(6, 8);
    milisecond = new Date(year, moth, date).getTime();
  }
  return milisecond;
};

//hàm format đơn vị tiền tệ thêm 3 số 0 vào cuối (isFull = false thì thêm .000)
export function formatCurrency(num, currency = "", isFull = false) {
  if (!num || num === "") {
    let response = "0 " + currency;
    return response;
  }
  num = Number(num);
  if (num === 0) {
    return "0 " + currency;
  }
  if (num.length === 2) {
    if (num === "00") {
      num = num.replace("00", "0");
    }
  }
  if (num.length > 1) {
    let first = num.substring(0, 1);
    if (first === "0") {
      num = num.substring(1, num.length);
    }
  }
  let result = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  if (!isFull) {
    result = result + ".000 ";
  }
  return result + currency;
}

//format định dạng giá khi thao tác ô input giá
export const formatNumberToPrice = (x) => {
  if (!x || x === "" || x === 0) {
    return 0;
  }
  x = x.toString();
  x = x.replace(/ /g, "");
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1.$2");
  return x;
};

export const formatPriceToNumber = (x) => {
  x = x.toString();
  if (x === 0 || x === "") {
    return 0;
  }
  while (x.charAt(0) === 0 && x.length > 1) {
    x = x.substr(1);
  }
  x = x.replace(/ /g, "");
  return x.replace(/[.]+/g, "").trim();
};

//hàm validate giá nhập vào và trả lại theo dạng 123.455.232
export const validatePriceInput = (input) => {
  if (!input) {
    return 0;
  }
  HLog("onchangePrice", input);
  input = input.replace(/[^0-9.]/g, "");
  input = formatPriceToNumber(input);
  input = formatNumberToPrice(input);
  HLog("new", input);
  return input;
};

export const encrypt256 = async (key) => {
  HLog("my key: " + key);
  try {
    const encrypted = await sha256(key);
    return encrypted;
  } catch (error) {
    HLog("cant encrypt key...", error);
    return null;
  }
};

//kiểm tra đối tượng object có rỗng hay không
export function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}";
}

//in hoa chữ cái đầu mỗi từ
export function capital_letter(str) {
  let result = "";
  if (str) {
    str = str.replace(/\s{2,}/g, " ");
    str = str.split(" ");
    // HLog(str);

    for (var i = 0, x = str.length; i < x; i++) {
      if (!!str[i][0]) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    }
    result = str.join(" ");
  }

  return result;
}

//hàm chuyển đổi firstName, lastName thành fullTime theo ngôn ngữ
export function getFullName(objectInfo) {
  HLog("Utils getFullName objectInfo: " + JSON.stringify(objectInfo));
  if (objectInfo != null && !isEmptyObject(objectInfo)) {
    // let lang = getLocale();
    let firstName = objectInfo.HO;
    let lastName = objectInfo.TEN;
    if (!!firstName && !!lastName) {
      let userName = capital_letter(firstName) + " " + capital_letter(lastName);
      return userName.trim();
    } else {
      firstName = objectInfo.first_name;
      lastName = objectInfo.last_name;
      if ((!firstName && firstName !== "") || (!lastName && lastName !== "")) {
        let name = objectInfo?.full_name || objectInfo.name;
        if (name) {
          return capital_letter(name);
        }
        return "";
      }
      let userName = capital_letter(firstName) + " " + capital_letter(lastName);
      return userName.trim();
    }
  } else {
    return "";
  }
}

//hàm trả về tuổi của người dùng
export function convertMillisecondToAge(millisecond, format) {
  // Dành cho trường hợp giá trị đầu vào là dd/mm/yyyy @.@
  if (typeof millisecond === "string" && millisecond.includes("/")) {
    const arrNoSlash = millisecond.split("/");

    if ([...arrNoSlash].length === 3) {
      //millisecond = moment(millisecond, "DD/MM/YYYY").valueOf();
      millisecond = moment(millisecond, format).valueOf();
    }
  }

  millisecond = Number(millisecond); // đổi input thành number

  // nếu milli = NaN hoặc milli = 0 thì return "--"
  if (isNaN(millisecond) || millisecond === 0) {
    return "--";
  }

  // đổi input (milli) về gap giữa hiện tại và input
  let duration = Math.floor(
    moment.duration(moment().diff(moment(millisecond))).asYears()
  );

  // nếu gap > 0 thì trả về số tuổi (gap được làm tròn xuống)
  if (duration > 0) {
    return `${duration} tuổi`;
  }
  // ngược lại thì trả về số tháng tuổi (gap cũng được làm tròn xuống)
  else {
    duration = Math.ceil(
      moment.duration(moment().diff(moment(millisecond))).asMonths()
    );
    return `${duration} tháng`;
  }
}

// lay gioi tinh
export function getSex(value) {
  let str_return = "";
  if (!value || value === 0 || value === "0") {
    //str_return = t(languageKeys.PSO__MODAL_DETAIL__SEX_FEMALE);
    str_return = i18n.t(languageKeys.gioi_tinh_Nu);
  } else if (value === 1 || value === "1") {
    // str_return = t(languageKeys.PSO__MODAL_DETAIL__SEX_MALE);
    str_return = i18n.t(languageKeys.gioi_tinh_Nam);
  } else if (value === 2) {
    // str_return = t(languageKeys.PSO__MODAL_DETAIL__SEX_OTHER);
    str_return = i18n.t(languageKeys.gioi_tinh_Khac);
  }
  return str_return;
}

// lay gioi tinh
export function getSexFromString(value) {
  switch (value) {
    case "nam":
      return i18n.t(languageKeys.gioi_tinh_Nam);
    case "nu":
      return i18n.t(languageKeys.gioi_tinh_Nu);
    default:
      return i18n.t(languageKeys.gioi_tinh_Khac);
  }
}

// hàm lấy danh sách tỉnh thành
export const getAllProvinces = async () => {
  const response = await axios.get(
    "https://api.deepcare.vn/address/getAllProvince"
  );

  const { status, data } = response.data;

  if (status === "OK") {
    return data;
  }

  return [];
};

// hàm lấy danh sách quận huyện
export const getAllDistricts = async (code) => {
  const response = await axios.post(
    "https://api.deepcare.vn/address/searchByCode",
    {
      address_type: 1,
      code: code,
    }
  );
  const { status, data } = response.data;

  if (status === "OK") {
    return data;
  }

  return [];
};

// hàm lấy danh sách xã phường
export const getAllWards = async (code) => {
  const response = await axios.post(
    "https://api.deepcare.vn/address/searchByCode",
    {
      address_type: 2,
      code: code,
    }
  );

  const { status, data } = response.data;

  if (status === "OK") {
    return data;
  }

  return [];
};

//hàm lấy thời gian hiển thị cho cuộc hẹn tùy theo type cuộc hẹn
export function getTimeScheduleByType(record) {
  if (!record || !record.schedule_type) {
    return "";
  }

  if (record.schedule_type === keys.section) {
    return (
      convertMilliSlotToTime(record.gio_bat_dau) +
      " - " +
      convertMilliSlotToTime(record.gio_ket_thuc)
    );
  } else {
    return convertMilliSlotToTime(record.gio_kham);
  }
}

//hàm đổi thời gian khám millisecond UTC sang thời gian hiện tại
export function convertMilliSlotToTime(milli) {
  if (milli === null || milli === undefined || milli === "") {
    return;
  }
  if (typeof milli == "string") {
    return milli;
  }
  let duration = Number(milli);
  var //   milliseconds = Number((duration % 1000) / 100),
    //     seconds = Number((duration / 1000) % 60),
    minutes = Number((duration / (1000 * 60)) % 60),
    hours = Number((duration / (1000 * 60 * 60)) % 24);

  let newhours = hours < 10 ? "0" + hours : hours;
  let newminutes = minutes < 10 ? "0" + minutes : minutes;
  //   let newseconds = seconds < 10 ? "0" + seconds : seconds;
  let times = newhours + ":" + newminutes;
  return convertTimeUTCToTime(times);
}

//lấy ký tự đầu tiên của học hàm, học vị bác sĩ
export function getEducation(item) {
  if (item == null || isEmptyObject(item)) {
    return "";
  }
  let education = "";
  let academic_rank_name = item.academic_rank_name;
  let degree_name = item.degree_name;
  //học hàm giáo sư, phó giáo sư, tiến sĩ
  if (academic_rank_name != null && academic_rank_name !== "") {
    education = getFirstCharactor(academic_rank_name);
  }
  //học vị, thạc sĩ, bác sĩ...
  if (degree_name != null && degree_name !== "") {
    let result = getFirstCharactor(degree_name);
    if (degree_name.includes("Thạc")) {
      result = "ThS";
    } else if (degree_name.includes("Cử nhân")) {
      result = "BS";
    }
    if (education !== "") {
      education = education + "." + result;
    } else education = result;
  }
  if (education === "") {
    return "BS";
  }
  return education;
}

//lấy ký tự đầu tiên của học hàm, học vị
function getFirstCharactor(txtCharactor) {
  let result = "";
  let arrCharactor = txtCharactor.toLocaleUpperCase().split(" ");
  for (let i = 0; i < arrCharactor.length; i++) {
    let text = arrCharactor[i];
    //nếu là bác sĩ chuyên khoa 2
    if (text === "II") {
      return "BS.CKII";
    } else if (text === "I") {
      //nếu là bác sĩ chuyên khoa 1
      return "BS.CKI";
    }
    result = result + (text ? text.charAt(0).toUpperCase() : "");
  }
  return result;
}

//lấy ra millisecond thời gian theo giờ GMT
export function getTimeMillisecondUTC() {
  let date = new Date();
  let formatdateUTC = date.toUTCString();
  let output = new Date(formatdateUTC).getTime();
  return output;
}

// hàm đọc file excel
export const readExcel = (file, onOk = () => { }) => {
  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const wsname = wb.SheetNames[0];

      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  promise.then((d) => {
    HLog("excel data", d);
    onOk(d);
  });
};

export const exportToCSV = async (csvData = [], fileName = "data") => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = await XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

// upload ảnh lên server
export const uploadImage = async (bodyFormData) => {
  try {
    let response = await axios.post(apis.upload_imge, bodyFormData, {
      headers: {
        "Content-Type": "multiple/form-data",
      },
    });
    HLog("upload image respone 11", response);
    if (response.data.result === "OK") {
      return response.data.data;
    }
  } catch (error) {
    HLog("upload image fail ", error);
  }
};

export const beforeUpload = (file) => {
  const isImage = file.type.indexOf("image/") === 0;
  if (!isImage) {
    notification.error({
      message: i18n.t(languageKeys.noti_Chi_duoc_upload_anh),
    });
  }

  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    notification.error({
      message: i18n.t(languageKeys.noti_Kich_thuoc_anh_be_hon_5mb),
    });
  }
  return isImage && isLt5M;
};
export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

// xử lý lấy giá trị object
export function handleGetProperty(object, props, default_value, ignore_value) {
  let result = default_value;
  if (object) {
    result = object[`${props}`];
  }
  if (typeof result != "number" && typeof result != "boolean") {
    if (!result) {
      result = default_value;
    }
  }
  if (result === ignore_value) {
    return default_value;
  }

  return result;
}
//lấy ra thứ trong tuần
export function getWeekdays(strDate) {
  if (!strDate || strDate === "") {
    return "";
  }
  let result = "";
  let days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  let date = new Date(parseInt(strDate));
  result = days[date.getDay()];

  return result;
}

export const getErrorMessage = (
  error_code,
  fallback = `ERROR: ${error_code}`
) => {
  if (!error_code) return fallback;

  switch (error_code.toString()) {
    case "001":
      return i18n.t(languageKeys.error_loi_ton_tai);
    case "002":
      return i18n.t(languageKeys.error_loi_khong_nhap_gia_tri);
    case "003":
      return i18n.t(languageKeys.error_gia_tri_khong_hop_le);
    case "004":
      return i18n.t(languageKeys.error_khong_trung_khop);
    default:
      return fallback;
  }
};

export const getDayName = (day) => {
  switch (day) {
    case 0:
      return i18n.t(languageKeys.data_Chu_nhat);
    case 1:
      return i18n.t(languageKeys.data_Thu_2);
    case 2:
      return i18n.t(languageKeys.data_Thu_3);
    case 3:
      return i18n.t(languageKeys.data_Thu_4);
    case 4:
      return i18n.t(languageKeys.data_Thu_5);
    case 5:
      return i18n.t(languageKeys.data_Thu_6);
    case 6:
      return i18n.t(languageKeys.data_Thu_7);
    default:
      return "";
  }
};

export const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(4)}`;
  }
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
    3,
    6
  )} ${phoneNumber.slice(6, 10)}`;
}

export const postBearerToken = async (url, body, useToken = true) => {
  try {
    let token = localGet(keys.access_token)
    let bearer_token = localGet(keys.bearer_token)

    if (bearer_token) {
      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token,
          "Authorization": `Bearer ${bearer_token}`
        },
        timeout: 5000,
      }
      // if (!useToken) config = { timeout: 5000 };
      HLog("Common_post REQUEST url", url, "body", body, "config", config)
      let dataResponse = await axios.post(url, body, config)
      let result = dataResponse.data
      HLog("Common_post RESPONSE url", url, "result", result)
      return result
    } else {
      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        timeout: 5000,
      }
      HLog("Common_post REQUEST url", url, "body", body, "config", config)
      let dataResponse = await axios.post(url, body, config)
      let result = dataResponse.data
      HLog("Common_post RESPONSE url", url, "result", result)
      return result
    }
  } catch (error) {
    HLog("post error", error)
    return null
  }
}

export const getPhoneService = async (url, params) => {
  const bearer_token = localGet(keys.bearer_token)
  try {
    let headers
    if (bearer_token) {
      headers = { Accept: "application/json", "Content-Type": "application/json", "Authorization": `Bearer ${bearer_token}` }
    } else {
      headers = { Accept: "application/json", "Content-Type": "application/json" }
    }
    const dataResponse = await axios.get(url, { params: { ...params }, headers: headers })
    const result = dataResponse.data
    HLog("getPhone Service RESPONSE url", url, "result", result)
    return result
  } catch (e) {
    HLog("get Error: ", e)
  }
}