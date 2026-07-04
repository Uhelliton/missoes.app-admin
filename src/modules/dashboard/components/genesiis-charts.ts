import type { ApexOptions } from 'apexcharts'
import { getColor } from '~/infra/utils/helpers.ts'
import type {
  DashboardStatCard,
  FluxoFinanceiroMensal,
  GenesiisDashboardPayload,
} from '../types/dashboard.types'

export function buildGenesiisStatCards(payload: GenesiisDashboardPayload): DashboardStatCard[] {
  const { financeiro, membros, eventos } = payload
  const spark = (data: number[], name: string): ApexOptions => ({
    chart: {
      type: 'area',
      height: 50,
      sparkline: { enabled: true },
    },
    series: [{ name, data }],
    stroke: { width: 2, curve: 'smooth' },
    markers: { size: 0 },
    colors: [getColor('chart-primary')],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: {
        title: { formatter: () => name },
      },
      marker: { show: false },
    },
    fill: {
      opacity: [1],
      type: ['gradient'],
      gradient: {
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
  })

  return [
    {
      title: 'Membros cadastrados',
      value: membros.total,
      suffix: '',
      icon: 'users',
      change: 2.4,
      label: 'visão geral',
      decimalPlaces: 0,
      chartOptions: () =>
        spark(
          [120, 132, 140, 155, 160, 168, 175, 182, 190, Math.max(0, membros.total - 20), membros.total],
          'Membros',
        ),
    },
    {
      title: 'Graduados (escolaridade)',
      value: membros.graduados.count,
      suffix: '',
      icon: 'school',
      change: 0.8,
      label: 'pelo critério configurado',
      decimalPlaces: 0,
      chartOptions: () =>
        spark(
          [20, 22, 24, 26, 28, 30, 32, 34, 36, Math.max(0, membros.graduados.count - 2), membros.graduados.count],
          'Graduados',
        ),
    },
    {
      title: 'A pagar em aberto',
      value: financeiro.valorPagarAberto,
      prefix: 'R$ ',
      suffix: '',
      icon: 'arrow-down-right',
      change: financeiro.contasPagarAtrasadas > 0 ? -4.2 : 1.1,
      label:
        financeiro.contasPagarPendentes + financeiro.contasPagarAtrasadas > 0
          ? `${financeiro.contasPagarPendentes} pend. · ${financeiro.contasPagarAtrasadas} atras.`
          : 'sem títulos em aberto',
      decimalPlaces: 2,
      chartOptions: () => ({
        chart: { type: 'bar', height: 60, sparkline: { enabled: true } },
        plotOptions: { bar: { horizontal: false, columnWidth: '60%', borderRadius: 4 } },
        colors: [getColor('chart-primary')],
        series: [
          {
            name: 'Valor',
            data: [12, 14, 18, 22, 19, 24, 21, 26, 23, Math.min(financeiro.valorPagarAberto / 1000, 99), 10],
          },
        ],
        xaxis: { crosshairs: { width: 1 } },
        tooltip: {
          fixed: { enabled: false },
          x: { show: false },
          y: {
            formatter: (v: number) => 'R$ ' + v.toFixed(0),
            title: { formatter: () => 'A pagar' },
          },
          marker: { show: false },
        },
      }),
    },
    {
      title: 'A receber em aberto',
      value: financeiro.valorReceberAberto,
      prefix: 'R$ ',
      suffix: '',
      icon: 'arrow-up-right',
      change: financeiro.contasReceberAtrasadas > 0 ? -2.5 : 3.2,
      decimalPlaces: 2,
      label:
        financeiro.contasReceberPendentes + financeiro.contasReceberAtrasadas > 0
          ? `${financeiro.contasReceberPendentes} pend. · ${financeiro.contasReceberAtrasadas} atras.`
          : 'sem títulos em aberto',
      chartOptions: () => ({
        chart: { type: 'bar', height: 60, sparkline: { enabled: true } },
        plotOptions: { bar: { horizontal: false, columnWidth: '60%', borderRadius: 4 } },
        colors: [getColor('chart-secondary')],
        series: [
          {
            name: 'Valor',
            data: [8, 10, 12, 15, 14, 18, 16, 20, 18, Math.min(financeiro.valorReceberAberto / 100, 99), 12],
          },
        ],
        xaxis: { crosshairs: { width: 1 } },
        tooltip: {
          fixed: { enabled: false },
          x: { show: false },
          y: {
            formatter: (v: number) => 'R$ ' + v.toFixed(0),
            title: { formatter: () => 'A receber' },
          },
          marker: { show: false },
        },
      }),
    },
    {
      title: 'Eventos no mês',
      value: eventos.totalNoMes,
      suffix: '',
      icon: 'calendar-event',
      change: 5.0,
      label: 'confirmados',
      decimalPlaces: 0,
      chartOptions: () => ({
        series: [Math.min(100, eventos.totalNoMes * 15)],
        chart: { type: 'radialBar', height: 90, width: 90 },
        stroke: { lineCap: 'round' },
        plotOptions: {
          radialBar: {
            hollow: { size: '45%' },
            dataLabels: { show: false },
          },
        },
        grid: { padding: { top: -20, bottom: -20, left: -20, right: -20 } },
        labels: ['Mês'],
        colors: [getColor('chart-primary')],
      }),
    },
    {
      title: 'Próximos eventos',
      value: eventos.proximos.length,
      suffix: '',
      icon: 'calendar-time',
      change: 0,
      label: 'na agenda',
      decimalPlaces: 0,
      chartOptions: () => spark([1, 2, 2, 3, 3, 4, 4, 5, 5, eventos.proximos.length, eventos.proximos.length], 'Agenda'),
    },
  ]
}

export type GenesiisOverviewMini = {
  title: string
  value: number
  prefix?: string
  suffix?: string
  icon: string
  iconClassName: string
  change: number
}

export function buildGenesiisOverviewMini(payload: GenesiisDashboardPayload): GenesiisOverviewMini[] {
  const { financeiro, membros, eventos } = payload
  return [
    {
      title: 'Membros',
      value: membros.total,
      icon: 'users',
      iconClassName: 'text-success me-1',
      change: 2.1,
    },
    {
      title: 'Graduados',
      value: membros.graduados.count,
      icon: 'school',
      iconClassName: 'text-info me-1',
      change: 0.5,
    },
    {
      title: 'A pagar (aberto)',
      value: financeiro.valorPagarAberto,
      prefix: 'R$ ',
      icon: 'cash',
      iconClassName: 'text-danger me-1',
      change: financeiro.contasPagarAtrasadas > 0 ? -3.2 : 1.0,
    },
    {
      title: 'A receber (aberto)',
      value: financeiro.valorReceberAberto,
      prefix: 'R$ ',
      icon: 'currency-dollar',
      iconClassName: 'text-primary me-1',
      change: financeiro.contasReceberAtrasadas > 0 ? -2.0 : 4.5,
    },
    {
      title: 'Eventos (mês)',
      value: eventos.totalNoMes,
      icon: 'calendar-event',
      iconClassName: 'text-warning me-1',
      change: 6.0,
    },
    {
      title: 'Pendentes pagar',
      value: financeiro.contasPagarPendentes + financeiro.contasPagarAtrasadas,
      icon: 'file-invoice',
      iconClassName: 'text-secondary me-1',
      change: 0,
    },
  ]
}

export function genesiisFinancialFlowChartOptions(fluxo: FluxoFinanceiroMensal): ApexOptions {
  return {
    series: [
      { name: 'Pagamentos realizados', data: fluxo.pagarRealizado },
      { name: 'Recebimentos realizados', data: fluxo.receberRealizado },
    ],
    chart: {
      type: 'bar',
      height: 324,
      toolbar: { show: false },
      stacked: false,
    },
    stroke: { width: [0, 0], curve: 'smooth' },
    colors: [getColor('chart-delta'), getColor('chart-secondary')],
    grid: { strokeDashArray: 1 },
    xaxis: {
      categories: fluxo.meses,
      axisBorder: { show: false },
      labels: { offsetY: 1 },
    },
    yaxis: {
      labels: {
        formatter: (val: number) =>
          new Intl.NumberFormat('pt-BR', { notation: 'compact', compactDisplay: 'short' }).format(val),
        offsetX: -10,
      },
      axisBorder: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 4,
      },
    },
    legend: { show: true, position: 'top' },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    tooltip: {
      y: {
        formatter: (val: number) =>
          new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val),
      },
    },
  }
}

