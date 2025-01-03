import type { MenuProps, MenuRef } from "antd";
import { Menu } from "antd";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetContextApp } from "../modules/contextApp";
import { ALL_PATH } from ".";



export default function SideBar(): React.JSX.Element {
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
      style={{ width: "100%",backgroundColor:'#eaeaea',border:'unset' }}
      defaultActiveFirst
      mode="inline"

      items={ALL_PATH}
    />
  );
}
