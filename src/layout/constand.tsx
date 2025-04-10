import {
  AppstoreOutlined,
  BarChartOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  MailOutlined,
  OrderedListOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Table } from "antd";
import { get } from "lodash";
import { ReactNode } from "react";
import { ReportPage } from "../pages/report/screens";
import { Homepage } from "../pages";
import MyCalendar from "../pages/calender";
import { OrderPage } from "../pages/order";
import UploadPage from "../pages/upload";
type MenuItem = Required<MenuProps>["items"][number];
type SubMenuItem = MenuItem & {
  path?: string;
  renderBreadcrumb?: ReactNode;
  Component?: ReactNode;
  index?:boolean
  children?: SubMenuItem[];
};
export const ALL_PATH = (
    [
      {
        key: "dasboard",
        label: "Trang chủ",
        icon: <SettingOutlined />,
        index:true,
        path: "dasboard",
        Component:<Homepage/>,
      },
      {
        key: "report",
        label: "Báo cáo",
        icon: <BarChartOutlined />,
        index:true,
        path: "report",
        Component:<ReportPage/>,
      },
      {
        key: "paymentTransaction",
        label: "Thu / chi",
        icon: <CalculatorOutlined />,
        index:true,
        path: "paymentTransaction",
        Component:<MyCalendar/>,
      },
      {
        key: "appointments",
        label: "Đặt hàng",
        icon: <OrderedListOutlined />,
        index:true,
        path: "appointments",
        Component:<OrderPage/>,
      },
      {
        key: "upload",
        label: "Tải lên",
        icon: <UploadOutlined />,
        index:true,
        path: "upload",
        Component:<UploadPage/>,
      },
      {
        key: "calendar",
        label: "Lịch hẹn",
        icon: <CalendarOutlined />,
        index:true,
        path: "calendar",
        Component:<MyCalendar/>,
      },
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
            Component:<Table></Table>
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