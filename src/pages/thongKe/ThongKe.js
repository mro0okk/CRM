import i18n, { languageKeys } from "../../i18n";
import style from "./tk.module.less";

export const ThongKe = () => {
  return (
    <div className={style["container"]}>
      <h1>{i18n.t(languageKeys.menu_thong_ke)}</h1>
    </div>
  );
};
