import React , {useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const SimplineChart = ({ data }) => {

  useEffect(() => {
// console.log(data)
  }, [])
  
// Fonction personnalisée pour le tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700/70 p-4 rounded-xl shadow-xl">
        <p className="text-white text-sm">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm">
            <span className="font-semibold" style={{ color: entry.stroke }}>{`${entry.name} : `}</span>
            <span style={{ color: entry.stroke }}>{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};


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
        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke='rgb(148 163 184 / 0.2)'/>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="Negative" stroke=" rgb(239 68 68)" dot={false} />
        <Line type="monotone" dataKey="Neutral" stroke="rgb(120 113 108)" dot={false}/>
        <Line type="monotone" dataKey="Positive" stroke="rgb(34 197 94)" dot={false}/>
      </LineChart >
    </ResponsiveContainer>
  );
};

export default SimplineChart;
