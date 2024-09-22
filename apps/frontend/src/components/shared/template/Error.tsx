import { IconX } from "@tabler/icons-react";

export interface ErrorProps {
  message: string
}

export default function Error(props: ErrorProps) {
  return (
    <div className="flex flex-col items-center py-12">
      <IconX 
        className="text-zinc-300 w-6"
      />
      <h2 className="text-zinc-300 text-sm">{props.message}</h2>
    </div>
  )
}