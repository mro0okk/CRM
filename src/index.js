import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./assets/styles/main.less";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./ducks/configStore";
import { RootRoutes } from "./routes/RootRoutes";
import { languages } from "./i18n";
import viVN from "antd/lib/locale/vi_VN";
import enUS from "antd/lib/locale/en_US";
import moment from "moment";

moment.locale("en");
const i18nLocal = localStorage.getItem("i18nextLng");
const locale = i18nLocal === languages.tieng_viet ? viVN : enUS;

if (i18nLocal === languages.tieng_viet) {
  moment.locale("vi");
}

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <RootRoutes />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
