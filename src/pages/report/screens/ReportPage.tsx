import { ConfigProvider, Flex, GetProp, Segmented, Select, Splitter } from "antd";
import React, { PropsWithChildren, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Chart } from ".";
import vi from "antd/locale/vi_VN";
import dayjs from "dayjs";
import './index.css'
import styled from "styled-components";
import {
  getReportQuantityByCustom,
  getReportVoucherByCustom,
} from "../hook";
import { isNil, isNull, omitBy } from "lodash";
dayjs.locale("vi");
const Container = styled.div.attrs<{$size?:string}>((props)=>({
  type:'text',
  $size: props.$size ||'30'
}))`
  height: ${({$size})=>`calc(100vh - ${$size}px)`};
`
export default function ReportPage(): React.JSX.Element {
  const [layout, setLayout] =
    useState<GetProp<typeof Splitter, "layout">>("horizontal");

  const [stateQueryQuantity, setStateQueryQuantity] = useState({
    typeDateReport: "DAY",
    typeOrder:"TOTAL",
    typeCustomerOrder:"TOTAL",
  });

  const [stateQueryVoucher, setStateQueryVoucher] = useState({
    typeDateReport: "DAY",
    typeOrder:"TOTAL",
    typeCustomerOrder:"TOTAL",
  });

  useLayoutEffect(() => {
    if (document.body.offsetWidth <= 1200) {
      setLayout("vertical");
    }
  }, []);

  const [dataReportOrder, setDataReportOrder] = useState<any[][]>([ [], [], [], [], ]);
  const setDataReportOrderIndex = useCallback(
    (idx: number) => (e: any[]) =>
      setDataReportOrder((old) => {
        old[idx] = e;
        return [...old];
      }),
    []
  );
  useEffect(() => {
    try {
      async function init() {
        const result = await Promise.allSettled([
          getReportQuantityByCustom(),
          getReportVoucherByCustom(),
        ]);

        result.forEach((e, i) => {
          if (e.status === "fulfilled") {
            setDataReportOrderIndex(i)(e.value);
          }
        });
      }

      init();
    } catch (error) {
      console.error(error);
    }
  }, [setDataReportOrderIndex]);

  const OptionsQuantity = () => {
    return (
      <Select
        onSelect={async (value) => {
          let temp: any = {};
          setStateQueryQuantity((pre) => {
            temp = {
              ...pre,
              typeDateReport: value,
            };
            return temp;
          });

          getReportQuantityByCustom(temp).then(setDataReportOrderIndex(0));
        }}
        value={stateQueryQuantity.typeDateReport}
        defaultValue={"DAY"}
        variant="borderless"
        options={[
          {
            value: "DAY",
            label: <strong>Báo cáo số lượng ( Ngày )</strong>,
          },
          {
            value: "MONTH",
            label: <strong>Báo cáo số lượng ( Tháng )</strong>,
          },
          {
            value: "YEAR",
            label: <strong>Báo cáo số lượng ( Năm )</strong>,
          },
          {
            value: "QUARTER",
            label: <strong>Báo cáo số lượng ( Quý )</strong>,
          },
        ]}
      ></Select>
    );
  };
  const OptionsVoucher = () => {
    return (
      <Select
        onSelect={async (value) => {
          try {
            let temp: any = {};
              setStateQueryVoucher((pre) => {
                temp = {
                  ...pre,
                  typeDateReport: value,
                };
                return temp;
              });
            await getReportVoucherByCustom(temp).then(setDataReportOrderIndex(2) );
          } catch (error) {
            console.error(error);
          }
        }}
        value={stateQueryQuantity.typeDateReport}
        defaultValue={"MONTH"}
        variant="borderless"
        options={[
          {
            value: "DAY",
            label: <strong>Báo cáo doanh số ( Ngày )</strong>,
          },
          {
            value: "MONTH",
            label: <strong>Báo cáo doanh số ( Tháng )</strong>,
          },
          {
            value: "YEAR",
            label: <strong>Báo cáo doanh số ( Năm )</strong>,
          },
          {
            value: "QUARTER",
            label: <strong>Báo cáo doanh số ( Quý )</strong>,
          },
        ]}
      ></Select>
    );
  };

  const ExtendsTitleQuantity = () => {
    return (
      <>
        <Flex
          align="center"
          gap={6}
          vertical
          style={{
            paddingInline: 3,
            borderLeft: "0.2px solid rgb(170, 170, 170)",
          }}
        >
          <strong style={{ whiteSpace: "none", wordBreak: "unset" }}>
            Lọc theo loại lịch hẹn
          </strong>
          <Segmented
            defaultValue="TOTAL"
            value={stateQueryQuantity.typeOrder}
            onChange={async (value) => {
              try {
                let temp: any = {};
                setStateQueryQuantity((pre) => {
                  temp = {
                    ...pre,
                    typeCustomerOrder:'TOTAL',
                    typeOrder: value,
                  };
                  return temp;
                });
                await getReportQuantityByCustom(temp).then(
                  setDataReportOrderIndex(0)
                );
              } catch (error) {
                console.error(error);
              }
            }}
            options={[
              {
                value: "TOTAL",
                label: "Tổng",
              },
              {
                value: "BOTH",
                label: "Tất cả",
              },
              {
                value: "NEW",
                label: "Lịch hẹn mới",
              },
              {
                value: "REMAING",
                label: "Tái Khám",
              },
            ]}
          />
        </Flex>
        <Flex
          vertical
          align="center"
          gap={6}
          style={{
            paddingInline: 3,
            borderLeft: "0.2px solid rgb(170, 170, 170)",
          }}
        >
          <strong style={{ whiteSpace: "none", wordBreak: "unset" }}>
            Lọc theo loại khách hàng
          </strong>
          <Segmented
            defaultValue="TOTAL"
            value={stateQueryQuantity.typeCustomerOrder}
            onChange={async (value) => {
              try {
                let temp: any = {};
                setStateQueryQuantity((pre) => {
                  temp = {
                    ...pre,
                    typeOrder:'TOTAL',
                    typeCustomerOrder: value,
                  };
                  return temp;
                });
                await getReportQuantityByCustom(temp).then(
                  setDataReportOrderIndex(0)
                );
              } catch (error) {
                console.error(error);
              }
            }}
            options={[
              {
                value: "TOTAL",
                label: "Tổng",
              },
              {
                value: "BOTH",
                label: "Tất cả",
              },
              {
                value: "PERSONAL",
                label: "Khách hàng lẻ",
              },
              {
                value: "GROUP",
                label: "Doanh nghiệp",
              },
            ]}
          />
        </Flex>
      </>
    );
  };
  const ExtendsTitleVoucher = () => {
    return <></>
    return (
      <>
        <Flex
          align="center"
          gap={6}
          vertical
          style={{
            paddingInline: 3,
            borderLeft: "0.2px solid rgb(170, 170, 170)",
          }}
        >
          <strong style={{ whiteSpace: "none", wordBreak: "unset" }}>
            Lọc theo loại lịch hẹn
          </strong>
          <Segmented
            defaultValue="TOTAL"
            value={stateQueryVoucher.typeOrder}
            onChange={async (value) => {
              try {
                let temp: any = {};
                setStateQueryVoucher((pre) => {
                  temp = {
                    ...pre,
                    typeCustomerOrder:'TOTAL',
                    typeOrder: value,
                  };
                  return temp;
                });
                await getReportVoucherByCustom(temp).then(
                  setDataReportOrderIndex(0)
                );
              } catch (error) {
                console.error(error);
              }
            }}
            options={[
              {
                value: "TOTAL",
                label: "Tổng",
              },
              {
                value: "BOTH",
                label: "Tất cả",
              },
              {
                value: "NEW",
                label: "Lịch hẹn mới",
              },
              {
                value: "REMAING",
                label: "Tái Khám",
              },
            ]}
          />
        </Flex>
        <Flex
          vertical
          align="center"
          gap={6}
          style={{
            paddingInline: 3,
            borderLeft: "0.2px solid rgb(170, 170, 170)",
          }}
        >
          <strong style={{ whiteSpace: "none", wordBreak: "unset" }}>
            Lọc theo loại khách hàng
          </strong>
          <Segmented
            defaultValue="TOTAL"
            value={stateQueryVoucher.typeCustomerOrder}
            onChange={async (value) => {
              try {
                let temp: any = {};
                setStateQueryVoucher((pre) => {
                  temp = {
                    ...pre,
                    typeOrder:'TOTAL',
                    typeCustomerOrder: value,
                  };
                  return temp;
                });
                await getReportVoucherByCustom(temp).then(
                  setDataReportOrderIndex(0)
                );
              } catch (error) {
                console.error(error);
              }
            }}
            options={[
              {
                value: "TOTAL",
                label: "Tổng",
              },
              {
                value: "BOTH",
                label: "Tất cả",
              },
              {
                value: "PERSONAL",
                label: "Khách hàng lẻ",
              },
              {
                value: "GROUP",
                label: "Doanh nghiệp",
              },
            ]}
          />
        </Flex>
      </>
    );
  };

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
                    ExtendsTitle={<ExtendsTitleQuantity />}
                    title={<OptionsQuantity />}
                    data={dataReportOrder[0]}
                    onChange={(e) => {
                      let temp: any = {};

                      setStateQueryQuantity((pre) => {
                        
                        temp = omitBy({
                          ...pre,
                          startDate: e?.[0],
                          endDate: e?.[1],
                        } ,isNil);
                        
                        return temp;
                      });
                      getReportQuantityByCustom(temp).then(
                        setDataReportOrderIndex(0)
                      );
                    }}
                  />
                </Splitter.Panel>
                {/* <Splitter.Panel min={"30%"}>
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
                </Splitter.Panel> */}
              </Splitter>
            </Splitter.Panel>
            <Splitter.Panel min={layout === "horizontal" ? "30%" : "50%"}>
              <Splitter layout="vertical" style={{ height: "100%" }}>
                <Splitter.Panel min={"30%"}>
                  <Chart
                    title={<OptionsVoucher />}
                    ExtendsTitle={
                      <ExtendsTitleVoucher/>
                    }
                    data={dataReportOrder[1]}
                    onChange={(e) => {
                      let temp: any = {};
                      setStateQueryVoucher((pre) => {
                        temp = omitBy({
                          ...pre,
                          startDate: e?.[0],
                          endDate: e?.[1],
                        },isNil);
                        return temp;
                      });
                      getReportVoucherByCustom(temp).then(
                        setDataReportOrderIndex(2)
                      );
                    }}
                  />
                </Splitter.Panel>
                {/* <Splitter.Panel min={"30%"}>
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
                </Splitter.Panel> */}
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
