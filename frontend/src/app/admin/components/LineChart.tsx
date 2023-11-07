'use client';

import React from 'react';

import 'chart.js/auto';

import { Line } from 'react-chartjs-2';

interface LineChartData {
  data: any;
  options: any;
}

export default function LineChart({
  data,
  options,
}: LineChartData) {
  return (
    <Line data={data} options={options} />
  );
}
