import React , {useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const SimplineChart = ({ data }) => {

  useEffect(() => {
// console.log(data)
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

export default SimplineChart;
