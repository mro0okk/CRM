import { Layout, Menu } from "antd";
import style from "./mainSider.module.less";
import { siderItems } from "./siderItems";
import cn from "classnames";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { CallPicIcon, SideBarIcon } from "../../assets/imgs";

const SIDER_WIDTH = 300;

export const MainSider = ({ collapsed = false }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [currentKeys, setCurrentKeys] = useState([]);

  useEffect(() => {
    if (currentKeys.length === 0) {
      for (let i = 0; i < siderItems.length; i++) {
        const item = siderItems[i];

        if (item.path === pathname) {
          setCurrentKeys([item.key]);
          break;
        }

        if (item.subs.length > 0) {
          for (let j = 0; j < item.subs.length; j++) {
            const subItem = item.subs[j];

            if (subItem.path === pathname) {
              setCurrentKeys([item.key, subItem.key]);
              break;
            }

            if (subItem.subs.length > 0) {
              for (let k = 0; k < subItem.subs.length; k++) {
                const subSubItem = subItem.subs[k];
                if (subSubItem.path === pathname) {
                  setCurrentKeys([item.key, subItem.key, subSubItem.key]);
                  break;
                }
              }
            }
          }
        }
      }
    }
  }, [currentKeys, pathname]);

  const handleClick = (val) => {
    setCurrentKeys(val.keyPath);
  };

  const handleClickItem = (val) => {
    history.push(val.path);
  };

  return (
    <Layout.Sider
      theme="light"
      mode="inline"
      width={SIDER_WIDTH}
      collapsed={collapsed}
      className={style["container"]}
    >
      <div className={style["iconCallWrap"]}>
        {collapsed ? (
          <div className={style["iconCallCondition"]}>
            <img src={CallPicIcon} alt="" />
          </div>
        ) : (
          <div className={style["iconCall"]}>
            <img src={CallPicIcon} alt="" />
          </div>
        )}

        {collapsed ? (
          ""
        ) : (
          <div className={style["textIcon"]}>
            <div>CRM</div>
            <div>Calling center</div>
          </div>
        )}
      </div>
      <Menu
        mode="inline"
        className={style["menu"]}
        onClick={handleClick}
        selectedKeys={currentKeys}
      >
        {siderItems.map((item) =>
          item.subs.length > 0 ? (
            <Menu.SubMenu
              key={item.key}
              title={
                <span className={style["submenu-title-1"]}>{item.title}</span>
              }
              icon={
                !!item.icon && (
                  <span className={style["submenu-icon-1"]}>{item.icon}</span>
                )
              }
              className={cn(
                style["submenu-1"],
                currentKeys.includes(item.key) && style["active"]
              )}
            >
              {item.subs.map((subItem) =>
                subItem.subs.length > 0 ? (
                  <Menu.SubMenu
                    key={subItem.key}
                    title={
                      <span className={style["submenu-title-2"]}>
                        {subItem.title}
                      </span>
                    }
                    icon={
                      !!subItem.icon && (
                        <span className={style["submenu-icon-2"]}>
                          {subItem.icon}
                        </span>
                      )
                    }
                    className={cn(
                      style["submenu-2"],
                      currentKeys.includes(subItem.key) && style["active"]
                    )}
                  >
                    {subItem.subs.map((subSubItem) => (
                      <Menu.Item
                        key={subSubItem.key}
                        className={cn(
                          style["menu-item"],
                          style["menu-item-3"],
                          currentKeys.includes(subSubItem.key) &&
                          style["active"]
                        )}
                        onClick={() => handleClickItem(subSubItem)}
                      >
                        <span className={style["title"]}>
                          {subSubItem.title}
                        </span>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item
                    key={subItem.key}
                    icon={
                      !!subItem.icon && (
                        <span className={style["icon"]}>{subItem.icon}</span>
                      )
                    }
                    className={cn(
                      style["menu-item"],
                      currentKeys.includes(subItem.key) && style["active"]
                    )}
                    onClick={() => handleClickItem(subItem)}
                  >
                    <span className={style["title"]}>{subItem.title}</span>
                  </Menu.Item>
                )
              )}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.key}
              icon={
                !!item.icon && (
                  <span className={style["icon"]}>{item.icon}</span>
                )
              }
              className={cn(
                style["menu-item"],
                style["menu-item-1"],
                currentKeys.includes(item.key) && style["active"]
              )}
              onClick={() => handleClickItem(item)}
            >
              <span className={style["title"]}>{item.title}</span>
            </Menu.Item>
          )
        )}
      </Menu>
    </Layout.Sider>
  );
};
