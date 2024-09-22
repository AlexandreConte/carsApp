import { ReactNode } from "react";

export interface PageProps {
  children: ReactNode
}

export default function Page(props: PageProps) {
  return (
    <div className="
      w-full min-h-screen
      text-white"
    >
      {props.children}
    </div>
  )
}
