import { CarInterface } from "@/types/CarInterface";
import Link from "next/link";
import CarItem from "./shared/CarItem";

export interface CarLinkProps {
  href: string
  car: CarInterface
}

export default function CarLink(props: CarLinkProps) {

  const { car, href } = props

  return (
    <div className="w-full p-2">
      <Link href={href} className="cursor-pointer">
        <CarItem
          car={car}
        />
      </Link>
    </div>
  )
}
