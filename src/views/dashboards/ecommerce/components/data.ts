import { currency } from "@/infra/helpers/constants";
import type { ApexChartType } from "@/types";
import type {
  OrderType,
  ProductType,
  SellingType,
  StatType,
} from "@/views/dashboards/ecommerce/components/types";

import usFlag from "@/assets/images/flags/us_flag.jpg";
import spainFlag from "@/assets/images/flags/spain_flag.jpg";
import frenchFlag from "@/assets/images/flags/french_flag.jpg";
import germanyFlag from "@/assets/images/flags/germany_flag.jpg";
import bahaFlag from "@/assets/images/flags/baha_flag.jpg";

import avatar1 from "@/assets/images/users/avatar-1.jpg";
import avatar2 from "@/assets/images/users/avatar-2.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar4 from "@/assets/images/users/avatar-4.jpg";
import avatar5 from "@/assets/images/users/avatar-5.jpg";

import products01 from "@/assets/images/products/01.png";
import products02 from "@/assets/images/products/02.png";
import products04 from "@/assets/images/products/04.png";
import products06 from "@/assets/images/products/06.png";
import products05 from "@/assets/images/products/05.png";

export const monthlyIncomeChart: ApexChartType = {
  height: 270,
  type: "bar",
  series: [
    {
      name: "Pessoas Evangelizadas",
      data: [98, 102, 78, 116, 77, 115, 99, 81, 97, 60, 68, 55],
    },
  ],
  options: {
    chart: {
      height: 270,
      type: "bar",

      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 5,
        // bottom: 5,
        // right: 0,
        blur: 5,
        color: "#45404a2e",
        opacity: 0.35,
      },
    },
    colors: [
      "#95a0c5",
      "#95a0c5",
      "#95a0c5",
      "#22c55e",
      "#95a0c5",
      "#95a0c5",
      "#95a0c5",
      "#95a0c5",
      "#95a0c5",
      "#95a0c5",
      "#95a0c5",
      "#95a0c5",
    ],
    plotOptions: {
      bar: {
        borderRadius: 6,
        dataLabels: {
          position: "top", // top, center, bottom
        },
        columnWidth: "20",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      // formatter: function (val) {
      //   return val + "%";
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#8997bd"],
      },
    },
    xaxis: {
      categories: [
        "01/07",
        "02/07",
        "03/07",
        "04/07",
        "05/07",
        "06/07",
        "07/07",
        "08/07",
        "09/07",
        "10/07",
        "11/07",
        "12/07",
      ],
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        // formatter: function (val) {
        //   return "$" + val + "k";
        // },
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      strokeDashArray: 2.5,
    },
    legend: {
      show: false,
    },
  },
};

export const customersChart: ApexChartType = {
  height: 280,
  type: "donut",
  series: [50, 25, 25],
  options: {
    chart: {
      height: 280,
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      // verticalAlign: 'middle',
      floating: false,
      fontSize: "13px",
      fontFamily: "Be Vietnam Pro, sans-serif",
      offsetX: 0,
      offsetY: 0,
    },
    labels: ["Currenet", "New", "Retargeted"],
    colors: ["#22c55e", "#08b0e7", "#ffc728"],

    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            donut: {
              customScale: 0.2,
            },
          },
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " %";
        },
      },
    },
  },
};

export const categoriesChart: ApexChartType = {
  height: 275,
  type: "bar",
  series: [
    {
      name: "Pessoas Evangelizadas",
      data: [1380, 1100, 990, 880, 740, 548, 430, 400],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 275,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: true,
        distributed: true,
        barHeight: "85%",
        isFunnel: true,
        isFunnel3d: false,
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      dropShadow: {
        enabled: false,
      },
      style: {
        colors: ["#22c55e"],
        fontWeight: 400,
        fontSize: "13px",
      },
    },
    xaxis: {
      categories: [
        "Equipe Azul",
        "Equipe Verde",
        "Equipe Vermelha",
        "Equipe Amarela",
        "Equipe Roxa",
        "Equipe Lilaz",
        "Equipe Cinza",
        "Equipe Laranja",
      ],
    },
    colors: [
      "rgb(39, 159, 253)",
      "rgb(33, 233, 169)",
      "red",
      "yellow",
      "purple",
      "rgb(142, 117, 211)",
      "grey",
      "rgb(253, 189, 57)",
    ],
    legend: {
      show: false,
    },
  },
};

