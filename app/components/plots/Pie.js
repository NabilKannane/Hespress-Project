import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";


const COLORS = ["#77dd77", "#9ca3af", "#c52233"]; // Viridis color scale

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