export function genesiisGenderDonutOptions(porGenero: { label: string; count: number }[]): ApexOptions {
  const series = porGenero.length ? porGenero.map((g) => g.count) : [1]
  const labels = porGenero.length ? porGenero.map((g) => g.label) : ['Sem dados']

  return {
    chart: { height: 243, type: 'donut' },
    legend: { show: false },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              label: 'Membros',
              formatter: () =>
                String(porGenero.reduce((s, g) => s + g.count, 0) || 0),
            },
          },
        },
      },
    },
    series,
    labels,
    colors: series.map(
      (_, i) =>
        [
          getColor('chart-primary'),
          getColor('chart-secondary'),
          getColor('chart-alpha'),
          getColor('chart-gamma'),
          getColor('chart-gray'),
          getColor('chart-delta'),
        ][i % 6],
    ),
    dataLabels: { enabled: false },
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 200 } },
      },
    ],
  }
}

export type GenesiisActivityItem = {
  title: string
  description: string
  author: string
  icon: string
  iconClassName: string
}

export const genesiisActivityData: GenesiisActivityItem[] = [
  {
    title: 'Contas a pagar atualizadas',
    description: 'Novos títulos e baixas foram sincronizados com o módulo financeiro.',
    author: 'Financeiro',
    icon: 'file-invoice',
    iconClassName: 'text-bg-primary',
  },
  {
    title: 'Recebimentos registrados',
    description: 'Mensalidades e doações foram conciliadas na visão de contas a receber.',
    author: 'Tesouraria',
    icon: 'currency-dollar',
    iconClassName: 'text-bg-success',
  },
  {
    title: 'Eventos na agenda',
    description: 'Cultos e reuniões confirmados aparecem no calendário institucional.',
    author: 'Secretaria',
    icon: 'calendar-event',
    iconClassName: 'text-bg-warning',
  },
  {
    title: 'Cadastro de membros',
    description: 'Novos membros e atualizações de perfil alimentam os indicadores de gênero e escolaridade.',
    author: 'Gestão de pessoas',
    icon: 'users',
    iconClassName: 'text-bg-info',
  },
  {
    title: 'Títulos em atraso',
    description: 'Alertas de vencimento ajudam a priorizar cobranças e pagamentos.',
    author: 'Financeiro',
    icon: 'alert-triangle',
    iconClassName: 'text-bg-danger',
  },
]
