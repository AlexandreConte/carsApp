import loadingGif from "../../public/loading.gif"
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <Image 
        src={loadingGif}
        alt="Carregando dados"
        className="w-10 flex justify-center"
      />
    </div>
  )
}
