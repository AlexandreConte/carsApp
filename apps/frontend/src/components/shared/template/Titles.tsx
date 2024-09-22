export interface TitleProps {
  title: string
}

export default function Title(props: TitleProps) {

  const { title } = props

  return (
    <div className="h-14 text-4xl lg:text-5xl font-black text-center text-zinc-200">
      <h1>{title}</h1>
    </div>
  )
}
