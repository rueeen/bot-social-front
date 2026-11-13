import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
export const colores = ['#a78bfa','#22c55e','#ef4444','#9ca3af','#38bdf8','#fbbf24'];
export default function GraficoOpinion({snapshots, corridas}) {
  const rondas = new Map();
  snapshots.forEach(s => { if (!rondas.has(s.ronda)) rondas.set(s.ronda,{ronda:s.ronda}); rondas.get(s.ronda)[`c${s.corrida}`] = s.promedio; });
  return <div className="grafico" aria-label="Promedio de postura por ronda"><ResponsiveContainer width="100%" height="100%"><LineChart data={[...rondas.values()].sort((a,b) => a.ronda-b.ronda)} margin={{top:15,right:20,bottom:15,left:0}}><CartesianGrid stroke="#283448" strokeDasharray="3 3"/><XAxis dataKey="ronda" stroke="#9ca3af" label={{value:'Ronda',position:'insideBottom',offset:-10}}/><YAxis domain={[-100,100]} ticks={[-100,-50,0,50,100]} stroke="#9ca3af"/><Tooltip contentStyle={{background:'#111827',borderColor:'#374151'}}/><Legend/><ReferenceLine y={0} stroke="#9ca3af" label={{value:'neutral',fill:'#9ca3af',position:'insideTopRight'}}/>{corridas.map((c,i) => <Line key={c.id} type="linear" dataKey={`c${c.id}`} name={c.etiqueta} stroke={c.color || colores[i%colores.length]} strokeWidth={3} dot={false} isAnimationActive={false} connectNulls={false}/>)}</LineChart></ResponsiveContainer></div>;
}
