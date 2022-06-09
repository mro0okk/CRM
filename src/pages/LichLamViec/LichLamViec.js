import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Table, Input, Dropdown } from "antd";
import cn from "classnames";
import style from "./LichLamviec.module.less";
import i18n, { languageKeys } from "../../i18n";
export const LichLamViec = () => {
  const calendarCol = [
    "monday",
    "tuesday",
    "wenesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank">1st menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank">2nd menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank">3rd menu item</a>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: (
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button>bottomLeft</Button>
        </Dropdown>
      ),
      dataIndex: "name",
      render: (name) => (
        <>
          <div>
            {name}
            <br />
            <small>Mã bệnh nhân</small>
          </div>
        </>
      ),
    },
    ...calendarCol.map((item, index) => {
      return {
        title: () => (
          <div className={style["tableHeadDate"]}>
            <div>{item}</div>
            <span className={cn(style["today"])}> 14</span>
          </div>
        ),
        dataIndex: calendarCol,
        width: "150",
        render: () => {
          return (
            <PlusOutlined
              style={{
                marginLeft: "50%",
                color: "#ddd",
                transform: "translateX(-50%)",
              }}
            />
          );
        },
      };
    }),
  ];

  const data = [
    {
      key: "1",
      name: "Josh",
    },
    {
      key: "2",
      name: "Jim Green",
    },
    {
      key: "3",
      name: "Joe Black",
    },
    {
      key: "4",
      name: "Jim Red",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div className={style.container}>
      <Layout>
        <div className={style.header}>
          <h1>{i18n.t(languageKeys.menu_Lich_lam_viec)}</h1>
        </div>
        <Layout.Content>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            onChange={onChange}
            className={style.tableAntd}
            scroll={{ y: "100%" }}
          />
        </Layout.Content>
      </Layout>
    </div>
  );
};
