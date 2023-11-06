'use client';

import React from 'react';

import 'chart.js/auto';

import { Line } from 'react-chartjs-2';

interface LineChartData {
  data: any;
}

export default function LineChart({
  data,
}: LineChartData) {
  return (
    <Line data={data} />
  );
}
