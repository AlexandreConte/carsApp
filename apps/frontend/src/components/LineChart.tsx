import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

interface Data {
  year: number
  price: string
}

export interface LineChartProps {
  data: Data[]
}

export default function LineChart(props: LineChartProps) {

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

  const data = {
    labels: props.data.map((d: Data) => d.year).reverse(),
    datasets: [
      {
        label: 'Preço',
        data: props.data.map((d: Data) => +d.price.replace('R$', '').trim().replace('.', '').replace(',', '.')).reverse(),
        borderColor: "white",
        backgroundColor: "white",
        responsive: true,
      },
    ],

  }

  return (
    <div className='w-full flex flex-col items-center mx-auto'>
      <h1 className='text-2xl text-center font-medium'>Variação de preços</h1>
      <Line
        data={data}
        width={innerWidth < 400 ? 200 : innerWidth < 640 ? 400 : innerWidth < 1024 ? 768 : 1024}
        height={innerHeight * 0.8}
        className='bg-blue-950 px-2 py-4 rounded-lg my-12 mx-auto'
      />
    </div>
  )
}
