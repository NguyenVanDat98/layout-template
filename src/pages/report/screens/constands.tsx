import { GetProp, Select } from "antd";

export const OPTION_SELECT :GetProp<typeof Select,'options'> =[
    {
      label: "Khoảng Ngày",
      value: "ranger date",
    },
    {
      label: "Theo Tháng",
      options: [
        {
          label: "Tháng",
          value: "picker month",
        },
        {
          label: "Khoảng Tháng",
          value: "ranger month",
        },
      ],
    },
    {
      label: "Theo Quý",
      options: [
        {
          label: "Quý",
          value: "picker quarter",
        },
        {
          label: "Khoảng Quý",
          value: "ranger quarter",
        },
      ],
    },
    {
      label: "Theo Năm",
      options: [
        {
          label: "Năm",
          value: "picker year",
        },
        {
          label: "Khoảng Năm",
          value: "ranger year",
        },
      ],
    },
    
  ]

  export const TYPE_PICKER = {
    date: "date",
    month: "month",
    quarter: "quarter",
    week: "week",
    year: "year",
  } as const;
  export const TRANSLATE_TYPE_PIKER = {
    date: "date",
    month: "month",
    quarter: "quarter",
    week: "week",
    year: "year",
  } as const;