import { CarInfo } from "@/types/CarInfo"
import LineChart from "./LineChart"

export interface CarInfoProps {
  carInfo: CarInfo[]
}

export default function CarInfoComponent(props: CarInfoProps) {
  const { carInfo } = props
  const thisYear = new Date().getFullYear()

  return (
    <div className="flex flex-col items-center justify-center">
      <LineChart
        data={carInfo.map((carInfo: CarInfo) => ({ year: carInfo.modelYear, price: carInfo.price }))}
      />
      <div className="flex flex-wrap gap-6 py-12 justify-center">
        {carInfo.length > 0 && carInfo.map((carInfo: CarInfo) => (
          <div className="px-6 py-3 rounded-md" key={`${carInfo.modelYear}${carInfo.price}`}>
            <div className="text-lg font-bold text-zinc-200 bg-zinc-950 px-4 py-2 rounded-t">Data</div>
            <div className="text-lg text-zinc-400 bg-zinc-900 px-4 py-2">{carInfo.referenceMonth}</div>
            <div className="text-lg font-bold text-zinc-200 bg-zinc-950 px-4 py-2">Ano do modelo</div>
            <div className="text-lg text-zinc-400 bg-zinc-900 px-4 py-2">{carInfo.modelYear < thisYear ? carInfo.modelYear : thisYear + 1}
              <span className={`text-zinc-600 text-sm ${thisYear < carInfo.modelYear ? "flex flex-col" : "hidden"}`}>
                {thisYear < carInfo.modelYear && "(Modelo futuro)"}
              </span>
            </div>
            <div className="text-lg font-bold text-zinc-200 bg-zinc-950 px-4 py-2">Preço</div>
            <div className="text-lg text-zinc-400 bg-zinc-900 px-4 py-2">{carInfo.price}</div>
            <div className="text-lg font-bold text-zinc-200 bg-zinc-950 px-4 py-2">Combustível</div>
            <div className="text-lg text-zinc-400 bg-zinc-900 px-4 py-2 rounded-b">{carInfo.fuel}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