export const statWidgetsChart: ApexChartType = {
  height: 35,
  type: "line",
  series: [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
    },
  ],
  options: {
    chart: {
      type: "line",
      width: 120,
      height: 35,
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 4,
        left: 0,
        // bottom: 0,
        // right: 0,
        blur: 2,
        color: "rgba(132, 145, 183, 0.3)",
        opacity: 0.35,
      },
    },
    colors: ["#95a0c5"],
    stroke: {
      show: true,
      curve: "smooth",
      width: [3],
      lineCap: "round",
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  },
};

export const statData: StatType[] = [
  {
    title: "Total Revenue",
    icon: "icofont-money-bag",
    stat: `${currency}8365.00`,
    change: 8.5,
    subTitle: "New Sessions Today",
    buttonVariant: "primary",
  },
  {
    title: "New Order",
    icon: "icofont-opencart",
    stat: "722",
    change: 8.5,
    subTitle: "New Sessions Today",
    buttonVariant: "outline-secondary",
  },
];

export const monthlyIncomeData: StatType[] = [
  {
    title: "Today's Revenue",
    stat: `${currency}24,500`,
  },
  {
    title: "Conversion Rate",
    stat: `82.8%`,
  },
  {
    title: "Total Expenses",
    stat: `${currency}9982.00`,
  },
  {
    title: "Avg. Value",
    stat: `${currency}80.5`,
  },
];

export const topSelling: SellingType[] = [
  {
    name: "Baianão",
    flag: usFlag,
    progress: 66,
    sales: 380,
  },
  {
    name: "Parque Ecológico",
    flag: spainFlag,
    progress: 60,
    sales: 337,
  },
  {
    name: "Fontana",
    flag: frenchFlag,
    progress: 45,
    sales: 280,
  },
  {
    name: "Areial",
    flag: germanyFlag,
    progress: 38,
    sales: 266,
  },
  {
    name: "Paraguiai",
    flag: bahaFlag,
    progress: 29,
    sales: 78,
  },
];

export const orderList: OrderType[] = [
  {
    name: "Vilson Souza",
    avatar: avatar1,
    id: "Equipe Azul",
    amount: 185,
  },
  {
    name: "Weliton Diniz",
    avatar: avatar2,
    id: "Equipe Amarela",
    amount: 177,
  },
  {
    name: "Felipe Santos",
    avatar: avatar3,
    id: "Equipe Laranja",
    amount: 133,
  },
  {
    name: "Jacir Borges",
    avatar: avatar4,
    id: "Equipe Verde",
    amount: 112,
  },
  {
    name: "Renato Santos",
    avatar: avatar5,
    id: "Equipe Azul",
    amount: 105,
  },
];

export const productList: ProductType[] = [
  {
    name: "History Book",
    image: products01,
    id: "A3652",
    price: 50,
    originalPrice: 70,
    stockQuantity: 450,
    soldQuantity: 550,
    status: "in-stock",
  },
  {
    name: "Colorful Pots",
    image: products02,
    id: "A5002",
    price: 99,
    originalPrice: 150,
    stockQuantity: 750,
    soldQuantity: 0,
    status: "out-of-stock",
  },
  {
    name: "Pearl Bracelet",
    image: products04,
    id: "A6598",
    price: 199,
    originalPrice: 250,
    stockQuantity: 280,
    soldQuantity: 220,
    status: "in-stock",
  },
  {
    name: "Dancing Man",
    image: products06,
    id: "A9547",
    price: 40,
    originalPrice: 49,
    stockQuantity: 500,
    soldQuantity: 1000,
    status: "out-of-stock",
  },
  {
    name: "Fire Lamp",
    image: products05,
    id: "A2047",
    price: 80,
    originalPrice: 59,
    stockQuantity: 800,
    soldQuantity: 2000,
    status: "out-of-stock",
  },
];
