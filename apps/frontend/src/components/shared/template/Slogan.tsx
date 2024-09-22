import Image, { StaticImageData } from "next/image";

export interface SloganProps {
  title1: string
  title2: string
  image: StaticImageData
}

export default function Slogan(props: SloganProps) {
  const { image, title1, title2 } = props

  return (
    <div className="
      bg-[#3b3b3ba3] w-full h-[380px] md:h-screen -z-10
      flex justify-center items-center
    ">
      <Image
        src={image}
        alt=""
        priority
        className="absolute w-full top-28 left-0 h-[380px] md:h-screen object-cover -z-10"
      />
      <div>
        <h1 className="flex flex-col justify-center items-center">
          <span className="text-5xl font-black tracking-normal">{title1}</span>
          <span className="uppercase text-3xl font-extralight tracking-widest">{title2}</span>
        </h1>
      </div>
    </div>
  )
}
