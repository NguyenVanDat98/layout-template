import React from "react";
import Category from "../components/category";
import { range } from "lodash";
import { Flex } from "antd";
type propsType = {};
export default function OrderPage(props: propsType): React.JSX.Element {
  return <div style={{ position: "relative" }}>
    {
        range(4).map((e)=> <Category count={e} title={<Flex gap={10} align="center" >{e}<div>d</div></Flex>}/>)
    }
  </div>;
}
