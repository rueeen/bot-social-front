import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
export default function Histograma({datos}) {
  return <div className="histograma"><ResponsiveContainer width="100%" height="100%"><BarChart data={datos}><CartesianGrid stroke="#283448" vertical={false}/><XAxis dataKey="tramo" stroke="#9ca3af" interval={0} angle={-25} height={60} textAnchor="end"/><YAxis allowDecimals={false} stroke="#9ca3af"/><Tooltip contentStyle={{background:'#111827'}}/><Bar dataKey="cantidad" name="Lectores" fill="#a78bfa" radius={[4,4,0,0]} isAnimationActive={false}/></BarChart></ResponsiveContainer></div>;
}
