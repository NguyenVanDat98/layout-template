import { ConfigProvider, Flex, GetProp, Splitter } from "antd";
import React, { PropsWithChildren, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Chart } from ".";
import data from "./data.json";
import dataSingle from "./dataSingle.json";
import dataCountOrder from "./dataCountOrder";
import vi from "antd/locale/vi_VN";
import dayjs from "dayjs";
import './index.css'
import styled from "styled-components";
import { getReportQuantity,getReportVoucher } from "../api";
dayjs.locale("vi");
const Container = styled.div.attrs<{$size?:string}>((props)=>({
  type:'text',
  $size: props.$size ||'30'
}))`
  height: ${({$size})=>`calc(100vh - ${$size}px)`};
`
type propsType = {};
export default function ReportPage(props: propsType): React.JSX.Element {
  const [layout, setLayout] =
    useState<GetProp<typeof Splitter, "layout">>("horizontal");
  useLayoutEffect(() => {
    if (document.body.offsetWidth <= 1200) {
      setLayout("vertical");
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [query, setQuery] = useState({});

 const memoizedCallback = useCallback( async(e={}) => {
  try {
    setLoading(true)
    await getReportVoucher(new URLSearchParams(e).toString()).then(setData)
  } catch (error) {
    console.error('memoizedCallback',error);
  } finally{
    setLoading(false)
  }}, [],
 );
 const memoizedCallback2 = useCallback( async(e={}) => {
  try {
    setLoading(true)
    await getReportVoucher(new URLSearchParams({...e,typeDateReport:'QUARTER'}).toString()).then(setData2)
  } catch (error) {
    console.error('memoizedCallback',error);
  } finally{
    setLoading(false)
  }}, [],
 );
  useEffect(() => {
    memoizedCallback()
    memoizedCallback2()
  }, []);
  return (
    <ConfigProviderAntdComponent>
      <style rel={'./index.css'}/>
      <Flex vertical className="bng">
        <Container >
          <Splitter layout={layout}>
            <Splitter.Panel min={layout === "horizontal" ? "30%" : "50%"}>
              <Splitter layout="vertical" style={{ height: "100%" }}>
                <Splitter.Panel min={"30%"}>
                  <Chart
                  loading={loading}
                    title="Biểu đồ số lượng đơn khám | Tái Khám"
                    data={data}
                    onChange={(e)=>{
                      // setQuery({
                      //   startDate:e?.[0],
                      //   endDate:e?.[1],
                      // })
                      memoizedCallback({
                        startDate:e?.[0],
                        endDate:e?.[1],
                      })
                      
                      // setQuery(e)
                    }}
                  />
                </Splitter.Panel>
                <Splitter.Panel min={"30%"}>
                  <Chart title="Biểu đồ số lượng đơn hàng Khách lẻ | Doanh nghiệp" data={data2} />
                </Splitter.Panel>
              </Splitter>
            </Splitter.Panel>
            {/* <Splitter.Panel min={"30%"} style={{ height: "100%" }}>
              <Chart title="Biểu đồ số lượng kết quả trả về" data={dataCountOrder} />
            </Splitter.Panel> */}
          </Splitter>
        </Container>
      </Flex>
    </ConfigProviderAntdComponent>
  );
}


const ConfigProviderAntdComponent = (props: PropsWithChildren) => {
  return (
    <ConfigProvider
      locale={{
        ...vi,
      }}
    >
      {props.children}
    </ConfigProvider>
  );
};
