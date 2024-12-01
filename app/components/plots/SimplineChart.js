import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Exemple de données avec des timestamps (vous pouvez ajuster les dates selon vos besoins)
const data = [
  {
    time: '2024-12-01 00:00',
    Positive: 4000,
    Neutral: 2400,
    Negative: 2400,
  },
  {
    time: '2024-12-02 00:00',
    Positive: 3000,
    Neutral: 1398,
    Negative: 2210,
  },
  {
    time: '2024-12-03 00:00',
    Positive: 2000,
    Neutral: 9800,
    Negative: 2290,
  },
  {
    time: '2024-12-04 00:00',
    Positive: 2780,
    Neutral: 3908,
    Negative: 2000,
  },
  {
    time: '2024-12-05 00:00',
    Positive: 1890,
    Neutral: 4800,
    Negative: 2181,
  },
  {
    time: '2024-12-06 00:00',
    Positive: 2390,
    Neutral: 3800,
    Negative: 2500,
  },
  {
    time: '2024-12-07 00:00',
    Positive: 3490,
    Neutral: 4300,
    Negative: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* Formatage des dates dans l'axe X */}
          <XAxis 
            dataKey="time" 
            tickFormatter={(timeStr) => {
              // Si vous avez besoin de formater les dates
              const date = new Date(timeStr);
              return date.toLocaleDateString(); // Retourne une date lisible
            }} 
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Positive" stroke="#4ade80" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Neutral" stroke="#9ca3af" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Negative" stroke="#f87171" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
