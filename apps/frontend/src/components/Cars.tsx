import { CarInterface } from "@/types/CarInterface";
import CarLink from "./CarLink";

export interface CarsProps {
  cars: CarInterface[]
  href: string
}

export default function Cars(props: CarsProps) {

  const { cars } = props

  return cars.map((carItem: CarInterface) => (
    <div key={carItem.code}>
      <CarLink
        href={`${carItem.code}/${carItem.name}`}
        car={carItem}
      />
    </div>
  ))
}
