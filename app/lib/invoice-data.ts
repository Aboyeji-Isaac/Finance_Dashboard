export interface Invoice {
  id: string
  name: string
  invoiceNumber: string
  date: string
  time: string
  ordersType: string
  amount: string
  status: "Pending" | "Paid" | "Unpaid"
  avatar?: string
}

export const invoiceData: Invoice[] = [
  {
    id: "1",
    name: "Gadget Gallery LTD",
    invoiceNumber: "Inv: MGL524874",
    date: "14 Apr 2022",
    time: "at 8:00 PM",
    ordersType: "20",
    amount: "$420.84",
    status: "Pending",
  },
  {
    id: "2",
    name: "Figma Subscription",
    invoiceNumber: "Inv: MGL524250",
    date: "12 Apr 2022",
    time: "at 8:00 PM",
    ordersType: "01",
    amount: "$244.80",
    status: "Paid",
  },
  {
    id: "3",
    name: "Jack Dawson Eric",
    invoiceNumber: "Inv: MGL524874",
    date: "12 Apr 2022",
    time: "at 9:00 AM",
    ordersType: "02",
    amount: "$200.00",
    status: "Unpaid",
  },
  {
    id: "4",
    name: "UIHUT Subscription",
    invoiceNumber: "Inv: MGL524140",
    date: "24 Mar 2022",
    time: "at 8:00 PM",
    ordersType: "01",
    amount: "$84.00",
    status: "Paid",
  },
  {
    id: "5",
    name: "Citi Bank Ltd.",
    invoiceNumber: "Inv: MGL524245",
    date: "10 Mar 2022",
    time: "at 8:00 PM",
    ordersType: "Withdraw",
    amount: "$420.84",
    status: "Pending",
  },
  {
    id: "6",
    name: "Bitcoin Transaction",
    invoiceNumber: "Inv: MGL524254",
    date: "08 Mar 2022",
    time: "at 8:00 PM",
    ordersType: "Technology",
    amount: "$400.11",
    status: "Pending",
  },
  {
    id: "7",
    name: "Netflix Subscription",
    invoiceNumber: "Inv: MGL524487",
    date: "02 Mar 2022",
    time: "at 7:00 PM",
    ordersType: "01",
    amount: "$420.84",
    status: "Paid",
  },
  {
    id: "8",
    name: "Sajib Rahman",
    invoiceNumber: "Inv: MGL524598",
    date: "01 Mar 2022",
    time: "at 8:00 PM",
    ordersType: "Withdraw",
    amount: "$500.10",
    status: "Paid",
  },
]
