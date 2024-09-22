import { ReactNode } from "react"

export interface GridContainerProps {
  children: ReactNode
}

export default function GridContainer(props: GridContainerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
      {props.children}
    </div>
  )
}
