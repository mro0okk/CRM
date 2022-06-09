import { useEffect, useState } from "react";
import { Layout } from "antd";
import { MainSider, MainHeader } from "../layouts";
import { Switch, Route, Redirect } from "react-router-dom";
import { paths } from "../constants";
import {
  LichSuCuocGoi,
  NoMatch,
  QuanLyBenhNhan,
  TiepNhanCuocGoi,
  LichLamViec,
  QuanLyNhanVien,
  BangDieuKhien,
  TiepNhanHoSo,
} from "../pages";
import usePhone from "../pages/TiepNhanCuocGoi/hooks/usePhone";
import InviteCall from "../pages/TiepNhanCuocGoi/Components/Phone/inviteCall";
import { useSelector } from "react-redux";
import { phoneStatus } from "../constants/phoneStatus";
import { ThongKe } from "../pages/thongKe/ThongKe";
import HoSoChuaCoTrongHeThong from "../pages/TiepNhanCuocGoi/hoSoChuaCoTrongHeThong/hoSoChuaCoTrongHeThong";

export const MainRoutes = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const toggleSider = () => setSiderCollapsed((currentValue) => !currentValue);

  const { phoneInfo } = useSelector((s) => s.auth);

  const info = setTimeout(() => {
    return {
      domain: "tiennv",
      username: "100",
      password: "H5S21TubVN",
    };
  }, 3000);

  const register = usePhone(info);

  const { status } = useSelector((state) => state.call);
  return (
    <>
      {status === phoneStatus.invite && <InviteCall />}
      {status === phoneStatus.on_call && (
        <Redirect to={paths.tiep_nhan_cuoc_goi} />
      )}
      <Layout>
        <MainSider collapsed={siderCollapsed} />
        <Layout.Content>
          <MainHeader toggleSider={toggleSider} />
          <Switch>
            <Route
              exact
              path={paths.tiep_nhan_cuoc_goi}
              component={TiepNhanCuocGoi}
            />
            <Route
              exact
              path={paths.lich_su_cuoc_goi}
              component={LichSuCuocGoi}
            />
            <Route
              exact
              path={paths.bang_dieu_khien}
              component={BangDieuKhien}
            />
            <Route
              exact
              path={paths.quan_ly_benh_nhan}
              component={QuanLyBenhNhan}
            />
            <Route
              exact
              path={paths.quan_ly_nhan_vien}
              component={QuanLyNhanVien}
            />
            <Route
              exact
              path={paths.tiep_nhan_ho_so}
              component={TiepNhanHoSo}
            />
            <Route exact path={paths.thong_ke} component={ThongKe} />

            <Route exact path={paths.lich_lam_viec} component={LichLamViec} />

            <Route
              exact
              path={paths.ho_so_chua_co_trong_he_thong}
              component={HoSoChuaCoTrongHeThong}
            />

            <Redirect exact from={paths.main} to={paths.thong_ke} />
            {/* <Redirect exact from={paths.main} to={paths.dang_nhap} /> */}

            <Route component={NoMatch} />
          </Switch>
        </Layout.Content>
      </Layout>
    </>
  );
};
