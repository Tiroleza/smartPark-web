export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

interface Data {
  report: {
    id: number;
    source: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    type: ReportType;
  }[];
}

export const data: Data = {
  report: [
    {
      id: 999,
      source: 'Salary',
      amount: 9999,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 888,
      source: 'Extra hours',
      amount: 8888,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.INCOME,
    },

    {
      id: 777,
      source: 'Amazon',
      amount: 7777,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.EXPENSE,
    },
    {
      id: 666,
      source: '7eleven',
      amount: 6666,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};

data.report.push({
  id: 555,
  source: 'foreign food ',
  amount: 2000,
  createdAt: new Date(),
  updatedAt: new Date(),
  type: ReportType.INCOME,
});
