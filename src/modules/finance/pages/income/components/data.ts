import express from '/images/cards/american-express.svg'
import mastercard from '/images/cards/mastercard.svg'
import note from '/images/cards/note.svg'
import paypal from '/images/cards/paypal.svg'
import visa from '/images/cards/visa.svg'

import user1 from '/images/users/user-1.jpg'
import user10 from '/images/users/user-10.jpg'
import user2 from '/images/users/user-2.jpg'
import user3 from '/images/users/user-3.jpg'
import user4 from '/images/users/user-4.jpg'
import user5 from '/images/users/user-5.jpg'
import user6 from '/images/users/user-6.jpg'
import user7 from '/images/users/user-7.jpg'
import user8 from '/images/users/user-8.jpg'
import user9 from '/images/users/user-9.jpg'

export type StatType = {
  icon: string
  className: string
  title: string
  value: number
  prefix: string
}

export const incomeStatData: StatType[] = [
  {
    icon: 'currency-dollar',
    className: 'bg-primary-subtle text-primary',
    value: 45280,
    title: 'Receita total',
    prefix: 'R$',
  },
  {
    icon: 'wallet',
    className: 'bg-success-subtle text-success',
    value: 38560,
    title: 'Receita recebida',
    prefix: 'R$',
  },
  {
    icon: 'hourglass',
    className: 'bg-warning-subtle text-warning',
    value: 4860,
    title: 'Pagamentos pendentes',
    prefix: 'R$',
  },
  {
    icon: 'credit-card-refund',
    className: 'bg-danger-subtle text-danger',
    value: 1120,
    title: 'Receita reembolsada',
    prefix: 'R$',
  },
]

export type IncomeType = {
  id: string
  title: string
  category: string
  image: string
  paymentMethod: string
  amount: number
  status: 'received' | 'pending' | 'refunded' | 'failed'
  date: string
  time: string
  receivedBy: {
    image: string
    name: string
  }
}

export const incomeData: IncomeType[] = [
  {
    id: '#INC-1001',
    title: 'Pagamento de desenvolvimento do site',
    category: 'Services',
    image: visa,
    paymentMethod: '**** 3294',
    amount: 1250.0,
    status: 'received',
    date: '03 Oct, 2025',
    time: '11:00 AM',
    receivedBy: {
      image: user3,
      name: 'Emily Clark',
    },
  },
  {
    id: '#INC-1002',
    title: 'Honorários de consultoria (T3)',
    category: 'Consulting',
    image: mastercard,
    paymentMethod: '**** 8712',
    amount: 780.0,
    status: 'pending',
    date: '01 Oct, 2025',
    time: '04:20 PM',
    receivedBy: {
      image: user7,
      name: 'Daniel Ray',
    },
  },
  {
    id: '#INC-1003',
    title: 'Receita de vendas do e-commerce',
    category: 'Sales',
    image: mastercard,
    paymentMethod: '**** 4511',
    amount: 2430.0,
    status: 'received',
    date: '04 Oct, 2025',
    time: '02:35 PM',
    receivedBy: {
      image: user6,
      name: 'Emma Johnson',
    },
  },
  {
    id: '	#INC-1004',
    title: 'Repasse de afiliados — setembro',
    category: 'Affiliate',
    image: paypal,
    paymentMethod: 'PayPal',
    amount: 645.25,
    status: 'received',
    date: '02 Oct, 2025',
    time: '09:30 AM',
    receivedBy: {
      image: user6,
      name: 'David Wilson',
    },
  },
  {
    id: '#INC-1005',
    title: 'Renovação de licença de software',
    category: 'Services',
    image: visa,
    paymentMethod: '**** 9987',
    amount: 1120.0,
    status: 'pending',
    date: '29 Sep, 2025',
    time: '01:15 PM',
    receivedBy: {
      image: user8,
      name: 'Lucas Martin',
    },
  },
  {
    id: '#INC-1006',
    title: 'Dividendos de investimentos (T3)',
    category: 'Investments',
    image: note,
    paymentMethod: 'Bank Transfer',
    amount: 3950.5,
    status: 'received',
    date: '27 Sep, 2025',
    time: '10:00 AM',
    receivedBy: {
      image: user9,
      name: 'Olivia Brown',
    },
  },
  {
    id: '	#INC-1007',
    title: 'Receita de publicidade (Google Ads)',
    category: 'Affiliate',
    image: paypal,
    paymentMethod: 'PayPal',
    amount: 870.75,
    status: 'received',
    date: '25 Sep, 2025',
    time: '08:10 PM',
    receivedBy: {
      image: user10,
      name: 'Ethan Brooks',
    },
  },
  {
    id: '	#INC-1008',
    title: 'Mensalidade/retainer — cliente A',
    category: 'Consulting',
    image: mastercard,
    paymentMethod: '**** 4732',
    amount: 2200.0,
    status: 'received',
    date: '22 Sep, 2025',
    time: '12:30 PM',
    receivedBy: {
      image: user7,
      name: 'Liam Davis',
    },
  },
  {
    id: '#INC-1009',
    title: 'Renovação de serviço — plano de hospedagem',
    category: 'Services',
    image: visa,
    paymentMethod: '**** 2318',
    amount: 399.0,
    status: 'pending',
    date: '20 Sep, 2025',
    time: '04:05 PM',
    receivedBy: {
      image: user1,
      name: 'Sophia Turner',
    },
  },
  {
    id: '	#INC-1010',
    title: 'Reembolso — assinatura cancelada',
    category: 'Other',
    image: express,
    paymentMethod: '**** 9812',
    amount: 125.0,
    status: 'refunded',
    date: '18 Sep, 2025',
    time: '05:45 PM',
    receivedBy: {
      image: user2,
      name: 'Noah Walker',
    },
  },
  {
    id: '#INC-1011',
    title: 'Pagamento por conclusão de projeto — cliente B',
    category: 'Services',
    image: note,
    paymentMethod: 'Bank Transfer',
    amount: 3580.0,
    status: 'received',
    date: '15 Sep, 2025',
    time: '03:20 PM',
    receivedBy: {
      image: user4,
      name: 'Grace Miller',
    },
  },
  {
    id: '#INC-1012',
    title: 'Receita de royalties — outubro',
    category: 'Other',
    image: mastercard,
    paymentMethod: '**** 5454',
    amount: 940.0,
    status: 'received',
    date: '12 Sep, 2025',
    time: '11:55 AM',
    receivedBy: {
      image: user5,
      name: 'Chloe Adams',
    },
  },
]
