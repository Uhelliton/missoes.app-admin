export interface ISummaryData {
  total: number;
  courses: number;
  cells: number;
  decision: number;
}

export interface ISummaryEvangelismDaily extends ISummaryData {
  date: string;
}
