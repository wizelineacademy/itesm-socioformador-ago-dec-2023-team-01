interface DoughnutChartDataset {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    cutout: string; // Depending on the type you use
    borderRadius: number;
}

interface DoughnutChartData {
    labels: string[]
    datasets: DoughnutChartDataset
}

export interface GroupProps {
    title: String
    members: Number
    moneySpent: Number
    data: any
}