import type {ApexChartType} from "@/types";

export type IChatSeries = {
  name: string;
  data: number[]
}

export const useChart = () => {
  const buildConfigChatArea = (series: IChatSeries[], labels: string[] ): ApexChartType => {
    return   {
      height: 280,
      type: "area",
      series: series,
      options: {
        chart: {
          height: 280,
          type: "area",
          toolbar: {
            show: false,
          },
          dropShadow: {
            enabled: true,
            top: 12,
            left: 0,
            // bottom: 0,
            // right: 0,
            blur: 2,
            color: "rgba(132, 145, 183, 0.3)",
            opacity: 0.35,
          },
        },
        annotations: {
          xaxis: [
            {
              x: 312,
              strokeDashArray: 4,
              borderWidth: 1,
              borderColor: "var(--bs-secondary)",
            },
          ],
          points: [
            {
              x: 312,
              y: 52,
              marker: {
                size: 6,
                fillColor: "var(--bs-primary)",
                strokeColor: "var(--bs-card-bg)",
                strokeWidth: 4,
              },
              label: {
                borderWidth: 1,
                offsetY: -110,
                text: "meta: s",
                style: {
                  background: "var(--bs-primary)",
                  fontSize: "14px",
                  fontWeight: "600",
                },
              },
            },
          ],
        },
        colors: ["#22c55e", "rgba(106, 155, 155, 0.3)"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: "smooth",
          width: [3, 3],
          dashArray: [0, 0],
          lineCap: "round",
        },
        labels: labels,

        yaxis: {
          labels: {
            offsetX: -12,
            offsetY: 0,
          },
        },
        grid: {
          strokeDashArray: 3,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        legend: {
          show: false,
        },

        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shadeIntensity: 1,
            inverseColors: !1,
            opacityFrom: 0.05,
            opacityTo: 0.05,
            stops: [45, 100],
          },
        },
      },
    };
  }

  return {
    buildConfigChatArea
  }
}
