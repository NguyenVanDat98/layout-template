import React, { ReactNode, useRef } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { MenuProps, MenuRef } from "antd";
import { Menu } from "antd";
import { useGetContextApp } from "../modules/contextApp";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
type SubMenuItem = MenuItem & {
  path?: string;
  renderBreadcrumb?: ReactNode;
  Component?: ReactNode;
  children?: SubMenuItem[];
};

export const ALL_PATH = (
  [
    {
      key: "setting",
      label: "Cài đặt",

      icon: <MailOutlined />,
      path: "setting",
      children: [
        {
          key: "ui",
          label: "Giao diện trang chủ",
          // type: "group",
          path: "ui",
          children: [
            { key: "homepage", label: "Trang chủ", path: "homepage" },
            { key: "blog", label: "Tin tức", path: "blog" },
          ],
        },
        {
          key: "user",
          label: "Tài khoản",
          path: "user",
          children: [
            { key: "staff", label: "Nhân viên", path: "staff" },
            {
              key: "group",
              label: "Nhóm nhân viên",
              path: "group",
            },
          ],
        },
      ],
    },
    {
      key: "order",
      label: "Đơn hàng",
      path: "order",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "create",
          label: "Đơn mới",
          path: "create",
        },
        {
          key: "list",
          label: "Danh sách",
          path: "list",
        },
        {
          key: "update",
          label: "Cập nhật",
          path: "update",
          children: [
            {
              key: ":id",
              label: "Chi tiết",
              path: ":id",
            },
          ],
        },
      ],
    },
    {
      type: "divider",
    },
  ] satisfies SubMenuItem[]
).map(loop);
function loop(s: SubMenuItem) {
  if (get(s, "label")) {
    s.renderBreadcrumb = get(s, "label");
  }
  if (s.children?.length) {
    s.children = s.children.map(loop);
  }
  if (!s.Component) {
    s.Component = <div>base</div>;
  }
  return s;
}
type propsType = {};
export default function SideBar(props: propsType): React.JSX.Element {
  const { withSideBar } = useGetContextApp();
  const navi = useNavigate();
  const refMenu = useRef<MenuRef>(null);
  const onClick: MenuProps["onClick"] = (e) => {
    navi(e.keyPath.concat([""]).reverse().join("/"));
  };
  return (
    <Menu
      ref={refMenu}
      onClick={onClick}
      inlineCollapsed={withSideBar <= 140}
      style={{ width: "100%" }}
      defaultActiveFirst
      mode="inline"
      items={ALL_PATH}
    />
  );
}
