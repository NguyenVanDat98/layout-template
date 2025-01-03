import { Splitter } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGetContextApp } from "../modules/contextApp";
import BreadcrumbApp from "./BreadcrumbApp";
import SideBar from "./SideBar";
type propsType = {};
export default function Layout(props: propsType): React.JSX.Element {
  const { withSideBar, setWithSidebar } = useGetContextApp();
   
  return (
    <>
      <Splitter
        onResize={(e) => {
          setWithSidebar(e[0]);
        }}
        
        style={{ height: "100dvh", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      >
        <Splitter.Panel  defaultSize={withSideBar} min={ 60} style={{backgroundColor:'#eaeaea'}} max={340}>
          <SideBar />
        </Splitter.Panel>
        <Splitter.Panel style={{ overflowY: "auto" }}>
          <BreadcrumbApp />
          <div>
            <Outlet />
          </div>
        </Splitter.Panel>
      </Splitter>
    </>
  );
}
