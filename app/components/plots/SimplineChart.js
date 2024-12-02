import React , {useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const datatest = [
  {
    time: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    time: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    time: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    time: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  }
];

const datatest1 = [
  {
    Negative: 0,
   Neutral : 4,
    Positive : 2,
    time: "01-12-2024",
  },
  {
    Negative: 0,
   Neutral : 10,
    Positive : 12,
    time: "01-12-2024",
  },
  {
    Negative: 0,
   Neutral : 12,
    Positive : 8,
    time: "01-12-2024",
  },
  {
    Negative: 0,
   Neutral : 8,
    Positive : 2,
    time: "01-12-2024",
  },
];

time: "01-12-2024"

const Example = ({ data }) => {

  useEffect(() => {
console.log(data)
  }, [])
  

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 60,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Negative" stroke=" rgb(239 68 68)" />
        <Line type="monotone" dataKey="Neutral" stroke="rgb(120 113 108)" />
        <Line type="monotone" dataKey="Positive" stroke="rgb(34 197 94)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Example;
