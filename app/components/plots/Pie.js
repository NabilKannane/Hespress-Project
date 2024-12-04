import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";


const COLORS = ["rgb(34 197 94)", "#9ca3af", "rgba(239, 68, 68, 0.8)"]; // Viridis color scale

const PieChartComponent = ({data}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name }) => name}
          outerRadius={100}
          innerRadius={0}
          fill="#8884d8"
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
