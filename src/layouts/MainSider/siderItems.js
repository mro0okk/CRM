import {
  AccessibleIconAlt,
  Calendar,
  Chart,
  ClockEight,
  DocumentIcon,
  IncomingCall,
  PhoneAlt,
  Statistical,
  Docs,
  StatisticIcon,
} from "../../assets/svgs";
import { paths, keys } from "../../constants";
import { rid } from "../../helpers";
import i18n, { languageKeys } from "../../i18n";

export const siderItems = [
  {
    key: keys.feature_Quan_ly_cuoc_goi,
    title: i18n.t(languageKeys.menu_Quan_ly_cuoc_goi),
    icon: <PhoneAlt />,
    subs: [
      {
        key: rid(),
        title: i18n.t(languageKeys.menu_Tiep_nhan_cuoc_goi),
        icon: <IncomingCall />,
        path: paths.tiep_nhan_cuoc_goi,
        subs: [],
      },
      {
        key: rid(),
        title: i18n.t(languageKeys.menu_Lich_su_cuoc_goi),
        icon: <ClockEight />,
        path: paths.lich_su_cuoc_goi,
        subs: [],
      },
      {
        key: rid(),
        title: i18n.t(languageKeys.menu_bang_dieu_khien),
        icon: <StatisticIcon />,
        path: paths.bang_dieu_khien,
        subs: [],
      },
    ],
  },
  {
    key: keys.feature_Quan_ly_benh_nhan,
    title: i18n.t(languageKeys.menu_Quan_ly_benh_nhan),
    icon: <AccessibleIconAlt />,
    path: paths.quan_ly_benh_nhan,
    subs: [],
  },
  {
    key: keys.feature_Quan_ly_nhan_vien,
    title: i18n.t(languageKeys.menu_quan_ly_nhan_vien),
    icon: <DocumentIcon />,
    path: paths.quan_ly_nhan_vien,
    subs: [],
  },
  {
    key: keys.feature_lich_lam_viec,
    title: i18n.t(languageKeys.menu_quan_ly_lich_lam_viec),
    icon: <Calendar />,
    path: paths.lich_lam_viec,
    subs: [],
  },
  {
    key: keys.feature_Quan_ly_thong_ke,
    title: i18n.t(languageKeys.menu_thong_ke),
    icon: <Chart />,
    path: paths.thong_ke,
    subs: [],
  },
];
