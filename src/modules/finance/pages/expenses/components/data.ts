import express from '/images/cards/american-express.svg'
import mastercard from '/images/cards/mastercard.svg'
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
  label: string
  value: number
  prefix: string
}

export const expenseCardData: StatType[] = [
  {
    label: 'Total Expenses',
    value: 15240,
    icon: 'wallet',
    className: 'bg-primary-subtle text-primary',
    prefix: '$',
  },
  {
    label: 'Approved Expenses',
    value: 10780,
    icon: 'circle-check',
    className: 'bg-success-subtle text-success',
    prefix: '$',
  },
  {
    label: 'Pending Approval',
    value: 2940,
    icon: 'hourglass',
    className: 'bg-warning-subtle text-warning',
    prefix: '$',
  },
  {
    label: 'Reimbursed',
    value: 1520,
    icon: 'refresh',
    className: 'bg-info-subtle text-info',
    prefix: '$',
  },
]

export type ExpenseType = {
  id: string
  title: string
  category: string
  paymentMethod: {
    image: string
    number: string
  }
  amount: number
  status: 'approved' | 'pending' | 'rejected' | 'reimbursed'
  date: string
  time: string
  addedBy: {
    image: string
    name: string
  }
}

export const expensesData: ExpenseType[] = [
  {
    id: '#EXP-1023',
    title: 'Office Stationery',
    category: 'Office Supplies',
    paymentMethod: {
      image: mastercard,
      number: '**** 4421',
    },
    amount: 248.5,
    status: 'approved',
    date: '02 Oct, 2025',
    time: '09:45 AM',
    addedBy: {
      image: user5,
      name: 'John Miller',
    },
  },
  {
    id: '#EXP-1024',
    title: 'Flight to New York',
    category: 'Travel',
    paymentMethod: {
      image: visa,
      number: '**** 6783',
    },
    amount: 820.0,
    status: 'pending',
    date: '04 Oct, 2025',
    time: '02:10 PM',
    addedBy: {
      image: user7,
      name: 'Sarah Lee',
    },
  },
  {
    id: '#EXP-1025',
    title: 'Team Dinner',
    category: 'Meals',
    paymentMethod: {
      image: paypal,
      number: 'PayPal',
    },
    amount: 185.75,
    status: 'approved',
    date: '03 Oct, 2025',
    time: '08:00 PM',
    addedBy: {
      image: user6,
      name: 'David Wilson',
    },
  },
  {
    id: '#EXP-1026',
    title: 'Printer Repair & Service',
    category: 'Maintenance',
    paymentMethod: {
      image: express,
      number: '**** 9124',
    },
    amount: 96.2,
    status: 'rejected',
    date: '01 Oct, 2025',
    time: '03:40 PM',
    addedBy: {
      image: user9,
      name: 'Olivia Brown',
    },
  },
  {
    id: '#EXP-1027',
    title: 'Software Subscription',
    category: 'Utilities',
    paymentMethod: {
      image: mastercard,
      number: '**** 2217',
    },
    amount: 59.99,
    status: 'reimbursed',
    date: '30 Sep, 2025',
    time: '11:20 AM',
    addedBy: {
      image: user10,
      name: 'Ethan Brooks',
    },
  },
  {
    id: '#EXP-1028',
    title: 'Office Coffee Machine',
    category: 'Equipment',
    paymentMethod: {
      image: visa,
      number: '**** 3328',
    },
    amount: 342.6,
    status: 'pending',
    date: '28 Sep, 2025',
    time: '09:05 AM',
    addedBy: {
      image: user1,
      name: 'Liam Davis',
    },
  },
  {
    id: '#EXP-1029',
    title: 'Office Internet Bill',
    category: 'Utilities',
    paymentMethod: {
      image: visa,
      number: '**** 5454',
    },
    amount: 129.0,
    status: 'approved',
    date: '27 Sep, 2025',
    time: '01:25 PM',
    addedBy: {
      image: user3,
      name: 'Emily Clark',
    },
  },
  {
    id: '#EXP-1030',
    title: 'Client Entertainment',
    category: 'Entertainment',
    paymentMethod: {
      image: mastercard,
      number: '**** 9128',
    },
    amount: 298.4,
    status: 'pending',
    date: '25 Sep, 2025',
    time: '07:55 PM',
    addedBy: {
      image: user2,
      name: 'Daniel Ray',
    },
  },
  {
    id: '#EXP-1031',
    title: 'Conference Registration',
    category: 'Training & Events',
    paymentMethod: {
      image: express,
      number: '**** 7742',
    },
    amount: 560.0,
    status: 'approved',
    date: '24 Sep, 2025',
    time: '09:20 AM',
    addedBy: {
      image: user4,
      name: 'Emma Johnson',
    },
  },
  {
    id: '#EXP-1032',
    title: 'Office Furniture Purchase',
    category: 'Equipment',
    paymentMethod: {
      image: visa,
      number: '**** 2398',
    },
    amount: 1125.0,
    status: 'reimbursed',
    date: '22 Sep, 2025',
    time: '04:50 PM',
    addedBy: {
      image: user8,
      name: 'Lucas Martin',
    },
  },
  {
    id: '#EXP-1033',
    title: 'Taxi Fare - Client Visit',
    category: 'Travel',
    paymentMethod: {
      image: paypal,
      number: 'PayPal',
    },
    amount: 42.5,
    status: 'rejected',
    date: '20 Sep, 2025',
    time: '05:35 PM',
    addedBy: {
      image: user7,
      name: 'Sophia Turner',
    },
  },
]
