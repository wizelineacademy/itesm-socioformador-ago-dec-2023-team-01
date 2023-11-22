interface DoughnutChartDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  cutout: string;
  borderRadius: number;
}

export interface GroupProps {
  title: String;
  total: String;
  tokenSpent: Number;
  data: any;
}
