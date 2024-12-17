import React from "react";
import { Breadcrumb, Splitter } from "antd";
import SideBar from "./SideBar";
import { useGetContextApp } from "../modules/contextApp";
import { Outlet } from "react-router-dom";
import BreadcrumbApp from "./BreadcrumbApp";
type propsType = {};
export default function Layout(props: propsType): React.JSX.Element {
    const {withSideBar,setWithSidebar}=useGetContextApp()
  return (
    <>
      <Splitter onResize={(e)=>{
        setWithSidebar(e[0]);
      }}
        style={{ height: '100dvh', boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      >
        <Splitter.Panel defaultSize={withSideBar} min={60} max={340}>
          <SideBar />
        </Splitter.Panel>
        <Splitter.Panel>
            <BreadcrumbApp/>
            <Outlet/>
        </Splitter.Panel>
      </Splitter>
    </>
  );
}
