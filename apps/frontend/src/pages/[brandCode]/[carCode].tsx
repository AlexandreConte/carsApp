import Container from "@/components/shared/template/Container";
import Header from "@/components/shared/template/Header";
import Page from "@/components/shared/template/Page";
import Slogan from "@/components/shared/template/Slogan";
import { CarInfo } from "@/types/CarInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import sloganImage from "../../../public/slogan3.jpg"
import Footer from "@/components/shared/template/Footer";
import Loading from "@/components/Loading";
import Error from "@/components/shared/template/Error";
import CarInfoComponent from "@/components/CarInfoComponent";

export default function CarPage() {

  const [carInfo, setCarInfo] = useState<CarInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const router = useRouter()
  const { brandCode, carCode }: any = router.query

  async function fetchCarInfo() {
    try {
      const response = await fetch(`http://localhost:8080/brands/${brandCode}/model/${carCode}`)
      const json = await response.json()
      setCarInfo(json)
    } catch (error) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCarInfo()
  }, [])

  return (
    <Page>
      <Header title="Dados" />
      <Slogan
        title1="Escolheu "
        title2="o seu carro"
        image={sloganImage}
      />
      <Container>
        <div className="flex items-center flex-wrap gap-4 flex-col">
          <div className="text-4xl pt-6 flex flex-wrap text-center">
            {carInfo.length > 0 && <h1>{carInfo[0].brand} {carInfo[0].model}</h1>}
          </div>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Error 
              message="Ops! Erro ao carregar os dados"
            />
          ) : (
            <CarInfoComponent 
              carInfo={carInfo}
            />
          )}
        </div>
      </Container>
      <Footer />
    </Page>
  )
}
