import Titles from "./Titles";
import Container from "./Container";
import Link from "next/link";

export interface HeaderProps {
  title: string
}

export default function Header(props: HeaderProps) {
  return (
    <div className="bg-black/90 shadow-black shadow-md backdrop-blur-sm h-28 flex justify-center items-center">
      <Container className="flex justify-between items-center">
        <Titles title={props.title} />
        <Link href={"/"} className="text-zinc-300 font-thin uppercase hover:text-white transition-colors duration-300">Início</Link>
      </Container>
    </div>
  )
}
