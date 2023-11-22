import { GroupProps } from './types1';

const mockData: GroupProps[] = [
  {
    title: 'Tokens',
    total: 'Total',
    tokenSpent: 70000,
    data: {
      labels: ['Used'],
      datasets: [
        {
          label: 'Group Overview',
          data: [81, 19],
          backgroundColor: ['#E93D44', 'rgba(0,0,0,0)'],
          borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
          cutout: '37',
          borderRadius: 30,
        },
      ],
    },
  },
  {
    title: 'Left',
    total: 'Total',
    tokenSpent: 5000,
    data: {
      labels: ['Used'],
      datasets: [
        {
          label: 'Group Overview',
          data: [49, 51],
          backgroundColor: ['#E93D44', 'rgba(0,0,0,0)'],
          borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
          cutout: '37',
          borderRadius: 30,
        },
      ],
    },
  },
  {
    title: 'Requests',
    total: 'Total',
    tokenSpent: 12000,
    data: {
      labels: ['Used'],
      datasets: [
        {
          label: 'Group Overview',
          data: [37, 63],
          backgroundColor: ['#E93D44', 'rgba(0,0,0,0)'],
          borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
          cutout: '37',
          borderRadius: 30,
        },
      ],
    },
  },
];

export default mockData;
