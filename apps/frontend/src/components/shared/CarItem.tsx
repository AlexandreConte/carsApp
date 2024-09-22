import { CarInterface } from "@/types/CarInterface"
import { IconCarFilled } from "@tabler/icons-react"

export interface CarItemProps {
  car: CarInterface
}

export default function CarItem(props: CarItemProps) {
  const { car } = props

  return (
    <div className="
        flex items-center justify-center gap-2
        bg-zinc-300 hover:bg-white
        px-4 py-2 rounded-md
        hover:scale-105 transition-all
        text-black
    ">
      <IconCarFilled />
      <h1>{car.name}</h1>
    </div>
  )
}
