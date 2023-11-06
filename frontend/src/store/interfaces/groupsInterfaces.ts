export interface GroupDataSet {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  cutout: string;
  borderRadius: number;
}

export interface GroupData {
  labels: string[];
  datasets: GroupDataSet[];
}

export interface GroupsInfo {
  title: String;
  members: Number;
  moneySpent: Number;
  data: GroupData;
}
