import React, {useEffect, useRef} from 'react';
import { ChartConfiguration, Chart, registerables } from "chart.js";
import { months } from './util'
import { darkOptions } from './theme';

const DataChart = (props: ChartConfiguration) => {
    const { data, options } = props;
    const chartRef = useRef<HTMLCanvasElement>(null);
    
    const labels = months({count: 7});
    useEffect(() => {
      if (chartRef.current) {
        const chart = new Chart(chartRef.current, {
          ...props,
          options: {
            ...options,
            ...darkOptions,
          },
        });
        return () => {
          chart.destroy();
        };
      }
    }, [data]);
    return <canvas ref={chartRef} />;
  };
  Chart.register(...registerables);
  
  export default DataChart;


// export default function DataChart(props: ChartConfiguration) {
//     const {data, options} = props;
//     const chartRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         if (chartRef.current) {
//           const chart = new Chart(chartRef.current, {
//             ...props,
//             options: {
//               ...options,
//               ...darkOptions,
//             },
//           });
//           return () => {
//             chart.destroy();
//           };
//         }
//       }, [data]);
//       return <canvas ref={chartRef} />;
// }

// Chart.register(...registerables);