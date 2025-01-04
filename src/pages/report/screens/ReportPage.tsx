import { ConfigProvider, Flex, GetProp, Splitter } from "antd";
import React, { PropsWithChildren, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Chart } from ".";
import vi from "antd/locale/vi_VN";
import dayjs from "dayjs";
import './index.css'
import styled from "styled-components";
import {
  getReportQuantityByDay,
  getReportQuantityByMonth,
  getReportQuantityByQuarter,
  getReportQuantityByYear,
  getReportQuantityByWeek,
  getReportVoucherByWeek,
  getReportVoucherByDay,
  getReportVoucherByMonth,
  getReportVoucherByQuarter,
  getReportVoucherByYear,
} from "../hook";
dayjs.locale("vi");
const Container = styled.div.attrs<{$size?:string}>((props)=>({
  type:'text',
  $size: props.$size ||'30'
}))`
  height: ${({$size})=>`calc(100vh - ${$size}px)`};
`
export default function ReportPage(): React.JSX.Element {
  const [layout, setLayout] = useState<GetProp<typeof Splitter, "layout">>("horizontal");
  useLayoutEffect(() => {
    if (document.body.offsetWidth <= 1200) {
      setLayout("vertical");
    }
  }, []);

  const [dataReportOrder, setDataReportOrder] = useState<any[][]>([[],[],[],[]]);
  const setDataReportOrderIndex = useCallback((idx:number)=> (e:any[])=>setDataReportOrder((old)=>{
    old[idx]=e
    return [...old]
  }),[])
  useEffect(() => {
    try {

       async function init(){
         const result = await Promise.allSettled([
            getReportQuantityByDay(),
            getReportQuantityByMonth(),
            getReportVoucherByDay(),
            getReportVoucherByQuarter()
          ])

          result.forEach((e,i)=>{
            if(e.status==='fulfilled'){
              setDataReportOrderIndex(i)(e.value)
            }
          })
      }
      
      init()
    } catch (error) {
      console.error(error);
    }

  }, [setDataReportOrderIndex]);
  return (
    <ConfigProviderAntdComponent>
      <style rel={"./index.css"} />
      <Flex vertical className="bng">
        <Container>
          <Splitter layout={layout}>
            <Splitter.Panel min={layout === "horizontal" ? "30%" : "50%"}>
              <Splitter layout="vertical" style={{ height: "100%" }}>
                <Splitter.Panel min={"30%"}>
                  <Chart
                    title="Số lượng lịch hẹn theo ngày"
                    data={dataReportOrder[0]}
                    onChange={(e) => {
                      getReportQuantityByDay({
                        startDate: e?.[0],
                        endDate: e?.[1],
                      }).then(setDataReportOrderIndex(0));
                    }}
                  />
                </Splitter.Panel>
                <Splitter.Panel min={"30%"}>
                  <Chart
                    title="Số lượng lịch hẹn theo Tháng"
                    data={dataReportOrder[1]}
                    onChange={(e) => {
                      getReportQuantityByMonth({
                        startDate: e?.[0],
                        endDate: e?.[1],
                      }).then(setDataReportOrderIndex(1));
                    }}
                  />
                </Splitter.Panel>
              </Splitter>
            </Splitter.Panel>
            <Splitter.Panel min={layout === "horizontal" ? "30%" : "50%"}>
              <Splitter layout="vertical" style={{ height: "100%" }}>
                <Splitter.Panel min={"30%"}>
                  <Chart
                    title="Báo cáo doanh số theo ngày"
                    data={dataReportOrder[2]}
                    onChange={(e) => {
                      getReportVoucherByDay({
                        startDate: e?.[0],
                        endDate: e?.[1],
                      }).then(setDataReportOrderIndex(2));
                    }}
                  />
                </Splitter.Panel>
                <Splitter.Panel min={"30%"}>
                  <Chart
                    title="Báo cáo doanh số theo quý"
                    data={dataReportOrder[3]}
                    onChange={(e) => {
                      getReportVoucherByQuarter({
                        startDate: e?.[0],
                        endDate: e?.[1],
                      }).then(setDataReportOrderIndex(3));
                    }}
                  />
                </Splitter.Panel>
              </Splitter>
            </Splitter.Panel>
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
