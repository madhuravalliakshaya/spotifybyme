import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const salesData = [
  { movie: 'Avengers', tickets: 120 },
  { movie: 'Inception', tickets: 95 },
  { movie: 'Titanic', tickets: 80 },
];

export default function TicketsChart() {
  return (
    <BarChart width={500} height={300} data={salesData}>
      <XAxis dataKey="movie" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Bar dataKey="tickets" fill="#8884d8" />
    </BarChart>
  );
}

