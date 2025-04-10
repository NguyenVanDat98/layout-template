import { ResponsiveBar } from "@nivo/bar";
import {
  Button,
  DatePicker,
  Flex,
  Popover,
  Segmented,
  Select,
  Spin,
  Switch,
  Tag
} from "antd";
import { get, omit, truncate, uniq } from "lodash";

import { FilterOutlined, SettingOutlined } from "@ant-design/icons";
import React, { memo, PropsWithChildren, useState } from "react";
import { OPTION_SELECT, TYPE_PICKER } from ".";

type propsType = {
  data: any[];
  title?: string | React.ReactNode ;
  ExtendsTitle?: string | React.ReactNode ;
  loading?: boolean;
  onChange?: (p?:(string | undefined)[])=>void;
};


export type TYPE_PICKER_ = typeof TYPE_PICKER;
export default function Chart({ data, title,loading, onChange,ExtendsTitle}: propsType): React.JSX.Element {
  const [value, setSwitch] = useState<"grouped" | "stacked">("grouped");
  const [isTotal, setTotal] = useState<boolean>(false);
  const [picker, setPicker] = useState<
    ["picker" | "ranger", keyof TYPE_PICKER_]
  >(["picker", "month"]);
  return (
    <Flex
      vertical
      style={{
        height: "100%",
        overflowY: "hidden",
        paddingLeft: 10,
        paddingTop: 10,
      }}
    >
      <Flex align="center" gap={10} style={{ height:52, minHeight:62,overflowX:'auto' }} wrap={false} >
        <Popover
          trigger={["click"]}
          placement="bottomLeft"
          content={
            <Flex style={{ width: 300 }} vertical gap={10}>
              <Flex align="center" >
                <Strong>Type display:</Strong>
                <Segmented
                  size="small"
                  onChange={(v: "grouped" | "stacked") => {
                    setSwitch(v);
                  }}
                  defaultValue="grouped"
                  options={[
                    { value: "grouped", label: "Nhóm" },
                    { value: "stacked", label: "Cột" },
                  ]}
                />
              </Flex>
              <Flex align="center">
                <Strong>Hiện tổng số:</Strong>
                <Switch value={isTotal} onChange={setTotal} />
              </Flex>
            </Flex>
          }
        >
          <Button size="small" type="primary" icon={<SettingOutlined/>}> Hiển thị </Button>
        </Popover>
        <RenderFilter onChange={onChange ??function(e){}} setPicker={setPicker} picker={picker} />
          {ExtendsTitle}
      </Flex>

      <div
        style={{
          height: "calc(100% - 80px)",
          width: "calc(100% - 10px)",
          border: "0.5px solid #333",
          borderRadius: 8,
          margin: "10px 0",
          boxShadow: "0px 5px 0 #f8f8f8",
          boxSizing: "content-box",
        }}
      >
        <Flex align="center" gap={10} justify="center" style={{ height: 30 }}>
          {title}
          {loading&& <Spin></Spin> }
        </Flex>
        <ResponsiveBar
        
          data={data}
          keys={uniq(data.map((e) => Object.keys(omit(e, "_id"))).flat())}
          indexBy="_id"
          margin={{ top: 30, right: 70, bottom: 60, left: 90 }}
          padding={0.32}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: false }}
          colors={{ scheme: "nivo" }}
          groupMode={value}
          enableGridX
          enableTotals={isTotal}
          isInteractive
          label={(key) => {
            return Number(key.value).toLocaleString("vi");
          }}
          tooltip={(e) => {
            return (
              <Tag>
                {
                  {
                    grouped: e.id,
                    stacked: e.id,
                  }[value]
                }
                {": "}
                {new Intl.NumberFormat("vi").format(e.value)}
              </Tag>
            );
          }}
          axisLeft={{
            tickSize: 1,
            tickPadding: 1,
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: 0,
            truncateTickAt: 0,
            format: (e) => new Intl.NumberFormat("vi").format(e / 1000) + " K",
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            // tickRotation: -25,
            legend: `Biểu đồ thống kê`,
            legendPosition: "middle",
            legendOffset: 70,
            
            // truncateTickAt: 10,
            format: (value) =>
              truncate(value, {
                length: 10,
              }),
          }}
          legends={[
            {
              translateX: 50,
              dataFrom: "keys",
              anchor: "right",
              direction: "column",
              itemHeight: 40,
              itemWidth: 40,
              symbolShape: "circle",
              itemDirection: "top-to-bottom",
            },
          ]}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          animate={false}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      </div>
    </Flex>
  );
}

const RenderFilter = memo(({
  setPicker,
  picker,
  onChange
}: {
  setPicker: (p?: any) => void;
  picker: ["picker" | "ranger", keyof TYPE_PICKER_];
  onChange?: (p?: (string | undefined)[]) => void
}) => {
  const [open, setOption] = useState(true);
  return (
      <Flex className="transition" gap={6} align="center">
        <Button
          onClick={() => setOption((e) => !e)}
          size="small"
          type="primary"
          icon={<FilterOutlined />}
        >Lọc</Button>
        <Flex gap={2} vertical style={{ width:open?'unset': 0,height:open?'unset': 0, overflowX:'hidden'}}>
          <Select
            popupMatchSelectWidth={false}
            onSelect={(value) => {
              setPicker(value.split(" ") as typeof picker);
            }}
            style={{
              width: 140,
            }}
            size="small"
            defaultValue={"picker month"}
            options={OPTION_SELECT}
          />
          <RenderPicker onChange={onChange??function(e){}} picker={picker} />
        </Flex>
      </Flex>
  );
});

const convert = {
  date: "date",
  month: "month",
  quarter: "M",
  week: "week",
  year: "year",
} as const;
const RenderPicker = memo(({
  picker,
  onChange,
}: {
  picker: ["picker" | "ranger", keyof TYPE_PICKER_];
  onChange: (p: (string | undefined)[]) => void;
}) => {
  if (picker[0] === "picker") {
    return (
      <DatePicker
        style={{
          textAlign: "center",
        }}
        onChange={(date) => {
          const endValue = [
            date?.startOf(convert[picker[1]])?.format("YYYY-MM-DD"),
            (picker[1] === "quarter" ? date?.add(2, "month") : date)
              ?.endOf(convert[picker[1]])
              ?.format("YYYY-MM-DD"),
          ];
          onChange(endValue);
        }}
        size="small"
        picker={TYPE_PICKER[picker[1]]}
      />
    );
  }
  return (
    <DatePicker.RangePicker
      style={{
        textAlign: "center",
      }}
      allowClear
      onChange={(date) => {
        const endValue = [
          date?.[0]?.startOf(convert[picker[1]])?.format("YYYY-MM-DD"),
          (picker[1] === "quarter" ? date?.[1]?.add(2, "month") : date?.[1])
            ?.endOf(convert[picker[1]])
            ?.format("YYYY-MM-DD"),
        ];
        onChange(endValue);
      }}
      size="small"
      picker={TYPE_PICKER[picker[1]]}
    />
  );
});
function Strong(p: PropsWithChildren) {
  return (
    <div style={{ width:'50%' }}>
      <strong style={{whiteSpace:'none'}}>{p.children}</strong>
    </div>
  );
}
