import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    Positive: 4000,
    Neutral: 2400,
    Negative: 2400,
  },
  {
    name: 'Page B',
    Positive: 3000,
    Neutral: 1398,
    Negative: 2210,
  },
  {
    name: 'Page C',
    Positive: 2000,
    Neutral: 9800,
    Negative: 2290,
  },
  {
    name: 'Page D',
    Positive: 2780,
    Neutral: 3908,
    Negative: 2000,
  },
  {
    name: 'Page E',
    Positive: 1890,
    Neutral: 4800,
    Negative: 2181,
  },
  {
    name: 'Page F',
    Positive: 2390,
    Neutral: 3800,
    Negative: 2500,
  },
  {
    name: 'Page G',
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
          <XAxis dataKey="name" />
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
