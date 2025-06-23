"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type AreaData = {
  data: { hour: string; degree: number }[];
};

export default function AreaChartComponent({ data }: AreaData) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <YAxis />
        <XAxis dataKey="hour" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="degree" stroke="#0088FE"></Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
